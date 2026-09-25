import { IContext } from '~/connectionResolvers';
import {
  MutationConformityAddArgs,
  MutationConformityEditArgs,
  MutationResolvers,
} from '~/__generated__/graphql';

const conformityMutations: MutationResolvers<IContext> = {
  /**
   * Create new conformity
   */
  async conformityAdd(
    _root,
    doc: MutationConformityAddArgs,
    { models }: IContext,
  ) {
    return models.Conformities.addConformity({ ...doc });
  },

  /**
   * Edit conformity
   */
  async conformityEdit(
    _root,
    doc: MutationConformityEditArgs,
    { models }: IContext,
  ) {
    return models.Conformities.editConformity({
      ...doc,
      relTypeIds: doc.relTypeIds || [],
    });
  },
};

export default conformityMutations;
