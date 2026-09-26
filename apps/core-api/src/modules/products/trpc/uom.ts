import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';

const t = initTRPC.context<CoreTRPCContext>().create();

const mongoQuerySchema = z.record(z.unknown());

export const uomTrpcRouter = t.router({
  productUoms: t.router({
    find: t.procedure
      .input(z.object({ query: mongoQuerySchema.optional() }))
      .query(async ({ ctx, input }) => {
        const { query } = input;

        const { models } = ctx;

        return models.Uoms.find(query || {}).lean();
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

        return models.Uoms.findOne(query).lean();
      }),
  }),
});
