import { redis } from './redis';
import {
  clearServiceDiscoveryCache,
  getPlugin,
  getPluginAddress,
  getPlugins,
  isEnabled,
  joinErxesGateway,
  keyForConfig,
  leaveErxesGateway,
} from './service-discovery';

jest.mock('./redis', () => ({
  redis: {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    sadd: jest.fn(),
    srem: jest.fn(),
    smembers: jest.fn(),
    publish: jest.fn(),
    pipeline: jest.fn(),
  },
  redisConnectionOptions: {},
}));

jest.mock('./saas', () => ({
  getSaasOrganizationDetail: jest.fn(),
}));

// The pub/sub cache invalidation runs on a dedicated ioredis connection;
// replace the driver so no real connection is opened and capture the
// 'message' handler so tests can emit join/leave events.
let pluginChangeHandler:
  | ((channel: string, message: string) => void)
  | undefined;

const mockSubscriber = {
  subscribe: jest.fn().mockResolvedValue(1),
  on: jest.fn(),
};

jest.mock('ioredis', () => ({
  __esModule: true,
  default: jest.fn(() => mockSubscriber),
}));

const redisGet = redis.get as jest.Mock;
const redisSet = redis.set as jest.Mock;
const redisDel = redis.del as jest.Mock;
const redisSadd = redis.sadd as jest.Mock;
const redisSrem = redis.srem as jest.Mock;
const redisSmembers = redis.smembers as jest.Mock;
const redisPublish = redis.publish as jest.Mock;
const redisPipeline = redis.pipeline as jest.Mock;

const PLUGINS_SET_KEY = 'erxes:plugins';
const PLUGINS_CHANGED_CHANNEL = 'erxes:plugins:changed';
const HEARTBEAT_PREFIX = 'erxes:plugin:alive:';

const serviceKey = (name: string) => `erxes-service-${name}`;
const heartbeatKey = (name: string) => `${HEARTBEAT_PREFIX}${name}`;

let redisStore: { [key: string]: string };
let pluginSet: Set<string>;
let heartbeatKeys: Set<string>;
let published: { channel: string; message: string }[];

const emitPluginChange = (name: string, event: 'joined' | 'left') => {
  pluginChangeHandler?.(
    PLUGINS_CHANGED_CHANNEL,
    JSON.stringify({ name, event }),
  );
};

