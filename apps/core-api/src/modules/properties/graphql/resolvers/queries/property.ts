import { getPlugin, getPlugins } from 'erxes-api-shared/utils';
import { QueryResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const propertyQueries: QueryResolvers<IContext> = {
  propertyTypes: async () => {
    const plugins = await getPlugins();
    const types: Record<
      string,
      Array<{ description: string; contentType: string }>
    > = {};

    for (const pluginName of plugins) {
      const fieldTypes: Array<{ description: string; contentType: string }> =
        [];

      const plugin = await getPlugin(pluginName);

      if (!plugin) continue;

      const meta = plugin.config?.meta || {};

      if (meta?.properties) {
        const propertyTypes =
          (meta.properties as {
            types?: Array<{ type: string; description: string }>;
          }).types || [];

        for (const type of propertyTypes) {
          fieldTypes.push({
            description: type.description,
            contentType: `${pluginName}:${type.type}`,
          });
        }
      }

      if (fieldTypes.length > 0) {
        types[pluginName] = fieldTypes;
      }
    }

    return types;
  },
};
