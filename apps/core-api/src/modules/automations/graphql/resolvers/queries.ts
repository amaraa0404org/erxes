import {
  IAutomation,
  IAutomationDocument,
  IAutomationExecutionDocument,
  splitType,
} from 'erxes-api-shared/core-modules';
import { AnyResolver } from 'erxes-api-shared/core-types';
import {
  cursorPaginate,
  getEnv,
  getPlugin,
  getPlugins,
  sendWorkerMessage,
} from 'erxes-api-shared/utils';
import { FilterQuery } from 'mongoose';
import {
  AutomationsTotalCountResponse,
  QueryAutomationsMainArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IAutomationWorkflowTemplate } from '../../db/models/AutomationWorkflowTemplates';
import { IContext, IModels } from '~/connectionResolvers';
import { AUTOMATION_APPROVAL_CONTENT_TYPES } from '../../constants';
import { sanitizeAiAgent, sanitizeAiAgents } from '../../utils/aiAgent';
import {
  generateAutomationHistoriesFilter,
  generateAutomationStatsFilter,
  generateAutomationsFilter,
  addReferenceExtensionsToAutomationOutput,
  getAutomationReferenceFields,
  getAutomationConstants,
  getAutomationSetPropertyTargets,
} from './utils/queriesUtils';

export type IListArgs = Partial<QueryAutomationsMainArgs>;

export interface IStatsParams {
  automationId: string;
  beginDate?: Date;
  endDate?: Date;
}

export interface IHistoriesParams {
  automationId: string;
  page?: number;
  perPage?: number;
  status?: string;
  triggerId?: string;
  triggerType?: string;
  beginDate?: Date;
  endDate?: Date;
  targetId?: string;
  targetIds?: string[];
  ids?: string[];
  triggerTypes?: string[];
  // Set to list a workflow child executions; omitted = root executions only
  parentExecutionId?: string;
  failedActionIds?: string[];
  errorCodes?: string[];
  waitingActionIds?: string[];
}

type TAiAgentUsage = {
  total: number;
  active: number;
  automations: Array<{ _id: string; name: string; status: string }>;
};

/**
 * An agent is referenced from a root action and from a workflow member action
 * alike, so both are counted: a usage read that missed one would make an agent
 * look free to delete while an automation still depends on it.
 */
const getAiAgentUsage = async (
  models: IModels,
  agentIds: string[],
): Promise<Record<string, TAiAgentUsage>> => {
  if (!agentIds.length) {
    return {};
  }

  const rows = await models.Automations.aggregate([
    {
      $project: {
        name: 1,
        status: 1,
        agentIds: {
          $setUnion: [
            {
              $map: {
                input: {
                  $filter: {
                    input: { $ifNull: ['$actions', []] },
                    as: 'action',
                    cond: { $eq: ['$$action.type', 'aiAgent'] },
                  },
                },
                as: 'action',
                in: '$$action.config.aiAgentId',
              },
            },
            {
              $map: {
                input: {
                  $filter: {
                    input: {
                      $reduce: {
                        input: { $ifNull: ['$workflows', []] },
                        initialValue: [],
                        in: {
                          $concatArrays: [
                            '$$value',
                            { $ifNull: ['$$this.actions', []] },
                          ],
                        },
                      },
                    },
                    as: 'action',
                    cond: { $eq: ['$$action.type', 'aiAgent'] },
                  },
                },
                as: 'action',
                in: '$$action.config.aiAgentId',
              },
            },
          ],
        },
      },
    },
    { $unwind: '$agentIds' },
    { $match: { agentIds: { $in: agentIds } } },
    {
      $group: {
        _id: '$agentIds',
        automations: {
          $addToSet: { _id: '$_id', name: '$name', status: '$status' },
        },
      },
    },
  ]);

  return rows.reduce((acc, row) => {
    const automations = (row.automations || []).map((automation) => ({
      _id: String(automation._id),
      name: automation.name || '',
      status: automation.status || '',
    }));

    acc[row._id] = {
      total: automations.length,
      active: automations.filter(({ status }) => status === 'active').length,
      automations,
    };

    return acc;
  }, {} as Record<string, TAiAgentUsage>);
};

