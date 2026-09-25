import { getPlugin, isEnabled } from '../../utils/service-discovery';
import {
  createTRPCUntypedClient,
  httpBatchLink,
  TRPCRequestOptions,
} from '@trpc/client';
import { TAutomationProducers } from '../../core-modules/automations/types';
import { TAutomationProducersInput } from '../../core-modules/automations/zodTypes';
import { TSegmentProducers } from '../../core-modules/segments/types';
import { TAfterProcessProducers } from '../../core-modules/logs/types';
import {
  TBeforeResolversProducers,
  TBeforeResolversProducersInput,
} from '../apollo/beforeResolvers';
import { TSegmentProducersInput } from '../../core-modules/segments/zodSchemas';
import { TImportExportProducersInput } from '../../core-modules/import-export/zodSchemas';
import { TImportExportProducers } from '../../core-modules/import-export/types';
import { encodeTRPCContextHeader, TRPCContext, trpcContextHeaderName } from '.';
import {
  TRecordReferenceProducers,
  TRecordReferenceProducersInput,
} from '../../core-modules/common/references/types';
import {
  TApprovalChangeProducers,
  TApprovalChangeProducersInput,
} from '../../core-modules/approval/types';
type TModuleProducerInputMap = {
  automations: {
    [K in TAutomationProducers]: TAutomationProducersInput[K];
  };
  segments: {
    [K in TSegmentProducers]: TSegmentProducersInput[K];
  };
  afterProcess: {
    // After-process producer payloads are free-form log/event documents whose
    // shape is declared by each plugin's AfterProcessConfigs; no shared schema.
    [K in TAfterProcessProducers]: unknown;
  };
  beforeResolvers: {
    [K in TBeforeResolversProducers]: TBeforeResolversProducersInput[K];
  };
  importExport: {
    [K in TImportExportProducers]: TImportExportProducersInput[K];
  };
  references: {
    [K in TRecordReferenceProducers]: TRecordReferenceProducersInput[K];
  };
  approval: {
    [K in TApprovalChangeProducers]: TApprovalChangeProducersInput[K];
  };
};

type TCoreModuleProducer<
  TModuleName extends keyof TModuleProducerInputMap =
    keyof TModuleProducerInputMap,
  TProducerName extends keyof TModuleProducerInputMap[TModuleName] =
    keyof TModuleProducerInputMap[TModuleName],
  // Dynamic cross-service producer boundary: producers are discovered at
  // runtime, so `any` keeps existing callers compiling; an explicit `TOutput`
  // remains available for caller-declared outputs.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TOutput = any,
> = {
  subdomain: string;
  moduleName: TModuleName;
  producerName: TProducerName;
  method?: 'query' | 'mutation';
  pluginName: string;
  input: TModuleProducerInputMap[TModuleName][TProducerName];
  // `NoInfer` keeps `defaultValue: []`/`null` from narrowing TOutput when the
  // caller did not declare an output type.
  defaultValue?: NoInfer<TOutput>;
  options?: TRPCRequestOptions;
  context?: TRPCContext;
};

export const sendCoreModuleProducer = async <
  TModuleName extends keyof TModuleProducerInputMap =
    keyof TModuleProducerInputMap,
  TProducerName extends keyof TModuleProducerInputMap[TModuleName] =
    keyof TModuleProducerInputMap[TModuleName],
  // See TCoreModuleProducer: dynamic boundary, `TOutput` is caller-declarable.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TOutput = any,
>({
  subdomain,
  moduleName,
  pluginName,
  method = 'mutation',
  producerName,
  input,
  defaultValue,
  options,
  context,
}: TCoreModuleProducer<TModuleName, TProducerName, TOutput>): Promise<
  TOutput
> => {
  if (pluginName && !(await isEnabled(pluginName))) {
    return defaultValue as TOutput;
  }

  const pluginInfo = await getPlugin(pluginName);

  // Validate plugin address before constructing URL
  if (!pluginInfo.address || pluginInfo.address.trim() === '') {
    console.warn(
      `Plugin "${pluginName}" address is not available. Returning defaultValue.`,
    );
    return defaultValue as TOutput;
  }
  const contextHeader = encodeTRPCContextHeader(subdomain, method, context);

  const baseUrl = `${pluginInfo.address}/${moduleName}`;

  try {
    const client = createTRPCUntypedClient({
      links: [
        httpBatchLink({
          url: baseUrl,
          headers: () => ({
            [trpcContextHeaderName]: contextHeader,
          }),
        }),
      ],
    });

    const result = await client[method](
      String(producerName),
      { subdomain, data: input ?? {} },
      options,
    );

    return (result || defaultValue) as TOutput;
  } catch (error) {
    const trpcError =
      error !== null && typeof error === 'object'
        ? (error as {
            message?: string;
            code?: string;
            cause?: { code?: string };
          })
        : {};
    const errorMessage = trpcError.message || 'Unknown error';
    const errorCode = trpcError.cause?.code || trpcError.code;

    if (errorCode === 'ECONNREFUSED') {
      console.warn(
        `[TRPC] Connection refused to plugin "${pluginName}" at ${baseUrl}. ` +
          `The plugin service may not be running or is not accessible. ` +
          `Returning defaultValue.`,
      );
    } else {
      console.warn(
        `[TRPC] Error calling plugin "${pluginName}" at ${baseUrl}: ${errorMessage}. ` +
          `Returning defaultValue.`,
      );
    }

    throw error;
  }
};
