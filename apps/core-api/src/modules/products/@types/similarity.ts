import { IAttachment, IPdfAttachment } from 'erxes-api-shared/core-types';
import { Document } from 'mongoose';

export interface IProductSimilarityInfo {
  name?: string;
  shortName?: string;
  code: string;
  categoryId?: string;
  type?: string;
  description?: string;
  unitPrice?: number;
  currency?: string;
  uom?: string;
  // mirrors IProduct.subUoms ({ uom, ratio } entries); ISubUom is not
  // exported from erxes-api-shared, so the shape is spelled out here.
  subUoms?: { uom: string; ratio: number }[];
  vendorId?: string;
  scopeBrandIds?: string[];
  barcodeDescription?: string;
  attachment?: IAttachment;
  attachmentMore?: IAttachment[];
  pdfAttachment?: IPdfAttachment;
}

export interface IProductSimilarityRow {
  productId?: string;
  code: string;
  name?: string;
  unitPrice?: number;
  isExcluded?: boolean;
  isDefault?: boolean;
  propertiesData: Record<string, string[]>;
}

export interface IProductSimilarity {
  status?: string;
  info: IProductSimilarityInfo;
  propertiesData: Record<string, unknown>;
  productIds?: string[];
  starProductId?: string;
}

export interface IProductSimilarityDocument
  extends IProductSimilarity, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductSimilarityBulkInput {
  _id?: string;
  info: IProductSimilarityInfo;
  propertiesData: Record<string, unknown>;
  rows: IProductSimilarityRow[];
}
