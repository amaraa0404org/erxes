import { DocumentNode, GraphQLResolveInfo } from 'graphql';
import { merge } from 'lodash';
import {
  gql,
  createHttpLink,
  execute,
  from,
  toPromise,
  GraphQLRequest,
  FetchResult,
  ApolloLink,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import {
  FieldsByTypeName,
  parseResolveInfo,
  ResolveTree,
} from 'graphql-parse-resolve-info';
import type { ConnectionInitMessage, Context } from 'graphql-ws';
import type { Extra } from 'graphql-ws/lib/use/ws';
import fetch from 'node-fetch';

/** Options recorded for a field path: alias rename and/or query arguments. */
interface IFieldOptions {
  alias?: string;
  args?: Record<string, unknown>;
}

/** The full field-path entry collected from a parsed resolve-info tree. */
interface IFieldValue extends IFieldOptions {
  name: string;
}

function fieldPathsAsStrings(obj: Record<string, unknown>) {
  const paths = (obj: object, head = ''): string[] => {
    return Object.entries(obj).reduce(
      (acc: string[], [key, value]: [string, unknown]) => {
        const fullPath = addDelimiter(head, key);
        return isObject(value)
          ? acc.concat(key, paths(value, fullPath))
          : acc.concat(fullPath);
      },
      [],
    );
  };
  return paths(obj);
}

function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && !Array.isArray(val) && val !== null;
}

function addDelimiter(a: string, b: string) {
  return a ? `${a}.${b}` : b;
}

function isFieldObject(obj: unknown): obj is ResolveTree {
  return (
    isObject(obj) &&
    Object.prototype.hasOwnProperty.call(obj, 'args') &&
    Object.prototype.hasOwnProperty.call(obj, 'alias') &&
    Object.prototype.hasOwnProperty.call(obj, 'name')
  );
}

function fieldPathsAsMapFromResolveInfo(
  resolveInfo: FieldsByTypeName | ResolveTree,
): Record<string, IFieldOptions | null> {
  // Construct entries-like array of field paths their corresponding name, alias, and args
  const paths = (obj: object, head = ''): [string, IFieldValue | null][] => {
    return Object.entries(obj).reduce(
      (
        acc: [string, IFieldValue | null][],
        [key, value]: [string, unknown],
      ) => {
        const fullPath = addDelimiter(head, key);
        if (
          isFieldObject(value) &&
          Object.keys(value.fieldsByTypeName).length === 0
        ) {
          const { alias, args, name } = value;
          return acc.concat([[fullPath, { alias, args, name }]]);
        } else if (isFieldObject(value)) {
          const { alias, args, name } = value;
          return acc.concat(
            [[fullPath, { alias, args, name }]],
            paths(value, fullPath),
          );
        } else if (isObject(value)) {
          return acc.concat(paths(value, fullPath));
        }
        return acc.concat([[fullPath, null]]);
      },
      [],
    );
  };
  const resolveInfoFields = paths(resolveInfo);
  // Filter field paths and construct an object from entries
  return Object.fromEntries(
    resolveInfoFields
      .filter((entry): entry is [string, IFieldValue] => Boolean(entry[1]))
      .map(
        ([path, { alias, args, name }]): [string, IFieldOptions | null] => {
          const pathParts = path.split('.');
          pathParts.forEach((_part, i) => {
            if (pathParts[i - 1] === 'fieldsByTypeName') {
              pathParts.splice(i - 1, 2);
            }
          });
          const keptOptions: IFieldOptions = {
            ...(name !== alias ? { alias } : {}),
            ...(args && Object.keys(args).length ? { args } : {}),
          };
          return [
            pathParts.join('.'),
            Object.keys(keptOptions).length ? keptOptions : null,
          ];
        },
      ),
  );
}

function buildSelection(
  selection: string,
  pathString: string,
  pathParts: string[],
  fieldPathMap: Record<string, IFieldOptions | null>,
  index: number,
): string {
  let formattedSelection = selection;
  let options: IFieldOptions | null | undefined;
  let parentOptions: IFieldOptions | null | undefined;
  if (pathParts.length > 1 && index < pathParts.length - 1) {
    const parentPathString = pathParts.slice(0, index + 1).join('.');
    parentOptions = fieldPathMap[parentPathString];
  } else {
    options = fieldPathMap[pathString];
  }
  if (parentOptions) {
    if (parentOptions.alias) {
      formattedSelection = `${parentOptions.alias}: ${formattedSelection}`;
    }
    if (parentOptions.args) {
      // Stringify object, remove outer brackets, then remove double quotes before colon
      const formattedArgs = JSON.stringify(parentOptions.args)
        .slice(1, -1)
        .replace(/"([^"]+)":/g, '$1:');
      formattedSelection = `${formattedSelection}(${formattedArgs})`;
    }
  } else if (options) {
    if (options.alias) {
      formattedSelection = `${options.alias}: ${formattedSelection}`;
    }
    if (options.args) {
      const formattedArgs = JSON.stringify(options.args)
        .slice(1, -1)
        .replace(/"([^"]+)":/g, '$1:');
      formattedSelection = `${formattedSelection}(${formattedArgs})`;
    }
  }
  return formattedSelection;
}

