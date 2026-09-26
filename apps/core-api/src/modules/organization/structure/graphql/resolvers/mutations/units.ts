import { MutationResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const unitsMutations: MutationResolvers<IContext> = {
  async unitsAdd(_parent, doc, { user, models, checkPermission }) {
    await checkPermission('unitsManage');

    const unit = await models.Units.createUnit(doc, user);

    return unit;
  },

  async unitsEdit(_parent, { _id, ...doc }, { user, models, checkPermission }) {
    await checkPermission('unitsManage');

    const unit = await models.Units.updateUnit(_id, doc, user);

    return unit;
  },

  async unitsRemove(_parent, { ids }, { models, checkPermission }) {
    await checkPermission('unitsManage');

    if (!ids.length) {
      throw new Error('You must specify at least one unit id to remove');
    }
    const deleteResponse = await models.Units.removeUnits(ids);

    return { ...deleteResponse };
  },
};
