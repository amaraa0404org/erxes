import { ICompany } from 'erxes-api-shared/core-types';
import {
  MutationCompaniesAddArgs,
  MutationCompaniesEditArgs,
  MutationCompaniesMergeArgs,
  MutationCompaniesRemoveArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const companyMutations: MutationResolvers<IContext> = {
  /**
   * Creates a new company
   */
  async companiesAdd(
    _parent,
    doc: MutationCompaniesAddArgs,
    { models, user, checkPermission }: IContext,
  ) {
    await checkPermission('contactsCreate');

    return await models.Companies.createCompany(doc as ICompany, user);
  },

  /**
   * Updates a company
   */
  async companiesEdit(
    _parent,
    { _id, ...doc }: MutationCompaniesEditArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('contactsUpdate');

    return await models.Companies.updateCompany(_id, doc as ICompany);
  },

  /**
   * Removes companies
   */
  async companiesRemove(
    _parent,
    { companyIds }: MutationCompaniesRemoveArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('contactsDelete');

    await models.Companies.removeCompanies(companyIds);

    return companyIds;
  },

  /**
   * Merge companies
   */
  async companiesMerge(
    _parent,
    { companyIds, companyFields }: MutationCompaniesMergeArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('contactsMerge');

    return models.Companies.mergeCompanies(
      companyIds,
      companyFields as ICompany,
    );
  },
};
