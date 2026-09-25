import { IFieldGroup, IFieldGroupDocument } from '@/properties/@types';
import { AnyResolver } from 'erxes-api-shared/core-types';
import { cursorPaginate, defaultPaginate } from 'erxes-api-shared/utils';
import { FilterQuery, SortOrder } from 'mongoose';
import {
  QueryCpFieldGroupsArgs,
  QueryFieldGroupsArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const generateFilter = async (params: {
  contentType?: string | null;
  contentTypeId?: string | null;
  codes?: (string | null)[] | null;
}) => {
  const { contentType, contentTypeId, codes } = params;

  const filter: FilterQuery<IFieldGroup> = {
    contentType,
  };

  if (contentTypeId) {
    filter.contentTypeId = contentTypeId;
  }

  if (codes && codes.length > 0) {
    filter.code = { $in: codes as string[] };
  }

  return filter;
};

export const groupQueries: QueryResolvers<IContext> = {
  fieldGroups: async (
    _: unknown,
    { params }: Partial<QueryFieldGroupsArgs>,
    { models }: IContext,
  ) => {
    const filter = await generateFilter(params ?? {});

    return await cursorPaginate<IFieldGroupDocument>({
      model: models.FieldsGroups,
      params: {
        limit: params?.limit ?? undefined,
        cursor: params?.cursor ?? undefined,
        direction: params?.direction ?? undefined,
        orderBy:
          (params?.orderBy as Record<string, SortOrder> | null | undefined) ||
          { order: 1 },
      },
      query: filter,
    });
  },

  cpFieldGroups: async (
    _: unknown,
    { params }: Partial<QueryCpFieldGroupsArgs>,
    { models }: IContext,
  ) => {
    const sortField = params?.sortField ?? 'code';
    const sortDirection = (params?.sortDirection ?? 1) as SortOrder;

    const filter = await generateFilter(params ?? {});

    return await defaultPaginate(
      models.FieldsGroups.find(filter).sort({
        [sortField]: sortDirection,
      }),
      {
        page: params?.page ?? undefined,
        perPage: params?.perPage ?? undefined,
      },
    );
  },
};

(groupQueries.cpFieldGroups as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
