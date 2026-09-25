import { EmailAddressResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const emailAddressResolvers: EmailAddressResolvers<IContext> = {
  lane(root, _args, { models }) {
    return models.EmailAddresses.laneOf(root);
  },
};

export default emailAddressResolvers;
