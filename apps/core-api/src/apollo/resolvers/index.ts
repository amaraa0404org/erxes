import { apolloCustomScalars } from 'erxes-api-shared/utils';
import { mutations } from './mutations';
import { queries } from './queries';
import { customResolvers } from './resolvers';

// The aggregate map mixes codegen resolver types (`ResolverWithResolve`
// object form), custom scalars and legacy untyped module maps — broader than
// the `GraphqlResolverMap` union `wrapApolloResolvers` accepts, so the
// boundary stays erased.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolvers: any = {
  Mutation: {
    ...mutations,
  },
  Query: {
    ...queries,
  },
  ...apolloCustomScalars,
  ...customResolvers,
};

export default resolvers;
