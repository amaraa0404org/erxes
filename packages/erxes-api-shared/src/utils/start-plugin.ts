import './sentry-instrument';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildSubgraphSchema } from '@apollo/subgraph';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { AnyTRPCRouter } from '@trpc/server';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, {
  Request as ApiRequest,
  Response as ApiResponse,
  Application,
  Router,
} from 'express';
import { DocumentNode, GraphQLScalarType } from 'graphql';
import * as fs from 'fs';
import * as http from 'http';
import { IncomingMessage } from 'http';
import * as path from 'path';
import rateLimit from 'express-rate-limit';
import { startPayments } from '../common-modules/payment/worker';
import type {
  IPropertyMeta,
  LogsConfigs,
  SegmentConfigs,
  TApprovalConfig,
  TRecordReferencesConfig,
} from '../core-modules';
import {
  initApproval,
  initRecordReferences,
  initSegmentProducers,
  startAutomations,
} from '../core-modules';
import { AutomationConfigs } from '../core-modules/automations/types';
import type { ImportExportConfigs } from '../core-modules/import-export/types';
import { startImportExportWorker } from '../core-modules/import-export/worker';
import {
  AnyResolver,
  IMainContext,
  IPermissionConfig,
} from '../core-types';
import {
  generateApolloContext,
  startBeforeResolvers,
  wrapApolloResolvers,
  expectedErrorPlugin,
} from './apollo';
import type { AgentTrpcRouter } from './agent-tools/types';
import { BeforeResolversConfig } from './apollo/beforeResolvers';
import { extractUserFromHeader } from './headers';
import { AfterProcessConfigs, logHandler, startAfterProcess } from './logs';
import { closeMongooose } from './mongo';
import {
  initializePluginConfig,
  joinErxesGateway,
  leaveErxesGateway,
} from './service-discovery';
import { createTRPCContext, TRPCContext } from './trpc';
import { mountAgentTools } from './agent-tools';
import { applyTrustProxy, getSubdomain } from './utils';
import * as Sentry from '@sentry/node';

export const MAX_HEADER_BYTES = 64 * 1024;

dotenv.config();

