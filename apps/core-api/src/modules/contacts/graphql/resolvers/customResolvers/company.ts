import { ICompanyDocument, IUserDocument } from 'erxes-api-shared/core-types';
import { CompanyResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const companyResolvers: CompanyResolvers<IContext> = {
  __resolveReference: async ({ _id }, { models }: IContext) => {
    return await models.Companies.findOne({ _id }).lean();
  },

  owner: async (company: ICompanyDocument, _, { models }: IContext) => {
    if (!company.ownerId) {
      return null;
    }

    // Historically this resolves to `{}` rather than null when the owner no
    // longer exists, so clients always see a User-shaped object.
    return (
      (await models.Users.findOne({ _id: company.ownerId }).lean()) ||
      ({} as IUserDocument)
    );
  },

  parentCompany: async (
    { parentCompanyId }: ICompanyDocument,
    _,
    { models }: IContext,
  ) => {
    return await models.Companies.findOne({ _id: parentCompanyId }).lean();
  },

  industry: (company: ICompanyDocument) => {
    const industry = company.industry;

    if (!industry) {
      return [];
    }

    if (Array.isArray(industry)) {
      return industry;
    }

    return [industry];
  },

  customers: async (
    company: ICompanyDocument,
    _params,
    { models }: IContext,
  ) => {
    const customerIds = await models.Conformities.savedConformity({
      mainType: 'company',
      mainTypeId: company._id,
      relTypes: ['customer'],
    });

    return models.Customers.find({ _id: { $in: customerIds || [] } }).lean();
  },
};

export default companyResolvers;
