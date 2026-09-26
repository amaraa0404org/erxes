import { IContext } from '~/connectionResolvers';
import {
  IPermissionGroupPermission,
  IPermissionInput,
} from 'erxes-api-shared/core-types';
import {
  MutationPermissionGroupAddArgs,
  MutationPermissionGroupEditArgs,
  MutationPermissionGroupRemoveArgs,
  MutationResolvers,
  MutationUserAddCustomPermissionArgs,
  MutationUserRemoveCustomPermissionArgs,
  MutationUsersUpdatePermissionGroupsArgs,
  MutationUserUpdatePermissionGroupsArgs,
  PermissionInput,
} from '~/__generated__/graphql';
import { generateUserUpdateActivityLogs } from '~/modules/organization/team-member/meta/activity-log';
import { clearGroupActionsCache } from 'erxes-api-shared/core-modules';

const toGroupPermission = ({
  plugin,
  module,
  actions,
  scope,
}: PermissionInput): IPermissionGroupPermission => ({
  plugin,
  module,
  actions: actions.filter((a): a is string => typeof a === 'string'),
  scope: scope as IPermissionGroupPermission['scope'],
});

const toPermissionInput = ({
  module,
  actions,
  scope,
}: PermissionInput): IPermissionInput => ({
  module,
  actions: actions.filter((a): a is string => typeof a === 'string'),
  scope: scope as IPermissionInput['scope'],
});

export const permissionMutations: MutationResolvers<IContext> = {
  async permissionGroupAdd(
    _root,
    { name, description, permissions }: MutationPermissionGroupAddArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('permissionsManage');

    return models.PermissionGroups.create({
      name,
      description: description ?? undefined,
      permissions: permissions.map(toGroupPermission),
    });
  },

  // Update custom permission group
  async permissionGroupEdit(
    _root,
    {
      _id,
      name,
      description,
      permissions,
    }: MutationPermissionGroupEditArgs,
    { models, checkPermission, subdomain }: IContext,
  ) {
    await checkPermission('permissionsManage');

    const group = await models.PermissionGroups.findOne({ _id });
    if (!group) throw new Error('Permission group not found');

    const update: {
      name?: string;
      description?: string;
      permissions?: IPermissionGroupPermission[];
    } = {};
    if (name != null) update.name = name;
    if (description != null) update.description = description;
    if (permissions != null)
      update.permissions = permissions.map(toGroupPermission);

    await models.PermissionGroups.updateOne({ _id }, { $set: update });

    await clearGroupActionsCache({ subdomain, groupId: _id });

    return models.PermissionGroups.findOne({ _id });
  },

  // Remove custom permission group
  async permissionGroupRemove(
    _root,
    { _id }: MutationPermissionGroupRemoveArgs,
    { models, checkPermission, subdomain }: IContext,
  ) {
    await checkPermission('permissionsManage');

    const group = await models.PermissionGroups.findOne({ _id });
    if (!group) throw new Error('Permission group not found');

    await clearGroupActionsCache({ subdomain, groupId: _id });

    // Remove from all users
    await models.Users.updateMany(
      { permissionGroupIds: _id },
      { $pull: { permissionGroupIds: _id } },
    );

    await models.PermissionGroups.deleteOne({ _id });

    return { success: true };
  },

  // Assign permission groups to user
  async userUpdatePermissionGroups(
    _root,
    { userId, groupIds }: MutationUserUpdatePermissionGroupsArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('permissionsManage');

    const user = await models.Users.findOne({ _id: userId });
    if (!user) throw new Error('User not found');

    await models.Users.updateUser(userId, {
      permissionGroupIds: groupIds,
    });

    await clearGroupActionsCache({ userId });

    return models.Users.findOne({ _id: userId });
  },

  // Assign permission groups to many users at once.
  // Default groups (id contains ':') replace any existing group with the
  // same plugin prefix; custom groups (Mongo ObjectId, no ':') are added.
  async usersUpdatePermissionGroups(
    _root,
    { userIds, groupIds }: MutationUsersUpdatePermissionGroupsArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('permissionsManage');

    const newDefaultPrefixes = groupIds
      .filter((id) => id.includes(':'))
      .map((id) => id.split(':')[0]);

    const users = await models.Users.find({
      _id: { $in: userIds },
    }).lean();

    const foundIds = new Set(users.map((u) => u._id));
    const missing = userIds.filter((id) => !foundIds.has(id));
    if (missing.length) {
      throw new Error(`Users not found: ${missing.join(', ')}`);
    }

    for (const user of users) {
      const existing: string[] = user.permissionGroupIds || [];

      const kept = existing.filter((id) => {
        if (!id.includes(':')) return true;
        const prefix = id.split(':')[0];
        return !newDefaultPrefixes.includes(prefix);
      });

      const merged = Array.from(new Set([...kept, ...groupIds]));

      await models.Users.updateUser(user._id, {
        permissionGroupIds: merged,
      });

      await clearGroupActionsCache({ userId: user._id });
    }

    return { success: true, count: users.length };
  },

  // Add custom permission to user
  async userAddCustomPermission(
    _root,
    { userId, permission }: MutationUserAddCustomPermissionArgs,
    { subdomain, models, eventHandlers, checkPermission }: IContext,
  ) {
    await checkPermission('permissionsManage');

    const user = await models.Users.findOne({ _id: userId });
    if (!user) throw new Error('User not found');

    const customPermission = toPermissionInput(permission);

    const { sendDbEventLog, createActivityLog } = eventHandlers('core')(
      'organization',
      'users',
    );
    // Remove existing permission for same module (replace)
    await models.Users.updateOne(
      { _id: userId },
      { $pull: { customPermissions: { module: customPermission.module } } },
    );

    // Add new permission

    await models.Users.updateOne(
      { _id: userId },
      { $push: { customPermissions: customPermission } },
    );

    const updatedUser = await models.Users.findOne({ _id: userId });
    if (updatedUser) {
      sendDbEventLog({
        action: 'update',
        docId: updatedUser._id,
        currentDocument: updatedUser.toObject(),
        prevDocument: user.toObject(),
      });

      // Generate activity logs for changed activity fields
      generateUserUpdateActivityLogs(
        { models, subdomain },
        user,
        updatedUser,
        createActivityLog,
      );
    }
    await clearGroupActionsCache({ userId });
    return updatedUser;
  },

  // Remove custom permission from user
  async userRemoveCustomPermission(
    _root,
    { userId, module }: MutationUserRemoveCustomPermissionArgs,
    { models, subdomain, eventHandlers, checkPermission }: IContext,
  ) {
    await checkPermission('permissionsManage');

    const user = await models.Users.findOne({ _id: userId });
    if (!user) throw new Error('User not found');
    const { sendDbEventLog, createActivityLog } = eventHandlers('core')(
      'organization',
      'users',
    );
    await models.Users.updateOne(
      { _id: userId },
      { $pull: { customPermissions: { module } } },
    );

    const updatedUser = await models.Users.findOne({ _id: userId });

    if (updatedUser) {
      sendDbEventLog({
        action: 'update',
        docId: updatedUser._id,
        currentDocument: updatedUser.toObject(),
        prevDocument: user.toObject(),
      });

      // Generate activity logs for changed activity fields
      generateUserUpdateActivityLogs(
        { models, subdomain },
        user,
        updatedUser,
        createActivityLog,
      );
    }
    await clearGroupActionsCache({ userId });
    return updatedUser;
  },
};
