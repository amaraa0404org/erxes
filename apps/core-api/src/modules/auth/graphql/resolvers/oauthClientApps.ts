import type {
  IOAuthClientAppDocument,
  OAuthClientAccessTokenLifetime,
  OAuthClientAppType,
} from '@/auth/db/definitions/oauthClientApps';
import { FilterQuery } from 'mongoose';
import {
  MutationOauthClientAppsAddArgs,
  MutationOauthClientAppsEditArgs,
  MutationOauthClientAppsRemoveArgs,
  MutationOauthClientAppsRevokeArgs,
  MutationResolvers,
  QueryOauthClientAppDetailArgs,
  QueryOauthClientAppsArgs,
  QueryOauthClientAppsTotalCountArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const buildOAuthClientQuery = (searchValue?: string | null) => {
  const query: FilterQuery<IOAuthClientAppDocument> = {};

  if (searchValue) {
    query.$or = [
      { name: new RegExp(`.*${searchValue}.*`, 'i') },
      { clientId: new RegExp(`.*${searchValue}.*`, 'i') },
    ];
  }

  return query;
};

const checkOAuthClientReadPermission = async (
  checkPermission: IContext['checkPermission'],
) => {
  try {
    await checkPermission('appsRead');
  } catch (error) {
    if (!(error instanceof Error) || error.message !== 'Permission required') {
      throw error;
    }

    await checkPermission('appsManage');
  }
};

export const oauthClientAppQueries: QueryResolvers<IContext> = {
  async oauthClientApps(
    _parent,
    { searchValue, page, perPage }: QueryOauthClientAppsArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkOAuthClientReadPermission(checkPermission);

    const pageNumber = page ?? 1;
    const perPageNumber = perPage ?? 20;

    return models.OAuthClientApps.find(buildOAuthClientQuery(searchValue))
      .skip((pageNumber - 1) * perPageNumber)
      .limit(perPageNumber)
      .sort({ createdAt: -1 });
  },

  async oauthClientAppsTotalCount(
    _parent,
    { searchValue }: QueryOauthClientAppsTotalCountArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkOAuthClientReadPermission(checkPermission);

    return models.OAuthClientApps.countDocuments(
      buildOAuthClientQuery(searchValue),
    );
  },

  async oauthClientAppDetail(
    _parent,
    { _id }: QueryOauthClientAppDetailArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkOAuthClientReadPermission(checkPermission);

    return models.OAuthClientApps.findOne({ _id });
  },
};

export const oauthClientAppMutations: MutationResolvers<IContext> = {
  async oauthClientAppsAdd(
    _parent,
    params: MutationOauthClientAppsAddArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('appsManage');

    return models.OAuthClientApps.createOAuthClientApp({
      ...params,
      logo: params.logo ?? undefined,
      description: params.description ?? undefined,
      type: params.type as OAuthClientAppType,
      accessTokenLifetime:
        params.accessTokenLifetime as OAuthClientAccessTokenLifetime | undefined,
      redirectUrls: params.redirectUrls?.filter(
        (url): url is string => typeof url === 'string',
      ),
    });
  },

  async oauthClientAppsEdit(
    _parent,
    { _id, ...doc }: MutationOauthClientAppsEditArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('appsManage');

    return models.OAuthClientApps.updateOAuthClientApp(_id, {
      ...doc,
      logo: doc.logo ?? undefined,
      description: doc.description ?? undefined,
      type: doc.type as OAuthClientAppType,
      accessTokenLifetime:
        doc.accessTokenLifetime as OAuthClientAccessTokenLifetime | undefined,
      redirectUrls: doc.redirectUrls?.filter(
        (url): url is string => typeof url === 'string',
      ),
    });
  },

  async oauthClientAppsRevoke(
    _parent,
    { _id }: MutationOauthClientAppsRevokeArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('appsManage');

    return models.OAuthClientApps.revokeOAuthClientApp(_id);
  },

  async oauthClientAppsRemove(
    _parent,
    { _id }: MutationOauthClientAppsRemoveArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('appsManage');

    const removed = await models.OAuthClientApps.removeOAuthClientApp(_id);

    // JSON scalar: generated output type is Record<string, unknown>.
    return removed as unknown as Record<string, unknown>;
  },
};
