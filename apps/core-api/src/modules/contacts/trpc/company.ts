import { initTRPC } from '@trpc/server';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { z } from 'zod';
import { ICompany, ICompanyDocument } from 'erxes-api-shared/core-types';
import { createOrUpdate } from '../utils';
import { CoreTRPCContext } from '~/init-trpc';

const t = initTRPC.context<CoreTRPCContext>().create();

/** Free-form MongoDB selector/filter document sent by plugin callers. */
const mongoFilterSchema = z.record(z.string(), z.unknown());

/** Free-form MongoDB update document ($set, $inc, ...) or plain field bag. */
const mongoUpdateSchema = z.record(z.string(), z.unknown());

/** Company create-update payload; callers may send any company field. */
const companyDocSchema = z.record(z.string(), z.unknown());

const createOrUpdateDocSchema = z.object({
  rows: z.array(
    z.object({
      selector: mongoFilterSchema,
      doc: companyDocSchema,
      customFieldsData: z.array(mongoFilterSchema).optional(),
    }),
  ),
  doNotReplaceExistingValues: z.boolean().default(false),
});

export const companyTrpcRouter = t.router({
  companies: t.router({
    find: t.procedure
      .input(z.object({ query: mongoFilterSchema.optional() }))
      .query(async ({ ctx, input }) => {
        const { query } = input;
        const { models } = ctx;

        return models.Companies.find(
          query as FilterQuery<ICompanyDocument>,
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

        if (query.companyPrimaryName) {
          defaultFilter['$or'] = [
            { names: { $in: [query.companyPrimaryName] } },
            { primaryName: query.companyPrimaryName },
          ];
        }

        if (query.name) {
          defaultFilter['$or'] = [
            { names: { $in: [query.name] } },
            { primaryName: query.name },
          ];
        }

        if (query.email) {
          defaultFilter['$or'] = [
            { emails: { $in: [query.email] } },
            { primaryEmail: query.email },
          ];
        }

        if (query.phone) {
          defaultFilter['$or'] = [
            { phones: { $in: [query.phone] } },
            { primaryPhone: query.phone },
          ];
        }

        if (query.companyPrimaryEmail) {
          defaultFilter['$or'] = [
            { emails: { $in: [query.companyPrimaryEmail] } },
            { primaryEmail: query.companyPrimaryEmail },
          ];
        }

        if (query.companyPrimaryPhone) {
          defaultFilter['$or'] = [
            { phones: { $in: [query.companyPrimaryPhone] } },
            { primaryPhone: query.companyPrimaryPhone },
          ];
        }

        if (query.companyCode) {
          defaultFilter['code'] = query.companyCode;
        }

        if (query._id) {
          defaultFilter['_id'] = query._id;
        }

        return models.Companies.findOne(defaultFilter).lean();
      }),

    findActiveCompanies: t.procedure
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

        return models.Companies.findActiveCompanies(query, fields, skip, limit);
      }),

    getCompanyName: t.procedure
      .input(z.object({ company: companyDocSchema }))
      .query(async ({ ctx, input }) => {
        const { company } = input;
        const { models } = ctx;

        return models.Companies.getCompanyName(company as ICompany);
      }),

    createCompany: t.procedure
      .input(z.object({ doc: companyDocSchema }))
      .mutation(async ({ ctx, input }) => {
        const { doc } = input;
        const { models } = ctx;

        const company = await models.Companies.createCompany(doc as ICompany);

        return company;
      }),

    updateCompany: t.procedure
      .input(z.object({ _id: z.string(), doc: companyDocSchema }))
      .mutation(async ({ ctx, input }) => {
        const { _id, doc } = input;
        const { models } = ctx;

        const company = await models.Companies.updateCompany(
          _id,
          doc as ICompany,
        );

        return company;
      }),

    removeCompanies: t.procedure
      .input(z.object({ _ids: z.array(z.string()) }))
      .mutation(async ({ ctx, input }) => {
        const { _ids } = input;
        const { models } = ctx;

        return models.Companies.removeCompanies(_ids);
      }),

    createOrUpdate: t.procedure
      .input(z.object({ doc: createOrUpdateDocSchema }))
      .mutation(async ({ ctx, input }) => {
        const { doc } = input;
        const { models } = ctx;

        return createOrUpdate({
          collection: models.Companies,
          data: doc,
        });
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
        if (!selector || !Object.keys(selector).length) {
          return {};
        }
        return await models.Companies.updateMany(
          selector as FilterQuery<ICompanyDocument>,
          modifier as UpdateQuery<ICompanyDocument>,
        );
      }),
  }),
});
