import { gql } from '@apollo/client/core';
import { DocumentNode } from 'graphql';
import { ISubscriptionPluginModule } from './plugins/getPluginConfigs';

export default function getTypeDefs(
  plugins: ISubscriptionPluginModule[],
): DocumentNode {
  const pluginTypeDefs = (plugins || [])
    .map((plugin) => plugin.typeDefs)
    .join('\n\n');

  return gql`
    type Subscription {
      ${pluginTypeDefs}
      activityLogsChanged: Boolean
      userChanged(userId: String): JSON
      segmentBuildChanged(segmentId: String!): JSON
    }
  `;
}
