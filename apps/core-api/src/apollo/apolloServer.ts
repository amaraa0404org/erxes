import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildSubgraphSchema } from '@apollo/subgraph';
import * as dotenv from 'dotenv';
import { IMainContext } from 'erxes-api-shared/core-types';
import {
  generateApolloContext,
  wrapApolloResolvers,
  expectedErrorPlugin,
} from 'erxes-api-shared/utils';
import { GraphQLSchema } from 'graphql';
import { generateModels } from '../connectionResolvers';
import resolvers from './resolvers';
import { typeDefs as coreTypeDefs } from './typeDefs';

// load environment variables
dotenv.config();

let apolloServer;

export const getCoreTypeDefs = coreTypeDefs;

let schemaPromise: Promise<GraphQLSchema> | undefined;

/**
 * The executable subgraph schema — built once and shared by Apollo Server
 * and the in-process agent-tool executor, so both run the identical
 * wrapped resolver pipeline (checkLogin, permission wrappers, logHandler).
 */
export const getCoreSchema = (): Promise<GraphQLSchema> => {
  if (!schemaPromise) {
    schemaPromise = getCoreTypeDefs().then((typeDefs) =>
      buildSubgraphSchema([
        {
          typeDefs,
          resolvers: wrapApolloResolvers(resolvers),
        },
      ]),
    );
  }

  return schemaPromise;
};

/**
 * The context factory shared by the /graphql express mount and agent-tool
 * calls, so both build identical request contexts.
 */
export const coreApolloContext = generateApolloContext<IMainContext>(
  async (subdomain, context) => {
    const models = await generateModels(subdomain, context);

    context.models = models;

    return context;
  },
);

export const initApolloServer = async (app, httpServer) => {
  apolloServer = new ApolloServer({
    schema: await getCoreSchema(),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      expectedErrorPlugin,
    ],
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: coreApolloContext,
    }),
  );

  return apolloServer;
};

export default apolloServer;
