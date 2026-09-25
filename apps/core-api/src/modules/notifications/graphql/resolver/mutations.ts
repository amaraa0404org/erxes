import { graphqlPubsub } from 'erxes-api-shared/utils';
import {
  MutationArchiveNotificationsArgs,
  MutationMarkAsReadNotificationsArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { generateNotificationsFilter } from '~/modules/notifications/graphql/resolver/utils';
import { release } from '~/utils/email/ramp';

export const notificationMutations: MutationResolvers<IContext> = {
  async archiveNotification(
    _root: unknown,
    { _id }: { _id: string },
    { models, user }: IContext,
  ) {
    const notification = await models.Notifications.findOne({ _id });

    if (!notification) throw new Error('Not found notification');

    if (notification.userId !== user._id)
      throw new Error('Not found notification');

    await models.Notifications.updateOne(
      { _id, userId: user._id },
      { isArchived: true },
    );

    graphqlPubsub.publish(`notificationArchived:${user._id}`, {
      notificationArchived: { userId: user._id, notificationId: _id },
    });

    return 'removed successfully';
  },

  async archiveNotifications(
    _root: unknown,
    { ids, archiveAll, filters }: MutationArchiveNotificationsArgs,
    { models, user }: IContext,
  ) {
    const idList = (ids || []).filter((id): id is string => !!id);

    const selector = archiveAll
      ? { ...generateNotificationsFilter(filters ?? {}) }
      : { _id: { $in: idList } };

    const notificationIds = await models.Notifications.find(
      { userId: user._id, ...selector },
      {
        _id: 1,
      },
    ).distinct('_id');

    await models.Notifications.updateMany(selector, { isArchived: true });

    graphqlPubsub.publish(`notificationArchived:${user._id}`, {
      notificationArchived: { userId: user._id, notificationIds },
    });

    return 'removed successfully';
  },

  async markNotificationAsRead(
    _root: unknown,
    { _id }: { _id: string },
    { models, user }: IContext,
  ) {
    const notification = await models.Notifications.findOne({ _id });
    if (!notification) throw new Error('Not found notification');

    if (!notification.isRead) {
      await models.Notifications.updateOne(
        { _id },
        { $set: { isRead: true, readAt: new Date() } },
      );

      graphqlPubsub.publish(`notificationRead:${user._id}`, {
        notificationRead: { userId: user._id, notificationId: _id },
      });
    }

    return { success: true };
  },

  async markAsReadNotifications(
    _root: unknown,
    { ids, ...filters }: MutationMarkAsReadNotificationsArgs,
    { models, user }: IContext,
  ) {
    const idList = (ids || []).filter((id): id is string => !!id);

    const filter = idList.length
      ? { _id: { $in: idList } }
      : generateNotificationsFilter(filters);

    const notificationIds = await models.Notifications.find(filter, {
      _id: 1,
    }).distinct('_id');

    await models.Notifications.updateMany(
      { ...filter, userId: user._id },
      {
        $set: { isRead: true, readAt: new Date() },
      },
    );

    graphqlPubsub.publish(`notificationRead:${user._id}`, {
      notificationRead: { userId: user._id, notificationIds },
    });

    return { success: true };
  },

  async updateNotificationSettingsEvent(
    _root: unknown,
    {
      input,
    }: { input: { event: string; enabled: boolean; channels: string[] } },
    { models, user }: IContext,
  ) {
    const { event, enabled, channels } = input;

    await models.NotificationSettings.updateOne(
      { userId: user._id },
      { $set: { [`events.${event}`]: { enabled, channels } } },
      { upsert: true },
    );

    return { success: true };
  },

  async updateNotificationSettingsChannel(
    _root: unknown,
    {
      input,
    }: {
      input: {
        channel: string;
        enabled: boolean;
        metadata?: Record<string, unknown>;
      };
    },
    { models, user }: IContext,
  ) {
    const { channel, enabled, metadata } = input;

    await models.NotificationSettings.updateOne(
      { userId: user._id },
      { $set: { [`channels.${channel}`]: { enabled, metadata } } },
      { upsert: true },
    );

    return { success: true };
  },

  async emailAddressRelease(
    _root: unknown,
    { email, note }: { email: string; note: string },
    { models, user, checkPermission }: IContext,
  ) {
    await checkPermission('broadcastUpdate');

    await models.EmailAddresses.release(email, user._id, note);

    return 'released';
  },

  async emailRampRelease(
    _root: unknown,
    { note }: { note: string },
    { models, user, checkPermission }: IContext,
  ) {
    await checkPermission('broadcastUpdate');

    return await release(models, user._id, note);
  },
};
