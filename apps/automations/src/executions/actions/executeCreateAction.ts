import { setWaitActionResponse } from '../setWaitActionResponse';
import {
  AUTOMATION_DEFERRED_TIMEOUT,
  AUTOMATION_ERROR_CODES,
  AutomationExecutionSetWaitCondition,
  EXECUTE_WAIT_TYPES,
  IAutomationAction,
  IAutomationDeferredMarker,
  IAutomationExecutionDocument,
  splitType,
  TAutomationProducers,
} from 'erxes-api-shared/core-modules';
import { sendCoreModuleProducer } from 'erxes-api-shared/utils';
import { AutomationActionError } from '../errorCodes';

type TCreateActionResponse = Promise<{
  shouldBreak: boolean;
  actionResponse: any;
  deferred?: IAutomationDeferredMarker;
}>;

/**
 * What the owning plugin's `automations.receiveActions` hands back. `result`
 * is the plugin's own action output; `error`, `waitCondition` and `deferred`
 * steer what this service does with it.
 */
type TReceiveActionsResponse = {
  error?: string;
  result?: unknown;
  waitCondition?: Extract<
    AutomationExecutionSetWaitCondition,
    { type: EXECUTE_WAIT_TYPES.CHECK_OBJECT }
  >;
  deferred?: unknown;
};

/**
 * Only a well-formed marker defers an action, and the plugin never gets to
 * park the flow for longer than the platform allows.
 */
const resolveDeferredMarker = (
  marker: unknown,
): IAutomationDeferredMarker | undefined => {
  const { jobId, mode, timeoutMinutes } = (marker ??
    {}) as Partial<IAutomationDeferredMarker>;

  if (!jobId || (mode !== 'ignore' && mode !== 'standby')) {
    return undefined;
  }

  const { DEFAULT_MINUTES, MAX_MINUTES } = AUTOMATION_DEFERRED_TIMEOUT;
  const requested = Number(timeoutMinutes);

  return {
    jobId,
    mode,
    timeoutMinutes:
      Number.isFinite(requested) && requested > 0
        ? Math.min(requested, MAX_MINUTES)
        : DEFAULT_MINUTES,
  };
};

export const executeCreateAction = async (
  subdomain: string,
  execution: IAutomationExecutionDocument,
  action: IAutomationAction,
): TCreateActionResponse => {
  const [pluginName, moduleName, collectionType, actionType] = splitType(
    action.type,
  );

  const pluginResponse = await sendCoreModuleProducer<
    'automations',
    TAutomationProducers.RECEIVE_ACTIONS,
    TReceiveActionsResponse | null
  >({
    subdomain,
    moduleName: 'automations',
    pluginName,
    producerName: TAutomationProducers.RECEIVE_ACTIONS,
    input: {
      moduleName,
      actionType,
      action,
      execution,
      collectionType,
    },
    defaultValue: null,
  });

  if (!pluginResponse) {
    throw new AutomationActionError(
      `Plugin "${pluginName}" did not answer the action`,
      AUTOMATION_ERROR_CODES.PLUGIN_ACTION_FAILED,
    );
  }

  if (pluginResponse.error) {
    // The failure happened inside the owning plugin; only its message crosses
    // the producer boundary.
    throw new AutomationActionError(
      pluginResponse.error,
      AUTOMATION_ERROR_CODES.PLUGIN_ACTION_FAILED,
    );
  }

  let actionResponse: unknown = pluginResponse;

  const waitCondition = pluginResponse.waitCondition;
  let shouldBreak = false;

  if (waitCondition) {
    await setWaitActionResponse(subdomain, execution, action, waitCondition);
    actionResponse = pluginResponse.result;
    shouldBreak = true;
  }

  // The owning plugin queued the work itself and told us how to carry on.
  const deferred = shouldBreak
    ? undefined
    : resolveDeferredMarker(pluginResponse.deferred);

  if (deferred) {
    actionResponse = pluginResponse.result ?? null;
  }

  return { shouldBreak, actionResponse, deferred };
};
