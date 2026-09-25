import { IProductSimilarityBulkInput } from '@/products/@types/similarity';
import {
  MutationProductBulkSimilarityAddArgs,
  MutationProductBulkSimilarityEditArgs,
  MutationProductBulkSimilarityRemoveArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const productSimilarityMutations: MutationResolvers<IContext> = {
  async productBulkSimilarityAdd(
    _root,
    { doc }: MutationProductBulkSimilarityAddArgs,
    { models, user, checkPermission }: IContext,
  ) {
    await checkPermission('productsCreate');

    return models.ProductSimilarities.addSimilarity(
      doc as unknown as IProductSimilarityBulkInput,
      user,
    );
  },

  async productBulkSimilarityEdit(
    _root,
    { _id, doc }: MutationProductBulkSimilarityEditArgs,
    { models, user, checkPermission }: IContext,
  ) {
    await checkPermission('productsUpdate');

    return models.ProductSimilarities.editSimilarity(
      _id,
      doc as unknown as IProductSimilarityBulkInput,
      user,
    );
  },

  async productBulkSimilarityRemove(
    _root,
    { _id }: MutationProductBulkSimilarityRemoveArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productsDelete');

    return models.ProductSimilarities.removeSimilarity(_id);
  },
};
