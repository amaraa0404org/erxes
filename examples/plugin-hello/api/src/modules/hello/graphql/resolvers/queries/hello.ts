import { Resolver } from 'erxes-api-shared/core-types';

const helloQueries: Record<string, Resolver> = {
  helloPing: () => 'pong',
};

export default helloQueries;
