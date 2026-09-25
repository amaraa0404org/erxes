import { diffPluginRemotes } from './pluginRemoteDiff';

describe('diffPluginRemotes', () => {
  it('returns empty diff when registered remotes match the fetched list', () => {
    const diff = diffPluginRemotes(
      ['sales_ui', 'frontline_ui'],
      [
        { name: 'sales_ui', entry: 'http://localhost:3002/remoteEntry.js' },
        { name: 'frontline_ui', entry: 'http://localhost:3004/remoteEntry.js' },
      ],
    );

    expect(diff).toEqual({ toAdd: [], toRemove: [] });
  });

  it('marks fetched remotes that are not registered as additions', () => {
    const diff = diffPluginRemotes(
      ['sales_ui'],
      [
        { name: 'sales_ui', entry: 'http://localhost:3002/remoteEntry.js' },
        { name: 'hello_ui', entry: 'http://localhost:3012/remoteEntry.js' },
      ],
    );

    expect(diff.toAdd).toEqual([
      { name: 'hello_ui', entry: 'http://localhost:3012/remoteEntry.js' },
    ]);
    expect(diff.toRemove).toEqual([]);
  });

  it('marks registered remotes missing from the fetched list as removals', () => {
    const diff = diffPluginRemotes(
      ['sales_ui', 'frontline_ui'],
      [{ name: 'sales_ui', entry: 'http://localhost:3002/remoteEntry.js' }],
    );

    expect(diff.toAdd).toEqual([]);
    expect(diff.toRemove).toEqual(['frontline_ui']);
  });

  it('handles additions and removals in the same fetch', () => {
    const diff = diffPluginRemotes(
      ['sales_ui', 'frontline_ui'],
      [
        { name: 'sales_ui', entry: 'http://localhost:3002/remoteEntry.js' },
        { name: 'hello_ui', entry: 'http://localhost:3012/remoteEntry.js' },
      ],
    );

    expect(diff.toAdd).toEqual([
      { name: 'hello_ui', entry: 'http://localhost:3012/remoteEntry.js' },
    ]);
    expect(diff.toRemove).toEqual(['frontline_ui']);
  });

  it('marks every fetched remote as an addition when nothing is registered', () => {
    const diff = diffPluginRemotes(
      [],
      [{ name: 'hello_ui', entry: 'http://localhost:3012/remoteEntry.js' }],
    );

    expect(diff.toAdd).toEqual([
      { name: 'hello_ui', entry: 'http://localhost:3012/remoteEntry.js' },
    ]);
    expect(diff.toRemove).toEqual([]);
  });

  it('marks every registered remote as a removal when the fetched list is empty', () => {
    const diff = diffPluginRemotes(['sales_ui', 'frontline_ui'], []);

    expect(diff.toAdd).toEqual([]);
    expect(diff.toRemove).toEqual(['sales_ui', 'frontline_ui']);
  });
});
