import path from 'path';
import { startPlugin } from 'erxes-api-shared/utils';
import resolvers from '~/apollo/resolvers';
import { typeDefs } from '~/apollo/typeDefs';
import { appRouter } from '~/trpc/init-trpc';

startPlugin({
  name: 'hello',
  port: 3340,
  uiRemoteEntry:
    process.env.UI_REMOTE_ENTRY ?? 'http://localhost:3099/remoteEntry.js',
  localesDir: path.join(__dirname, 'locales'),
  graphql: async () => ({
    typeDefs: await typeDefs(),
    resolvers,
  }),
  apolloServerContext: async (_subdomain, context) => context,
  trpcAppRouter: {
    router: appRouter,
    createContext: async (_subdomain, context) => context,
  },
  hasSubscriptions: false,
});
