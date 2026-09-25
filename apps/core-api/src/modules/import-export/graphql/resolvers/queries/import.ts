import {
  ImportHeaderDefinition,
  matchImportHeaders,
  processCSVStream,
  splitType,
  TImportExportProducers,
} from 'erxes-api-shared/core-modules';
import {
  cursorPaginate,
  readFileStreamFromStorage,
  sendCoreModuleProducer,
} from 'erxes-api-shared/utils';
import { FilterQuery } from 'mongoose';
import {
  QueryActiveImportsArgs,
  QueryImportHistoriesArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { IImportDocument } from '~/modules/import-export/db/models/Imports';
import { getRequiredImportExportPermissions } from '~/modules/import-export/utils/getRequiredPermissions';
import { validateImportConfig } from '~/modules/import-export/utils/validateConfig';

const PREVIEW_SAMPLE_ROWS = 5;

const mapImportWithMetrics = (importDoc: IImportDocument) => {
  const progress =
    importDoc.totalRows > 0
      ? Math.round((importDoc.processedRows / importDoc.totalRows) * 100)
      : 0;

  const elapsedSeconds = importDoc.startedAt
    ? Math.floor((Date.now() - new Date(importDoc.startedAt).getTime()) / 1000)
    : 0;

  const rowsPerSecond =
    elapsedSeconds > 0 && importDoc.processedRows > 0
      ? Math.round(importDoc.processedRows / elapsedSeconds)
      : 0;

  const remainingRows = importDoc.totalRows - importDoc.processedRows;
  const estimatedSecondsRemaining =
    rowsPerSecond > 0 ? Math.round(remainingRows / rowsPerSecond) : 0;

  return {
    ...importDoc,
    progress,
    elapsedSeconds,
    rowsPerSecond,
    estimatedSecondsRemaining,
  };
};

const toPreviewField = (header: ImportHeaderDefinition) => ({
  key: header.key,
  label: header.label,
  type: header.type || 'system',
  dataType: header.dataType || 'text',
  options: header.options || [],
  example: header.example || '',
  required: !!header.required,
});

/**
 * Fetch a module's import fields, after checking the caller may import them.
 *
 * Shared by the mapping preview and the field reference, which shows the same
 * fields before a file exists.
 */
const loadImportFields = async ({
  entityType,
  subdomain,
  checkPermission,
}: {
  entityType: string;
  subdomain: string;
  checkPermission: IContext['checkPermission'];
}) => {
  const [pluginName, moduleName, collectionName] = splitType(entityType);

  await validateImportConfig({
    pluginName,
    collectionName,
    requireGetImportHeaders: true,
    requireInsertImportRows: true,
  });

  const requiredPermissions = await getRequiredImportExportPermissions({
    pluginName,
    operation: 'import',
    entityType,
  });

  for (const permission of requiredPermissions) {
    await checkPermission(permission);
  }

  return await sendCoreModuleProducer<
    'importExport',
    TImportExportProducers.GET_IMPORT_HEADERS,
    ImportHeaderDefinition[]
  >({
    subdomain,
    pluginName,
    moduleName: 'importExport',
    method: 'query',
    producerName: TImportExportProducers.GET_IMPORT_HEADERS,
    input: { moduleName, collectionName },
    defaultValue: [],
  });
};

export const importQueries: QueryResolvers<IContext> = {
  /**
   * Read the uploaded file's header row and a few sample rows, then line them
   * up against the module's import fields. Nothing is written: this is what
   * the mapping step shows before the user commits to the import.
   */
  async importColumnPreview(
    _root: unknown,
    {
      entityType,
      fileKey,
      fileName,
    }: { entityType: string; fileKey: string; fileName: string },
    { subdomain, checkPermission }: IContext,
  ) {
    if (!fileName.toLowerCase().endsWith('.csv')) {
      throw new Error(
        `Only .csv files can be imported. Received "${fileName}".`,
      );
    }

    const importHeaders = await loadImportFields({
      entityType,
      subdomain,
      checkPermission,
    });

    const fileStream = await readFileStreamFromStorage({
      subdomain,
      key: fileKey,
    });

    const rowIterator = processCSVStream(fileStream);
    let headerRow: string[] = [];
    const sampleRows: string[][] = [];
    let totalRows = 0;

    for await (const row of rowIterator) {
      if (!headerRow.length) {
        headerRow = row;
        continue;
      }

      totalRows++;

      if (sampleRows.length < PREVIEW_SAMPLE_ROWS) {
        sampleRows.push(row);
      }
    }

    const matches = matchImportHeaders(headerRow, importHeaders);

    return {
      totalRows,
      columns: matches.map((match) => ({
        ...match,
        sampleValues: sampleRows
          .map((row) => row[match.index] ?? '')
          .filter((value) => String(value).trim() !== ''),
      })),
      fields: importHeaders.map(toPreviewField),
    };
  },

  /**
   * The same field list the mapping step uses, without needing a file — this
   * is what someone reads while filling the spreadsheet in.
   */
  async importFields(
    _root: unknown,
    { entityType }: { entityType: string },
    { subdomain, checkPermission }: IContext,
  ) {
    const importHeaders = await loadImportFields({
      entityType,
      subdomain,
      checkPermission,
    });

    return importHeaders.map(toPreviewField);
  },

  async importProgress(
    _root: unknown,
    { importId }: { importId: string },
    { models, user }: IContext,
  ) {
    const importDoc = await models.Imports.getImport(importId);

    if (!importDoc) {
      throw new Error('Import not found');
    }

    if (importDoc.userId !== user._id) {
      throw new Error('Unauthorized');
    }

    return mapImportWithMetrics(importDoc) as unknown as IImportDocument;
  },

  async activeImports(
    _root: unknown,
    { entityType }: Partial<QueryActiveImportsArgs>,
    { models, user }: IContext,
  ) {
    // the popover is the caller's own workspace, not a workspace-wide feed
    const query: FilterQuery<IImportDocument> = { userId: user._id };

    if (entityType) {
      query.entityType = entityType;
    }

    const imports = await models.Imports.find(query)
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    return imports.map(mapImportWithMetrics) as unknown as IImportDocument[];
  },

  async importHistories(
    _root: unknown,
    args: Partial<QueryImportHistoriesArgs>,
    { models, subdomain, user }: IContext,
  ) {
    const { entityType, entityTypes, status } = args;
    const normalizedEntityTypes = Array.from(
      new Set([entityType, ...(entityTypes || [])].filter(Boolean) as string[]),
    );

    const query: FilterQuery<IImportDocument> = {
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
      query.status = status as IImportDocument['status'];
    }

    const { list, totalCount, pageInfo } =
      await cursorPaginate<IImportDocument>({
        model: models.Imports,
        params: {
          limit: args.limit ?? undefined,
          cursor: args.cursor ?? undefined,
          direction: args.direction ?? undefined,
          orderBy: { createdAt: -1 },
        },
        query,
      });

    return {
      list: list.map(mapImportWithMetrics) as unknown as IImportDocument[],
      totalCount,
      pageInfo,
    };
  },
};
