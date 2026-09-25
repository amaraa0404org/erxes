import { useServer } from 'graphql-ws/lib/use/ws';
import {
  DocumentNode,
  execute,
  ExecutionArgs,
  getOperationAST,
  GraphQLError,
  GraphQLSchema,
  parse,
  subscribe,
  validate,
} from 'graphql';
import * as ws from 'ws';
import SubscriptionResolver from './SubscriptionResolver';
import { Disposable, SubscribeMessage } from 'graphql-ws';
import genTypeDefsAndResolvers from './genTypeDefsAndResolvers';
import * as http from 'http';
import { supergraphPath } from '../apollo-router/paths';
import * as fs from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { apolloRouterPort } from '../apollo-router';
import { gql } from '@apollo/client/core';
import { getSubdomain } from '../util/subdomain';
import * as jwt from 'jsonwebtoken';

let disposable: Disposable | undefined;
let currentSchema: GraphQLSchema | undefined;

function readCookie(rawCookie: string | undefined, name: string) {
  if (!rawCookie) {
    return undefined;
  }
  for (const part of rawCookie.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) {
      continue;
    }
    if (part.slice(0, eq).trim() === name) {
      return decodeURIComponent(part.slice(eq + 1).trim());
    }
  }
  return undefined;
}

function extractSubscriptionUser(request: any) {
  try {
    const token = readCookie(request?.headers?.cookie, 'auth-token');
    if (!token) {
      return undefined;
    }
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET || 'SECRET',
    );
    const user = decoded?.user;
    if (!user?._id) {
      return undefined;
    }
    return user;
  } catch (e) {
    return undefined;
  }
}

export async function stopSubscriptionServer() {
  if (disposable) {
    try {
      await disposable.dispose();
    } catch (e) {
      console.error(e);
    }
  }
}

export function makeSubscriptionSchema({ typeDefs, resolvers }: any) {
  if (!typeDefs || !resolvers) {
    throw new Error(
      'Both `typeDefs` and `resolvers` are required to make the executable subscriptions schema.',
    );
  }
  const supergraph = fs.readFileSync(supergraphPath).toString();

  const supergraphTypeDefs = gql(supergraph);

  return makeExecutableSchema({
    typeDefs: [
      ...((supergraphTypeDefs && [supergraphTypeDefs]) as DocumentNode[]),
      typeDefs,
    ],
    resolvers,
  });
}

// Rebuilds the executable subscription schema from the currently alive
// plugins (fresh subscriptionPlugin.js downloads; departed plugins drop out).
// Called once at boot and on every debounced plugin join/leave. On failure the
// previous schema keeps serving — a bad plugin must not break existing
// subscribers.
export async function rebuildSubscriptionSchema(): Promise<void> {
  try {
    const typeDefsResolvers = await genTypeDefsAndResolvers();

    if (!typeDefsResolvers) {
      currentSchema = undefined;
      console.log('No subscription plugins available; schema cleared');
      return;
    }

    currentSchema = makeSubscriptionSchema(typeDefsResolvers);
    console.log('Subscription schema rebuilt');
  } catch (e) {
    console.error(
      'Failed to rebuild the subscription schema; keeping the previous one',
      e,
    );
  }
}

export async function startSubscriptionServer(httpServer: http.Server) {
  const wsServer = new ws.Server({
    server: httpServer,
    path: '/graphql',
  });

  await rebuildSubscriptionSchema();

  await stopSubscriptionServer();

  disposable = useServer(
    {
      execute,
      subscribe,
      context: (ctx, _msg: SubscribeMessage, _args: ExecutionArgs) => {
        const gatewayDataSource = new SubscriptionResolver(
          `http://127.0.0.1:${apolloRouterPort}`,
          ctx,
        );
        const subdomain = getSubdomain(ctx.extra.request);
        const user = extractSubscriptionUser(ctx.extra.request);
        return { dataSources: { gatewayDataSource }, subdomain, user };
      },
      onSubscribe: async (
        _ctx,
        msg: SubscribeMessage,
      ): Promise<ExecutionArgs | readonly GraphQLError[] | void> => {
        // Read at subscribe time so connections opened after a plugin joined
        // get the rebuilt schema without a process restart.
        const schema = currentSchema;

        if (!schema) {
          return [new GraphQLError('Subscriptions are not available')];
        }

        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
        };

        const operationAST = getOperationAST(args.document, args.operationName);

        // Stops the subscription and sends an error message
        if (!operationAST) {
          return [new GraphQLError('Unable to identify operation')];
        }

        // Handle mutation and query requests
        if (operationAST.operation !== 'subscription') {
          return [
            new GraphQLError('Only subscription operations are supported'),
          ];
        }

        // Validate the operation document
        const errors = validate(args.schema, args.document);

        if (errors.length > 0) {
          return errors;
        }
        // Ready execution arguments
        return args;
      },
    },
    wsServer,
  );
}
