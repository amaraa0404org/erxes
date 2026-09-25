import { Document } from 'mongoose';

export interface IRelatedContent {
  contentType: string;
  content: string[];
}

export interface ITemplate {
  name: string;
  description: string;
  contentId: string;
  contentType: string;
  content: string;
  relatedContents: IRelatedContent[];

  createdBy: string;
  updatedBy: string;

  categoryIds?: string[];
}

export interface ITemplateDocument extends ITemplate, Document {
  _id: string;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Filter params accepted by the templateList query. Shaped after the
 * generated args: every field may arrive as `null` from GraphQL.
 */
export interface ITemplateParams {
  searchValue?: string | null;
  contentType?: (string | null)[] | null;
  categoryIds?: (string | null)[] | null;

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
