import { IProductDocument } from 'erxes-api-shared/core-types';
import { PRODUCT_SIMILARITY_STATUSES } from '@/products/constants';
import { IContext } from '~/connectionResolvers';
import { IProductParams } from '~/modules/products/@types';

type DiscountConditions = Record<string, unknown>;
type ProductDiscount = {
  planId: string;
  discount: number;
  discountPercent: number;
  prefixes: string[];
  conditions: DiscountConditions;
  base?: boolean | null;
};

const inventoryKey = (id?: string) => id || '_';

const compactDiscountConditions = (conditions: DiscountConditions = {}) =>
  Object.entries(conditions).reduce<DiscountConditions>(
    (result, [key, value]) => {
      if (value === undefined || value === null || value === '') {
        return result;
      }

      result[key] = value;
      return result;
    },
    {},
  );

const getDiscountConditions = (
  params: Partial<IProductParams> = {},
): DiscountConditions =>
  compactDiscountConditions({
    ...params.discountConditions,
    branchId: params.branchId,
    departmentId: params.departmentId,
  });

const isRangeCondition = (
  value: unknown,
): value is { start?: string | number; end?: string | number } =>
  !!value && typeof value === 'object' && !Array.isArray(value);

const conditionMatches = (expected: unknown, actual: unknown) => {
  if (actual === undefined || actual === null) {
    return false;
  }

  if (Array.isArray(expected)) {
    return expected.includes(actual as never);
  }

  if (isRangeCondition(expected)) {
    const { start, end } = expected;
    const actualValue = actual as string | number;

    if (start !== undefined && actualValue < start) {
      return false;
    }

    if (end !== undefined && actualValue > end) {
      return false;
    }

    return true;
  }

  if (typeof expected === 'number' && typeof actual === 'number') {
    return actual >= expected;
  }

  return expected === actual;
};

export const getMatchingDiscount = (
  discounts: unknown,
  conditions: DiscountConditions,
  base = false,
) => {
  return ((Array.isArray(discounts) ? discounts : []) as ProductDiscount[])
    .filter(
      (discount) =>
        (discount.base === true) === base &&
        (discount.prefixes || []).every((prefix) =>
          conditionMatches(discount.conditions?.[prefix], conditions[prefix]),
        ),
    )
    .sort((a, b) => b.discount - a.discount)[0];
};

const BASE_SCOPE_FIELDS = ['branchId', 'departmentId', 'pipelineId'] as const;

export const getMatchingBaseDiscount = (
  discounts: unknown,
  conditions: DiscountConditions,
) => {
  return ((Array.isArray(discounts) ? discounts : []) as ProductDiscount[])
    .filter((discount) => {
      if (discount.base !== true) {
        return false;
      }

      const comparableFields = BASE_SCOPE_FIELDS.filter(
        (field) =>
          discount.conditions?.[field] !== undefined &&
          conditions[field] !== undefined,
      );

      return (
        comparableFields.length > 0 &&
        comparableFields.every((field) =>
          conditionMatches(discount.conditions?.[field], conditions[field]),
        )
      );
    })
    .sort((a, b) => b.discount - a.discount)[0];
};

export default {
  __resolveReference: async (
    { _id }: { _id: string },
    { models }: IContext,
  ) => {
    return models.Products.findOne({ _id });
  },
  category: async (
    product: IProductDocument,
    _args: undefined,
    { models }: IContext,
  ) => {
    if (!product.categoryId) {
      return null;
    }

    return models.ProductCategories.findOne({ _id: product.categoryId });
  },
  vendor: async (
    product: IProductDocument,
    _args: undefined,
    { models }: IContext,
  ) => {
    if (!product.vendorId) {
      return null;
    }

    return models.Companies.findOne({ _id: product.vendorId });
  },

  remainder: async (
    product: IProductDocument,
    _args: undefined,
    _context: IContext,
    info: any,
  ) => {
    const { branchId, departmentId } = info?.variableValues || {};
    const { branchIds, departmentIds } = info?.variableValues || {};

    if (branchId || departmentId) {
      const branchKey = inventoryKey(branchId);
      const departmentKey = inventoryKey(departmentId);
      const { remainder, cost, soonIn, soonOut } =
        product?.inventories?.[branchKey]?.[departmentKey] || {};
      return { remainder, cost, soonIn, soonOut };
    }

    const result = { remainder: 0, cost: 0, soonIn: 0, soonOut: 0 };

    for (const branchID of Object.keys(product.inventories || {})) {
      if (branchIds?.length && !branchIds.includes(branchID)) {
        continue;
      }

      for (const departmentID of Object.keys(
        product.inventories?.[branchID] || {},
      )) {
        if (departmentIds?.length && !departmentIds.includes(departmentID)) {
          continue;
        }

        const {
          remainder = 0,
          cost = 0,
          soonIn = 0,
          soonOut = 0,
        } = product.inventories?.[branchID]?.[departmentID] || {};
        result.remainder += remainder;
        result.cost += cost;
        result.soonIn += soonIn;
        result.soonOut += soonOut;
      }
    }
    return result;
  },

  discount: async (
    product: IProductDocument,
    args: IProductParams,
    _context: IContext,
    info: any,
  ) => {
    return getMatchingDiscount(
      product.discounts,
      getDiscountConditions({
        ...info?.variableValues,
        ...args,
      }),
    );
  },

  similarity: async (
    product: IProductDocument,
    _args: undefined,
    { models }: IContext,
  ) => {
    if (!product.similarityId) {
      return null;
    }

    return models.ProductSimilarities.findOne({
      _id: product.similarityId,
      status: { $ne: PRODUCT_SIMILARITY_STATUSES.DELETED },
    }).lean();
  },

  uom: async (
    product: IProductDocument,
    _args: undefined,
    { models }: IContext,
  ) => {
    if (!product.uom) {
      return null;
    }

    const uom = await models.Uoms.findOne({
      $or: [{ _id: product.uom }, { name: product.uom }, { code: product.uom }],
    }).lean();

    if (!uom) {
      return null;
    }

    return uom?.name || uom?.code || '';
  },
};
