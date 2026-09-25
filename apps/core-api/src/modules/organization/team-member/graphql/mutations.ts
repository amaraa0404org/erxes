import {
  AnyResolver,
  IEmailSignature,
  IUser,
} from 'erxes-api-shared/core-types';
import { CookieOptions } from 'express';
import {
  authCookieOptions,
  getEnv,
  getPlugin,
  getPlugins,
  getSaasOrganizationDetail,
  graphqlPubsub,
} from 'erxes-api-shared/utils';
import { IContext, IModels } from '~/connectionResolvers';
import { saveValidatedToken } from '~/modules/auth/utils';
import { sendInvitationEmail } from '../utils';
import { sendOnboardNotification } from '~/modules/notifications/utils';
import {
  MutationResolvers,
  MutationUsersConfigEmailSignaturesArgs,
  MutationUsersConfirmInvitationArgs,
  MutationUsersCreateOwnerArgs,
  MutationUsersEditArgs,
  MutationUsersEditProfileArgs,
  MutationUsersInviteArgs,
  MutationUsersSetChatStatusArgs,
  MutationUsersSetActiveStatusArgs,
  MutationUsersSetActiveStatusBatchArgs,
  MutationUsersConfigGetNotificationByEmailArgs,
  MutationUsersResendInvitationArgs,
  MutationUsersResetMemberPasswordArgs,
  MutationUsersChangePasswordArgs,
  MutationEditOrganizationInfoArgs,
  MutationEditOrganizationDomainArgs,
} from '~/__generated__/graphql';

export interface IUsersEdit extends IUser {
  channelIds?: string[];
  _id: string;
}

const publishUserStatusChanged = (
  subdomain: string,
  userId: string,
  updatedUser: IUser,
) => {
  const payload = { userStatusChanged: updatedUser };

  return Promise.all([
    graphqlPubsub.publish(`userStatusChanged:${subdomain}:${userId}`, payload),
    graphqlPubsub.publish(`userStatusChanged:${subdomain}`, payload),
  ]);
};

const validatePermissionGroupIds = async (
  models: IModels,
  permissionGroupIds: string[],
) => {
  const validPermissionGroupIds = new Set<string>();
  const plugins = await getPlugins();

  for (const name of plugins) {
    const service = await getPlugin(name);
    const defaultGroups = service?.config?.meta?.permissions?.defaultGroups;

    if (!defaultGroups) continue;

    for (const group of defaultGroups) {
      validPermissionGroupIds.add(group.id);
    }
  }

  const customPermissionGroupIds = permissionGroupIds.filter(
    (id) => !validPermissionGroupIds.has(id),
  );

  if (customPermissionGroupIds.length > 0) {
    const permissionGroups = await models.PermissionGroups.find({
      _id: { $in: customPermissionGroupIds },
    })
      .select('_id')
      .lean();

    for (const group of permissionGroups) {
      validPermissionGroupIds.add(String(group._id));
    }
  }

  const invalidPermissionGroupIds = permissionGroupIds.filter(
    (id) => !validPermissionGroupIds.has(id),
  );

  if (invalidPermissionGroupIds.length > 0) {
    throw new Error(
      `One or more permission groups are invalid: ${invalidPermissionGroupIds.join(
        ', ',
      )}`,
    );
  }
};

