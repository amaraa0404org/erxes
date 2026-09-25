import * as path from 'path';
import * as fs from 'fs';
import { getPlugin, getPlugins } from 'erxes-api-shared/utils';
import fetch from 'node-fetch';
import { pipeline } from 'node:stream/promises';

interface IServiceTarget {
  name: string;
  address: string;
  config?: { hasSubscriptions?: boolean };
}

async function downloadFile(url: string, path: string): Promise<void> {
  const res = await fetch(url, { timeout: 15_000 });

  if (!res.ok || !res.body) {
    throw new Error(`HTTP ${res.status}`);
  }

  await pipeline(res.body, fs.createWriteStream(path));
}

export default async function downloadPlugins(): Promise<void> {
  const directory = path.join(__dirname, './downloads');

  if (!fs.existsSync(directory)) {
    await fs.promises.mkdir(directory, { recursive: true });
  }

  await clearDirectory(directory);

  const serviceNames = await getPlugins();

  const allServices: IServiceTarget[] = await Promise.all(
    serviceNames.map(async (serviceName) => {
      const service = await getPlugin(serviceName);
      return { ...service, name: serviceName };
    }),
  );

  const services = allServices.filter(
    (service) => service.config?.hasSubscriptions,
  );

  await Promise.all(
    services.map(async (service) => {
      const url = `${service.address}/subscriptionPlugin.js`;
      const target = path.resolve(directory, `${service.name}.js`);
      try {
        await downloadFile(url, target);
        console.log(
          `${service.name} subscription plugin downloaded from ${url} to ${target}.`,
        );
      } catch (e) {
        console.error(
          `${service.name} subscription plugin download from ${url} to ${target} failed. ${
            e instanceof Error ? e.message : e
          }`,
          e,
        );
      }
    }),
  );
}

async function clearDirectory(directory: string) {
  const files = await fs.promises.readdir(directory);
  const unlinkPromises = files.map((file) =>
    fs.promises.unlink(`${directory}/${file}`),
  );
  await Promise.all(unlinkPromises);
}
