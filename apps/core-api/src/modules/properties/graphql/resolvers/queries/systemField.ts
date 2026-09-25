import { QueryResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { ISystemFieldSettingDocument } from '~/modules/properties/@types';

export const systemFieldQueries: QueryResolvers<IContext> = {
  propertySystemFields: async (
    _root: unknown,
    { contentType }: { contentType: string },
    { models }: IContext,
  ) => {
    return (await models.SystemFieldSettings.getSystemFields(
      contentType,
    )) as unknown as ISystemFieldSettingDocument[];
  },
};
