import { QueryResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const productRuleQueries: QueryResolvers<IContext> = {
  async productRules(_root, _args, { models }) {
    return models.ProductRules.find().lean();
  },

  async productRulesWithCount(_root, _args, { models }) {
    const rules = await models.ProductRules.find().lean();

    return {
      list: rules,
      totalCount: rules.length,
    };
  },
};
