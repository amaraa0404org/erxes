import { parse } from 'graphql';
import { buildAgentToolManifest } from './manifest';
import { buildAgentToolOperation } from './operation';

const TYPE_DEFS = `
  scalar JSON

  enum CURSOR_MODE {
    inclusive
    exclusive
  }

  enum CONTACT_STATUS {
    active
    deleted
  }

  type Customer {
    _id: String!
    firstName: String
    primaryEmail: String
    status: CONTACT_STATUS
    companies: [Company!]
    trackedData: JSON
  }

  type Company {
    _id: String!
    primaryName: String
  }

  input CustomerFilter {
    email: String
  }

  type Query {
    customersMain(
      ids: [String!]
      status: CONTACT_STATUS
      cursorMode: CURSOR_MODE
      limit: Int = 20
    ): [Customer!]!
    customerDetail(_id: String!): Customer
    customersByFilter(filter: CustomerFilter): [Customer!]
    logsRaw(filters: JSON): JSON
  }

  extend type Mutation {
    customersRemove(customerIds: [String!]!): [String!]!
  }
`;

const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

afterEach(() => {
  warnSpy.mockClear();
});

describe('buildAgentToolManifest', () => {
  it('derives a query descriptor from SDL, with args, enums and default selection', () => {
    const manifest = buildAgentToolManifest({
      plugin: 'core',
      typeDefs: TYPE_DEFS,
      agentTools: [
        {
          operation: 'customersMain',
          permission: { module: 'contacts', action: 'contactsRead' },
          description: 'Search customers',
        },
      ],
    });

    expect(manifest.plugin).toBe('core');
    expect(manifest.tools).toHaveLength(1);

    const tool = manifest.tools[0];

    expect(tool).toMatchObject({
      id: 'core.graphql.customersMain',
      kind: 'graphql',
      plugin: 'core',
      operation: 'customersMain',
      method: 'query',
      destructive: false,
      description: 'Search customers',
      permission: { module: 'contacts', action: 'contactsRead' },
    });

    expect(tool.inputFields).toEqual([
      { name: 'ids', type: '[String!]', required: false, enumValues: undefined },
      {
        name: 'status',
        type: 'CONTACT_STATUS',
        required: false,
        enumValues: ['active', 'deleted'],
      },
      {
        name: 'cursorMode',
        type: 'CURSOR_MODE',
        required: false,
        enumValues: ['inclusive', 'exclusive'],
      },
      { name: 'limit', type: 'Int', required: false, enumValues: undefined },
    ]);

    // default selection: scalar/enum leaf fields of Customer only
    expect(tool.selection).toBe(
      '{ _id firstName primaryEmail status trackedData }',
    );
  });

  it('marks extend-type Mutation fields as destructive mutations', () => {
    const manifest = buildAgentToolManifest({
      plugin: 'core',
      typeDefs: TYPE_DEFS,
      agentTools: [
        {
          operation: 'customersRemove',
          permission: { module: 'contacts', action: 'contactsManage' },
        },
      ],
    });

    expect(manifest.tools[0]).toMatchObject({
      id: 'core.graphql.customersRemove',
      method: 'mutation',
      destructive: true,
      inputFields: [
        {
          name: 'customerIds',
          type: '[String!]!',
          required: true,
          enumValues: undefined,
        },
      ],
      // scalar list return → no selection set
      selection: '',
    });
  });

  it('accepts DocumentNode and arrays of mixed typeDefs', () => {
    const manifest = buildAgentToolManifest({
      plugin: 'core',
      typeDefs: [parse(TYPE_DEFS), 'extend type Query { extraPing: String }'],
      agentTools: [
        {
          operation: 'extraPing',
          permission: { module: 'x', action: 'xRead' },
        },
      ],
    });

    expect(manifest.tools[0]).toMatchObject({
      id: 'core.graphql.extraPing',
      method: 'query',
      selection: '',
      inputFields: [],
    });
  });

  it('warns and skips declared operations absent from the schema', () => {
    const manifest = buildAgentToolManifest({
      plugin: 'core',
      typeDefs: TYPE_DEFS,
      agentTools: [
        {
          operation: 'nonexistentOp',
          permission: { module: 'x', action: 'xRead' },
        },
        {
          operation: 'customerDetail',
          permission: { module: 'contacts', action: 'contactsRead' },
        },
      ],
    });

    expect(manifest.tools.map((t) => t.operation)).toEqual(['customerDetail']);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('nonexistentOp'),
    );
  });

  it('exposes nothing without declarations', () => {
    const manifest = buildAgentToolManifest({
      plugin: 'core',
      typeDefs: TYPE_DEFS,
    });

    expect(manifest.tools).toEqual([]);
  });

  it('honors a selection override', () => {
    const manifest = buildAgentToolManifest({
      plugin: 'core',
      typeDefs: TYPE_DEFS,
      agentTools: [
        {
          operation: 'customerDetail',
          permission: { module: 'contacts', action: 'contactsRead' },
          selection: '{ _id primaryEmail }',
        },
      ],
    });

    expect(manifest.tools[0].selection).toBe('{ _id primaryEmail }');
  });
});

