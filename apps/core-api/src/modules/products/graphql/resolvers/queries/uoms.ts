import { AnyResolver } from 'erxes-api-shared/core-types';
import { QueryResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const uomQueries: QueryResolvers<IContext> = {
  /**
   * Uoms list
   */
  async uoms(_parent, _args, { models }) {
    return models.Uoms.find({}).sort({ order: 1 }).lean();
  },

  async cpUoms(_parent, _args, { models }) {
    return models.Uoms.find({}).sort({ order: 1 }).lean();
  },

  /**
   * Get all uoms count. We will use it in pager
   */
  async uomsTotalCount(_parent, _args, { models }) {
    return models.Uoms.countDocuments();
  },
};

(uomQueries.cpUoms as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
