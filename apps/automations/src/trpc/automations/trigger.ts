import { debugError } from '../../debugger';
import { handleTrigger } from '../../executions/handleTrigger';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../init-trpc';

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

export const triggerProcedure = t.procedure
  .input(
    z.object({
      type: z.string(),
      // Trigger targets are arbitrary module documents; the service does not
      // know their schema, only that they are records.
      targets: z.array(z.record(z.string(), z.unknown())),
      recordType: z.string().optional(),
      repeatOptions: z
        .object({
          executionId: z.string(),
          actionId: z.string(),
          optionalConnectId: z.string().optional(),
        })
        .optional(),
      eventUpdateDescription: z.record(z.string(), z.unknown()).optional(),
    }),
  )
  .output(z.literal('success'))
  .mutation(async ({ ctx, input }) => {
    try {
      return await handleTrigger(ctx.subdomain, input);
    } catch (error: unknown) {
      debugError(
        `Trigger mutation failed on subdomain ${
          ctx.subdomain
        }: ${getErrorMessage(error)}`,
      );

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to handle trigger',
        cause: error,
      });
    }
  });
