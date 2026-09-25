import { IEmailTemplate } from 'erxes-api-shared/core-types';
import { MutationResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

type TEmailTemplateInput = Omit<IEmailTemplate, 'createdBy'>;

export const emailTemplateMutations: MutationResolvers<IContext> = {
  async emailTemplateAdd(
    _root: unknown,
    doc: TEmailTemplateInput,
    { user, models, checkPermission }: IContext,
  ) {
    await checkPermission('emailTemplatesCreate');

    return models.EmailTemplates.createEmailTemplate({
      ...doc,
      createdBy: user._id,
    });
  },

  async emailTemplateEdit(
    _root: unknown,
    { _id, ...doc }: TEmailTemplateInput & { _id: string },
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('emailTemplatesUpdate');

    return models.EmailTemplates.updateEmailTemplate(_id, doc);
  },

  async emailTemplateRemove(
    _root: unknown,
    { _id }: { _id: string },
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('emailTemplatesDelete');

    await models.EmailTemplates.removeEmailTemplate(_id);

    return { _id };
  },
};
