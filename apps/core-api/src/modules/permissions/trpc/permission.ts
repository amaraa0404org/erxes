import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';

const t = initTRPC.context<CoreTRPCContext>().create();

export const permissionTrpcRouter = t.router({
  permissionGroups: t.router({
    find: t.procedure
      .input(z.object({ query: z.record(z.unknown()).optional() }))
      .query(async ({ ctx, input }) => {
      const { query } = input;
      const { models } = ctx;

      return await models.PermissionGroups.find(query || {});
    }),
  }),
});
