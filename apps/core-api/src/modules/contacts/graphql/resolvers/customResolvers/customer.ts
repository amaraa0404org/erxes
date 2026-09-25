import { ICustomerDocument, IUserDocument } from 'erxes-api-shared/core-types';
import { CustomerResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const customerResolvers: CustomerResolvers<IContext> = {
  __resolveReference: async ({ _id }, { models }: IContext) => {
    const customer = await models.Customers.findOne({ _id });
    return customer;
  },

  companies: async (
    customer: ICustomerDocument,
    _params,
    { models: { Companies, Conformities } }: IContext,
  ) => {
    const companyIds = await Conformities.savedConformity({
      mainType: 'customer',
      mainTypeId: customer._id,
      relTypes: ['company'],
    });

    return await Companies.find({
      _id: { $in: (companyIds || []).filter((id) => id) },
    }).limit(10);
  },

  owner: async (
    customer: ICustomerDocument,
    _params,
    { models: { Users } }: IContext,
  ) => {
    if (!customer.ownerId) {
      return null;
    }

    // Historically this resolves to `{}` rather than null when the owner no
    // longer exists, so clients always see a User-shaped object.
    return (
      (await Users.findOne({ _id: customer.ownerId })) ||
      ({} as IUserDocument)
    );
  },
};

export default customerResolvers;
