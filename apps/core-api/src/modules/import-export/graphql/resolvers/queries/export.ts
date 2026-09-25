import { IContext } from '~/connectionResolvers';
import { cursorPaginate, sendCoreModuleProducer } from 'erxes-api-shared/utils';
import {
  ImportHeaderDefinition,
  splitType,
  TImportExportProducers,
} from 'erxes-api-shared/core-modules';
import { FilterQuery } from 'mongoose';
import {
  QueryActiveExportsArgs,
  QueryExportHistoriesArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { validateExportConfig } from '~/modules/import-export/utils/validateConfig';
import { IExportDocument } from '~/modules/import-export/db/models/Exports';

const mapExportWithMetrics = (
  exportDoc: IExportDocument & { estimatedSecondsRemaining?: number },
) => {
  const progress =
    exportDoc.totalRows > 0
      ? Math.round((exportDoc.processedRows / exportDoc.totalRows) * 100)
      : 0;

  const elapsedSeconds = exportDoc.startedAt
    ? Math.floor((Date.now() - new Date(exportDoc.startedAt).getTime()) / 1000)
    : 0;

  const rowsPerSecond =
    elapsedSeconds > 0 && exportDoc.processedRows > 0
      ? Math.round(exportDoc.processedRows / elapsedSeconds)
      : 0;

  const remainingRows = Math.max(
    0,
    exportDoc.totalRows - exportDoc.processedRows,
  );

  const estimatedSecondsRemaining =
    exportDoc.estimatedSecondsRemaining ||
    (rowsPerSecond > 0 ? Math.round(remainingRows / rowsPerSecond) : 0);

  return {
    ...exportDoc,
    progress,
    elapsedSeconds,
    rowsPerSecond,
    estimatedSecondsRemaining,
  };
};

export const exportQueries: QueryResolvers<IContext> = {
  async exportProgress(
    _root: unknown,
    { exportId }: { exportId: string },
    { models, user }: IContext,
  ) {
    const exportDoc = await models.Exports.getExport(exportId);

    if (!exportDoc) {
      throw new Error('Export not found');
    }

    if (exportDoc.userId !== user._id) {
      throw new Error('Unauthorized');
    }

    return exportDoc;
  },

  async activeExports(
    _root: unknown,
    { entityType }: Partial<QueryActiveExportsArgs>,
    { models, subdomain, user }: IContext,
  ) {
    const query: FilterQuery<IExportDocument> = {
      subdomain,
      userId: user._id,
    };

    if (entityType) {
      query.entityType = entityType;
    }

    // Get last 3 exports (including completed/failed for retry)
    const exports = await models.Exports.find(query)
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    return exports.map(mapExportWithMetrics) as unknown as IExportDocument[];
  },

  async exportHistories(
    _root: unknown,
    args: Partial<QueryExportHistoriesArgs>,
    { models, subdomain, user }: IContext,
  ) {
    const { entityType, entityTypes, status } = args;
    const normalizedEntityTypes = Array.from(
      new Set([entityType, ...(entityTypes || [])].filter(Boolean) as string[]),
    );

    const query: FilterQuery<IExportDocument> = {
      subdomain,
      userId: user._id,
    };

    if (normalizedEntityTypes.length === 1) {
      query.entityType = normalizedEntityTypes[0];
    }

    if (normalizedEntityTypes.length > 1) {
      query.entityType = { $in: normalizedEntityTypes };
    }

    if (status) {
      query.status = status as IExportDocument['status'];
    }

    const { list, totalCount, pageInfo } =
      await cursorPaginate<IExportDocument>({
        model: models.Exports,
        params: {
          limit: args.limit ?? undefined,
          cursor: args.cursor ?? undefined,
          direction: args.direction ?? undefined,
          orderBy: { createdAt: -1 },
        },
        query,
      });

    return {
      list: list.map(mapExportWithMetrics) as unknown as IExportDocument[],
      totalCount,
      pageInfo,
    };
  },

  async exportHeaders(
    _root: unknown,
    {
      entityType,
      filters,
    }: { entityType: string; filters?: Record<string, unknown> },
    { subdomain }: IContext,
  ) {
    const [pluginName, moduleName, collectionName] = splitType(entityType);

    await validateExportConfig({
      pluginName,
      collectionName,
      requireGetExportHeaders: true,
    });

    return await sendCoreModuleProducer<
      'importExport',
      TImportExportProducers.GET_EXPORT_HEADERS,
      ImportHeaderDefinition[]
    >({
      subdomain,
      pluginName,
      moduleName: 'importExport',
      method: 'query',
      producerName: TImportExportProducers.GET_EXPORT_HEADERS,
      input: {
        moduleName,
        collectionName,
        ...(filters ? { filters } : {}),
      },
      defaultValue: [],
    });
  },
};
