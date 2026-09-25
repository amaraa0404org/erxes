import {
  Application,
  Request as ApiRequest,
  Response as ApiResponse,
} from 'express';
import { graphql, GraphQLSchema } from 'graphql';
import { IncomingHttpHeaders } from 'http';
import { IUserDocument } from '../../core-types';
import { checkPermissionGroup } from '../../core-modules/permissions/utils';
import { err, ok, sendTRPCMessage } from '../trpc';
import { setUserHeader } from '../headers';
import { decodeAgentToolsAuthHeader } from './auth';
import { buildAgentToolManifest } from './manifest';
import { buildAgentToolOperation } from './operation';
import {
  agentToolResponseTooLargeError,
  getAgentToolMaxResponseBytes,
  oversizedAgentToolResultBytes,
} from './responseLimit';
import {
  AgentGraphqlToolDescriptor,
  AgentToolDeclaration,
  AgentToolManifest,
  AgentToolsTypeDefs,
} from './types';

export interface AgentToolsOptions {
  plugin: string;
  /**
   * The plugin's executable schema — the same `buildSubgraphSchema` result
   * Apollo serves, so calls run through the wrapped resolver pipeline
   * (checkLogin, permission wrappers, logHandler). A thunk lets a service
   * mount the endpoints before the schema exists; the result is resolved
   * once and cached.
   */
  schema: GraphQLSchema | (() => Promise<GraphQLSchema>);
  /**
   * The SDL the schema was built from; the manifest is derived from it.
   * Accepts the same shapes `startPlugin` receives for `graphql.typeDefs`,
   * or a thunk.
   */
  typeDefs: AgentToolsTypeDefs | (() => Promise<AgentToolsTypeDefs>);
  /**
   * The same context factory handed to Apollo's `expressMiddleware`
   * (`generateApolloContext(apolloServerContext)`), so `subdomain`, `user`,
   * `models`, `checkPermission` and request-derived fields match a real
   * request. Called with a synthetic request carrying the `hostname`/`user`
   * headers the gateway would forward.
   */
  contextFactory: (args: {
    req: ApiRequest;
    res: ApiResponse;
  }) => Promise<unknown>;
  /** Declared GraphQL operations exposed as agent tools. */
  agentTools?: AgentToolDeclaration[];
}

const MANIFEST_TTL_MS = 60_000;

const manifestCache = new Map<
  string,
  { manifest: AgentToolManifest; at: number }
>();

/** Cache key scoped to the tenant and the plugin. */
const manifestCacheKey = (subdomain: string, options: AgentToolsOptions) =>
  JSON.stringify([options.plugin, subdomain]);

/** Lazily resolve a value-or-thunk option once, then reuse the result. */
const memoize = <T>(source: T | (() => Promise<T>)): (() => Promise<T>) => {
  let promise: Promise<T> | undefined;

  return () => {
    if (!promise) {
      promise = Promise.resolve(
        typeof source === 'function'
          ? (source as () => Promise<T>)()
          : source,
      );
    }

    return promise;
  };
};

const getManifest = async (
  subdomain: string,
  options: AgentToolsOptions,
  resolveTypeDefs: () => Promise<AgentToolsTypeDefs>,
): Promise<AgentToolManifest> => {
  const cacheKey = manifestCacheKey(subdomain, options);
  const cached = manifestCache.get(cacheKey);

  if (cached && Date.now() - cached.at < MANIFEST_TTL_MS) {
    return cached.manifest;
  }

  const manifest = buildAgentToolManifest({
    plugin: options.plugin,
    typeDefs: await resolveTypeDefs(),
    agentTools: options.agentTools || [],
  });

  manifestCache.set(cacheKey, { manifest, at: Date.now() });

  return manifest;
};

/**
 * Execute a GraphQL tool in-process against the plugin's own executable
 * schema. The context is built by the same factory the Apollo mount uses,
 * fed with a synthetic request carrying the headers the gateway would
 * forward — so the full resolver pipeline (checkLogin, permission
 * wrappers, logHandler activity logs) applies unchanged.
 */
