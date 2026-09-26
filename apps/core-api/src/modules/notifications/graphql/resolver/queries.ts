import {
  IEmailAddressDocument,
  IEmailDeliveryDocument,
  INotificationDocument,
} from 'erxes-api-shared/core-modules';
import {
  cursorPaginate,
  escapeRegExp,
  getPlugin,
  getPlugins,
  normalizeEmail,
} from 'erxes-api-shared/utils';
import { FilterQuery, SortOrder } from 'mongoose';
import {
  NotificationSettings,
  QueryEmailAddressesArgs,
  QueryEmailDeliveriesArgs,
  QueryNotificationsArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { CORE_NOTIFICATION_MODULES } from '~/modules/notifications/constants';
import { generateNotificationsFilter } from '~/modules/notifications/graphql/resolver/utils';
import { TEmailLane } from 'erxes-api-shared/core-modules';
import { getStatus } from '~/utils/email/ramp';

const generateOrderByNotifications = (
  orderBy?: Record<string, unknown> | null,
): Record<string, SortOrder> => {
  const sort: Record<string, SortOrder> = { isRead: 1, createdAt: -1 };

  if (orderBy?.createdAt === 1) {
    sort.createdAt = 1;
  }

  if (orderBy?.priority) {
    sort.priorityLevel = orderBy.priority as SortOrder;
  }

  if (orderBy?.readAt) {
    sort.readAt = orderBy?.readAt as SortOrder;
  }

  return sort;
};

const generateActiveNotificationsFilter =
  (): FilterQuery<INotificationDocument> => ({
    $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
  });

export const notificationQueries: QueryResolvers<IContext> = {
  async emailDeliveries(
    _root: unknown,
    params: Partial<QueryEmailDeliveriesArgs>,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('broadcastUpdate');

    const {
      status,
      source,
      provider,
      searchValue,
      createdAtFrom,
      createdAtTo,
    } = params;

    const query: FilterQuery<IEmailDeliveryDocument> = {};

    if (createdAtFrom || createdAtTo) {
      query.createdAt = {
        ...(createdAtFrom ? { $gte: createdAtFrom } : {}),
        ...(createdAtTo ? { $lte: createdAtTo } : {}),
      };
    }

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (provider) {
      query.provider = provider;
    }

    if (searchValue) {
      const pattern = new RegExp(escapeRegExp(searchValue), 'i');

      query.$or = [{ toEmails: pattern }, { subject: pattern }];
    }

    const { list, totalCount, pageInfo } = await cursorPaginate({
      model: models.EmailDeliveries,
      params: {
        limit: params.limit ?? undefined,
        cursor: params.cursor ?? undefined,
        direction: params.direction ?? undefined,
        orderBy: { createdAt: -1 },
      },
      query,
    });

    // The deliveries model and the generated EmailDelivery mapper are two
    // interface shapes describing the same collection.
    return {
      list: list as unknown as IEmailDeliveryDocument[],
      totalCount,
      pageInfo,
    };
  },

  async emailDeliveryDetail(
    _root: unknown,
    { _id }: { _id: string },
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('broadcastUpdate');

    return await models.EmailDeliveries.findOne({ _id });
  },

  async pluginsNotifications() {
    const plugins = await getPlugins();

    const pluginsNotifications: Array<{
      pluginName: string;
      modules: Array<{
        name: string;
        description: string;
        icon: string;
        events: Array<{ name: string; title: string; description: string }>;
      }>;
    }> = [...CORE_NOTIFICATION_MODULES];

    for (const pluginName of plugins) {
      const plugin = await getPlugin(pluginName);
      const meta = plugin.config?.meta || {};

      if (meta?.notifications) {
        const notificationModules = meta.notifications?.modules || [];

        pluginsNotifications.push({
          pluginName,
          modules: notificationModules,
        });
      }
    }

    return pluginsNotifications;
  },

  async notifications(
    _root: unknown,
    params: QueryNotificationsArgs,
    { models, user }: IContext,
  ) {
    const filter = generateNotificationsFilter(params);

    let prioritized: INotificationDocument[] = [];

    if (params?.ids?.length) {
      prioritized = await models.Notifications.find({
        _id: { $in: params.ids },
        ...generateActiveNotificationsFilter(),
        userId: user._id,
      });
      params.limit = Math.max(1, (params.limit ?? 20) - prioritized.length);
    }

    const { list, totalCount, pageInfo } =
      await cursorPaginate<INotificationDocument>({
        model: models.Notifications,
        params: {
          ...params,
          limit: params.limit ?? undefined,
          cursor: params.cursor ?? undefined,
          direction: params.direction ?? undefined,
          orderBy: generateOrderByNotifications(params?.orderBy),
        },
        query: {
          ...filter,
          ...generateActiveNotificationsFilter(),
          userId: user._id,
        },
      });

    return {
      list: [...prioritized, ...list],
      totalCount: totalCount + prioritized.length,
      pageInfo,
    };
  },

  async notificationDetail(
    _root: unknown,
    { _id }: { _id: string },
    { models }: IContext,
  ) {
    const notification = await models.Notifications.findOne({ _id });
    if (!notification) {
      throw new Error('Not found notification');
    }
    return notification;
  },

  async unreadNotificationsCount(
    _root: unknown,
    _args,
    { models, user }: IContext,
  ) {
    return await models.Notifications.countDocuments({
      ...generateActiveNotificationsFilter(),
      userId: user._id,
      isRead: false,
    });
  },

  async notificationSettings(
    _root: unknown,
    _args,
    { models, user }: IContext,
  ) {
    const settings = await models.NotificationSettings.findOne({
      userId: user._id,
    }).lean();

    return settings as unknown as NotificationSettings | null;
  },

  async emailAddresses(
    _root: unknown,
    params: Partial<QueryEmailAddressesArgs>,
    { models }: IContext,
  ) {
    const { lane, suppressionReason, searchValue, emails } = params;

    const query: FilterQuery<IEmailAddressDocument> = {};
    const emailConditions: FilterQuery<IEmailAddressDocument>[] = [];

    if (emails?.length) {
      emailConditions.push({
        email: { $in: (emails as string[]).map(normalizeEmail) },
      });
    }

    if (lane) {
      Object.assign(
        query,
        models.EmailAddresses.laneFilter(lane as TEmailLane),
      );
    }

    if (suppressionReason) {
      query.suppressionReason = suppressionReason;
    }

    if (searchValue) {
      emailConditions.push({
        email: new RegExp(escapeRegExp(searchValue), 'i'),
      });
    }

    if (emailConditions.length) {
      query.$and = emailConditions;
    }

    const { list, totalCount, pageInfo } =
      await cursorPaginate<IEmailAddressDocument>({
        model: models.EmailAddresses,
        params: {
          limit: params.limit ?? undefined,
          cursor: params.cursor ?? undefined,
          direction: params.direction ?? undefined,
          orderBy: params.orderBy as Record<string, SortOrder> | undefined,
        },
        query,
      });

    return { list, totalCount, pageInfo };
  },

  async emailRampStatus(
    _root: unknown,
    _args,
    { models }: IContext,
  ) {
    return await getStatus(models);
  },
};
