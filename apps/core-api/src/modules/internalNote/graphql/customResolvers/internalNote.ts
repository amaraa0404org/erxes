import { InternalNoteResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { IInternalNoteDocument } from '~/modules/internalNote/types';

const internalNoteResolvers: InternalNoteResolvers<IContext> = {
  async createdUser(
    note: IInternalNoteDocument,
    _args,
    { models }: IContext,
  ) {
    if (!note.createdUserId) {
      return null;
    }

    return await models.Users.findOne({ _id: note.createdUserId });
  },
};

export default internalNoteResolvers;
