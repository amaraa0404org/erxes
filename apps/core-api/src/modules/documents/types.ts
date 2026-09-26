import { Document } from 'mongoose';

export interface IDocument {
  contentType: string;
  subType: string;
  name: string;
  content: string;
  replacer: string;
  code?: string;
  tagIds?: string[];
}

export interface IDocumentDocument extends IDocument, Document {
  _id: string;
  createdUserId: string;
}

/**
 * Mirrors the generated `QueryDocumentsArgs`/`QueryDocumentsTotalCountArgs`
 * shape: every filter field may arrive as null because the schema marks them
 * nullable.
 */
export interface IDocumentFilterQueryParams {
  searchValue?: string | null;
  sortField?: string | null;
  sortDirection?: number | null;
  limit?: number | null;
  cursor?: string | null;
  direction?: 'forward' | 'backward' | null;
  cursorMode?: 'inclusive' | 'exclusive' | null;
  orderBy?: Record<string, unknown> | null;
  sortMode?: string | null;
  aggregationPipeline?: (Record<string, unknown> | null)[] | null;
  contentType?: string | null;
  subType?: string | null;
  userIds?: (string | null)[] | null;
  dateFilters?: string | null;
  tagIds?: (string | null)[] | null;
}

export type DocumentAccessUser = {
  _id: string;
  isOwner?: boolean;
};

export type DocumentReadInput = {
  _id: string;
  user?: DocumentAccessUser;
  action?: 'view' | 'edit' | 'delete';
};

export type DocumentSaveInput = {
  _id?: string;
  doc: IDocument & { createdUserId: string };
  user?: DocumentAccessUser;
};

export type DocumentProcessInput = {
  _id: string;
  replacerIds?: string[];
  config?: Record<string, unknown>;
  user?: DocumentAccessUser;
};

export const DOCUMENT_APPROVAL_CONTENT_TYPE = 'core:documents';
