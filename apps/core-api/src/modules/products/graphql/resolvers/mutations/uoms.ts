import { IUom } from 'erxes-api-shared/core-types';
import {
  MutationResolvers,
  MutationUomsAddArgs,
  MutationUomsEditArgs,
  MutationUomsRemoveArgs,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const uomMutations: MutationResolvers<IContext> = {
  /**
   * Creates a new uom
   * @param {Object} doc uom document
   */
  async uomsAdd(
    _parent,
    doc: MutationUomsAddArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('uomsManage');

    return await models.Uoms.createUom(doc as IUom);
  },

  /**
   * Edits a uom
   * @param {string} param2._id uom id
   * @param {Object} param2.doc uom info
   */
  async uomsEdit(
    _parent,
    { _id, ...doc }: MutationUomsEditArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('uomsManage');

    return await models.Uoms.updateUom(_id, doc as IUom);
  },

  /**
   * Removes a uom
   * @param {string[]} uomIds Array of Uom ids
   */
  async uomsRemove(
    _parent,
    { uomIds }: MutationUomsRemoveArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('uomsManage');

    return await models.Uoms.removeUoms(
      (uomIds ?? []).filter((id): id is string => id != null),
    );
  },
};
