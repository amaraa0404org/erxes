import * as dotenv from 'dotenv';

dotenv.config();

import getPluginConfigs from './plugins/getPluginConfigs';
import genTypeDefs from './genTypeDefs';
import genResolvers, { TSubscriptionResolvers } from './resolvers/genResolvers';
import { DocumentNode } from 'graphql';

export interface ISubscriptionTypeDefsAndResolvers {
  typeDefs: DocumentNode;
  resolvers: TSubscriptionResolvers;
}

export default async function genTypeDefsAndResolvers(): Promise<ISubscriptionTypeDefsAndResolvers | null> {
  const plugins = await getPluginConfigs();

  if (!plugins?.length) {
    return null;
  }

  const typeDefs = genTypeDefs(plugins);
  const resolvers = genResolvers(plugins);

  return { typeDefs, resolvers };
}
