import { IContext } from '~/connectionResolvers';
import {
  normalizeFavoritePath,
  resolveFavoritesBreadcrumbs,
} from '@/organization/settings/graphql/favorites/utils';
import {
  QueryIsFavoriteArgs,
  QueryResolvers,
} from '~/__generated__/graphql';

export const favoriteQueries: QueryResolvers<IContext> = {
  getFavoritesByCurrentUser: async (_parent, _args, { models, user }) => {
    const favorites = await models.Favorites.getFavoritesByCurrentUser({
      userId: user._id,
    });

    return resolveFavoritesBreadcrumbs({ favorites });
  },

  isFavorite: async (_parent, { path }: QueryIsFavoriteArgs, { models, user }) => {
    const favorite = await models.Favorites.getFavorite({
      path: normalizeFavoritePath(path),
      userId: user._id,
    });

    return favorite ? true : false;
  },
};
