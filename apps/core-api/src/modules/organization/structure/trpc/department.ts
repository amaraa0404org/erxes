import { initTRPC } from '@trpc/server';
import { escapeRegExp } from 'erxes-api-shared/utils';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';
import { agentMeta } from '~/utils/agentMeta';

const t = initTRPC.context<CoreTRPCContext>().create();

const mongoQuerySchema = z.record(z.unknown());

export const departmentTrpcRouter = t.router({
  departments: t.router({
    find: t.procedure
      .meta(
        agentMeta(
          'List departments: { query?, fields? }. Department IDs are needed for inventory operations (products.setInventories / products.increaseInventories) and team member assignment. Use to resolve a department name/code to its _id.',
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

      return await models.Departments.find(query || {}, fields).lean();
    }),

    findOne: t.procedure
      .meta(
        agentMeta(
          'Get a single department by { _id }, { code }, or any MongoDB-style query. Returns {} when nothing matches.',
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

      return await models.Departments.findOne(query).lean();
    }),

    findWithChild: t.procedure
      .meta(
        agentMeta(
          'Get departments matching { query?, fields? } plus all their descendant departments (departments nest via parentId/order).',
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

      const departments = await models.Departments.find(query || {});

      if (!departments.length) {
        return [];
      }

      const orderQry: Record<string, unknown>[] = [];

      for (const tag of departments) {
        orderQry.push({
          order: { $regex: new RegExp(`^${escapeRegExp(tag.order || '')}`) },
        });
      }

      return await models.Departments.find(
        {
          $or: orderQry,
        },
        fields,
      )
        .sort({ order: 1 })
        .lean();
    }),
  }),
});
