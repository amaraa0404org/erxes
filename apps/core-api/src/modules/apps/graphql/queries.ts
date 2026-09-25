import { IApp } from 'erxes-api-shared/core-types';
import { FilterQuery } from 'mongoose';
import {
  QueryAppDetailArgs,
  QueryAppsArgs,
  QueryAppsTotalCountArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const buildAppsQuery = (searchValue?: string | null) => {
  const qry: FilterQuery<IApp> = {};

  if (searchValue) {
    qry.name = new RegExp(`.*${searchValue}.*`, 'i');
  }

  return qry;
};

export const appQueries: QueryResolvers<IContext> = {
  async apps(
    _parent,
    { searchValue, page, perPage }: QueryAppsArgs,
    { models }: IContext,
  ) {
    const qry = buildAppsQuery(searchValue);
    const pageNumber = page ?? 1;
    const perPageNumber = perPage ?? 20;

    return models.Apps.find(qry)
      .skip((pageNumber - 1) * perPageNumber)
      .limit(perPageNumber)
      .sort({ createdAt: -1 });
  },

  async appsTotalCount(
    _parent,
    { searchValue }: QueryAppsTotalCountArgs,
    { models }: IContext,
  ) {
    return models.Apps.countDocuments(buildAppsQuery(searchValue));
  },

  async appDetail(
    _parent,
    { _id }: QueryAppDetailArgs,
    { models }: IContext,
  ) {
    return models.Apps.findOne({ _id });
  },
};
