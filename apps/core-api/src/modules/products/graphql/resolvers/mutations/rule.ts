import { IProductRule } from '@/products/@types/rule';
import {
  MutationProductRulesRemoveArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const productRuleMutations: MutationResolvers<IContext> = {
  async productRulesAdd(
    _root,
    params: IProductRule,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productRulesManage');

    return models.ProductRules.createRule(params);
  },

  async productRulesEdit(
    _root,
    { _id, ...doc }: { _id: string } & IProductRule,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productRulesManage');

    return models.ProductRules.updateRule(_id, doc);
  },

  async productRulesRemove(
    _root,
    { _ids }: MutationProductRulesRemoveArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('productRulesManage');

    const result = await models.ProductRules.removeRule(
      _ids.filter((id): id is string => id != null),
    );

    return result as unknown as Record<string, unknown>;
  },
};
