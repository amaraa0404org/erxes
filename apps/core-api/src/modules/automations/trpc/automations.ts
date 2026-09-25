import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';

const t = initTRPC.context<CoreTRPCContext>().create();

const mongoQuerySchema = z.record(z.unknown());

export const automationsRouter = t.router({
  automation: t.router({
    find: t.procedure
      .input(z.object({ query: mongoQuerySchema }))
      .query(async ({ input, ctx }) => {
        const { query } = input;
        const { models } = ctx;
        return await models.Automations.find({
          'triggers.type': query.triggerType,
          'triggers.config.botId': query.botId,
          status: 'active',
          ownedBy: { $exists: false },
        }).lean();
      }),

    count: t.procedure
      .input(z.object({ query: mongoQuerySchema }))
      .query(async ({ input, ctx }) => {
        const { query } = input;
        const { models } = ctx;
        return await models.Automations.countDocuments(query);
      }),
  }),
  executions: t.router({
    find: t.procedure
      .input(z.object({ query: mongoQuerySchema.optional() }))
      .query(async ({ input, ctx }) => {
        const { ...query } = input;
        const { models } = ctx;
        return await models.AutomationExecutions.find(query);
      }),
  }),
});
