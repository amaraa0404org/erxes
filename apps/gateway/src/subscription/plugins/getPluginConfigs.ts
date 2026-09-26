import * as path from 'path';
import * as fs from 'fs';
import type { RedisPubSub } from 'graphql-redis-subscriptions';

import downloadPlugins from './downloadPlugins';

/**
 * Contract of a plugin's `subscriptionPlugin.js` bundle: SDL fragments for the
 * `Subscription` type plus a factory that builds the field resolver map from
 * the shared pubsub instance. Every field is validated only at use time —
 * malformed modules fail the same way the previous untyped code did.
 */
export interface ISubscriptionPluginModule {
  name?: string;
  typeDefs?: string;
  generateResolvers: (
    pubsub: RedisPubSub,
  ) => Record<string, unknown>;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

// A downloaded bundle is a CommonJS/ESM module namespace: transpiled ES
// modules expose the plugin contract on `default`, plain CommonJS modules on
// the exports object itself.
const toPluginModule = (
  module: unknown,
): ISubscriptionPluginModule | undefined => {
  if (!module) {
    return undefined;
  }

  const inner =
    isRecord(module) && module.default ? module.default : module;

  return inner as ISubscriptionPluginModule;
};

function getFilesFullPaths(
  dir: string,
  pred: (filename: string) => boolean,
): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .map((fileName) => {
      if (!pred(fileName)) {
        return '';
      }

      const fullName = path.join(dir, fileName);
      const stat = fs.lstatSync(fullName);

      if (stat.isDirectory()) {
        return '';
      }

      return fullName;
    })
    .filter((x) => x);
}

export default async function getPluginConfigs(): Promise<
  ISubscriptionPluginModule[]
> {
  await downloadPlugins();
  const directory = path.join(__dirname, '/downloads');
  const files = getFilesFullPaths(directory, (name) => /\.(t|j)s$/.test(name));

  const modules = await Promise.all(
    files.map(async (file): Promise<unknown> => {
      // Rebuilds re-download these files; drop the cached module so the
      // fresh content is loaded instead of the stale import.
      try {
        delete require.cache[require.resolve(file)];
      } catch {
        // Not previously loaded; nothing to evict.
      }

      try {
        return await import(file);
      } catch (e) {
        console.error(
          `Failed to load subscription plugin file ${file}; skipping it`,
          e,
        );
        return undefined;
      }
    }),
  );

  return modules
    .map(toPluginModule)
    .filter((mod): mod is ISubscriptionPluginModule => Boolean(mod));
}
