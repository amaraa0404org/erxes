import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';

const t = initTRPC.context<CoreTRPCContext>().create();

const relationEntitySchema = z.object({
  contentType: z.string(),
  contentId: z.string(),
});

const relationInputSchema = z.object({
  entities: z.array(relationEntitySchema),
});

export const relationTrpcRouter = t.router({
  relation: t.router({
    getRelationsByEntities: t.procedure
      .input(
        z.object({
          contentType: z.string(),
          contentId: z.string(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Relations.getRelationsByEntities(input);
      }),

    getRelationByEntity: t.procedure
      .input(
        z.object({
          contentType: z.string(),
          contentId: z.string(),
          relatedContentType: z.string(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { models } = ctx;

        return models.Relations.getRelationsByEntity(input);
      }),

    filterRelations: t.procedure
      .input(
        z.object({
          contentType: z.string(),
          contentIds: z.array(z.string()),
          relatedContentType: z.string(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { models } = ctx;

        return models.Relations.filterRelations(input);
      }),

    getRelationIds: t.procedure
      .input(
        z.object({
          contentType: z.string(),
          contentId: z.string(),
          relatedContentType: z.string(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { models } = ctx;

        return models.Relations.getRelationIds(input);
      }),

    filterRelationIds: t.procedure
      .input(
        z.object({
          contentType: z.string(),
          contentIds: z.array(z.string()),
          relatedContentType: z.string(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { models } = ctx;

        return models.Relations.filterRelationIds(input);
      }),

    createRelation: t.procedure
      .input(z.object({ relation: relationInputSchema }))
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;

        return models.Relations.createRelation(input);
      }),

    createMultipleRelations: t.procedure
      .input(z.object({ relations: z.array(relationInputSchema) }))
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;

        return models.Relations.createMultipleRelations(input);
      }),

    updateRelation: t.procedure
      .input(
        z.object({
          _id: z.string(),
          doc: relationInputSchema,
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;

        return models.Relations.updateRelation(input);
      }),

    deleteRelation: t.procedure
      .input(z.object({ _id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;

        return models.Relations.deleteRelation(input);
      }),
    cleanRelation: t.procedure
      .input(
        z.object({
          contentType: z.string(),
          contentIds: z.array(z.string()),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;
        return await models.Relations.cleanRelation(input);
      }),
    manageRelations: t.procedure
      .input(
        z.object({
          contentType: z.string(),
          contentId: z.string(),
          relatedContentType: z.string(),
          relatedContentIds: z.array(z.string()),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;

        return models.Relations.manageRelations(input);
      }),
  }),
});
