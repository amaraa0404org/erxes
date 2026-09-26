import { MutationResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const positionMutations: MutationResolvers<IContext> = {
  async positionsAdd(_parent, doc, { user, models, checkPermission }) {
    await checkPermission('positionsManage');

    const position = await models.Positions.createPosition(doc, user);
    return position;
  },

  async positionsEdit(
    _parent,
    { _id, ...doc },
    { user, models, checkPermission },
  ) {
    await checkPermission('positionsManage');

    const position = await models.Positions.updatePosition(_id, doc, user);

    return position;
  },

  async positionsRemove(_parent, { ids }, { models, checkPermission }) {
    await checkPermission('positionsManage');

    if (!ids.length) {
      throw new Error('You must specify at least one position id to remove');
    }

    const deleteResponse = await models.Positions.removePositions(ids);

    return { ...deleteResponse };
  },
};
