import { AnyResolver } from 'erxes-api-shared/core-types';
import { cursorPaginate } from 'erxes-api-shared/utils';
import { FilterQuery, SortOrder } from 'mongoose';
import {
  QueryProductPackageDetailArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { IPackageDocument, IPackageParams } from '@/products/@types/package';

export const packageQueries: QueryResolvers<IContext> = {
  async productPackages(
    _parent,
    params: IPackageParams,
    { models }: IContext,
  ) {
    const { searchValue, status, ids, tagIds } = params;

    const filter: FilterQuery<IPackageDocument> = {
      status: { $ne: 'archived' },
    };

    if (status) filter.status = status;

    if (ids?.length) {
      filter._id = { $in: ids.filter((id): id is string => id != null) };
    }

    if (tagIds?.length) {
      filter.tagIds = {
        $in: tagIds.filter((id): id is string => id != null),
      };
    }

    if (searchValue) {
      filter.$or = [
        { name: { $regex: searchValue, $options: 'i' } },
        { description: { $regex: searchValue, $options: 'i' } },
      ];
    }

    return cursorPaginate<IPackageDocument>({
      model: models.Packages,
      params: {
        limit: params.limit ?? undefined,
        cursor: params.cursor ?? undefined,
        direction: params.direction ?? undefined,
        orderBy: params.orderBy as Record<string, SortOrder> | undefined,
      },
      query: filter,
    });
  },

  async productPackageDetail(
    _parent,
    { _id }: QueryProductPackageDetailArgs,
    { models }: IContext,
  ) {
    return models.Packages.getPackage(_id);
  },
};

(packageQueries.productPackages as AnyResolver).wrapperConfig = {
  skipPermission: true,
};
(packageQueries.productPackageDetail as AnyResolver).wrapperConfig = {
  skipPermission: true,
};
