import { AnyResolver, IProductCategoryDocument } from 'erxes-api-shared/core-types';
import { escapeRegExp } from 'erxes-api-shared/utils';
import { FilterQuery } from 'mongoose';
import {
  QueryCategoriesWithChildsArgs,
  QueryProductCategoryDetailArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext, IModels } from '~/connectionResolvers';

import { IProductCategoryParams } from '@/products/@types';

const generateFilter = async (
  models: IModels,
  {
    parentId,
    withChild,
    searchValue,
    meta,
    brandIds,
    status,
    ids,
  }: IProductCategoryParams,
) => {
  const filter: FilterQuery<IProductCategoryDocument> = {};

  filter.status = { $nin: ['disabled', 'archived'] };

  if (status && status !== 'active') {
    filter.status = status;
  }

  if (parentId) {
    if (withChild) {
      const category = await models.ProductCategories.getProductCategory({
        _id: parentId,
      });

      const relatedCategoryIds = (
        await models.ProductCategories.find(
          { order: { $regex: new RegExp(`^${escapeRegExp(category.order)}`) } },
          { _id: 1 },
        ).lean()
      ).map((c) => c._id);

      filter.parentId = { $in: relatedCategoryIds };
    } else {
      filter.parentId = parentId;
    }
  }

  if (brandIds) {
    filter.scopeBrandIds = {
      $in: brandIds.filter((id): id is string => id != null),
    };
  }

  if (meta) {
    if (typeof meta === 'number' && !isNaN(meta)) {
      filter.meta = { $lte: Number(meta) };
    } else {
      filter.meta = meta as string;
    }
  }

  if (searchValue) {
    filter.name = new RegExp(`.*${searchValue}.*`, 'i');
  }

  if (ids?.length) {
    filter._id = { $in: ids.filter((id): id is string => id != null) };
  }

  return filter;
};

export const categoryQueries: QueryResolvers<IContext> = {
  async productCategories(
    _parent,
    params: IProductCategoryParams,
    { models }: IContext,
  ) {
    const filter = await generateFilter(models, params);
    return await models.ProductCategories.find(filter)
      .sort({ order: 1 })
      .lean();
  },

  async cpProductCategories(
    _parent,
    params: IProductCategoryParams,
    { models }: IContext,
  ) {
    const filter = await generateFilter(models, params);
    return await models.ProductCategories.find(filter)
      .sort({ order: 1 })
      .lean();
  },

  async productCategoriesTotalCount(
    _parent,
    params: IProductCategoryParams,
    { models }: IContext,
  ) {
    const filter = await generateFilter(models, params);
    return models.ProductCategories.countDocuments(filter);
  },

  async productCategoryDetail(
    _parent,
    { _id }: QueryProductCategoryDetailArgs,
    { models }: IContext,
  ) {
    return models.ProductCategories.findOne({ _id }).lean();
  },

  async categoriesWithChilds(
    _parent,
    { ids }: QueryCategoriesWithChildsArgs,
    { models }: IContext,
  ) {
    return await models.ProductCategories.getChildCategories(ids);
  },
};

(categoryQueries.cpProductCategories as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
