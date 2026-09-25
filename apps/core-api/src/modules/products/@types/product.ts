/**
 * Mirrors the `productsMain`/`products`/`cpProducts`/`productsTotalCount`
 * GraphQL argument shape: every input is optional and may arrive as null.
 * Resolvers normalize nulls before handing values to models/paginators.
 */
export interface IProductParams {
  ids?: (string | null)[] | null;
  excludeIds?: boolean | null;
  type?: string | null;
  status?: string | null;
  categoryId?: string | null;
  categoryIds?: (string | null)[] | null;
  vendorId?: string | null;
  brand?: string | null;
  brandIds?: (string | null)[] | null;
  tag?: string | null;
  tagIds?: (string | null)[] | null;
  excludeTagIds?: (string | null)[] | null;
  tagWithRelated?: boolean | null;
  sortField?: string | null;
  sortDirection?: number | null;
  sortMode?: string | null;
  boardId?: string | null;
  segment?: string | null;
  segmentIds?: (string | null)[] | null;
  propertiesData?: string | null;
  groupedSimilarity?: string | null;
  similarity?: boolean | null;
  image?: string | null;
  branchId?: string | null;
  departmentId?: string | null;
  minRemainder?: number | null;
  maxRemainder?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  minDiscountValue?: number | null;
  maxDiscountValue?: number | null;
  minDiscountPercent?: number | null;
  maxDiscountPercent?: number | null;
  discountConditions?: Record<string, unknown> | null;
  // offset pagination
  searchValue?: string | null;
  page?: number | null;
  perPage?: number | null;
  // cursor pagination
  limit?: number | null;
  cursor?: string | null;
  direction?: 'forward' | 'backward' | null;
  cursorMode?: 'inclusive' | 'exclusive' | null;
  orderBy?: Record<string, unknown> | null;
  aggregationPipeline?: (Record<string, unknown> | null)[] | null;
}
