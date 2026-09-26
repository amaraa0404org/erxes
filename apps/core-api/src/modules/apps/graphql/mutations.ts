import { IApp } from 'erxes-api-shared/core-types';
import {
  MutationAppsAddArgs,
  MutationAppsEditArgs,
  MutationAppsRemoveArgs,
  MutationAppsRevokeArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const appMutations: MutationResolvers<IContext> = {
  async appsAdd(
    _parent,
    params: MutationAppsAddArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('appsManage');

    return models.Apps.createApp(params);
  },

  async appsEdit(
    _parent,
    { _id, name }: MutationAppsEditArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('appsManage');

    return models.Apps.updateApp(_id, { name: name ?? undefined });
  },

  async appsRevoke(
    _parent,
    { _id }: MutationAppsRevokeArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('appsManage');

    return models.Apps.revokeApp(_id);
  },

  async appsRemove(
    _parent,
    { _id }: MutationAppsRemoveArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('appsManage');

    return models.Apps.removeApp(_id) as Promise<Record<string, unknown>>;
  },
};
