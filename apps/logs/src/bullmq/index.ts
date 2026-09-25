import type { Redis } from 'ioredis';
import { activityLogWorker } from './activityLogs/activityLogWorker';
import { eventLogWorker } from './eventLogs/eventLogWorker';
import { segmentWorker } from './segments/segmentWorker';

export const initMQWorkers = async (redis: Redis) => {
  console.info('Starting worker log ...');

  console.info('Initialized databases');
  return await Promise.all([
    eventLogWorker(),
    activityLogWorker(),
    segmentWorker(),
  ]);
};
