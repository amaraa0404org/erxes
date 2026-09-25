import { initTRPC } from '@trpc/server';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { z } from 'zod';
import { ICustomer, ICustomerDocument } from 'erxes-api-shared/core-types';
import { CoreTRPCContext } from '~/init-trpc';
import { createOrUpdate } from '../utils';

const t = initTRPC.context<CoreTRPCContext>().create();

/**
 * Free-form MongoDB selector/filter document. The contacts find/findOne/count
 * procedures accept arbitrary Mongo-style queries from plugins.
 */
const mongoFilterSchema = z.record(z.string(), z.unknown());

/** Free-form MongoDB update document ($set, $inc, ...) or plain field bag. */
const mongoUpdateSchema = z.record(z.string(), z.unknown());

/**
 * Customer/company create-update payload. Callers may send any customer field
 * plus messenger aliases (email, phone, deviceToken, isUser) and custom fields;
 * the model layer owns which of them are persisted.
 */
const customerDocSchema = z.record(z.string(), z.unknown());

const messengerCustomerDocSchema = z
  .object({
    integrationId: z.string(),
    email: z.string().optional(),
    emailValidationStatus: z.string().optional(),
    phone: z.string().optional(),
    phoneValidationStatus: z.string().optional(),
    code: z.string().optional(),
    isUser: z.boolean().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    middleName: z.string().optional(),
    description: z.string().optional(),
    deviceToken: z.string().optional(),
  })
  .passthrough();

const messengerCustomerUpdateDocSchema = z
  .object({
    integrationId: z.string(),
    email: z.string().optional(),
    phone: z.string().optional(),
    code: z.string().optional(),
    isUser: z.boolean().optional(),
    deviceToken: z.string().optional(),
  })
  .passthrough();

const createOrUpdateDocSchema = z.object({
  rows: z.array(
    z.object({
      selector: mongoFilterSchema,
      doc: customerDocSchema,
      customFieldsData: z.array(mongoFilterSchema).optional(),
    }),
  ),
  doNotReplaceExistingValues: z.boolean().default(false),
});

