import { Application } from 'express';
import type { AnyTRPCRouter } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import helmet from 'helmet';
import { createTRPCContext, TRPCContext } from '../../utils';

export interface TRPCSetupOptions {
  router: AnyTRPCRouter;
  createContext: (
    subdomain: string,
    context: TRPCContext,
  ) => Promise<TRPCContext>;
  helmetConfig?: Parameters<typeof helmet>[0];
}

export function setupTRPCRoute(app: Application, options: TRPCSetupOptions) {
  const {
    router,
    createContext,
    helmetConfig = {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false,
    },
  } = options;

  const trpcHelmet = helmet(helmetConfig);

  app.use(
    '/trpc',
    trpcHelmet,
    trpcExpress.createExpressMiddleware({
      router,
      createContext: createTRPCContext(createContext),
    }),
  );
}
