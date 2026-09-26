import { redis } from 'erxes-api-shared/utils';

const PLUGINS_SET_KEY = 'erxes:plugins';
const PLUGINS_CHANGED_CHANNEL = 'erxes:plugins:changed';
const REAPER_INTERVAL_MS = 10_000;

const heartbeatKey = (name: string) => `erxes:plugin:alive:${name}`;

// A plugin that crashes or is killed never runs leaveErxesGateway, so its
// entry in `erxes:plugins` would linger. Once its heartbeat key expires the
// reaper removes it and announces a `left`, which the change watcher turns
// into a recompose exactly like a graceful shutdown.
export const reapDeadPlugins = async (): Promise<void> => {
  const members = await redis.smembers(PLUGINS_SET_KEY);

  if (!members.length) {
    return;
  }

  const pipeline = redis.pipeline();
  for (const name of members) {
    pipeline.exists(heartbeatKey(name));
  }

  const results = (await pipeline.exec()) || [];

  const dead = members.filter(
    (name, index) => name !== 'core' && results[index]?.[1] !== 1,
  );

  if (!dead.length) {
    return;
  }

  await redis.srem(PLUGINS_SET_KEY, ...dead);

  await Promise.all(
    dead.map((name) =>
      redis.publish(
        PLUGINS_CHANGED_CHANNEL,
        JSON.stringify({ name, event: 'left' }),
      ),
    ),
  );

  for (const name of dead) {
    console.log(`Reaped dead plugin "${name}" (heartbeat expired)`);
  }
};

export const startPluginReaper = (): void => {
  const timer = setInterval(() => {
    reapDeadPlugins().catch((e) =>
      console.error('Plugin reaper run failed', e),
    );
  }, REAPER_INTERVAL_MS);

  timer.unref();
};
