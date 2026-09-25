export interface ISaasChargeItem {
  free?: number;
  purchased?: number;
  used?: number;
  [key: string]: unknown;
}

export type ISaasChargeMap = Record<string, ISaasChargeItem>;

export interface IOrganization {
  _id?: string;
  name: string;
  subdomain: string;
  ownerId: string;
  plan: string;
  expiryDate: string;
  icon: string;
  teamMembersLimit: number;
  interval: string;
  charge?: ISaasChargeMap;

  logo?: string;
  favicon?: string;
  iconColor?: string;
  description?: string;
  dnsStatus?: string;
  backgroundColor?: string;
  isWhiteLabel?: boolean;
  isNext?: boolean;
  bundleId?: string;
  domain?: string;
  textColor?: string;
  lastActiveDate?: Date;
  cronLastExecutedDate?: { reset?: Date; notify?: Date };
  createdAt?: Date;
  promoCodes?: string[];
  partnerKey?: string;
  awsSesAccountStatus?: string;
}

/**
 * Organization document as stored in the SaaS core database: `IOrganization`
 * plus fields read/written by the saas helpers. `bundle` is attached in place
 * by `getSaasOrganizationDetail`.
 */
export interface ISaasOrganizationDoc extends IOrganization {
  ownerEmail?: string;
  experienceId?: string;
  bundle?: ISaasBundle;
}

/**
 * `getSaasOrganizationDetail` returns the raw core document plus computed
 * charge/bundle/setup fields, and consumers attach further ad-hoc keys
 * (`type`, `config`, `hasOwner`, ...). The index signature keeps that dynamic
 * boundary open.
 */
export interface ISaasOrganizationDetail {
  experienceName?: string;
  bundleNames?: string[];
  setupService?: Record<string, boolean>;
  bundle?: ISaasBundle;
  charge?: ISaasChargeMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ISaasBundle {
  _id?: string;
  title?: string;
  type?: string;
  isFree?: boolean;
  pluginsLimits?: Record<string, unknown>;
  /**
   * Per-plugin usage limits stored in the `bundles` collection
   * (`pluginLimits` is the stored field name; kept alongside the legacy
   * `pluginsLimits` key on the interface).
   */
  pluginLimits?: Record<string, number>;
  bundleId?: string;
}

export interface ISaasAddon {
  _id?: string;
  kind?: string;
  subkind?: string;
  quantity?: number;
  installationId?: string;
  subscriptionId?: string;
  expiryDate?: Date;
  interval?: string;
  paymentStatus?: string;
  paymentStatusMessage?: string;
  isCanceled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  bundle?: ISaasBundle;
}

export interface ISaasInstallation {
  _id?: string;
  createdAt?: Date;
  userId?: string;
  organizationId?: string;
  name?: string;
  token?: string;
  isVerified?: boolean;
  domain?: string;
}

export interface ISaasUser {
  _id?: string;
  organizationIds?: string[];
  email?: string;
}

export interface ISaasEndpoint {
  _id?: string;
  endPointUrl?: string;
}

export interface ISaasPromoCode {
  _id?: string;
  code?: string;
  status?: string;
  usedBy?: string;
  usedAt?: Date;
  type?: string;
  createdBy?: string;
  createdAt?: Date;
}

export interface ISaasPlugin {
  _id?: string;
  title?: string;
  type: string;
  limit?: number;
  count?: number;
  initialCount?: number;
  growthInitialCount?: number;
  resetMonthly?: boolean;
  unit?: string;
  comingSoon?: boolean;
  icon?: string;
  categories?: string[];
  dependencies?: string[];
  mainType?: string[];
  stripeProductId?: string;
  selfHosted?: boolean;
}

export interface ISaasExperience {
  _id?: string;
  title?: string;
  pluginLimits?: Record<string, number>;
  comingSoon?: boolean;
  isPrivate?: boolean;
  isActive?: boolean;
  promoCodes?: string[];
  description?: string;
  onboardingSteps?: string[];
  onboardingDescription?: string;
  features?: string;
  createdAt?: Date;
}

export interface ISaasOrganizationPlanHistory {
  _id?: string;
  organizationId: string;
  source?: string;
  status?: string;
  isNext?: boolean;
  productId?: string;
  bundleId?: string;
  interval?: string;
  description?: string;
  pluginsLimitsSnapshot?: Record<string, unknown>;
  assistantLimit?: number;
  stripeCheckoutSessionId?: string;
  stripePaymentIntentId?: string;
  stripeSubscriptionId?: string;
  stripeInvoiceId?: string;
  startsAt?: Date;
  endsAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  bundle?: ISaasBundle;
}
