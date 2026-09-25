import * as path from 'path';
import * as fs from 'fs';

import downloadPlugins from './downloadPlugins';

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

export default async function getPluginConfigs(): Promise<any[]> {
  await downloadPlugins();
  const directory = path.join(__dirname, '/downloads');
  const files = getFilesFullPaths(directory, (name) => /\.(t|j)s$/.test(name));

  const modules = await Promise.all(
    files.map(async (file) => {
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

  return modules.filter(Boolean);
}
