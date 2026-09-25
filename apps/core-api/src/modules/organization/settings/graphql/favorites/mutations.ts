import { IContext } from '~/connectionResolvers';
import {
  normalizeFavoriteBreadcrumb,
  normalizeFavoriteIcon,
  normalizeFavoritePath,
} from '@/organization/settings/graphql/favorites/utils';
import {
  MutationResolvers,
  MutationToggleFavoriteArgs,
} from '~/__generated__/graphql';

export const favoriteMutations: MutationResolvers<IContext> = {
  toggleFavorite: async (
    _parent,
    { path, breadcrumb, icon }: MutationToggleFavoriteArgs,
    { models, user },
  ) => {
    const normalizedPath = normalizeFavoritePath(path);

    const favorite = await models.Favorites.getFavorite({
      path: normalizedPath,
      userId: user._id,
    });

    if (favorite) {
      return models.Favorites.deleteFavorite({
        path: normalizedPath,
        userId: user._id,
      });
    }

    try {
      return await models.Favorites.createFavorite({
        path: normalizedPath,
        breadcrumb: normalizeFavoriteBreadcrumb(breadcrumb),
        icon: normalizeFavoriteIcon(icon),
        userId: user._id,
      });
    } catch (error) {
      const { code } = error as { code?: number };

      if (code === 11000) {
        return models.Favorites.getFavorite({
          path: normalizedPath,
          userId: user._id,
        });
      }

      throw error;
    }
  },
};
