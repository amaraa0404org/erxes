import { QueryResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const configQueries: QueryResolvers<IContext> = {
  /**
   * ProductConfig object
   */
  async productsConfigs(_parent, _args, { models }) {
    return await models.ProductsConfigs.find({});
  },
};
