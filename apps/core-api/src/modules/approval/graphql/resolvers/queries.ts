import { ApprovalLockStatesInput } from 'erxes-api-shared/core-modules';
import { cursorPaginate, ExpectedError } from 'erxes-api-shared/utils';
import { SortOrder } from 'mongoose';
import {
  QueryApprovalRequestsArgs,
  QueryResolvers,
  ResolversTypes,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { IApprovalRequestDocument } from '../../db/definitions/approvalRequests';

type ApprovalLockStateArgs = {
  contentType: string;
  contentId: string;
  ownerId?: string;
  action?: string;
};

type ApprovalLockStatesArgs = ApprovalLockStatesInput;

type ApprovalRequestsArgs = Partial<QueryApprovalRequestsArgs>;

const normalizeOwnerIdsByContentId = (
  ownerIdsByContentId?: Record<string, unknown>,
): Record<string, string> => {
  if (!ownerIdsByContentId) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(ownerIdsByContentId).filter(
      (entry): entry is [string, string] => typeof entry[1] === 'string',
    ),
  );
};

const generateApprovalRequestsFilter = (
  params: ApprovalRequestsArgs,
  user: IContext['user'],
) => {
  const filter: Record<string, unknown> = {};

  if (params.status && params.status !== 'all') {
    filter.status = params.status;
  }

  if (params.contentType) {
    filter.contentType = params.contentType;
  }

  // A record's own page asks what is pending on it, rather than reading the
  // whole list and filtering client side.
  if (params.contentId) {
    filter.contentId = params.contentId;
  }

  if (params.kind) {
    filter.kind = params.kind;
  }

  if (params.requesterIds?.length) {
    filter.requesterId = { $in: params.requesterIds };
  }

  if (params.approverIds?.length) {
    filter.requiredApproverIds = { $in: params.approverIds };
  }

  if (!user.isOwner) {
    filter.$or = [{ requesterId: user._id }, { requiredApproverIds: user._id }];
  }

  return filter;
};

export const approvalQueries: QueryResolvers<IContext> = {
  async approvalLockState(
    _root: unknown,
    args: ApprovalLockStateArgs,
    { models, user }: IContext,
  ) {
    const state = await models.ApprovalLocks.getState({
      user,
      ...args,
    });

    return state as unknown as ResolversTypes['ApprovalLockState'];
  },

  async approvalLockStates(
    _root: unknown,
    args: ApprovalLockStatesArgs,
    { models, user }: IContext,
  ) {
    const states = await models.ApprovalLocks.getStates({
      user,
      ...args,
      ownerIdsByContentId: normalizeOwnerIdsByContentId(
        args.ownerIdsByContentId,
      ),
    });

    return states as unknown as Array<ResolversTypes['ApprovalLockState']>;
  },

  async approvalRequestDetail(
    _root: unknown,
    { _id }: { _id: string },
    { models, user }: IContext,
  ) {
    const request = await models.ApprovalRequests.getRequest(_id);

    if (
      user.isOwner ||
      request.requesterId === user._id ||
      request.requiredApproverIds.includes(user._id)
    ) {
      return request as IApprovalRequestDocument;
    }

    const state = await models.ApprovalLocks.getState({
      user,
      contentType: request.contentType,
      contentId: request.contentId,
      action: 'view',
    });

    if (!state.hasAccess) {
      throw new ExpectedError('Approval request not found', 'NOT_FOUND');
    }

    return request as IApprovalRequestDocument;
  },

  async approvalRequests(
    _root: unknown,
    params: ApprovalRequestsArgs,
    { models, user }: IContext,
  ) {
    const { list, totalCount, pageInfo } =
      await cursorPaginate<IApprovalRequestDocument>({
        model: models.ApprovalRequests,
        params: {
          limit: params.limit ?? undefined,
          cursor: params.cursor ?? undefined,
          direction: params.direction ?? undefined,
          orderBy:
            (params.orderBy as Record<string, SortOrder> | null | undefined) ||
            { createdAt: -1 },
        },
        query: generateApprovalRequestsFilter(params, user),
      });

    return {
      list,
      totalCount,
      pageInfo,
    };
  },
};
