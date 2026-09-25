import { initTRPC } from '@trpc/server';
import { escapeRegExp } from 'erxes-api-shared/utils';
import { PipelineStage } from 'mongoose';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';

const t = initTRPC.context<CoreTRPCContext>().create();

const mongoQuerySchema = z.record(z.unknown());

export const branchTrpcRouter = t.router({
  branches: t.router({
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

      return await models.Branches.find(query || {}, fields).lean();
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

      return await models.Branches.findOne(query).lean();
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

      const branches = await models.Branches.find(query || {});

      if (!branches.length) {
        return [];
      }

      const orderQry: Record<string, unknown>[] = [];

      for (const branch of branches) {
        orderQry.push({
          order: { $regex: new RegExp(`^${escapeRegExp(branch.order || '')}`) },
        });
      }

      return await models.Branches.find(
        {
          $or: orderQry,
        },
        fields,
      )
        .sort({ order: 1 })
        .lean();
    }),

    aggregate: t.procedure
      .input(
        z.object({
          pipeline: z.custom<PipelineStage[]>((v) => Array.isArray(v)),
        }),
      )
      .query(async ({ ctx, input }) => {
      const { pipeline } = input;
      const { models } = ctx;

      return await models.Branches.aggregate(pipeline);
    }),
  }),
});
