import { MutationResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const branchsMutations: MutationResolvers<IContext> = {
  async branchesAdd(_parent, doc, { user, models, checkPermission }) {
    await checkPermission('branchesManage');

    const branch = await models.Branches.createBranch(doc, user);

    return branch;
  },

  async branchesEdit(_parent, { _id, ...doc }, { user, models, checkPermission }) {
    await checkPermission('branchesManage');

    const branch = await models.Branches.updateBranch(_id, doc, user);

    return branch;
  },

  async branchesRemove(_parent, { ids }, { models, checkPermission }) {
    await checkPermission('branchesManage');

    if (!ids.length) {
      throw new Error('You must specify at least one branch id to remove');
    }
    const deleteResponse = await models.Branches.removeBranches(ids);
    return { ...deleteResponse };
  },
};
