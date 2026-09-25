import {
  AnyResolver,
  ICompanyDocument,
  ICursorPaginateParams,
} from 'erxes-api-shared/core-types';
import { cursorPaginate } from 'erxes-api-shared/utils';
import { FilterQuery } from 'mongoose';
import {
  QueryCompaniesArgs,
  QueryCompanyDetailArgs,
  QueryCpCompaniesArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { generateFilter } from '~/modules/contacts/utils';

const toCursorParams = (
  args: QueryCompaniesArgs | QueryCpCompaniesArgs,
): ICursorPaginateParams => ({
  cursor: args.cursor ?? undefined,
  limit: args.limit ?? undefined,
  // Nominal codegen enums; the runtime values are the literals themselves.
  direction: args.direction as ICursorPaginateParams['direction'],
  orderBy: args.orderBy as ICursorPaginateParams['orderBy'],
});

export const companyQueries: QueryResolvers<IContext> = {
  /**
   * Get companies
   */
  companies: async (
    _parent,
    params: QueryCompaniesArgs,
    { models, subdomain }: IContext,
  ) => {
    const filter: FilterQuery<ICompanyDocument> = await generateFilter<ICompanyDocument>(
      subdomain,
      params,
      models,
    );

    const { list, totalCount, pageInfo } =
      await cursorPaginate<ICompanyDocument>({
        model: models.Companies,
        params: toCursorParams(params),
        query: filter,
      });

    return { list, totalCount, pageInfo };
  },

  cpCompanies: async (
    _parent,
    params: QueryCpCompaniesArgs,
    { models, subdomain }: IContext,
  ) => {
    const filter: FilterQuery<ICompanyDocument> = await generateFilter<ICompanyDocument>(
      subdomain,
      params,
      models,
    );

    const { list, totalCount, pageInfo } =
      await cursorPaginate<ICompanyDocument>({
        model: models.Companies,
        params: toCursorParams(params),
        query: filter,
      });

    return { list, totalCount, pageInfo };
  },

  /**
   * Get one company
   */
  companyDetail: async (
    _parent,
    { _id }: QueryCompanyDetailArgs,
    { models }: IContext,
  ) => {
    return await models.Companies.findOne({ $or: [{ _id }, { code: _id }] });
  },
};

(companyQueries.cpCompanies as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
