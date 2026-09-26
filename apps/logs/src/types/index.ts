export type StatusType = 'success' | 'failed';
export type SourceType = 'graphql' | 'mongo' | 'auth' | 'webhook';

/**
 * Document-change payload produced by the instrumented writers that enqueue
 * `put_log` jobs. Only the fields the logs service inspects are declared;
 * everything else is carried through untouched into the stored log document.
 */
export interface ILogJobPayload {
  collectionName?: string;
  docId?: string;
  docIds?: string | string[];
  action?: string;
  fullDocument?: Record<string, unknown>;
  prevDocument?: unknown;
  prevDocuments?: unknown[];
  updateDescription?: Record<string, unknown>;
  updates?: {
    docId: string;
    updateDescription?: Record<string, unknown>;
  }[];
  operationType?: string;
  dbName?: string;
  [field: string]: unknown;
}

export type IJobData = {
  subdomain: string;
  source: SourceType;
  status: StatusType;
  action: string;
  contentType?: string;
  payload: ILogJobPayload;
  userId?: string;
  processId?: string;
  docIds?: string[];
  docId?: string;
};

export type AfterProcessProps = {
  source: SourceType;
  action: string;
  payload: Record<string, unknown>;
  contentType?: string;
};
