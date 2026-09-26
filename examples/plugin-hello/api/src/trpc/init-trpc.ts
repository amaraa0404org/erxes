import { initTRPC } from '@trpc/server';

import { ITRPCContext } from 'erxes-api-shared/utils';

export type HelloTRPCContext = ITRPCContext;

const t = initTRPC.context<HelloTRPCContext>().create();

export const appRouter = t.router({
  hello: {
    ping: t.procedure.query(() => {
      return { pong: true };
    }),
  },
});

export type AppRouter = typeof appRouter;