export const customerRouter = t.router({
  customers: t.router({
    find: t.procedure
      .input(z.object({ query: mongoFilterSchema.optional() }))
      .query(async ({ ctx, input }) => {
        const { query } = input;
        const { models } = ctx;

        return models.Customers.find(
          query as FilterQuery<ICustomerDocument>,
        ).lean();
      }),

    findOne: t.procedure
      .input(mongoFilterSchema)
      .query(async ({ ctx, input }) => {
        const query = (input?.query || input?.selector || input) as Record<
          string,
          unknown
        >;
        const { models } = ctx;

        if (!query || !Object.keys(query).length) {
          return {};
        }

        const defaultFilter = { status: { $ne: 'deleted' } };

        if (query?.customerPrimaryEmail) {
          defaultFilter['$or'] = [
            { emails: { $in: [query.customerPrimaryEmail] } },
            { primaryEmail: query.customerPrimaryEmail },
          ];
        }

        if (query?.customerPrimaryPhone) {
          defaultFilter['$or'] = [
            { phones: { $in: [query.customerPrimaryPhone] } },
            { primaryPhone: query.customerPrimaryPhone },
          ];
        }

        if (query?.customerCode) {
          defaultFilter['code'] = query.customerCode;
        }

        if (query?._id) {
          defaultFilter['_id'] = query._id;
        }
        return models.Customers.findOne(defaultFilter).lean();
      }),

    findActiveCustomers: t.procedure
      .input(
        z.object({
          query: mongoFilterSchema.optional(),
          fields: mongoFilterSchema.optional(),
          skip: z.number().optional(),
          limit: z.number().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { query, fields, skip, limit } = input;
        const { models } = ctx;

        return models.Customers.findActiveCustomers(query, fields, skip, limit);
      }),

    getCustomerName: t.procedure
      .input(z.object({ customer: customerDocSchema }))
      .query(async ({ ctx, input }) => {
        const { customer } = input;
        const { models } = ctx;

        return models.Customers.getCustomerName(customer as ICustomer);
      }),

    getWidgetCustomer: t.procedure
      .input(
        z.object({
          integrationId: z.string().optional(),
          email: z.string().optional(),
          phone: z.string().optional(),
          code: z.string().optional(),
          cachedCustomerId: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { models } = ctx;

        return models.Customers.getWidgetCustomer(input);
      }),

    count: t.procedure
      .input(z.object({ query: mongoFilterSchema.optional() }))
      .query(async ({ ctx, input }) => {
        const { query } = input;
        const { models } = ctx;

        return models.Customers.countDocuments(
          query as FilterQuery<ICustomerDocument>,
        );
      }),

    createCustomer: t.procedure
      .input(z.object({ doc: customerDocSchema }))
      .mutation(async ({ ctx, input }) => {
        const { doc } = input;
        const { models } = ctx;

        return models.Customers.createCustomer(doc as ICustomer);
      }),

    updateCustomer: t.procedure
      .input(z.object({ _id: z.string(), doc: customerDocSchema }))
      .mutation(async ({ ctx, input }) => {
        const { _id, doc } = input;
        const { models } = ctx;
        return models.Customers.updateCustomer(_id, doc as ICustomer);
      }),

    updateOne: t.procedure
      .input(
        z.object({
          query: mongoFilterSchema.optional(),
          doc: mongoUpdateSchema.optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { query, doc } = input;
        const { models } = ctx;

        if (!query || !Object.keys(query).length) {
          return {};
        }

        return models.Customers.updateOne(
          query as FilterQuery<ICustomerDocument>,
          doc as UpdateQuery<ICustomerDocument>,
        );
      }),

    updateMany: t.procedure
      .input(
        z.object({
          selector: mongoFilterSchema,
          modifier: mongoUpdateSchema,
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;
        const { selector, modifier } = input;
        return await models.Customers.updateMany(
          selector as FilterQuery<ICustomerDocument>,
          modifier as UpdateQuery<ICustomerDocument>,
        );
      }),

    removeCustomers: t.procedure
      .input(z.object({ _ids: z.array(z.string()) }))
      .mutation(async ({ ctx, input }) => {
        const { _ids } = input;
        const { models } = ctx;

        return models.Customers.removeCustomers(_ids);
      }),

    markCustomerAsActive: t.procedure
      .input(z.object({ _id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const { _id } = input;
        const { models } = ctx;

        return models.Customers.markCustomerAsActive(_id);
      }),

    createMessengerCustomer: t.procedure
      .input(
        z.object({
          doc: messengerCustomerDocSchema,
          customData: mongoFilterSchema.optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { doc, customData } = input;
        const { models } = ctx;

        return models.Customers.createMessengerCustomer({
          doc,
          customData,
        });
      }),

    updateMessengerCustomer: t.procedure
      .input(
        z.object({
          _id: z.string(),
          doc: messengerCustomerUpdateDocSchema,
          customData: mongoFilterSchema.optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { _id, doc, customData } = input;
        const { models } = ctx;

        return models.Customers.updateMessengerCustomer({
          _id,
          doc,
          customData,
        });
      }),

    saveVisitorContactInfo: t.procedure
      .input(
        z.object({
          params: z
            .object({
              customerId: z.string(),
              visitorId: z.string().optional(),
              type: z.string(),
              value: z.string(),
            })
            .passthrough(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { params } = input;
        const { models } = ctx;

        return models.Customers.saveVisitorContactInfo(params);
      }),

    updateLocation: t.procedure
      .input(
        z.object({
          customerId: z.string(),
          browserInfo: z
            .object({
              language: z.string().optional(),
              url: z.string().optional(),
              city: z.string().optional(),
              countryCode: z.string().optional(),
            })
            .passthrough(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { customerId, browserInfo } = input;
        const { models } = ctx;

        return models.Customers.updateLocation(customerId, browserInfo);
      }),

    updateSession: t.procedure
      .input(z.object({ customerId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const { customerId } = input;
        const { models } = ctx;

        return models.Customers.updateSession(customerId);
      }),

    setUnsubscribed: t.procedure
      .input(
        z.object({
          customerIds: z.array(z.string()).optional(),
          status: z.string().optional(),
          _id: z.string().optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { customerIds = [], status, _id } = input;
        const { models } = ctx;

        return models.Customers.updateSubscriptionStatus({
          customerIds,
          status,
          _id,
        });
      }),

    createOrUpdate: t.procedure
      .input(z.object({ doc: createOrUpdateDocSchema }))
      .mutation(async ({ ctx, input }) => {
        const { doc } = input;
        const { models } = ctx;

        return createOrUpdate({
          collection: models.Customers,
          data: doc,
        });
      }),

    tag: t.procedure
      .input(
        z.object({
          action: z.string(),
          _ids: z.array(z.string()).optional(),
          tagIds: z.array(z.string()).optional(),
          targetIds: z.array(z.string()).optional(),
          type: z.string().optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { action, _ids, tagIds, targetIds } = input;
        const { models } = ctx;

        let response = {};

        if (action === 'count') {
          response = await models.Customers.countDocuments({
            tagIds: { $in: _ids },
          });
        }

        if (action === 'tagObject') {
          await models.Customers.updateMany(
            { _id: { $in: targetIds } },
            { $set: { tagIds } },
          );

          response = await models.Customers.find({
            _id: { $in: targetIds },
          }).lean();
        }

        return response;
      }),
  }),
});
