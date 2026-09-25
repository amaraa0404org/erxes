import { IContext } from '~/connectionResolvers';
import { TEmailScope } from '~/utils/email/scope';
import {
  listAuthenticatedDomains,
  listSingleSenders,
  resolveAlignedFrom,
} from '~/utils/email/senders';
import {
  EmailSenderOptionsResolvers,
  ResolversTypes,
} from '~/__generated__/graphql';

export interface IEmailSenderOptionsRoot {
  supportsSenderVerification: boolean;
  _scope?: TEmailScope;
}

const emailSenderOptionsResolvers: EmailSenderOptionsResolvers<IContext> = {
  async senders(
    root: IEmailSenderOptionsRoot,
    _args,
    { models }: IContext,
  ) {
    if (!root.supportsSenderVerification) {
      return [];
    }

    // The schema's EmailSender is mapped to the claim document, but this field
    // returns provider-level senders ({ id, type, value, name, status }).
    return (await listSingleSenders(
      models,
      root._scope,
    )) as unknown as ResolversTypes['EmailSender'][];
  },

  async supportsDynamicSender(
    root: IEmailSenderOptionsRoot,
    _args,
    { models }: IContext,
  ) {
    if (!root.supportsSenderVerification) {
      return true;
    }

    const domains = await listAuthenticatedDomains(models, root._scope);

    return domains.some((domain) => domain.status === 'verified');
  },

  async alignedFrom(
    root: IEmailSenderOptionsRoot,
    _args,
    { models }: IContext,
  ) {
    return await resolveAlignedFrom(models, root._scope);
  },
};

export default emailSenderOptionsResolvers;
