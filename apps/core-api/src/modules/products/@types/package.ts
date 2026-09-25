import { Document } from 'mongoose';

export interface IPackageProduct {
  productId: string;
  quantity: number;
}

export interface IPackage {
  name?: string;
  description?: string;
  coverImage?: string;
  products: IPackageProduct[];
  tagIds?: string[];
  price?: number;
  percent?: number;
  status?: string;
}

export interface IPackageDocument extends IPackage, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPackageParams {
  searchValue?: string | null;
  status?: string | null;
  ids?: (string | null)[] | null;
  tagIds?: (string | null)[] | null;
  // cursor pagination
  limit?: number | null;
  cursor?: string | null;
  direction?: 'forward' | 'backward' | null;
  cursorMode?: 'inclusive' | 'exclusive' | null;
  orderBy?: Record<string, unknown> | null;
  sortMode?: string | null;
  aggregationPipeline?: (Record<string, unknown> | null)[] | null;
}
