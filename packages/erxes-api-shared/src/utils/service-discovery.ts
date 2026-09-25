import * as dotenv from 'dotenv';
import Redis from 'ioredis';
import { redis, redisConnectionOptions } from './redis';
import { getSaasOrganizationDetail } from './saas';
import { getEnv } from './utils';
import { IOrganizationCharge } from '../core-types';

dotenv.config();

const { NODE_ENV, MONGO_URL } = process.env;

// Presence-based plugin registry (D1): a plugin is installed exactly while
// its process is alive and heartbeating. There is no env list.
const PLUGINS_SET_KEY = 'erxes:plugins';
const PLUGINS_CHANGED_CHANNEL = 'erxes:plugins:changed';
const HEARTBEAT_TTL_SECONDS = 30;
const HEARTBEAT_INTERVAL_MS = 10_000;
const CACHE_TTL_MS = 60_000;

const keyForHeartbeat = (name: string) => `erxes:plugin:alive:${name}`;
const keyForAddress = (name: string) => `erxes-service-${name}`;

interface PluginConfig {
  name: string;
  port: number;
  hasSubscriptions?: boolean;
  meta?: any;
  uiRemoteEntry?: string;
}

export const isDev = NODE_ENV === 'development';

export const keyForConfig = (name: string) => `erxesservice:config:${name}`;

const publishPluginChange = (name: string, event: 'joined' | 'left') =>
  redis.publish(PLUGINS_CHANGED_CHANNEL, JSON.stringify({ name, event }));

export const getPlugins = async (): Promise<string[]> => {
  const members = await redis.smembers(PLUGINS_SET_KEY);

  if (!members.length) {
    return ['core'];
  }

  const pipeline = redis.pipeline();
  for (const name of members) {
    pipeline.exists(keyForHeartbeat(name));
  }

  const results = (await pipeline.exec()) || [];

  const alive = members
    .filter((name, index) => {
      const [error, exists] = results[index] || [];
      return name !== 'core' && !error && exists === 1;
    })
    .sort();

  return ['core', ...alive];
};

export const getAvailablePlugins = async (
  subdomain: string,
): Promise<string[]> => {
  const VERSION = getEnv({ name: 'VERSION', defaultValue: 'os' });

  if (VERSION && VERSION === 'saas') {
    const organizationInfo = await getSaasOrganizationDetail({
      subdomain,
    });

    const charges = organizationInfo.charge as IOrganizationCharge;

    const enabledPlugins = await getPlugins();
    const plugins: string[] = [];

    Object.keys(charges).forEach((key) => {
      if (
        (charges[key].purchased && charges[key].purchased > 0) ||
        (charges[key].free && charges[key].free > 0)
      ) {
        const pluginName = key.split(':')[0];

        if (pluginName !== 'core' && enabledPlugins.includes(pluginName)) {
          plugins.push(pluginName);
        }
      }
    });
    return ['core', ...plugins];
  } else {
    return getPlugins();
  }
};

type ServiceInfo = { address: string; config: any };
type CacheEntry<T> = { value: T; expiresAt: number };

const serviceInfoCache: Record<string, CacheEntry<Readonly<ServiceInfo>>> = {};
const pluginAddressCache: Record<string, CacheEntry<string>> = {};

export const clearServiceDiscoveryCache = (name?: string) => {
  if (name) {
    delete serviceInfoCache[name];
    delete pluginAddressCache[name];
    return;
  }

  Object.keys(serviceInfoCache).forEach((key) => delete serviceInfoCache[key]);
  Object.keys(pluginAddressCache).forEach(
    (key) => delete pluginAddressCache[key],
  );
};

let eventsSubscriber: Redis | null = null;

// A dedicated connection is required: once an ioredis connection enters
// subscriber mode it cannot run regular commands, so the shared `redis`
// export must not be subscribed.
const ensureEventsSubscriber = (): void => {
  if (eventsSubscriber) {
    return;
  }

  const subscriber = new Redis(redisConnectionOptions);
  eventsSubscriber = subscriber;

  subscriber.subscribe(PLUGINS_CHANGED_CHANNEL).catch((e) => console.error(e));
  subscriber.on('message', (channel: string, message: string) => {
    if (channel !== PLUGINS_CHANGED_CHANNEL) {
      return;
    }

    try {
      const payload = JSON.parse(message);
      clearServiceDiscoveryCache(payload?.name);
    } catch {
      clearServiceDiscoveryCache();
    }
  });
};

