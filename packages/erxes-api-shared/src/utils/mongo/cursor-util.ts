import { SortOrder, FilterQuery, Model, Types, PipelineStage } from 'mongoose';
import { fixNum } from '../utils';

export interface CursorPaginateParams<T> {
  model: Model<T>;
  params: {
    limit?: number;
    cursor?: string;
    direction?: 'forward' | 'backward';
    orderBy?: Record<string, SortOrder>;
  };
  query?: FilterQuery<T>;
  formatter?: Record<string, CursorFieldType>;
}

export interface CursorPaginateAggregationParams<T> {
  model: Model<T>;
  pipeline?: PipelineStage[];
  params: {
    limit?: number;
    cursor?: string;
    direction?: 'forward' | 'backward';
    orderBy?: Record<string, SortOrder>;
  };
  formatter?: Record<string, CursorFieldType>;
  uniqConcatFields?: string[]; // optional: if unwinded then concat field names
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface CursorResult<T> {
  list: T[];
  totalCount: number;
  pageInfo: PageInfo;
}

export const encodeCursor = (
  item: Record<string, unknown>,
  sortFields: string[],
): string => {
  const cursorData: Record<string, unknown> = {};

  for (const field of sortFields) {
    if (item[field] !== undefined) {
      cursorData[field] = item[field];
    }
  }

  // Handle ObjectId serialization
  const id = item._id;
  cursorData._id = id instanceof Types.ObjectId ? id.toString() : id;

  return Buffer.from(JSON.stringify(cursorData)).toString('base64');
};

export const decodeCursor = (cursor: string): Record<string, unknown> => {
  try {
    const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString()) as
      Record<string, unknown>;

    // Convert _id back to ObjectId if it's a valid ObjectId string
    const id = decoded._id as string | number | Types.ObjectId | undefined;

    if (id && Types.ObjectId.isValid(id)) {
      decoded._id = new Types.ObjectId(id);
    }

    return decoded;
  } catch {
    throw new Error('Invalid cursor format');
  }
};

type CursorFieldType = 'date' | 'number' | 'boolean';
const convertValue = (value: unknown, type: CursorFieldType) => {
  if (value == null) return value;

  switch (type) {
    case 'date':
      return new Date(value as string | number | Date);
    case 'number':
      return fixNum(value, 10);
    case 'boolean':
      return value === 'true' || value === true;
    default:
      return value;
  }
};

export const buildCursorQuery = (
  cursor: string,
  orderBy: Record<string, SortOrder>,
  direction: 'forward' | 'backward',
  formatter?: Record<string, CursorFieldType>,
): Record<string, unknown> => {
  const cursorData = decodeCursor(cursor);

  if (formatter) {
    for (const key of Object.keys(formatter)) {
      if (cursorData[key] !== undefined) {
        cursorData[key] = convertValue(cursorData[key], formatter[key]);
      }
    }
  }

  const sortFields = Object.keys(orderBy);

  if (sortFields.length === 0) {
    const operator = direction === 'forward' ? '$gt' : '$lt';
    return { _id: { [operator]: cursorData._id } };
  }

  const orConditions: Record<string, unknown>[] = [];

  for (let i = 0; i < sortFields.length; i++) {
    const field = sortFields[i];
    const sortOrder = orderBy[field];
    const isAscending = sortOrder === 1 || sortOrder === 'asc';

    const condition: Record<string, unknown> = {};

    for (let j = 0; j < i; j++) {
      const prevField = sortFields[j];
      condition[prevField] = cursorData[prevField];
    }

    const operator =
      direction === 'forward'
        ? isAscending
          ? '$gt'
          : '$lt'
        : isAscending
        ? '$lt'
        : '$gt';

    if (cursorData[field] !== undefined) {
      condition[field] = { [operator]: cursorData[field] };
      orConditions.push(condition);
    }
  }

  const finalCondition: Record<string, unknown> = {};
  for (const field of sortFields) {
    if (cursorData[field] !== undefined) {
      finalCondition[field] = cursorData[field];
    }
  }

  const idOperator = direction === 'forward' ? '$gt' : '$lt';
  finalCondition._id = { [idOperator]: cursorData._id };
  orConditions.push(finalCondition);

  return orConditions.length > 0 ? { $or: orConditions } : {};
};
