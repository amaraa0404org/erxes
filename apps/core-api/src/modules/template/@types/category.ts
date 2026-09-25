import { Document } from 'mongoose';

export interface ITemplateCategory {
  name: string;
  parentId: string;
  code: string;

  createdBy: string;

  updatedBy: string;
}

export interface ITemplateCategoryDocument extends ITemplateCategory, Document {
  _id: string;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Filter params accepted by the templateCategories query. Shaped after the
 * generated args: every field may arrive as `null` from GraphQL.
 */
export interface ITemplateCategoryParams {
  searchValue?: string | null;
  types?: (string | null)[] | null;
  parentIds?: (string | null)[] | null;

  createdBy?: string | null;
  updatedBy?: string | null;

  dateFilters?: string | null;

  limit?: number | null;
  cursor?: string | null;
  direction?: 'forward' | 'backward' | null;
  cursorMode?: 'inclusive' | 'exclusive' | null;
  orderBy?: Record<string, unknown> | null;
  sortMode?: string | null;
  aggregationPipeline?: (Record<string, unknown> | null)[] | null;
}
