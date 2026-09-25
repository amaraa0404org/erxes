import { AnyResolver } from 'erxes-api-shared/core-types';
import { cursorPaginate, escapeRegExp } from 'erxes-api-shared/utils';
import {
  QueryGetClientPortalUsersArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { SortOrder } from 'mongoose';
import { IContext } from '~/connectionResolvers';
import { ICPUserDocument } from '@/clientportal/types/cpUser';

export const cpUserQueries: QueryResolvers<IContext> = {
  async clientPortalCurrentUser(
    _root: unknown,
    _args: unknown,
    { models, cpUser }: IContext,
  ) {
    if (!cpUser) {
      throw new Error('User is not logged in');
    }

    return cpUser ? await models.CPUser.findOne({ _id: cpUser._id }) : null;
  },

  async getClientPortalUsers(
    _root: unknown,
    args: QueryGetClientPortalUsersArgs,
    { models }: IContext,
  ) {
    const filter = args.filter || {};
    const query: Record<string, unknown> = {};

    if (filter.clientPortalId) {
      query.clientPortalId = filter.clientPortalId;
    }

    if (filter.type) {
      query.type = filter.type;
    }

    if (typeof filter.isVerified === 'boolean') {
      query.isVerified = filter.isVerified;
    }

    if (filter?.searchValue?.trim()) {
      const regex = new RegExp(
        `.*${escapeRegExp(filter?.searchValue?.trim())}.*`,
        'i',
      );
      query.$or = [
        { email: regex },
        { phone: regex },
        { firstName: regex },
        { lastName: regex },
      ];
    }

    const orderBy: Record<string, SortOrder> = (filter.orderBy as Record<
      string,
      SortOrder
    > | null | undefined) || { createdAt: -1 };

    const { list, totalCount, pageInfo } =
      await cursorPaginate<ICPUserDocument>({
        model: models.CPUser,
        params: {
          limit: filter.limit ?? undefined,
          cursor: filter.cursor ?? undefined,
          direction: filter.direction ?? undefined,
          orderBy,
        },
        query,
      });

    return { list, totalCount, pageInfo };
  },

  async getClientPortalUser(
    _root: unknown,
    { _id }: { _id: string },
    { models }: IContext,
  ) {
    return models.CPUser.findOne({ _id }).lean();
  },
};

(cpUserQueries.clientPortalCurrentUser as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
