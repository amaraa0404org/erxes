import mongoose from 'mongoose';
import { getEnv } from '../utils';
import {
  saasAddonSchema,
  saasBundleSchema,
  saasOrganizationPlanHistorySchema,
  endPointSchema,
  experiencesSchema,
  saasInstallationSchema,
  saasOrganizationsSchema,
  saasPluginSchema,
  saasPromoCodeSchema,
  saasUserSchema,
} from './definition';
import {
  IOrganization,
  ISaasAddon,
  ISaasBundle,
  ISaasEndpoint,
  ISaasExperience,
  ISaasInstallation,
  ISaasOrganizationDetail,
  ISaasOrganizationDoc,
  ISaasOrganizationPlanHistory,
  ISaasPlugin,
  ISaasPromoCode,
  ISaasUser,
} from './types';
import { redis } from '../redis';
import { mongooseConnectionOptions } from '../mongo';

export let coreModelOrganizations: mongoose.Model<ISaasOrganizationDoc>;
export let coreModelAddons: mongoose.Model<ISaasAddon>;
export let coreModelBundles: mongoose.Model<ISaasBundle>;
export let coreModelInstallations: mongoose.Model<ISaasInstallation>;
export let coreModelUsers: mongoose.Model<ISaasUser>;
export let coreModelEndpoints: mongoose.Model<ISaasEndpoint>;
export let coreModelPromoCodes: mongoose.Model<ISaasPromoCode>;
export let coreModelPlugins: mongoose.Model<ISaasPlugin>;
export let coreModelExperiences: mongoose.Model<ISaasExperience>;
export let coreModelOrganizationPlanHistories: mongoose.Model<ISaasOrganizationPlanHistory>;

/**
 * Bind a declared document type to a SaaS-core collection schema. The shared
 * doc interfaces are partial views of schemas owned outside this repository,
 * so the schema argument is cast to the declared doc type once, here.
 */
const bindSaasCoreModel = <TDoc>(
  connection: mongoose.Connection,
  name: string,
  schema: mongoose.Schema,
): mongoose.Model<TDoc> =>
  connection.model<TDoc>(name, schema as mongoose.Schema<TDoc>);

export const getSaasCoreConnection = async (): Promise<void> => {
  if (coreModelOrganizations) {
    return;
  }

  const CORE_MONGO_URL = getEnv({ name: 'CORE_MONGO_URL' });

  // Guard before handing the URL to mongoose: an empty/invalid CORE_MONGO_URL
  // makes mongoose.createConnection throw AND emit an unhandled 'error' event
  // that crashes the whole process, bypassing callers' try/catch. Failing fast
  // here keeps the rejection catchable (e.g. SaaS limit checks fall back to the
  // enterprise/unlimited path when SaaS core isn't configured locally).
  if (!/^mongodb(\+srv)?:\/\//.test(CORE_MONGO_URL)) {
    throw new Error(
      'CORE_MONGO_URL is not configured (expected a mongodb:// connection string)',
    );
  }

  const coreConnection = await mongoose.createConnection(
    CORE_MONGO_URL,
    mongooseConnectionOptions,
  );

  coreModelOrganizations = bindSaasCoreModel<ISaasOrganizationDoc>(
    coreConnection,
    'organizations',
    saasOrganizationsSchema,
  );

  coreModelInstallations = bindSaasCoreModel<ISaasInstallation>(
    coreConnection,
    'installations',
    saasInstallationSchema,
  );
  coreModelExperiences = bindSaasCoreModel<ISaasExperience>(
    coreConnection,
    'experiences',
    experiencesSchema,
  );
  coreModelUsers = bindSaasCoreModel<ISaasUser>(
    coreConnection,
    'users',
    saasUserSchema,
  );
  coreModelEndpoints = bindSaasCoreModel<ISaasEndpoint>(
    coreConnection,
    'endpoints',
    endPointSchema,
  );
  coreModelPromoCodes = bindSaasCoreModel<ISaasPromoCode>(
    coreConnection,
    'promo_codes',
    saasPromoCodeSchema,
  );
  coreModelAddons = bindSaasCoreModel<ISaasAddon>(
    coreConnection,
    'addons',
    saasAddonSchema,
  );
  coreModelBundles = bindSaasCoreModel<ISaasBundle>(
    coreConnection,
    'bundles',
    saasBundleSchema,
  );
  coreModelPlugins = bindSaasCoreModel<ISaasPlugin>(
    coreConnection,
    'plugins',
    saasPluginSchema,
  );
  coreModelOrganizationPlanHistories =
    bindSaasCoreModel<ISaasOrganizationPlanHistory>(
      coreConnection,
      'organization_plan_histories',
      saasOrganizationPlanHistorySchema,
    );
};

