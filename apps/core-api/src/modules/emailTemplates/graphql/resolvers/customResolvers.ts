import { IEmailTemplateDocument } from 'erxes-api-shared/core-types';
import { EmailTemplateResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const emailTemplateCustomResolvers: EmailTemplateResolvers<IContext> = {
  async createdUser(
    { createdBy }: IEmailTemplateDocument,
    _args,
    { models }: IContext,
  ) {
    return createdBy ? models.Users.findOne({ _id: createdBy }) : null;
  },
};
