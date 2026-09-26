import { AnyResolver } from 'erxes-api-shared/core-types';
import {
  QueryCpGetRelationsByEntityArgs,
  QueryGetRelationsByEntitiesArgs,
  QueryGetRelationsByEntityArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const relationsQueries: QueryResolvers<IContext> = {
  getRelationsByEntity: async (
    _parent,
    {
      contentType,
      contentId,
      relatedContentType,
    }: QueryGetRelationsByEntityArgs,
    { models }: IContext,
  ) => {
    return models.Relations.getRelationsByEntity({
      contentType,
      contentId,
      relatedContentType,
    });
  },
  getRelationsByEntities: async (
    _parent,
    { contentTypes, contentIds }: QueryGetRelationsByEntitiesArgs,
    { models }: IContext,
  ) => {
    return models.Relations.getRelationsByEntities({
      contentTypes,
      contentIds,
    });
  },

  cpGetRelationsByEntity: async (
    _parent,
    {
      contentType,
      contentId,
      relatedContentType,
    }: QueryCpGetRelationsByEntityArgs,
    { models }: IContext,
  ) => {
    return models.Relations.getRelationsByEntity({
      contentType,
      contentId,
      relatedContentType,
    });
  },
};

(relationsQueries.cpGetRelationsByEntity as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
