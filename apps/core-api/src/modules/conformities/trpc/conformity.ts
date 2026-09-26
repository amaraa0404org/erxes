import { initTRPC } from '@trpc/server';
import { FilterQuery } from 'mongoose';
import { z } from 'zod';
import { IConformityDocument } from '@/conformities/db/definitions/conformities';
import { CoreTRPCContext } from '~/init-trpc';

const t = initTRPC.context<CoreTRPCContext>().create();

const conformityAddSchema = z.object({
  mainType: z.string(),
  mainTypeId: z.string(),
  relType: z.string(),
  relTypeId: z.string(),
});

export const conformityTrpcRouter = t.router({
  conformity: t.router({
    addConformity: t.procedure
      .input(conformityAddSchema)
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.addConformity(input);
      }),

    savedConformity: t.procedure
      .input(
        z.object({
          mainType: z.string(),
          mainTypeId: z.string(),
          relTypes: z.array(z.string()),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.savedConformity(input);
      }),

    create: t.procedure
      .input(conformityAddSchema)
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.create(input);
      }),

    removeConformities: t.procedure
      .input(
        z.object({
          mainType: z.string(),
          mainTypeIds: z.array(z.string()),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.removeConformities(input);
      }),

    removeConformity: t.procedure
      .input(
        z.object({
          mainType: z.string(),
          mainTypeId: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.removeConformity(input);
      }),

    deleteConformity: t.procedure
      .input(
        z.object({
          mainType: z.string(),
          mainTypeId: z.string(),
          relType: z.string(),
          relTypeIds: z.array(z.string()),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.deleteConformities(input);
      }),

    getConformities: t.procedure
      .input(
        z.object({
          mainType: z.string(),
          mainTypeIds: z.array(z.string()),
          relTypes: z.array(z.string()),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.getConformities(input);
      }),

    addConformities: t.procedure
      .input(z.array(conformityAddSchema))
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.addConformities(input);
      }),

    relatedConformity: t.procedure
      .input(
        z.object({
          mainType: z.string(),
          mainTypeId: z.string(),
          relType: z.string(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.relatedConformity(input);
      }),

    filterConformity: t.procedure
      .input(
        z.object({
          mainType: z.string(),
          mainTypeIds: z.array(z.string()),
          relType: z.string(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.filterConformity(input);
      }),

    changeConformity: t.procedure
      .input(
        z.object({
          type: z.string(),
          newTypeId: z.string(),
          oldTypeIds: z.array(z.string()),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.changeConformity(input);
      }),

    findConformities: t.procedure
      .input(z.record(z.string(), z.unknown()))
      .query(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.find(
          input as FilterQuery<IConformityDocument>,
        ).lean();
      }),

    editConformity: t.procedure
      .input(
        z.object({
          mainType: z.string(),
          mainTypeId: z.string(),
          relType: z.string(),
          relTypeIds: z.array(z.string()),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;
        return models.Conformities.editConformity(input);
      }),
  }),
});
