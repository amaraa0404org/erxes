import { Document } from 'mongoose';

export interface IProductCategory {
  name: string;
  code: string;
  order: string;
  scopeBrandIds?: string[];
  description?: string;
  meta?: string;
  parentId?: string;
  // Attachment documents are owned by the file/core attachment contract.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attachment?: any;
  status?: string;
  maskType?: string;
  // Mask payloads are variant-shaped per maskType.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
