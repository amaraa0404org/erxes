import { ICPCommentDocument } from '@/clientportal/types/comment';
import { AnyResolver } from 'erxes-api-shared/core-types';
import { cursorPaginate } from 'erxes-api-shared/utils';
import { FilterQuery } from 'mongoose';
import {
  QueryClientPortalCommentsArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

interface GetCommentParams {
  _id: string;
}

export const commentQueries: QueryResolvers<IContext> = {
  async clientPortalComment(
    _root: unknown,
    { _id }: GetCommentParams,
    { models }: IContext,
  ) {
    return models.CPComments.getComment(_id);
  },

  async clientPortalComments(
    _root: unknown,
    params: QueryClientPortalCommentsArgs,
    { models }: IContext,
  ) {
    const { filter } = params;

    const query: FilterQuery<ICPCommentDocument> = {};

    if (filter?.typeId) {
      query.typeId = filter.typeId;
    }

    if (filter?.type) {
      query.type = filter.type;
    }

    if (filter?.parentId !== undefined) {
      // Passing null explicitly still reaches Mongo as null, matching the
      // previous runtime behavior for `parentId: null` filters.
      query.parentId = filter.parentId as string;
    }

    if (filter?.userId) {
      query.userId = filter.userId;
    }

    if (filter?.userType) {
      query.userType = filter.userType;
    }

    const { list, totalCount, pageInfo } =
      await cursorPaginate<ICPCommentDocument>({
        model: models.CPComments,
        params: {
          orderBy: { createdAt: -1 },
        },
        query,
      });

    return { list, totalCount, pageInfo };
  },
};

// Queries accessible to both regular users and CPUsers
(commentQueries.clientPortalComment as AnyResolver).wrapperConfig = {
  skipPermission: true,
};

(commentQueries.clientPortalComments as AnyResolver).wrapperConfig = {
  skipPermission: true,
};