export const ORGANIZATION_ID_MAPPING: { [key: string]: string } = {};

export const getSaasOrganizationIdBySubdomain = async (
  subdomain: string,
): Promise<string> => {
  if (ORGANIZATION_ID_MAPPING[subdomain]) {
    return ORGANIZATION_ID_MAPPING[subdomain];
  }

  await getSaasCoreConnection();

  const organization = await getSaasOrgsCache({ subdomain });

  if (!organization) {
    throw new Error(`Invalid host, subdomain: ${subdomain}`);
  }

  ORGANIZATION_ID_MAPPING[subdomain] = String(organization._id);

  return ORGANIZATION_ID_MAPPING[subdomain];
};

type SaasOrgsCacheParams = {
  subdomain?: string;
  excludeSubdomains?: string[];
  domain?: string;
};

export function getSaasOrgsCache(
  params: SaasOrgsCacheParams & { subdomain: string },
): Promise<IOrganization | undefined>;
export function getSaasOrgsCache(
  params: SaasOrgsCacheParams & { domain: string },
): Promise<IOrganization | undefined>;
export function getSaasOrgsCache(
  params?: SaasOrgsCacheParams,
): Promise<IOrganization[]>;
export async function getSaasOrgsCache({
  subdomain,
  excludeSubdomains,
  domain,
}: SaasOrgsCacheParams = {}): Promise<
  IOrganization | IOrganization[] | undefined
> {
  const value = await redis.get('core_organizations');

  let organizations: IOrganization[] = value ? JSON.parse(value) : [];

  if (organizations.length === 0) {
    organizations = (await coreModelOrganizations
      .find({})
      .lean()) as IOrganization[];

    redis.set('core_organizations', JSON.stringify(organizations));
  }

  if (subdomain) {
    return organizations.find((org) => org.subdomain === subdomain);
  }

  if (excludeSubdomains) {
    return organizations.filter(
      (org) => !excludeSubdomains.includes(org.subdomain),
    );
  }

  if (domain) {
    return organizations.find((org) => org.domain === domain);
  }

  return organizations;
}

export const getSaasOrganizations = async (email?: string) => {
  await getSaasCoreConnection();

  if (email) {
    return coreModelOrganizations.find({ ownerEmail: email });
  }

  return coreModelOrganizations.find({});
};

export const getSaasOrganizationsByFilter = async (
  filter?: mongoose.FilterQuery<ISaasOrganizationDoc>,
) => {
  await getSaasCoreConnection();

  if (filter) {
    return coreModelOrganizations.find(filter);
  }

  return coreModelOrganizations.find({});
};

export const updateSaasOrganization = async (
  subdomain: string,
  update: Record<string, unknown>,
) => {
  await getSaasCoreConnection();

  return coreModelOrganizations.updateOne({ subdomain }, { $set: update });
};

export const getSaasOrganizationDetail = async ({
  subdomain,
}: {
  subdomain: string;
}): Promise<ISaasOrganizationDetail> => {
  await getSaasCoreConnection();

  const organization = await coreModelOrganizations
    .findOne({ subdomain })
    .lean();

  if (!organization) {
    return {};
  }

  const charge = organization.charge || {};
  let experienceName = '';
  const bundleNames = [] as string[];
  const setupService: Record<string, boolean> = {};

  const installation = await coreModelInstallations.findOne({
    organizationId: organization._id,
  });

  if (installation) {
    const plugins = await getSaasPlugins({});
    const addons = await coreModelAddons.find(
      {
        installationId: installation._id.toString(),
        expiryDate: { $gt: new Date() },
        paymentStatus: { $in: ['complete', 'canceled'] },
      },
      { quantity: 1, kind: 1 },
    );

    const bundleTypes = await coreModelBundles.find({}).distinct('type').lean();

    const activeBundles = await coreModelAddons
      .find({
        installationId: installation._id.toString(),
        kind: { $in: bundleTypes },
        paymentStatus: { $in: ['complete', 'canceled'] },
        expiryDate: { $gt: new Date() },
      })
      .lean();

    for (const activeBundle of activeBundles) {
      const bundle = await coreModelBundles.findOne({
        type: activeBundle.kind,
      });

      if (bundle?.title) {
        bundleNames.push(bundle.title);
      }
    }

    for (const plugin of plugins) {
      let purchased = 0;
      let quantity = 0;
      let free = charge[plugin.type] ? charge[plugin.type].free || 0 : 0;
      let bundleAmount = 0;

      if (activeBundles && activeBundles.length > 0) {
        for (const activeBundle of activeBundles) {
          const bundle = await coreModelBundles.findOne({
            type: activeBundle.kind,
          });

          if (bundle) {
            bundleAmount = bundle.pluginLimits
              ? bundle.pluginLimits[plugin.type] || 0
              : 0;
          }
        }
      }

      addons
        .filter((addon) => addon.kind === plugin.type)
        .forEach((addon) => {
          quantity += addon.quantity || 0;
        });

      if (organization?.experienceId) {
        const experience = await coreModelExperiences.findOne({
          _id: organization.experienceId,
        });

        if (experience) {
          experienceName = experience.title || '';
          free =
            free +
            (experience.pluginLimits
              ? experience.pluginLimits[plugin.type] || 0
              : 0);
        }
      }

      purchased = quantity + (bundleAmount || 0) / (plugin.count || 1);

      charge[plugin.type] = {
        ...charge[plugin.type],
        free,
        purchased,
      };
    }

    const setupAddons = await coreModelAddons.find(
      {
        installationId: installation._id.toString(),
        paymentStatus: 'complete',
        kind: 'setupService',
      },
      { subkind: 1 },
    );

    for (const addon of setupAddons) {
      if (addon.subkind) {
        setupService[addon.subkind] = true;
      }
    }
  }

  if (organization?.bundleId) {
    const bundle = await coreModelBundles.findOne({
      _id: organization.bundleId,
    });

    if (bundle) {
      organization.bundle = {
        bundleId: organization.bundleId,
        title: bundle.title,
        type: bundle.type,
      };
    }
  }

  return {
    ...organization,
    experienceName,
    bundleNames,
    charge,
    setupService,
  };
};

