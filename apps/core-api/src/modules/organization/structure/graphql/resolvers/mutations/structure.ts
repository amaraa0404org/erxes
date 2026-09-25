import { MutationResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const structuresMutations: MutationResolvers<IContext> = {
  async structuresAdd(_parent, doc, { user, models, checkPermission }) {
    await checkPermission('structuresManage');

    const structure = await models.Structures.createStructure(doc, user);

    return structure;
  },

  async structuresEdit(
    _parent,
    { _id, ...doc },
    { user, models, checkPermission },
  ) {
    await checkPermission('structuresManage');

    const structure = await models.Structures.updateStructure(_id, doc, user);

    return structure;
  },

  async structuresRemove(_parent, { _id }, { models, checkPermission }) {
    await checkPermission('structuresManage');

    const deleteResponse = await models.Structures.removeStructure(_id);

    return deleteResponse.toObject();
  },
};
