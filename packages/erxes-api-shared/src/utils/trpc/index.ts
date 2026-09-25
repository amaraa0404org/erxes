import { createScopedEventHandlers } from '../../core-modules/common/eventHandlers/generateEventHandlers';
import {
  createTRPCUntypedClient,
  httpBatchLink,
  TRPCRequestOptions,
  TRPCUntypedClient,
} from '@trpc/client';
import type { AnyTRPCRouter } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { IncomingHttpHeaders } from 'http';
import { getPlugin, isEnabled } from '../service-discovery';
import { generateRequestProcess, getEnv } from '../utils';
import { setEventHandlerRuntimeContext } from '../../core-modules/common/eventHandlers/runtimeContext';

export type MessageProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any — dynamic
  // cross-service boundary: the untyped tRPC client erases output types, so
  // `any` keeps existing callers compiling; `sendTRPCMessage<T>` remains
  // available for caller-declared outputs.
  TOutput = any,
> = {
  subdomain: string;
  method?: 'query' | 'mutation';
  pluginName: string;
  module: string;
  action: string;
  input?: unknown;
  // `NoInfer` keeps `defaultValue: []`/`null` from narrowing TOutput to
  // `never[]`/`null` when the caller did not declare an output type.
  defaultValue?: NoInfer<TOutput>;
  options?: TRPCRequestOptions;
  context?: CommonTRPCContext;
  throwOnError?: boolean;
};

export type CommonTRPCContext = {
  processId?: string;
  userId?: string;
  cpUserId?: string;
};

export type ScopedEventHandlers = ReturnType<typeof createScopedEventHandlers>;

type RequestTRPCContext = {
  subdomain: string;
  processId: string;
} & CommonTRPCContext;

export type TRPCContext = RequestTRPCContext & {
  eventHandlers: ScopedEventHandlers;
  /**
   * Service-specific model map, attached by each service's context factory
   * (e.g. core-api assigns `IModels` here). Opaque at this layer.
   */
  models?: unknown;
};

export interface InterMessage {
  subdomain: string;
  data?: unknown;
  timeout?: number;
  defaultValue?: unknown;
  thirdService?: boolean;
}

export interface RPSuccess {
  status: 'success';
  data?: unknown;
}
export interface RPError {
  status: 'error';
  errorMessage: string;
}
export type RPResult = RPSuccess | RPError;
export type RP = (params: InterMessage) => RPResult | Promise<RPResult>;

export const trpcContextHeaderName = 'x-trpc-context';

export function encodeTRPCContextHeader(
  subdomain: string,
  method: 'query' | 'mutation',
  context: CommonTRPCContext | undefined,
): string {
  const contextData = {
    subdomain,
    method,
    ...context,
  };
  const contextJson = JSON.stringify(contextData);
  return Buffer.from(contextJson, 'utf8').toString('base64');
}

/**
 * Decode the base64 JSON tRPC context header into tenant, method, and caller
 * context. Returns null when the header is absent or malformed. Note: the
 * header is an encoding, not an authentication credential.
 */
export function decodeTRPCContextHeader(headers: IncomingHttpHeaders): {
  subdomain: string;
  method: 'query' | 'mutation';
  context: CommonTRPCContext;
} | null {
  const contextHeader = headers[trpcContextHeaderName];
  if (!contextHeader) {
    return null;
  }
  if (Array.isArray(contextHeader)) {
    throw new Error(`Multiple ${trpcContextHeaderName} headers`);
  }
  try {
    const contextJson = Buffer.from(contextHeader, 'base64').toString('utf-8');
    const decoded = JSON.parse(contextJson) as {
      subdomain: string;
      method: 'query' | 'mutation';
    } & CommonTRPCContext;
    const { subdomain, method, ...context } = decoded;
    return { subdomain, method, context };
  } catch (error) {
    return null;
  }
}

export const sendTRPCMessage = async <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any — see
  // MessageProps: dynamic boundary, `T` available for caller-declared output.
  TOutput = any,
