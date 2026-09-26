import { cursorPaginate } from 'erxes-api-shared/utils';
import { IContext } from '~/connectionResolvers';
import { PipelineStage } from 'mongoose';
import {
  QueryPositionsArgs,
  QueryPositionsMainArgs,
  QueryPositionDetailArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { generateFilters, toCursorPaginateParams } from './utils';

export const positionQueries: QueryResolvers<IContext> = {
  async positions(_parent, params: QueryPositionsArgs, { models, user }) {
    const filter = await generateFilters({
      models,
      user,
      type: 'position',
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

    return models.Positions.aggregate(pipeline);
  },

  async positionsMain(
    _parent,
    params: QueryPositionsMainArgs,
    { models, user },
  ) {
    const filter = await generateFilters({
      models,
      user,
      type: 'position',
      params: { ...params, withoutUserFilter: true },
    });

    const { list, totalCount, pageInfo } = await cursorPaginate({
      model: models.Positions,
      params: toCursorPaginateParams(params),
      query: filter,
    });

    return { list, totalCount, pageInfo };
  },

  async positionDetail(
    _parent,
    { _id }: QueryPositionDetailArgs,
    { models },
  ) {
    return models.Positions.getPosition({ _id });
  },
};
