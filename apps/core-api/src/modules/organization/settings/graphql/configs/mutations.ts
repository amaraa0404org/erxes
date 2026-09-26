import fetch from 'node-fetch';
import { getCoreDomain, resetConfigsCache } from 'erxes-api-shared/utils';
import { IContext } from '~/connectionResolvers';
import {
  MutationConfigsActivateInstallationArgs,
  MutationConfigsUpdateArgs,
  MutationResolvers,
} from '~/__generated__/graphql';

export const organizationConfigMutations: MutationResolvers<IContext> = {
  /**
   * Create or update config object
   */
  async configsUpdate(_parent, { configsMap }: MutationConfigsUpdateArgs, { models }) {
    const codes = Object.keys(configsMap);

    for (const code of codes) {
      if (!code) {
        continue;
      }

      const value = configsMap[code];
      const doc = { code, value };

      await models.Configs.createOrUpdateConfig(doc);
    }

    await resetConfigsCache();

    // The JSON scalar serializes `true` fine at runtime; the generated
    // Record<string, unknown> type is just narrower than a boolean.
    return true as unknown as Record<string, unknown>;
  },

  async configsActivateInstallation(
    _parent,
    args: MutationConfigsActivateInstallationArgs,
  ) {
    try {
      return await fetch(`${getCoreDomain()}/activate-installation`, {
        method: 'POST',
        body: JSON.stringify(args),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json());
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : String(e));
    }
  },
};