describe('service-discovery', () => {
  beforeEach(() => {
    clearServiceDiscoveryCache();
    jest.clearAllMocks();

    redisStore = {};
    pluginSet = new Set();
    heartbeatKeys = new Set();
    published = [];

    // dotenv may load a real SERVICE_ADDRESS; tests assert the default
    // localhost address.
    delete process.env.SERVICE_ADDRESS;

    // The subscriber is a module-level singleton: its 'message' handler is
    // registered once and must survive mock clearing between tests.
    mockSubscriber.on.mockImplementation(
      (event: string, handler: (channel: string, message: string) => void) => {
        if (event === 'message') {
          pluginChangeHandler = handler;
        }
        return mockSubscriber;
      },
    );
    mockSubscriber.subscribe.mockResolvedValue(1);

    redisGet.mockImplementation((key: string) =>
      Promise.resolve(redisStore[key] ?? null),
    );
    redisSet.mockImplementation((key: string, value: string) => {
      redisStore[key] = value;
      if (key.startsWith(HEARTBEAT_PREFIX)) {
        heartbeatKeys.add(key);
      }
      return Promise.resolve('OK');
    });
    redisDel.mockImplementation((...keys: string[]) => {
      for (const key of keys) {
        delete redisStore[key];
        heartbeatKeys.delete(key);
      }
      return Promise.resolve(keys.length);
    });
    redisSadd.mockImplementation((_key: string, member: string) => {
      pluginSet.add(member);
      return Promise.resolve(1);
    });
    redisSrem.mockImplementation((_key: string, member: string) => {
      pluginSet.delete(member);
      return Promise.resolve(1);
    });
    redisSmembers.mockImplementation(() => Promise.resolve([...pluginSet]));
    redisPublish.mockImplementation((channel: string, message: string) => {
      published.push({ channel, message });
      return Promise.resolve(1);
    });
    redisPipeline.mockImplementation(() => {
      const keys: string[] = [];
      const pipe = {
        exists: (key: string) => {
          keys.push(key);
          return pipe;
        },
        exec: () =>
          Promise.resolve(
            keys.map((key) => [null, heartbeatKeys.has(key) ? 1 : 0]),
          ),
      };
      return pipe;
    });
  });

  describe('getPlugin', () => {
    it('does not cache a miss, so a service that registers later is picked up', async () => {
      const name = 'content';

      const first = await getPlugin(name);
      expect(first.address).toBe('');
      expect(first.config).toEqual({});

      redisStore[serviceKey(name)] = 'http://plugin-content-api:3300';
      redisStore[keyForConfig(name)] = JSON.stringify({
        meta: { description: 'Content management' },
      });

      const second = await getPlugin(name);
      expect(second.address).toBe('http://plugin-content-api:3300');
      expect(second.config).toEqual({
        meta: { description: 'Content management' },
      });
    });

    it('caches a hit and does not query redis again', async () => {
      const name = 'content';
      redisStore[serviceKey(name)] = 'http://plugin-content-api:3300';
      redisStore[keyForConfig(name)] = JSON.stringify({ meta: {} });

      const first = await getPlugin(name);
      expect(first.address).toBe('http://plugin-content-api:3300');
      expect(redisGet).toHaveBeenCalledTimes(2);

      const second = await getPlugin(name);
      expect(second).toBe(first);
      expect(redisGet).toHaveBeenCalledTimes(2);
    });

    it('parses the manifest JSON into the config', async () => {
      const name = 'content';
      redisStore[serviceKey(name)] = 'http://localhost:4100';
      redisStore[keyForConfig(name)] = JSON.stringify({
        dbConnectionString: 'mongodb://localhost/erxes',
        hasSubscriptions: true,
        meta: { description: 'Content management' },
        releaseVersion: 'latest',
        uiRemoteEntry: 'http://localhost:4101/remoteEntry.js',
      });

      const plugin = await getPlugin(name);
      expect(plugin.config).toEqual({
        dbConnectionString: 'mongodb://localhost/erxes',
        hasSubscriptions: true,
        meta: { description: 'Content management' },
        releaseVersion: 'latest',
        uiRemoteEntry: 'http://localhost:4101/remoteEntry.js',
      });
    });
  });

  describe('getPluginAddress', () => {
    it('does not cache a miss, so a service that registers later is picked up', async () => {
      const name = 'content';

      const first = await getPluginAddress(name);
      expect(first).toBeNull();

      redisStore[serviceKey(name)] = 'http://plugin-content-api:3300';

      const second = await getPluginAddress(name);
      expect(second).toBe('http://plugin-content-api:3300');
    });

    it('caches a hit and does not query redis again', async () => {
      const name = 'content';
      redisStore[serviceKey(name)] = 'http://plugin-content-api:3300';

      const first = await getPluginAddress(name);
      expect(first).toBe('http://plugin-content-api:3300');
      expect(redisGet).toHaveBeenCalledTimes(1);

      const second = await getPluginAddress(name);
      expect(second).toBe('http://plugin-content-api:3300');
      expect(redisGet).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPlugins', () => {
    it('returns only core when no plugin has registered', async () => {
      await expect(getPlugins()).resolves.toEqual(['core']);
    });

    it('keeps only members whose heartbeat key exists', async () => {
      pluginSet.add('content');
      pluginSet.add('sales');
      heartbeatKeys.add(heartbeatKey('content'));

      await expect(getPlugins()).resolves.toEqual(['core', 'content']);
    });

    it('sorts alive plugin names for determinism', async () => {
      pluginSet.add('sales');
      pluginSet.add('content');
      heartbeatKeys.add(heartbeatKey('sales'));
      heartbeatKeys.add(heartbeatKey('content'));

      await expect(getPlugins()).resolves.toEqual([
        'core',
        'content',
        'sales',
      ]);
    });
  });

  describe('isEnabled', () => {
    beforeEach(() => {
      pluginSet.add('content');
      pluginSet.add('sales');
      heartbeatKeys.add(heartbeatKey('content'));
    });

    it('treats core as always enabled', async () => {
      await expect(isEnabled('core')).resolves.toBe(true);
    });

    it('returns true for a member with a live heartbeat', async () => {
      await expect(isEnabled('content')).resolves.toBe(true);
    });

    it('returns false for a member whose heartbeat expired', async () => {
      await expect(isEnabled('sales')).resolves.toBe(false);
    });

    it('returns false for a name that never registered', async () => {
      await expect(isEnabled('unknown')).resolves.toBe(false);
    });
  });

  describe('plugin change notifications', () => {
    it('clears cached entries when a joined message arrives', async () => {
      const name = 'content';
      redisStore[serviceKey(name)] = 'http://localhost:4100';
      redisStore[keyForConfig(name)] = JSON.stringify({ meta: { v: 1 } });

      const first = await getPlugin(name);
      expect(first.address).toBe('http://localhost:4100');
      expect(redisGet).toHaveBeenCalledTimes(2);

      // The plugin re-joins at a new address; the message must invalidate
      // the stale cache entry.
      redisStore[serviceKey(name)] = 'http://localhost:4200';
      emitPluginChange(name, 'joined');

      const second = await getPlugin(name);
      expect(second.address).toBe('http://localhost:4200');
      expect(redisGet).toHaveBeenCalledTimes(4);
    });

    it('clears cached entries when a left message arrives', async () => {
      const name = 'content';
      redisStore[serviceKey(name)] = 'http://localhost:4100';

      const first = await getPluginAddress(name);
      expect(first).toBe('http://localhost:4100');
      expect(redisGet).toHaveBeenCalledTimes(1);

      delete redisStore[serviceKey(name)];
      emitPluginChange(name, 'left');

      const second = await getPluginAddress(name);
      expect(second).toBeNull();
      expect(redisGet).toHaveBeenCalledTimes(2);
    });
  });

  describe('joinErxesGateway / leaveErxesGateway', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('writes the manifest and address, registers presence and publishes joined', async () => {
      await joinErxesGateway({
        name: 'content',
        port: 4100,
        hasSubscriptions: true,
        meta: { description: 'Content management' },
        uiRemoteEntry: 'http://localhost:4101/remoteEntry.js',
      });

      expect(redisStore[serviceKey('content')]).toBe('http://localhost:4100');
      expect(pluginSet.has('content')).toBe(true);
      expect(heartbeatKeys.has(heartbeatKey('content'))).toBe(true);

      const manifest = JSON.parse(redisStore[keyForConfig('content')]);
      expect(manifest.hasSubscriptions).toBe(true);
      expect(manifest.meta).toEqual({
        description: 'Content management',
      });
      expect(manifest.uiRemoteEntry).toBe(
        'http://localhost:4101/remoteEntry.js',
      );

      expect(published).toContainEqual({
        channel: PLUGINS_CHANGED_CHANNEL,
        message: JSON.stringify({ name: 'content', event: 'joined' }),
      });
    });

    it('honors SERVICE_ADDRESS over the default localhost address', async () => {
      const old = process.env.SERVICE_ADDRESS;
      process.env.SERVICE_ADDRESS = 'http://plugin-content-api:4100';
      try {
        await joinErxesGateway({ name: 'content', port: 4100 });
        expect(redisStore[serviceKey('content')]).toBe(
          'http://plugin-content-api:4100',
        );
      } finally {
        if (old === undefined) {
          delete process.env.SERVICE_ADDRESS;
        } else {
          process.env.SERVICE_ADDRESS = old;
        }
      }
    });

    it('never adds core to the plugins set', async () => {
      await joinErxesGateway({ name: 'core', port: 3300 });

      expect(pluginSet.size).toBe(0);
      expect(redisStore[serviceKey('core')]).toBe('http://localhost:3300');
    });

    it('leave removes presence keys, keeps the manifest and publishes left', async () => {
      await joinErxesGateway({ name: 'content', port: 4100 });
      published = [];

      await leaveErxesGateway('content', 4100);

      expect(pluginSet.has('content')).toBe(false);
      expect(heartbeatKeys.has(heartbeatKey('content'))).toBe(false);
      expect(redisStore[serviceKey('content')]).toBeUndefined();
      expect(redisStore[keyForConfig('content')]).toBeDefined();

      expect(published).toContainEqual({
        channel: PLUGINS_CHANGED_CHANNEL,
        message: JSON.stringify({ name: 'content', event: 'left' }),
      });
    });

    it('refreshes the heartbeat key every 10 seconds', async () => {
      await joinErxesGateway({ name: 'content', port: 4100 });

      const callsAfterJoin = redisSet.mock.calls.filter(
        ([key]) => key === heartbeatKey('content'),
      ).length;
      expect(callsAfterJoin).toBe(1);

      jest.advanceTimersByTime(10_000);
      await Promise.resolve();

      const callsAfterTick = redisSet.mock.calls.filter(
        ([key]) => key === heartbeatKey('content'),
      ).length;
      expect(callsAfterTick).toBe(2);
    });
  });
});
