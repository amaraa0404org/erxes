import { PRODUCT_STATUSES } from '@/products/constants';
import { ProductBulkSimilarityResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const ProductBulkSimilarity: ProductBulkSimilarityResolvers<IContext> = {
  async products(similarity, _args, { models }) {
    if (!similarity.productIds?.length) return [];

    return models.Products.find({
      _id: { $in: similarity.productIds },
      status: { $ne: PRODUCT_STATUSES.DELETED },
    })
      .sort({ code: 1 })
      .lean();
  },

  fields: async (similarity, _args, { models }) => {
    const fieldIds = Object.keys(similarity.propertiesData || {});

    if (!fieldIds.length) {
      return [];
    }

    const fields = await models.Fields.find({ _id: { $in: fieldIds } })
      .select({ _id: 1, name: 1 })
      .lean();

    return fieldIds.map((fieldId) => ({
      fieldId,
      text: fields.find((f) => f._id === fieldId)?.name || fieldId,
      values:
        (similarity.propertiesData?.[fieldId] as string[] | undefined) ??
        [],
    }));
  },

  info: async (similarity, _args, { models }) => {
    const { info } = similarity || {};

    if (!info?.uom) {
      return info as unknown as Record<string, unknown>;
    }

    const uom = await models.Uoms.findOne({
      $or: [{ _id: info.uom }, { name: info.uom }, { code: info.uom }],
    }).lean();

    if (!uom) {
      return info as unknown as Record<string, unknown>;
    }

    return { ...info, uom: uom.name || uom.code || info.uom };
  },
};

export default ProductBulkSimilarity;
