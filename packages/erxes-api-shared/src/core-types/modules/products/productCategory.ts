import { Document } from 'mongoose';

export interface IProductCategory {
  name: string;
  code: string;
  order: string;
  scopeBrandIds?: string[];
  description?: string;
  meta?: string;
  parentId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any — attachment
  // documents are owned by the file/core attachment contract
  attachment?: any;
  status?: string;
  maskType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any — mask
  // payloads are variant-shaped per maskType
  mask?: any;
  isSimilarity?: boolean;
  similarities?: {
    id: string;
    groupId: string;
    fieldId: string;
    title: string;
  }[];
}

export interface IProductCategoryDocument extends IProductCategory, Document {
  _id: string;
  createdAt: Date;
}
