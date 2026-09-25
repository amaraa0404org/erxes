import { FieldResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { IFieldDocument } from '~/modules/properties/@types';

const fieldResolvers: FieldResolvers<IContext> = {
  async __resolveReference({ _id }, { models }) {
    return models.Fields.findOne({ _id });
  },

  async createdBy({ createdBy }: IFieldDocument) {
    if (!createdBy) {
      return null;
    }

    return { __typename: 'User', _id: createdBy };
  },

  async updatedBy({ updatedBy }: IFieldDocument) {
    if (!updatedBy) {
      return null;
    }

    return { __typename: 'User', _id: updatedBy };
  },
};

export default fieldResolvers;
