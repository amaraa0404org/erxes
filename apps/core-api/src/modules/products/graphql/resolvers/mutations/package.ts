import {
  MutationProductPackagesChangeStatusArgs,
  MutationProductPackagesRemoveArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { IPackage } from '@/products/@types/package';

export const packageMutations: MutationResolvers<IContext> = {
  async productPackagesAdd(
    _root,
    doc: IPackage,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productsCreate');

    return models.Packages.createPackage(doc);
  },

  async productPackagesEdit(
    _root,
    { _id, ...doc }: { _id: string } & Partial<IPackage>,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productsUpdate');

    return models.Packages.updatePackage(_id, doc);
  },

  async productPackagesChangeStatus(
    _root,
    { _ids, status }: MutationProductPackagesChangeStatusArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productsUpdate');

    return models.Packages.changePackageStatus(_ids, status);
  },

  async productPackagesRemove(
    _root,
    { _ids }: MutationProductPackagesRemoveArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productsDelete');

    const result = await models.Packages.removePackages(_ids);

    return result as unknown as Record<string, unknown>;
  },
};
