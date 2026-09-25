import { WorkOS } from '@workos-inc/node';
import {
  authCookieOptions,
  getEnv,
  logHandler,
  markResolvers,
  redis,
  updateSaasOrganization,
} from 'erxes-api-shared/utils';
import * as jwt from 'jsonwebtoken';
import { CookieOptions } from 'express';
import {
  MutationForgotPasswordArgs,
  MutationLoginArgs,
  MutationLoginWithMagicLinkArgs,
  MutationResetPasswordArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import {
  getCallbackRedirectUrl,
  isValidEmail,
  sendSaasMagicLinkEmail,
} from '~/modules/auth/utils';
import { assertSaasEnvironment } from '~/utils/saas';
import { sendEmail } from '~/utils/email';

export const authMutations: MutationResolvers<IContext> = {
  /*
   * Login   */
  async login(
    _parent,
    args: MutationLoginArgs,
    { req, res, requestInfo, models, subdomain }: IContext,
  ) {
    return await logHandler(
      async () => {
        const response = await models.Users.login({
          email: args.email,
          password: args.password,
          deviceToken: args.deviceToken ?? undefined,
        });

        const { token } = response;

        const sameSite = getEnv({ name: 'SAME_SITE' });
        const DOMAIN = getEnv({ name: 'DOMAIN', subdomain });

        const cookieOptions: Omit<CookieOptions, 'expires'> & {
          expires?: number;
        } = {
          secure: requestInfo.secure,
        };
        if (
          sameSite &&
          sameSite === 'none' &&
          res.req.headers.origin !== DOMAIN
        ) {
          cookieOptions.sameSite = sameSite;
        }

        res.cookie('auth-token', token, authCookieOptions(cookieOptions));

        return 'loggedIn';
      },
      {
        subdomain,
        source: 'auth',
        action: 'login',
        userId: (await models.Users.findOne({ email: args.email }).lean())?._id,
        payload: {
          headers: req.headers,
          email: args?.email,
          method: 'email/password',
        },
      },
      null,
      null,
      true,
    );
  },

  /*
   * logout
   */
  async logout(
    _parent,
    _args,
    { req, res, user, requestInfo, models, subdomain }: IContext,
  ) {
    return await logHandler(
      async () => {
        const logout = await models.Users.logout(
          user,
          requestInfo.cookies['auth-token'],
        );
        res.clearCookie('auth-token');
        return logout;
      },
      {
        subdomain,
        source: 'auth',
        action: 'logout',
        userId: user._id,
        payload: { headers: req.headers, email: user?.email },
      },
    );
  },

  /*
   * Send forgot password email
   */
  async forgotPassword(
    _parent,
    { email }: MutationForgotPasswordArgs,
    { subdomain, models }: IContext,
  ) {
    const tag = '[forgot-password]';
    const value = (email || '').toLowerCase().trim();

    const exact = await models.Users.findOne({ email: value }).lean();
    const insensitive = await models.Users.findOne({
      email: {
        $regex: new RegExp(
          `^${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
          'i',
        ),
      },
    }).lean();

    console.log(
      `${tag} subdomain=${subdomain} input=${JSON.stringify(
        email,
      )} normalized=${JSON.stringify(value)} exact=${!!exact} ci=${!!insensitive} stored=${JSON.stringify(
        insensitive?.email,
      )} userId=${insensitive?._id} isActive=${insensitive?.isActive}`,
    );

    const token = await models.Users.forgotPassword(email);

    // send email ==============
    const DOMAIN = getEnv({ name: 'DOMAIN', subdomain });

    const link = `${DOMAIN}/reset-password?token=${token}`;

    console.log(`${tag} token=${!!token} domain=${DOMAIN} to=${email}`);

    try {
      await sendEmail(
        subdomain,
        {
          toEmails: [email],
          title: 'Reset password',
          template: {
            name: 'resetPassword',
            data: {
              content: link,
            },
          },
        },
        models,
      );

      console.log(`${tag} sendEmail returned`);
    } catch (e) {
      const message = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
      console.log(`${tag} sendEmail threw: ${message}`);
      throw e;
    }

    return 'sent';
  },

  /*
   * Reset password
   */
  async resetPassword(
    _parent,
    args: MutationResetPasswordArgs,
    { models }: IContext,
  ) {
    // JSON scalar: the generated output type is Record<string, unknown>;
    // the user document is serialized by the scalar at runtime.
    return (await models.Users.resetPassword(args)) as unknown as Record<
      string,
      unknown
    >;
  },

  async loginWithGoogle(
    _parent,
    _params,
    { models, subdomain }: IContext,
  ) {
    assertSaasEnvironment();
    const WORKOS_API_KEY = getEnv({ name: 'WORKOS_API_KEY', subdomain });
    const CORE_DOMAIN = getEnv({ name: 'CORE_DOMAIN', subdomain });

    const workosClient = new WorkOS(WORKOS_API_KEY);

    const state = await jwt.sign(
      {
        subdomain,
        redirectUri: getCallbackRedirectUrl(subdomain, 'sso-callback'),
      },
      models.Users.getSecret(),
      { expiresIn: '1d' },
    );

    const authorizationURL = workosClient.sso.getAuthorizationUrl({
      provider: 'GoogleOAuth',
      redirectUri: `${CORE_DOMAIN}/saas-sso-callback`,

      clientId: getEnv({ name: 'WORKOS_PROJECT_ID', subdomain }),
      state,
    });

    await updateSaasOrganization(subdomain, {
      lastActiveDate: Date.now(),
    });

    return authorizationURL;
  },

  async loginWithMagicLink(
    _,
    { email }: MutationLoginWithMagicLinkArgs,
    { models, subdomain }: IContext,
  ) {
    assertSaasEnvironment();

    const WORKOS_API_KEY = getEnv({ name: 'WORKOS_API_KEY', subdomain });
    const CORE_DOMAIN = getEnv({ name: 'CORE_DOMAIN', subdomain });
    const workosClient = new WorkOS(WORKOS_API_KEY);

    if (!isValidEmail(email)) {
      throw new Error(
        'Invalid email address provided. Please enter a valid email.',
      );
    }

    const user = await models.Users.findOne({
      email,
    });

    if (!user) {
      return 'Invalid login';
    }

    const token = await jwt.sign(
      {
        user: await models.Users.getTokenFields(user),
        subdomain,
        redirectUri: getCallbackRedirectUrl(subdomain, 'ml-callback'),
      },
      models.Users.getSecret(),
      { expiresIn: '1d' },
    );

    // validated tokens are checked at user middleware
    await models.Users.updateOne(
      { _id: user._id },
      { $push: { validatedTokens: token } },
    );

    // will use subdomain when workos callback data arrives
    await redis.set('subdomain', subdomain);

    const session = await workosClient.passwordless.createSession({
      email,
      type: 'MagicLink',
      state: token,
      redirectURI: `${CORE_DOMAIN}/saas-ml-callback`,
    });

    await sendSaasMagicLinkEmail({
      subdomain,
      models,
      toEmail: email,
      link: session.link,
    });

    await updateSaasOrganization(subdomain, {
      lastActiveDate: Date.now(),
    });

    return 'success';
  },
};

markResolvers<IContext>(authMutations, {
  wrapperConfig: {
    skipPermission: true,
  },
});
