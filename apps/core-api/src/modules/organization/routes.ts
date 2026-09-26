import {
  getAvailablePlugins,
  getEnv,
  getPlugin,
  getSaasOrganizationDetail,
  getSubdomain,
  ISaasOrganizationDetail,
} from 'erxes-api-shared/utils';
import { Request, Response, Router } from 'express';
import rateLimit from 'express-rate-limit';
import { generateModels } from '~/connectionResolvers';
import { handleCoreLogin, magiclinkCallback, ssocallback } from '~/utils/saas';

// Rate limiter for /ml-callback route: max 100 requests per 15 minutes per IP
const callbackLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router: Router = Router();

router.get('/initial-setup', async (req: Request, res: Response) => {
  const subdomain = getSubdomain(req);
  const models = await generateModels(subdomain);

  let organizationInfo: ISaasOrganizationDetail = {
    type: 'os',
    config: {},
    hasOwner: false,
  };

  const VERSION = getEnv({ name: 'VERSION', defaultValue: 'os' });

  if (VERSION && VERSION === 'saas') {
    organizationInfo = await getSaasOrganizationDetail({
      subdomain,
    });

    organizationInfo.type = 'saas';
  }

  if (VERSION && VERSION === 'os') {
    const orgWhiteLabel = await models.OrgWhiteLabel.getOrgWhiteLabel();

    if (orgWhiteLabel?.enabled) {
      organizationInfo = {
        ...organizationInfo,
        ...orgWhiteLabel,
      };
    }
  }

  const userCount = await models.Users.countDocuments({
    isOwner: true,
  });

  if (userCount === 0) {
    organizationInfo.hasOwner = false;
  } else {
    organizationInfo.hasOwner = true;
  }

  return res.json(organizationInfo);
});

router.get('/get-frontend-plugins', async (req: Request, res: Response) => {
  const subdomain = getSubdomain(req);

  // OS mode: every live plugin. SaaS mode: organization charges
  // intersected with live plugins (handled inside getAvailablePlugins).
  const plugins = await getAvailablePlugins(subdomain);

  // Module-federation container names cannot contain dashes — Nx builds
  // "erxes-agent_ui" as global `erxes_agent_ui` — so the runtime remote
  // name must use underscores while the plugin keeps its real name.
  const remoteName = (pluginName: string): string =>
    `${pluginName.replace(/-/g, '_')}_ui`;

  const remotes: { name: string; entry: string }[] = [];

  for (const pluginName of plugins) {
    if (pluginName === 'core') {
      continue;
    }

    let entry: string | undefined;

    try {
      const plugin = await getPlugin(pluginName);
      entry = plugin?.config?.uiRemoteEntry;
    } catch {
      entry = undefined;
    }

    if (!entry) {
      continue;
    }

    remotes.push({ name: remoteName(pluginName), entry });
  }

  return res.json(remotes);
});

router.get('/sso-callback', callbackLimiter, ssocallback);
router.get('/ml-callback', callbackLimiter, magiclinkCallback);
router.get('/core-login', callbackLimiter, handleCoreLogin);

export { router };
