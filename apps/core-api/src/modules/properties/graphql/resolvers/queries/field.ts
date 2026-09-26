import {
  IField,
  IFieldDocument,
  IFieldOffsetParams,
} from '@/properties/@types';
import { AnyResolver } from 'erxes-api-shared/core-types';
import { cursorPaginate, defaultPaginate } from 'erxes-api-shared/utils';
import { FilterQuery, SortOrder } from 'mongoose';
import {
  QueryCpFieldsArgs,
  QueryFieldsArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext, IModels } from '~/connectionResolvers';

const generateFilter = async (
  models: IModels,
  params: {
    contentType?: string | null;
    contentTypeId?: string | null;
    groupId?: string | null;
  },
) => {
  const { contentType, contentTypeId, groupId } = params;

  const filter: FilterQuery<IField> = { contentType };

  if (contentTypeId) {
    filter.contentTypeId = contentTypeId;
  }

  if (groupId) {
    filter.groupId = groupId;
  }

  return filter;
};

export const fieldQueries: QueryResolvers<IContext> = {
  fields: async (
    _: unknown,
    { params }: Partial<QueryFieldsArgs>,
    { models }: IContext,
  ) => {
    const filter = await generateFilter(models, params ?? {});

    return await cursorPaginate<IFieldDocument>({
      model: models.Fields,
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

  fieldDetail: async (
    _: unknown,
    { _id }: { _id: string },
    { models }: IContext,
  ) => {
    return await models.Fields.getField({ _id });
  },

  cpFields: async (
    _: unknown,
    { params }: Partial<QueryCpFieldsArgs>,
    { models }: IContext,
  ) => {
    const { sortField = 'code', sortDirection = 1 } = (params || {}) as {
      sortField?: string;
      sortDirection?: SortOrder;
    };

    const filter = await generateFilter(models, params ?? {});

    return await defaultPaginate(
      models.Fields.find(filter).sort({ [sortField]: sortDirection }),
      (params ?? {}) as IFieldOffsetParams,
    );
  },

  cpFieldDetail: async (
    _: unknown,
    { _id }: { _id: string },
    { models }: IContext,
  ) => {
    return await models.Fields.getField({ _id });
  },
};

(fieldQueries.cpFields as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};

(fieldQueries.cpFieldDetail as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