const executeGraphqlTool = async (
  options: AgentToolsOptions,
  resolveSchema: () => Promise<GraphQLSchema>,
  subdomain: string,
  user: IUserDocument,
  descriptor: AgentGraphqlToolDescriptor,
  input: Record<string, unknown> | undefined,
  res: ApiResponse,
): Promise<unknown> => {
  const schema = await resolveSchema();
  const { source, variableValues, operationName, processId } =
    buildAgentToolOperation(descriptor, input);

  // Mirror the gateway-forwarded request shape: `hostname` carries the
  // tenant (getSubdomain), `user`/`userid` carry the acting user document.
  const headers: IncomingHttpHeaders = { hostname: subdomain };
  setUserHeader(headers, user);

  if (processId) {
    headers['x-erxes-process-id'] = processId;
  }

  const syntheticReq = {
    headers,
    body: { operationName },
    secure: false,
    cookies: {},
  } as unknown as ApiRequest;

  const contextValue = await options.contextFactory({
    req: syntheticReq,
    res,
  });

  const result = await graphql({
    schema,
    source,
    variableValues,
    contextValue,
    operationName,
  });

  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  return (result.data as Record<string, unknown> | null)?.[
    descriptor.operation
  ];
};

/**
 * Mount the agent capability endpoints on a service. Both endpoints require
 * the HMAC-signed agent auth header; identity is derived from the signed
 * payload, never from caller-controlled plain headers.
 */
export const mountAgentTools = (
  app: Application,
  options: AgentToolsOptions,
): void => {
  const resolveSchema = memoize(options.schema);
  const resolveTypeDefs = memoize(options.typeDefs);

  app.get(
    '/agent-tools/manifest',
    async (req: ApiRequest, res: ApiResponse) => {
      const auth = decodeAgentToolsAuthHeader(req.headers);

      if (!auth?.subdomain) {
        return res
          .status(401)
          .json(err(new Error('Missing or invalid agent auth header')));
      }

      try {
        const manifest = await getManifest(
          auth.subdomain,
          options,
          resolveTypeDefs,
        );

        return res.json(ok(manifest));
      } catch (error) {
        console.error('[agent-tools] manifest error:', error);

        return res
          .status(500)
          .json(err(new Error('Failed to build agent tool manifest')));
      }
    },
  );

  app.post('/agent-tools/call', async (req: ApiRequest, res: ApiResponse) => {
    const auth = decodeAgentToolsAuthHeader(req.headers);
    const subdomain = auth?.subdomain;
    const userId = auth?.userId;

    if (!subdomain || !userId) {
      return res
        .status(401)
        .json(err(new Error('Missing or invalid agent auth header')));
    }

    const { toolId, input } = (req.body || {}) as {
      toolId?: string;
      input?: Record<string, unknown>;
    };

    if (!toolId || typeof toolId !== 'string') {
      return res
        .status(400)
        .json(err(new Error('Missing toolId in request body')));
    }

    if (
      input !== undefined &&
      (typeof input !== 'object' || input === null || Array.isArray(input))
    ) {
      return res
        .status(400)
        .json(err(new Error('input must be an object when provided')));
    }

    try {
      const manifest = await getManifest(subdomain, options, resolveTypeDefs);
      const descriptor = manifest.tools.find((tool) => tool.id === toolId);

      if (!descriptor) {
        return res
          .status(404)
          .json(err(new Error(`Unknown agent tool '${toolId}'`)));
      }

      // Fail closed: a tool without a declared permission is never callable.
      if (!descriptor.permission) {
        return res
          .status(403)
          .json(
            err(
              new Error(
                `Agent tool '${toolId}' declares no permission and is not callable`,
              ),
            ),
          );
      }

      const user = await sendTRPCMessage<IUserDocument | null>({
        subdomain,
        pluginName: 'core',
        module: 'users',
        action: 'findOne',
        method: 'query',
        input: { query: { _id: userId } },
        defaultValue: null,
      });

      if (!user) {
        return res
          .status(403)
          .json(err(new Error('Forbidden: user not found')));
      }

      try {
        await checkPermissionGroup(
          subdomain,
          user,
        )(descriptor.permission.action);
      } catch (permissionError) {
        return res.status(403).json(err(permissionError));
      }

      const result = await executeGraphqlTool(
        options,
        resolveSchema,
        subdomain,
        user,
        descriptor,
        input,
        res,
      );

      // Oversized payloads stall the agent run and freeze the chat UI; reject
      // them with guidance so the model retries with a narrower call.
      const maxResponseBytes = getAgentToolMaxResponseBytes();
      const resultBytes = oversizedAgentToolResultBytes(
        result,
        maxResponseBytes,
      );

      if (resultBytes !== null) {
        return res
          .status(413)
          .json(
            err(
              agentToolResponseTooLargeError(
                toolId,
                resultBytes,
                maxResponseBytes,
              ),
            ),
          );
      }

      return res.json(ok(result));
    } catch (error) {
      console.error('[agent-tools] call error:', error);

      return res
        .status(500)
        .json(
          err(
            error instanceof Error
              ? error
              : new Error('Agent tool execution failed'),
          ),
        );
    }
  });
};
