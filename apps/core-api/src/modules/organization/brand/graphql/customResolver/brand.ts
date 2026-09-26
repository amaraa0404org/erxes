import { BrandResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const Brand: BrandResolvers<IContext> = {
  __resolveReference: async ({ _id }, { models }) => {
    return models.Brands.findOne({ _id });
  },
};

export default { Brand };
