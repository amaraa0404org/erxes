import { IUserDocument } from 'erxes-api-shared/core-types';
import { IContext } from '~/connectionResolvers';

// PermissionGroup parents expose `_id`, DefaultPermissionGroup exposes `id`.
type PermissionGroupParent = { _id?: string; id?: string };

const memberResolver =
  (idField: 'id' | '_id') =>
  async (
    group: PermissionGroupParent,
    _args: unknown,
    { models }: IContext,
  ): Promise<IUserDocument[]> =>
    models.Users.find({ permissionGroupIds: group[idField] }).sort({
      'details.firstName': 1,
    });

export default {
  PermissionGroup: {
    members: memberResolver('_id'),
  },
  DefaultPermissionGroup: {
    members: memberResolver('id'),
  },
};
