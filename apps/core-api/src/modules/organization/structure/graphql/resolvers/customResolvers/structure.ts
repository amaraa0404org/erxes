import { StructureResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const Structure: StructureResolvers<IContext> = {
  async supervisor(structure, _args, { models }) {
    return models.Users.findOne({ _id: structure.supervisorId });
  },
};

export default Structure;
