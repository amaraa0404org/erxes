import { REACT_APP_API_URL } from 'erxes-ui';

import type { PluginRemote } from './pluginRemoteDiff';

export const fetchFrontendPluginRemotes = async (): Promise<PluginRemote[]> => {
  const response = await fetch(`${REACT_APP_API_URL}/get-frontend-plugins`);
  return response.json();
};
