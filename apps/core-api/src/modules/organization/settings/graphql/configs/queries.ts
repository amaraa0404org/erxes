import { getCoreDomain } from 'erxes-api-shared/utils';

import * as dotenv from 'dotenv';
import { IContext } from '~/connectionResolvers';
import fetch from 'node-fetch';
import { FilterQuery } from 'mongoose';
import { getFileUploadConfigs } from '../../utils/configs';
import { IConfigDocument } from '@/organization/settings/db/definitions/configs';
import {
  QueryConfigsByCodeArgs,
  QueryConfigsCheckActivateInstallationArgs,
  QueryConfigsGetValueArgs,
  QueryResolvers,
} from '~/__generated__/graphql';

dotenv.config();

export const organizationConfigQueries: QueryResolvers<IContext> = {
  /**
   * Config object
   */
  async configs(_parent, _args, { models }) {
    return models.Configs.find({});
  },

  async configsByCode(
    _parent,
    { codes, pattern }: QueryConfigsByCodeArgs,
    { models },
  ) {
    const query: FilterQuery<IConfigDocument> = {
      $or: [],
    };

    const codeList = codes?.filter((code): code is string => Boolean(code));

    if (codeList?.length) {
      query.$or?.push({ code: { $in: codeList } });
    }

    if (pattern) {
      query.$or?.push({ code: { $regex: pattern, $options: 'i' } });
    }

    return models.Configs.find(query);
  },

  async configsGetEnv() {
    return {
      USE_BRAND_RESTRICTIONS: process.env.USE_BRAND_RESTRICTIONS,
      RELEASE: process.env.RELEASE,
    };
  },

  async configsCheckActivateInstallation(
    _parent,
    args: QueryConfigsCheckActivateInstallationArgs,
  ) {
    try {
      return await fetch(`${getCoreDomain()}/check-activate-installation`, {
        method: 'POST',
        body: JSON.stringify(args),
        headers: { 'Content-Type': 'application/json' },
      }).then((r) => r.json());
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : String(e));
    }
  },

  async configsGetValue(
    _parent,
    { code }: QueryConfigsGetValueArgs,
    { models },
  ) {
    return models.Configs.findOne({ code });
  },

  async configsFileUploadInfo(_parent, _args, { models }) {
    const { UPLOAD_SERVICE_TYPE, CLOUDFLARE_USE_CDN } =
      await getFileUploadConfigs(models);

    const videoUploadEnabled =
      UPLOAD_SERVICE_TYPE === 'CLOUDFLARE' &&
      (CLOUDFLARE_USE_CDN === 'true' || CLOUDFLARE_USE_CDN === true);

    return { videoUploadEnabled };
  },
};