export const userMutations: MutationResolvers<IContext> = {
  async usersCreateOwner(
    _parent,
    {
      email,
      password,
      firstName,
      lastName,
      purpose,
      subscribeEmail,
    }: MutationUsersCreateOwnerArgs,
    { models },
  ) {
    const userCount = await models.Users.countDocuments();

    if (userCount > 0) {
      throw new Error('Access denied');
    }

    const doc: IUser = {
      isOwner: true,
      email: (email || '').toLowerCase().trim(),
      password: (password || '').trim(),
      details: {
        fullName: `${firstName} ${lastName || ''}`,
        firstName,
        lastName: lastName ?? undefined,
      },
    };

    await models.Users.createUser(doc);

    if (subscribeEmail && process.env.NODE_ENV === 'production') {
      await fetch('https://erxes.io/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          email,
          purpose,
          firstName,
          lastName,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return 'success';
  },

  /*
   * Reset member's password
   */
  async usersResetMemberPassword(
    _parent,
    args: MutationUsersResetMemberPasswordArgs,
    { models, checkPermission },
  ) {
    await checkPermission('teamMembersResetPassword');

    return models.Users.resetMemberPassword(args);
  },

  /*
   * Change user password
   */
  async usersChangePassword(
    _parent,
    args: MutationUsersChangePasswordArgs,
    { user, models },
  ) {
    return models.Users.changePassword({ _id: user._id, ...args });
  },

  /*
   * Update user
   */
  async usersEdit(
    _parent,
    args: MutationUsersEditArgs,
    { user, models, checkPermission },
  ) {
    const { _id, unitId, ...doc } = args;

    if (user._id !== _id) {
      await checkPermission('teamMembersUpdate', _id);
    }

    let updatedDoc = doc;

    if (doc.details) {
      updatedDoc = {
        ...doc,
        details: {
          ...doc.details,
          fullName: `${doc.details.firstName || ''} ${
            doc.details.lastName || ''
          }`,
        },
      };
    }

    const updatedUser = await models.Users.updateUser(
      _id,
      updatedDoc as Parameters<IModels['Users']['updateUser']>[1],
    );

    if (args.departmentIds || args.branchIds) {
      await models.UserMovements.manageUserMovement({
        user: updatedUser,
      });
    }

    if (unitId !== undefined) {
      await models.Units.updateMany(
        { userIds: _id },
        { $pull: { userIds: _id } },
      );
      if (unitId) {
        await models.Units.updateOne(
          { _id: unitId },
          { $addToSet: { userIds: _id } },
        );
      }
    }

    return updatedUser;
  },

  /*
   * Edit user profile
   */
  async usersEditProfile(
    _parent,
    {
      username,
      email,
      details,
      links,
      employeeId,
      positionIds,
    }: MutationUsersEditProfileArgs,
    { user, models },
  ) {
    const doc = {
      username,
      email,
      details: {
        ...details,
        fullName: `${details?.firstName || ''} ${details?.lastName || ''}`,
      },
      links,
      employeeId,
      positionIds,
    };

    const updatedUser = await models.Users.editProfile(
      user._id,
      doc as Parameters<IModels['Users']['editProfile']>[1],
    );

    return updatedUser;
  },

  /*
   * Set Active or inactive user
   */
  async usersSetActiveStatus(
    _parent,
    { _id }: MutationUsersSetActiveStatusArgs,
    { user, models, subdomain, checkPermission },
  ) {
    await checkPermission('teamMembersRemove');

    if (user._id === _id) {
      throw new Error('You can not delete yourself');
    }

    const updatedUser = await models.Users.setUserActiveOrInactive(_id);

    await publishUserStatusChanged(subdomain, _id, updatedUser);

    return updatedUser;
  },

  async usersSetActiveStatusBatch(
    _parent,
    { _ids }: MutationUsersSetActiveStatusBatchArgs,
    { user, models, subdomain, checkPermission },
  ) {
    await checkPermission('teamMembersRemove');

    for (const _id of _ids) {
      if (user._id === _id) {
        throw new Error('You can not delete yourself');
      }
    }

    for (const _id of _ids) {
      const targetUser = await models.Users.findOne({ _id });

      if (targetUser && targetUser.isActive !== false) {
        const updatedUser = await models.Users.setUserActiveOrInactive(_id);

        await publishUserStatusChanged(subdomain, _id, updatedUser);
      }
    }

    return true;
  },

  /*
   * Invites users to team members
   */
  async usersInvite(
    _parent,
    { entries }: MutationUsersInviteArgs,
    { models, subdomain, user, checkPermission },
  ) {
    await checkPermission('teamMembersInvite');

    const permissionGroupIds = [
      ...new Set(
        entries.reduce<string[]>(
          (ids, entry) => ids.concat(entry.permissionGroupIds || []),
          [],
        ),
      ),
    ];

    if (permissionGroupIds.length > 0) {
      await checkPermission('permissionsManage');
      await validatePermissionGroupIds(models, permissionGroupIds);
    }

    for (const entry of entries) {
      await models.Users.checkDuplication({ email: entry.email });

      const token = await models.Users.invite({
        email: entry.email,
        password: entry.password ?? undefined,
        permissionGroupIds: entry.permissionGroupIds ?? undefined,
      });

      sendInvitationEmail(models, subdomain, {
        email: entry.email,
        token,
        userId: user._id,
      });
    }

    return null;
  },

  /*
   * Resend invitation
   */
  async usersResendInvitation(
    _parent,
    { email }: MutationUsersResendInvitationArgs,
    { models },
  ) {
    const token = await models.Users.resendInvitation({ email });

    return token;
  },

  async usersConfirmInvitation(
    _parent,
    { token: registrationToken }: MutationUsersConfirmInvitationArgs,
    { res, models, requestInfo, subdomain },
  ) {
    const user = await models.Users.findOne({
      registrationToken,
      registrationTokenExpires: {
        $gt: Date.now(),
      },
    });

    if (!user || !registrationToken) {
      throw new Error('Token is invalid or has expired');
    }

    const [token] = await models.Users.createTokens(
      user,
      models.Users.getSecret(),
    );

    await saveValidatedToken(token, user);

    await models.Users.updateOne(
      { _id: user._id },
      {
        $push: { validatedTokens: token },
        $set: { isActive: true },
        $unset: {
          registrationToken: '',
          registrationTokenExpires: '',
        },
      },
    );

    const sameSite = getEnv({ name: 'SAME_SITE' });
    const DOMAIN = getEnv({ name: 'DOMAIN', subdomain });
    const VERSION = getEnv({ name: 'VERSION' });

    if (VERSION === 'saas') {
      const organization = await getSaasOrganizationDetail({ subdomain });

      const cookieOptions = authCookieOptions();

      if (organization.domain && organization.dnsStatus === 'active') {
        cookieOptions.secure = true;
        cookieOptions.sameSite = 'none';
      }

      res.cookie('auth-token', token, cookieOptions);
    } else {
      const cookieOptions: Omit<CookieOptions, 'expires'> & {
        expires?: number;
      } = { secure: requestInfo.secure };

      if (
        sameSite &&
        sameSite === 'none' &&
        res.req.headers.origin !== DOMAIN
      ) {
        cookieOptions.sameSite = sameSite;
      }

      res.cookie('auth-token', token, authCookieOptions(cookieOptions));
    }

    await sendOnboardNotification(subdomain, models, user._id);

    return 'accepted';
  },
  async usersConfigEmailSignatures(
    _parent,
    { signatures }: MutationUsersConfigEmailSignaturesArgs,
    { user, models },
  ) {
    const normalizedSignatures: IEmailSignature[] = (signatures ?? []).map(
      (signature) => ({
        brandId: signature.brandId ?? undefined,
        signature: signature.signature ?? undefined,
      }),
    );

    return models.Users.configEmailSignatures(
      user._id,
      normalizedSignatures,
    );
  },

  async usersConfigGetNotificationByEmail(
    _parent,
    { isAllowed }: MutationUsersConfigGetNotificationByEmailArgs,
    { user, models },
  ) {
    return models.Users.configGetNotificationByEmail(user._id, isAllowed);
  },

  async usersSetChatStatus(
    _parent,
    { _id, status }: MutationUsersSetChatStatusArgs,
    { models },
  ) {
    return await models.Users.setChatStatus(_id, status);
  },

  /*
   * Upgrade organization plan status
   */
  async editOrganizationInfo(
    _parent,
    _args: MutationEditOrganizationInfoArgs,
    { subdomain, res, requestInfo },
  ) {
    return null;
  },

  async editOrganizationDomain(
    _parent,
    _args: MutationEditOrganizationDomainArgs,
    { subdomain },
  ) {
    return null;
  },
};

(userMutations.usersCreateOwner as AnyResolver).wrapperConfig = {
  skipPermission: true,
};
(userMutations.usersConfirmInvitation as AnyResolver).wrapperConfig = {
  skipPermission: true,
};
