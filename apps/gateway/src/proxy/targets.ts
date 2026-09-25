import * as dotenv from 'dotenv';

import { getPlugin, getPlugins } from 'erxes-api-shared/utils';
import retry from '../util/retry';
import fetch from 'node-fetch';

export type ErxesProxyTarget = {
  name: string;
  address: string;
  // Plugin config as published to service discovery; the gateway never reads
  // it, only forwards it, so it stays opaque here.
  config: unknown;
};

declare global {
  // Populated at boot and refreshed by the plugin change watcher; read by the
  // router-recovery path. Initialized before `startRouter` runs.
  // eslint-disable-next-line no-var
  var currentTargets: ErxesProxyTarget[] | undefined;
}

dotenv.config();

const { MAX_PLUGIN_RETRY } = process.env;

// Only core is required for the gateway to come up. Plugins announce
// themselves through the presence registry at runtime, so they are never
// waited on — a missing or unhealthy plugin is skipped and logged.
const maxCoreRetry = Number(MAX_PLUGIN_RETRY) || 60;
const PLUGIN_FETCH_TIMEOUT_MS = 15_000;

async function getProxyTarget(name: string): Promise<ErxesProxyTarget> {
  const service = await getPlugin(name);

  if (!service.address) {
    throw new Error(`Plugin ${name} has no address value in service discovery`);
  }

  console.log(`${name} address: ${service.address}`);

  return {
    name,
    address: service.address,
    config: service.config,
  };
}

async function retryGetProxyTarget(name: string): Promise<ErxesProxyTarget> {
  const intervalSeconds = 1;
  return retry({
    fn: () => getProxyTarget(name),
    intervalMs: intervalSeconds * 1000,
    maxTries: maxCoreRetry,
    retryExhaustedLog: `Plugin ${name} still hasn't joined the service discovery after checking for ${maxCoreRetry} time(s) with ${intervalSeconds} second(s) interval. Retry exhausted.`,
    retryLog: `Waiting for plugin ${name} to join service discovery`,
    successLog: `Plugin ${name} joined service discovery.`,
  });
}

async function ensureGraphqlEndpointIsUp({
  address,
  name,
}: ErxesProxyTarget): Promise<void> {
  if (!address) return;

  const endpoint = `${address}/graphql`;

  const res = await fetch(endpoint, {
    method: 'POST',
    timeout: PLUGIN_FETCH_TIMEOUT_MS,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variables: null,
      query: `
          query SubgraphIntrospectQuery {
            _service {
              sdl
            }
          }
          `,
      operationName: 'SubgraphIntrospectQuery',
    }),
  });
  if (res.ok) {
    return;
  }

  throw new Error(
    `Plugin ${name}'s graphql endpoint ${endpoint} is not ready yet`,
  );
}

async function retryEnsureGraphqlEndpointIsUp(target: ErxesProxyTarget) {
  const { name, address } = target;

  const endpoint = `${address}/graphql`;
  await retry({
    fn: () => ensureGraphqlEndpointIsUp(target),
    intervalMs: 5 * 1000,
    maxTries: maxCoreRetry,
    retryExhaustedLog: `ERROR: ${name} graphql endpoint ${endpoint} isn't running.`,
    retryLog: `WAITING FOR: ${name} graphql endpoint ${endpoint}`,
    successLog: `UP: ${name} graphql endpoint ${endpoint}`,
  });
}

// Resolves the target of one plugin; a failure means the plugin is skipped
// for this pass and retried on the next registry change.
async function tryGetPluginTarget(
  name: string,
): Promise<ErxesProxyTarget | undefined> {
  try {
    const target = await getProxyTarget(name);
    await ensureGraphqlEndpointIsUp(target);
    return target;
  } catch (e) {
    console.error(
      `Skipping plugin "${name}" in proxy targets: ${(e as Error).message}`,
    );
    return undefined;
  }
}

async function getPluginTargets(): Promise<ErxesProxyTarget[]> {
  const serviceNames = (await getPlugins()).filter((name) => name !== 'core');

  const results = await Promise.all(serviceNames.map(tryGetPluginTarget));

  return results.filter((t): t is ErxesProxyTarget => Boolean(t));
}

// Recomputes the full target list after a registry change. Core is required;
// plugins that fail discovery or the SDL probe are skipped so a single bad
// plugin cannot take the whole supergraph down.
export async function getProxyTargets(): Promise<ErxesProxyTarget[]> {
  const coreTarget = await getProxyTarget('core');
  await ensureGraphqlEndpointIsUp(coreTarget);

  return [coreTarget, ...(await getPluginTargets())];
}

// Boot path: blocks until core is reachable (short retry only), then picks up
// whichever plugins happen to be alive. Everything else joins at runtime.
export async function retryGetProxyTargets(): Promise<ErxesProxyTarget[]> {
  const coreTarget = await retryGetProxyTarget('core');
  await retryEnsureGraphqlEndpointIsUp(coreTarget);

  return [coreTarget, ...(await getPluginTargets())];
}
