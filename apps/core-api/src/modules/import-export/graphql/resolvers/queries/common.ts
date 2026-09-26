import { QueryResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { getImportExportTypes } from '~/modules/import-export/utils/getImportExportTypes';

export const importExportCommonQueries: QueryResolvers<IContext> = {
  async importExportTypes(
    _root: unknown,
    { operation }: { operation: 'IMPORT' | 'EXPORT' },
  ) {
    const types = await getImportExportTypes(
      operation.toLowerCase() as 'import' | 'export',
    );

    return types.map((type) => ({
      ...type,
      permissions: type.permissions ?? [],
    }));
  },
};
