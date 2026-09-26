import {
  BundleRuleItemInput,
  MutationBundleRulesAddArgs,
  MutationBundleRulesEditArgs,
  MutationBundleRulesRemoveArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const nonNullRules = (
  rules: MutationBundleRulesAddArgs['rules'],
): BundleRuleItemInput[] | null | undefined =>
  rules === undefined
    ? undefined
    : (rules ?? []).filter(
        (rule): rule is BundleRuleItemInput => rule != null,
      );

export const bundleRuleMutations: MutationResolvers<IContext> = {
  async bundleRulesAdd(
    _root,
    doc: MutationBundleRulesAddArgs,
    { models, checkPermission },
  ) {
    await checkPermission('bundleRulesManage');

    return models.BundleRule.createRule({
      ...doc,
      rules: nonNullRules(doc.rules) ?? undefined,
    });
  },

  async bundleRulesEdit(
    _root,
    { _id, ...fields }: MutationBundleRulesEditArgs,
    { models, checkPermission },
  ) {
    await checkPermission('bundleRulesManage');

    const { rules, ...rest } = fields;

    return models.BundleRule.updateRule(_id, {
      ...rest,
      ...(rules !== undefined ? { rules: nonNullRules(rules) ?? null } : {}),
    });
  },

  async bundleRulesRemove(
    _root,
    { _ids }: MutationBundleRulesRemoveArgs,
    { models, checkPermission },
  ) {
    await checkPermission('bundleRulesManage');

    const result = await models.BundleRule.removeRule(_ids ?? []);

    return result as unknown as Record<string, unknown>;
  },
};
