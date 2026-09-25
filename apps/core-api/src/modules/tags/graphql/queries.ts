import { ITagFilterQueryParams } from '@/tags/@types/tag';
import { AnyResolver, ITagDocument } from 'erxes-api-shared/core-types';
import {
  cursorPaginate,
  escapeRegExp,
  getPlugin,
  getPlugins,
} from 'erxes-api-shared/utils';
import { FilterQuery, SortOrder } from 'mongoose';
import {
  QueryTagsMainArgs,
  QueryTagsQueryCountArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext, IModels } from '~/connectionResolvers';

const generateFilter = async ({
  params,
  models,
  commonQuerySelector,
}: {
  params: ITagFilterQueryParams;
  models: IModels;
  commonQuerySelector?: FilterQuery<ITagDocument>;
}) => {
  const {
    searchValue,
    parentId,
    ids,
    excludeIds,
    isGroup,
    type,
    includeWorkspaceTags,
  } = params;

  const filter: FilterQuery<ITagDocument> = {
    ...commonQuerySelector,
    type: { $in: [null, ''] },
  };

  if (type) {
    let contentType = type;

    const [_pluginName, _moduleName, instanceId] = contentType.split(':');

    if (!instanceId && params.instanceId) {
      contentType = `${contentType}:${params.instanceId}`;
    }

    if (includeWorkspaceTags) {
      filter.type = { $in: [null, '', contentType] };
    } else {
      filter.type = contentType;
    }
  }

  if (searchValue) {
    const matchingTags = await models.Tags.find({
      ...commonQuerySelector,
      name: new RegExp(`.*${searchValue}.*`, 'i'),
    }).lean();

    const matchingTagIds = matchingTags.map((tag) => tag._id);
    const parentIds = matchingTags
      .map((tag) => tag.parentId)
      .filter((id) => !!id);

    filter._id = { $in: [...matchingTagIds, ...parentIds] };
  }

  if (ids?.length) {
    filter._id = { [excludeIds ? '$nin' : '$in']: ids as string[] };
  }

  if (isGroup) {
    filter.isGroup = isGroup;
  }

  if (parentId) {
    const parentTag = await models.Tags.find({ parentId }).distinct('_id');

    let ids = [parentId, ...parentTag];

    const getChildTags = async (parentTagIds: string[]) => {
      const childTag = await models.Tags.find({
        parentId: { $in: parentTagIds },
      }).distinct('_id');

      if (childTag.length > 0) {
        ids = [...ids, ...childTag];
        await getChildTags(childTag);
      }
    };

    await getChildTags(parentTag);

    filter._id = { $in: ids };
  }

  return filter;
};

export const tagQueries: QueryResolvers<IContext> = {
  /**
   * Get tags types
   */
  async tagsGetTypes() {
    const services = await getPlugins();
    const types: Record<
      string,
      Array<{ description: string; contentType: string }>
    > = {};

    for (const serviceName of services) {
      const fieldTypes: Array<{ description: string; contentType: string }> =
        [];

      const service = await getPlugin(serviceName);
      const meta = service.config.meta || {};
      if (meta?.tags) {
        const tagTypes = (meta.tags as { types?: Array<{ type: string; description: string }> })
          .types || [];

        for (const type of tagTypes) {
          fieldTypes.push({
            description: type.description,
            contentType: `${serviceName}:${type.type}`,
          });
        }
      }

      if (fieldTypes.length > 0) {
        types[serviceName] = fieldTypes;
      }
    }

    return types;
  },
  /**
   * Get tags
   */
  async tags(
    _parent: unknown,
    params: ITagFilterQueryParams,
    { models, commonQuerySelector }: IContext,
  ) {
    const filter = await generateFilter({
      params,
      commonQuerySelector,
      models,
    });

    const { list, totalCount, pageInfo } = await cursorPaginate({
      model: models.Tags,
      params: {
        limit: params.limit ?? undefined,
        cursor: params.cursor ?? undefined,
        direction: params.direction ?? undefined,
        orderBy:
          (params.orderBy as Record<string, SortOrder> | null | undefined) || {
            order: 1,
          },
      },
      query: filter,
    });

    return { list, totalCount, pageInfo };
  },

  async tagsMain(
    _parent: unknown,
    { type }: Partial<QueryTagsMainArgs>,
    { models }: IContext,
  ) {
    const filter: FilterQuery<ITagDocument> = {
      type: { $in: [null, ''] },
    };

    if (type) {
      filter.type = type;
    }

    return await models.Tags.find(filter).sort({ name: 1 });
  },

  async tagsQueryCount(
    _parent: unknown,
    { type, searchValue }: Partial<QueryTagsQueryCountArgs>,
    { models, commonQuerySelector }: IContext,
  ) {
    const selector: FilterQuery<ITagDocument> = { ...commonQuerySelector };

    if (type) {
      selector.type = type;
    }

    if (searchValue) {
      selector.name = new RegExp(`.*${searchValue}.*`, 'i');
    }

    return models.Tags.countDocuments(selector);
  },

  async tagDetail(
    _parent: unknown,
    { _id }: { _id: string },
    { models }: IContext,
  ) {
    return models.Tags.getTag(_id);
  },

  async cpTags(
    _parent: unknown,
    params: ITagFilterQueryParams,
    { models }: IContext,
  ) {
    const {
      type,
      searchValue,
      ids,
      excludeIds,
      isGroup,
      includeWorkspaceTags,
    } = params;

    const filter: FilterQuery<ITagDocument> = {};

    if (type) {
      let contentType: string = type;

      const [_pluginName, _moduleName, instanceId] = type.split(':');

      if (!instanceId && params.instanceId) {
        contentType = `${type}:${params.instanceId}`;
      }

      filter.type = contentType;

      if (includeWorkspaceTags) {
        filter.type = { $in: [null, '', contentType] };
      }
    }

    if (searchValue) {
      filter.name = new RegExp(`.*${escapeRegExp(searchValue)}.*`, 'i');
    }

    if (ids?.length) {
      filter._id = excludeIds
        ? { $nin: ids as string[] }
        : { $in: ids as string[] };
    }

    if (isGroup) {
      filter.isGroup = isGroup;
    }

    if ('isGroup' in (params || {}) && isGroup === false) {
      filter.isGroup = { $ne: true };
    }

    return models.Tags.find(filter).lean();
  },
};

(tagQueries.cpTags as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
