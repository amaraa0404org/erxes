import { TAfterProcessProducers } from 'erxes-api-shared/core-modules';
import { sendCoreModuleProducer } from 'erxes-api-shared/utils';
import {
  AfterProcessContext,
  UpdatedDocumentRule,
  CreateDocumentRule,
} from './types';

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function getAllKeys(
  obj: Record<string, unknown>,
  prefix = '',
): string[] {
  let keys: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      keys.push(fullKey);
      if (isPlainObject(obj[key])) {
        keys = keys.concat(getAllKeys(obj[key], fullKey));
      }
    }
  }
  return keys;
}

export async function sendProducer(
  context: AfterProcessContext,
  producerName: TAfterProcessProducers,
  input: unknown,
): Promise<void> {
  try {
    await sendCoreModuleProducer({
      subdomain: context.subdomain,
      pluginName: context.pluginName,
      moduleName: 'afterProcess',
      producerName,
      input,
    });
  } catch (error) {
    console.error(
      `Error sending afterProcess producer ${String(producerName)} to plugin ${
        context.pluginName
      }: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

// The `updateDescription` of the mongo change-event payload; `removed` is an
// object keyed by field name in this pipeline (unlike the MongoDB driver's
// `string[]` shape).
interface IUpdateDescription {
  updated?: Record<string, unknown>;
  added?: Record<string, unknown>;
  removed?: Record<string, unknown>;
}

export function shouldProcessUpdatedDocument(
  rule: UpdatedDocumentRule,
  context: AfterProcessContext,
  payload: Record<string, unknown>,
): boolean {
  const { contentTypes, when } = rule;

  if (!context.contentType || !contentTypes.includes(context.contentType)) {
    return false;
  }

  if (!when) {
    return true;
  }

  const {
    updated: updatedFields = {},
    added: addedFields = {},
    removed: removedFields = {},
  } = (payload.updateDescription || {}) as IUpdateDescription;

  const hasRemovedFields = getAllKeys(removedFields).some((key) =>
    (when.fieldsRemoved || []).includes(key),
  );

  const hasUpdatedFields = getAllKeys({
    ...addedFields,
    ...updatedFields,
  }).some((key) => (when.fieldsUpdated || []).includes(key));

  return hasRemovedFields || hasUpdatedFields;
}

export function shouldProcessCreateDocument(
  rule: CreateDocumentRule,
  context: AfterProcessContext,
  payload: Record<string, unknown>,
): boolean {
  const { contentTypes, when } = rule;

  if (!context.contentType || !contentTypes.includes(context.contentType)) {
    return false;
  }

  if (!when) {
    return true;
  }

  const document = payload?.fullDocument;
  if (!document) {
    return false;
  }

  // getAllKeys only enumerates own enumerable keys, so this runs identically
  // for whatever object `fullDocument` happens to be.
  const hasFieldsExists = getAllKeys(
    document as Record<string, unknown>,
  ).some((key) => (when.fieldsWith || []).includes(key));

  return hasFieldsExists;
}
