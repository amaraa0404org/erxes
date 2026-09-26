import { loadRemote } from '@module-federation/enhanced/runtime';
import type { IUIConfig } from 'erxes-ui';
import { type SetStateAction, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import {
  loadingPluginsConfigState,
  pluginsConfigState,
  type PluginsConfigState,
} from 'ui-modules';
import { i18nInstance } from '~/i18n';
import { usePluginRemoteSync } from '@/plugins/hooks/usePluginRemoteSync';

type RemoteConfig = {
  CONFIG: IUIConfig;
};

export const loadPluginI18nNamespace = async ({
  i18n,
  i18nNamespace,
  name,
}: Pick<IUIConfig, 'i18n' | 'i18nNamespace' | 'name'>) => {
  const namespace = i18nNamespace ?? (i18n ? name : undefined);

  if (!namespace) {
    return;
  }

  try {
    await i18nInstance.loadNamespaces(namespace);
  } catch (error) {
    console.error(
      `Failed to load translation namespace "${namespace}" for ${name}:`,
      error,
    );
  }
};

const pendingConfigLoads = new Set<string>();

export const loadPluginConfig = async (
  remoteName: string,
  setPluginsConfig: (update: SetStateAction<PluginsConfigState | null>) => void,
  setLoadingPluginsConfig: (update: SetStateAction<boolean>) => void,
) => {
  if (pendingConfigLoads.has(remoteName)) {
    return;
  }
  pendingConfigLoads.add(remoteName);

  try {
    const remoteConfig = await loadRemote<RemoteConfig>(`${remoteName}/config`);
    const pluginConfig = remoteConfig?.CONFIG;

    if (!pluginConfig) {
      throw new Error(`Remote "${remoteName}" did not expose a config`);
    }

    await loadPluginI18nNamespace(pluginConfig);

    setPluginsConfig((prev) => ({
      ...prev,
      [remoteName]: pluginConfig,
    }));
    setTimeout(() => {
      setLoadingPluginsConfig(false);
    });
  } catch (error) {
    console.error(`Failed to load config from ${remoteName}:`, error);
    setLoadingPluginsConfig(false);
  } finally {
    pendingConfigLoads.delete(remoteName);
  }
};

export const PluginConfigsProvidersEffect = () => {
  const remotes = usePluginRemoteSync();
  const pluginsConfig = useAtomValue(pluginsConfigState);
  const setPluginsConfig = useSetAtom(pluginsConfigState);
  const setLoadingPluginsConfig = useSetAtom(loadingPluginsConfigState);

  useEffect(() => {
    const remoteNames = new Set(remotes.map((remote) => remote.name));

    // Drop configs whose remote left the registry so navigation and routes
    // disappear without a reload.
    setPluginsConfig((previous) => {
      if (!previous) {
        return previous;
      }

      const staleNames = Object.keys(previous).filter(
        (name) => !remoteNames.has(name),
      );

      if (staleNames.length === 0) {
        return previous;
      }

      const next = { ...previous };
      staleNames.forEach((name) => {
        delete next[name];
      });
      return next;
    });

    remotes.forEach((remote) => {
      if (!pluginsConfig?.[remote.name]) {
        loadPluginConfig(
          remote.name,
          setPluginsConfig,
          setLoadingPluginsConfig,
        );
      }
    });

    if (remotes.length === 0) {
      setLoadingPluginsConfig(false);
    }
  }, [remotes, pluginsConfig, setPluginsConfig, setLoadingPluginsConfig]);

  return null;
};
