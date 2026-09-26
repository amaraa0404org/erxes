import {
  DocumentNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  Kind,
  NamedTypeNode,
  parse,
  print,
  TypeNode,
} from 'graphql';
import {
  AgentToolDeclaration,
  AgentToolDescriptor,
  AgentToolField,
  AgentToolManifest,
  AgentToolsTypeDefs,
} from './types';

const BUILT_IN_SCALARS = ['String', 'Int', 'Float', 'Boolean', 'ID'];

/**
 * Index over the plugin's parsed SDL: object/interface fields merged across
 * `type` and `extend type` blocks, plus enum and custom-scalar names for
 * leaf-type detection.
 */
interface SchemaIndex {
  typeFields: Map<string, Map<string, FieldDefinitionNode>>;
  enumValues: Map<string, string[]>;
  scalarNames: Set<string>;
}

/** Unwrap NonNull/List wrappers down to the named type. */
const namedTypeName = (type: TypeNode): string => {
  let node: TypeNode = type;

  while (node.kind === Kind.NON_NULL_TYPE || node.kind === Kind.LIST_TYPE) {
    node = node.type;
  }

  return (node as NamedTypeNode).name.value;
};

const buildSchemaIndex = (documents: DocumentNode[]): SchemaIndex => {
  const typeFields = new Map<string, Map<string, FieldDefinitionNode>>();
  const enumValues = new Map<string, string[]>();
  const scalarNames = new Set<string>(BUILT_IN_SCALARS);

  const addFields = (
    typeName: string,
    fields: ReadonlyArray<FieldDefinitionNode> | undefined,
  ) => {
    if (!fields) {
      return;
    }

    let map = typeFields.get(typeName);

    if (!map) {
      map = new Map();
      typeFields.set(typeName, map);
    }

    for (const field of fields) {
      map.set(field.name.value, field);
    }
  };

  for (const document of documents) {
    for (const definition of document.definitions) {
      switch (definition.kind) {
        case Kind.OBJECT_TYPE_DEFINITION:
        case Kind.OBJECT_TYPE_EXTENSION:
        case Kind.INTERFACE_TYPE_DEFINITION:
        case Kind.INTERFACE_TYPE_EXTENSION:
          addFields(definition.name.value, definition.fields);
          break;
        case Kind.ENUM_TYPE_DEFINITION:
        case Kind.ENUM_TYPE_EXTENSION:
          enumValues.set(definition.name.value, [
            ...(enumValues.get(definition.name.value) || []),
            ...(definition.values || []).map((value) => value.name.value),
          ]);
          break;
        case Kind.SCALAR_TYPE_DEFINITION:
        case Kind.SCALAR_TYPE_EXTENSION:
          scalarNames.add(definition.name.value);
          break;
        default:
          break;
      }
    }
  }

  return { typeFields, enumValues, scalarNames };
};

/** Enum values for an enum-typed argument, undefined otherwise. */
const argEnumValues = (
  arg: InputValueDefinitionNode,
  index: SchemaIndex,
): string[] | undefined => index.enumValues.get(namedTypeName(arg.type));

/**
 * Default selection set: every scalar/enum leaf field of the operation's
 * return type. Returns '' for scalar/JSON returns and for types with no
 * leaf fields (the executor then sends a bare field, which is only valid
 * for leaf types — object returns always produce a non-empty selection or
 * the call fails schema validation with a clear error).
 */
const defaultSelection = (
  returnType: TypeNode,
  index: SchemaIndex,
): string => {
  const typeName = namedTypeName(returnType);

  if (index.scalarNames.has(typeName) || index.enumValues.has(typeName)) {
    return '';
  }

  const fields = index.typeFields.get(typeName);

  if (!fields) {
    return '';
  }

  const leafFields = [...fields.values()]
    .filter((field) => {
      const leafTypeName = namedTypeName(field.type);

      return (
        index.scalarNames.has(leafTypeName) || index.enumValues.has(leafTypeName)
      );
    })
    .map((field) => field.name.value);

  return leafFields.length ? `{ ${leafFields.join(' ')} }` : '';
};

/**
 * Derive the agent tool manifest for a plugin from its GraphQL SDL. Only
 * operations explicitly declared via `agentTools` are exposed — nothing is
 * callable by default. Declared operations missing from the schema are
 * warned about and skipped.
 */
export const buildAgentToolManifest = (opts: {
  plugin: string;
  typeDefs: AgentToolsTypeDefs;
  agentTools?: AgentToolDeclaration[];
}): AgentToolManifest => {
  const { plugin, typeDefs, agentTools = [] } = opts;

  const documents = (Array.isArray(typeDefs) ? typeDefs : [typeDefs]).map(
    (typeDef) => (typeof typeDef === 'string' ? parse(typeDef) : typeDef),
  );

  const index = buildSchemaIndex(documents);
  const tools: AgentToolDescriptor[] = [];
  const declared = new Set<string>();

  for (const declaration of agentTools) {
    if (declared.has(declaration.operation)) {
      console.warn(
        `[agent-tools] ${plugin}: duplicate declaration for operation ` +
          `'${declaration.operation}' skipped`,
      );
      continue;
    }
    declared.add(declaration.operation);

    const queryField = index.typeFields
      .get('Query')
      ?.get(declaration.operation);
    const mutationField = index.typeFields
      .get('Mutation')
      ?.get(declaration.operation);
    const field = queryField || mutationField;

    if (!field) {
      console.warn(
        `[agent-tools] ${plugin}: declared operation ` +
          `'${declaration.operation}' not found on Query or Mutation — ` +
          'skipped',
      );
      continue;
    }

    const method: 'query' | 'mutation' = queryField ? 'query' : 'mutation';

    const inputFields: AgentToolField[] = (field.arguments || []).map(
      (arg) => ({
        name: arg.name.value,
        type: print(arg.type),
        required:
          arg.type.kind === Kind.NON_NULL_TYPE &&
          arg.defaultValue === undefined,
        enumValues: argEnumValues(arg, index),
      }),
    );

    tools.push({
      id: `${plugin}.graphql.${declaration.operation}`,
      kind: 'graphql',
      plugin,
      operation: declaration.operation,
      method,
      destructive: method === 'mutation',
      description:
        declaration.description ||
        `Call ${plugin} GraphQL ${method} ${declaration.operation}`,
      permission: declaration.permission,
      inputFields,
      selection:
        declaration.selection || defaultSelection(field.type, index),
    });
  }

  return { plugin, tools };
};
