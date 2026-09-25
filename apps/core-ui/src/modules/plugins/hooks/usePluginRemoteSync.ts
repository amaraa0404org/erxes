import { useEffect, useRef, useState } from 'react';

import {
  getInstance,
  registerRemotes,
} from '@module-federation/enhanced/runtime';

import {
  diffPluginRemotes,
  type PluginRemote,
} from '@/plugins/utils/pluginRemoteDiff';
import { fetchFrontendPluginRemotes } from '@/plugins/utils/fetchFrontendPluginRemotes';

const PLUGIN_REMOTES_SYNC_INTERVAL_MS = 30_000;

const getRegisteredRemoteNames = (): string[] =>
  (getInstance()?.options.remotes ?? []).map((remote) => remote.name);

/**
 * Keeps the Module Federation runtime remote list in sync with the core-api
 * `/get-frontend-plugins` endpoint: new remotes are registered, remotes that
 * disappeared are reported through the returned remote-name list so consumers
 * (e.g. `pluginsConfigState`) can drop them.
 *
 * The runtime has no unregister API, so `registeredRemoteNamesRef` tracks the
 * live set: a remote that leaves is removed from the set, which lets a plugin
 * that joins again be re-registered (with `force`, since the runtime still
 * holds its previous registration).
 */
export const usePluginRemoteSync = (): PluginRemote[] => {
  const [remotes, setRemotes] = useState<PluginRemote[]>(() =>
    (getInstance()?.options.remotes ?? []).map((remote) => ({
      name: remote.name,
      entry: 'entry' in remote ? remote.entry : '',
    })),
  );
  const registeredRemoteNamesRef = useRef<Set<string>>(
    new Set(getRegisteredRemoteNames()),
  );

  useEffect(() => {
    let cancelled = false;

    const syncPluginRemotes = async () => {
      try {
        const fetchedRemotes = await fetchFrontendPluginRemotes();

        if (cancelled) {
          return;
        }

        const { toAdd, toRemove } = diffPluginRemotes(
          Array.from(registeredRemoteNamesRef.current),
          fetchedRemotes,
        );

        if (toAdd.length === 0 && toRemove.length === 0) {
          return;
        }

        if (toAdd.length > 0) {
          registerRemotes(toAdd, { force: true });
          toAdd.forEach((remote) =>
            registeredRemoteNamesRef.current.add(remote.name),
          );
        }

        toRemove.forEach((name) =>
          registeredRemoteNamesRef.current.delete(name),
        );

        setRemotes(fetchedRemotes);
      } catch (error) {
        console.error('Failed to sync frontend plugin remotes:', error);
      }
    };

    syncPluginRemotes();

    const intervalId = window.setInterval(
      syncPluginRemotes,
      PLUGIN_REMOTES_SYNC_INTERVAL_MS,
    );
    window.addEventListener('focus', syncPluginRemotes);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      window.removeEventListener('focus', syncPluginRemotes);
    };
  }, []);

  return remotes;
};
