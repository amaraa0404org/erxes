import {
  cursorPaginate,
  getPlugin,
  getPlugins,
  sendTRPCMessage,
} from 'erxes-api-shared/utils';
import { FilterQuery, SortOrder } from 'mongoose';
import { QueryResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { documents } from '~/meta/documents';
import {
  DOCUMENT_APPROVAL_CONTENT_TYPE,
  DocumentProcessInput,
  IDocumentDocument,
  IDocumentFilterQueryParams,
} from '../types';

/**
 * One placeholder a plugin's `documents.editorAttributes` offers the document
 * editor: `value` is the token, `name` its label. Plugins may add their own
 * members (e.g. `groupDetail`).
 */
interface IDocumentEditorAttribute {
  value: string;
  name: string;
  [key: string]: unknown;
}

const generateFilter = (params: IDocumentFilterQueryParams) => {
  const { searchValue, contentType, subType, userIds, dateFilters, tagIds } =
    params;

  const filter: FilterQuery<IDocumentDocument> = {};

  if (tagIds?.length) {
    filter.tagIds = { $in: tagIds as string[] };
  }

  if (contentType) {
    filter.contentType = contentType;
  }

  if (subType) {
    filter.$or = [
      { subType },
      { subType: { $exists: false } },
      { subType: { $in: ['', null, undefined] } },
    ];
  }

  if (searchValue) {
    filter.name = new RegExp(`.*${searchValue}.*`, 'i');
  }

  if (userIds?.length) {
    filter.createdUserId = { $in: userIds as string[] };
  }

  if (dateFilters) {
    try {
      const dateFilter = JSON.parse(dateFilters || '{}');

      for (const [key, value] of Object.entries(dateFilter)) {
        if (key !== 'createdAt') {
          throw new Error('Only createdAt can be used in dateFilters');
        }
        const { gte, lte } = (value || {}) as { gte?: string; lte?: string };

        if (gte || lte) {
          filter[key] = {};

          if (gte) {
            filter[key]['$gte'] = gte;
          }

          if (lte) {
            filter[key]['$lte'] = lte;
          }
        }
      }
    } catch (error) {
      throw new Error(`Invalid dateFilters: ${error.message}`);
    }
  }

  return filter;
};

export const documentQueries: QueryResolvers<IContext> = {
  documents: async (
    _parent: unknown,
    params: IDocumentFilterQueryParams,
    { models, user, checkPermission }: IContext,
  ) => {
    await checkPermission('documentsRead');
    const filter = generateFilter(params);
    // Cursor values are returned to the client, so never sort by template data.
    const sortFields = new Set([
      '_id',
      'name',
      'createdAt',
      'createdUserId',
      'contentType',
      'subType',
      'code',
    ]);
    if (
      Object.keys(params.orderBy || {}).some((field) => !sortFields.has(field))
    ) {
      throw new Error('Unsupported document sort field');
    }

    const { list, pageInfo, totalCount } =
      await cursorPaginate<IDocumentDocument>({
        model: models.Documents,
        params: {
          limit: params.limit ?? undefined,
          cursor: params.cursor ?? undefined,
          direction: params.direction ?? undefined,
          orderBy: params.orderBy as Record<string, SortOrder> | undefined,
        },
        query: filter,
      });

    const states = await models.ApprovalLocks.getStates({
      user,
      contentType: DOCUMENT_APPROVAL_CONTENT_TYPE,
      contentIds: list.map((document) => document._id),
      ownerIdsByContentId: Object.fromEntries(
        list.map((document) => [document._id, document.createdUserId]),
      ),
      action: 'view',
    });
    const statesById = new Map(states.map((state) => [state.contentId, state]));

    const rows = await Promise.all(
      list.map(async (document) => {
        const approvalLockState =
          statesById.get(document._id) ||
          (await models.ApprovalLocks.getState({
            user,
            contentType: DOCUMENT_APPROVAL_CONTENT_TYPE,
            contentId: document._id,
            ownerId: document.createdUserId,
            action: 'view',
          }));
        return {
          ...document,
          // Keep locked records discoverable without exposing their templates.
          content: approvalLockState?.hasAccess ? document.content : null,
          replacer: approvalLockState?.hasAccess ? document.replacer : null,
          approvalLockState,
        };
      }),
    );

    // The rows are lean documents carrying the plain-object lock state; the
    // generated mapper types model them as Mongoose documents.
    return {
      list: rows as unknown as IDocumentDocument[],
      pageInfo,
      totalCount,
    };
  },

  documentsDetail: async (
    _parent: unknown,
    { _id }: { _id: string },
    { models, user, checkPermission }: IContext,
  ) => {
    await checkPermission('documentsRead');
    return await models.Documents.getDocument({ _id, user });
  },

  documentsTypes: async () => {
    const services = await getPlugins();

    const fieldTypes: Array<{
      label: string;
      contentType: string;
      subTypes?: string[];
    }> = [];

    for (const serviceName of services) {
      const service = await getPlugin(serviceName);
      const meta = service.config.meta || {};
      if (meta?.documents) {
        const documentTypes =
          (meta.documents as {
            types?: Array<{
              label: string;
              contentType: string;
              subTypes?: string[];
            }>;
          }).types || [];

        for (const type of documentTypes) {
          fieldTypes.push({
            label: type.label,
            contentType: type.contentType,
            subTypes: type.subTypes,
          });
        }
      }
    }

    return fieldTypes;
  },

  documentsGetEditorAttributes: async (
    _parent: unknown,
    { contentType }: { contentType: string },
    { models, subdomain }: IContext,
  ) => {
    const [pluginName, moduleName] = contentType.split(':');

    if (pluginName === 'core') {
      const { editorAttributes } = documents;

      if (moduleName === 'broadcast') {
        contentType = 'core:contacts.customers';
      }

      if (editorAttributes) {
        return await editorAttributes(models, subdomain, contentType);
      }
    }

    return await sendTRPCMessage<IDocumentEditorAttribute[]>({
      subdomain,
      pluginName,
      method: 'query',
      module: 'documents',
      action: 'editorAttributes',
      input: {
        contentType,
      },
      defaultValue: [],
    });
  },

  documentsTotalCount: async (
    _parent: unknown,
    params: IDocumentFilterQueryParams,
    { models, checkPermission }: IContext,
  ) => {
    await checkPermission('documentsRead');
    const filter = generateFilter(params);

    return models.Documents.find(filter).countDocuments();
  },

  documentsProcess: async (
    _parent: unknown,
    { _id, replacerIds, config }: Omit<DocumentProcessInput, 'user'>,
    { models, user, checkPermission }: IContext,
  ) => {
    await checkPermission('documentsRead');
    return models.Documents.processDocument({
      _id,
      replacerIds,
      config,
      user,
    });
  },
};
