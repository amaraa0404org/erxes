import { nextFireAt } from '@/broadcast/utils/schedule';
import { IEngageMessageDocument } from '@/broadcast/@types';
import { BROADCAST_APPROVAL_CONTENT_TYPES } from '@/broadcast/constants';
import { ApprovalLockState } from 'erxes-api-shared/core-modules';
import {
  findCampaignAutomation,
  isWorkflowCampaign,
  prepareNotificationStats,
} from '@/broadcast/utils';
import { IContext } from '~/connectionResolvers';
import { CAMPAIGN_METHODS } from '~/modules/broadcast/constants';
import {
  EngageMessageApprovalLockStateArgs,
  EngageMessageResolvers,
  ResolversTypes,
  Scalars,
} from '~/__generated__/graphql';

// JSON scalar boundary: stats come back as whole Mongoose documents.
const asJSON = (value: unknown): Scalars['JSON']['output'] =>
  value as Scalars['JSON']['output'];

const engageMessageResolvers: EngageMessageResolvers<IContext> = {
  /**
   * When this campaign next goes out, worked out from its schedule.
   *
   * Computed rather than stored so it cannot fall behind the schedule, and
   * returned with the list so a card can say when the next one is without
   * asking again per row.
   */
  nextRunAt(campaign: IEngageMessageDocument) {
    return nextFireAt(campaign) ?? null;
  },

  /**
   * Who may act on this campaign, when somebody has locked it.
   *
   * The list resolves these in one go and hands them down, so this only asks
   * for itself when a single campaign is being looked at.
   */
  async approvalLockState(
    campaign: IEngageMessageDocument & {
      approvalLockState?: ApprovalLockState;
    },
    { action }: EngageMessageApprovalLockStateArgs,
    { models, user }: IContext,
  ) {
    if (campaign.approvalLockState) {
      return campaign.approvalLockState as unknown as ResolversTypes['ApprovalLockState'];
    }

    const state = await models.ApprovalLocks.getState({
      user,
      contentType: BROADCAST_APPROVAL_CONTENT_TYPES.CAMPAIGN,
      contentId: campaign._id,
      action: action || 'view',
    });

    // getState always populates content; the shared domain type marks it
    // optional while the schema requires it.
    return state as unknown as ResolversTypes['ApprovalLockState'];
  },

  /**
   * Resolved rather than stored: the automation carries `ownerContentId`, so
   * the link has one source of truth and nothing to keep in sync.
   */
  async workflowAutomationId(
    { _id, method }: IEngageMessageDocument,
    _args,
    { models }: IContext,
  ) {
    if (!isWorkflowCampaign(method)) {
      return null;
    }

    const automation = await findCampaignAutomation(models, _id);

    return automation?._id || null;
  },

  /**
   * Loaded, not referenced.
   *
   * `Segment`, `Brand` and `Tag` live in this subgraph, and a bare
   * `{ __typename, _id }` only resolves when it crosses a subgraph boundary —
   * returned from here it stays exactly that, which is why every audience read
   * as nameless.
   */
  async segments(
    { targetType, targetIds = [] }: IEngageMessageDocument,
    _args,
    { models }: IContext,
  ) {
    if (targetType !== 'segment' || !targetIds.length) {
      return [];
    }

    return await models.Segments.find({ _id: { $in: targetIds } });
  },

  async brands(
    { targetType, targetIds = [] }: IEngageMessageDocument,
    _args,
    { models }: IContext,
  ) {
    if (targetType !== 'brand' || !targetIds.length) {
      return [];
    }

    return await models.Brands.find({ _id: { $in: targetIds } });
  },

  async customerTags(
    { targetType, targetIds = [] }: IEngageMessageDocument,
    _args,
    { models }: IContext,
  ) {
    if (targetType !== 'tag' || !targetIds.length) {
      return [];
    }

    return await models.Tags.find({ _id: { $in: targetIds } });
  },

  // common tags
  async getTags(
    { targetType, targetIds = [] }: IEngageMessageDocument,
    _args,
    { models }: IContext,
  ) {
    if (targetType !== 'tag' || !targetIds.length) {
      return [];
    }

    return await models.Tags.find({ _id: { $in: targetIds } });
  },

  brandId({ messenger }: IEngageMessageDocument) {
    return messenger?.brandId ?? null;
  },

  async stats(
    { _id, method }: IEngageMessageDocument,
    _args,
    { models }: IContext,
  ) {
    if (method === CAMPAIGN_METHODS.EMAIL) {
      return asJSON(await models.Stats.findOne({ engageMessageId: _id }));
    }

    if (method === CAMPAIGN_METHODS.NOTIFICATION) {
      return asJSON(await prepareNotificationStats(models, _id));
    }

    // Methods that keep no stats document report none.
    return null;
  },
};

export default engageMessageResolvers;