export const getSaasOrganizationPlanHistories = async ({
  organizationId,
  statuses = ['active'],
}: {
  organizationId: string;
  statuses?: string[];
}): Promise<ISaasOrganizationPlanHistory[]> => {
  await getSaasCoreConnection();

  const histories = await coreModelOrganizationPlanHistories
    .find({
      organizationId,
      ...(statuses.length ? { status: { $in: statuses } } : {}),
    })
    .sort({ createdAt: -1 })
    .lean<ISaasOrganizationPlanHistory[]>();

  const bundleIds = Array.from(
    new Set(histories.map((history) => history.bundleId).filter(Boolean)),
  );

  if (!bundleIds.length) {
    return histories;
  }

  const bundles = await coreModelBundles
    .find({ _id: { $in: bundleIds } })
    .lean();

  const bundleById = new Map<string, ISaasBundle>(
    bundles.map((bundle) => [String(bundle._id), bundle]),
  );

  return histories.map((history) => ({
    ...history,
    bundle: history.bundleId ? bundleById.get(history.bundleId) : undefined,
  }));
};

export const getSaasOrganizationActiveAddons = async ({
  organizationId,
}: {
  organizationId: string;
}): Promise<ISaasAddon[]> => {
  await getSaasCoreConnection();

  const installation = await coreModelInstallations
    .findOne({ organizationId }, { _id: 1 })
    .lean();

  if (!installation?._id) {
    return [];
  }

  const addons = await coreModelAddons
    .find({
      installationId: String(installation._id),
      paymentStatus: 'complete',
      isCanceled: { $ne: true },
      $or: [{ expiryDate: { $gt: new Date() } }, { interval: 'oneTime' }],
    })
    .sort({ createdAt: -1 })
    .lean<ISaasAddon[]>();

  const bundleTypes = Array.from(
    new Set(addons.map((addon) => addon.kind).filter(Boolean)),
  );

  if (!bundleTypes.length) {
    return addons;
  }

  const bundles = await coreModelBundles
    .find({ type: { $in: bundleTypes } })
    .lean();

  const bundleByType = new Map<string, ISaasBundle>(
    bundles.map((bundle) => [String(bundle.type), bundle]),
  );

  return addons.map((addon) => ({
    ...addon,
    bundle: addon.kind ? bundleByType.get(addon.kind) : undefined,
  }));
};

export const removeOrgsCache = (source: string) => {
  console.log(`Removing org cache ${source}`);

  return redis.set('core_organizations', '');
};

export const getSaasPlugins = async (
  query: mongoose.FilterQuery<ISaasPlugin> = {},
) => {
  await getSaasCoreConnection();

  return coreModelPlugins.find(query).lean();
};

export const getSaasPlugin = async (
  query: mongoose.FilterQuery<ISaasPlugin> = {},
) => {
  await getSaasCoreConnection();

  return coreModelPlugins.findOne(query).lean();
};

export const getSaasPromoCodes = async (
  query: mongoose.FilterQuery<ISaasPromoCode> = {},
) => {
  await getSaasCoreConnection();

  return coreModelPromoCodes.find(query).lean();
};

export const getSaasOrgPromoCodes = async ({
  promoCodes = [],
}: IOrganization) => {
  if (!promoCodes.length) {
    return [];
  }

  return getSaasPromoCodes({
    code: { $in: promoCodes },
  });
};
