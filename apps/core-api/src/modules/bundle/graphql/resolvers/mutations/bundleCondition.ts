import {
  MutationBundleConditionAddArgs,
  MutationBundleConditionDefaultArgs,
  MutationBundleConditionEditArgs,
  MutationBundleConditionRemoveArgs,
  MutationBundleConditionSetBulkArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const bundleConditionMutations: MutationResolvers<IContext> = {
  async bundleConditionAdd(
    _root,
    doc: MutationBundleConditionAddArgs,
    { user, models, checkPermission },
  ) {
    await checkPermission('bundleConditionsManage');

    return models.BundleCondition.createCondition({
      userId: user._id,
      ...doc,
    });
  },

  async bundleConditionEdit(
    _root,
    { _id, ...fields }: MutationBundleConditionEditArgs,
    { models, checkPermission },
  ) {
    await checkPermission('bundleConditionsManage');

    return models.BundleCondition.updateCondition(_id, fields);
  },

  async bundleConditionRemove(
    _root,
    { _ids }: MutationBundleConditionRemoveArgs,
    { models, checkPermission },
  ) {
    await checkPermission('bundleConditionsManage');

    const result = await models.BundleCondition.removeCondition(_ids ?? []);

    return result as unknown as Record<string, unknown>;
  },

  async bundleConditionDefault(
    _root,
    { _id }: MutationBundleConditionDefaultArgs,
    { models, checkPermission },
  ) {
    await checkPermission('bundleConditionsManage');

    await models.BundleCondition.updateMany({}, { isDefault: false });

    const result = await models.BundleCondition.updateOne(
      { _id },
      { isDefault: true },
    );

    return result as unknown as Record<string, unknown>;
  },

  async bundleConditionSetBulk(
    _root,
    { bundleId, productIds }: MutationBundleConditionSetBulkArgs,
    { models, checkPermission },
  ) {
    await checkPermission('bundleConditionsManage');

    const result = await models.Products.updateMany(
      { _id: { $in: productIds } },
      { $set: { bundleId: bundleId } },
    );

    return result as unknown as Record<string, unknown>;
  },
};
