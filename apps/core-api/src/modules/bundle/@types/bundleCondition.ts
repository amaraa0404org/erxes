import { Document } from 'mongoose';

export interface IBundleCondition {
  code?: string | null;
  name?: string | null;
  description?: string | null;
  userId?: string | null;
  isDefault?: boolean | null;
}

export interface IBundleConditionDocument extends IBundleCondition, Document {
  _id: string;
  createdAt: Date;
}
