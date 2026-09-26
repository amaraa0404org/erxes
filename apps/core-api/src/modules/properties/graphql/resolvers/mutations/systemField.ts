import { MutationResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import {
  ISystemFieldSetting,
  ISystemFieldSettingDocument,
} from '~/modules/properties/@types';

export const systemFieldMutations: MutationResolvers<IContext> = {
  propertySystemFieldEdit: async (
    _root: unknown,
    doc: ISystemFieldSetting,
    { models, user, checkPermission }: IContext,
  ) => {
    await checkPermission('fieldsManage');

    return (await models.SystemFieldSettings.updateSystemField(
      doc,
      user._id,
    )) as unknown as ISystemFieldSettingDocument;
  },
};
