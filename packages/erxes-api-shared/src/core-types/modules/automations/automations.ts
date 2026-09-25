import {
  IAutomationAction,
  IAutomationExecution,
  IAutomationTrigger,
} from '../../../core-modules/automations/definitions';


export type ICheckTriggerData = {
  collectionType: string;
  automationId: string;
  trigger: IAutomationTrigger;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any — target shape
  // is defined by the automation's trigger type at runtime
  target: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any — action
  // config shape is defined per action type by the owning service
  config: any;
};

export type IAutomationReceiveActionData = {
  action: IAutomationAction;
  execution: { _id: string } & IAutomationExecution;
  actionType: string;
  collectionType: string;
  triggerType: string;
  targetType: string;
};
