import {
  IAutomationAction,
  IAutomationExecution,
  IAutomationTrigger,
} from '../../../core-modules/automations/definitions';


export type ICheckTriggerData = {
  collectionType: string;
  automationId: string;
  trigger: IAutomationTrigger;
  // Target shape is defined by the automation's trigger type at runtime.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any;
  // Action config shape is defined per action type by the owning service.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
