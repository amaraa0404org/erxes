import { Document } from 'mongoose';

export interface ILogDoc {
  subdomain: string;
  source: 'webhook' | 'graphql' | 'mongo' | 'auth';
  action: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any — persisted
  // log payload is arbitrary per source/action
  payload: any;
  userId?: string;
  executionTime?: {
    startDate: Date;
    endDate: Date;
    durationMs: number;
  };
  status?: 'failed' | 'success';
  processId?: string;
}

export interface ILog {
  createdAt: Date;
  userId?: string;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any — persisted
  // log payload is arbitrary per source/action
  payload?: any;
  action?: string;
  docId?: string;
  source: string;
}

export interface ILogDocument extends Document, ILog {
  _id: string;
}
