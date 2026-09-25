/**
 * Filter params accepted by the tags/cpTags GraphQL queries. Shaped after the
 * generated args: every field may arrive as `null` from GraphQL.
 */
export interface ITagFilterQueryParams {
  type?: string | null;
  tagIds?: (string | null)[] | null;
  parentId?: string | null;
  isGroup?: boolean | null;
  ids?: (string | null)[] | null;
  instanceId?: string | null;
  excludeIds?: boolean | null;
  includeWorkspaceTags?: boolean | null;
  searchValue?: string | null;
  sortField?: string | null;
  limit?: number | null;
  cursor?: string | null;
  direction?: 'forward' | 'backward' | null;
  cursorMode?: 'inclusive' | 'exclusive' | null;
  orderBy?: Record<string, unknown> | null;
  sortMode?: string | null;
  aggregationPipeline?: (Record<string, unknown> | null)[] | null;
}
