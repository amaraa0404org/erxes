import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import { Request as ApiRequest, Response as ApiResponse } from 'express';
import { IMainContext, IUserDocument } from '../../core-types';
import {
  extractCPUserFromHeader,
  extractClientPortalFromHeader,
  extractUserFromHeader,
} from '../headers';
import { generateRequestProcess, getSubdomain } from '../utils';
import { createScopedEventHandlers } from '../../core-modules/common/eventHandlers/generateEventHandlers';
import { setEventHandlerRuntimeContext } from '../../core-modules/common/eventHandlers/runtimeContext';
import { checkPermissionGroup } from '../../core-modules/permissions/utils';

export const generateApolloContext =
  <TContext>(
    apolloServerContext: (
      subdomain: string,
      context: IMainContext,
      req: ApiRequest,
      res: ApiResponse,
    ) => Promise<TContext>,
  ) =>
  async ({ req, res }: ExpressContextFunctionArgument) => {
    if (
      req.body.operationName === 'IntrospectionQuery' ||
      req.body.operationName === 'SubgraphIntrospectQuery'
    ) {
      return {};
    }

    const user = extractUserFromHeader(req.headers);
    const cpUser = extractCPUserFromHeader(req.headers);
    const clientPortal = extractClientPortalFromHeader(req.headers);

    const subdomain = getSubdomain(req);

    // Honor a caller-supplied correlation id (e.g. the AI agent stamps each
    // action) so a request's DB changes can be traced together; the
    // router propagates this header to every subgraph. Falls back to a fresh id.
    const incomingProcessId = req.headers['x-erxes-process-id'];
    const processInfo = generateRequestProcess(
      Array.isArray(incomingProcessId)
        ? incomingProcessId[0]
        : incomingProcessId,
    );

    const __ = <T extends object>(doc: T): T & { processId: string } => ({
      ...processInfo,
      ...doc,
    });
    setEventHandlerRuntimeContext(subdomain, {
      subdomain,
      processId: processInfo.processId || '',
      userId: user?._id || '',
    });

    const context: IMainContext = {
      // The header carries a user only for authenticated requests; resolvers
      // are gated by checkLogin/permission wrappers before reading `user`.
      user: user as IUserDocument,
      cpUser,
      clientPortal,
      req,
      res,
      subdomain,
      __,
      ...processInfo,
      requestInfo: {
        secure: req.secure,
        cookies: req.cookies,
      },
      eventHandlers: createScopedEventHandlers(subdomain, {
        subdomain,
        processId: processInfo.processId || '',
        userId: user?._id || '',
      }),
      checkPermission: checkPermissionGroup(subdomain, user ?? undefined),
    };

    if (apolloServerContext) {
      return await apolloServerContext(subdomain, context, req, res);
    }

    return context;
  };
