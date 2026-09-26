import {
  MutationProductsConfigsUpdateArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

type SimilarityMaskRule = { fieldId: string };
type SimilarityMaskValue = {
  filterField?: string;
  rules?: SimilarityMaskRule[];
  defaultProduct?: string;
};

export const configMutations: MutationResolvers<IContext> = {
  /**
   * Create or update config object
   */
  async productsConfigsUpdate(
    _parent,
    { configsMap }: MutationProductsConfigsUpdateArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productsConfigsManage');

    const codes = Object.keys(configsMap);

    for (const code of codes) {
      if (!code) {
        continue;
      }

      const value = configsMap[code];
      const doc = { code, value };

      await models.ProductsConfigs.createOrUpdateConfig(doc);

      if (
        code === 'similarityGroup' &&
        value &&
        typeof value === 'object'
      ) {
        const masks = Object.keys(value);

        await models.Products.updateMany(
          {},
          { $unset: { sameMasks: '', sameDefault: '' } },
        );

        for (const mask of masks) {
          const maskValue = (
            value as Record<string, SimilarityMaskValue>
          )[mask];

          const codeRegex = ['*', '.', '_'].includes(mask)
            ? new RegExp(
                `^${mask
                  .replace(/\./g, '\\.')
                  .replace(/\*/g, '.')
                  .replace(/_/g, '.')}.*`,
                'igu',
              )
            : new RegExp(`.*${mask}.*`, 'igu');

          const fieldFilter = (maskValue.filterField || 'code').includes(
            'customFieldsData.',
          )
            ? {
                'customFieldsData.field': maskValue.filterField!.replace(
                  'customFieldsData.',
                  '',
                ),
                'customFieldsData.stringValue': { $in: [codeRegex] },
              }
            : { [maskValue.filterField || 'code']: { $in: [codeRegex] } };

          const fieldIds = (maskValue.rules || []).map((r) => r.fieldId);

          await models.Products.updateMany(
            {
              $and: [
                { ...fieldFilter },
                { 'customFieldsData.field': { $in: fieldIds } },
              ],
            },
            { $addToSet: { sameMasks: mask } },
          );

          if (maskValue.defaultProduct) {
            await models.Products.updateOne(
              { _id: maskValue.defaultProduct },
              { $addToSet: { sameDefault: mask } },
            );
          }
        }
      }
    }

    const { isRequireUOM, defaultUOM } = configsMap;

    if (isRequireUOM && !defaultUOM) {
      throw new Error('Must fill default UOM');
    }

    if (defaultUOM) {
      // checkUOM normalizes the value (which may be a code, name or _id) to
      // the canonical UOM code and ensures the UOM exists.
      const normalizedUom = await models.Uoms.checkUOM({
        uom: defaultUOM as string,
        subUoms: [],
      });

      if (isRequireUOM) {
        await models.Products.updateMany(
          {
            $or: [{ uom: { $exists: false } }, { uom: '' }],
          },
          { $set: { uom: normalizedUom } },
        );
      }
    }

    return ['success'] as unknown as Record<string, unknown>;
  },
};
