import { FieldGroupResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { IFieldGroupDocument } from '~/modules/properties/@types';

const fieldGroupResolvers: FieldGroupResolvers<IContext> = {
  async __resolveReference({ _id }, { models }) {
    return models.FieldsGroups.findOne({ _id });
  },

  async createdBy({ createdBy }: IFieldGroupDocument) {
    if (!createdBy) {
      return null;
    }

    return { __typename: 'User', _id: createdBy };
  },

  async updatedBy({ updatedBy }: IFieldGroupDocument) {
    if (!updatedBy) {
      return null;
    }

    return { __typename: 'User', _id: updatedBy };
  },
};

export default fieldGroupResolvers;
