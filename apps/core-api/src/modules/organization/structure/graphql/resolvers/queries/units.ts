import { AnyResolver } from 'erxes-api-shared/core-types';
import { IContext } from '~/connectionResolvers';
import { cursorPaginate } from 'erxes-api-shared/utils';
import { FilterQuery } from 'mongoose';
import { IUnitDocument } from '@/organization/structure/@types/structure';
import {
  QueryCpUnitsArgs,
  QueryResolvers,
  QueryUnitDetailArgs,
  QueryUnitsArgs,
  QueryUnitsMainArgs,
} from '~/__generated__/graphql';
import { toCursorPaginateParams } from './utils';

// Escapes regex special characters to prevent injection
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const unitsQueries: QueryResolvers<IContext> = {
  async units(_parent, { searchValue }: QueryUnitsArgs, { models }) {
    const filter: FilterQuery<IUnitDocument> = {};

    if (searchValue) {
      const escaped = escapeRegExp(searchValue.trim());
      const regexOption = {
        $regex: escaped,
        $options: 'i',
      };

      filter.$or = [{ title: regexOption }, { description: regexOption }];
    }

    return models.Units.find(filter).sort({ title: 1 });
  },

  async unitsMain(_parent, params: QueryUnitsMainArgs, { models }) {
    const filter: FilterQuery<IUnitDocument> = {};

    if (params.searchValue) {
      const escaped = escapeRegExp(params.searchValue.trim());
      const regex = {
        $regex: escaped,
        $options: 'i',
      };

      filter.$or = [{ title: regex }, { description: regex }];
    }

    const { list, totalCount, pageInfo } = await cursorPaginate({
      model: models.Units,
      params: toCursorPaginateParams(params),
      query: filter,
    });

    return { list, totalCount, pageInfo };
  },

  async unitDetail(_parent, { _id }: QueryUnitDetailArgs, { models }) {
    return models.Units.getUnit({ _id });
  },

  async cpUnits(_parent, { searchValue }: QueryCpUnitsArgs, { models }) {
    const filter: FilterQuery<IUnitDocument> = {};

    if (searchValue) {
      const escaped = escapeRegExp(searchValue.trim());
      const regexOption = {
        $regex: escaped,
        $options: 'i',
      };

      filter.$or = [{ title: regexOption }, { description: regexOption }];
    }

    return models.Units.find(filter)
      .select({
        _id: 1,
        title: 1,
        code: 1,
        description: 1,
        departmentId: 1,
        userIds: 1,
      })
      .sort({ title: 1 });
  },
};

(unitsQueries.cpUnits as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
