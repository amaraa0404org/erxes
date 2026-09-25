import { useAtomValue } from 'jotai';
import { pluginsConfigState } from 'ui-modules/states';

// Module Federation remote names normalize '-' to '_' (e.g. `erxes-agent`
// becomes `erxes_agent_ui`), and plugin config names may use either form, so
// compare both sides in underscore form.
const normalizePluginName = (name: string) => name.replace(/-/g, '_');

export const useIsPluginEnabled = (pluginName: string): boolean => {
  const pluginsConfig = useAtomValue(pluginsConfigState);

  if (!pluginsConfig) {
    return false;
  }

  const normalizedName = normalizePluginName(pluginName);

  return Object.values(pluginsConfig).some(
    (config) => normalizePluginName(config?.name ?? '') === normalizedName,
  );
};
