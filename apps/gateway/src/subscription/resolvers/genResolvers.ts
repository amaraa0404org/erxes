import * as dotenv from 'dotenv';

dotenv.config();

import graphqlPubsub from '../pubsub';
import * as _ from 'lodash';
import activityLogs from './activityLogs';
import segments from './segments';
import users from './users';
import { ISubscriptionPluginModule } from '../plugins/getPluginConfigs';
import type { IExecutableSchemaDefinition } from '@graphql-tools/schema';

// `makeExecutableSchema`'s resolver map shape (`IResolvers | IResolvers[]`);
// derived here because @graphql-tools/utils is not a direct dependency.
export type TSubscriptionResolvers = NonNullable<
  IExecutableSchemaDefinition['resolvers']
>;

export default function genResolvers(
  plugins: ISubscriptionPluginModule[],
): TSubscriptionResolvers {
  const pluginResolversArray = plugins.map((plugin) =>
    plugin.generateResolvers(graphqlPubsub),
  );

  const pluginResolvers = _.merge({}, ...pluginResolversArray);

  const Subscription = {
    ...pluginResolvers,
    ...activityLogs,
    ...segments,
    ...users,
  };

  return {
    Subscription,
  };
}
