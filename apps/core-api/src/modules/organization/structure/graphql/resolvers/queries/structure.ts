import { QueryResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const structuresQueries: QueryResolvers<IContext> = {
  async structureDetail(_parent, _args, { models }) {
    return models.Structures.findOne();
  },
};
