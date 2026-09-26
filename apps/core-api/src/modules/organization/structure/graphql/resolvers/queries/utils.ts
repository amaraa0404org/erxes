import { STRUCTURE_STATUSES } from 'erxes-api-shared/core-modules';
import { IUserDocument } from 'erxes-api-shared/core-types';
import { escapeRegExp } from 'erxes-api-shared/utils';
import { FilterQuery, SortOrder } from 'mongoose';
import { Cursor_Direction } from '~/__generated__/graphql';
import { IModels } from '~/connectionResolvers';
import {
  IBranchDocument,
  IDepartmentDocument,
} from '@/organization/structure/@types/structure';

export interface IStructureFilterParams {
  ids?: Array<string | null> | null;
  excludeIds?: boolean | null;
  status?: string | null;
  onlyFirstLevel?: boolean | null;
  parentId?: string | null;
  searchValue?: string | null;
  withoutUserFilter?: boolean | null;
}

export const toCursorPaginateParams = (params: {
  limit?: number | null;
  cursor?: string | null;
  direction?: Cursor_Direction | null;
  orderBy?: Record<string, unknown> | null;
}): {
  limit?: number;
  cursor?: string;
  direction?: 'forward' | 'backward';
  orderBy?: Record<string, SortOrder>;
} => ({
  limit: params.limit ?? undefined,
  cursor: params.cursor ?? undefined,
  direction:
    params.direction === Cursor_Direction.Backward ? 'backward' : 'forward',
  orderBy: params.orderBy as Record<string, SortOrder> | undefined,
});

const getFilterOrder = async (
  models: IModels,
  type: string,
  user: IUserDocument,
  params: IStructureFilterParams,
) => {
  if (type !== 'branch' && type !== 'department') {
    return;
  }

  if (params.withoutUserFilter || user.isOwner) {
    return;
  }

  if (
    !(await models.Configs.findOne({
      code: 'CHECK_TEAM_MEMBER_SHOWN',
      value: true,
    }))
  ) {
    return;
  }

  let fieldName = '';
  let userField = '';
  let collection;

  if (type === 'branch') {
    fieldName = 'BRANCHES';
    userField = 'branchIds';
    collection = models.Branches;
  }

  if (type === 'department') {
    fieldName = 'DEPARTMENTS';
    userField = 'departmentIds';
    collection = models.Departments;
  }

  const mastersStructure = await models.Configs.findOne({
    code: `${fieldName}_MASTER_TEAM_MEMBERS_IDS`,
    value: { $in: [user._id] },
  });
  if (mastersStructure) {
    return;
  }

  const userDetail = await models.Users.findOne({ _id: user._id });
  const items = await collection!.find({
    _id: { $in: userDetail?.[userField] },
  });

  const itemOrders = items.map((item) => new RegExp(item.order, 'i'));

  return { $in: itemOrders };
};

const getFilterOrderSearch = async (
  models: IModels,
  type: string,
  structureFilter:
    | FilterQuery<IBranchDocument>
    | FilterQuery<IDepartmentDocument>,
  filterOrder?: { $in: RegExp[] },
) => {
  let collection;

  if (type === 'branch') {
    collection = models.Branches;
  }

  if (type === 'department') {
    collection = models.Departments;
  }

  if (filterOrder) {
    (structureFilter as Record<string, unknown>).order = filterOrder;
  }

  const structureCodes = (await collection!.find(structureFilter))
    .map((structure) => structure.code)
    .filter(Boolean)
    .map(escapeRegExp);

  if (!structureCodes.length) {
    return { $in: [] };
  }

  return {
    $regex: new RegExp(`(^|/)(${structureCodes.join('|')})/`),
  };
};

export const generateFilters = async ({
  models,
  user,
  type,
  params,
}: {
  models: IModels;
  user: IUserDocument;
  type: string;
  params: IStructureFilterParams;
}) => {
  const filter: Record<string, unknown> = {
    status: { $ne: STRUCTURE_STATUSES.DELETED },
  };

  if (params?.ids?.length) {
    filter._id = { [params.excludeIds ? '$nin' : '$in']: params.ids };
  }

  if (params.status) {
    filter.status = params.status;
  }

  if (params.onlyFirstLevel) {
    filter.parentId = { $in: [null, ''] };
  }

  if (params?.parentId) {
    filter.parentId = params.parentId;
  }

  const filterOrder = await getFilterOrder(models, type, user, params);

  if (filterOrder) {
    filter.order = filterOrder;
  }

  if (params.searchValue) {
    const regexOption = {
      $regex: `.*${params.searchValue.trim()}.*`,
      $options: 'i',
    };

    const structureFilter: Record<string, unknown> = {
      $or: [
        { title: regexOption },
        { description: regexOption },
        { code: regexOption },
      ],
    };

    if (type === 'position') {
      return { $and: [filter, structureFilter] };
    }

    if (type === 'department' || type === 'branch') {
      filter.order = await getFilterOrderSearch(
        models,
        type,
        structureFilter as
          | FilterQuery<IBranchDocument>
          | FilterQuery<IDepartmentDocument>,
        filter.order as { $in: RegExp[] } | undefined,
      );
    }
  }

  return filter;
};
