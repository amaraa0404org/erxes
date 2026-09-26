import { AnyResolver, IRelation } from 'erxes-api-shared/core-types';
import {
  MutationCpManageRelationsArgs,
  MutationCreateMultipleRelationsArgs,
  MutationCreateRelationArgs,
  MutationDeleteRelationArgs,
  MutationManageRelationsArgs,
  MutationResolvers,
  MutationUpdateRelationArgs,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const relationsMutations: MutationResolvers<IContext> = {
  createRelation: async (
    _parent,
    { relation }: MutationCreateRelationArgs,
    { models }: IContext,
  ) => {
    return models.Relations.createRelation({ relation });
  },
  createMultipleRelations: async (
    _parent,
    { relations }: MutationCreateMultipleRelationsArgs,
    { models }: IContext,
  ) => {
    const docs = await models.Relations.createMultipleRelations({ relations });

    // Declared as JSON in the schema; the generated JSON output type is
    // Record<string, unknown> but the runtime scalar also serializes arrays.
    return docs as unknown as Record<string, unknown>;
  },

  updateRelation: async (
    _parent,
    { id, relation }: MutationUpdateRelationArgs,
    { models }: IContext,
  ) => {
    return models.Relations.updateRelation({ _id: id, doc: relation });
  },

  deleteRelation: async (
    _parent,
    { id }: MutationDeleteRelationArgs,
    { models }: IContext,
  ) => {
    const deleted = await models.Relations.deleteRelation({ _id: id });

    // The schema declares String!, so the DeleteResult reaches clients
    // stringified through the String scalar exactly as before.
    return deleted as unknown as string;
  },

  manageRelations: async (
    _parent,
    {
      contentType,
      contentId,
      relatedContentType,
      relatedContentIds,
    }: MutationManageRelationsArgs,
    { models }: IContext,
  ) => {
    return await models.Relations.manageRelations({
      contentType,
      contentId,
      relatedContentType,
      relatedContentIds: relatedContentIds || [],
    });
  },

  cpManageRelations: async (
    _parent,
    {
      contentType,
      contentId,
      relatedContentType,
      relatedContentIds,
    }: MutationCpManageRelationsArgs,
    { models }: IContext,
  ) => {
    return await models.Relations.manageRelations({
      contentType,
      contentId,
      relatedContentType,
      relatedContentIds: relatedContentIds || [],
    });
  },
};

(relationsMutations.cpManageRelations as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
