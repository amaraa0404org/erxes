import * as Sentry from '@sentry/node';
import type { GraphQLSchemaModule } from '@apollo/subgraph/dist/buildSubgraphSchema';
import {
  wrapPermission,
  wrapPublicResolver,
} from '../../core-modules/permissions/utils';
import { GraphQLScalarType } from 'graphql';
import {
  AnyResolver,
  IMainContext,
  IResolverSymbol,
  Resolver,
} from '../../core-types/common';
import { logHandler } from '../logs';
import { runBeforeResolvers } from './runBeforeResolvers';
import { classifyError } from '../errorClassifier';

const withSentryCapture = (
  resolver: Resolver,
  resolverKey: string,
  operation: 'query' | 'mutation',
): Resolver => {
  return async (root, args, context, info) => {
    try {
      return await resolver(root, args, context, info);
    } catch (err) {
      const classification = classifyError(err);

      // Only capture system/provider errors in Sentry
      // Expected business errors (not found, validation, etc.) are skipped
      if (classification.category !== 'EXPECTED') {
        Sentry.withScope((scope) => {
          scope.setTag('graphql.operation', operation);
          scope.setTag('graphql.field', resolverKey);
          scope.setTag('error.category', classification.category);
          scope.setContext('graphql', {
            field: resolverKey,
            operation,
            subdomain: context?.subdomain,
            userId: context?.user?._id,
            errorCategory: classification.category,
          });
          Sentry.captureException(err);
        });
      }

      throw err;
    }
  };
};

const withBeforeResolvers = (
  resolver: Resolver,
  resolverKey: string,
): Resolver => {
  return async (root, args, context, info) => {
    const { subdomain, user } = context;

    const headers = context.requestInfo?.headers || context.req?.headers;

    const result = await runBeforeResolvers(resolverKey, args, {
      subdomain,
      user,
      headers,
    });

    if (result.resolved) {
      return result.data;
    }

    return resolver(root, result.args, context, info);
  };
};

const withLogging = (resolver: Resolver): Resolver => {
  return async (root, args, context, info) => {
    const { user, req, processId, subdomain } = context;
    const requestData = req.headers;

    return await logHandler(
      async () => await resolver(root, args, context, info),
      {
        subdomain,
        source: 'graphql',
        action: 'mutation',
        payload: {
          mutationName: info.fieldName,
          requestData,
          args,
        },
        processId,
        userId: user?._id,
      },
    );
  };
};

/**
 * The top-level resolver map handed to Apollo: each key holds a field map
 * (`Query`, `Mutation`, type resolvers), a custom scalar, or a bare resolver.
 */
export type GraphqlResolverMap = Record<
  string,
  Record<string, AnyResolver> | GraphQLScalarType | AnyResolver
>;

const isResolverFieldMap = (
  value: GraphqlResolverMap[string],
): value is Record<string, AnyResolver> =>
  typeof value === 'object' &&
  value !== null &&
  !(value instanceof GraphQLScalarType);

/** The resolver-map shape `buildSubgraphSchema` accepts (graphql-tools). */
export type SubgraphResolverMap = NonNullable<
  GraphQLSchemaModule['resolvers']
>;

export const wrapApolloResolvers = (
  resolvers: GraphqlResolverMap,
): SubgraphResolverMap => {
  const wrappedResolvers: Record<string, GraphqlResolverMap[string]> = {};

  for (const [key, resolver] of Object.entries(resolvers)) {
    if (key === 'Mutation' || key === 'Query') {
      const operation = key === 'Mutation' ? 'mutation' : 'query';
      const fieldResolvers: Record<string, AnyResolver> = {};

      if (isResolverFieldMap(resolver)) {
        for (const [fieldKey, fieldResolver] of Object.entries(resolver)) {
          const { skipPermission, cpUserRequired, forClientPortal } =
            fieldResolver.wrapperConfig || {};
          const isPublic =
            skipPermission || forClientPortal || cpUserRequired;

          let wrapped: Resolver;
          if (isPublic) {
            wrapped = wrapPublicResolver(
              withBeforeResolvers(fieldResolver, fieldKey),
              fieldResolver.wrapperConfig,
            );
          } else if (key === 'Mutation') {
            wrapped = withLogging(
              wrapPermission(
                withBeforeResolvers(fieldResolver, fieldKey),
                fieldKey,
              ),
            );
          } else {
            wrapped = wrapPermission(
              withBeforeResolvers(fieldResolver, fieldKey),
              fieldKey,
            );
          }

          fieldResolvers[fieldKey] = withSentryCapture(
            wrapped,
            fieldKey,
            operation,
          );
        }
      }

      wrappedResolvers[key] = fieldResolvers;
      continue;
    }

    wrappedResolvers[key] = resolver;
  }

  // Plugin resolver maps are runtime-composed (scalar | field-map | bare
  // resolver unions), which is broader than the graphql-tools resolver-map
  // contract — cast at the federation boundary.
  return wrappedResolvers as SubgraphResolverMap;
};
type TResolverMap<TContext = unknown> = Record<
  string,
  Resolver<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any — erased
    // parent type at the resolver-map boundary (see AnyResolver).
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any — erased
    // args type at the resolver-map boundary (see AnyResolver).
    any,
    TContext & { subdomain: string } & IMainContext,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any — erased
    // result type at the resolver-map boundary (see AnyResolver).
    any
  >
>;

export const markResolvers = <TContext = unknown>(
  resolvers: TResolverMap<TContext>,
  symbols: IResolverSymbol,
) => {
  for (const key in resolvers) {
    resolvers[key] = Object.assign(resolvers[key], symbols);
  }
};
