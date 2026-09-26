import { apolloCommonTypes } from 'erxes-api-shared/utils';
import { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import { queries } from '~/apollo/schema/schema';

export const typeDefs = async (): Promise<DocumentNode> => {
  return gql`
    ${apolloCommonTypes}
    extend type Query {
      ${queries}
    }
  `;
};
