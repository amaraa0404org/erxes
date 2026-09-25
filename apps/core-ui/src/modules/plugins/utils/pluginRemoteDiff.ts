export interface PluginRemote {
  name: string;
  entry: string;
}

export interface PluginRemoteDiff {
  toAdd: PluginRemote[];
  toRemove: string[];
}

export const diffPluginRemotes = (
  registeredRemoteNames: string[],
  fetchedRemotes: PluginRemote[],
): PluginRemoteDiff => {
  const registeredNames = new Set(registeredRemoteNames);
  const fetchedNames = new Set(fetchedRemotes.map((remote) => remote.name));

  return {
    toAdd: fetchedRemotes.filter((remote) => !registeredNames.has(remote.name)),
    toRemove: registeredRemoteNames.filter((name) => !fetchedNames.has(name)),
  };
};
