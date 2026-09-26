import {
  AnyResolver,
  ICursorPaginateParams,
  ICustomerDocument,
} from 'erxes-api-shared/core-types';
import { cursorPaginate } from 'erxes-api-shared/utils';
import { FilterQuery } from 'mongoose';
import {
  QueryContactsLogsArgs,
  QueryCpCustomerDetailArgs,
  QueryCpCustomersArgs,
  QueryCustomerDetailArgs,
  QueryCustomersArgs,
  QueryCustomersCountArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { customersCount, generateFilter } from '~/modules/contacts/utils';
import { customerSearchTokenConfig } from '@/contacts/db/definitions/customers';

const toCursorParams = (
  args: QueryCustomersArgs | QueryCpCustomersArgs,
): ICursorPaginateParams => ({
  cursor: args.cursor ?? undefined,
  limit: args.limit ?? undefined,
  // Nominal codegen enums; the runtime values are the literals themselves.
  direction: args.direction as ICursorPaginateParams['direction'],
  orderBy: args.orderBy as ICursorPaginateParams['orderBy'],
});

const logCustomersMemory = (
  stage: string,
  startedAt: number,
  details: Record<string, boolean | number | string | undefined> = {},
) => {
  const memory = process.memoryUsage();

  console.info('[customers-memory]', {
    stage,
    elapsedMs: Math.round(performance.now() - startedAt),
    rssMb: Math.round(memory.rss / 1024 / 1024),
    heapUsedMb: Math.round(memory.heapUsed / 1024 / 1024),
    heapTotalMb: Math.round(memory.heapTotal / 1024 / 1024),
    externalMb: Math.round(memory.external / 1024 / 1024),
    arrayBuffersMb: Math.round(memory.arrayBuffers / 1024 / 1024),
    ...details,
  });
};

export const customerQueries: QueryResolvers<IContext> = {
  /**
   * Customers list
   */
  async customers(
    _parent,
    params: QueryCustomersArgs,
    { models, subdomain }: IContext,
  ) {
    try {
      const filter: FilterQuery<ICustomerDocument> = await generateFilter<ICustomerDocument>(
        subdomain,
        params,
        models,
        customerSearchTokenConfig,
      );

      const { list, totalCount, pageInfo } =
        await cursorPaginate<ICustomerDocument>({
          model: models.Customers,
          params: toCursorParams(params),
          query: filter,
        });

      return { list, totalCount, pageInfo };
    } catch (error) {
      throw error;
    }
  },

  async cpCustomers(
    _parent,
    params: QueryCpCustomersArgs,
    { models, subdomain }: IContext,
  ) {
    const filter: FilterQuery<ICustomerDocument> = await generateFilter<ICustomerDocument>(
      subdomain,
      params,
      models,
      customerSearchTokenConfig,
    );

    const { list, totalCount, pageInfo } =
      await cursorPaginate<ICustomerDocument>({
        model: models.Customers,
        params: toCursorParams(params),
        query: filter,
      });

    return { list, totalCount, pageInfo };
  },

  /**
   * Get one customer
   */
  customerDetail(
    _parent,
    { _id }: QueryCustomerDetailArgs,
    { models }: IContext,
  ) {
    return models.Customers.getCustomer(_id);
  },

  cpCustomerDetail(
    _parent,
    { _id }: QueryCpCustomerDetailArgs,
    { models }: IContext,
  ) {
    return models.Customers.getCustomer(_id);
  },

  async contactsLogs(
    _parent,
    { action, contentType, content }: QueryContactsLogsArgs,
    { models }: IContext,
  ) {
    const { Companies, Customers } = models;
    let result: unknown = {};

    const type = contentType.split(':')[1];

    if (action === 'merge') {
      // `content` is a JSON list of ids; the JSON scalar maps to
      // Record<string, unknown> in generated types, so the runtime array is
      // narrowed back here.
      const ids = (content ?? []) as unknown as string[];

      switch (type) {
        case 'company':
          result = await Companies.find({
            _id: { $in: ids },
          }).lean();
          break;
        case 'customer':
          result = await Customers.find({
            _id: { $in: ids },
          }).lean();
          break;
        default:
          break;
      }
    }

    return result as Record<string, unknown>;
  },

  async customersCount(
    _parent,
    params: QueryCustomersCountArgs,
    { models, subdomain }: IContext,
  ) {
    const types = params.types || [];

    const counts: Record<string, Record<string, number>> = {};

    for (const type of types) {
      const contentType = type.toLowerCase();

      counts[contentType] = await customersCount({
        models,
        subdomain,
        type: contentType,
      });
    }

    return counts;
  },
};

(customerQueries.cpCustomers as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};

(customerQueries.cpCustomerDetail as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
