import * as dotenv from 'dotenv';

import { ErxesProxyTarget } from '~/proxy/targets';
import { supergraphConfigPath, supergraphPath } from '~/apollo-router/paths';
import * as fs from 'fs';
import { execSync } from 'child_process';
import isSameFile from '~/util/is-same-file';
import * as yaml from 'yaml';

dotenv.config();

const { NODE_ENV } = process.env;

type SupergraphConfig = {
  federation_version: string;
  subgraphs: {
    [name: string]: {
      routing_url: string;
      schema: {
        subgraph_url: string;
      };
    };
  };
};

const writeSupergraphConfig = async (proxyTargets: ErxesProxyTarget[]) => {
  const superGraphConfigNext = supergraphConfigPath + '.next';
  const config: SupergraphConfig = {
    federation_version: '=2.9.3',
    subgraphs: {},
  };

  for (const { name, address } of proxyTargets) {
    const endpoint = `${address}/graphql`;
    config.subgraphs[name] = {
      routing_url: endpoint,
      schema: {
        subgraph_url: endpoint,
      },
    };
  }

  fs.writeFileSync(superGraphConfigNext, yaml.stringify(config), {
    encoding: 'utf-8',
  });

  if (
    !fs.existsSync(supergraphConfigPath) ||
    !isSameFile(supergraphConfigPath, superGraphConfigNext)
  ) {
    fs.cpSync(superGraphConfigNext, supergraphConfigPath, { force: true });
  }
};

// Composes to a `.next` file and only replaces the live supergraph when the
// output actually changed, so the router's --hot-reload watcher is not poked
// by identical rewrites. If rover fails this throws before the copy, leaving
// the last good supergraph in place.
const supergraphComposeOnce = async () => {
  const superGraphqlNext = supergraphPath + '.next';

  execSync(
    NODE_ENV === 'production'
      ? `rover supergraph compose --config ${supergraphConfigPath} --output ${superGraphqlNext} --elv2-license=accept --log=error`
      : `pnpm rover supergraph compose --config ${supergraphConfigPath} --output ${superGraphqlNext} --elv2-license=accept --client-timeout=80000`,
  );

  if (
    !fs.existsSync(supergraphPath) ||
    !isSameFile(supergraphPath, superGraphqlNext)
  ) {
    fs.cpSync(superGraphqlNext, supergraphPath, { force: true });
    console.log(`NEW Supergraph Schema was printed to ${supergraphPath}`);
  }
};

export default async function supergraphCompose(
  proxyTargets: ErxesProxyTarget[],
) {
  await writeSupergraphConfig(proxyTargets);
  await supergraphComposeOnce();
}