>({
  subdomain,
  pluginName,
  method,
  module,
  action,
  input,
  defaultValue,
  options,
  context,
  throwOnError,
}: MessageProps<TOutput>): Promise<TOutput> => {
  if (!method) {
    method = 'query';
  }

  if (pluginName && !(await isEnabled(pluginName))) {
    return defaultValue as TOutput;
  }

  const pluginInfo = await getPlugin(pluginName);

  const VERSION = getEnv({ name: 'VERSION' });

  let client: TRPCUntypedClient<AnyTRPCRouter>;

  try {
    // Encode context into header
    const contextHeader = encodeTRPCContextHeader(subdomain, method, context);

    if (VERSION && VERSION === 'saas') {
      client = createTRPCUntypedClient({
        links: [
          httpBatchLink({
            url: `https://${subdomain}.next.erxes.io/gateway/pl:${pluginName}/trpc`,
            headers: () => ({
              [trpcContextHeaderName]: contextHeader,
            }),
          }),
        ],
      });
    } else {
      // Validate plugin address before constructing URL
      if (!pluginInfo.address || pluginInfo.address.trim() === '') {
        if (throwOnError) {
          throw new Error(`Plugin "${pluginName}" has no address`);
        }

        console.warn(
          `Plugin "${pluginName}" address is not available. Returning defaultValue.`,
        );
        return defaultValue as TOutput;
      }

      client = createTRPCUntypedClient({
        links: [
          httpBatchLink({
            url: `${pluginInfo.address}/trpc`,
            headers: () => ({
              [trpcContextHeaderName]: contextHeader,
            }),
          }),
        ],
      });
    }

    const result = await client[method](`${module}.${action}`, input, options);
    return (result || defaultValue) as TOutput;
  } catch (e) {
    if (throwOnError) {
      throw e;
    }

    return defaultValue as TOutput;
  }
};

/**
 * Shared plugin-context initialization for in-process tRPC execution:
 * request process state, event-handler runtime context, and scoped event
 * handlers. Used by the /trpc express adapter and by the agent-tools
 * endpoints so both paths build identical contexts.
 */
export const createPluginTRPCContext = async <TContext>(
  subdomain: string,
  reqContext: CommonTRPCContext,
  trpcContext?: (subdomain: string, context: TRPCContext) => Promise<TContext>,
): Promise<TContext | TRPCContext> => {
  const processInfo = generateRequestProcess();

  const context: RequestTRPCContext = {
    ...processInfo,
    ...reqContext,
    subdomain,
  };

  const runtimeContext = {
    subdomain,
    processId: context.processId || '',
    userId: context.userId || '',
  };

  setEventHandlerRuntimeContext(subdomain, runtimeContext);

  const eventHandlers = createScopedEventHandlers(subdomain, runtimeContext);

  if (trpcContext) {
    return await trpcContext(subdomain, {
      ...context,
      eventHandlers,
    });
  }

  return {
    ...context,
    eventHandlers,
  };
};

export const createTRPCContext =
  <TContext = TRPCContext>(
    trpcContext: (
      subdomain: string,
      context: TRPCContext,
    ) => Promise<TContext>,
  ) =>
  async ({
    req,
  }: trpcExpress.CreateExpressContextOptions): Promise<TContext> => {
    // Extract context from header (encoded) or fallback to request body/input
    const decoded = decodeTRPCContextHeader(req.headers);
    const subdomain = decoded?.subdomain;
    const reqContext = decoded?.context;
    const method = decoded?.method || 'query';

    if (!subdomain || (method === 'mutation' && !reqContext)) {
      throw new Error('Invalid context');
    }

    return (await createPluginTRPCContext(
      subdomain,
      reqContext || {},
      trpcContext,
    )) as TContext;
  };

export type ITRPCContext<TExtraContext extends object = object> =
  TExtraContext & TRPCContext;

export const ok = (data: unknown) => {
  return {
    status: 'success',
    data,
    timestamp: new Date().toISOString(),
  };
};

export const err = (error: unknown) => {
  const e =
    error !== null && typeof error === 'object'
      ? (error as { code?: string; message?: string; suggestion?: string })
      : {};

  return {
    status: 'error',
    error: {
      code: e.code || 'SERVER_ERROR',
      message: e.message || e.message,
      details: error instanceof Error ? error.message : 'Database error',
      ...(process.env.NODE_ENV === 'development' && {
        stack: error instanceof Error ? error.stack : undefined,
      }),
      ...(e.suggestion && { suggestion: e.suggestion }),
    },
    timestamp: new Date().toISOString(),
  };
};
