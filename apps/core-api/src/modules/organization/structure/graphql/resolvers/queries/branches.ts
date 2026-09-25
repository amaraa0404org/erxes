import { AnyResolver } from 'erxes-api-shared/core-types';
import { cursorPaginate } from 'erxes-api-shared/utils';
import { PipelineStage } from 'mongoose';
import { IContext } from '~/connectionResolvers';
import {
  QueryBranchesArgs,
  QueryBranchesMainArgs,
  QueryBranchDetailArgs,
  QueryCpBranchesArgs,
  QueryCpBranchesMainArgs,
  QueryCpBranchDetailArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { generateFilters, toCursorPaginateParams } from './utils';

export const branchsQueries: QueryResolvers<IContext> = {
  async branches(_parent, params: QueryBranchesArgs, { models, user }) {
    const filter = await generateFilters({
      models,
      user,
      type: 'branch',
      params,
    });
    const pipeline: PipelineStage[] = [
      { $match: filter },
      { $sort: { order: 1 } },
    ];

    if (params?.ids?.length) {
      pipeline.push({
        $addFields: {
          __order: { $indexOfArray: [params.ids, '$_id'] },
        },
      });
      pipeline.push({ $sort: { __order: 1 } });
    }

    return models.Branches.aggregate(pipeline);
  },

  async branchesMain(
    _parent,
    params: QueryBranchesMainArgs,
    { models, user },
  ) {
    const filter = await generateFilters({
      models,
      user,
      type: 'branch',
      params,
    });

    const { list, totalCount, pageInfo } = await cursorPaginate({
      model: models.Branches,
      params: toCursorPaginateParams(params),
      query: filter,
    });

    return { list, totalCount, pageInfo };
  },

  async branchDetail(_parent, { _id }: QueryBranchDetailArgs, { models }) {
    return models.Branches.getBranch({ _id });
  },

  async cpBranches(_parent, params: QueryCpBranchesArgs, { models, user }) {
    const filter = await generateFilters({
      models,
      user,
      type: 'branch',
      params: { ...params, withoutUserFilter: true },
    });
    const pipeline: PipelineStage[] = [
      { $match: filter },
      { $sort: { order: 1 } },
    ];

    if (params?.ids?.length) {
      pipeline.push({
        $addFields: {
          __order: { $indexOfArray: [params.ids, '$_id'] },
        },
      });
      pipeline.push({ $sort: { __order: 1 } });
    }

    return models.Branches.aggregate(pipeline);
  },

  async cpBranchesMain(
    _parent,
    params: QueryCpBranchesMainArgs,
    { models, user },
  ) {
    const filter = await generateFilters({
      models,
      user,
      type: 'branch',
      params: { ...params, withoutUserFilter: true },
    });

    const { list, totalCount, pageInfo } = await cursorPaginate({
      model: models.Branches,
      params: toCursorPaginateParams(params),
      query: filter,
    });

    return { list, totalCount, pageInfo };
  },

  async cpBranchDetail(_parent, { _id }: QueryCpBranchDetailArgs, { models }) {
    return models.Branches.getBranch({ _id });
  },
};

(branchsQueries.cpBranches as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
(branchsQueries.cpBranchesMain as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
(branchsQueries.cpBranchDetail as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
