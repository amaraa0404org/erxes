import { IFavoritesDocument } from '@/organization/settings/db/definitions/favorites';

export function normalizeFavoritePath(path: string) {
  const trimmedPath = path.trim();

  if (!trimmedPath) {
    return '/';
  }

  try {
    const url = new URL(trimmedPath);
    return `${url.pathname}${url.search}`.replace(/\/$/, '') || '/';
  } catch {
    return trimmedPath.replace(/\/$/, '') || '/';
  }
}

export function normalizeFavoriteBreadcrumb(
  breadcrumb?: Array<string | null> | null,
) {
  return (breadcrumb || [])
    .filter((segment): segment is string => Boolean(segment))
    .map((segment) => segment.trim())
    .filter(Boolean)
    .slice(0, 3);
}

export function normalizeFavoriteIcon(icon?: string | null) {
  const normalizedIcon = icon?.trim();

  return normalizedIcon || undefined;
}

export function resolveFavoritesBreadcrumbs({
  favorites,
}: {
  favorites: IFavoritesDocument[];
}) {
  return favorites.map((favorite) => {
    const path = normalizeFavoritePath(favorite.path);
    const breadcrumb = normalizeFavoriteBreadcrumb(favorite.breadcrumb);

    return {
      ...favorite.toObject(),
      path,
      breadcrumb,
    };
  });
}
