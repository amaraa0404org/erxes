import { USER_ROLES } from 'erxes-api-shared/core-modules';
import { IUserDocument } from 'erxes-api-shared/core-types';
import { cursorPaginate } from 'erxes-api-shared/utils';
import { FilterQuery, SortOrder } from 'mongoose';
import {
  Cursor_Direction,
  QueryAllUsersArgs,
  QueryResolvers,
  QueryUserDetailArgs,
  QueryUserMovementsArgs,
  QueryUsersArgs,
  QueryUsersTotalCountArgs,
} from '~/__generated__/graphql';
import { IContext, IModels } from '~/connectionResolvers';

type IListArgs = {
  sortDirection?: number | null;
  sortField?: string | null;
  searchValue?: string | null;
  excludeIds?: boolean | null;
  isActive?: boolean | null;
  requireUsername?: boolean | null;
  ids?: Array<string | null> | null;
  email?: string | null;
  status?: string | null;
  brandIds?: Array<string | null> | null;
  departmentId?: string | null;
  branchId?: string | null;
  isAssignee?: boolean | null;
  departmentIds?: Array<string | null> | null;
  branchIds?: Array<string | null> | null;
  unitId?: string | null;
  segment?: string | null;
};

const NORMAL_USER_SELECTOR = { role: { $ne: USER_ROLES.SYSTEM } };

const toCursorPaginateParams = (params: {
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

const queryBuilder = async (params: IListArgs, models: IModels) => {
  const {
    searchValue,
    isActive,
    requireUsername,
    status,
    excludeIds,
    departmentId,
    branchId,
    unitId,
  } = params;

  const ids = params.ids?.filter((id): id is string => Boolean(id));
  const brandIds = params.brandIds?.filter((id): id is string => Boolean(id));
  const departmentIds = params.departmentIds?.filter((id): id is string =>
    Boolean(id),
  );
  const branchIds = params.branchIds?.filter((id): id is string =>
    Boolean(id),
  );

  const selector: FilterQuery<IUserDocument> = {
    isActive,
  };
  if (searchValue) {
    const fields = [
      { email: new RegExp(`.*${params.searchValue}.*`, 'i') },
      { employeeId: new RegExp(`.*${params.searchValue}.*`, 'i') },
      { username: new RegExp(`.*${params.searchValue}.*`, 'i') },
      { 'details.fullName': new RegExp(`.*${params.searchValue}.*`, 'i') },
      { 'details.position': new RegExp(`.*${params.searchValue}.*`, 'i') },
    ];

    selector.$or = fields;
  }

  if (requireUsername) {
    selector.username = { $ne: null };
  }

  if (isActive === undefined || isActive === null) {
    selector.isActive = true;
  }

  if (ids && ids.length > 0) {
    if (excludeIds) {
      selector._id = { $nin: ids };
    } else {
      selector._id = { $in: ids };
    }
  }

  if (status) {
    selector.registrationToken = { $eq: null };
  }

  if (brandIds && brandIds.length > 0) {
    selector.brandIds = { $in: brandIds };
  }

  if (branchId) {
    selector.branchIds = { $in: [branchId] };
  }

  if (departmentId) {
    selector.departmentIds = { $in: [departmentId] };
  }

  if (branchIds && branchIds.length > 0) {
    selector.branchIds = { $in: branchIds };
  }

  if (departmentIds && departmentIds.length > 0) {
    selector.departmentIds = { $in: departmentIds };
  }

  if (unitId) {
    const unit = await models.Units.findOne({ _id: unitId }).lean();
    const unitUserIds = unit?.userIds || [];

    selector._id = selector._id
      ? { ...selector._id, $in: unitUserIds }
      : { $in: unitUserIds };
  }

  return selector;
};

export const userQueries: QueryResolvers<IContext> = {
  async userMovements(_parent, args: QueryUserMovementsArgs, { models }) {
    return await models.UserMovements.find(args).sort({ createdAt: -1 });
  },
  async usersTotalCount(_parent, args: QueryUsersTotalCountArgs, { models }) {
    const selector = {
      ...(await queryBuilder(args, models)),
      ...NORMAL_USER_SELECTOR,
    };

    return models.Users.countDocuments(selector);
  },

  async userDetail(_parent, { _id }: QueryUserDetailArgs, { models }) {
    return models.Users.findOne({ _id });
  },

  async allUsers(_parent, args: QueryAllUsersArgs, { user, models }) {
    const { searchValue, isActive, assignedToMe } = args;
    const ids = args.ids?.filter((id): id is string => Boolean(id));

    const selector: FilterQuery<IUserDocument> = {};

    if (searchValue) {
      const fields = [
        { email: new RegExp(`.*${searchValue}.*`, 'i') },
        { employeeId: new RegExp(`.*${searchValue}.*`, 'i') },
        { username: new RegExp(`.*${searchValue}.*`, 'i') },
        { 'details.fullName': new RegExp(`.*${searchValue}.*`, 'i') },
        { 'details.position': new RegExp(`.*${searchValue}.*`, 'i') },
      ];

      selector.$or = fields;
    }

    if (isActive) {
      selector.isActive = true;
    }
    if (ids?.length) {
      selector._id = { $in: ids };
    }
    if (assignedToMe === 'true') {
      selector._id = user._id;
    }

    return models.Users.find({ ...selector, ...NORMAL_USER_SELECTOR }).sort({
      username: 1,
    });
  },

  async users(_parent, args: QueryUsersArgs, { models }) {
    const selector = {
      ...(await queryBuilder(args, models)),
      ...NORMAL_USER_SELECTOR,
    };

    const { list, totalCount, pageInfo } = await cursorPaginate<IUserDocument>({
      model: models.Users,
      params: toCursorPaginateParams(args),
      query: selector,
    });

    return { list, totalCount, pageInfo };
  },
};