function buildNonPayloadSelections(
  payload: Record<string, unknown>,
  info: GraphQLResolveInfo,
): { selections: string; resolveInfo: ResolveTree | FieldsByTypeName } {
  const resolveInfo = parseResolveInfo(info);
  if (!resolveInfo) {
    throw new Error('Cannot parse graphql resolve info');
  }

  const payloadFieldPaths = fieldPathsAsStrings(
    payload[resolveInfo?.name as string] as Record<string, unknown>,
  );
  const operationFields = resolveInfo
    ? fieldPathsAsMapFromResolveInfo(resolveInfo)
    : {};
  const operationFieldPaths = Object.keys(operationFields);
  const selections = operationFieldPaths
    .filter((path) => !payloadFieldPaths.includes(path))
    .reduce((acc, curr, i, arr) => {
      const pathParts = curr.split('.');
      let selections = '';
      pathParts.forEach((part, j) => {
        // Is this a top-level field that will be accounted for when nested
        // children are added to the selection?
        const hasSubFields = !!arr.slice(i + 1).find((item) => {
          const itemParts = item.split('.');
          itemParts.pop();
          const rejoinedItem = itemParts.join('.');
          return rejoinedItem === curr;
        });
        if (hasSubFields) {
          return;
        }
        const sel = buildSelection(part, curr, pathParts, operationFields, j);
        if (j === 0) {
          selections = `${sel} `;
        } else if (j === 1) {
          selections = `${selections}{ ${sel} } `;
        } else {
          const char = -(j - 2) - j;
          selections = `${selections.slice(
            0,
            char,
          )}{ ${sel} } ${selections.slice(char)}`;
        }
      });
      return acc + selections;
    }, '');

  return { selections, resolveInfo };
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map((graphqlError) =>
      console.error(`[GraphQL error]: ${graphqlError.message}`),
    );
  }
  if (networkError) {
    console.log(`[Network Error]: ${networkError}`);
  }
});

export type SubscriptionWsContext = Context<
  ConnectionInitMessage['payload'],
  Extra
>;

export default class SubscriptionResolver {
  private apolloLink!: ApolloLink;

  constructor(gatewayURL: string, context: SubscriptionWsContext) {
    const contextLink = setContext((_request, previousContext) => {
      const cookie = context.extra?.request?.headers?.cookie;
      if (cookie) {
        if (!previousContext) {
          previousContext = {};
        }
        if (!previousContext.headers) {
          previousContext.headers = {};
        }
        previousContext.headers.cookie = context.extra.request.headers.cookie;
      }
      return previousContext;
    });

    // node-fetch implements the Fetch API but its typings differ from the
    // DOM `fetch` signature @apollo/client expects; runtime-compatible.
    const httpLink = createHttpLink({
      fetch: fetch as unknown as typeof globalThis.fetch,
      uri: gatewayURL,
    });

    this.apolloLink = from([errorLink, contextLink, httpLink]);
  }

  public async queryAndMergeMissingData({
    payload,
    queryVariables,
    info,
    buildQueryUsingSelections,
  }: {
    payload: Record<string, unknown>;
    queryVariables: Record<string, unknown>;
    info: GraphQLResolveInfo;
    buildQueryUsingSelections: (selections: string) => string;
  }): Promise<unknown> {
    const { selections, resolveInfo } = buildNonPayloadSelections(
      payload,
      info,
    );

    const resolveInfoName = resolveInfo?.name as string | undefined;
    const payloadData =
      typeof resolveInfoName === 'string'
        ? payload[resolveInfoName]
        : Object.values(payload)[0];

    if (!selections) {
      return payloadData;
    }

    const query = buildQueryUsingSelections(selections);

    const documentNode: DocumentNode = gql(query);

    try {
      const response = await this.query({
        query: documentNode,
        variables: queryVariables,
      });

      if (response.data) {
        return merge(payloadData, Object.values(response.data)[0]);
      }
    } catch (error) {
      console.error(
        '----------------- subscription resolver request error ---------------------------',
      );
      console.error('query', query);
      console.error('payload', payload);
      console.error('queryVariables', queryVariables);
      console.error('resolveInfo?.name', resolveInfo?.name);
      console.error('error', error);
      console.error(
        '---------------------------------------------------------------------------------',
      );
    }
  }

  private async query(graphqlRequest: GraphQLRequest): Promise<FetchResult> {
    return toPromise(execute(this.apolloLink, graphqlRequest));
  }
}
