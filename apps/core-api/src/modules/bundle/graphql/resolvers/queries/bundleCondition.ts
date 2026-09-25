import { IBundleConditionDocument } from '@/bundle/@types';
import { escapeRegExp } from 'erxes-api-shared/utils';
import { FilterQuery } from 'mongoose';
import {
  QueryResolvers,
  QueryBundleConditionDetailArgs,
  QueryBundleConditionsArgs,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const bundleConditionQueries: QueryResolvers<IContext> = {
  async allBundleConditions(_root, _args, { models }) {
    return models.BundleCondition.find({}).lean();
  },

  async bundleConditions(_root, { searchValue }: QueryBundleConditionsArgs, { models }) {
    const query: FilterQuery<IBundleConditionDocument> = {};

    if (searchValue) {
      query.name = new RegExp(`.*${escapeRegExp(searchValue)}.*`, 'i');
    }

    return models.BundleCondition.find(query).sort({ createdAt: -1 }).lean();
  },

  async bundleConditionDetail(_root, { _id }: QueryBundleConditionDetailArgs, { models }) {
    return models.BundleCondition.findOne({ _id }).lean();
  },

  async bundleConditionTotalCount(_root, _args, { models }) {
    return models.BundleCondition.find({}).countDocuments();
  },
};
