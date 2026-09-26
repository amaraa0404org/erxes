import { AnyResolver } from 'erxes-api-shared/core-types';
import { IContext } from '~/connectionResolvers';
import { cursorPaginate } from 'erxes-api-shared/utils';
import { FilterQuery } from 'mongoose';
import {
  QueryClientPortalNotificationsArgs,
  QueryGetClientPortalNotificationsByCpUserIdArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { ICPNotificationDocument } from '@/clientportal/types/cpNotification';
import { buildCPNotificationQuery } from '@/clientportal/services/helpers/queryBuilders';

export const cpNotificationQueries: QueryResolvers<IContext> = {
  async getClientPortalNotificationsByCpUserId(
    _root: unknown,
    params: QueryGetClientPortalNotificationsByCpUserIdArgs,
    { models }: IContext,
  ) {
    const query = buildCPNotificationQuery(
      { cpUserId: params.cpUserId },
      params,
    );

    const { list, totalCount, pageInfo } =
      await cursorPaginate<ICPNotificationDocument>({
        model: models.CPNotifications,
        params: {
          limit: params.limit ?? undefined,
          cursor: params.cursor ?? undefined,
          direction: params.direction ?? undefined,
          orderBy: { createdAt: -1 },
        },
        query,
      });

    return { list, totalCount, pageInfo };
  },

  async clientPortalNotifications(
    _root: unknown,
    params: QueryClientPortalNotificationsArgs,
    { models, cpUser }: IContext,
  ) {
    if (!cpUser) {
      throw new Error('User is not logged in');
    }

    const query = buildCPNotificationQuery({ cpUserId: cpUser._id }, params);

    const { list, totalCount, pageInfo } =
      await cursorPaginate<ICPNotificationDocument>({
        model: models.CPNotifications,
        params: {
          limit: params.limit ?? undefined,
          cursor: params.cursor ?? undefined,
          direction: params.direction ?? undefined,
          orderBy: { createdAt: -1 },
        },
        query,
      });

    return { list, totalCount, pageInfo };
  },

  async clientPortalNotificationDetail(
    _root: unknown,
    { _id }: { _id: string },
    { models, cpUser }: IContext,
  ) {
    if (!cpUser) {
      throw new Error('User is not logged in');
    }

    const notification = await models.CPNotifications.findOne({
      _id,
      cpUserId: cpUser._id,
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    return notification;
  },

  async clientPortalUnreadNotificationCount(
    _root: unknown,
    { clientPortalId }: { clientPortalId?: string },
    { models, cpUser }: IContext,
  ) {
    if (!cpUser) {
      throw new Error('User is not logged in');
    }

    const query: FilterQuery<ICPNotificationDocument> = {
      cpUserId: cpUser._id,
      isRead: false,
    };

    if (clientPortalId) {
      query.clientPortalId = clientPortalId;
    }

    return models.CPNotifications.countDocuments(query);
  },
};

(cpNotificationQueries.clientPortalNotifications as AnyResolver).wrapperConfig =
  {
    forClientPortal: true,
  };

(
  cpNotificationQueries.clientPortalNotificationDetail as AnyResolver
).wrapperConfig = {
  forClientPortal: true,
};

(
  cpNotificationQueries.clientPortalUnreadNotificationCount as AnyResolver
).wrapperConfig = {
  forClientPortal: true,
};
