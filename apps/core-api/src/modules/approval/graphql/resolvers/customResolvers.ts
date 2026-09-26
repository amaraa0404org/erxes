import { ApprovalRequestResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const approvalCustomResolvers: {
  ApprovalRequest: ApprovalRequestResolvers<IContext>;
} = {
  ApprovalRequest: {
    async requester({ requesterId }, _args, { models }) {
      return models.Users.findOne({ _id: requesterId });
    },

    async requiredApprovers({ requiredApproverIds }, _args, { models }) {
      return models.Users.find({
        _id: { $in: requiredApproverIds || [] },
      });
    },

    async content({ contentType, contentId }) {
      return {
        contentType,
        contentId,
        label: contentType,
      };
    },
  },
};
