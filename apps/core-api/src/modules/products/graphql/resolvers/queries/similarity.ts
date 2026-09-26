import { escapeRegExp } from 'erxes-api-shared/utils';
import { FilterQuery } from 'mongoose';
import { IProductSimilarityDocument } from '@/products/@types/similarity';
import { PRODUCT_SIMILARITY_STATUSES } from '@/products/constants';
import {
  QueryProductBulkSimilarityArgs,
  QueryProductBulkSimilaritiesArgs,
  QueryProductBulkSimilaritiesTotalCountArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const generateFilter = (searchValue?: string | null) => {
  const filter: FilterQuery<IProductSimilarityDocument> = {
    status: { $ne: PRODUCT_SIMILARITY_STATUSES.DELETED },
  };

  if (searchValue) {
    const regex = new RegExp(`.*${escapeRegExp(searchValue)}.*`, 'i');
    filter.$or = [{ 'info.code': regex }, { 'info.name': regex }];
  }

  return filter;
};

export const productSimilarityQueries: QueryResolvers<IContext> = {
  async productBulkSimilarity(
    _root,
    { _id }: QueryProductBulkSimilarityArgs,
    { models }: IContext,
  ) {
    return models.ProductSimilarities.getSimilarity(_id);
  },

  async productBulkSimilarities(
    _root,
    { page = 1, perPage = 20, searchValue }: QueryProductBulkSimilaritiesArgs,
    { models }: IContext,
  ) {
    const filter = generateFilter(searchValue);

    return models.ProductSimilarities.find(filter)
      .sort({ updatedAt: -1 })
      .skip(((page ?? 1) - 1) * (perPage ?? 20))
      .limit(perPage ?? 20)
      .lean();
  },

  async productBulkSimilaritiesTotalCount(
    _root,
    { searchValue }: QueryProductBulkSimilaritiesTotalCountArgs,
    { models }: IContext,
  ) {
    return models.ProductSimilarities.countDocuments(
      generateFilter(searchValue),
    );
  },
};
