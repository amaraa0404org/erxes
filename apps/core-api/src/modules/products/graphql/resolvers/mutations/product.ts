import { IProduct } from 'erxes-api-shared/core-types';
import {
  MutationProductsAddArgs,
  MutationProductsDuplicateArgs,
  MutationProductsEditArgs,
  MutationProductsMergeArgs,
  MutationProductsRemoveArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const productMutations: MutationResolvers<IContext> = {
  /**
   * Creates a new product
   * @param {Object} doc Product document
   */
  async productsAdd(
    _root,
    doc: MutationProductsAddArgs,
    { models, __, checkPermission }: IContext,
  ) {
    await checkPermission('productsCreate');

    return models.Products.createProduct(__(doc) as IProduct);
  },

  /**
   * Edits a product
   * @param {string} _id Product id
   * @param {Object} param2.doc Product info
   */
  async productsEdit(
    _parent,
    { _id, ...doc }: MutationProductsEditArgs,
    { models, __, checkPermission }: IContext,
  ) {
    await checkPermission('productsUpdate');

    return models.Products.updateProduct(
      _id,
      __({
        ...doc,
        status: 'active',
      }) as IProduct,
    );
  },

  /**
   * Removes a product
   * @param {string} param1._id Product id
   */
  async productsRemove(
    _parent,
    { productIds }: MutationProductsRemoveArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productsDelete');

    return models.Products.removeProducts(
      (productIds ?? []).filter((id): id is string => id != null),
    );
  },

  /**
   * Merge products
   */
  async productsMerge(
    _parent,
    { productIds, productFields }: MutationProductsMergeArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productsMerge');

    return models.Products.mergeProducts(
      (productIds ?? []).filter((id): id is string => id != null),
      (productFields ?? {}) as unknown as IProduct,
    );
  },

  /**
   * Duplicate a product
   */
  async productsDuplicate(
    _parent,
    { _id }: MutationProductsDuplicateArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productsCreate');

    return models.Products.duplicateProduct(_id);
  },
};
