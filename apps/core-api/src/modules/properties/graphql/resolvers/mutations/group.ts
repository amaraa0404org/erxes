import { IOrderInput } from 'erxes-api-shared/core-types';
import {
  MutationFieldGroupAddArgs,
  MutationFieldGroupEditArgs,
  MutationResolvers,
  RequireFields,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { IFieldGroup } from '~/modules/properties/@types';

export const groupMutations: MutationResolvers<IContext> = {
  fieldGroupAdd: async (
    _root,
    doc: MutationFieldGroupAddArgs,
    { models, user, checkPermission }: IContext,
  ) => {
    await checkPermission('fieldGroupsManage');

    return await models.FieldsGroups.createGroup(
      doc as unknown as IFieldGroup,
      user,
    );
  },
  fieldGroupEdit: async (
    _root,
    { _id, ...doc }: RequireFields<MutationFieldGroupEditArgs, '_id'>,
    { models, user, checkPermission }: IContext,
  ) => {
    await checkPermission('fieldGroupsManage');

    return await models.FieldsGroups.updateGroup(
      _id,
      doc as unknown as IFieldGroup,
      user,
    );
  },
  fieldGroupsUpdateOrder: async (
    _root,
    { orders }: { orders: IOrderInput[] },
    { models, checkPermission }: IContext,
  ) => {
    await checkPermission('fieldGroupsManage');

    return await models.FieldsGroups.updateOrder(orders);
  },
  fieldGroupRemove: async (
    _root,
    { _id }: { _id: string },
    { models, checkPermission }: IContext,
  ) => {
    await checkPermission('fieldGroupsManage');

    return await models.FieldsGroups.removeGroup(_id);
  },
};
