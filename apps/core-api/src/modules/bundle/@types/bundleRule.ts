import { IProduct } from 'erxes-api-shared/core-types';
import { Document } from 'mongoose';

export interface IBundleRuleItem {
  code: string;
  productIds?: string[] | null;
  products?: IProduct[];
  allowSkip?: boolean | null;
  quantity?: number | null;
  priceType?: string | null;
  priceAdjustType?: string | null;
  priceAdjustFactor?: string | null;
  priceValue?: number | null;
  percent?: number | null;
}
export interface IBundleRule {
  code?: string | null;
  name?: string | null;
  description?: string | null;
  rules?: IBundleRuleItem[] | null;
}

export interface IBundleRuleDocument extends IBundleRule, Document {
  _id: string;
  createdAt: Date;
}
