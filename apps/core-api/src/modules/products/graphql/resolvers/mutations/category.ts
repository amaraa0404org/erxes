import { IProductCategory } from 'erxes-api-shared/core-types';
import {
  MutationProductCategoriesAddArgs,
  MutationProductCategoriesEditArgs,
  MutationProductCategoriesRemoveArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const categoryMutations: MutationResolvers<IContext> = {
  /**
   * Creates a new product category
   * @param {Object} doc Product category document
   */
  async productCategoriesAdd(
    _parent,
    doc: MutationProductCategoriesAddArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productCategoriesManage');

    // `order` is generated inside the model from the parent category.
    return await models.ProductCategories.createProductCategory(
      doc as IProductCategory,
    );
  },

  /**
   * Edits a product category
   * @param {string} param2._id ProductCategory id
   * @param {Object} param2.doc ProductCategory info
   */
  async productCategoriesEdit(
    _parent,
    { _id, ...doc }: MutationProductCategoriesEditArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productCategoriesManage');

    // `order` is regenerated inside the model from the parent category.
    return await models.ProductCategories.updateProductCategory(
      _id,
      doc as IProductCategory,
    );
  },

  /**
   * Removes a product category
   * @param {string} param1._id ProductCategory id
   */

  async productCategoriesRemove(
    _parent,
    { _id }: MutationProductCategoriesRemoveArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productCategoriesManage');

    const result = await models.ProductCategories.removeProductCategory(_id);

    return result as unknown as Record<string, unknown>;
  },
};
