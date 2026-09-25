import { IAutomation } from 'erxes-api-shared/core-modules';
import {
  MutationAutomationWorkflowTemplatesAddArgs,
  MutationAutomationWorkflowTemplatesEditArgs,
  MutationAutomationsAddArgs,
  MutationAutomationsEditArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { AUTOMATION_APPROVAL_CONTENT_TYPES } from '../../constants';
import {
  IAutomationWorkflowTemplate,
} from '../../db/models/AutomationWorkflowTemplates';
import { TAutomationEdit } from '../../db/models/Automations';
import { sanitizeAiAgent, TAiAgentMutationDoc } from '../../utils/aiAgent';

export const automationMutations: MutationResolvers<IContext> = {
  async automationsAdd(
    _root,
    doc: MutationAutomationsAddArgs,
    { user, models, checkPermission }: IContext,
  ) {
    await checkPermission('automationsCreate');

    return models.Automations.createAutomation(
      doc as IAutomation,
      user._id,
    );
  },

  async automationsEdit(
    _root,
    { _id, ...doc }: MutationAutomationsEditArgs,
    { user, models, checkPermission }: IContext,
  ) {
    await checkPermission('automationsUpdate');

    const automation = await models.Automations.getAutomation(_id);

    if (!automation) {
      throw new Error('Automation not found');
    }

    await models.ApprovalLocks.assertAccess({
      user,
      contentType: AUTOMATION_APPROVAL_CONTENT_TYPES.AUTOMATION,
      contentId: _id,
      ownerId: automation.createdBy,
      action: 'edit',
    });

    return models.Automations.editAutomation(
      _id,
      doc as TAutomationEdit,
      user._id,
    );
  },

  async automationsDuplicate(
    _root,
    { _id, name }: { _id: string; name?: string },
    { user, models, checkPermission }: IContext,
  ) {
    await checkPermission('automationsCreate');

    return models.Automations.duplicateAutomation(_id, user._id, name);
  },

  /**
   * Archive automations
   */

  async archiveAutomations(
    _root,
    {
      automationIds,
      isRestore,
    }: { automationIds: string[]; isRestore?: boolean | null },
    { models, user, checkPermission }: IContext,
  ) {
    await checkPermission('automationsUpdate');

    const automations = await models.Automations.find(
      { _id: { $in: automationIds } },
      { createdBy: 1 },
    ).lean();

    for (const automation of automations) {
      await models.ApprovalLocks.assertAccess({
        user,
        contentType: AUTOMATION_APPROVAL_CONTENT_TYPES.AUTOMATION,
        contentId: automation._id,
        ownerId: automation.createdBy,
        action: 'edit',
      });
    }

    return models.Automations.archiveAutomations(
      automationIds,
      isRestore as boolean,
    );
  },
  async automationsRemove(
    _root,
    { automationIds }: { automationIds: string[] },
    { models, user, checkPermission }: IContext,
  ) {
    await checkPermission('automationsDelete');

    const automations = await models.Automations.find(
      { _id: { $in: automationIds } },
      { createdBy: 1 },
    ).lean();

    for (const automation of automations) {
      await models.ApprovalLocks.assertAccess({
        user,
        contentType: AUTOMATION_APPROVAL_CONTENT_TYPES.AUTOMATION,
        contentId: automation._id,
        ownerId: automation.createdBy,
        action: 'delete',
      });
    }

    return models.Automations.removeAutomations(automationIds);
  },

  async automationsAiAgentAdd(
    _root,
    doc,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('automationsAiAgentAdd');

    return sanitizeAiAgent(
      await models.AiAgents.createAgent(doc as TAiAgentMutationDoc),
    ) as unknown as Record<string, unknown>;
  },
  async automationsAiAgentEdit(
    _root,
    { _id, ...doc },
    { models, user, checkPermission }: IContext,
  ) {
    await checkPermission('automationsAiAgentEdit');

    await models.ApprovalLocks.assertAccess({
      user,
      contentType: AUTOMATION_APPROVAL_CONTENT_TYPES.AUTOMATION_AI_AGENT,
      contentId: _id,
      action: 'edit',
    });

    return sanitizeAiAgent(
      await models.AiAgents.editAgent(_id, doc as TAiAgentMutationDoc),
    ) as unknown as Record<string, unknown>;
  },

  async automationsAiAgentRemove(
    _root,
    { _id }: { _id: string },
    { models, user, checkPermission }: IContext,
  ) {
    await checkPermission('automationsAiAgentRemove');

    await models.ApprovalLocks.assertAccess({
      user,
      contentType: AUTOMATION_APPROVAL_CONTENT_TYPES.AUTOMATION_AI_AGENT,
      contentId: _id,
      action: 'delete',
    });

    return models.AiAgents.removeAgent(_id);
  },

  async automationsAiAgentReindex(
    _root,
    { _id, fileId }: { _id: string; fileId?: string },
    { models, user }: IContext,
  ) {
    await models.ApprovalLocks.assertAccess({
      user,
      contentType: AUTOMATION_APPROVAL_CONTENT_TYPES.AUTOMATION_AI_AGENT,
      contentId: _id,
      action: 'edit',
    });

    return models.AiAgents.reindexAgent(_id, fileId);
  },


  /**
   * Creates a workflow template
   */
  async automationWorkflowTemplatesAdd(
    _root,
    doc: MutationAutomationWorkflowTemplatesAddArgs,
    { user, models, checkPermission }: IContext,
  ) {
    await checkPermission('automationsCreate');

    return models.AutomationWorkflowTemplates.createWorkflowTemplate({
      ...(doc as unknown as IAutomationWorkflowTemplate),
      createdBy: user._id,
    });
  },

  /**
   * Updates a workflow template (e.g. pushing edits made to an inserted
   * instance back to its source template)
   */
  async automationWorkflowTemplatesEdit(
    _root,
    { _id, ...doc }: MutationAutomationWorkflowTemplatesEditArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('automationsUpdate');

    return models.AutomationWorkflowTemplates.updateWorkflowTemplate(
      _id,
      doc as Partial<IAutomationWorkflowTemplate>,
    );
  },

  /**
   * Removes a workflow template
   */
  async automationWorkflowTemplatesRemove(
    _root,
    { _id }: { _id: string },
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('automationsDelete');

    await models.AutomationWorkflowTemplates.removeWorkflowTemplate(_id);
    return { success: true };
  },
};
