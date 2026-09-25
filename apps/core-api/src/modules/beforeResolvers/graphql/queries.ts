import { checkBeforeResolvers } from 'erxes-api-shared/utils';
import { QueryResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

type TBeforeResolverAvailableArgs = {
  resolver: string;
  args?: Record<string, unknown> | null;
};

export const beforeResolverQueries: QueryResolvers<IContext> = {
  async beforeResolverAvailable(
    _root: unknown,
    { resolver, args }: TBeforeResolverAvailableArgs,
    { subdomain, user, req, requestInfo }: IContext,
  ) {
    return await checkBeforeResolvers(resolver, args || {}, {
      subdomain,
      user,
      headers: requestInfo?.headers || req?.headers,
    });
  },
};
