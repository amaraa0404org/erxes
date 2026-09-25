import { ProductRuleResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const ProductRule: ProductRuleResolvers<IContext> = {
  async categories(rule, _args, { models }) {
    if (!rule.categoryIds?.length) return [];

    return models.ProductCategories.find({
      _id: { $in: rule.categoryIds },
    }).lean();
  },

  async excludeCategories(rule, _args, { models }) {
    if (!rule.excludeCategoryIds?.length) return [];

    return models.ProductCategories.find({
      _id: { $in: rule.excludeCategoryIds },
    }).lean();
  },

  async products(rule, _args, { models }) {
    if (!rule.productIds?.length) return [];

    return models.Products.find({ _id: { $in: rule.productIds } }).lean();
  },

  async excludeProducts(rule, _args, { models }) {
    if (!rule.excludeProductIds?.length) return [];

    return models.Products.find({
      _id: { $in: rule.excludeProductIds },
    }).lean();
  },

  async tags(rule, _args, { models }) {
    if (!rule.tagIds?.length) return [];

    return models.Tags.find({ _id: { $in: rule.tagIds } }).lean();
  },

  async excludeTags(rule, _args, { models }) {
    if (!rule.excludeTagIds?.length) return [];

    return models.Tags.find({ _id: { $in: rule.excludeTagIds } }).lean();
  },
};

export default ProductRule;
