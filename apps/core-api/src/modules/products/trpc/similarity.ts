import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';
import { IProductSimilarityBulkInput } from '@/products/@types/similarity';

const t = initTRPC.context<CoreTRPCContext>().create();

const mongoQuerySchema = z.record(z.unknown());

const mongoSortSchema = z.record(
  z.union([
    z.literal(1),
    z.literal(-1),
    z.enum(['asc', 'ascending', 'desc', 'descending']),
    z.object({ $meta: z.string() }),
  ]),
);

/** Similarity bulk payloads are validated structurally by saveSimilarity and
 *  the Mongoose schema; the tRPC boundary only rejects non-objects. */
const similarityDocSchema = z.custom<IProductSimilarityBulkInput>(
  (v) => typeof v === 'object' && v !== null && !Array.isArray(v),
);

const similarityEditSchema = z.custom<
  IProductSimilarityBulkInput & { _id: string }
>(
  (v) =>
    typeof v === 'object' &&
    v !== null &&
    !Array.isArray(v) &&
    typeof (v as { _id?: unknown })._id === 'string',
);

export const similaritiesTrpcRouter = t.router({
  find: t.procedure
    .input(
      z.object({
        query: mongoQuerySchema.optional(),
        sort: mongoSortSchema.optional(),
        skip: z.number().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { query = {}, sort = {}, skip, limit } = input || {};

      let cursor = ctx.models.ProductSimilarities.find(query).sort(sort);

      if (skip) cursor = cursor.skip(skip);
      if (limit) cursor = cursor.limit(limit);

      return cursor.lean();
    }),

  findOne: t.procedure.input(mongoQuerySchema).query(async ({ ctx, input }) => {
    return ctx.models.ProductSimilarities.findOne(input || {}).lean();
  }),

  add: t.procedure.input(similarityDocSchema).mutation(async ({ ctx, input }) => {
    return ctx.models.ProductSimilarities.addSimilarity(input);
  }),

  edit: t.procedure.input(similarityEditSchema).mutation(async ({ ctx, input }) => {
    const { _id, ...doc } = input;
    return ctx.models.ProductSimilarities.editSimilarity(_id, doc);
  }),

  remove: t.procedure
    .input(z.object({ _id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.models.ProductSimilarities.removeSimilarity(input._id);
    }),
});
