import { GraphQLResolveInfo } from 'graphql';
import { SortOrder } from 'mongoose';
import { IUserDocument } from './modules/team-member/user';
import {
  Request as ApiRequest,
  Response as ApiResponse,
} from 'express';
import { IncomingHttpHeaders } from 'http';
import { ScopedEventHandlers } from '../core-modules';

export interface IRule {
  kind: string;
  text: string;
  condition: string;
  value: string;
}

export interface ILink {
  [key: string]: string;
}

export interface IRuleDocument extends IRule, Document {
  _id: string;
}

export interface IOffsetPaginateParams {
  limit?: number;
  page?: number;
  perPage?: number;

  sortField?: string;
  sortDirection?: SortOrder;
}

export interface ICursorPaginateParams {
  limit?: number;
  cursor?: string;
  direction?: 'forward' | 'backward';
  cursorMode?: 'inclusive' | 'exclusive';
  orderBy?: Record<string, SortOrder>;
}

export interface ICursorPaginateResult<T> {
  list: T[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
  totalCount: number;
}

export interface IListParams extends ICursorPaginateParams {
  searchValue?: string;
  sortField?: string;
}

export interface IStringMap {
  [key: string]: string;
}

export interface ICustomField {
  field: string;
  // Custom-field values are variant-shaped (string | number | Date | arrays
  // | objects) by design; consumers coerce per the field's `type`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  stringValue?: string;
  numberValue?: number;
  dateValue?: Date;
  locationValue?: ILocationOption;
  extraValue?: string;
}

export interface IPropertyField {
  [key: string]:
    | string
    | number
    | boolean
    | Date
    | Array<string | number | boolean | Date>
    | null;
}

export interface IBrowserInfo {
  language?: string;
  url?: string;
  city?: string;
  countryCode?: string;
}

export interface IAttachment {
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface IPdfAttachment {
  pdf?: IAttachment;
  pages: IAttachment[];
}

/**
 * Request metadata carried alongside the GraphQL request. Built by
 * `generateApolloContext`; `headers` is optional because only the
 * before-resolvers path surfaces them.
 */
export interface IRequestInfo {
  secure: boolean;
  cookies: Record<string, string>;
  headers?: IncomingHttpHeaders;
}

/**
 * GraphQL request context shared by every service. Services extend it with
 * their own models/data loaders (e.g. `IContext extends IMainContext`).
 *
 * `user` is declared non-null for ergonomic reasons — the gateway forwards a
 * compacted user header only when authenticated, so it can be `null` at
 * runtime; resolvers are gated by `checkLogin`/permission wrappers before
 * reading it.
 */
/**
 * Document forwarded through a base64 request header (`cpuser`,
 * `clientportal`). `_id` is the only field guaranteed by the gateway; the
 * remaining fields are owned by the consuming service's schema, so member
 * access beyond `_id` stays open at this boundary.
 */
export type HeaderDoc = { _id: string } & Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see HeaderDoc
  any
>;

export interface IMainContext {
  res: ApiResponse;
  req: ApiRequest;
  subdomain: string;
  requestInfo: IRequestInfo;
  user: IUserDocument;
  /**
   * Client-portal user document forwarded through the `cpuser` request
   * header. The document shape lives in each service's client-portal module
   * (core-api overrides this with `ICPUserDocument` in `IContext`), so it
   * stays opaque here.
   */
  cpUser?: unknown;
  /** Client portal document forwarded through the `clientportal` header. */
  clientPortal?: unknown;
  /**
   * Per-service Mongoose model map, injected by the service's context factory
   * (core-api: `IModels`). Opaque at this layer.
   */
  models?: unknown;
  __: <T extends object>(doc: T) => T & { processId: string };
  processId: string;
  eventHandlers: ScopedEventHandlers;
  checkPermission: (action: string, ownerId?: string) => Promise<void>;
}

export interface IOrderInput {
  _id: string;
  order: number;
}

export interface IAttachment {
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface IPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface IResolverSymbol {
  wrapperConfig?: {
    skipPermission?: boolean;
    forClientPortal?: boolean;
    cpUserRequired?: boolean;
  };
}

export type Resolver<
  Parent = unknown,
  // Bare `Resolver` is used for field maps whose args live only in the
  // declaring module's GraphQL schema; `unknown` breaks unannotated `params`
  // callers.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Args = Record<string, any>,
  Context = { subdomain: string } & IMainContext,
  Result = unknown,
> = {
  resolve(
    parent: Parent,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): Promise<Result> | Result;
}['resolve'] &
  Partial<IResolverSymbol>;

/**
 * Resolver stored in a resolver map. Apollo invokes resolvers with
 * per-field parent/args/context values whose precise types live only at the
 * declaring module, so the erased boundary positions stay `any` — narrowing
 * them (e.g. to `unknown`) would reject resolvers declared against narrower
 * service contexts such as core-api's `IContext`.
 */
export type AnyResolver = Resolver<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see AnyResolver doc
  any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see AnyResolver doc
  any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see AnyResolver doc
  any,
  unknown
>;

export interface ILocationOption {
  lat: number;
  lng: number;
  description?: string;
}

/**
 * Where a record came from, when nobody typed it in.
 *
 * `createdBy` answers who owns a record; this answers what produced it — a
 * campaign, an automation, an import. The two are not the same claim: a task
 * opened by a campaign belongs to the person whose campaign it was, but they
 * never pressed create, and only this says so.
 */
export type TCreatedVia = {
  /** What kind of thing produced it: `broadcast`, `automation`, `import`, … */
  source: string;
  /** The configuration that produced it — a campaign, an automation. */
  sourceId: string;
  /**
   * What that configuration was called at the time. Kept rather than looked
   * up: a record explains itself without a join, and renaming the campaign
   * later must not rewrite what already happened.
   */
  sourceName?: string;
  /** The single run of that configuration, when there is one to point at. */
  runId?: string;
  /** Whose configuration it was. Absent when nobody asked — an event did. */
  actorId?: string;
};
