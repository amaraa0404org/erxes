import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { IBrand } from '@/organization/brand/types';
import { CoreTRPCContext } from '~/init-trpc';

const t = initTRPC.context<CoreTRPCContext>().create();

const mongoQuerySchema = z.record(z.unknown());

/** Brand docs are validated structurally by the Mongoose schema; the tRPC
 *  boundary only needs to reject non-object payloads. */
const brandDocSchema = z.custom<IBrand>(
  (v) => typeof v === 'object' && v !== null && !Array.isArray(v),
);

export const brandTrpcRouter = t.router({
  brands: t.router({
    find: t.procedure
      .input(z.object({ query: mongoQuerySchema.optional() }))
      .query(async ({ ctx, input }) => {
        const { query } = input;
        const { models } = ctx;

        return await models.Brands.find(query || {});
      }),
    findOne: t.procedure
      .input(mongoQuerySchema)
      .query(async ({ ctx, input }) => {
        const query = mongoQuerySchema.parse(
          input.query || input.selector || input,
        );
        const { models } = ctx;

        if (!query || !Object.keys(query).length) {
          return {};
        }

        return await models.Brands.findOne(query);
      }),
    create: t.procedure
      .input(z.object({ data: brandDocSchema }))
      .mutation(async ({ ctx, input }) => {
      const { data } = input;
      const { models } = ctx;

      return await models.Brands.createBrand(data);
    }),
    updateOne: t.procedure
      .input(z.object({ _id: z.string(), fields: brandDocSchema }))
      .mutation(async ({ ctx, input }) => {
      const { _id, fields } = input;
      const { models } = ctx;

      if (!_id) {
        return {};
      }

      return await models.Brands.updateBrand(_id, fields);
    }),
  }),
});
