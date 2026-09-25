import Redis from 'ioredis';
import {
  clearServiceDiscoveryCache,
  redisConnectionOptions,
} from 'erxes-api-shared/utils';
import supergraphCompose from '~/apollo-router/supergraph-compose';
import { ErxesProxyTarget, getProxyTargets } from '~/proxy/targets';
import { rebuildSubscriptionSchema } from '~/subscription';

const PLUGINS_CHANGED_CHANNEL = 'erxes:plugins:changed';
const RECOMPOSE_DEBOUNCE_MS = 2_000;

let debounceTimer: NodeJS.Timeout | undefined;
let recomposeInFlight: Promise<void> | undefined;
let recomposeQueued = false;

// Recomputes targets from the live registry, recomposes the supergraph and
// rebuilds the subscription schema. The router picks the new supergraph file
// up through --hot-reload, so nothing here restarts it. A failed compose keeps
// the last good supergraph file untouched.
const recompose = async (): Promise<void> => {
  clearServiceDiscoveryCache();

  let targets: ErxesProxyTarget[];
  try {
    targets = await getProxyTargets();
  } catch (e) {
    // Core is required; if it cannot be reached the current supergraph and
    // subscription schema stay as they are.
    console.error('Failed to recompute proxy targets after plugin change', e);
    return;
  }

  global.currentTargets = targets;

  try {
    await supergraphCompose(targets);
  } catch (e) {
    console.error(
      'Supergraph composition failed; keeping the previous supergraph',
      e,
    );
  }

  await rebuildSubscriptionSchema();
};

// Serializes recomposes: events arriving while one runs are collapsed into a
// single follow-up run instead of racing.
const runRecompose = (): void => {
  if (recomposeInFlight) {
    recomposeQueued = true;
    return;
  }

  recomposeInFlight = (async () => {
    do {
      recomposeQueued = false;
      try {
        await recompose();
      } catch (e) {
        console.error('Plugin change handling failed', e);
      }
    } while (recomposeQueued);
  })().finally(() => {
    recomposeInFlight = undefined;
  });
};

const scheduleRecompose = (): void => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(runRecompose, RECOMPOSE_DEBOUNCE_MS);
};

// Subscribes to plugin join/leave announcements on a dedicated connection —
// an ioredis connection in subscriber mode cannot run regular commands, so
// the shared `redis` export must not be used for this.
export const startPluginChangeWatcher = (): void => {
  const subscriber = new Redis(redisConnectionOptions);

  subscriber.subscribe(PLUGINS_CHANGED_CHANNEL).catch((e) => {
    console.error(
      `Could not subscribe to ${PLUGINS_CHANGED_CHANNEL}; plugin changes will not trigger recomposition`,
      e,
    );
  });

  subscriber.on('message', (channel: string, message: string) => {
    if (channel !== PLUGINS_CHANGED_CHANNEL) {
      return;
    }

    try {
      const { name, event } = JSON.parse(message);
      console.log(`Plugin "${name}" ${event}; scheduling recomposition`);
    } catch {
      // Malformed payloads still trigger a recompose; the registry is the
      // source of truth.
    }

    scheduleRecompose();
  });
};
