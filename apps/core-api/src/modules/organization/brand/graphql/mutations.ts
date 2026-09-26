import { IBrandEmailConfig } from '@/organization/brand/types';
import { IContext } from '~/connectionResolvers';
import {
  MutationBrandsAddArgs,
  MutationBrandsEditArgs,
  MutationBrandsRemoveArgs,
  MutationResolvers,
} from '~/__generated__/graphql';

export const brandMutations: MutationResolvers<IContext> = {
  /**
   * Create new brand
   */
  async brandsAdd(_root, doc: MutationBrandsAddArgs, { user, models, checkPermission }) {
    await checkPermission('brandsCreate');

    return await models.Brands.createBrand({
      userId: user._id,
      name: doc.name,
      description: doc.description ?? undefined,
      emailConfig: doc.emailConfig as IBrandEmailConfig | undefined,
    });
  },

  /**
   * Update brand
   */
  async brandsEdit(
    _root,
    { _id, ...fields }: MutationBrandsEditArgs,
    { models, checkPermission },
  ) {
    await checkPermission('brandsUpdate');

    return await models.Brands.updateBrand(_id, {
      name: fields.name,
      description: fields.description ?? undefined,
      emailConfig: fields.emailConfig as IBrandEmailConfig | undefined,
    });
  },

  /**
   * Delete brand
   */
  async brandsRemove(
    _root,
    { _ids }: MutationBrandsRemoveArgs,
    { models, checkPermission },
  ) {
    await checkPermission('brandsDelete');

    return await models.Brands.removeBrands(_ids);
  },
};
