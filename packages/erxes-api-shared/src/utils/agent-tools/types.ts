import { DocumentNode } from 'graphql';

export interface AgentToolField {
  name: string;
  type: string; // SDL type string, e.g. 'String!', '[String!]', 'JSON'
  required: boolean;
  enumValues?: string[];
}

export interface AgentToolPermission {
  module: string;
  action: string;
}

/**
 * A plugin declares an agent-callable tool by naming a GraphQL operation on
 * its own subgraph schema. The tool executes through the normal GraphQL
 * resolver pipeline (login check, permission wrappers, activity logging),
 * never around it.
 */
export interface AgentToolDeclaration {
  /** Field name on Query or Mutation, e.g. 'customersMain'. */
  operation: string;
  /** Required — a tool without a permission is never callable. */
  permission: AgentToolPermission;
  description?: string;
  /**
   * Selection-set override, e.g. '{ _id name }'. Defaults to every
   * scalar/enum leaf field of the operation's return type; unused for
   * scalar/JSON returns.
   */
  selection?: string;
}

export interface AgentGraphqlToolDescriptor {
  id: string; // e.g. 'core.graphql.customersMain'
  kind: 'graphql';
  plugin: string;
  operation: string;
  method: 'query' | 'mutation';
  destructive: boolean;
  description: string;
  permission: AgentToolPermission;
  inputFields: AgentToolField[];
  selection: string; // e.g. '{ _id name }'; '' when the return type is scalar
}

export type AgentToolDescriptor = AgentGraphqlToolDescriptor;

export interface AgentToolManifest {
  plugin: string;
  tools: AgentToolDescriptor[];
}

/**
 * SDL accepted by buildAgentToolManifest — the same `graphql.typeDefs`
 * shapes `startPlugin` receives.
 */
export type AgentToolsTypeDefs =
  | DocumentNode
  | string
  | Array<DocumentNode | string>;

/** Structural view of a tRPC v11 router accepted from plugins. */
export interface AgentTrpcRouter {
  _def?: { procedures?: Record<string, unknown> };
  createCaller?: (context: unknown) => unknown;
}
