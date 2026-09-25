import { initTRPC } from '@trpc/server';
import { IProductCategory } from 'erxes-api-shared/core-types';
import { escapeRegExp } from 'erxes-api-shared/utils';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';

const t = initTRPC.context<CoreTRPCContext>().create();

const mongoQuerySchema = z.record(z.unknown());

const mongoSortSchema = z.record(
  z.union([
    z.literal(1),
    z.literal(-1),
    z.enum(['asc', 'ascending', 'desc', 'descending']),
    z.object({ $meta: z.string() }),
  ]),
);

/** Category create/update docs are validated structurally by the Mongoose
 *  schema; the tRPC boundary only needs to reject non-object payloads. */
const categoryDocSchema = z.custom<IProductCategory>(
  (v) => typeof v === 'object' && v !== null && !Array.isArray(v),
);

export const productCategoryTrpcRouter = t.router({
  productCategories: t.router({
    find: t.procedure
      .input(
        z.object({
          query: mongoQuerySchema.optional(),
          sort: mongoSortSchema.optional(),
          regData: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { query, sort, regData } = input;
        const { models } = ctx;

        if (regData) {
          return await models.ProductCategories.find({
            ...query,
            order: { $regex: new RegExp(escapeRegExp(regData)) },
          }).sort(sort);
        }

        return models.ProductCategories.find(query || {}).sort(sort).lean();
      }),

    findOne: t.procedure
      .input(mongoQuerySchema)
      .query(async ({ ctx, input }) => {
        const query = mongoQuerySchema.parse(
          input.query || input.selector || input,
        );
        const { models } = ctx;
        if (!query || !Object.keys(query).length) {
          return {};
        }

        const productCategory =
          await models.ProductCategories.findOne(query).lean();

        return productCategory;
      }),

    withChilds: t.procedure
      .input(z.object({ ids: z.array(z.string()) }))
      .query(async ({ ctx, input }) => {
        const { ids } = input;
        const { models } = ctx;

        const productCategories =
          await models.ProductCategories.getChildCategories(ids);

        return productCategories;
      }),

    createProductCategory: t.procedure
      .input(z.object({ doc: categoryDocSchema }))
      .mutation(async ({ ctx, input }) => {
        const { doc } = input;
        const { models } = ctx;

        return models.ProductCategories.createProductCategory(doc);
      }),

    updateProductCategory: t.procedure
      .input(z.object({ _id: z.string(), doc: categoryDocSchema }))
      .mutation(async ({ ctx, input }) => {
        const { _id, doc } = input;
        const { models } = ctx;

        return models.ProductCategories.updateProductCategory(_id, doc);
      }),

    removeProductCategory: t.procedure
      .input(z.object({ _id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const { _id } = input;
        const { models } = ctx;

        return models.ProductCategories.removeProductCategory(_id);
      }),

    count: t.procedure
      .input(z.object({ query: mongoQuerySchema.optional() }))
      .query(async ({ ctx, input }) => {
        const { query } = input;
        const { models } = ctx;

        return models.ProductCategories.countDocuments(query);
      }),
  }),
});
