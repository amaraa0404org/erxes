import { IActivityLogDocument } from 'erxes-api-shared/core-modules';
import { cursorPaginate } from 'erxes-api-shared/utils';
import { FilterQuery } from 'mongoose';
import {
  QueryActivityLogsArgs,
  QueryResolvers,
  RequireFields,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export type IActivityLogQueryParams = RequireFields<
  QueryActivityLogsArgs,
  'targetId'
>;

const generateFilters = (params: IActivityLogQueryParams) => {
  const filter: FilterQuery<IActivityLogDocument> = {};

  if (params.targetType) {
    filter.targetType = params.targetType;
  }
  if (params.targetId) {
    filter.targetId = params.targetId;
  }

  if (params.action) {
    filter['action.action'] = params.action;
  }

  if (params.activityType) {
    filter.activityType = params.activityType;
  } else if (params.excludeActivityType) {
    filter.activityType = { $ne: params.excludeActivityType };
  }

  if (params.dateFrom || params.dateTo) {
    const createdAt: { $gte?: Date; $lte?: Date } = {};

    if (params.dateFrom) {
      createdAt.$gte = new Date(params.dateFrom);
    }

    if (params.dateTo) {
      createdAt.$lte = new Date(params.dateTo);
    }

    filter.createdAt = createdAt;
  }

  return filter;
};

export const activityLogQueries: QueryResolvers<IContext> = {
  async activityLogs(
    _root: unknown,
    args: IActivityLogQueryParams,
    { models }: IContext,
  ) {
    const filter = generateFilters(args);
    const variant = args.variant === 'backward' ? 'backward' : 'forward';
    const limit = Math.min(Math.max(args.limit || 20, 1), 100);
    const { list, totalCount, pageInfo } =
      await cursorPaginate<IActivityLogDocument>({
        model: models.ActivityLogs,
        params: {
          limit,
          cursor: args.cursor ?? undefined,
          direction: variant,
          orderBy: { createdAt: variant === 'backward' ? 1 : -1 },
        },
        query: filter,
      });
    return {
      list,
      totalCount,
      pageInfo,
    };
  },
};