enum API_METHODS {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

type TAPIMethod = keyof typeof API_METHODS;

// Same validation as the gateway's locale route (apps/gateway/src/util/
// locales.ts): duplicated here on purpose so plugins do not import gateway
// code.
const LNG_PATTERN = /^[a-zA-Z]{2,5}(?:[-_][a-zA-Z0-9]{2,8})?$/;
const FILE_PATTERN = /^[a-zA-Z0-9._-]+\.json$/;

const isValidLocaleParams = (lng: string, file: string): boolean =>
  LNG_PATTERN.test(lng) && FILE_PATTERN.test(file);

type IMeta = {
  automations?: AutomationConfigs;
  segments?: SegmentConfigs;
  logs?: LogsConfigs;
  afterProcess?: AfterProcessConfigs;
  payments?: Record<
    string,
    (context: { subdomain: string }, data: unknown) => unknown
  >;
  notifications?: Record<string, unknown>;
  tags?: {
    types?: Array<{
      type: string;
      description?: string;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  };
  documents?: {
    types: {
      label: string;
      contentType: string;
    }[];
  };
  properties?: IPropertyMeta;
  references?: TRecordReferencesConfig;
  approval?: TApprovalConfig;
  permissions?: IPermissionConfig;
  beforeResolvers?: BeforeResolversConfig;
  importExport?: ImportExportConfigs;
  relations?: {
    subscribedTypes: string[];
  };
};

type ApiHandler = {
  method: TAPIMethod;
  path: string;
  resolver: (req: ApiRequest, res: ApiResponse) => Promise<void> | void;
};
type ResolverObject = Record<string, AnyResolver>;

type GraphqlResolver = {
  [key: string]: ResolverObject | GraphQLScalarType | AnyResolver;
};

type ConfigTypes = {
  name: string;
  port: number;
  graphql: () => Promise<{
    resolvers: GraphqlResolver;
    typeDefs: DocumentNode;
  }>;
  expressRouter?: Router;
  apolloServerContext: (
    subdomain: string,
    context: IMainContext,
    req: ApiRequest,
    res: ApiResponse,
  ) => Promise<IMainContext>;
  onServerInit?: (app: express.Express) => Promise<void>;
  middlewares?: express.RequestHandler[];
  apiHandlers?: ApiHandler[];
  hasSubscriptions?: boolean;
  corsOptions?: cors.CorsOptions;
  subscriptionPluginPath?: string;
  trpcAppRouter?: {
    /**
     * Structural (rather than `AnyTRPCRouter`) so plugins bundling their own
     * `@trpc/server` instance still typecheck — nominal internals differ
     * across duplicated installs.
     */
    router: AgentTrpcRouter;
    createContext: (
      subdomain: string,
      context: TRPCContext,
    ) => Promise<TRPCContext>;
  };
  /**
   * tRPC procedure paths to exclude from the agent capability manifest.
   * Agent-tools endpoints are mounted automatically on every plugin that
   * supplies a `trpcAppRouter`. Only procedures declaring
   * `.meta({ agent: { permission } })` appear in the manifest; this list
   * removes specific annotated procedures when needed.
   */
  agentToolsExclude?: string[];
  /**
   * Module Federation remote entry URL for the plugin's UI bundle. Stored in
   * the plugin manifest so the core can serve it to the frontend. Defaults
   * to `process.env.UI_REMOTE_ENTRY`.
   */
  uiRemoteEntry?: string;
  /**
   * Directory containing `${lng}/${file}` translation bundles. When set, the
   * plugin serves `GET /locales/:lng/:file` so the gateway's locale fan-out
   * can reach it.
   */
  localesDir?: string;
  meta?: IMeta;
};

export async function startPlugin(
  configs: ConfigTypes,
): Promise<express.Express> {
  const {
    //common
    name,
    port,
    // api configs
    corsOptions = {},
    expressRouter,
    middlewares,
    apiHandlers,
    // graphql
    hasSubscriptions,
    subscriptionPluginPath,
    graphql,
    apolloServerContext,
    trpcAppRouter,
    onServerInit,
    // agent capability endpoint exclusions
    agentToolsExclude,
    // runtime registration metadata
    uiRemoteEntry = process.env.UI_REMOTE_ENTRY,
    localesDir,
    // meta
    meta,
  } = configs || {};
  const PORT = process.env.PORT ? Number(process.env.PORT) : port;

  Sentry.getGlobalScope().setTags({
    plugin: name,
    service: name,
  });

  const app = express();
  applyTrustProxy(app);
  app.disable('x-powered-by');
  app.use(cors(corsOptions));
  app.use(
    express.json({
      limit: '15mb',
      verify: (
        req: IncomingMessage & { rawBody?: Buffer },
        _res,
        buf: Buffer,
      ) => {
        req.rawBody = buf;
      },
    }),
  );
  app.use(cookieParser());

  // for health check
  app.get('/health', async (_req, res) => {
    res.end('ok');
  });

  app.get('/debug-sentry', () => {
    throw new Error('Sentry test error: ' + new Date().toISOString());
  });

  if (localesDir) {
    const localesRoot = path.resolve(localesDir);

    app.get('/locales/:lng/:file', (req, res) => {
      const { lng, file } = req.params;

      if (!isValidLocaleParams(lng, file)) {
        return res.status(400).send('Invalid locale');
      }

      try {
        const requestedPath = path.resolve(localesRoot, lng, file);
        const realPath = fs.realpathSync(requestedPath);

        if (!realPath.startsWith(localesRoot + path.sep)) {
          return res.status(404).send('Locale not found');
        }

        res.set('Cache-Control', 'no-cache');
        return res.json(JSON.parse(fs.readFileSync(realPath).toString()));
      } catch {
        return res.status(404).send('Locale not found');
      }
    });
  }

  if (expressRouter) {
    app.use(expressRouter);
  }

  if (middlewares) {
    for (const middleware of middlewares) {
      app.use(middleware);
    }
  }

  if (apiHandlers) {
    for (const handler of apiHandlers) {
      const { method, path, resolver } = handler;

      type LowercaseMethod = (typeof API_METHODS)[TAPIMethod];

      // Ensure `method` is one of the keys
      const METHOD = API_METHODS[method] as LowercaseMethod;
      type TApiMethodApp = Record<
        LowercaseMethod,
        Application[LowercaseMethod]
      >;

      (app as TApiMethodApp)[METHOD](
        path,
        async (req: ApiRequest, res: ApiResponse) => {
          return await logHandler(async () => await resolver(req, res), {
            subdomain: getSubdomain(req),
            source: 'webhook',
            action: method,
            payload: {
              path,
              headers: req.headers,
              body: req.body,
              query: req?.query,
            },
            userId: extractUserFromHeader(req.headers)?._id,
          });
        },
      );
    }
  }

  if (hasSubscriptions) {
    if (!subscriptionPluginPath) {
      throw new Error(
        'subscriptionPluginPath is required when hasSubscriptions is true',
      );
    }

    /**
     * Protects the public subscription bundle endpoint from request floods.
     *
     * The limit is intentionally generous so regular page loads, retries, and
     * normal multi-user traffic are not blocked. It only throttles abnormal
     * high-frequency bursts from the same IP.
     */
    const subscriptionFileLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 1000,
      standardHeaders: true,
      legacyHeaders: false,
      message: 'Too many requests from this IP, please try again later.',
    });

    app.get('/subscriptionPlugin.js', subscriptionFileLimiter, (_req, res) => {
      res.sendFile(path.resolve(subscriptionPluginPath));
    });
  }

