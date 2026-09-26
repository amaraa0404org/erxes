import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';

const t = initTRPC.context<CoreTRPCContext>().create();

export const fieldTrpcRouter = t.router({
  fields: t.router({
    find: t.procedure
      .input(
        z.object({
          query: z.record(z.unknown()).optional(),
          projection: z.record(z.unknown()).optional(),
          sort: z
            .record(
              z.union([
                z.literal(1),
                z.literal(-1),
                z.enum(['asc', 'ascending', 'desc', 'descending']),
                z.object({ $meta: z.string() }),
              ]),
            )
            .optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
      const { models } = ctx;
      const { query, projection, sort } = input;

      return models.Fields.find(query || {}, projection).sort(sort).lean();
    }),
  }),
});
