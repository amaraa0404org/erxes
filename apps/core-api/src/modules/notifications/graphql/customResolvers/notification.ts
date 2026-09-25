import { NotificationResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const notificationResolvers: NotificationResolvers<IContext> = {
  __resolveReference({ _id }, { models }) {
    return models.Notifications.findOne({ _id });
  },

  async fromUser({ fromUserId }, _args, { models }) {
    return await models.Users.findOne({ _id: fromUserId });
  },

  async emailDelivery({ _id }, _args, { models }) {
    return await models.EmailDeliveries.findOne({ notificationId: _id });
  },
};

export default notificationResolvers;
