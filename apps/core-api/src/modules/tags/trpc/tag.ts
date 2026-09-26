import { initTRPC } from '@trpc/server';
import { ITag } from 'erxes-api-shared/core-types';
import { escapeRegExp } from 'erxes-api-shared/utils';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';

const t = initTRPC.context<CoreTRPCContext>().create();

const mongoQuerySchema = z.record(z.unknown());

/** Tag docs are validated structurally by the Mongoose schema; the tRPC
 *  boundary only needs to reject non-object payloads. */
const tagDocSchema = z.custom<ITag>(
  (v) => typeof v === 'object' && v !== null && !Array.isArray(v),
);

export const tagTrpcRouter = t.router({
  tags: t.router({
    find: t.procedure
      .input(z.object({ query: mongoQuerySchema.optional() }))
      .query(async ({ ctx, input }) => {
        const { query } = input;
        const { models } = ctx;

        return await models.Tags.find(query || {}).lean();
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

        return await models.Tags.findOne(query);
      }),

    findWithChild: t.procedure
      .input(
        z.object({
          query: mongoQuerySchema.optional(),
          fields: mongoQuerySchema.optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { query, fields } = input;
        const { models } = ctx;

        const tags = await models.Tags.find(query || {}).lean();

        if (!tags.length) {
          return [];
        }

        const orderQry: Record<string, unknown>[] = [];
        for (const tag of tags) {
          orderQry.push({
            order: { $regex: new RegExp(`^${escapeRegExp(tag.order || '')}`) },
          });
        }

        return await models.Tags.find(
          {
            $or: orderQry,
          },
          fields || {},
        )
          .sort({ order: 1 })
          .lean();
      }),
    create: t.procedure
      .input(z.object({ data: tagDocSchema }))
      .mutation(async ({ ctx, input }) => {
      const { data } = input;
      const { models } = ctx;

      return await models.Tags.createTag(data);
    }),
  }),
});
