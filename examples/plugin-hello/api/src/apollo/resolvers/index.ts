import { apolloCustomScalars } from 'erxes-api-shared/utils';
import { queries } from './queries';

const resolvers = {
  Query: {
    ...queries,
  },
  ...apolloCustomScalars,
};

export default resolvers;
