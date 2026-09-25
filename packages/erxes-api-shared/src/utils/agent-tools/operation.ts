import { AgentGraphqlToolDescriptor } from './types';

export interface AgentToolOperation {
  /** Executable GraphQL document for the tool call. */
  source: string;
  /** Request input filtered to the operation's declared arguments. */
  variableValues: Record<string, unknown>;
  operationName: string;
  /** Correlation id carried by the reserved `__processId` input key. */
  processId?: string;
}

/**
 * Build the executable GraphQL document for one tool call.
 *
 * `query AgentTool_customersMain($ids: [String!]) { customersMain(ids: $ids) { _id ... } }`
 *
 * - Variable types are copied verbatim from the operation's SDL argument
 *   types, so graphql-js coerces and validates values exactly like a
 *   client-supplied operation.
 * - Only input keys matching a declared argument are forwarded; extra keys
 *   (including the reserved `__processId` correlation key) are dropped
 *   silently.
 */
export const buildAgentToolOperation = (
  descriptor: AgentGraphqlToolDescriptor,
  input: Record<string, unknown> | undefined,
): AgentToolOperation => {
  const processId =
    typeof input?.__processId === 'string' ? input.__processId : undefined;

  const argNames = new Set(descriptor.inputFields.map((field) => field.name));

  const variableValues: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input || {})) {
    if (argNames.has(key)) {
      variableValues[key] = value;
    }
  }

  const provided = descriptor.inputFields.filter(
    (field) => field.name in variableValues,
  );

  const variableDefinitions = provided
    .map((field) => `$${field.name}: ${field.type}`)
    .join(', ');
  const fieldArguments = provided
    .map((field) => `${field.name}: $${field.name}`)
    .join(', ');

  const operationName = `AgentTool_${descriptor.operation}`;

  const source =
    `${descriptor.method} ${operationName}` +
    `${variableDefinitions ? `(${variableDefinitions})` : ''} {\n` +
    `  ${descriptor.operation}${fieldArguments ? `(${fieldArguments})` : ''}` +
    `${descriptor.selection ? ` ${descriptor.selection}` : ''}\n` +
    `}`;

  return { source, variableValues, operationName, processId };
};
