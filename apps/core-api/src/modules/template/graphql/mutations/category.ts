import { MutationResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { ITemplateCategory } from '../../@types';

const categoryMutations: MutationResolvers<IContext> = {
  templateCategoryAdd: async (
    _root: unknown,
    doc: ITemplateCategory,
    { user, models }: IContext,
  ) => {
    return await models.TemplateCategory.createTemplateCategory(doc, user);
  },

  templateCategoryEdit: async (
    _root: unknown,
    { _id, ...doc }: ITemplateCategory & { _id: string },
    { user, models }: IContext,
  ) => {
    return await models.TemplateCategory.updateTemplateCategory(_id, doc, user);
  },

  templateCategoryRemove: async (
    _root: unknown,
    { _ids }: { _ids: string[] },
    { models }: IContext,
  ) => {
    const result = await models.TemplateCategory.removeTemplateCategory(_ids);

    // JSON scalar output is typed Record<string, unknown> in codegen.
    return result as unknown as Record<string, unknown>;
  },
};

export default categoryMutations;
