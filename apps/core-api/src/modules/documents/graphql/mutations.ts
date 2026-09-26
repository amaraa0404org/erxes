import { MutationResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { IDocument } from '../types';

export const documentMutations: MutationResolvers<IContext> = {
  /**
   * Save document configuration
   */
  documentsSave: async (
    _parent: unknown,
    params: { _id?: string } & IDocument,
    { user, models, checkPermission }: IContext,
  ) => {
    await checkPermission('manageDocuments');

    const { _id, ...doc } = params;

    return await models.Documents.saveDocument({
      _id,
      doc: { ...doc, createdUserId: user._id },
      user,
    });
  },

  documentsRemove: async (
    _parent: unknown,
    { _id }: { _id: string },
    { models, user, checkPermission }: IContext,
  ) => {
    await checkPermission('removeDocuments');

    const document = await models.Documents.getDocument({
      _id,
      user,
      action: 'delete',
    });

    const result = await models.Documents.findOneAndDelete({
      _id: document._id,
    });

    // JSON scalar output is typed Record<string, unknown> in codegen.
    return result as unknown as Record<string, unknown>;
  },
};
