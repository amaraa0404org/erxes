import { escapeRegExp } from 'erxes-api-shared/utils';
import { ProductCategoryResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

import { PRODUCT_STATUSES } from '@/products/constants';

const ProductCategory: ProductCategoryResolvers<IContext> = {
  __resolveReference: async ({ _id }, { models }) => {
    return models.ProductCategories.findOne({ _id });
  },

  isRoot: (category) => {
    return category.parentId ? false : true;
  },

  productCount: async (category, _args, { models }) => {
    const product_category_ids = await models.ProductCategories.find(
      { order: { $regex: new RegExp(`^${escapeRegExp(category.order)}`) } },
      { _id: 1 },
    );
    return models.Products.countDocuments({
      categoryId: { $in: product_category_ids },
      status: { $ne: PRODUCT_STATUSES.DELETED },
    });
  },
};

export default ProductCategory;