export const getPlugin = async (
  name: string,
): Promise<Readonly<ServiceInfo>> => {
  ensureEventsSubscriber();

  const cached = serviceInfoCache[name];
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const result: ServiceInfo = {
    address: (await redis.get(keyForAddress(name))) || '',
    config: { meta: {} },
  };

  const configJson = await redis.get(keyForConfig(name));
  result.config = JSON.parse(configJson || '{}');

  Object.freeze(result);

  // Never cache a miss: a plugin that registers later must be picked up.
  if (result.address) {
    serviceInfoCache[name] = {
      value: result,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };
  } else {
    delete serviceInfoCache[name];
  }

  return result;
};

const heartbeatIntervals = new Map<string, NodeJS.Timeout>();

export const joinErxesGateway = async ({
  name,
  port,
  hasSubscriptions = false,
  meta,
  uiRemoteEntry,
}: PluginConfig) => {
  const rawVersion = process.env.RELEASE_VERSION;
  const releaseVersion = rawVersion?.startsWith('3.') ? rawVersion : 'latest';

  const existingConfigJson = await redis.get(keyForConfig(name));
  const existingConfig = existingConfigJson
    ? JSON.parse(existingConfigJson)
    : {};

  await redis.set(
    keyForConfig(name),

    JSON.stringify({
      dbConnectionString: MONGO_URL,
      hasSubscriptions,
      meta: {
        ...existingConfig?.meta,
        ...meta,
      },
      releaseVersion,
      ...(uiRemoteEntry ? { uiRemoteEntry } : {}),
    }),
  );

  const address =
    process.env.SERVICE_ADDRESS || `http://localhost:${port}`;

  await redis.set(keyForAddress(name), address);

  // `core` is always part of the deployment and services register their
  // address directly; only real plugins announce themselves in the
  // presence set.
  if (name !== 'core') {
    await redis.sadd(PLUGINS_SET_KEY, name);
    await redis.set(
      keyForHeartbeat(name),
      '1',
      'EX',
      HEARTBEAT_TTL_SECONDS,
    );

    const previousHeartbeat = heartbeatIntervals.get(name);
    if (previousHeartbeat) {
      clearInterval(previousHeartbeat);
    }

    // Unref'd so the heartbeat alone never keeps the process alive.
    const heartbeat = setInterval(() => {
      redis
        .set(keyForHeartbeat(name), '1', 'EX', HEARTBEAT_TTL_SECONDS)
        .catch((e) => console.error(e));
    }, HEARTBEAT_INTERVAL_MS);
    heartbeat.unref();
    heartbeatIntervals.set(name, heartbeat);

    await publishPluginChange(name, 'joined');
  }

  console.log(`erxes-service${name} joined with ${address}`);
};

export const leaveErxesGateway = async (name: string, port: number) => {
  const heartbeat = heartbeatIntervals.get(name);
  if (heartbeat) {
    clearInterval(heartbeat);
    heartbeatIntervals.delete(name);
  }

  if (name !== 'core') {
    await redis.srem(PLUGINS_SET_KEY, name);
  }

  // The manifest key (erxesservice:config:{name}) is kept on purpose: it is
  // harmless and joinErxesGateway merges it back in on rejoin.
  await redis.del(keyForHeartbeat(name), keyForAddress(name));

  if (name !== 'core') {
    await publishPluginChange(name, 'left');
  }

  console.log(`erxes-service${name} left ${port}`);
};

export const isEnabled = async (name: string) => {
  if (name === 'core') return true;

  const enabledServices = await getPlugins();

  return enabledServices.includes(name);
};

export const getPluginAddress = async (name: string) => {
  ensureEventsSubscriber();

  const cached = pluginAddressCache[name];
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const address = await redis.get(keyForAddress(name));

  // Never cache a miss: a plugin that registers later must be picked up.
  if (address) {
    pluginAddressCache[name] = {
      value: address,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };
  } else {
    delete pluginAddressCache[name];
  }

  return address;
};

function getNonFunctionProps<T extends object>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (typeof obj[key] !== 'function') {
      result[key] = obj[key];
    }
  }

  return result;
}

export const initializePluginConfig = async <TConfig extends object>(
  pluginName: string,
  propertyName: string,
  config: TConfig,
) => {
  const pluginConfig = await redis.get(keyForConfig(pluginName));
  const configJSON = JSON.parse(pluginConfig || '{}');

  await redis.set(
    keyForConfig(pluginName),

    JSON.stringify({
      ...configJSON,
      meta: {
        ...configJSON?.meta,
        [propertyName]: getNonFunctionProps<TConfig>(config),
      },
    }),
  );
};
