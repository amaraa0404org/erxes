import {
  MutationClientPortalAddArgs,
  MutationClientPortalUpdateArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { IClientPortal } from '@/clientportal/types/clientPortal';

export const clientPortalMutations: MutationResolvers<IContext> = {
  async clientPortalAdd(
    _root: unknown,
    { name }: MutationClientPortalAddArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('clientPortalManage');

    return models.ClientPortal.createClientPortal(name);
  },
  async clientPortalUpdate(
    _root: unknown,
    { _id, clientPortal }: MutationClientPortalUpdateArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('clientPortalManage');

    await models.ClientPortal.updateClientPortal(
      _id,
      clientPortal as IClientPortal,
    );
    return null;
  },

  async clientPortalDelete(
    _root: unknown,
    { _id }: { _id: string },
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('clientPortalManage');

    const deleted = await models.ClientPortal.findOneAndDelete({ _id });

    return deleted as unknown as Record<string, unknown> | null;
  },

  async clientPortalChangeToken(
    _root: unknown,
    { _id }: { _id: string },
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('clientPortalManage');

    return models.ClientPortal.clientPortalChangeToken(_id);
  },
};
