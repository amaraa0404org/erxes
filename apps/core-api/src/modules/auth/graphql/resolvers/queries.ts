import { markResolvers } from 'erxes-api-shared/utils';
import { QueryResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const authQueries: QueryResolvers<IContext> = {
  /**
   * Current user
   */
  async currentUser(
    _parent,
    _args,
    { user, models }: IContext,
  ) {
    const result = user
      ? await models.Users.findOne({ _id: user._id, isActive: { $ne: false } })
      : null;

    return result;
  },
};

markResolvers(authQueries, {
  wrapperConfig: {
    skipPermission: true,
  },
});
