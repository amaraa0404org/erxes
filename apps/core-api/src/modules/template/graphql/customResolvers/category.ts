import { TemplateCategoryResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { ITemplateCategoryDocument } from '../../@types';

const templateCategoryResolvers: TemplateCategoryResolvers<IContext> = {
  templateCount: async (
    { _id }: ITemplateCategoryDocument,
    _args,
    { models }: IContext,
  ) => {
    return await models.Template.find({
      categoryIds: { $in: [_id] },
    }).countDocuments();
  },
  isRoot: async ({ parentId }: ITemplateCategoryDocument) => {
    return !parentId;
  },
  parent: async (
    { parentId }: ITemplateCategoryDocument,
    _args,
    { models }: IContext,
  ) => {
    if (!parentId) {
      return null;
    }

    const category = await models.TemplateCategory.findOne({ _id: parentId });

    if (!category) {
      return null;
    }

    return category;
  },
  createdBy: async (
    { createdBy }: ITemplateCategoryDocument,
    _args,
    { models }: IContext,
  ) => {
    if (!createdBy) {
      return null;
    }

    const user = await models.Users.findOne({ _id: createdBy });

    if (!user) {
      return null;
    }

    return user;
  },
  updatedBy: async (
    { updatedBy }: ITemplateCategoryDocument,
    _args,
    { models }: IContext,
  ) => {
    if (!updatedBy) {
      return null;
    }

    const user = await models.Users.findOne({ _id: updatedBy });

    if (!user) {
      return null;
    }

    return user;
  },
};

export default templateCategoryResolvers;
