import { cursorPaginate } from 'erxes-api-shared/utils';
import { FilterQuery, SortOrder } from 'mongoose';
import { IContext } from '~/connectionResolvers';
import { IBrandDocument } from '../types';
import {
  Cursor_Direction,
  QueryBrandDetailArgs,
  QueryBrandsArgs,
  QueryResolvers,
} from '~/__generated__/graphql';

export const brandQueries: QueryResolvers<IContext> = {
  /**
   * All brands
   */
  async allBrands(_root, _params, { models }) {
    return await models.Brands.find();
  },

  /**
   * Brands list
   */
  async brands(_root, params: QueryBrandsArgs, { models }) {
    const { searchValue } = params;

    const filter: FilterQuery<IBrandDocument> = {};

    if (searchValue) {
      filter.name = new RegExp(`.*${params.searchValue}.*`, 'i');
    }

    const { list, totalCount, pageInfo } = await cursorPaginate<IBrandDocument>(
      {
        model: models.Brands,
        params: {
          limit: params.limit ?? undefined,
          cursor: params.cursor ?? undefined,
          direction:
            params.direction === Cursor_Direction.Backward
              ? ('backward' as const)
              : ('forward' as const),
          orderBy: params.orderBy as Record<string, SortOrder> | undefined,
        },
        query: filter,
      },
    );

    return { list, totalCount, pageInfo };
  },

  /**
   * Get one brand
   */
  async brandDetail(_root, { _id }: QueryBrandDetailArgs, { models }) {
    return await models.Brands.findOne({ _id });
  },

  /**
   * Get all brands count. We will use it in pager
   */
  async brandsTotalCount(_root, _args, { models }) {
    return await models.Brands.countDocuments();
  },

  /**
   * Get last brand
   */
  async brandsGetLast(_root, _args, { models }) {
    return await models.Brands.findOne({}).sort({ createdAt: -1 });
  },
};
