import {
  MutationFieldAddArgs,
  MutationFieldEditArgs,
  MutationResolvers,
  RequireFields,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { IField } from '~/modules/properties/@types';

export const fieldMutations: MutationResolvers<IContext> = {
  fieldAdd: async (
    _root,
    doc: MutationFieldAddArgs,
    { models, user, checkPermission }: IContext,
  ) => {
    await checkPermission('fieldsManage');

    return await models.Fields.createField(doc as unknown as IField, user);
  },
  fieldEdit: async (
    _root,
    { _id, ...doc }: RequireFields<MutationFieldEditArgs, '_id'>,
    { models, user, checkPermission }: IContext,
  ) => {
    await checkPermission('fieldsManage');

    return await models.Fields.updateField(
      _id,
      doc as unknown as IField,
      user,
    );
  },
  fieldRemove: async (
    _root,
    { _id }: { _id: string },
    { models, checkPermission }: IContext,
  ) => {
    await checkPermission('fieldsManage');

    return await models.Fields.removeField(_id);
  },
};
