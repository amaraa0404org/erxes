import { ApprovalLockState } from 'erxes-api-shared/core-modules';
import {
  DocumentResolvers,
  ResolversTypes,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import {
  DOCUMENT_APPROVAL_CONTENT_TYPE,
  IDocumentDocument,
} from '~/modules/documents/types';

const documentResolvers: DocumentResolvers<IContext> = {
  async __resolveReference(
    { _id }: { _id: string },
    { models, user, checkPermission }: IContext,
  ) {
    await checkPermission('documentsRead');
    return models.Documents.getDocument({ _id, user });
  },

  approvalLockState(
    document: IDocumentDocument & { approvalLockState?: ApprovalLockState },
    _args,
    { models, user }: IContext,
  ) {
    // The shared ApprovalLockState is a plain-object shape; the generated
    // mapper type carries Mongoose documents for lock/pendingRequest. The
    // GraphQL layer only serializes the declared fields.
    return (
      document.approvalLockState ||
      models.ApprovalLocks.getState({
        user,
        contentType: DOCUMENT_APPROVAL_CONTENT_TYPE,
        contentId: document._id,
        ownerId: document.createdUserId,
        action: 'view',
      })
    ) as unknown as ResolversTypes['ApprovalLockState'];
  },

  async createdUser(
    document: IDocumentDocument,
    _args,
    { models }: IContext,
  ) {
    return models.Users.findOne({ _id: document.createdUserId });
  },
};

export default documentResolvers;
