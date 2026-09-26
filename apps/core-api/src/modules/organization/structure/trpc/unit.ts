import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';

const t = initTRPC.context<CoreTRPCContext>().create();

const mongoQuerySchema = z.record(z.unknown());

export const unitTrpcRouter = t.router({
  units: t.router({
    find: t.procedure
      .input(
        z.object({
          query: mongoQuerySchema.optional(),
          fields: mongoQuerySchema.optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
      const { models } = ctx;
      const { query, fields } = input;

      return await models.Units.find(query || {}, fields).lean();
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

      return await models.Units.findOne(query).lean();
    }),
  }),
});
