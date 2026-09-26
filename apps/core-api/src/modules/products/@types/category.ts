export interface IProductCategoryParams {
  parentId?: string | null;
  searchValue?: string | null;
  status?: string | null;
  withChild?: boolean | null;
  brandIds?: (string | null)[] | null;
  meta?: string | number | null;
  ids?: (string | null)[] | null;
}
