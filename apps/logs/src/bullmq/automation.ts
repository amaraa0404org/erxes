import { sendWorkerQueue } from 'erxes-api-shared/utils';

export const sendAutomationTrigger = async (
  subdomain: string,
  payload: { operationType?: string; fullDocument?: unknown },
  contentType: string,
) => {
  const recordType = payload.operationType === 'insert' ? 'new' : 'existing';

  sendWorkerQueue('automations', 'trigger').add(
    'trigger',
    {
      subdomain,
      data: {
        type: contentType,
        targets: [payload?.fullDocument],
        recordType: recordType,
      },
    },
    {
      removeOnComplete: true,
      removeOnFail: false,
    },
  );
};