describe('buildAgentToolOperation', () => {
  const descriptor = buildAgentToolManifest({
    plugin: 'core',
    typeDefs: TYPE_DEFS,
    agentTools: [
      {
        operation: 'customersMain',
        permission: { module: 'contacts', action: 'contactsRead' },
      },
    ],
  }).tools[0];

  it('builds a typed, named document with only provided args forwarded', () => {
    const { source, variableValues, operationName } = buildAgentToolOperation(
      descriptor,
      { ids: ['a', 'b'], status: 'active' },
    );

    expect(operationName).toBe('AgentTool_customersMain');
    expect(source).toContain(
      'query AgentTool_customersMain($ids: [String!], $status: CONTACT_STATUS)',
    );
    expect(source).toContain('customersMain(ids: $ids, status: $status)');
    expect(source).toContain('{ _id firstName primaryEmail status trackedData }');
    expect(variableValues).toEqual({ ids: ['a', 'b'], status: 'active' });
  });

  it('drops unknown input keys and reserved __processId silently', () => {
    const { source, variableValues, processId } = buildAgentToolOperation(
      descriptor,
      {
        ids: ['a'],
        hackerField: 'drop me',
        __processId: 'proc-12345678',
      },
    );

    expect(variableValues).toEqual({ ids: ['a'] });
    expect(source).not.toContain('hackerField');
    expect(source).not.toContain('__processId');
    expect(processId).toBe('proc-12345678');
  });

  it('emits a bare field for scalar/JSON returns and mutations', () => {
    const manifest = buildAgentToolManifest({
      plugin: 'core',
      typeDefs: TYPE_DEFS,
      agentTools: [
        {
          operation: 'customersRemove',
          permission: { module: 'contacts', action: 'contactsManage' },
        },
        {
          operation: 'logsRaw',
          permission: { module: 'logs', action: 'logsRead' },
        },
      ],
    });

    const [removeOp, rawOp] = manifest.tools.map((tool) =>
      buildAgentToolOperation(tool, {
        customerIds: ['x'],
        filters: { a: 1 },
      }),
    );

    expect(removeOp.source).toContain('mutation AgentTool_customersRemove');
    expect(removeOp.source).toContain('customersRemove(customerIds: $customerIds)');
    expect(removeOp.source).not.toContain('{ _id');
    expect(removeOp.variableValues).toEqual({ customerIds: ['x'] });

    // JSON return → no selection set
    expect(rawOp.source).toContain('logsRaw(filters: $filters)\n}');
  });

  it('builds a no-argument operation when input is undefined', () => {
    const { source, variableValues } = buildAgentToolOperation(
      descriptor,
      undefined,
    );

    expect(source).toContain('query AgentTool_customersMain {');
    expect(source).toContain('customersMain {');
    expect(variableValues).toEqual({});
  });
});
