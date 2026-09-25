import {
  MutationCpUsersAddArgs,
  MutationCpUsersEditArgs,
  MutationCpUsersSetPasswordArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

import { getCPUserByIdOrThrow } from '~/modules/clientportal/services/helpers/userUtils';
import { validatePassword } from '~/modules/clientportal/services/helpers/validators';

export const adminMutations: MutationResolvers<IContext> = {
  async cpUsersAdd(
    _root: unknown,
    params: MutationCpUsersAddArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('clientPortalManage');
    return models.CPUser.createUserAsAdmin(
      params.clientPortalId,
      {
        email: params.email ?? undefined,
        phone: params.phone ?? undefined,
        username: params.username ?? undefined,
        password: params.password ?? undefined,
        firstName: params.firstName ?? undefined,
        lastName: params.lastName ?? undefined,
        userType: params.userType ?? undefined,
      },
      models,
    );
  },

  async cpUsersEdit(
    _root: unknown,
    { _id, ...params }: MutationCpUsersEditArgs,
    { models }: IContext,
  ) {
    return models.CPUser.updateUser(
      _id,
      {
        email: params.email ?? undefined,
        phone: params.phone ?? undefined,
        firstName: params.firstName ?? undefined,
        lastName: params.lastName ?? undefined,
        avatar: params.avatar ?? undefined,
        username: params.username ?? undefined,
        companyName: params.companyName ?? undefined,
        companyRegistrationNumber:
          params.companyRegistrationNumber ?? undefined,
        erxesCustomerId: params.erxesCustomerId ?? undefined,
        erxesCompanyId: params.erxesCompanyId ?? undefined,
      },
      models,
    );
  },

  async cpUsersRemove(
    _root: unknown,
    { ids }: { ids: string[] },
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('clientPortalManage');

    return models.CPUser.removeUsers(ids, models);
  },

  async cpUsersSetPassword(
    _root: unknown,
    { _id, newPassword }: MutationCpUsersSetPasswordArgs,
    { models }: IContext,
  ) {
    await getCPUserByIdOrThrow(_id, models);

    validatePassword(newPassword);
    const hashedPassword = await models.CPUser.generatePassword(newPassword);
    await models.CPUser.updateOne(
      { _id },
      {
        $set: { password: hashedPassword },
        $unset: { actionCode: '' },
      },
    );
    return getCPUserByIdOrThrow(_id, models);
  },
};
