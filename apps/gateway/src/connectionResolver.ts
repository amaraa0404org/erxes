import {
  appSchema,
  clientPortalSchema,
  cpUserSchema,
  permissionSchema,
  roleSchema,
  userSchema,
} from 'erxes-api-shared/core-modules';
import {
  IAppDocument,
  IRoleDocument,
  IUserDocument,
} from 'erxes-api-shared/core-types';
import { createGenerateModels } from 'erxes-api-shared/utils';
import mongoose, { Document, Model } from 'mongoose';
import { Request, Response } from 'express';

/**
 * The authenticated principal the gateway attaches to `req.user` and forwards
 * to downstream services in the base64 `user` header. It is either the lean
 * `users` document (plus the gateway-added loginToken/sessionCode fields) or a
 * synthetic principal built for website and app tokens.
 */
export interface IHeaderUser {
  // `string` once decoded from the `user` header JSON; `ObjectId` while it is
  // still the lean mongoose document fetched in userMiddleware.
  _id: string | mongoose.Types.ObjectId;
  email?: string;
  username?: string;
  isOwner?: boolean;
  loginToken?: string;
  sessionCode?: string | string[];
  oauthClientId?: string;
  oauthScopes?: string[];
  // Two historical shapes: `{ action, allowed, requiredActions }` from the
  // website-token path and `ICustomPermission` rows from the user document.
  customPermissions?: unknown[];
  [field: string]: unknown;
}

export const isHeaderUser = (value: unknown): value is IHeaderUser =>
  typeof value === 'object' &&
  value !== null &&
  '_id' in value &&
  typeof value._id === 'string';

/**
 * Minimal document shapes for the collections the gateway reads. The full
 * interfaces belong to core-api; here only the fields the gateway touches are
 * declared.
 */
export interface IPermissionDocument extends Document {
  _id: string;
}

export interface IAppTokenDocument extends IAppDocument {
  allowAllPermission?: boolean;
}

export interface IClientDocument extends Document {
  _id: string;
}

export interface IClientPortalDocument extends Document {
  _id: string;
}

export interface ICPUserDocument extends Document {
  _id: string;
  clientPortalId?: string;
}

export interface IMainContext {
  res: Response;
  requestInfo: {
    secure: boolean;
    cookies: Record<string, unknown>;
  };
  user: IUserDocument;
  cpUser?: ICPUserDocument;
  clientPortal?: IClientPortalDocument;
}

export interface IModels {
  Users: Model<IUserDocument>;
  Permissions: Model<IPermissionDocument>;
  Apps: Model<IAppTokenDocument>;
  Clients: Model<IClientDocument>;
  Roles: Model<IRoleDocument>;
  ClientPortals: Model<IClientPortalDocument>;
  CPUsers: Model<ICPUserDocument>;
}

export interface IContext extends IMainContext {
  subdomain: string;
  models: IModels;
}

/**
 * Express request as the gateway sees it after `userMiddleware` ran. The
 * pnpm layout makes `declare module 'express-serve-static-core'` augmentations
 * unresolvable, so the request extension is an explicit interface instead.
 * All members stay optional so a plain `Request` remains assignable.
 */
export interface IGatewayRequest extends Request {
  user?: IHeaderUser;
  cpUser?: ICPUserDocument;
  clientPortal?: IClientPortalDocument;
}

export const loadClasses = (db: mongoose.Connection): IModels => {
  const models = {} as IModels;

  models.Users = db.model<IUserDocument>('users', userSchema);
  models.Permissions = db.model<IPermissionDocument>(
    'permissions',
    permissionSchema,
  );
  models.Apps = db.model<IAppTokenDocument>('app_tokens', appSchema);
  models.ClientPortals =
    (db.models.client_portals as Model<IClientPortalDocument> | undefined) ||
    db.model<IClientPortalDocument>('client_portals', clientPortalSchema);

  models.CPUsers = db.model<ICPUserDocument>(
    'client_portal_users',
    cpUserSchema,
  );
  models.Roles = db.model<IRoleDocument>('roles', roleSchema);

  return models;
};

export const generateModels = createGenerateModels<IModels>(loadClasses);