  if (trpcAppRouter) {
    const { router, createContext } = trpcAppRouter;
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        // The plugin-supplied router is structurally typed (AgentTrpcRouter)
        // to tolerate a plugin-bundled @trpc/server instance; the express
        // adapter needs the nominal AnyTRPCRouter, so cast here.
        router: router as AnyTRPCRouter,
        createContext: createTRPCContext(createContext),
      }),
    );
  }

  // Agent capability endpoints are mounted automatically on every plugin with
  // a tRPC router. The manifest is admit-only: only procedures declaring
  // `.meta({ agent: { permission } })` are exposed, so an empty router
  // produces an empty manifest and zero callable tools.
  if (trpcAppRouter) {
    mountAgentTools(app, {
      plugin: name,
      trpcRouter: trpcAppRouter.router,
      createContext: trpcAppRouter.createContext,
      exclude: agentToolsExclude || [],
    });
  }

  app.use(
    (req: ApiRequest & { rawBody?: Buffer | string }, _res, next) => {
      if (req.rawBody === undefined) {
        req.rawBody = '';

        req.on('data', (chunk: Buffer | string) => {
          req.rawBody = `${req.rawBody}` + chunk.toString();
        });
      }

      next();
    },
  );

  const httpServer = http.createServer(
    { maxHeaderSize: MAX_HEADER_BYTES },
    app,
  );
  httpServer.keepAliveTimeout = 120000;
  httpServer.headersTimeout = 121000;

  // GRACEFULL SHUTDOWN
  process.stdin.resume(); // so the program will not close instantly

  async function closeHttpServer() {
    try {
      await new Promise<void>((resolve, reject) => {
        // Stops the server from accepting new connections and finishes existing connections.
        httpServer.close((error: Error | undefined) => {
          if (error) {
            return reject(error);
          }
          resolve();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function leaveServiceDiscovery() {
    try {
      await leaveErxesGateway(name, PORT);
      console.log(`Left service discovery. name=${name} port=${PORT}`);
    } catch (e) {
      console.error(e);
    }
  }

  // If the Node process ends, close the Mongoose connection
  (['SIGINT', 'SIGTERM'] as NodeJS.Signals[]).forEach((sig) => {
    process.on(sig, async () => {
      await closeHttpServer();
      await closeMongooose();
      await leaveServiceDiscovery();
      process.exit(0);
    });
  });

  const generateApolloServer = async () => {
    // const services = await getServices();
    // debugInfo(`Enabled services .... ${JSON.stringify(services)}`);

    const { typeDefs, resolvers } = await graphql();

    return new ApolloServer({
      schema: buildSubgraphSchema([
        {
          typeDefs,
          resolvers: wrapApolloResolvers(resolvers),
        },
      ]),

      // for graceful shutdown
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        expectedErrorPlugin,
      ],
    });
  };

  const apolloServer = await generateApolloServer();
  await apolloServer.start();

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: generateApolloContext<IMainContext>(apolloServerContext),
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve),
  );

  console.log(
    `🚀 ${name} graphql api ready at http://localhost:${PORT}/graphql`,
  );

  await joinErxesGateway({
    name,
    port: PORT,
    hasSubscriptions,
    meta,
    uiRemoteEntry,
  });

  if (meta) {
    const {
      automations,
      segments,
      afterProcess,
      notifications,
      payments,
      beforeResolvers,
      references,
      importExport,
      approval,
    } = meta || {};

    if (beforeResolvers) {
      await startBeforeResolvers(app, name, beforeResolvers);
    }

    if (afterProcess) {
      await startAfterProcess(app, name, afterProcess);
    }

    if (references) {
      await initRecordReferences(app, name, references);
    }

    if (approval) {
      await initApproval(app, name, approval);
    }

    if (automations) {
      await startAutomations(app, name, automations);
    }

    if (segments) {
      await initSegmentProducers(app, name, segments);
    }

    if (notifications) {
      await initializePluginConfig(name, 'notifications', notifications);
    }

    if (importExport) {
      startImportExportWorker({
        pluginName: name,
        config: importExport,
        app,
      });
    }

    if (payments) {
      await startPayments(name, payments);
    }
  } // end meta if

  if (onServerInit) {
    onServerInit(app);
  }

  //   applyInspectorEndpoints(name);

  //   debugInfo(`${name} server is running on port: ${PORT}`);

  Sentry.setupExpressErrorHandler(app);

  return app;
}

export default startPlugin;
