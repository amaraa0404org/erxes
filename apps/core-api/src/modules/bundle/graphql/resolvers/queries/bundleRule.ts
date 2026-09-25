import { IBundleRuleItem } from '@/bundle/@types';
import { IProductDocument } from 'erxes-api-shared/core-types';
import {
  QueryResolvers,
  QueryBundleRuleDetailArgs,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

type BundleRuleItemWithProducts = IBundleRuleItem & {
  products: IProductDocument[];
};

export const bundleRuleQueries: QueryResolvers<IContext> = {
  async bundleRules(_root, _args, { models }) {
    const bundles = await models.BundleRule.find({}).lean();

    const bundlesWithProducts: Array<
      (typeof bundles)[number] & { rules: BundleRuleItemWithProducts[] }
    > = [];

    for (const bundle of bundles) {
      const rulesWithProducts: BundleRuleItemWithProducts[] = [];

      for (const rule of bundle.rules || []) {
        const products = await models.Products.find({
          _id: { $in: rule.productIds || [] },
        });

        rulesWithProducts.push({
          ...rule,
          products,
        });
      }

      bundlesWithProducts.push({
        ...bundle,
        rules: rulesWithProducts,
      });
    }

    return bundlesWithProducts;
  },

  async bundleRuleDetail(_root, { _id }: QueryBundleRuleDetailArgs, { models }) {
    const bundle = await models.BundleRule.findById(_id).lean();

    if (!bundle) {
      return null;
    }

    const rulesWithProducts: BundleRuleItemWithProducts[] = [];

    for (const rule of bundle.rules || []) {
      const products = await models.Products.find({
        _id: { $in: rule.productIds || [] },
      });

      rulesWithProducts.push({
        ...rule,
        products,
      });
    }

    return {
      ...bundle,
      rules: rulesWithProducts,
    };
  },
};