export const automationQueries: QueryResolvers<IContext> = {
  /**
   * Automations list
   */
  async automations(_root, params: IListArgs, { models }: IContext) {
    const filter = generateAutomationsFilter(params);

    return models.Automations.find(filter).lean();
  },

  /**
   * Automations for only main list
   */
  async automationsMain(_root, params: IListArgs, { models }: IContext) {
    const filter = generateAutomationsFilter(params);

    const { list, totalCount, pageInfo } =
      await cursorPaginate<IAutomationDocument>({
        model: models.Automations,
        params: {
          limit: params.limit ?? undefined,
          cursor: params.cursor ?? undefined,
          direction: params.direction ?? undefined,
          orderBy: {
            createdAt: -1,
          },
        },
        query: filter,
      });

    return {
      list,
      totalCount,
      pageInfo,
    };
  },

  /**
   * Get one automation
   */
  async automationDetail(
    _root,
    { _id }: { _id: string },
    { models, user }: IContext,
  ) {
    const automation = await models.Automations.getAutomation(_id);
    if (!automation) {
      throw new Error('Automation not found');
    }

    await models.ApprovalLocks.assertAccess({
      user,
      contentType: AUTOMATION_APPROVAL_CONTENT_TYPES.AUTOMATION,
      contentId: _id,
      ownerId: automation.createdBy,
      action: 'view',
    });

    return automation;
  },

  async cpAutomationDetail(
    _root,
    { _id }: { _id: string },
    { models }: IContext,
  ) {
    return models.Automations.getAutomation(_id);
  },

  /**
   * Automations history list
   */
  async automationHistories(
    _root,
    params: IHistoriesParams,
    { models }: IContext,
  ) {
    const filter = generateAutomationHistoriesFilter(params);
    const { list, totalCount, pageInfo } =
      await cursorPaginate<IAutomationExecutionDocument>({
        model: models.AutomationExecutions,
        params: {
          ...params,
          orderBy: { createdAt: -1 },
        },
        query: filter,
      });

    return {
      list,
      totalCount,
      pageInfo,
    };
  },

  async automationHistoriesTotalCount(
    _root,
    params: IHistoriesParams,
    { models }: IContext,
  ) {
    const filter = generateAutomationHistoriesFilter(params);

    return await models.AutomationExecutions.find(filter).countDocuments();
  },

  /**
   * Execution counts for the automations currently listed, so the list itself
   * never waits on them.
   */
  async automationExecutionCounts(
    _root,
    { automationIds }: { automationIds: string[] },
    { models }: IContext,
  ) {
    return models.AutomationExecutions.getExecutionCounts(automationIds);
  },

  /**
   * Execution stats of one automation: run status breakdown, daily buckets and
   * per action node counts/durations.
   */
  async automationStats(_root, params: IStatsParams, { models }: IContext) {
    return models.AutomationExecutions.getStats(
      generateAutomationStatsFilter(params),
    );
  },

  async automationsTotalCount(
    _root,
    { status }: { status?: string | null },
    { models }: IContext,
  ) {
    const filter: FilterQuery<IAutomation> = {
      ownedBy: { $exists: false },
    };

    if (status) {
      filter.status = status as IAutomation['status'];
    }

    // Historic contract: the count number is returned into an object-shaped
    // response type whose fields stay null.
    return models.Automations.find(filter)
      .countDocuments()
      .then((count) => count as unknown as AutomationsTotalCountResponse);
  },

  async automationConstants() {
    return getAutomationConstants();
  },

  async automationSetPropertyTargets(
    _root,
    { sourceType }: { sourceType: string },
  ) {
    const [pluginName, moduleName, collectionName] = splitType(sourceType);
    return (await getAutomationSetPropertyTargets(
      `${pluginName}:${moduleName}.${collectionName}`,
    )) as unknown as Record<string, unknown>;
  },

  async automationNodeOutput(_root, { nodeType }: { nodeType: string }) {
    const { triggersConst, actionsConst } = await getAutomationConstants();

    const matchedTrigger = triggersConst.find(({ type }) => type === nodeType);

    const matchedAction = actionsConst.find(({ type }) => type === nodeType);
    const output = matchedTrigger?.output || matchedAction?.output || null;

    return await addReferenceExtensionsToAutomationOutput({
      nodeType,
      output,
    });
  },

  async automationReferenceFields(
    _root,
    { type, field }: { type: string; field: string },
    { models }: IContext,
  ) {
    return (await getAutomationReferenceFields({
      field,
      models,
      type,
    })) as unknown as Record<string, unknown>;
  },

  async getAutomationWebhookEndpoint(
    _root,
    { _id },
    { models, subdomain }: IContext,
  ) {
    const DOMAIN = getEnv({ name: 'DOMAIN', subdomain });
    const NODE_ENV = getEnv({ name: 'NODE_ENV' });

    if (!DOMAIN) {
      throw new Error('DOMAIN is not set');
    }

    const automation = await models.Automations.findById(_id).lean();

    if (!automation) {
      throw new Error('Not found');
    }

    const syntax = NODE_ENV === 'production' ? '/gateway/pl:automations' : '';

    return `${DOMAIN}${syntax}/automation/${automation._id}/`;
  },

  async getAutomationExecutionDetail(
    _root,
    { executionId },
    { models }: IContext,
  ) {
    const execution = await models.AutomationExecutions.findById(
      executionId,
    ).lean();
    if (!execution) {
      throw new Error('Execution not found');
    }

    return execution;
  },

  async automationBotsConstants() {
    const plugins = await getPlugins();
    const botsConstants: Record<string, unknown>[] = [];

    for (const pluginName of plugins) {
      const plugin = await getPlugin(pluginName);
      const bots = plugin?.config?.meta?.automations?.constants?.bots || [];

      if (bots.length) {
        botsConstants.push(...bots.map((bot) => ({ ...bot, pluginName })));
      }
    }

    return botsConstants as unknown as Record<string, unknown>;
  },

  async automationsAiAgents(
    _root,
    { kind }: { kind?: string },
    { models, user }: IContext,
  ) {
    const agents = await models.AiAgents.find(
      kind ? { 'connection.provider': kind } : {},
    );
    const agentIds = agents.map((agent) => agent._id.toString());
    const lockStates = await models.ApprovalLocks.getStates({
      user,
      contentType: AUTOMATION_APPROVAL_CONTENT_TYPES.AUTOMATION_AI_AGENT,
      contentIds: agentIds,
      action: 'view',
    });
    const lockStateByAgentId = new Map(
      lockStates.map((state) => [state.contentId, state]),
    );

    const usageByAgentId = await getAiAgentUsage(models, agentIds);

    return sanitizeAiAgents(agents).map((agent) => ({
      ...agent,
      approvalLockState: lockStateByAgentId.get(agent._id.toString()),
      usage: usageByAgentId[agent._id.toString()] || {
        total: 0,
        active: 0,
        automations: [],
      },
    })) as unknown as Record<string, unknown>;
  },

  async automationsAiAgentTotalCounts(_root, _args, { models }: IContext) {
    const counts = await models.AiAgents.aggregate([
      {
        $group: {
          _id: '$connection.provider',
          totalCount: { $sum: 1 },
        },
      },
    ]);

    return counts.reduce<Record<string, number>>((acc, { _id, totalCount }) => {
      if (_id) {
        acc[_id] = totalCount;
      }

      return acc;
    }, {});
  },

  async automationsAiAgentDetail(
    _root,
    { _id }: { _id?: string },
    { models, user }: IContext,
  ) {
    const agent = await models.AiAgents.findOne(_id ? { _id } : {});

    if (_id && agent) {
      await models.ApprovalLocks.assertAccess({
        user,
        contentType: AUTOMATION_APPROVAL_CONTENT_TYPES.AUTOMATION_AI_AGENT,
        contentId: _id,
        action: 'view',
      });
    }

    if (!agent) {
      return sanitizeAiAgent(agent) as unknown as Record<
        string,
        unknown
      > | null;
    }

    const usageByAgentId = await getAiAgentUsage(models, [
      agent._id.toString(),
    ]);

    return {
      ...sanitizeAiAgent(agent),
      usage: usageByAgentId[agent._id.toString()] || {
        total: 0,
        active: 0,
        automations: [],
      },
    } as unknown as Record<string, unknown> | null;
  },

  async automationsAiAgentHealth(
    _root,
    { agentId }: { agentId: string },
    { models, subdomain, user }: IContext,
  ) {
    await models.ApprovalLocks.assertAccess({
      user,
      contentType: AUTOMATION_APPROVAL_CONTENT_TYPES.AUTOMATION_AI_AGENT,
      contentId: agentId,
      action: 'view',
    });

    return await sendWorkerMessage({
      pluginName: 'automations',
      queueName: 'aiAgent',
      jobName: 'checkAiAgentHealth',
      subdomain,
      data: { agentId },
      timeout: 10000,
    });
  },

  async automationsAiAgentKnowledgeSourceStatuses(
    _root,
    { agentId }: { agentId: string },
    { models, subdomain, user }: IContext,
  ) {
    await models.ApprovalLocks.assertAccess({
      user,
      contentType: AUTOMATION_APPROVAL_CONTENT_TYPES.AUTOMATION_AI_AGENT,
      contentId: agentId,
      action: 'view',
    });

    try {
      return await sendWorkerMessage({
        pluginName: 'automations',
        queueName: 'aiAgent',
        jobName: 'getAiAgentKnowledgeSourceStatuses',
        subdomain,
        data: { agentId },
        defaultValue: [],
        timeout: 10000,
      });
    } catch {
      return [] as unknown as Record<string, unknown>;
    }
  },

  /**
   * Workflow templates list
   */
  async automationWorkflowTemplates(
    _root,
    { searchValue }: { searchValue?: string | null },
    { models }: IContext,
  ) {
    const filter: FilterQuery<IAutomationWorkflowTemplate> = {};

    if (searchValue) {
      filter.$or = [
        { name: new RegExp(`.*${searchValue}.*`, 'i') },
        { description: new RegExp(`.*${searchValue}.*`, 'i') },
      ];
    }

    return models.AutomationWorkflowTemplates.find(filter).sort({
      createdAt: -1,
    });
  },
};

(automationQueries.cpAutomationDetail as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
