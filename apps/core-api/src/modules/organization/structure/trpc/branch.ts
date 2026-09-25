import { initTRPC } from '@trpc/server';
import { escapeRegExp } from 'erxes-api-shared/utils';
import { PipelineStage } from 'mongoose';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';
import { agentMeta } from '~/utils/agentMeta';

const t = initTRPC.context<CoreTRPCContext>().create();

const mongoQuerySchema = z.record(z.unknown());

export const branchTrpcRouter = t.router({
  branches: t.router({
    find: t.procedure
      .meta(
        agentMeta(
          'List branches (physical/logical locations): { query?, fields? }. Branch IDs are needed for inventory operations (products.setInventories / products.increaseInventories) and team member assignment. Use to resolve a branch name/code to its _id.',
          { module: 'organization', action: 'organizationRead' },
        ),
      )
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
      .meta(
        agentMeta(
          'Get a single branch by { _id }, { code }, or any MongoDB-style query. Returns {} when nothing matches.',
          { module: 'organization', action: 'organizationRead' },
        ),
      )
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
      .meta(
        agentMeta(
          'Get branches matching { query?, fields? } plus all their descendant branches (branches nest via parentId/order).',
          { module: 'organization', action: 'organizationRead' },
        ),
      )
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
