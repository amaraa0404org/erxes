import { IContext } from '~/connectionResolvers';
import { getPlugins, getPlugin } from 'erxes-api-shared/utils';
import {
  ICustomPermission,
  IDefaultPermissionGroup,
  IPermissionConfig,
  IPermissionGroupPermission,
  IPermissionModule,
} from 'erxes-api-shared/core-types';
import {
  QueryPermissionGroupDetailArgs,
  QueryResolvers,
} from '~/__generated__/graphql';

interface IMergedPermission {
  plugin?: string;
  module: string;
  actions: string[];
  scope: string;
}

type TPermissionLike = {
  plugin?: string;
  module: string;
  actions: string[];
  scope: string;
};

const mergePerm = (
  map: Map<string, IMergedPermission>,
  perm: TPermissionLike,
  plugin?: string,
) => {
  const existing = map.get(perm.module);

  if (!existing) {
    map.set(perm.module, {
      plugin: perm.plugin || plugin,
      module: perm.module,
      actions: [...perm.actions],
      scope: perm.scope,
    });
    return;
  }

  existing.actions = [...new Set([...existing.actions, ...perm.actions])];

  const priority: Record<string, number> = { own: 1, group: 2, all: 3 };
  if (priority[perm.scope] > priority[existing.scope]) {
    existing.scope = perm.scope;
  }
};

const getPermissionsConfig = (config: {
  meta?: Record<string, unknown>;
}): IPermissionConfig | undefined =>
  config.meta?.permissions as IPermissionConfig | undefined;

export const permissionQueries: QueryResolvers<IContext> = {
  async permissionModules() {
    const grouped: { plugin: string; modules: IPermissionModule[] }[] = [];
    const services = await getPlugins();

    for (const name of services) {
      const service = await getPlugin(name);
      const permissions = getPermissionsConfig(service?.config || {});
      if (!permissions?.modules) continue;

      const modules = permissions.modules
        .map((module) => ({ ...module, plugin: name }))
        .sort((a, b) => a.name.localeCompare(b.name));

      grouped.push({ plugin: name, modules });
    }

    return grouped.sort((a, b) => a.plugin.localeCompare(b.plugin));
  },

  async permissionDefaultGroups() {
    const groups: IDefaultPermissionGroup[] = [];
    const services = await getPlugins();

    for (const name of services) {
      const service = await getPlugin(name);
      const permissions = getPermissionsConfig(service?.config || {});
      if (!permissions?.defaultGroups) continue;

      for (const group of permissions.defaultGroups) {
        groups.push({ ...group, plugin: name });
      }
    }

    return groups;
  },

  async permissionGroups(_root, _args: {}, { models }: IContext) {
    return models.PermissionGroups.find({}).sort({ name: 1 });
  },

  async permissionGroupDetail(
    _root,
    { id }: QueryPermissionGroupDetailArgs,
    { models }: IContext,
  ) {
    return models.PermissionGroups.findOne({ _id: id });
  },

  async currentUserPermissions(
    _root,
    _args: {},
    { user, models }: IContext,
  ) {
    if (!user) throw new Error('Login required');

    const plugins = await getPlugins();

    const pluginsWithPermissions: string[] = [];
    const allDefaultGroups: IDefaultPermissionGroup[] = [];

    for (const pluginName of plugins) {
      const plugin = await getPlugin(pluginName);
      const permissions = getPermissionsConfig(plugin?.config || {});

      if (permissions?.modules?.length || permissions?.defaultGroups?.length) {
        pluginsWithPermissions.push(pluginName);
      }

      if (permissions?.defaultGroups) {
        allDefaultGroups.push(...permissions.defaultGroups);
      }
    }

    if (user.isOwner) {
      return {
        permissions: [{ plugin: '*', module: '*', actions: ['*'], scope: 'all' }],
        pluginsWithPermissions,
      };
    }

    let groupIds = user.permissionGroupIds || [];
    const customPermissions: ICustomPermission[] = user.customPermissions || [];

    if (groupIds.length === 0 && customPermissions.length === 0) {
      const viewerGroupIds = allDefaultGroups
        .filter((g) => g.id.endsWith(':viewer'))
        .map((g) => g.id);

      if (viewerGroupIds.length > 0) {
        await models.Users.updateOne(
          { _id: user._id },
          { $set: { permissionGroupIds: viewerGroupIds } },
        );
        groupIds = viewerGroupIds;
      }
    }

    const permMap = new Map<string, IMergedPermission>();

    for (const groupId of groupIds) {
      if (groupId.includes(':')) {
        const group = allDefaultGroups.find((g) => g.id === groupId);
        if (group) {
          for (const perm of group.permissions) {
            mergePerm(permMap, perm);
          }
        }
      } else {
        const group = await models.PermissionGroups.findOne({ _id: groupId });

        if (group) {
          for (const perm of group.permissions) {
            mergePerm(permMap, perm);
          }
        }
      }
    }

    for (const perm of customPermissions) {
      mergePerm(permMap, perm);
    }

    return {
      permissions: Array.from(permMap.values()),
      pluginsWithPermissions,
    };
  },
};
