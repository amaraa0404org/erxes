import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { IActivityLogDocument, IAutomationDocument, IAutomationExecutionDocument, IEmailAddressDocument, IEmailDeliveryDocument, IEmailSenderDocument, INotificationDocument, NotificationSettings } from 'erxes-api-shared/core-modules';
import type { IAppDocument, IBrandDocument, ICompanyDocument, ICustomerDocument, IEmailTemplateDocument, ILogDocument, IPermissionGroupDocument, IProductDocument, IProductCategoryDocument, IProductsConfigDocument, IRelationDocument, ITagDocument, IUomDocument, IUserDocument, IUserMovementDocument } from 'erxes-api-shared/core-types';
import type { IApprovalLockDocument } from '../modules/approval/db/definitions/approvalLocks';
import type { IApprovalRequestDocument } from '../modules/approval/db/definitions/approvalRequests';
import type { IAutomationWorkflowTemplateDocument } from '../modules/automations/db/models/AutomationWorkflowTemplates';
import type { IBranchDocument, IDepartmentDocument, IPositionDocument, IStructureDocument, IUnitDocument } from '../modules/organization/structure/@types/structure';
import type { IBroadcastRecipientDocument } from '../modules/broadcast/db/models/BroadcastRecipients';
import type { IBroadcastRunDocument } from '../modules/broadcast/db/models/BroadcastRuns';
import type { IBroadcastTraceDocument } from '../modules/broadcast/db/models/BroadcastTraces';
import type { IBundleConditionDocument } from '../modules/bundle/@types/bundleCondition';
import type { IBundleRuleDocument } from '../modules/bundle/@types/bundleRule';
import type { ICPCommentDocument } from '../modules/clientportal/types/comment';
import type { ICPNotificationDocument } from '../modules/clientportal/types/cpNotification';
import type { ICPUserDocument } from '../modules/clientportal/types/cpUser';
import type { IClientPortalDocument } from '../modules/clientportal/types/clientPortal';
import type { IConfigDocument } from '../modules/organization/settings/db/definitions/configs';
import type { IConformityDocument } from '../modules/conformities/db/definitions/conformities';
import type { IDeliveryReportsDocument } from '../modules/broadcast/@types/delivery';
import type { IDocumentDocument } from '../modules/documents/types';
import type { IEngageMessageDocument } from '../modules/broadcast/@types/engage';
import type { IExportDocument } from '../modules/import-export/db/models/Exports';
import type { IFavoritesDocument } from '../modules/organization/settings/db/definitions/favorites';
import type { IFieldDocument } from '../modules/properties/@types/field';
import type { IFieldGroupDocument } from '../modules/properties/@types/group';
import type { IImportDocument } from '../modules/import-export/db/models/Imports';
import type { IInternalNoteDocument } from '../modules/internalNote/types';
import type { IOAuthClientAppDocument } from '../modules/auth/db/definitions/oauthClientApps';
import type { IPackageDocument } from '../modules/products/@types/package';
import type { IProductRuleDocument } from '../modules/products/@types/rule';
import type { IProductSimilarityDocument } from '../modules/products/@types/similarity';
import type { ISystemFieldSettingDocument } from '../modules/properties/@types/systemField';
import type { ISegmentDocument } from '../modules/segments/db/definitions/segments';
import type { ISmsRequestDocument } from '../modules/broadcast/@types/sms';
import type { ITemplateDocument } from '../modules/template/@types/template';
import type { ITemplateCategoryDocument } from '../modules/template/@types/category';
import type { IContext } from '../connectionResolvers';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
  _FieldSet: { input: unknown; output: unknown; }
};

export type Action = {
  __typename?: 'Action';
  config?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  nextActionId?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['JSON']['output']>;
  style?: Maybe<Scalars['JSON']['output']>;
  targetActionId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  workflowId?: Maybe<Scalars['String']['output']>;
};

export type ActionCode = {
  __typename?: 'ActionCode';
  code?: Maybe<Scalars['String']['output']>;
  expires?: Maybe<Scalars['Date']['output']>;
  type?: Maybe<ActionCodeType>;
};

export enum ActionCodeType {
  EmailChange = 'EMAIL_CHANGE',
  EmailVerification = 'EMAIL_VERIFICATION',
  PasswordReset = 'PASSWORD_RESET',
  PhoneChange = 'PHONE_CHANGE',
  PhoneVerification = 'PHONE_VERIFICATION',
  TwoFactorVerification = 'TWO_FACTOR_VERIFICATION'
}

export type ActionInput = {
  config?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  nextActionId?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['JSON']['input']>;
  style?: InputMaybe<Scalars['JSON']['input']>;
  targetActionId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  workflowId?: InputMaybe<Scalars['String']['input']>;
};

export type ActivityLog = {
  __typename?: 'ActivityLog';
  _id?: Maybe<Scalars['String']['output']>;
  action?: Maybe<Scalars['JSON']['output']>;
  activityType?: Maybe<Scalars['String']['output']>;
  actor?: Maybe<Scalars['JSON']['output']>;
  actorType?: Maybe<Scalars['String']['output']>;
  changes?: Maybe<Scalars['JSON']['output']>;
  context?: Maybe<Scalars['JSON']['output']>;
  contextType?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  sourcePlugin?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Scalars['JSON']['output']>;
  targetType?: Maybe<Scalars['String']['output']>;
};

export type ActivityLogsList = {
  __typename?: 'ActivityLogsList';
  list?: Maybe<Array<Maybe<ActivityLog>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type AiAgentHealth = {
  __typename?: 'AiAgentHealth';
  checkedAt: Scalars['String']['output'];
  checks?: Maybe<Scalars['JSON']['output']>;
  errors: Array<Scalars['String']['output']>;
  ready: Scalars['Boolean']['output'];
  warnings: Array<Scalars['String']['output']>;
};

export type App = {
  __typename?: 'App';
  _id?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  lastUsedAt?: Maybe<Scalars['Date']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type ApprovalChange = {
  __typename?: 'ApprovalChange';
  changeType?: Maybe<Scalars['String']['output']>;
  payload?: Maybe<Scalars['JSON']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
};

export type ApprovalChangeInput = {
  changeType: Scalars['String']['input'];
  payload?: InputMaybe<Scalars['JSON']['input']>;
  summary: Scalars['String']['input'];
};

export type ApprovalContentMeta = {
  __typename?: 'ApprovalContentMeta';
  contentId?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['String']['output']>;
};

export type ApprovalDecision = {
  __typename?: 'ApprovalDecision';
  at?: Maybe<Scalars['Date']['output']>;
  decision?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ApprovalLock = {
  __typename?: 'ApprovalLock';
  _id: Scalars['String']['output'];
  allowedUserIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  approvalMode?: Maybe<Scalars['String']['output']>;
  approverScope?: Maybe<Scalars['String']['output']>;
  contentId?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  lockedBy?: Maybe<Scalars['String']['output']>;
  ownerIdSnapshot?: Maybe<Scalars['String']['output']>;
  releaseReason?: Maybe<Scalars['String']['output']>;
  releasedAt?: Maybe<Scalars['Date']['output']>;
  releasedBy?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type ApprovalLockCreateInput = {
  allowedUserIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType: Scalars['String']['input'];
  contentTypeId: Scalars['String']['input'];
  mode?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['String']['input'];
  scope?: InputMaybe<Scalars['String']['input']>;
};

export type ApprovalLockState = {
  __typename?: 'ApprovalLockState';
  action?: Maybe<Scalars['String']['output']>;
  content?: Maybe<ApprovalContentMeta>;
  contentId?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  hasAccess?: Maybe<Scalars['Boolean']['output']>;
  lock?: Maybe<ApprovalLock>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  pendingRequest?: Maybe<ApprovalRequest>;
  reason?: Maybe<Scalars['String']['output']>;
};

export type ApprovalRequest = {
  __typename?: 'ApprovalRequest';
  _id: Scalars['String']['output'];
  appliedAt?: Maybe<Scalars['Date']['output']>;
  applyError?: Maybe<Scalars['String']['output']>;
  change?: Maybe<ApprovalChange>;
  content?: Maybe<ApprovalContentMeta>;
  contentId?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  decisions?: Maybe<Array<Maybe<ApprovalDecision>>>;
  kind?: Maybe<Scalars['String']['output']>;
  lockId?: Maybe<Scalars['String']['output']>;
  notificationIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  reason?: Maybe<Scalars['String']['output']>;
  requester?: Maybe<User>;
  requesterId?: Maybe<Scalars['String']['output']>;
  requiredApproverIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  requiredApprovers?: Maybe<Array<Maybe<User>>>;
  resolvedAt?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type ApprovalRequestCreateInput = {
  approverIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  change?: InputMaybe<ApprovalChangeInput>;
  contentId: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type ApprovalRequestsList = {
  __typename?: 'ApprovalRequestsList';
  list?: Maybe<Array<Maybe<ApprovalRequest>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Attachment = {
  __typename?: 'Attachment';
  duration?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type AttachmentInput = {
  duration?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type Auth = {
  __typename?: 'Auth';
  authConfig?: Maybe<AuthConfig>;
  facebookOAuth?: Maybe<FacebookOAuthConfig>;
  googleOAuth?: Maybe<GoogleOAuthConfig>;
  socialpayConfig?: Maybe<SocialpayConfig>;
  tokiConfig?: Maybe<TokiConfig>;
};

export type AuthConfig = {
  __typename?: 'AuthConfig';
  accessTokenExpirationInDays?: Maybe<Scalars['Int']['output']>;
  deliveryMethod?: Maybe<TokenDeliveryMethod>;
  refreshTokenExpirationInDays?: Maybe<Scalars['Int']['output']>;
};

export type AuthConfigInput = {
  accessTokenExpirationInDays?: InputMaybe<Scalars['Int']['input']>;
  deliveryMethod?: InputMaybe<TokenDeliveryMethod>;
  refreshTokenExpirationInDays?: InputMaybe<Scalars['Int']['input']>;
};

export type AuthInput = {
  authConfig?: InputMaybe<AuthConfigInput>;
  facebookOAuth?: InputMaybe<FacebookOAuthConfigInput>;
  googleOAuth?: InputMaybe<GoogleOAuthConfigInput>;
  socialpayConfig?: InputMaybe<SocialpayConfigInput>;
  tokiConfig?: InputMaybe<TokiConfigInput>;
};

export enum AuthMethod {
  Email = 'EMAIL',
  Phone = 'PHONE',
  Social = 'SOCIAL'
}

export type AuthTokenResponse = {
  __typename?: 'AuthTokenResponse';
  accessToken: Scalars['String']['output'];
  expiresIn: Scalars['Int']['output'];
  refreshToken: Scalars['String']['output'];
  tokenType: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type Automation = {
  __typename?: 'Automation';
  _id: Scalars['String']['output'];
  actions?: Maybe<Array<Maybe<Action>>>;
  activatedAt?: Maybe<Scalars['Date']['output']>;
  activatedBy?: Maybe<Scalars['String']['output']>;
  approvalLockState?: Maybe<ApprovalLockState>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  createdUser?: Maybe<User>;
  duplicatedFrom?: Maybe<Scalars['String']['output']>;
  duplicatedFromName?: Maybe<Scalars['String']['output']>;
  edgeType?: Maybe<Scalars['String']['output']>;
  flowDirection?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Array<Maybe<AutomationNote>>>;
  ownedBy?: Maybe<Scalars['String']['output']>;
  ownerContentId?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['String']['output']>;
  ownerUser?: Maybe<User>;
  status?: Maybe<Scalars['String']['output']>;
  tagIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  triggers?: Maybe<Array<Maybe<Trigger>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  updatedUser?: Maybe<User>;
  workflows?: Maybe<Array<Maybe<Workflow>>>;
};


export type AutomationApprovalLockStateArgs = {
  action?: InputMaybe<Scalars['String']['input']>;
};

export type AutomationHistories = {
  __typename?: 'AutomationHistories';
  list?: Maybe<Array<Maybe<AutomationHistory>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type AutomationHistory = {
  __typename?: 'AutomationHistory';
  _id?: Maybe<Scalars['String']['output']>;
  actions?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  automationId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  depth?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  errorCode?: Maybe<Scalars['String']['output']>;
  failedActionId?: Maybe<Scalars['String']['output']>;
  failedActionType?: Maybe<Scalars['String']['output']>;
  handledFailureActionIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  inputs?: Maybe<Scalars['JSON']['output']>;
  modifiedAt?: Maybe<Scalars['Date']['output']>;
  nextActionId?: Maybe<Scalars['String']['output']>;
  parentExecutionId?: Maybe<Scalars['String']['output']>;
  startWaitingDate?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Scalars['JSON']['output']>;
  targetId?: Maybe<Scalars['String']['output']>;
  triggerConfig?: Maybe<Scalars['JSON']['output']>;
  triggerId?: Maybe<Scalars['String']['output']>;
  triggerType?: Maybe<Scalars['String']['output']>;
  waitingActionId?: Maybe<Scalars['String']['output']>;
  workflowId?: Maybe<Scalars['String']['output']>;
};

export type AutomationNote = {
  __typename?: 'AutomationNote';
  color?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['JSON']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type AutomationStats = {
  __typename?: 'AutomationStats';
  byErrorCode?: Maybe<Array<Maybe<AutomationStatsCount>>>;
  byStatus?: Maybe<Array<Maybe<AutomationStatsCount>>>;
  errorMessages?: Maybe<Array<Maybe<AutomationStatsErrorMessage>>>;
  nodes?: Maybe<Array<Maybe<AutomationStatsNode>>>;
  timeSeries?: Maybe<Array<Maybe<AutomationStatsBucket>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type AutomationStatsBucket = {
  __typename?: 'AutomationStatsBucket';
  complete?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  waiting?: Maybe<Scalars['Int']['output']>;
};

export type AutomationStatsCount = {
  __typename?: 'AutomationStatsCount';
  count?: Maybe<Scalars['Int']['output']>;
  key?: Maybe<Scalars['String']['output']>;
};

export type AutomationStatsErrorMessage = {
  __typename?: 'AutomationStatsErrorMessage';
  actionTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  count?: Maybe<Scalars['Int']['output']>;
  errorCode?: Maybe<Scalars['String']['output']>;
  lastAt?: Maybe<Scalars['Date']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type AutomationStatsNode = {
  __typename?: 'AutomationStatsNode';
  actionId?: Maybe<Scalars['String']['output']>;
  actionType?: Maybe<Scalars['String']['output']>;
  avgDurationMs?: Maybe<Scalars['Float']['output']>;
  error?: Maybe<Scalars['Int']['output']>;
  errorCodes?: Maybe<Array<Maybe<AutomationStatsCount>>>;
  maxDurationMs?: Maybe<Scalars['Float']['output']>;
  success?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  waiting?: Maybe<Scalars['Int']['output']>;
};

export type AutomationWorkflowTemplate = {
  __typename?: 'AutomationWorkflowTemplate';
  _id: Scalars['String']['output'];
  actions?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  entryActionId?: Maybe<Scalars['String']['output']>;
  inputs?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type AutomationsListResponse = {
  __typename?: 'AutomationsListResponse';
  list?: Maybe<Array<Maybe<Automation>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Float']['output']>;
};

export type AvgEmailStats = {
  __typename?: 'AvgEmailStats';
  avgBouncePercent?: Maybe<Scalars['Float']['output']>;
  avgClickPercent?: Maybe<Scalars['Float']['output']>;
  avgComplaintPercent?: Maybe<Scalars['Float']['output']>;
  avgDeliveryPercent?: Maybe<Scalars['Float']['output']>;
  avgOpenPercent?: Maybe<Scalars['Float']['output']>;
  avgRejectPercent?: Maybe<Scalars['Float']['output']>;
  avgRenderingFailurePercent?: Maybe<Scalars['Float']['output']>;
  avgSendPercent?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type Branch = {
  __typename?: 'Branch';
  _id?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  children?: Maybe<Array<Maybe<Branch>>>;
  code?: Maybe<Scalars['String']['output']>;
  coordinate?: Maybe<Coordinate>;
  email?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  holidays?: Maybe<Scalars['JSON']['output']>;
  image?: Maybe<Attachment>;
  links?: Maybe<Scalars['JSON']['output']>;
  order?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Branch>;
  parentId?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  radius?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  supervisor?: Maybe<User>;
  supervisorId?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userCount?: Maybe<Scalars['Int']['output']>;
  userIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  users?: Maybe<Array<Maybe<User>>>;
  workhours?: Maybe<Scalars['JSON']['output']>;
};

export type BranchesListResponse = {
  __typename?: 'BranchesListResponse';
  list?: Maybe<Array<Maybe<Branch>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Brand = {
  __typename?: 'Brand';
  _id?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  cursor?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  emailConfig?: Maybe<Scalars['JSON']['output']>;
  memberIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type BrandListResponse = {
  __typename?: 'BrandListResponse';
  list?: Maybe<Array<Maybe<Brand>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type BroadcastEmailDryRun = {
  __typename?: 'BroadcastEmailDryRun';
  fields?: Maybe<Array<Maybe<BroadcastEmailFieldCoverage>>>;
  sampleHtml?: Maybe<Scalars['String']['output']>;
  sampleTo?: Maybe<Scalars['String']['output']>;
  sampled?: Maybe<Scalars['Int']['output']>;
  unresolved?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type BroadcastEmailFieldCoverage = {
  __typename?: 'BroadcastEmailFieldCoverage';
  filled?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  missing?: Maybe<Scalars['Int']['output']>;
};

export type BroadcastRecipient = {
  __typename?: 'BroadcastRecipient';
  _id: Scalars['String']['output'];
  attempts?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  customer?: Maybe<Customer>;
  customerId: Scalars['String']['output'];
  /** The flow this dispatch started, absent until the service creates it */
  execution?: Maybe<AutomationHistory>;
  finishedAt?: Maybe<Scalars['Date']['output']>;
  /** Why it was not sent, on anything but a plain send */
  reason?: Maybe<Scalars['String']['output']>;
  runId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type BroadcastRecipientEmail = {
  __typename?: 'BroadcastRecipientEmail';
  events?: Maybe<Array<Maybe<BroadcastRecipientEmailEvent>>>;
  from?: Maybe<Scalars['String']['output']>;
  html?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  replyTo?: Maybe<Scalars['String']['output']>;
  sentAt?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};

export type BroadcastRecipientEmailEvent = {
  __typename?: 'BroadcastRecipientEmailEvent';
  createdAt?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type BroadcastRecipientListResponse = {
  __typename?: 'BroadcastRecipientListResponse';
  list?: Maybe<Array<Maybe<BroadcastRecipient>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type BroadcastRun = {
  __typename?: 'BroadcastRun';
  _id: Scalars['String']['output'];
  /** How many recipients ended in each status */
  counts?: Maybe<Scalars['JSON']['output']>;
  finishedAt?: Maybe<Scalars['Date']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  runCount?: Maybe<Scalars['Int']['output']>;
  startedAt?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type BroadcastTrace = {
  __typename?: 'BroadcastTrace';
  _id: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  engageMessageId: Scalars['String']['output'];
  message: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type BundleCondition = {
  __typename?: 'BundleCondition';
  _id: Scalars['String']['output'];
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type BundleRule = {
  __typename?: 'BundleRule';
  _id: Scalars['String']['output'];
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rules?: Maybe<Array<Maybe<BundleRuleItem>>>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type BundleRuleItem = {
  __typename?: 'BundleRuleItem';
  allowSkip?: Maybe<Scalars['Boolean']['output']>;
  code: Scalars['String']['output'];
  percent?: Maybe<Scalars['Float']['output']>;
  priceAdjustFactor?: Maybe<Scalars['String']['output']>;
  priceAdjustType?: Maybe<Scalars['String']['output']>;
  priceType?: Maybe<PriceType>;
  priceValue?: Maybe<Scalars['Float']['output']>;
  productIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  products?: Maybe<Array<Maybe<Product>>>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

export type BundleRuleItemInput = {
  allowSkip?: InputMaybe<Scalars['Boolean']['input']>;
  code: Scalars['String']['input'];
  percent?: InputMaybe<Scalars['Float']['input']>;
  priceAdjustFactor?: InputMaybe<Scalars['String']['input']>;
  priceAdjustType?: InputMaybe<Scalars['String']['input']>;
  priceType?: InputMaybe<PriceType>;
  priceValue?: InputMaybe<Scalars['Float']['input']>;
  productIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export enum Contact_Status {
  Active = 'active',
  Deleted = 'deleted'
}

export type CpComment = {
  __typename?: 'CPComment';
  _id: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  parentId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  typeId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  userType?: Maybe<CpCommentUserType>;
};

export type CpCommentFilter = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  typeId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  userType?: InputMaybe<CpCommentUserType>;
};

export type CpCommentInput = {
  content: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  typeId: Scalars['String']['input'];
};

export type CpCommentListResponse = {
  __typename?: 'CPCommentListResponse';
  list?: Maybe<Array<Maybe<CpComment>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type CpCommentUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export enum CpCommentUserType {
  Client = 'client',
  Team = 'team'
}

export type CpExamplePost = {
  __typename?: 'CPExamplePost';
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CpNotification = {
  __typename?: 'CPNotification';
  _id: Scalars['String']['output'];
  action?: Maybe<Scalars['String']['output']>;
  clientPortalId: Scalars['String']['output'];
  contentType?: Maybe<Scalars['String']['output']>;
  contentTypeId?: Maybe<Scalars['String']['output']>;
  cpUserId: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  expiresAt?: Maybe<Scalars['Date']['output']>;
  isRead: Scalars['Boolean']['output'];
  kind: Scalars['String']['output'];
  message: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  priority: Scalars['String']['output'];
  priorityLevel: Scalars['Int']['output'];
  readAt?: Maybe<Scalars['Date']['output']>;
  result?: Maybe<CpNotificationResult>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CpNotificationFilters = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<CpNotificationKind>;
  priority?: InputMaybe<CpNotificationPriority>;
  status?: InputMaybe<CpNotificationStatus>;
  type?: InputMaybe<CpNotificationType>;
};

export enum CpNotificationKind {
  System = 'SYSTEM',
  User = 'USER'
}

export type CpNotificationListResponse = {
  __typename?: 'CPNotificationListResponse';
  list?: Maybe<Array<Maybe<CpNotification>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export enum CpNotificationPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Urgent = 'URGENT'
}

export type CpNotificationResult = {
  __typename?: 'CPNotificationResult';
  android?: Maybe<Scalars['Boolean']['output']>;
  ios?: Maybe<Scalars['Boolean']['output']>;
  web?: Maybe<Scalars['Boolean']['output']>;
};

export type CpNotificationSendInput = {
  kind?: InputMaybe<CpNotificationKind>;
  message: Scalars['String']['input'];
  priority?: InputMaybe<CpNotificationPriority>;
  title: Scalars['String']['input'];
  type?: InputMaybe<CpNotificationType>;
};

export enum CpNotificationStatus {
  All = 'ALL',
  Read = 'READ',
  Unread = 'UNREAD'
}

export enum CpNotificationType {
  Error = 'ERROR',
  Info = 'INFO',
  Success = 'SUCCESS',
  Warning = 'WARNING'
}

export type CpUnit = {
  __typename?: 'CPUnit';
  _id: Scalars['String']['output'];
  code?: Maybe<Scalars['String']['output']>;
  department?: Maybe<CpUnitDepartment>;
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  users?: Maybe<Array<Maybe<CpUnitUser>>>;
};

export type CpUnitDepartment = {
  __typename?: 'CPUnitDepartment';
  _id?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CpUnitUser = {
  __typename?: 'CPUnitUser';
  _id?: Maybe<Scalars['String']['output']>;
  details?: Maybe<CpUnitUserDetails>;
  email?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type CpUnitUserDetails = {
  __typename?: 'CPUnitUserDetails';
  avatar?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  shortName?: Maybe<Scalars['String']['output']>;
};

export type CpUser = {
  __typename?: 'CPUser';
  _id: Scalars['String']['output'];
  accountLockedUntil?: Maybe<Scalars['Date']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  clientPortal?: Maybe<ClientPortal>;
  clientPortalId: Scalars['String']['output'];
  code?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Company>;
  companyName?: Maybe<Scalars['String']['output']>;
  companyRegistrationNumber?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  customFieldsData?: Maybe<Scalars['JSON']['output']>;
  customer?: Maybe<Customer>;
  email?: Maybe<Scalars['String']['output']>;
  erxesCompanyId?: Maybe<Scalars['String']['output']>;
  erxesCustomerId?: Maybe<Scalars['String']['output']>;
  failedLoginAttempts?: Maybe<Scalars['Int']['output']>;
  fcmTokens?: Maybe<Array<Maybe<FcmDevice>>>;
  firstName?: Maybe<Scalars['String']['output']>;
  isEmailVerified: Scalars['Boolean']['output'];
  isPhoneVerified: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  lastLoginAt?: Maybe<Scalars['Date']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  otpResendAttempts?: Maybe<Scalars['Int']['output']>;
  otpResendLastAttempt?: Maybe<Scalars['Date']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  primaryAuthMethod?: Maybe<AuthMethod>;
  propertiesData?: Maybe<Scalars['JSON']['output']>;
  socialAuthProviders?: Maybe<Array<Maybe<SocialAuthProviderInfo>>>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  verificationRequest?: Maybe<VerificationRequest>;
};

export type CpUserListResponse = {
  __typename?: 'CPUserListResponse';
  list?: Maybe<Array<Maybe<CpUser>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type CpUserRemoveResponse = {
  __typename?: 'CPUserRemoveResponse';
  _id: Scalars['String']['output'];
};

export enum CpUserType {
  Company = 'company',
  Customer = 'customer'
}

export enum Cursor_Direction {
  Backward = 'backward',
  Forward = 'forward'
}

export enum Cursor_Mode {
  Exclusive = 'exclusive',
  Inclusive = 'inclusive'
}

export enum Customer_Relation_Type {
  Brand = 'BRAND',
  Tag = 'TAG'
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type ClientPortal = {
  __typename?: 'ClientPortal';
  _id: Scalars['String']['output'];
  auth?: Maybe<Auth>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  enableManualVerification?: Maybe<Scalars['Boolean']['output']>;
  erxesIntegrationToken?: Maybe<Scalars['String']['output']>;
  firebaseConfig?: Maybe<FirebaseConfig>;
  manualVerificationConfig?: Maybe<ManualVerificationConfig>;
  name: Scalars['String']['output'];
  securityAuthConfig?: Maybe<SecurityAuthConfig>;
  smsProvidersConfig?: Maybe<SmsProvidersConfig>;
  testUser?: Maybe<TestUser>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  useB2B?: Maybe<Scalars['Boolean']['output']>;
};

export type ClientPortalConfigInput = {
  auth?: InputMaybe<AuthInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  enableManualVerification?: InputMaybe<Scalars['Boolean']['input']>;
  erxesIntegrationToken?: InputMaybe<Scalars['String']['input']>;
  firebaseConfig?: InputMaybe<FirebaseConfigInput>;
  manualVerificationConfig?: InputMaybe<ManualVerificationConfigInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  securityAuthConfig?: InputMaybe<SecurityAuthConfigInput>;
  smsProvidersConfig?: InputMaybe<SmsProvidersConfigInput>;
  testUser?: InputMaybe<TestUserInput>;
  token?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  useB2B?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ClientPortalListResponse = {
  __typename?: 'ClientPortalListResponse';
  list?: Maybe<Array<Maybe<ClientPortal>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type CompaniesListResponse = {
  __typename?: 'CompaniesListResponse';
  list?: Maybe<Array<Maybe<Company>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Company = {
  __typename?: 'Company';
  _id?: Maybe<Scalars['String']['output']>;
  addresses?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  avatar?: Maybe<Scalars['String']['output']>;
  businessType?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  cursor?: Maybe<Scalars['String']['output']>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  description?: Maybe<Scalars['String']['output']>;
  emails?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  getTags?: Maybe<Array<Maybe<Tag>>>;
  industry?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSubscribed?: Maybe<Scalars['String']['output']>;
  links?: Maybe<Scalars['JSON']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  mergedIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  names?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['String']['output']>;
  parentCompany?: Maybe<Company>;
  parentCompanyId?: Maybe<Scalars['String']['output']>;
  phones?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  primaryAddress?: Maybe<Scalars['JSON']['output']>;
  primaryEmail?: Maybe<Scalars['String']['output']>;
  primaryName?: Maybe<Scalars['String']['output']>;
  primaryPhone?: Maybe<Scalars['String']['output']>;
  propertiesData?: Maybe<Scalars['JSON']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tagIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  trackedData?: Maybe<Scalars['JSON']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type Config = {
  __typename?: 'Config';
  _id: Scalars['String']['output'];
  code: Scalars['String']['output'];
  value?: Maybe<Scalars['JSON']['output']>;
};

export type Conformity = {
  __typename?: 'Conformity';
  _id: Scalars['String']['output'];
  mainType?: Maybe<Scalars['String']['output']>;
  mainTypeId?: Maybe<Scalars['String']['output']>;
  relType?: Maybe<Scalars['String']['output']>;
  relTypeId?: Maybe<Scalars['String']['output']>;
};

export type CookieOrganization = {
  __typename?: 'CookieOrganization';
  name?: Maybe<Scalars['String']['output']>;
  subdomain?: Maybe<Scalars['String']['output']>;
};

export type Coordinate = {
  __typename?: 'Coordinate';
  latitude?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
};

export type CoordinateInput = {
  latitude?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
};

export type CoreModulesGlobalSearchResult = {
  __typename?: 'CoreModulesGlobalSearchResult';
  list?: Maybe<Array<Maybe<GlobalSearchResultItem>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type CpFieldGroupParams = {
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
};

export type CpFieldsParams = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentTypeId?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
};

export type CurrentUserPermissionsResult = {
  __typename?: 'CurrentUserPermissionsResult';
  permissions: Array<Maybe<UserPermission>>;
  pluginsWithPermissions: Array<Maybe<Scalars['String']['output']>>;
};

export type CustomPermission = {
  __typename?: 'CustomPermission';
  actions: Array<Maybe<Scalars['String']['output']>>;
  module: Scalars['String']['output'];
  plugin: Scalars['String']['output'];
  scope: Scalars['String']['output'];
};

export type Customer = {
  __typename?: 'Customer';
  _id?: Maybe<Scalars['String']['output']>;
  addresses?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  avatar?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['Date']['output']>;
  clientPortalId?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  companies?: Maybe<Array<Maybe<Company>>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  cursor?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailValidationStatus?: Maybe<Scalars['String']['output']>;
  emails?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  firstName?: Maybe<Scalars['String']['output']>;
  getTags?: Maybe<Array<Maybe<Tag>>>;
  hasAuthority?: Maybe<Scalars['String']['output']>;
  integrationId?: Maybe<Scalars['String']['output']>;
  isOnline?: Maybe<Scalars['Boolean']['output']>;
  isSubscribed?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  lastSeenAt?: Maybe<Scalars['Date']['output']>;
  leadStatus?: Maybe<Scalars['String']['output']>;
  links?: Maybe<Scalars['JSON']['output']>;
  location?: Maybe<Scalars['JSON']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  phoneValidationStatus?: Maybe<Scalars['String']['output']>;
  phones?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  position?: Maybe<Scalars['String']['output']>;
  primaryAddress?: Maybe<Scalars['JSON']['output']>;
  primaryEmail?: Maybe<Scalars['String']['output']>;
  primaryPhone?: Maybe<Scalars['String']['output']>;
  propertiesData?: Maybe<Scalars['JSON']['output']>;
  remoteAddress?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  sessionCount?: Maybe<Scalars['Int']['output']>;
  sex?: Maybe<Scalars['Int']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tagIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  trackedData?: Maybe<Scalars['JSON']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  urlVisits?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  visitorContactInfo?: Maybe<Scalars['JSON']['output']>;
};

export type CustomersListResponse = {
  __typename?: 'CustomersListResponse';
  list?: Maybe<Array<Maybe<Customer>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type DefaultPermissionGroup = {
  __typename?: 'DefaultPermissionGroup';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  members?: Maybe<Array<Maybe<User>>>;
  name: Scalars['String']['output'];
  permissions: Array<Maybe<PermissionGroupPermission>>;
  plugin: Scalars['String']['output'];
};

export type DeliveryList = {
  __typename?: 'DeliveryList';
  list?: Maybe<Array<Maybe<SmsDelivery>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type DeliveryReport = {
  __typename?: 'DeliveryReport';
  _id: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  customerId?: Maybe<Scalars['String']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  engage?: Maybe<EngageMessage>;
  mailId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Department = {
  __typename?: 'Department';
  _id?: Maybe<Scalars['String']['output']>;
  childCount?: Maybe<Scalars['Int']['output']>;
  children?: Maybe<Array<Maybe<Department>>>;
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Department>;
  parentId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  supervisor?: Maybe<User>;
  supervisorId?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userCount?: Maybe<Scalars['Int']['output']>;
  userIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  users?: Maybe<Array<Maybe<User>>>;
  workhours?: Maybe<Scalars['JSON']['output']>;
};

export type DepartmentsListResponse = {
  __typename?: 'DepartmentsListResponse';
  list?: Maybe<Array<Maybe<Department>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Document = {
  __typename?: 'Document';
  _id: Scalars['String']['output'];
  approvalLockState?: Maybe<ApprovalLockState>;
  code?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  contentType: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdUser?: Maybe<User>;
  cursor?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  replacer?: Maybe<Scalars['String']['output']>;
  subType?: Maybe<Scalars['String']['output']>;
  tagIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type DocumentEditorAttribute = {
  __typename?: 'DocumentEditorAttribute';
  groupDetail?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type DocumentListResponse = {
  __typename?: 'DocumentListResponse';
  list?: Maybe<Array<Maybe<Document>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type DocumentsTypes = {
  __typename?: 'DocumentsTypes';
  contentType?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  subTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Env = {
  __typename?: 'ENV';
  RELEASE?: Maybe<Scalars['String']['output']>;
  USE_BRAND_RESTRICTIONS?: Maybe<Scalars['String']['output']>;
};

export type EmailAddress = {
  __typename?: 'EmailAddress';
  _id?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  deliveredCount?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  lane?: Maybe<Scalars['String']['output']>;
  lastDeliveredAt?: Maybe<Scalars['Date']['output']>;
  lastSentAt?: Maybe<Scalars['Date']['output']>;
  lastSoftBounceAt?: Maybe<Scalars['Date']['output']>;
  releaseNote?: Maybe<Scalars['String']['output']>;
  releasedAt?: Maybe<Scalars['Date']['output']>;
  releasedBy?: Maybe<Scalars['String']['output']>;
  softBounceCount?: Maybe<Scalars['Int']['output']>;
  suppressedAt?: Maybe<Scalars['Date']['output']>;
  suppressedBy?: Maybe<Scalars['String']['output']>;
  suppressionReason?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type EmailAddressesList = {
  __typename?: 'EmailAddressesList';
  list?: Maybe<Array<Maybe<EmailAddress>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type EmailDeliveriesList = {
  __typename?: 'EmailDeliveriesList';
  list?: Maybe<Array<Maybe<EmailDelivery>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/**
 * One handover of a message to the email provider. Delivery events that arrive
 * afterwards land in the arrays below, and stay empty for providers that push
 * no webhooks.
 */
export type EmailDelivery = {
  __typename?: 'EmailDelivery';
  _id?: Maybe<Scalars['String']['output']>;
  bounced?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  ccEmails?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  clicked?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  complained?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  deliveryStatus?: Maybe<Scalars['String']['output']>;
  deliveryStatusAt?: Maybe<Scalars['Date']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  messageId?: Maybe<Scalars['String']['output']>;
  notificationId?: Maybe<Scalars['String']['output']>;
  opened?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  provider?: Maybe<Scalars['String']['output']>;
  providerResponse?: Maybe<Scalars['String']['output']>;
  rejected?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sentAt?: Maybe<Scalars['Date']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  sourceId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  toEmails?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type EmailRampStatus = {
  __typename?: 'EmailRampStatus';
  advanceRate?: Maybe<Scalars['Float']['output']>;
  dailyBudget?: Maybe<Scalars['Int']['output']>;
  dropRate?: Maybe<Scalars['Float']['output']>;
  haltRate?: Maybe<Scalars['Float']['output']>;
  haltReason?: Maybe<Scalars['String']['output']>;
  haltedAt?: Maybe<Scalars['Date']['output']>;
  lastEvaluatedAt?: Maybe<Scalars['Date']['output']>;
  lastRate?: Maybe<Scalars['Float']['output']>;
  tier?: Maybe<Scalars['Int']['output']>;
  tiers?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  usedToday?: Maybe<Scalars['Int']['output']>;
  windowDays?: Maybe<Scalars['Int']['output']>;
};

/**
 * A sender identity as the configured email provider knows it, including ones
 * still awaiting confirmation. "single" is one verified address, "domain" is an
 * authenticated domain that any address below it may send from.
 */
export type EmailSender = {
  __typename?: 'EmailSender';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/**
 * Everything a sender picker needs, without exposing the organization's mail
 * credentials. "senders" and "supportsDynamicSender" reach the provider's API,
 * so only ask for them when they are actually rendered.
 */
export type EmailSenderOptions = {
  __typename?: 'EmailSenderOptions';
  alignedFrom?: Maybe<Scalars['String']['output']>;
  defaultSenderEmail?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  sameAsMailConfig?: Maybe<Scalars['Boolean']['output']>;
  senders?: Maybe<Array<Maybe<EmailSender>>>;
  supportsDynamicSender?: Maybe<Scalars['Boolean']['output']>;
  supportsSenderVerification?: Maybe<Scalars['Boolean']['output']>;
};

export type EmailSignature = {
  brandId?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
};

export type EmailTemplate = {
  __typename?: 'EmailTemplate';
  _id: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  contentFormat?: Maybe<Scalars['String']['output']>;
  contentJson?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy: Scalars['String']['output'];
  createdUser?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type EmailTemplatesListResponse = {
  __typename?: 'EmailTemplatesListResponse';
  list?: Maybe<Array<Maybe<EmailTemplate>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Float']['output']>;
};

/**
 * One moment on the calendar: a run that already happened, or an occurrence
 * that is still due.
 */
export type EngageCalendarEntry = {
  __typename?: 'EngageCalendarEntry';
  at: Scalars['Date']['output'];
  engageMessageId: Scalars['String']['output'];
  method?: Maybe<Scalars['String']['output']>;
  runCount?: Maybe<Scalars['Int']['output']>;
  /** Set only once the occurrence has a run behind it */
  runId?: Maybe<Scalars['String']['output']>;
  /** planned | overdue | running | completed | failed | cancelled */
  state: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type EngageDeliveryReport = {
  __typename?: 'EngageDeliveryReport';
  list?: Maybe<Array<Maybe<DeliveryReport>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type EngageMemberListResponse = {
  __typename?: 'EngageMemberListResponse';
  list?: Maybe<Array<Maybe<User>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type EngageMessage = {
  __typename?: 'EngageMessage';
  _id: Scalars['String']['output'];
  /** Whether somebody has locked this campaign for approval, and who may act */
  approvalLockState?: Maybe<ApprovalLockState>;
  brandId?: Maybe<Scalars['String']['output']>;
  brandIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  brands?: Maybe<Array<Maybe<Brand>>>;
  cpId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  customerIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  customerTagIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  customerTags?: Maybe<Array<Maybe<Tag>>>;
  email?: Maybe<Scalars['JSON']['output']>;
  fromEmail?: Maybe<Scalars['String']['output']>;
  fromIntegration?: Maybe<Scalars['JSON']['output']>;
  fromUserId?: Maybe<Scalars['String']['output']>;
  getTags?: Maybe<Array<Maybe<Tag>>>;
  isDraft?: Maybe<Scalars['Boolean']['output']>;
  isLive?: Maybe<Scalars['Boolean']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  lastRunAt?: Maybe<Scalars['Date']['output']>;
  messenger?: Maybe<Scalars['JSON']['output']>;
  messengerReceivedCustomerIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  method?: Maybe<Scalars['String']['output']>;
  /** When the schedule next comes due, absent when nothing is scheduled */
  nextRunAt?: Maybe<Scalars['Date']['output']>;
  notification?: Maybe<Scalars['JSON']['output']>;
  progress?: Maybe<Scalars['JSON']['output']>;
  runCount?: Maybe<Scalars['Int']['output']>;
  scheduleDate?: Maybe<EngageScheduleDate>;
  segmentIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  segments?: Maybe<Array<Maybe<Segment>>>;
  shortMessage?: Maybe<EngageMessageSms>;
  stats?: Maybe<Scalars['JSON']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  stopDate?: Maybe<Scalars['Date']['output']>;
  tagIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  targetCount?: Maybe<Scalars['Int']['output']>;
  targetIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  targetType?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  totalCustomersCount?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  validCustomersCount?: Maybe<Scalars['Int']['output']>;
  workflowAutomationId?: Maybe<Scalars['String']['output']>;
};


export type EngageMessageApprovalLockStateArgs = {
  action?: InputMaybe<Scalars['String']['input']>;
};

export type EngageMessageEmail = {
  attachments?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  content?: InputMaybe<Scalars['String']['input']>;
  contentFormat?: InputMaybe<Scalars['String']['input']>;
  contentJson?: InputMaybe<Scalars['JSON']['input']>;
  previewText?: InputMaybe<Scalars['String']['input']>;
  replyTo?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
};

export type EngageMessageListResponse = {
  __typename?: 'EngageMessageListResponse';
  list?: Maybe<Array<Maybe<EngageMessage>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type EngageMessageMessenger = {
  content?: InputMaybe<Scalars['String']['input']>;
  integrationId: Scalars['String']['input'];
  kind?: InputMaybe<Scalars['String']['input']>;
  rules?: InputMaybe<Array<InputMaybe<InputRule>>>;
  sentAs?: InputMaybe<Scalars['String']['input']>;
};

export type EngageMessageNotification = {
  content: Scalars['String']['input'];
  inApp?: InputMaybe<Scalars['Boolean']['input']>;
  isMobile?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};

export type EngageMessageSms = {
  __typename?: 'EngageMessageSms';
  content: Scalars['String']['output'];
  from?: Maybe<Scalars['String']['output']>;
  fromIntegrationId?: Maybe<Scalars['String']['output']>;
};

export type EngageMessageSmsInput = {
  content: Scalars['String']['input'];
  from?: InputMaybe<Scalars['String']['input']>;
  fromIntegrationId: Scalars['String']['input'];
};

export type EngageRecurrenceInput = {
  endDate: Scalars['Date']['input'];
  every: Scalars['String']['input'];
  hour: Scalars['Int']['input'];
  minute?: InputMaybe<Scalars['Int']['input']>;
  monthDay?: InputMaybe<Scalars['Int']['input']>;
  monthOfYear?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  timeZone?: InputMaybe<Scalars['String']['input']>;
  weekDay?: InputMaybe<Scalars['Int']['input']>;
};

export type EngageScheduleDate = {
  __typename?: 'EngageScheduleDate';
  dateTime?: Maybe<Scalars['Date']['output']>;
  day?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['Date']['output']>;
  every?: Maybe<Scalars['String']['output']>;
  hour?: Maybe<Scalars['Int']['output']>;
  minute?: Maybe<Scalars['Int']['output']>;
  month?: Maybe<Scalars['String']['output']>;
  monthDay?: Maybe<Scalars['Int']['output']>;
  monthOfYear?: Maybe<Scalars['Int']['output']>;
  startDate?: Maybe<Scalars['Date']['output']>;
  timeZone?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  weekDay?: Maybe<Scalars['Int']['output']>;
};

export type EngageScheduleDateInput = {
  dateTime?: InputMaybe<Scalars['Date']['input']>;
  day?: InputMaybe<Scalars['String']['input']>;
  month?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Entity = {
  __typename?: 'Entity';
  contentId: Scalars['String']['output'];
  contentType: Scalars['String']['output'];
};

export type EntityInput = {
  contentId: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
};

export type Export = {
  __typename?: 'Export';
  _id?: Maybe<Scalars['String']['output']>;
  collectionName?: Maybe<Scalars['String']['output']>;
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  elapsedSeconds?: Maybe<Scalars['Int']['output']>;
  entityType?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  estimatedSecondsRemaining?: Maybe<Scalars['Int']['output']>;
  fileKey?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  filters?: Maybe<Scalars['JSON']['output']>;
  ids?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  jobId?: Maybe<Scalars['String']['output']>;
  lastCursor?: Maybe<Scalars['String']['output']>;
  moduleName?: Maybe<Scalars['String']['output']>;
  pluginName?: Maybe<Scalars['String']['output']>;
  processedRows?: Maybe<Scalars['Int']['output']>;
  progress?: Maybe<Scalars['Int']['output']>;
  rowsPerSecond?: Maybe<Scalars['Int']['output']>;
  selectedFields?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  startedAt?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subdomain?: Maybe<Scalars['String']['output']>;
  totalRows?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ExportHeader = {
  __typename?: 'ExportHeader';
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ExportHistoryList = {
  __typename?: 'ExportHistoryList';
  list?: Maybe<Array<Maybe<Export>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type FacebookOAuthConfig = {
  __typename?: 'FacebookOAuthConfig';
  appId?: Maybe<Scalars['String']['output']>;
  appSecret?: Maybe<Scalars['String']['output']>;
  redirectUri?: Maybe<Scalars['String']['output']>;
};

export type FacebookOAuthConfigInput = {
  appId?: InputMaybe<Scalars['String']['input']>;
  appSecret?: InputMaybe<Scalars['String']['input']>;
  redirectUri?: InputMaybe<Scalars['String']['input']>;
};

export type Favorite = {
  __typename?: 'Favorite';
  _id: Scalars['String']['output'];
  breadcrumb?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  icon?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
};

export type FcmDevice = {
  __typename?: 'FcmDevice';
  deviceId: Scalars['String']['output'];
  platform: FcmPlatform;
  token: Scalars['String']['output'];
};

export enum FcmPlatform {
  Android = 'android',
  Ios = 'ios',
  Web = 'web'
}

export type Field = {
  __typename?: 'Field';
  _id?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  configs?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  groupId?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  isRequired?: Maybe<Scalars['Boolean']['output']>;
  isVisible?: Maybe<Scalars['Boolean']['output']>;
  isVisibleInCard?: Maybe<Scalars['Boolean']['output']>;
  isVisibleToCreate?: Maybe<Scalars['Boolean']['output']>;
  logics?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<FieldOption>>>;
  order?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  validations?: Maybe<Scalars['JSON']['output']>;
};

export type FieldGroup = {
  __typename?: 'FieldGroup';
  _id?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  configs?: Maybe<Scalars['JSON']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  logics?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type FieldGroupListResponse = {
  __typename?: 'FieldGroupListResponse';
  list?: Maybe<Array<Maybe<FieldGroup>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type FieldGroupOrderItem = {
  _id: Scalars['String']['input'];
  order: Scalars['Float']['input'];
};

export type FieldGroupParams = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
};

export type FieldListResponse = {
  __typename?: 'FieldListResponse';
  list?: Maybe<Array<Maybe<Field>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type FieldOption = {
  __typename?: 'FieldOption';
  coordinates?: Maybe<Scalars['JSON']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type FieldOptionInput = {
  coordinates?: InputMaybe<Scalars['JSON']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type FieldsParams = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentTypeId?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
};

export type FileUploadServiceInfo = {
  __typename?: 'FileUploadServiceInfo';
  videoUploadEnabled?: Maybe<Scalars['Boolean']['output']>;
};

export type FirebaseConfig = {
  __typename?: 'FirebaseConfig';
  enabled?: Maybe<Scalars['Boolean']['output']>;
  serviceAccountKey?: Maybe<Scalars['String']['output']>;
};

export type FirebaseConfigInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  serviceAccountKey?: InputMaybe<Scalars['String']['input']>;
};

export type GlobalSearchResultItem = {
  __typename?: 'GlobalSearchResultItem';
  category: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  matchFields?: Maybe<Scalars['JSON']['output']>;
  module: Scalars['String']['output'];
  path: Scalars['String']['output'];
  subTitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type GoogleOAuthConfig = {
  __typename?: 'GoogleOAuthConfig';
  clientId?: Maybe<Scalars['String']['output']>;
  clientSecret?: Maybe<Scalars['String']['output']>;
  credentials?: Maybe<Scalars['String']['output']>;
  redirectUri?: Maybe<Scalars['String']['output']>;
};

export type GoogleOAuthConfigInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  clientSecret?: InputMaybe<Scalars['String']['input']>;
  credentials?: InputMaybe<Scalars['String']['input']>;
  redirectUri?: InputMaybe<Scalars['String']['input']>;
};

export type IClientPortalFilter = {
  _id?: InputMaybe<Scalars['String']['input']>;
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
};

export type IClientPortalUserFilter = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  clientPortalId?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CpUserType>;
};

export type Import = {
  __typename?: 'Import';
  _id?: Maybe<Scalars['String']['output']>;
  collectionName?: Maybe<Scalars['String']['output']>;
  columnMapping?: Maybe<Array<Maybe<ImportColumnMapping>>>;
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  elapsedSeconds?: Maybe<Scalars['Int']['output']>;
  entityType?: Maybe<Scalars['String']['output']>;
  errorFileUrl?: Maybe<Scalars['String']['output']>;
  errorRows?: Maybe<Scalars['Int']['output']>;
  estimatedSecondsRemaining?: Maybe<Scalars['Int']['output']>;
  fileKey?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  importedIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  jobId?: Maybe<Scalars['String']['output']>;
  moduleName?: Maybe<Scalars['String']['output']>;
  pluginName?: Maybe<Scalars['String']['output']>;
  processedRows?: Maybe<Scalars['Int']['output']>;
  progress?: Maybe<Scalars['Int']['output']>;
  rowsPerSecond?: Maybe<Scalars['Int']['output']>;
  startedAt?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subdomain?: Maybe<Scalars['String']['output']>;
  successRows?: Maybe<Scalars['Int']['output']>;
  totalRows?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ImportColumnMapping = {
  __typename?: 'ImportColumnMapping';
  header?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  key?: Maybe<Scalars['String']['output']>;
};

export type ImportColumnMappingInput = {
  header?: InputMaybe<Scalars['String']['input']>;
  index: Scalars['Int']['input'];
  key: Scalars['String']['input'];
};

export type ImportColumnPreview = {
  __typename?: 'ImportColumnPreview';
  columns?: Maybe<Array<Maybe<ImportPreviewColumn>>>;
  fields?: Maybe<Array<Maybe<ImportPreviewField>>>;
  totalRows?: Maybe<Scalars['Int']['output']>;
};

export enum ImportExportOperation {
  Export = 'EXPORT',
  Import = 'IMPORT'
}

export type ImportExportType = {
  __typename?: 'ImportExportType';
  contentType: Scalars['String']['output'];
  label: Scalars['String']['output'];
  permissions: Array<Scalars['String']['output']>;
};

export type ImportHistoryList = {
  __typename?: 'ImportHistoryList';
  list?: Maybe<Array<Maybe<Import>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ImportPreviewColumn = {
  __typename?: 'ImportPreviewColumn';
  confidence?: Maybe<Scalars['Float']['output']>;
  header?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  sampleValues?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  status?: Maybe<Scalars['String']['output']>;
};

export type ImportPreviewField = {
  __typename?: 'ImportPreviewField';
  dataType?: Maybe<Scalars['String']['output']>;
  example?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  required?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type InputRule = {
  _id: Scalars['String']['input'];
  condition: Scalars['String']['input'];
  kind: Scalars['String']['input'];
  text: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type InternalNote = {
  __typename?: 'InternalNote';
  _id: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  contentType: Scalars['String']['output'];
  contentTypeId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdUser?: Maybe<User>;
  createdUserId?: Maybe<Scalars['String']['output']>;
};

export type InternalNotesByAction = {
  __typename?: 'InternalNotesByAction';
  list?: Maybe<Array<Maybe<ModifiedNote>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type InvitationEntry = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  permissionGroupIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Log = {
  __typename?: 'Log';
  _id?: Maybe<Scalars['String']['output']>;
  action?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  cursor?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  payload?: Maybe<Scalars['JSON']['output']>;
  prevObject?: Maybe<Scalars['JSON']['output']>;
  processId?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type LogContentType = {
  __typename?: 'LogContentType';
  collectionName: Scalars['String']['output'];
  moduleName: Scalars['String']['output'];
  pluginName: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type MailConfig = {
  __typename?: 'MailConfig';
  invitationContent?: Maybe<Scalars['String']['output']>;
  registrationContent?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
};

export type MailConfigInput = {
  invitationContent?: InputMaybe<Scalars['String']['input']>;
  registrationContent?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type MainLogsList = {
  __typename?: 'MainLogsList';
  list?: Maybe<Array<Maybe<Log>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ManualVerificationConfig = {
  __typename?: 'ManualVerificationConfig';
  userIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  verifyCompany?: Maybe<Scalars['Boolean']['output']>;
  verifyCustomer?: Maybe<Scalars['Boolean']['output']>;
};

export type ManualVerificationConfigInput = {
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  verifyCompany?: InputMaybe<Scalars['Boolean']['input']>;
  verifyCustomer?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ModifiedNote = {
  __typename?: 'ModifiedNote';
  _id: Scalars['String']['output'];
  action?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  contentId?: Maybe<Scalars['String']['output']>;
  contentType: Scalars['String']['output'];
  contentTypeDetail?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
};

export type MultiFactorConfig = {
  __typename?: 'MultiFactorConfig';
  email?: Maybe<OtpEmailConfig>;
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  sms?: Maybe<OtpsmsConfig>;
};

export type MultiFactorConfigInput = {
  email?: InputMaybe<OtpEmailConfigInput>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  sms?: InputMaybe<OtpsmsConfigInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  approvalLockCreate?: Maybe<ApprovalLock>;
  approvalLockForceRelease?: Maybe<ApprovalLock>;
  approvalLockRelease?: Maybe<ApprovalLock>;
  approvalRequestApprove?: Maybe<ApprovalRequest>;
  approvalRequestCancel?: Maybe<ApprovalRequest>;
  approvalRequestCreate?: Maybe<ApprovalRequest>;
  approvalRequestReject?: Maybe<ApprovalRequest>;
  appsAdd?: Maybe<App>;
  appsEdit?: Maybe<App>;
  appsRemove?: Maybe<Scalars['JSON']['output']>;
  appsRevoke?: Maybe<App>;
  archiveAutomations?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  archiveNotification?: Maybe<Scalars['String']['output']>;
  archiveNotifications?: Maybe<Scalars['String']['output']>;
  automationWorkflowTemplatesAdd?: Maybe<AutomationWorkflowTemplate>;
  automationWorkflowTemplatesEdit?: Maybe<AutomationWorkflowTemplate>;
  automationWorkflowTemplatesRemove?: Maybe<Scalars['JSON']['output']>;
  automationsAdd?: Maybe<Automation>;
  automationsAiAgentAdd?: Maybe<Scalars['JSON']['output']>;
  automationsAiAgentEdit?: Maybe<Scalars['JSON']['output']>;
  automationsAiAgentReindex?: Maybe<Scalars['JSON']['output']>;
  automationsAiAgentRemove?: Maybe<Scalars['JSON']['output']>;
  automationsCreateFromTemplate?: Maybe<Automation>;
  automationsDuplicate?: Maybe<Automation>;
  automationsEdit?: Maybe<Automation>;
  automationsRemove?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  automationsSaveAsTemplate?: Maybe<Automation>;
  branchesAdd?: Maybe<Branch>;
  branchesEdit?: Maybe<Branch>;
  branchesRemove?: Maybe<Scalars['JSON']['output']>;
  brandsAdd?: Maybe<Brand>;
  brandsEdit?: Maybe<Brand>;
  brandsRemove?: Maybe<Scalars['JSON']['output']>;
  broadcastUpdateConfigs?: Maybe<Scalars['JSON']['output']>;
  bundleConditionAdd?: Maybe<BundleCondition>;
  bundleConditionDefault?: Maybe<Scalars['JSON']['output']>;
  bundleConditionEdit?: Maybe<BundleCondition>;
  bundleConditionRemove?: Maybe<Scalars['JSON']['output']>;
  bundleConditionSetBulk?: Maybe<Scalars['JSON']['output']>;
  bundleRulesAdd?: Maybe<BundleRule>;
  bundleRulesEdit?: Maybe<BundleRule>;
  bundleRulesRemove?: Maybe<Scalars['JSON']['output']>;
  checkTokiUserLegalAge?: Maybe<Scalars['Boolean']['output']>;
  clientPortalAdd?: Maybe<ClientPortal>;
  clientPortalChangeToken?: Maybe<Scalars['String']['output']>;
  clientPortalCommentAdd?: Maybe<CpComment>;
  clientPortalCommentDelete?: Maybe<Scalars['JSON']['output']>;
  clientPortalCommentUpdate?: Maybe<CpComment>;
  clientPortalCompanyEdit?: Maybe<Company>;
  clientPortalCustomerEdit?: Maybe<Customer>;
  clientPortalDelete?: Maybe<Scalars['JSON']['output']>;
  clientPortalLogout?: Maybe<Scalars['String']['output']>;
  clientPortalMarkAllNotificationsAsRead?: Maybe<Scalars['JSON']['output']>;
  clientPortalMarkNotificationAsRead?: Maybe<Scalars['JSON']['output']>;
  clientPortalSendNotification?: Maybe<CpNotification>;
  clientPortalUpdate?: Maybe<ClientPortal>;
  clientPortalUserAddFcmToken?: Maybe<CpUser>;
  clientPortalUserChangePassword?: Maybe<CpUser>;
  clientPortalUserConfirmChangeEmail?: Maybe<CpUser>;
  clientPortalUserConfirmChangePhone?: Maybe<CpUser>;
  clientPortalUserDelete?: Maybe<CpUserRemoveResponse>;
  clientPortalUserEdit?: Maybe<CpUser>;
  clientPortalUserForgotPassword?: Maybe<Scalars['String']['output']>;
  clientPortalUserLinkSocialAccount?: Maybe<CpUser>;
  clientPortalUserLoginWithCredentials?: Maybe<Scalars['JSON']['output']>;
  clientPortalUserLoginWithOTP?: Maybe<Scalars['JSON']['output']>;
  clientPortalUserLoginWithSocial?: Maybe<Scalars['String']['output']>;
  clientPortalUserLoginWithToki?: Maybe<Scalars['JSON']['output']>;
  clientPortalUserRefreshToken?: Maybe<Scalars['String']['output']>;
  clientPortalUserRegister?: Maybe<CpUser>;
  clientPortalUserRegisterWithSocial?: Maybe<CpUser>;
  clientPortalUserRemoveFcmToken?: Maybe<CpUser>;
  clientPortalUserRequestChangeEmail?: Maybe<Scalars['String']['output']>;
  clientPortalUserRequestChangePhone?: Maybe<Scalars['String']['output']>;
  clientPortalUserRequestOTP?: Maybe<Scalars['String']['output']>;
  clientPortalUserResetPassword?: Maybe<Scalars['JSON']['output']>;
  clientPortalUserUnlinkSocialAccount?: Maybe<CpUser>;
  clientPortalUserVerify?: Maybe<CpUser>;
  companiesAdd?: Maybe<Company>;
  companiesEdit?: Maybe<Company>;
  companiesMerge?: Maybe<Company>;
  companiesRemove?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  configsActivateInstallation?: Maybe<Scalars['JSON']['output']>;
  configsManagePluginInstall?: Maybe<Scalars['JSON']['output']>;
  configsUpdate?: Maybe<Scalars['JSON']['output']>;
  conformityAdd?: Maybe<Conformity>;
  conformityEdit?: Maybe<SuccessResult>;
  cpCustomersAdd?: Maybe<Customer>;
  cpManageRelations?: Maybe<Array<Relation>>;
  cpTagsAdd?: Maybe<Tag>;
  cpTagsTag?: Maybe<Scalars['JSON']['output']>;
  cpUsersAdd?: Maybe<CpUser>;
  cpUsersEdit?: Maybe<CpUser>;
  cpUsersRemove?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  cpUsersSetPassword?: Maybe<CpUser>;
  createMultipleRelations?: Maybe<Scalars['JSON']['output']>;
  createRelation: Relation;
  customersAdd?: Maybe<Customer>;
  customersChangeState?: Maybe<Customer>;
  customersChangeStateBulk?: Maybe<Scalars['JSON']['output']>;
  customersChangeVerificationStatus?: Maybe<Array<Maybe<Customer>>>;
  customersEdit?: Maybe<Customer>;
  customersMerge?: Maybe<Customer>;
  customersRemove?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  customersVerify?: Maybe<Scalars['String']['output']>;
  deleteRelation: Scalars['String']['output'];
  departmentsAdd?: Maybe<Department>;
  departmentsEdit?: Maybe<Department>;
  departmentsRemove?: Maybe<Scalars['JSON']['output']>;
  documentsRemove?: Maybe<Scalars['JSON']['output']>;
  documentsSave?: Maybe<Document>;
  editOrganizationDomain?: Maybe<Organization>;
  editOrganizationInfo?: Maybe<Organization>;
  emailAddressRelease?: Maybe<Scalars['String']['output']>;
  emailRampRelease?: Maybe<EmailRampStatus>;
  emailTemplateAdd?: Maybe<EmailTemplate>;
  emailTemplateEdit?: Maybe<EmailTemplate>;
  emailTemplateRemove?: Maybe<Scalars['JSON']['output']>;
  engageMessageAdd?: Maybe<EngageMessage>;
  engageMessageCancelSchedule?: Maybe<EngageMessage>;
  engageMessageCopy?: Maybe<EngageMessage>;
  engageMessageEdit?: Maybe<EngageMessage>;
  engageMessageRemove?: Maybe<Scalars['JSON']['output']>;
  engageMessageRemoveVerifiedEmail?: Maybe<Scalars['String']['output']>;
  engageMessageSendTestEmail?: Maybe<Scalars['String']['output']>;
  engageMessageSetLive?: Maybe<EngageMessage>;
  engageMessageSetLiveManual?: Maybe<EngageMessage>;
  engageMessageSetPause?: Maybe<EngageMessage>;
  engageMessageSetSchedule?: Maybe<EngageMessage>;
  engageMessageVerifyEmail?: Maybe<Scalars['String']['output']>;
  engageSendMail?: Maybe<Scalars['JSON']['output']>;
  engagesUpdateConfigs?: Maybe<Scalars['JSON']['output']>;
  exportCancel?: Maybe<Export>;
  exportRetry?: Maybe<Export>;
  exportStart?: Maybe<Export>;
  fieldAdd?: Maybe<Field>;
  fieldEdit?: Maybe<Field>;
  fieldGroupAdd?: Maybe<FieldGroup>;
  fieldGroupEdit?: Maybe<FieldGroup>;
  fieldGroupRemove?: Maybe<FieldGroup>;
  fieldGroupsUpdateOrder?: Maybe<Array<Maybe<FieldGroup>>>;
  fieldRemove?: Maybe<Field>;
  forgotPassword: Scalars['String']['output'];
  importCancel?: Maybe<Import>;
  importResume?: Maybe<Import>;
  importRetry?: Maybe<Import>;
  importStart?: Maybe<Import>;
  internalNotesAdd?: Maybe<InternalNote>;
  internalNotesEdit?: Maybe<InternalNote>;
  internalNotesRemove?: Maybe<InternalNote>;
  login?: Maybe<Scalars['String']['output']>;
  loginWithGoogle?: Maybe<Scalars['String']['output']>;
  loginWithMagicLink?: Maybe<Scalars['String']['output']>;
  logout?: Maybe<Scalars['String']['output']>;
  manageRelations?: Maybe<Array<Relation>>;
  markAsReadNotifications?: Maybe<Scalars['JSON']['output']>;
  markNotificationAsRead?: Maybe<Scalars['JSON']['output']>;
  oauthClientAppsAdd?: Maybe<OAuthClientApp>;
  oauthClientAppsEdit?: Maybe<OAuthClientApp>;
  oauthClientAppsRemove?: Maybe<Scalars['JSON']['output']>;
  oauthClientAppsRevoke?: Maybe<OAuthClientApp>;
  permissionGroupAdd?: Maybe<PermissionGroup>;
  permissionGroupEdit?: Maybe<PermissionGroup>;
  permissionGroupRemove?: Maybe<Scalars['JSON']['output']>;
  positionsAdd?: Maybe<Position>;
  positionsEdit?: Maybe<Position>;
  positionsRemove?: Maybe<Scalars['JSON']['output']>;
  productBulkSimilarityAdd?: Maybe<ProductBulkSimilarity>;
  productBulkSimilarityEdit?: Maybe<ProductBulkSimilarity>;
  productBulkSimilarityRemove?: Maybe<Scalars['String']['output']>;
  productCategoriesAdd?: Maybe<ProductCategory>;
  productCategoriesEdit?: Maybe<ProductCategory>;
  productCategoriesRemove?: Maybe<Scalars['JSON']['output']>;
  productPackagesAdd?: Maybe<ProductPackage>;
  productPackagesChangeStatus?: Maybe<Array<Maybe<ProductPackage>>>;
  productPackagesEdit?: Maybe<ProductPackage>;
  productPackagesRemove?: Maybe<Scalars['JSON']['output']>;
  productRulesAdd?: Maybe<ProductRule>;
  productRulesEdit?: Maybe<ProductRule>;
  productRulesRemove?: Maybe<Scalars['JSON']['output']>;
  productsAdd?: Maybe<Product>;
  productsConfigsUpdate?: Maybe<Scalars['JSON']['output']>;
  productsDuplicate?: Maybe<Product>;
  productsEdit?: Maybe<Product>;
  productsMerge?: Maybe<Product>;
  productsRemove?: Maybe<Scalars['String']['output']>;
  propertySystemFieldEdit: PropertySystemField;
  resetPassword?: Maybe<Scalars['JSON']['output']>;
  segmentsAdd?: Maybe<Segment>;
  segmentsEdit?: Maybe<Segment>;
  segmentsRebuild?: Maybe<Scalars['JSON']['output']>;
  segmentsRemove?: Maybe<Scalars['JSON']['output']>;
  segmentsStopRebuild?: Maybe<Scalars['JSON']['output']>;
  structuresAdd?: Maybe<Structure>;
  structuresEdit?: Maybe<Structure>;
  structuresRemove?: Maybe<Scalars['JSON']['output']>;
  tagsAdd?: Maybe<Tag>;
  tagsEdit?: Maybe<Tag>;
  tagsRemove?: Maybe<Scalars['JSON']['output']>;
  tagsTag?: Maybe<Scalars['JSON']['output']>;
  templateAdd?: Maybe<Template>;
  templateCategoryAdd?: Maybe<TemplateCategory>;
  templateCategoryEdit?: Maybe<TemplateCategory>;
  templateCategoryRemove?: Maybe<Scalars['JSON']['output']>;
  templateEdit?: Maybe<Template>;
  templateRemove?: Maybe<Scalars['JSON']['output']>;
  templateUse?: Maybe<Scalars['JSON']['output']>;
  toggleFavorite?: Maybe<Favorite>;
  unitsAdd?: Maybe<Unit>;
  unitsEdit?: Maybe<Unit>;
  unitsRemove?: Maybe<Scalars['JSON']['output']>;
  uomsAdd?: Maybe<Uom>;
  uomsEdit?: Maybe<Uom>;
  uomsRemove?: Maybe<Scalars['String']['output']>;
  updateNotificationSettingsChannel?: Maybe<Scalars['JSON']['output']>;
  updateNotificationSettingsEvent?: Maybe<Scalars['JSON']['output']>;
  updateRelation: Relation;
  userAddCustomPermission?: Maybe<User>;
  userRemoveCustomPermission?: Maybe<User>;
  userUpdatePermissionGroups?: Maybe<User>;
  usersChangePassword?: Maybe<User>;
  usersConfigEmailSignatures?: Maybe<User>;
  usersConfigGetNotificationByEmail?: Maybe<User>;
  usersConfirmInvitation?: Maybe<Scalars['String']['output']>;
  usersCreateOwner?: Maybe<Scalars['String']['output']>;
  usersEdit?: Maybe<User>;
  usersEditProfile?: Maybe<User>;
  usersInvite?: Maybe<Scalars['Boolean']['output']>;
  usersResendInvitation?: Maybe<Scalars['String']['output']>;
  usersResetMemberPassword?: Maybe<User>;
  usersSetActiveStatus?: Maybe<User>;
  usersSetActiveStatusBatch?: Maybe<Scalars['Boolean']['output']>;
  usersSetChatStatus?: Maybe<User>;
  usersUpdatePermissionGroups?: Maybe<Scalars['JSON']['output']>;
};


export type MutationApprovalLockCreateArgs = {
  input: ApprovalLockCreateInput;
};


export type MutationApprovalLockForceReleaseArgs = {
  _id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};


export type MutationApprovalLockReleaseArgs = {
  _id: Scalars['String']['input'];
};


export type MutationApprovalRequestApproveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationApprovalRequestCancelArgs = {
  _id: Scalars['String']['input'];
};


export type MutationApprovalRequestCreateArgs = {
  input: ApprovalRequestCreateInput;
};


export type MutationApprovalRequestRejectArgs = {
  _id: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAppsAddArgs = {
  name: Scalars['String']['input'];
};


export type MutationAppsEditArgs = {
  _id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAppsRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationAppsRevokeArgs = {
  _id: Scalars['String']['input'];
};


export type MutationArchiveAutomationsArgs = {
  automationIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isRestore?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationArchiveNotificationArgs = {
  _id: Scalars['String']['input'];
};


export type MutationArchiveNotificationsArgs = {
  archiveAll?: InputMaybe<Scalars['Boolean']['input']>;
  filters?: InputMaybe<NotificationFilters>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationAutomationWorkflowTemplatesAddArgs = {
  actions?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  entryActionId?: InputMaybe<Scalars['String']['input']>;
  inputs?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
};


export type MutationAutomationWorkflowTemplatesEditArgs = {
  _id: Scalars['String']['input'];
  actions?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  entryActionId?: InputMaybe<Scalars['String']['input']>;
  inputs?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAutomationWorkflowTemplatesRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationAutomationsAddArgs = {
  actions?: InputMaybe<Array<InputMaybe<ActionInput>>>;
  edgeType?: InputMaybe<Scalars['String']['input']>;
  flowDirection?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Array<InputMaybe<NoteInput>>>;
  status?: InputMaybe<Scalars['String']['input']>;
  triggers?: InputMaybe<Array<InputMaybe<TriggerInput>>>;
  workflows?: InputMaybe<Array<InputMaybe<WorkflowInput>>>;
};


export type MutationAutomationsAiAgentAddArgs = {
  connection?: InputMaybe<Scalars['JSON']['input']>;
  context?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  runtime?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationAutomationsAiAgentEditArgs = {
  _id: Scalars['String']['input'];
  connection?: InputMaybe<Scalars['JSON']['input']>;
  context?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  runtime?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationAutomationsAiAgentReindexArgs = {
  _id: Scalars['String']['input'];
  fileId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAutomationsAiAgentRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationAutomationsCreateFromTemplateArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAutomationsDuplicateArgs = {
  _id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAutomationsEditArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
  acknowledgeDuplicate?: InputMaybe<Scalars['Boolean']['input']>;
  actions?: InputMaybe<Array<InputMaybe<ActionInput>>>;
  edgeType?: InputMaybe<Scalars['String']['input']>;
  flowDirection?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Array<InputMaybe<NoteInput>>>;
  status?: InputMaybe<Scalars['String']['input']>;
  triggers?: InputMaybe<Array<InputMaybe<TriggerInput>>>;
  workflows?: InputMaybe<Array<InputMaybe<WorkflowInput>>>;
};


export type MutationAutomationsRemoveArgs = {
  automationIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationAutomationsSaveAsTemplateArgs = {
  _id: Scalars['String']['input'];
  duplicate?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationBranchesAddArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  coordinate?: InputMaybe<CoordinateInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  holidays?: InputMaybe<Scalars['JSON']['input']>;
  image?: InputMaybe<AttachmentInput>;
  links?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  supervisorId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  workhours?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationBranchesEditArgs = {
  _id: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  coordinate?: InputMaybe<CoordinateInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  holidays?: InputMaybe<Scalars['JSON']['input']>;
  image?: InputMaybe<AttachmentInput>;
  links?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  supervisorId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  workhours?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationBranchesRemoveArgs = {
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationBrandsAddArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  emailConfig?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
};


export type MutationBrandsEditArgs = {
  _id: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  emailConfig?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
};


export type MutationBrandsRemoveArgs = {
  _ids?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationBroadcastUpdateConfigsArgs = {
  configsMap: Scalars['JSON']['input'];
};


export type MutationBundleConditionAddArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationBundleConditionDefaultArgs = {
  _id: Scalars['String']['input'];
};


export type MutationBundleConditionEditArgs = {
  _id: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationBundleConditionRemoveArgs = {
  _ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationBundleConditionSetBulkArgs = {
  bundleId: Scalars['String']['input'];
  productIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationBundleRulesAddArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rules?: InputMaybe<Array<InputMaybe<BundleRuleItemInput>>>;
};


export type MutationBundleRulesEditArgs = {
  _id: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rules?: InputMaybe<Array<InputMaybe<BundleRuleItemInput>>>;
};


export type MutationBundleRulesRemoveArgs = {
  _ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCheckTokiUserLegalAgeArgs = {
  token: Scalars['String']['input'];
};


export type MutationClientPortalAddArgs = {
  name: Scalars['String']['input'];
};


export type MutationClientPortalChangeTokenArgs = {
  _id: Scalars['String']['input'];
};


export type MutationClientPortalCommentAddArgs = {
  comment: CpCommentInput;
};


export type MutationClientPortalCommentDeleteArgs = {
  _id: Scalars['String']['input'];
};


export type MutationClientPortalCommentUpdateArgs = {
  _id: Scalars['String']['input'];
  comment: CpCommentUpdateInput;
};


export type MutationClientPortalCompanyEditArgs = {
  addresses?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  businessType?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  industry?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isSubscribed?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Scalars['JSON']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  primaryAddress?: InputMaybe<Scalars['JSON']['input']>;
  primaryEmail?: InputMaybe<Scalars['String']['input']>;
  primaryName?: InputMaybe<Scalars['String']['input']>;
  primaryPhone?: InputMaybe<Scalars['String']['input']>;
  propertiesData?: InputMaybe<Scalars['JSON']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  website?: InputMaybe<Scalars['String']['input']>;
};


export type MutationClientPortalCustomerEditArgs = {
  addresses?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  primaryAddress?: InputMaybe<Scalars['JSON']['input']>;
  primaryEmail?: InputMaybe<Scalars['String']['input']>;
  primaryPhone?: InputMaybe<Scalars['String']['input']>;
  propertiesData?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationClientPortalDeleteArgs = {
  _id: Scalars['String']['input'];
};


export type MutationClientPortalMarkAllNotificationsAsReadArgs = {
  clientPortalId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationClientPortalMarkNotificationAsReadArgs = {
  _id: Scalars['String']['input'];
};


export type MutationClientPortalSendNotificationArgs = {
  clientPortalId: Scalars['String']['input'];
  cpUserId: Scalars['String']['input'];
  input: CpNotificationSendInput;
};


export type MutationClientPortalUpdateArgs = {
  _id: Scalars['String']['input'];
  clientPortal?: InputMaybe<ClientPortalConfigInput>;
};


export type MutationClientPortalUserAddFcmTokenArgs = {
  deviceId: Scalars['String']['input'];
  platform: FcmPlatform;
  token: Scalars['String']['input'];
};


export type MutationClientPortalUserChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationClientPortalUserConfirmChangeEmailArgs = {
  code: Scalars['String']['input'];
};


export type MutationClientPortalUserConfirmChangePhoneArgs = {
  code: Scalars['String']['input'];
};


export type MutationClientPortalUserEditArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyRegistrationNumber?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationClientPortalUserForgotPasswordArgs = {
  identifier: Scalars['String']['input'];
};


export type MutationClientPortalUserLinkSocialAccountArgs = {
  provider: SocialAuthProvider;
  token: Scalars['String']['input'];
};


export type MutationClientPortalUserLoginWithCredentialsArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationClientPortalUserLoginWithOtpArgs = {
  identifier: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};


export type MutationClientPortalUserLoginWithSocialArgs = {
  provider: SocialAuthProvider;
  token: Scalars['String']['input'];
};


export type MutationClientPortalUserLoginWithTokiArgs = {
  token: Scalars['String']['input'];
};


export type MutationClientPortalUserRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationClientPortalUserRegisterArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  propertiesData?: InputMaybe<Scalars['JSON']['input']>;
  userType?: InputMaybe<CpUserType>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationClientPortalUserRegisterWithSocialArgs = {
  provider: SocialAuthProvider;
  token: Scalars['String']['input'];
};


export type MutationClientPortalUserRemoveFcmTokenArgs = {
  deviceId: Scalars['String']['input'];
};


export type MutationClientPortalUserRequestChangeEmailArgs = {
  newEmail: Scalars['String']['input'];
};


export type MutationClientPortalUserRequestChangePhoneArgs = {
  newPhone: Scalars['String']['input'];
};


export type MutationClientPortalUserRequestOtpArgs = {
  identifier: Scalars['String']['input'];
};


export type MutationClientPortalUserResetPasswordArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  newPassword: Scalars['String']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationClientPortalUserUnlinkSocialAccountArgs = {
  provider: SocialAuthProvider;
};


export type MutationClientPortalUserVerifyArgs = {
  code: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCompaniesAddArgs = {
  addresses?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  businessType?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  industry?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isSubscribed?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Scalars['JSON']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  parentCompanyId?: InputMaybe<Scalars['String']['input']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  primaryAddress?: InputMaybe<Scalars['JSON']['input']>;
  primaryEmail?: InputMaybe<Scalars['String']['input']>;
  primaryName?: InputMaybe<Scalars['String']['input']>;
  primaryPhone?: InputMaybe<Scalars['String']['input']>;
  propertiesData?: InputMaybe<Scalars['JSON']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  website?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCompaniesEditArgs = {
  _id: Scalars['String']['input'];
  addresses?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  businessType?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  industry?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isSubscribed?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Scalars['JSON']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  parentCompanyId?: InputMaybe<Scalars['String']['input']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  primaryAddress?: InputMaybe<Scalars['JSON']['input']>;
  primaryEmail?: InputMaybe<Scalars['String']['input']>;
  primaryName?: InputMaybe<Scalars['String']['input']>;
  primaryPhone?: InputMaybe<Scalars['String']['input']>;
  propertiesData?: InputMaybe<Scalars['JSON']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  website?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCompaniesMergeArgs = {
  companyFields?: InputMaybe<Scalars['JSON']['input']>;
  companyIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCompaniesRemoveArgs = {
  companyIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationConfigsActivateInstallationArgs = {
  hostname: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationConfigsManagePluginInstallArgs = {
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationConfigsUpdateArgs = {
  configsMap: Scalars['JSON']['input'];
};


export type MutationConformityAddArgs = {
  mainType?: InputMaybe<Scalars['String']['input']>;
  mainTypeId?: InputMaybe<Scalars['String']['input']>;
  relType?: InputMaybe<Scalars['String']['input']>;
  relTypeId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationConformityEditArgs = {
  mainType?: InputMaybe<Scalars['String']['input']>;
  mainTypeId?: InputMaybe<Scalars['String']['input']>;
  relType?: InputMaybe<Scalars['String']['input']>;
  relTypeIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCpCustomersAddArgs = {
  addresses?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['Date']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  emailValidationStatus?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  hasAuthority?: InputMaybe<Scalars['String']['input']>;
  isSubscribed?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  leadStatus?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Scalars['JSON']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  phoneValidationStatus?: InputMaybe<Scalars['String']['input']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  primaryAddress?: InputMaybe<Scalars['JSON']['input']>;
  primaryEmail?: InputMaybe<Scalars['String']['input']>;
  primaryPhone?: InputMaybe<Scalars['String']['input']>;
  propertiesData?: InputMaybe<Scalars['JSON']['input']>;
  sex?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCpManageRelationsArgs = {
  contentId: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
  relatedContentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  relatedContentType: Scalars['String']['input'];
};


export type MutationCpTagsAddArgs = {
  colorCode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isGroup?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCpTagsTagArgs = {
  tagIds: Array<Scalars['String']['input']>;
  targetIds: Array<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};


export type MutationCpUsersAddArgs = {
  clientPortalId: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  userType?: InputMaybe<CpUserType>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCpUsersEditArgs = {
  _id: Scalars['String']['input'];
  avatar?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyRegistrationNumber?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  erxesCompanyId?: InputMaybe<Scalars['String']['input']>;
  erxesCustomerId?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCpUsersRemoveArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationCpUsersSetPasswordArgs = {
  _id: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationCreateMultipleRelationsArgs = {
  relations: Array<RelationInput>;
};


export type MutationCreateRelationArgs = {
  relation: RelationInput;
};


export type MutationCustomersAddArgs = {
  addresses?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['Date']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  emailValidationStatus?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  hasAuthority?: InputMaybe<Scalars['String']['input']>;
  isSubscribed?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  leadStatus?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Scalars['JSON']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  phoneValidationStatus?: InputMaybe<Scalars['String']['input']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  primaryAddress?: InputMaybe<Scalars['JSON']['input']>;
  primaryEmail?: InputMaybe<Scalars['String']['input']>;
  primaryPhone?: InputMaybe<Scalars['String']['input']>;
  propertiesData?: InputMaybe<Scalars['JSON']['input']>;
  sex?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCustomersChangeStateArgs = {
  _id: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


export type MutationCustomersChangeStateBulkArgs = {
  _ids: Array<InputMaybe<Scalars['String']['input']>>;
  value: Scalars['String']['input'];
};


export type MutationCustomersChangeVerificationStatusArgs = {
  customerIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationCustomersEditArgs = {
  _id: Scalars['String']['input'];
  addresses?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['Date']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  emailValidationStatus?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  hasAuthority?: InputMaybe<Scalars['String']['input']>;
  isSubscribed?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  leadStatus?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Scalars['JSON']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  phoneValidationStatus?: InputMaybe<Scalars['String']['input']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  primaryAddress?: InputMaybe<Scalars['JSON']['input']>;
  primaryEmail?: InputMaybe<Scalars['String']['input']>;
  primaryPhone?: InputMaybe<Scalars['String']['input']>;
  propertiesData?: InputMaybe<Scalars['JSON']['input']>;
  sex?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCustomersMergeArgs = {
  customerFields?: InputMaybe<Scalars['JSON']['input']>;
  customerIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCustomersRemoveArgs = {
  customerIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCustomersVerifyArgs = {
  verificationType: Scalars['String']['input'];
};


export type MutationDeleteRelationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDepartmentsAddArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  supervisorId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  workhours?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationDepartmentsEditArgs = {
  _id: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  supervisorId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  workhours?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationDepartmentsRemoveArgs = {
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationDocumentsRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationDocumentsSaveArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  replacer?: InputMaybe<Scalars['String']['input']>;
  subType?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditOrganizationDomainArgs = {
  domain?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditOrganizationInfoArgs = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  favicon?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  iconColor?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  textColor?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEmailAddressReleaseArgs = {
  email: Scalars['String']['input'];
  note: Scalars['String']['input'];
};


export type MutationEmailRampReleaseArgs = {
  note: Scalars['String']['input'];
};


export type MutationEmailTemplateAddArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  contentFormat?: InputMaybe<Scalars['String']['input']>;
  contentJson?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationEmailTemplateEditArgs = {
  _id: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  contentFormat?: InputMaybe<Scalars['String']['input']>;
  contentJson?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationEmailTemplateRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationEngageMessageAddArgs = {
  cpId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<EngageMessageEmail>;
  fromEmail?: InputMaybe<Scalars['String']['input']>;
  fromUserId?: InputMaybe<Scalars['String']['input']>;
  isDraft?: InputMaybe<Scalars['Boolean']['input']>;
  isLive?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  messenger?: InputMaybe<EngageMessageMessenger>;
  method?: InputMaybe<Scalars['String']['input']>;
  notification?: InputMaybe<EngageMessageNotification>;
  targetCount?: InputMaybe<Scalars['Int']['input']>;
  targetIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  targetType?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  workflow?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationEngageMessageCancelScheduleArgs = {
  _id: Scalars['String']['input'];
};


export type MutationEngageMessageCopyArgs = {
  _id: Scalars['String']['input'];
};


export type MutationEngageMessageEditArgs = {
  _id: Scalars['String']['input'];
  cpId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<EngageMessageEmail>;
  fromEmail?: InputMaybe<Scalars['String']['input']>;
  fromUserId?: InputMaybe<Scalars['String']['input']>;
  isDraft?: InputMaybe<Scalars['Boolean']['input']>;
  isLive?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  messenger?: InputMaybe<EngageMessageMessenger>;
  method?: InputMaybe<Scalars['String']['input']>;
  notification?: InputMaybe<EngageMessageNotification>;
  targetCount?: InputMaybe<Scalars['Int']['input']>;
  targetIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  targetType?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  workflow?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationEngageMessageRemoveArgs = {
  _ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationEngageMessageRemoveVerifiedEmailArgs = {
  email: Scalars['String']['input'];
  scope?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEngageMessageSendTestEmailArgs = {
  content: Scalars['String']['input'];
  contentFormat?: InputMaybe<Scalars['String']['input']>;
  from: Scalars['String']['input'];
  title: Scalars['String']['input'];
  to: Scalars['String']['input'];
};


export type MutationEngageMessageSetLiveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationEngageMessageSetLiveManualArgs = {
  _id: Scalars['String']['input'];
};


export type MutationEngageMessageSetPauseArgs = {
  _id: Scalars['String']['input'];
};


export type MutationEngageMessageSetScheduleArgs = {
  _id: Scalars['String']['input'];
  dateTime?: InputMaybe<Scalars['Date']['input']>;
  recurrence?: InputMaybe<EngageRecurrenceInput>;
};


export type MutationEngageMessageVerifyEmailArgs = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  replyTo?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEngageSendMailArgs = {
  attachments?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  bcc?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  body?: InputMaybe<Scalars['String']['input']>;
  cc?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  conversationId?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  from: Scalars['String']['input'];
  headerId?: InputMaybe<Scalars['String']['input']>;
  inReplyTo?: InputMaybe<Scalars['String']['input']>;
  integrationId?: InputMaybe<Scalars['String']['input']>;
  messageId?: InputMaybe<Scalars['String']['input']>;
  references?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  replyTo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  replyToMessageId?: InputMaybe<Scalars['String']['input']>;
  shouldOpen?: InputMaybe<Scalars['Boolean']['input']>;
  shouldResolve?: InputMaybe<Scalars['Boolean']['input']>;
  subject: Scalars['String']['input'];
  threadId?: InputMaybe<Scalars['String']['input']>;
  to: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationEngagesUpdateConfigsArgs = {
  configsMap: Scalars['JSON']['input'];
};


export type MutationExportCancelArgs = {
  exportId: Scalars['String']['input'];
};


export type MutationExportRetryArgs = {
  exportId: Scalars['String']['input'];
};


export type MutationExportStartArgs = {
  entityType: Scalars['String']['input'];
  filters?: InputMaybe<Scalars['JSON']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  selectedFields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationFieldAddArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  configs?: InputMaybe<Scalars['JSON']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentTypeId?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isVisible?: InputMaybe<Scalars['Boolean']['input']>;
  isVisibleInCard?: InputMaybe<Scalars['Boolean']['input']>;
  isVisibleToCreate?: InputMaybe<Scalars['Boolean']['input']>;
  logics?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Array<InputMaybe<FieldOptionInput>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  validations?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationFieldEditArgs = {
  _id: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  configs?: InputMaybe<Scalars['JSON']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentTypeId?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isVisible?: InputMaybe<Scalars['Boolean']['input']>;
  isVisibleInCard?: InputMaybe<Scalars['Boolean']['input']>;
  isVisibleToCreate?: InputMaybe<Scalars['Boolean']['input']>;
  logics?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Array<InputMaybe<FieldOptionInput>>>;
  order?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  validations?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationFieldGroupAddArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  configs?: InputMaybe<Scalars['JSON']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  logics?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationFieldGroupEditArgs = {
  _id: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  configs?: InputMaybe<Scalars['JSON']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  logics?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationFieldGroupRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationFieldGroupsUpdateOrderArgs = {
  orders: Array<FieldGroupOrderItem>;
};


export type MutationFieldRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationImportCancelArgs = {
  importId: Scalars['String']['input'];
};


export type MutationImportResumeArgs = {
  importId: Scalars['String']['input'];
};


export type MutationImportRetryArgs = {
  importId: Scalars['String']['input'];
};


export type MutationImportStartArgs = {
  columnMapping?: InputMaybe<Array<InputMaybe<ImportColumnMappingInput>>>;
  entityType: Scalars['String']['input'];
  fileKey: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
};


export type MutationInternalNotesAddArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  contentType: Scalars['String']['input'];
  contentTypeId?: InputMaybe<Scalars['String']['input']>;
  mentionedUserIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationInternalNotesEditArgs = {
  _id: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  mentionedUserIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationInternalNotesRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  deviceToken?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLoginWithMagicLinkArgs = {
  email: Scalars['String']['input'];
};


export type MutationManageRelationsArgs = {
  contentId: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
  relatedContentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  relatedContentType: Scalars['String']['input'];
};


export type MutationMarkAsReadNotificationsArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  fromUserId?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  module?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<NotificationPriority>;
  status?: InputMaybe<NotificationStatus>;
  type?: InputMaybe<NotificationType>;
};


export type MutationMarkNotificationAsReadArgs = {
  _id: Scalars['String']['input'];
};


export type MutationOauthClientAppsAddArgs = {
  accessTokenLifetime?: InputMaybe<OAuthClientAccessTokenLifetime>;
  description?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  redirectUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  type: OAuthClientAppType;
};


export type MutationOauthClientAppsEditArgs = {
  _id: Scalars['String']['input'];
  accessTokenLifetime?: InputMaybe<OAuthClientAccessTokenLifetime>;
  description?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  redirectUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  type: OAuthClientAppType;
};


export type MutationOauthClientAppsRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationOauthClientAppsRevokeArgs = {
  _id: Scalars['String']['input'];
};


export type MutationPermissionGroupAddArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  permissions: Array<InputMaybe<PermissionInput>>;
};


export type MutationPermissionGroupEditArgs = {
  _id: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
};


export type MutationPermissionGroupRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationPositionsAddArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationPositionsEditArgs = {
  _id: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationPositionsRemoveArgs = {
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationProductBulkSimilarityAddArgs = {
  doc: Scalars['JSON']['input'];
};


export type MutationProductBulkSimilarityEditArgs = {
  _id: Scalars['String']['input'];
  doc: Scalars['JSON']['input'];
};


export type MutationProductBulkSimilarityRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationProductCategoriesAddArgs = {
  attachment?: InputMaybe<AttachmentInput>;
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isSimilarity?: InputMaybe<Scalars['Boolean']['input']>;
  mask?: InputMaybe<Scalars['JSON']['input']>;
  maskType?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  scopeBrandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  similarities?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type MutationProductCategoriesEditArgs = {
  _id: Scalars['String']['input'];
  attachment?: InputMaybe<AttachmentInput>;
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isSimilarity?: InputMaybe<Scalars['Boolean']['input']>;
  mask?: InputMaybe<Scalars['JSON']['input']>;
  maskType?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  scopeBrandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  similarities?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type MutationProductCategoriesRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationProductPackagesAddArgs = {
  coverImage?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  percent?: InputMaybe<Scalars['Float']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  products?: InputMaybe<Array<ProductPackageInput>>;
  status?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationProductPackagesChangeStatusArgs = {
  _ids: Array<Scalars['String']['input']>;
  status: Scalars['String']['input'];
};


export type MutationProductPackagesEditArgs = {
  _id: Scalars['String']['input'];
  coverImage?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  percent?: InputMaybe<Scalars['Float']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  products?: InputMaybe<Array<ProductPackageInput>>;
  status?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationProductPackagesRemoveArgs = {
  _ids: Array<Scalars['String']['input']>;
};


export type MutationProductRulesAddArgs = {
  bundleId?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  excludeCategoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  excludeProductIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  excludeTagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name: Scalars['String']['input'];
  productIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  unitPrice: Scalars['Float']['input'];
};


export type MutationProductRulesEditArgs = {
  _id: Scalars['String']['input'];
  bundleId?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  excludeCategoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  excludeProductIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  excludeTagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name: Scalars['String']['input'];
  productIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  unitPrice: Scalars['Float']['input'];
};


export type MutationProductRulesRemoveArgs = {
  _ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationProductsAddArgs = {
  attachment?: InputMaybe<AttachmentInput>;
  attachmentMore?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  barcodeDescription?: InputMaybe<Scalars['String']['input']>;
  barcodes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  durationType?: InputMaybe<ProductDurationType>;
  name?: InputMaybe<Scalars['String']['input']>;
  pdfAttachment?: InputMaybe<PdfAttachmentInput>;
  propertiesData?: InputMaybe<Scalars['JSON']['input']>;
  scopeBrandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shortName?: InputMaybe<Scalars['String']['input']>;
  subUoms?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
  uom?: InputMaybe<Scalars['String']['input']>;
  variants?: InputMaybe<Scalars['JSON']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationProductsConfigsUpdateArgs = {
  configsMap: Scalars['JSON']['input'];
};


export type MutationProductsDuplicateArgs = {
  _id: Scalars['String']['input'];
};


export type MutationProductsEditArgs = {
  _id: Scalars['String']['input'];
  attachment?: InputMaybe<AttachmentInput>;
  attachmentMore?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  barcodeDescription?: InputMaybe<Scalars['String']['input']>;
  barcodes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  durationType?: InputMaybe<ProductDurationType>;
  name?: InputMaybe<Scalars['String']['input']>;
  pdfAttachment?: InputMaybe<PdfAttachmentInput>;
  propertiesData?: InputMaybe<Scalars['JSON']['input']>;
  scopeBrandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shortName?: InputMaybe<Scalars['String']['input']>;
  subUoms?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
  uom?: InputMaybe<Scalars['String']['input']>;
  variants?: InputMaybe<Scalars['JSON']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationProductsMergeArgs = {
  productFields?: InputMaybe<Scalars['JSON']['input']>;
  productIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationProductsRemoveArgs = {
  productIds?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationPropertySystemFieldEditArgs = {
  code: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isVisible?: InputMaybe<Scalars['Boolean']['input']>;
  isVisibleToCreate?: InputMaybe<Scalars['Boolean']['input']>;
  logics?: InputMaybe<Array<PropertySystemFieldLogicInput>>;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSegmentsAddArgs = {
  color?: InputMaybe<Scalars['String']['input']>;
  contentType: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownedBy?: InputMaybe<Scalars['String']['input']>;
  root: Scalars['JSON']['input'];
  status?: InputMaybe<SegmentStatus>;
  visibility?: InputMaybe<SegmentVisibility>;
};


export type MutationSegmentsEditArgs = {
  _id: Scalars['String']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  root: Scalars['JSON']['input'];
  status?: InputMaybe<SegmentStatus>;
  visibility?: InputMaybe<SegmentVisibility>;
};


export type MutationSegmentsRebuildArgs = {
  _id: Scalars['String']['input'];
};


export type MutationSegmentsRemoveArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationSegmentsStopRebuildArgs = {
  _id: Scalars['String']['input'];
};


export type MutationStructuresAddArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  coordinate?: InputMaybe<CoordinateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<AttachmentInput>;
  links?: InputMaybe<Scalars['JSON']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  supervisorId?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};


export type MutationStructuresEditArgs = {
  _id: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  coordinate?: InputMaybe<CoordinateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<AttachmentInput>;
  links?: InputMaybe<Scalars['JSON']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  supervisorId?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};


export type MutationStructuresRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationTagsAddArgs = {
  colorCode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isGroup?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTagsEditArgs = {
  _id: Scalars['String']['input'];
  colorCode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isGroup?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTagsRemoveArgs = {
  _id: Scalars['String']['input'];
};


export type MutationTagsTagArgs = {
  tagIds: Array<Scalars['String']['input']>;
  targetIds: Array<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};


export type MutationTemplateAddArgs = {
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  configs?: InputMaybe<Scalars['JSON']['input']>;
  contentId?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTemplateCategoryAddArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTemplateCategoryEditArgs = {
  _id: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTemplateCategoryRemoveArgs = {
  _ids?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationTemplateEditArgs = {
  _id: Scalars['String']['input'];
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  configs?: InputMaybe<Scalars['JSON']['input']>;
  contentId?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTemplateRemoveArgs = {
  _ids?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationTemplateUseArgs = {
  _id: Scalars['String']['input'];
};


export type MutationToggleFavoriteArgs = {
  breadcrumb?: InputMaybe<Array<Scalars['String']['input']>>;
  icon?: InputMaybe<Scalars['String']['input']>;
  path: Scalars['String']['input'];
};


export type MutationUnitsAddArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  supervisorId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUnitsEditArgs = {
  _id: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  supervisorId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUnitsRemoveArgs = {
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationUomsAddArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  isForSubscription?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  subscriptionConfig?: InputMaybe<Scalars['JSON']['input']>;
  timely?: InputMaybe<TimelyType>;
};


export type MutationUomsEditArgs = {
  _id: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  isForSubscription?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  subscriptionConfig?: InputMaybe<Scalars['JSON']['input']>;
  timely?: InputMaybe<TimelyType>;
};


export type MutationUomsRemoveArgs = {
  uomIds?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationUpdateNotificationSettingsChannelArgs = {
  input?: InputMaybe<NotificationSettingsChannelInput>;
};


export type MutationUpdateNotificationSettingsEventArgs = {
  input?: InputMaybe<NotificationSettingsEventInput>;
};


export type MutationUpdateRelationArgs = {
  id: Scalars['String']['input'];
  relation: RelationInput;
};


export type MutationUserAddCustomPermissionArgs = {
  permission: PermissionInput;
  userId: Scalars['String']['input'];
};


export type MutationUserRemoveCustomPermissionArgs = {
  module: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationUserUpdatePermissionGroupsArgs = {
  groupIds: Array<InputMaybe<Scalars['String']['input']>>;
  userId: Scalars['String']['input'];
};


export type MutationUsersChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationUsersConfigEmailSignaturesArgs = {
  signatures?: InputMaybe<Array<InputMaybe<EmailSignature>>>;
};


export type MutationUsersConfigGetNotificationByEmailArgs = {
  isAllowed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUsersConfirmInvitationArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUsersCreateOwnerArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  purpose?: InputMaybe<Scalars['String']['input']>;
  subscribeEmail?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUsersEditArgs = {
  _id: Scalars['String']['input'];
  branchIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  brandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  channelIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  departmentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  details?: InputMaybe<UserDetails>;
  email?: InputMaybe<Scalars['String']['input']>;
  employeeId?: InputMaybe<Scalars['String']['input']>;
  groupIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isOnboarded?: InputMaybe<Scalars['Boolean']['input']>;
  links?: InputMaybe<Scalars['JSON']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  positionIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  propertiesData?: InputMaybe<Scalars['JSON']['input']>;
  score?: InputMaybe<Scalars['Float']['input']>;
  unitId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUsersEditProfileArgs = {
  details?: InputMaybe<UserDetails>;
  email: Scalars['String']['input'];
  employeeId?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Scalars['JSON']['input']>;
  positionIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  username: Scalars['String']['input'];
};


export type MutationUsersInviteArgs = {
  entries?: InputMaybe<Array<InputMaybe<InvitationEntry>>>;
};


export type MutationUsersResendInvitationArgs = {
  email: Scalars['String']['input'];
};


export type MutationUsersResetMemberPasswordArgs = {
  _id: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationUsersSetActiveStatusArgs = {
  _id: Scalars['String']['input'];
};


export type MutationUsersSetActiveStatusBatchArgs = {
  _ids: Array<Scalars['String']['input']>;
};


export type MutationUsersSetChatStatusArgs = {
  _id: Scalars['String']['input'];
  status?: InputMaybe<UserChatStatus>;
};


export type MutationUsersUpdatePermissionGroupsArgs = {
  groupIds: Array<InputMaybe<Scalars['String']['input']>>;
  userIds: Array<InputMaybe<Scalars['String']['input']>>;
};

export type NoteInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['JSON']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type Notification = {
  __typename?: 'Notification';
  _id?: Maybe<Scalars['String']['output']>;
  action?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  contentTypeId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  emailDelivery?: Maybe<EmailDelivery>;
  fromUser?: Maybe<User>;
  fromUserId?: Maybe<Scalars['String']['output']>;
  isRead?: Maybe<Scalars['Boolean']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  priority?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type NotificationConfig = {
  __typename?: 'NotificationConfig';
  _id: Scalars['String']['output'];
  action: Scalars['String']['output'];
  contentType: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy: Scalars['String']['output'];
  emailEnabled: Scalars['Boolean']['output'];
  emailSubject?: Maybe<Scalars['String']['output']>;
  emailTemplateId?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  expiresAfterDays?: Maybe<Scalars['Int']['output']>;
  inAppEnabled: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type NotificationConfigListResponse = {
  __typename?: 'NotificationConfigListResponse';
  list?: Maybe<Array<Maybe<NotificationConfig>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type NotificationFilters = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  fromUserId?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<NotificationPriority>;
  status?: InputMaybe<NotificationStatus>;
  type?: InputMaybe<NotificationType>;
};

export type NotificationModule = {
  __typename?: 'NotificationModule';
  description?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<Maybe<NotificationModuleEvent>>>;
  icon?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type NotificationModuleEvent = {
  __typename?: 'NotificationModuleEvent';
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type NotificationPluginType = {
  __typename?: 'NotificationPluginType';
  modules?: Maybe<Array<Maybe<NotificationModule>>>;
  pluginName?: Maybe<Scalars['String']['output']>;
};

export enum NotificationPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Urgent = 'URGENT'
}

export type NotificationSettings = {
  __typename?: 'NotificationSettings';
  channels?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Scalars['JSON']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type NotificationSettingsChannelInput = {
  channel?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
};

export type NotificationSettingsEventInput = {
  channels?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
};

export enum NotificationStatus {
  All = 'ALL',
  Read = 'READ',
  Unread = 'UNREAD'
}

export enum NotificationType {
  Error = 'ERROR',
  Info = 'INFO',
  Success = 'SUCCESS',
  Warning = 'WARNING'
}

export type NotificationsList = {
  __typename?: 'NotificationsList';
  list?: Maybe<Array<Maybe<Notification>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export enum OAuthClientAccessTokenLifetime {
  Half = 'half',
  Trio = 'trio',
  Year = 'year'
}

export type OAuthClientApp = {
  __typename?: 'OAuthClientApp';
  _id?: Maybe<Scalars['String']['output']>;
  accessTokenLifetime?: Maybe<OAuthClientAccessTokenLifetime>;
  clientId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  generatedSecret?: Maybe<Scalars['String']['output']>;
  lastUsedAt?: Maybe<Scalars['Date']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  redirectUrls?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  status?: Maybe<OAuthClientAppStatus>;
  type?: Maybe<OAuthClientAppType>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum OAuthClientAppStatus {
  Active = 'active',
  Revoked = 'revoked'
}

export enum OAuthClientAppType {
  Confidential = 'confidential',
  Public = 'public'
}

export type OtpConfig = {
  __typename?: 'OTPConfig';
  email?: Maybe<OtpEmailConfig>;
  sms?: Maybe<OtpsmsConfig>;
};

export type OtpConfigInput = {
  email?: InputMaybe<OtpEmailConfigInput>;
  sms?: InputMaybe<OtpsmsConfigInput>;
};

export type OtpEmailConfig = {
  __typename?: 'OTPEmailConfig';
  codeLength?: Maybe<Scalars['Int']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  emailSubject?: Maybe<Scalars['String']['output']>;
  enableEmailVerification?: Maybe<Scalars['Boolean']['output']>;
  enablePasswordlessLogin?: Maybe<Scalars['Boolean']['output']>;
  messageTemplate?: Maybe<Scalars['String']['output']>;
};

export type OtpEmailConfigInput = {
  codeLength?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  emailSubject?: InputMaybe<Scalars['String']['input']>;
  enableEmailVerification?: InputMaybe<Scalars['Boolean']['input']>;
  enablePasswordlessLogin?: InputMaybe<Scalars['Boolean']['input']>;
  messageTemplate?: InputMaybe<Scalars['String']['input']>;
};

export type OtpResendConfig = {
  __typename?: 'OTPResendConfig';
  cooldownPeriodInSeconds?: Maybe<Scalars['Int']['output']>;
  maxAttemptsPerHour?: Maybe<Scalars['Int']['output']>;
};

export type OtpResendConfigInput = {
  cooldownPeriodInSeconds?: InputMaybe<Scalars['Int']['input']>;
  maxAttemptsPerHour?: InputMaybe<Scalars['Int']['input']>;
};

export type OtpsmsConfig = {
  __typename?: 'OTPSMSConfig';
  codeLength?: Maybe<Scalars['Int']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  enablePasswordlessLogin?: Maybe<Scalars['Boolean']['output']>;
  enablePhoneVerification?: Maybe<Scalars['Boolean']['output']>;
  messageTemplate?: Maybe<Scalars['String']['output']>;
  smsProvider?: Maybe<Scalars['String']['output']>;
};

export type OtpsmsConfigInput = {
  codeLength?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  enablePasswordlessLogin?: InputMaybe<Scalars['Boolean']['input']>;
  enablePhoneVerification?: InputMaybe<Scalars['Boolean']['input']>;
  messageTemplate?: InputMaybe<Scalars['String']['input']>;
  smsProvider?: InputMaybe<Scalars['String']['input']>;
};

export type Organization = {
  __typename?: 'Organization';
  bundleNames?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  category?: Maybe<Scalars['String']['output']>;
  charge?: Maybe<Scalars['JSON']['output']>;
  contactRemaining?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  experience?: Maybe<Scalars['JSON']['output']>;
  experienceName?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['Date']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  isPaid?: Maybe<Scalars['Boolean']['output']>;
  isWhiteLabel?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  onboardedPlugins?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  plan?: Maybe<Scalars['String']['output']>;
  promoCodes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  purchased?: Maybe<Scalars['Int']['output']>;
  setupService?: Maybe<Scalars['JSON']['output']>;
  subdomain?: Maybe<Scalars['String']['output']>;
};

export type PackageProduct = {
  __typename?: 'PackageProduct';
  product?: Maybe<Product>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PasswordVerificationConfig = {
  __typename?: 'PasswordVerificationConfig';
  emailContent?: Maybe<Scalars['String']['output']>;
  emailSubject?: Maybe<Scalars['String']['output']>;
  smsContent?: Maybe<Scalars['String']['output']>;
  verifyByOTP?: Maybe<Scalars['Boolean']['output']>;
};

export type PasswordVerificationConfigInput = {
  emailContent?: InputMaybe<Scalars['String']['input']>;
  emailSubject?: InputMaybe<Scalars['String']['input']>;
  smsContent?: InputMaybe<Scalars['String']['input']>;
  verifyByOTP?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PdfAttachment = {
  __typename?: 'PdfAttachment';
  pages?: Maybe<Array<Maybe<Attachment>>>;
  pdf?: Maybe<Attachment>;
};

export type PdfAttachmentInput = {
  pages?: InputMaybe<Array<InputMaybe<AttachmentInput>>>;
  pdf?: InputMaybe<AttachmentInput>;
};

export type PermissionAction = {
  __typename?: 'PermissionAction';
  always?: Maybe<Scalars['Boolean']['output']>;
  description: Scalars['String']['output'];
  disabled?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type PermissionGroup = {
  __typename?: 'PermissionGroup';
  _id: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<Maybe<User>>>;
  name: Scalars['String']['output'];
  permissions: Array<Maybe<PermissionGroupPermission>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type PermissionGroupPermission = {
  __typename?: 'PermissionGroupPermission';
  actions: Array<Maybe<Scalars['String']['output']>>;
  module: Scalars['String']['output'];
  plugin: Scalars['String']['output'];
  scope: Scalars['String']['output'];
};

export type PermissionInput = {
  actions: Array<InputMaybe<Scalars['String']['input']>>;
  module: Scalars['String']['input'];
  plugin: Scalars['String']['input'];
  scope: Scalars['String']['input'];
};

export type PermissionModule = {
  __typename?: 'PermissionModule';
  actions: Array<Maybe<PermissionAction>>;
  always?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  ownerFields?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  plugin: Scalars['String']['output'];
  scopeField?: Maybe<Scalars['String']['output']>;
  scopes?: Maybe<Array<Maybe<PermissionScopeDescription>>>;
};

export type PermissionModulesByPlugin = {
  __typename?: 'PermissionModulesByPlugin';
  modules: Array<Maybe<PermissionModule>>;
  plugin: Scalars['String']['output'];
};

export type PermissionScopeDescription = {
  __typename?: 'PermissionScopeDescription';
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Position = {
  __typename?: 'Position';
  _id: Scalars['String']['output'];
  children?: Maybe<Array<Maybe<Position>>>;
  code?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Position>;
  parentId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userCount?: Maybe<Scalars['Int']['output']>;
  userIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type PositionListQueryResponse = {
  __typename?: 'PositionListQueryResponse';
  list?: Maybe<Array<Maybe<Position>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export enum PriceType {
  MainPricePercent = 'mainPricePercent',
  Price = 'price',
  ThisProductPricePercent = 'thisProductPricePercent'
}

export type Product = {
  __typename?: 'Product';
  _id: Scalars['String']['output'];
  attachment?: Maybe<Attachment>;
  attachmentMore?: Maybe<Array<Maybe<Attachment>>>;
  barcodeDescription?: Maybe<Scalars['String']['output']>;
  barcodes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  category?: Maybe<ProductCategory>;
  categoryId?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  cursor?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['JSON']['output']>;
  discounts?: Maybe<Scalars['JSON']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  durationType?: Maybe<ProductDurationType>;
  hasSimilarity?: Maybe<Scalars['Boolean']['output']>;
  inventories?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pdfAttachment?: Maybe<PdfAttachment>;
  propertiesData?: Maybe<Scalars['JSON']['output']>;
  remainder?: Maybe<Scalars['JSON']['output']>;
  scopeBrandIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  shortName?: Maybe<Scalars['String']['output']>;
  similarity?: Maybe<ProductBulkSimilarity>;
  similarityId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subUoms?: Maybe<Scalars['JSON']['output']>;
  tagIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  type?: Maybe<Scalars['String']['output']>;
  unitPrice?: Maybe<Scalars['Float']['output']>;
  uom?: Maybe<Scalars['String']['output']>;
  variants?: Maybe<Scalars['JSON']['output']>;
  vendor?: Maybe<Company>;
  vendorId?: Maybe<Scalars['String']['output']>;
  videos?: Maybe<Array<Maybe<Attachment>>>;
  weight?: Maybe<Scalars['Float']['output']>;
};


export type ProductDiscountArgs = {
  branchId?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  discountConditions?: InputMaybe<Scalars['JSON']['input']>;
};

export type ProductBulkSimilarity = {
  __typename?: 'ProductBulkSimilarity';
  _id: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  fields?: Maybe<Array<Maybe<ProductSimilarityField>>>;
  info?: Maybe<Scalars['JSON']['output']>;
  productIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  products?: Maybe<Array<Maybe<Product>>>;
  propertiesData?: Maybe<Scalars['JSON']['output']>;
  starProductId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  _id: Scalars['String']['output'];
  attachment?: Maybe<Attachment>;
  code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  isRoot?: Maybe<Scalars['Boolean']['output']>;
  isSimilarity?: Maybe<Scalars['Boolean']['output']>;
  mask?: Maybe<Scalars['JSON']['output']>;
  maskType?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  productCount?: Maybe<Scalars['Int']['output']>;
  scopeBrandIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  similarities?: Maybe<Scalars['JSON']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export enum ProductDurationType {
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute',
  Month = 'month',
  Quarter = 'quarter',
  Week = 'week',
  Year = 'year'
}

export type ProductPackage = {
  __typename?: 'ProductPackage';
  _id: Scalars['String']['output'];
  coverImage?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  percent?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  products?: Maybe<Array<Maybe<PackageProduct>>>;
  status?: Maybe<Scalars['String']['output']>;
  tagIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProductPackageInput = {
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type ProductPackagesListResponse = {
  __typename?: 'ProductPackagesListResponse';
  list?: Maybe<Array<Maybe<ProductPackage>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ProductRule = {
  __typename?: 'ProductRule';
  _id: Scalars['String']['output'];
  bundleId?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Maybe<ProductCategory>>>;
  categoryIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  excludeCategories?: Maybe<Array<Maybe<ProductCategory>>>;
  excludeCategoryIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  excludeProductIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  excludeProducts?: Maybe<Array<Maybe<Product>>>;
  excludeTagIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  excludeTags?: Maybe<Array<Maybe<Tag>>>;
  name: Scalars['String']['output'];
  productIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  products?: Maybe<Array<Maybe<Product>>>;
  tagIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  unitPrice: Scalars['Float']['output'];
};

export type ProductRulesCount = {
  __typename?: 'ProductRulesCount';
  list?: Maybe<Array<Maybe<ProductRule>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ProductSimilarity = {
  __typename?: 'ProductSimilarity';
  groups?: Maybe<Array<Maybe<ProductSimilarityGroup>>>;
  products?: Maybe<Array<Maybe<Product>>>;
};

export type ProductSimilarityField = {
  __typename?: 'ProductSimilarityField';
  fieldId?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type ProductSimilarityGroup = {
  __typename?: 'ProductSimilarityGroup';
  fieldId?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ProductsConfig = {
  __typename?: 'ProductsConfig';
  _id: Scalars['String']['output'];
  code: Scalars['String']['output'];
  value?: Maybe<Scalars['JSON']['output']>;
};

export type ProductsListResponse = {
  __typename?: 'ProductsListResponse';
  list?: Maybe<Array<Maybe<Product>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PropertySystemField = {
  __typename?: 'PropertySystemField';
  code: Scalars['String']['output'];
  isRequired: Scalars['Boolean']['output'];
  isVisible: Scalars['Boolean']['output'];
  isVisibleToCreate: Scalars['Boolean']['output'];
  logics?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type PropertySystemFieldLogicInput = {
  action: Scalars['String']['input'];
  field: Scalars['String']['input'];
  operator: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type PropertyType = {
  __typename?: 'PropertyType';
  contentType?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  _sentryGraphqlTest?: Maybe<Scalars['String']['output']>;
  activeExports?: Maybe<Array<Maybe<Export>>>;
  activeImports?: Maybe<Array<Maybe<Import>>>;
  activityLogs?: Maybe<ActivityLogsList>;
  allBrands?: Maybe<Array<Maybe<Brand>>>;
  allBundleConditions?: Maybe<Array<Maybe<BundleCondition>>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  appDetail?: Maybe<App>;
  approvalLockState?: Maybe<ApprovalLockState>;
  approvalLockStates?: Maybe<Array<Maybe<ApprovalLockState>>>;
  approvalRequestDetail?: Maybe<ApprovalRequest>;
  approvalRequests?: Maybe<ApprovalRequestsList>;
  apps?: Maybe<Array<Maybe<App>>>;
  appsTotalCount?: Maybe<Scalars['Int']['output']>;
  automationBotsConstants?: Maybe<Scalars['JSON']['output']>;
  automationConstants?: Maybe<Scalars['JSON']['output']>;
  automationDetail?: Maybe<Automation>;
  automationExecutionCounts?: Maybe<Array<Maybe<AutomationStatsCount>>>;
  automationHistories?: Maybe<AutomationHistories>;
  automationHistoriesTotalCount?: Maybe<Scalars['Int']['output']>;
  automationNodeOutput?: Maybe<Scalars['JSON']['output']>;
  automationReferenceFields?: Maybe<Scalars['JSON']['output']>;
  automationSetPropertyTargets?: Maybe<Scalars['JSON']['output']>;
  automationStats?: Maybe<AutomationStats>;
  automationWorkflowTemplates?: Maybe<Array<Maybe<AutomationWorkflowTemplate>>>;
  automations?: Maybe<Array<Maybe<Automation>>>;
  automationsAiAgentDetail?: Maybe<Scalars['JSON']['output']>;
  automationsAiAgentHealth: AiAgentHealth;
  automationsAiAgentKnowledgeSourceStatuses?: Maybe<Scalars['JSON']['output']>;
  automationsAiAgentTotalCounts?: Maybe<Scalars['JSON']['output']>;
  automationsAiAgents?: Maybe<Scalars['JSON']['output']>;
  automationsMain?: Maybe<AutomationsListResponse>;
  automationsTotalCount?: Maybe<AutomationsTotalCountResponse>;
  beforeResolverAvailable?: Maybe<Scalars['JSON']['output']>;
  branchDetail?: Maybe<Branch>;
  branches?: Maybe<Array<Maybe<Branch>>>;
  branchesMain?: Maybe<BranchesListResponse>;
  brandDetail?: Maybe<Brand>;
  brands?: Maybe<BrandListResponse>;
  brandsGetLast?: Maybe<Brand>;
  brandsTotalCount?: Maybe<Scalars['Int']['output']>;
  broadcastEmailDryRun?: Maybe<BroadcastEmailDryRun>;
  broadcastRecipientEmail?: Maybe<BroadcastRecipientEmail>;
  bundleConditionDetail?: Maybe<BundleCondition>;
  bundleConditionTotalCount?: Maybe<Scalars['Int']['output']>;
  bundleConditions?: Maybe<Array<Maybe<BundleCondition>>>;
  bundleRuleDetail?: Maybe<BundleRule>;
  bundleRules?: Maybe<Array<Maybe<BundleRule>>>;
  categoriesWithChilds?: Maybe<Array<Maybe<ProductCategory>>>;
  clientPortalComment?: Maybe<CpComment>;
  clientPortalComments?: Maybe<CpCommentListResponse>;
  clientPortalCurrentUser?: Maybe<CpUser>;
  clientPortalNotificationDetail?: Maybe<CpNotification>;
  clientPortalNotifications?: Maybe<CpNotificationListResponse>;
  clientPortalUnreadNotificationCount?: Maybe<Scalars['Int']['output']>;
  companies?: Maybe<CompaniesListResponse>;
  companyDetail?: Maybe<Company>;
  configs?: Maybe<Array<Maybe<Config>>>;
  configsByCode?: Maybe<Array<Maybe<Config>>>;
  configsCheckActivateInstallation?: Maybe<Scalars['JSON']['output']>;
  configsCheckPremiumService?: Maybe<Scalars['Boolean']['output']>;
  configsConstants?: Maybe<Scalars['JSON']['output']>;
  configsFileUploadInfo?: Maybe<FileUploadServiceInfo>;
  configsGetEmailTemplate?: Maybe<Scalars['String']['output']>;
  configsGetEnv?: Maybe<Env>;
  configsGetInstallationStatus?: Maybe<Scalars['JSON']['output']>;
  configsGetValue?: Maybe<Scalars['JSON']['output']>;
  configsGetVersion?: Maybe<Scalars['JSON']['output']>;
  contactsLogs?: Maybe<Scalars['JSON']['output']>;
  coreModulesGlobalSearch?: Maybe<CoreModulesGlobalSearchResult>;
  cpAutomationDetail?: Maybe<Automation>;
  cpBranchDetail?: Maybe<Branch>;
  cpBranches?: Maybe<Array<Maybe<Branch>>>;
  cpBranchesMain?: Maybe<BranchesListResponse>;
  cpCompanies?: Maybe<CompaniesListResponse>;
  cpCustomerDetail?: Maybe<Customer>;
  cpCustomers?: Maybe<CustomersListResponse>;
  cpDepartments?: Maybe<Array<Maybe<Department>>>;
  cpFieldDetail?: Maybe<Field>;
  cpFieldGroups?: Maybe<Array<Maybe<FieldGroup>>>;
  cpFields?: Maybe<Array<Maybe<Field>>>;
  cpGetRelationsByEntity?: Maybe<Array<Relation>>;
  cpProductCategories?: Maybe<Array<Maybe<ProductCategory>>>;
  cpProductDetail?: Maybe<Product>;
  cpProducts?: Maybe<Array<Maybe<Product>>>;
  cpTags?: Maybe<Array<Maybe<Tag>>>;
  cpUnits?: Maybe<Array<Maybe<CpUnit>>>;
  cpUoms?: Maybe<Array<Maybe<Uom>>>;
  currentUser?: Maybe<User>;
  currentUserPermissions?: Maybe<CurrentUserPermissionsResult>;
  customerDetail?: Maybe<Customer>;
  customers?: Maybe<CustomersListResponse>;
  customersCount?: Maybe<Scalars['JSON']['output']>;
  departmentDetail?: Maybe<Department>;
  departments?: Maybe<Array<Maybe<Department>>>;
  departmentsMain?: Maybe<DepartmentsListResponse>;
  documents?: Maybe<DocumentListResponse>;
  documentsDetail?: Maybe<Document>;
  documentsGetEditorAttributes?: Maybe<Array<Maybe<DocumentEditorAttribute>>>;
  documentsProcess?: Maybe<Scalars['String']['output']>;
  documentsTotalCount?: Maybe<Scalars['Int']['output']>;
  documentsTypes?: Maybe<Array<Maybe<DocumentsTypes>>>;
  emailAddresses?: Maybe<EmailAddressesList>;
  emailContentPreview?: Maybe<Scalars['String']['output']>;
  emailDeliveries?: Maybe<EmailDeliveriesList>;
  emailDeliveryDetail?: Maybe<EmailDelivery>;
  emailRampStatus?: Maybe<EmailRampStatus>;
  emailSenderOptions?: Maybe<EmailSenderOptions>;
  emailTemplateDetail?: Maybe<EmailTemplate>;
  emailTemplates?: Maybe<EmailTemplatesListResponse>;
  enabledServices?: Maybe<Scalars['JSON']['output']>;
  engageBroadcastRecipients?: Maybe<BroadcastRecipientListResponse>;
  engageBroadcastRuns?: Maybe<Array<Maybe<BroadcastRun>>>;
  engageBroadcastTraces?: Maybe<Array<Maybe<BroadcastTrace>>>;
  engageEmailPercentages?: Maybe<AvgEmailStats>;
  engageMembers?: Maybe<EngageMemberListResponse>;
  engageMessageCounts?: Maybe<Scalars['JSON']['output']>;
  engageMessageDetail?: Maybe<EngageMessage>;
  engageMessages?: Maybe<EngageMessageListResponse>;
  engageMessagesTotalCount?: Maybe<Scalars['Int']['output']>;
  engageReportsList?: Maybe<EngageDeliveryReport>;
  /** What went out, and what is due to, between two moments */
  engageScheduleCalendar?: Maybe<Array<Maybe<EngageCalendarEntry>>>;
  /** How often a proposed recurrence would fire, and when it next would */
  engageSchedulePreview?: Maybe<Scalars['JSON']['output']>;
  engageSmsDeliveries?: Maybe<DeliveryList>;
  engageVerifiedEmails?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  engagesConfigDetail?: Maybe<Scalars['JSON']['output']>;
  exportHeaders?: Maybe<Array<Maybe<ExportHeader>>>;
  exportHistories?: Maybe<ExportHistoryList>;
  exportProgress?: Maybe<Export>;
  fieldDetail?: Maybe<Field>;
  fieldGroups?: Maybe<FieldGroupListResponse>;
  fields?: Maybe<FieldListResponse>;
  fieldsCombinedByContentType?: Maybe<Scalars['JSON']['output']>;
  getAutomationExecutionDetail?: Maybe<AutomationHistory>;
  getAutomationWebhookEndpoint?: Maybe<Scalars['String']['output']>;
  getCPExamplePosts?: Maybe<Array<Maybe<CpExamplePost>>>;
  getClientPortal?: Maybe<ClientPortal>;
  getClientPortalNotificationsByCpUserId?: Maybe<CpNotificationListResponse>;
  getClientPortalUser?: Maybe<CpUser>;
  getClientPortalUsers?: Maybe<CpUserListResponse>;
  getClientPortals?: Maybe<ClientPortalListResponse>;
  getFavoritesByCurrentUser?: Maybe<Array<Maybe<Favorite>>>;
  getRelationsByEntities?: Maybe<Array<Relation>>;
  getRelationsByEntity?: Maybe<Array<Relation>>;
  importColumnPreview?: Maybe<ImportColumnPreview>;
  importExportTypes: Array<ImportExportType>;
  importFields?: Maybe<Array<Maybe<ImportPreviewField>>>;
  importHistories?: Maybe<ImportHistoryList>;
  importProgress?: Maybe<Import>;
  internalNoteDetail?: Maybe<InternalNote>;
  internalNotes?: Maybe<Array<Maybe<InternalNote>>>;
  internalNotesAsLogs?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  internalNotesByAction?: Maybe<InternalNotesByAction>;
  isFavorite?: Maybe<Scalars['Boolean']['output']>;
  logDetail?: Maybe<Log>;
  logsGetContentTypes: Array<LogContentType>;
  logsMainList?: Maybe<MainLogsList>;
  notificationDetail?: Maybe<Notification>;
  notificationSettings?: Maybe<NotificationSettings>;
  notifications?: Maybe<NotificationsList>;
  oauthClientAppDetail?: Maybe<OAuthClientApp>;
  oauthClientApps?: Maybe<Array<Maybe<OAuthClientApp>>>;
  oauthClientAppsTotalCount?: Maybe<Scalars['Int']['output']>;
  permissionDefaultGroups?: Maybe<Array<Maybe<DefaultPermissionGroup>>>;
  permissionGroupDetail?: Maybe<PermissionGroup>;
  permissionGroups?: Maybe<Array<Maybe<PermissionGroup>>>;
  permissionModules?: Maybe<Array<Maybe<PermissionModulesByPlugin>>>;
  pluginsNotifications?: Maybe<Array<Maybe<NotificationPluginType>>>;
  positionDetail?: Maybe<Position>;
  positions?: Maybe<Array<Maybe<Position>>>;
  positionsMain?: Maybe<PositionListQueryResponse>;
  productBulkSimilarities?: Maybe<Array<Maybe<ProductBulkSimilarity>>>;
  productBulkSimilaritiesTotalCount?: Maybe<Scalars['Int']['output']>;
  productBulkSimilarity?: Maybe<ProductBulkSimilarity>;
  productCategories?: Maybe<Array<Maybe<ProductCategory>>>;
  productCategoriesTotalCount?: Maybe<Scalars['Int']['output']>;
  productCategoryDetail?: Maybe<ProductCategory>;
  productCountByTags?: Maybe<Scalars['JSON']['output']>;
  productDetail?: Maybe<Product>;
  productLastCodeByCategory?: Maybe<Scalars['String']['output']>;
  productPackageDetail?: Maybe<ProductPackage>;
  productPackages?: Maybe<ProductPackagesListResponse>;
  productRules?: Maybe<Array<Maybe<ProductRule>>>;
  productRulesWithCount?: Maybe<ProductRulesCount>;
  productSimilarities?: Maybe<ProductSimilarity>;
  products?: Maybe<Array<Maybe<Product>>>;
  productsConfigs?: Maybe<Array<Maybe<ProductsConfig>>>;
  productsMain?: Maybe<ProductsListResponse>;
  productsTotalCount?: Maybe<Scalars['Int']['output']>;
  propertySystemFields: Array<PropertySystemField>;
  propertyTypes?: Maybe<Scalars['JSON']['output']>;
  recordReferenceFields?: Maybe<Scalars['JSON']['output']>;
  recordReferenceResolvePlaceholders?: Maybe<Scalars['JSON']['output']>;
  search?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  segmentDetail?: Maybe<Segment>;
  /** Filterable fields for a content type, including tenant custom properties. */
  segmentFields: Array<SegmentField>;
  /** A segment's membership and movement per day, oldest first. */
  segmentGrowth: Array<SegmentDay>;
  segmentMemberCount: SegmentMemberCount;
  segmentMembers: SegmentMemberPage;
  /** Related entities a segment on this content type can reach. */
  segmentRelations: Array<SegmentRelation>;
  /** The segment already asking this, if one exists. */
  segmentSameDefinition?: Maybe<Segment>;
  /** What still points at these segments, read before deleting one. */
  segmentUsage: Array<SegmentUsage>;
  segments?: Maybe<Array<Maybe<Segment>>>;
  segmentsGetTypes?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  /** How many records a tree would match, for the form's live count. */
  segmentsPreviewCount: SegmentMemberCount;
  settingsGlobalSearch?: Maybe<SettingsGlobalSearchResult>;
  structureDetail?: Maybe<Structure>;
  tagDetail?: Maybe<Tag>;
  tags?: Maybe<TagsListResponse>;
  tagsGetTypes?: Maybe<Scalars['JSON']['output']>;
  tagsMain?: Maybe<Array<Maybe<Tag>>>;
  tagsQueryCount?: Maybe<Scalars['Int']['output']>;
  templateCategories?: Maybe<TemplateCategoryListResponse>;
  templateCategory?: Maybe<TemplateCategory>;
  templateDetail?: Maybe<Template>;
  templateList?: Maybe<TemplateListResponse>;
  templatesGetTypes?: Maybe<Scalars['JSON']['output']>;
  unitDetail?: Maybe<Unit>;
  units?: Maybe<Array<Maybe<Unit>>>;
  unitsMain?: Maybe<UnitListQueryResponse>;
  unreadNotificationsCount?: Maybe<Scalars['Int']['output']>;
  uoms?: Maybe<Array<Maybe<Uom>>>;
  uomsTotalCount?: Maybe<Scalars['Int']['output']>;
  userDetail?: Maybe<User>;
  userMovements?: Maybe<Array<Maybe<UserMovement>>>;
  users?: Maybe<UsersListResponse>;
  usersTotalCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryActiveExportsArgs = {
  entityType?: InputMaybe<Scalars['String']['input']>;
};


export type QueryActiveImportsArgs = {
  entityType?: InputMaybe<Scalars['String']['input']>;
};


export type QueryActivityLogsArgs = {
  action?: InputMaybe<Scalars['String']['input']>;
  activityType?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  dateFrom?: InputMaybe<Scalars['Date']['input']>;
  dateTo?: InputMaybe<Scalars['Date']['input']>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeActivityType?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  targetId: Scalars['String']['input'];
  targetType?: InputMaybe<Scalars['String']['input']>;
  variant?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAllUsersArgs = {
  assignedToMe?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAppDetailArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryApprovalLockStateArgs = {
  action?: InputMaybe<Scalars['String']['input']>;
  contentId: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
  ownerId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryApprovalLockStatesArgs = {
  action?: InputMaybe<Scalars['String']['input']>;
  contentIds: Array<Scalars['String']['input']>;
  contentType: Scalars['String']['input'];
  ownerIdsByContentId?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryApprovalRequestDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryApprovalRequestsArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  approverIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentId?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  kind?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  requesterIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAppsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAppsTotalCountArgs = {
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAutomationDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryAutomationExecutionCountsArgs = {
  automationIds: Array<Scalars['String']['input']>;
};


export type QueryAutomationHistoriesArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  automationId: Scalars['String']['input'];
  beginDate?: InputMaybe<Scalars['Date']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  errorCodes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  failedActionIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parentExecutionId?: InputMaybe<Scalars['String']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  targetId?: InputMaybe<Scalars['String']['input']>;
  targetIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  triggerId?: InputMaybe<Scalars['String']['input']>;
  triggerType?: InputMaybe<Scalars['String']['input']>;
  triggerTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  waitingActionIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryAutomationHistoriesTotalCountArgs = {
  automationId: Scalars['String']['input'];
  beginDate?: InputMaybe<Scalars['Date']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  errorCodes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  failedActionIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parentExecutionId?: InputMaybe<Scalars['String']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  targetId?: InputMaybe<Scalars['String']['input']>;
  targetIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  triggerId?: InputMaybe<Scalars['String']['input']>;
  triggerType?: InputMaybe<Scalars['String']['input']>;
  triggerTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  waitingActionIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryAutomationNodeOutputArgs = {
  nodeType: Scalars['String']['input'];
};


export type QueryAutomationReferenceFieldsArgs = {
  field: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type QueryAutomationSetPropertyTargetsArgs = {
  sourceType: Scalars['String']['input'];
};


export type QueryAutomationStatsArgs = {
  automationId: Scalars['String']['input'];
  beginDate?: InputMaybe<Scalars['Date']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
};


export type QueryAutomationWorkflowTemplatesArgs = {
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAutomationsArgs = {
  actionTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdAtFrom?: InputMaybe<Scalars['Date']['input']>;
  createdAtTo?: InputMaybe<Scalars['Date']['input']>;
  createdByIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  excludeIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  triggerTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  updatedAtFrom?: InputMaybe<Scalars['Date']['input']>;
  updatedAtTo?: InputMaybe<Scalars['Date']['input']>;
  updatedByIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryAutomationsAiAgentDetailArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAutomationsAiAgentHealthArgs = {
  agentId: Scalars['String']['input'];
};


export type QueryAutomationsAiAgentKnowledgeSourceStatusesArgs = {
  agentId: Scalars['String']['input'];
};


export type QueryAutomationsAiAgentsArgs = {
  kind?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAutomationsMainArgs = {
  actionTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  createdAtFrom?: InputMaybe<Scalars['Date']['input']>;
  createdAtTo?: InputMaybe<Scalars['Date']['input']>;
  createdByIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  triggerTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  updatedAtFrom?: InputMaybe<Scalars['Date']['input']>;
  updatedAtTo?: InputMaybe<Scalars['Date']['input']>;
  updatedByIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryAutomationsTotalCountArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBeforeResolverAvailableArgs = {
  args?: InputMaybe<Scalars['JSON']['input']>;
  resolver: Scalars['String']['input'];
};


export type QueryBranchDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryBranchesArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyFirstLevel?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  withoutUserFilter?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryBranchesMainArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyFirstLevel?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  withoutUserFilter?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryBrandDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryBrandsArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBroadcastEmailDryRunArgs = {
  _id: Scalars['String']['input'];
  sampleSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBroadcastRecipientEmailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryBundleConditionDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryBundleConditionsArgs = {
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBundleRuleDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryCategoriesWithChildsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type QueryClientPortalCommentArgs = {
  _id: Scalars['String']['input'];
};


export type QueryClientPortalCommentsArgs = {
  filter?: InputMaybe<CpCommentFilter>;
};


export type QueryClientPortalNotificationDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryClientPortalNotificationsArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  clientPortalId?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<CpNotificationKind>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  priority?: InputMaybe<CpNotificationPriority>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CpNotificationStatus>;
  type?: InputMaybe<CpNotificationType>;
};


export type QueryClientPortalUnreadNotificationCountArgs = {
  clientPortalId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCompaniesArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  autoCompletion?: InputMaybe<Scalars['Boolean']['input']>;
  autoCompletionType?: InputMaybe<Scalars['String']['input']>;
  conformityIsRelated?: InputMaybe<Scalars['Boolean']['input']>;
  conformityIsSaved?: InputMaybe<Scalars['Boolean']['input']>;
  conformityMainType?: InputMaybe<Scalars['String']['input']>;
  conformityMainTypeId?: InputMaybe<Scalars['String']['input']>;
  conformityRelType?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  dateFilters?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  excludeTagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  segment?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Contact_Status>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagWithRelated?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCompanyDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryConfigsByCodeArgs = {
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pattern?: InputMaybe<Scalars['String']['input']>;
};


export type QueryConfigsCheckActivateInstallationArgs = {
  hostname: Scalars['String']['input'];
};


export type QueryConfigsCheckPremiumServiceArgs = {
  type: Scalars['String']['input'];
};


export type QueryConfigsGetEmailTemplateArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryConfigsGetInstallationStatusArgs = {
  name: Scalars['String']['input'];
};


export type QueryConfigsGetValueArgs = {
  code: Scalars['String']['input'];
};


export type QueryConfigsGetVersionArgs = {
  releaseNotes?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryContactsLogsArgs = {
  action?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCoreModulesGlobalSearchArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  module?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCpAutomationDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryCpBranchDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryCpBranchesArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyFirstLevel?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  withoutUserFilter?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCpBranchesMainArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyFirstLevel?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  withoutUserFilter?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCpCompaniesArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  autoCompletion?: InputMaybe<Scalars['Boolean']['input']>;
  autoCompletionType?: InputMaybe<Scalars['String']['input']>;
  conformityIsRelated?: InputMaybe<Scalars['Boolean']['input']>;
  conformityIsSaved?: InputMaybe<Scalars['Boolean']['input']>;
  conformityMainType?: InputMaybe<Scalars['String']['input']>;
  conformityMainTypeId?: InputMaybe<Scalars['String']['input']>;
  conformityRelType?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  dateFilters?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  excludeTagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  segment?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Contact_Status>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagWithRelated?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCpCustomerDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryCpCustomersArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  autoCompletion?: InputMaybe<Scalars['Boolean']['input']>;
  autoCompletionType?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['Date']['input']>;
  brandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  clientPortalId?: InputMaybe<Scalars['String']['input']>;
  conformityIsRelated?: InputMaybe<Scalars['Boolean']['input']>;
  conformityIsSaved?: InputMaybe<Scalars['Boolean']['input']>;
  conformityMainType?: InputMaybe<Scalars['String']['input']>;
  conformityMainTypeId?: InputMaybe<Scalars['String']['input']>;
  conformityRelType?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  dateFilters?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Cursor_Direction>;
  emailValidationStatus?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  excludeTagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  formIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  integrationIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  integrationTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  leadStatus?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  propertiesData?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  segment?: InputMaybe<Scalars['String']['input']>;
  segmentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sex?: InputMaybe<Scalars['Int']['input']>;
  sortDirection?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Contact_Status>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagWithRelated?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCpDepartmentsArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyFirstLevel?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  withoutUserFilter?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCpFieldDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryCpFieldGroupsArgs = {
  params?: InputMaybe<CpFieldGroupParams>;
};


export type QueryCpFieldsArgs = {
  params?: InputMaybe<CpFieldsParams>;
};


export type QueryCpGetRelationsByEntityArgs = {
  contentId: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
  relatedContentType: Scalars['String']['input'];
};


export type QueryCpProductCategoriesArgs = {
  brandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  meta?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  withChild?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCpProductDetailArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCpProductsArgs = {
  boardId?: InputMaybe<Scalars['String']['input']>;
  branchId?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  brandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  discountConditions?: InputMaybe<Scalars['JSON']['input']>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  excludeTagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  groupedSimilarity?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image?: InputMaybe<Scalars['String']['input']>;
  maxDiscountPercent?: InputMaybe<Scalars['Float']['input']>;
  maxDiscountValue?: InputMaybe<Scalars['Float']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  maxRemainder?: InputMaybe<Scalars['Float']['input']>;
  minDiscountPercent?: InputMaybe<Scalars['Float']['input']>;
  minDiscountValue?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  minRemainder?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  propertiesData?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  segment?: InputMaybe<Scalars['String']['input']>;
  segmentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  similarity?: InputMaybe<Scalars['Boolean']['input']>;
  sortDirection?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagWithRelated?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCpTagsArgs = {
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  includeWorkspaceTags?: InputMaybe<Scalars['Boolean']['input']>;
  instanceId?: InputMaybe<Scalars['String']['input']>;
  isGroup?: InputMaybe<Scalars['Boolean']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCpUnitsArgs = {
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCustomerDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryCustomersArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  autoCompletion?: InputMaybe<Scalars['Boolean']['input']>;
  autoCompletionType?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['Date']['input']>;
  brandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  clientPortalId?: InputMaybe<Scalars['String']['input']>;
  conformityIsRelated?: InputMaybe<Scalars['Boolean']['input']>;
  conformityIsSaved?: InputMaybe<Scalars['Boolean']['input']>;
  conformityMainType?: InputMaybe<Scalars['String']['input']>;
  conformityMainTypeId?: InputMaybe<Scalars['String']['input']>;
  conformityRelType?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  dateFilters?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Cursor_Direction>;
  emailValidationStatus?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  excludeTagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  formIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  integrationIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  integrationTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  leadStatus?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  propertiesData?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  segment?: InputMaybe<Scalars['String']['input']>;
  segmentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sex?: InputMaybe<Scalars['Int']['input']>;
  sortDirection?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Contact_Status>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagWithRelated?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCustomersCountArgs = {
  types?: InputMaybe<Array<InputMaybe<Customer_Relation_Type>>>;
};


export type QueryDepartmentDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryDepartmentsArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyFirstLevel?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  withoutUserFilter?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryDepartmentsMainArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyFirstLevel?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  withoutUserFilter?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryDocumentsArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  dateFilters?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Cursor_Direction>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  subType?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryDocumentsDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryDocumentsGetEditorAttributesArgs = {
  contentType: Scalars['String']['input'];
};


export type QueryDocumentsProcessArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
  config?: InputMaybe<Scalars['JSON']['input']>;
  replacerIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryDocumentsTotalCountArgs = {
  contentType?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEmailAddressesArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lane?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  suppressionReason?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEmailContentPreviewArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  contentFormat?: InputMaybe<Scalars['String']['input']>;
  replacerId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEmailDeliveriesArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  createdAtFrom?: InputMaybe<Scalars['Date']['input']>;
  createdAtTo?: InputMaybe<Scalars['Date']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEmailDeliveryDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryEmailSenderOptionsArgs = {
  scope?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEmailTemplateDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryEmailTemplatesArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEngageBroadcastRecipientsArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  beginDate?: InputMaybe<Scalars['Date']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  runId: Scalars['String']['input'];
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEngageBroadcastRunsArgs = {
  engageMessageId: Scalars['String']['input'];
};


export type QueryEngageBroadcastTracesArgs = {
  engageMessageId: Scalars['String']['input'];
};


export type QueryEngageMembersArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEngageMessageCountsArgs = {
  kind?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEngageMessageDetailArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEngageMessagesArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  brandId?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  fromUserId?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  trigger?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEngageMessagesTotalCountArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  brandId?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  fromUserId?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  trigger?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEngageReportsListArgs = {
  customerId?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEngageScheduleCalendarArgs = {
  brandId?: InputMaybe<Scalars['String']['input']>;
  from: Scalars['Date']['input'];
  fromUserId?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  to: Scalars['Date']['input'];
  trigger?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEngageSchedulePreviewArgs = {
  recurrence: EngageRecurrenceInput;
};


export type QueryEngageSmsDeliveriesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};


export type QueryExportHeadersArgs = {
  entityType: Scalars['String']['input'];
  filters?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryExportHistoriesArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  entityType?: InputMaybe<Scalars['String']['input']>;
  entityTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryExportProgressArgs = {
  exportId: Scalars['String']['input'];
};


export type QueryFieldDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryFieldGroupsArgs = {
  params?: InputMaybe<FieldGroupParams>;
};


export type QueryFieldsArgs = {
  params?: InputMaybe<FieldsParams>;
};


export type QueryFieldsCombinedByContentTypeArgs = {
  config?: InputMaybe<Scalars['JSON']['input']>;
  contentType: Scalars['String']['input'];
  excludedNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  onlyDates?: InputMaybe<Scalars['Boolean']['input']>;
  segmentId?: InputMaybe<Scalars['String']['input']>;
  usageType?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAutomationExecutionDetailArgs = {
  executionId: Scalars['String']['input'];
};


export type QueryGetAutomationWebhookEndpointArgs = {
  _id: Scalars['String']['input'];
  waitEventActionId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetClientPortalArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetClientPortalNotificationsByCpUserIdArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  clientPortalId?: InputMaybe<Scalars['String']['input']>;
  cpUserId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<CpNotificationKind>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  priority?: InputMaybe<CpNotificationPriority>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CpNotificationStatus>;
  type?: InputMaybe<CpNotificationType>;
};


export type QueryGetClientPortalUserArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetClientPortalUsersArgs = {
  filter?: InputMaybe<IClientPortalUserFilter>;
};


export type QueryGetClientPortalsArgs = {
  filter?: InputMaybe<IClientPortalFilter>;
};


export type QueryGetRelationsByEntitiesArgs = {
  contentIds: Array<Scalars['String']['input']>;
  contentTypes: Array<Scalars['String']['input']>;
};


export type QueryGetRelationsByEntityArgs = {
  contentId: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
  relatedContentType: Scalars['String']['input'];
};


export type QueryImportColumnPreviewArgs = {
  entityType: Scalars['String']['input'];
  fileKey: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
};


export type QueryImportExportTypesArgs = {
  operation: ImportExportOperation;
};


export type QueryImportFieldsArgs = {
  entityType: Scalars['String']['input'];
};


export type QueryImportHistoriesArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  entityType?: InputMaybe<Scalars['String']['input']>;
  entityTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryImportProgressArgs = {
  importId: Scalars['String']['input'];
};


export type QueryInternalNoteDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryInternalNotesArgs = {
  contentType: Scalars['String']['input'];
  contentTypeId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryInternalNotesAsLogsArgs = {
  contentTypeId: Scalars['String']['input'];
};


export type QueryInternalNotesByActionArgs = {
  contentType?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  pipelineId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryIsFavoriteArgs = {
  path: Scalars['String']['input'];
};


export type QueryLogDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryLogsMainListArgs = {
  action?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  createdAtFrom?: InputMaybe<Scalars['Date']['input']>;
  createdAtTo?: InputMaybe<Scalars['Date']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  documentId?: InputMaybe<Scalars['String']['input']>;
  excludeIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  filters?: InputMaybe<Scalars['JSON']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryNotificationDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryNotificationsArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  fromUserId?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  module?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  priority?: InputMaybe<NotificationPriority>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<NotificationStatus>;
  type?: InputMaybe<NotificationType>;
};


export type QueryOauthClientAppDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryOauthClientAppsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOauthClientAppsTotalCountArgs = {
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPermissionGroupDetailArgs = {
  id: Scalars['String']['input'];
};


export type QueryPositionDetailArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPositionsArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyFirstLevel?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  withoutUserFilter?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPositionsMainArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyFirstLevel?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductBulkSimilaritiesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductBulkSimilaritiesTotalCountArgs = {
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductBulkSimilarityArgs = {
  _id: Scalars['String']['input'];
};


export type QueryProductCategoriesArgs = {
  brandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  meta?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  withChild?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProductCategoriesTotalCountArgs = {
  brandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  meta?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  withChild?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProductCategoryDetailArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductDetailArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductLastCodeByCategoryArgs = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductPackageDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryProductPackagesArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProductSimilaritiesArgs = {
  _id: Scalars['String']['input'];
  groupedSimilarity?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  boardId?: InputMaybe<Scalars['String']['input']>;
  branchId?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  brandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  discountConditions?: InputMaybe<Scalars['JSON']['input']>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  excludeTagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  groupedSimilarity?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image?: InputMaybe<Scalars['String']['input']>;
  maxDiscountPercent?: InputMaybe<Scalars['Float']['input']>;
  maxDiscountValue?: InputMaybe<Scalars['Float']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  maxRemainder?: InputMaybe<Scalars['Float']['input']>;
  minDiscountPercent?: InputMaybe<Scalars['Float']['input']>;
  minDiscountValue?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  minRemainder?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  propertiesData?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  segment?: InputMaybe<Scalars['String']['input']>;
  segmentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  similarity?: InputMaybe<Scalars['Boolean']['input']>;
  sortDirection?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagWithRelated?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsMainArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  boardId?: InputMaybe<Scalars['String']['input']>;
  branchId?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  brandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Cursor_Direction>;
  discountConditions?: InputMaybe<Scalars['JSON']['input']>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  excludeTagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  groupedSimilarity?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  maxDiscountPercent?: InputMaybe<Scalars['Float']['input']>;
  maxDiscountValue?: InputMaybe<Scalars['Float']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  maxRemainder?: InputMaybe<Scalars['Float']['input']>;
  minDiscountPercent?: InputMaybe<Scalars['Float']['input']>;
  minDiscountValue?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  minRemainder?: InputMaybe<Scalars['Float']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  propertiesData?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  segment?: InputMaybe<Scalars['String']['input']>;
  segmentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  similarity?: InputMaybe<Scalars['Boolean']['input']>;
  sortDirection?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagWithRelated?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsTotalCountArgs = {
  boardId?: InputMaybe<Scalars['String']['input']>;
  branchId?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  brandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  discountConditions?: InputMaybe<Scalars['JSON']['input']>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  excludeTagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  groupedSimilarity?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image?: InputMaybe<Scalars['String']['input']>;
  maxDiscountPercent?: InputMaybe<Scalars['Float']['input']>;
  maxDiscountValue?: InputMaybe<Scalars['Float']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  maxRemainder?: InputMaybe<Scalars['Float']['input']>;
  minDiscountPercent?: InputMaybe<Scalars['Float']['input']>;
  minDiscountValue?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  minRemainder?: InputMaybe<Scalars['Float']['input']>;
  propertiesData?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  segment?: InputMaybe<Scalars['String']['input']>;
  segmentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  similarity?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagWithRelated?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPropertySystemFieldsArgs = {
  contentType: Scalars['String']['input'];
};


export type QueryRecordReferenceFieldsArgs = {
  type: Scalars['String']['input'];
};


export type QueryRecordReferenceResolvePlaceholdersArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
  fallback?: InputMaybe<Scalars['JSON']['input']>;
  targetId?: InputMaybe<Scalars['String']['input']>;
  targetType: Scalars['String']['input'];
  value?: InputMaybe<Scalars['JSON']['input']>;
};


export type QuerySearchArgs = {
  value: Scalars['String']['input'];
};


export type QuerySegmentDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QuerySegmentFieldsArgs = {
  contentType: Scalars['String']['input'];
};


export type QuerySegmentGrowthArgs = {
  days?: InputMaybe<Scalars['Int']['input']>;
  segmentId: Scalars['String']['input'];
};


export type QuerySegmentMemberCountArgs = {
  segmentId: Scalars['String']['input'];
};


export type QuerySegmentMembersArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  segmentId: Scalars['String']['input'];
};


export type QuerySegmentRelationsArgs = {
  subjectType: Scalars['String']['input'];
};


export type QuerySegmentSameDefinitionArgs = {
  contentType: Scalars['String']['input'];
  excludeId?: InputMaybe<Scalars['String']['input']>;
  root: Scalars['JSON']['input'];
};


export type QuerySegmentUsageArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type QuerySegmentsArgs = {
  contentTypes: Array<InputMaybe<Scalars['String']['input']>>;
  excludeIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySegmentsPreviewCountArgs = {
  contentType: Scalars['String']['input'];
  root: Scalars['JSON']['input'];
};


export type QuerySettingsGlobalSearchArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTagDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryTagsArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  includeWorkspaceTags?: InputMaybe<Scalars['Boolean']['input']>;
  instanceId?: InputMaybe<Scalars['String']['input']>;
  isGroup?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTagsMainArgs = {
  excludeWorkspaceTags?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTagsQueryCountArgs = {
  searchValue?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTemplateCategoriesArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  dateFilters?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Cursor_Direction>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  types?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTemplateCategoryArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTemplateDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryTemplateListArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  dateFilters?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Cursor_Direction>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUnitDetailArgs = {
  _id: Scalars['String']['input'];
};


export type QueryUnitsArgs = {
  searchValue?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUnitsMainArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyFirstLevel?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserDetailArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserMovementsArgs = {
  contentType?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  aggregationPipeline?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  branchId?: InputMaybe<Scalars['String']['input']>;
  branchIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  brandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  cursorMode?: InputMaybe<Cursor_Mode>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  departmentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  direction?: InputMaybe<Cursor_Direction>;
  excludeIds?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isAssignee?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  requireUsername?: InputMaybe<Scalars['Boolean']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  segment?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortMode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  unitId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUsersTotalCountArgs = {
  branchId?: InputMaybe<Scalars['String']['input']>;
  branchIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  brandIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  departmentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isAssignee?: InputMaybe<Scalars['Boolean']['input']>;
  requireUsername?: InputMaybe<Scalars['Boolean']['input']>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  segment?: InputMaybe<Scalars['String']['input']>;
  unitId?: InputMaybe<Scalars['String']['input']>;
};

export type RefreshToken = {
  __typename?: 'RefreshToken';
  createdAt?: Maybe<Scalars['Date']['output']>;
  deviceId?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['Date']['output']>;
  ipAddress?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  userAgent?: Maybe<Scalars['String']['output']>;
};

export type Relation = {
  __typename?: 'Relation';
  _id: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  entities: Array<Entity>;
  updatedAt: Scalars['Date']['output'];
};

export type RelationInput = {
  entities: Array<EntityInput>;
};

export type ResetPasswordConfig = {
  __typename?: 'ResetPasswordConfig';
  emailContent?: Maybe<Scalars['String']['output']>;
  emailSubject?: Maybe<Scalars['String']['output']>;
  mode?: Maybe<Scalars['String']['output']>;
};

export type ResetPasswordConfigInput = {
  emailContent?: InputMaybe<Scalars['String']['input']>;
  emailSubject?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
};

export type SmsProvidersConfig = {
  __typename?: 'SMSProvidersConfig';
  callPro?: Maybe<Scalars['JSON']['output']>;
  twilio?: Maybe<Scalars['JSON']['output']>;
};

export type SmsProvidersConfigInput = {
  callPro?: InputMaybe<Scalars['JSON']['input']>;
  twilio?: InputMaybe<Scalars['JSON']['input']>;
};

export type SecurityAuthConfig = {
  __typename?: 'SecurityAuthConfig';
  multiFactorConfig?: Maybe<MultiFactorConfig>;
  otpConfig?: Maybe<OtpConfig>;
  otpResendConfig?: Maybe<OtpResendConfig>;
  resetPasswordConfig?: Maybe<ResetPasswordConfig>;
};

export type SecurityAuthConfigInput = {
  multiFactorConfig?: InputMaybe<MultiFactorConfigInput>;
  otpConfig?: InputMaybe<OtpConfigInput>;
  otpResendConfig?: InputMaybe<OtpResendConfigInput>;
  resetPasswordConfig?: InputMaybe<ResetPasswordConfigInput>;
};

export type Segment = {
  __typename?: 'Segment';
  _id: Scalars['ID']['output'];
  buildCancelRequested?: Maybe<Scalars['Boolean']['output']>;
  buildProcessed?: Maybe<Scalars['Int']['output']>;
  /** Set only while a rebuild is running. There is no total to compare to. */
  buildStartedAt?: Maybe<Scalars['Date']['output']>;
  buildTotal?: Maybe<Scalars['Int']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  contentType: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /**
   * How many records the segmentation worker last settled as members. Absent
   * until it has run, which is not the same as a count of zero.
   */
  membersCount?: Maybe<Scalars['Int']['output']>;
  membersCountedAt?: Maybe<Scalars['Date']['output']>;
  /** Absent only while a feature owns the segment. */
  name?: Maybe<Scalars['String']['output']>;
  /**
   * The feature this segment belongs to, when it is not the organization's
   * own. Owned segments are never listed or materialised, and are removed with
   * whatever created them. Naming one promotes it to an ordinary segment.
   */
  ownedBy?: Maybe<Scalars['String']['output']>;
  ownerId: Scalars['String']['output'];
  revision: Scalars['Int']['output'];
  /** The condition tree. See SegmentNode in erxes-api-shared. */
  root: Scalars['JSON']['output'];
  status: SegmentStatus;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  visibility: SegmentVisibility;
};

/** One day of a segment's life: where it ended, and what moved it there. */
export type SegmentDay = {
  __typename?: 'SegmentDay';
  /** Start of the bucket this point covers - hourly on a short window. */
  at?: Maybe<Scalars['Date']['output']>;
  /** Closing membership. Absent on days the worker never settled it. */
  count?: Maybe<Scalars['Int']['output']>;
  date: Scalars['String']['output'];
  joined: Scalars['Int']['output'];
  left: Scalars['Int']['output'];
};

export type SegmentField = {
  __typename?: 'SegmentField';
  component?: Maybe<Scalars['String']['output']>;
  input: Scalars['String']['output'];
  key: Scalars['String']['output'];
  kind: Scalars['String']['output'];
  label: Scalars['String']['output'];
  operators: Array<SegmentOperator>;
  options?: Maybe<Scalars['JSON']['output']>;
  query?: Maybe<Scalars['JSON']['output']>;
  source?: Maybe<Scalars['String']['output']>;
};

export type SegmentMemberCount = {
  __typename?: 'SegmentMemberCount';
  count: Scalars['Int']['output'];
  /** The count gave up before finishing, so the number is not the answer. */
  exceeded?: Maybe<Scalars['Boolean']['output']>;
  /** Parts of the tree the query could not express, so the count is narrower. */
  unsupported?: Maybe<Array<Scalars['String']['output']>>;
};

export type SegmentMemberPage = {
  __typename?: 'SegmentMemberPage';
  ids: Array<Scalars['String']['output']>;
  nextCursor?: Maybe<Scalars['String']['output']>;
  unsupported?: Maybe<Array<Scalars['String']['output']>>;
};

export type SegmentOperator = {
  __typename?: 'SegmentOperator';
  /** Shown under the row where the label alone would be read wrong. */
  hint?: Maybe<Scalars['String']['output']>;
  /** What the operator needs from the user: none, field or number. */
  input: Scalars['String']['output'];
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type SegmentRelation = {
  __typename?: 'SegmentRelation';
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  /** Operators a count or sum of this relation is compared with. */
  measureOperators: Array<SegmentOperator>;
  relatedType: Scalars['String']['output'];
  subjectType: Scalars['String']['output'];
};

export enum SegmentStatus {
  Active = 'active',
  Building = 'building',
  Cancelled = 'cancelled',
  Draft = 'draft',
  Failed = 'failed'
}

export type SegmentUsage = {
  __typename?: 'SegmentUsage';
  automations: Array<SegmentUsageAutomation>;
  segmentId: Scalars['String']['output'];
  segments: Array<SegmentUsageSegment>;
};

export type SegmentUsageAutomation = {
  __typename?: 'SegmentUsageAutomation';
  _id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type SegmentUsageSegment = {
  __typename?: 'SegmentUsageSegment';
  _id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export enum SegmentVisibility {
  Organization = 'organization',
  Private = 'private'
}

export type SettingsGlobalSearchResult = {
  __typename?: 'SettingsGlobalSearchResult';
  list?: Maybe<Array<Maybe<GlobalSearchResultItem>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SmsDelivery = {
  __typename?: 'SmsDelivery';
  _id: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  conversationId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  direction?: Maybe<Scalars['String']['output']>;
  engageMessageId?: Maybe<Scalars['String']['output']>;
  errorMessages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  erxesApiId?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  integrationId?: Maybe<Scalars['String']['output']>;
  requestData?: Maybe<Scalars['String']['output']>;
  responseData?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  statusUpdates?: Maybe<Array<Maybe<SmsStatus>>>;
  telnyxId?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};

export type SmsStatus = {
  __typename?: 'SmsStatus';
  date?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export enum SocialAuthProvider {
  Apple = 'APPLE',
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE'
}

export type SocialAuthProviderInfo = {
  __typename?: 'SocialAuthProviderInfo';
  email?: Maybe<Scalars['String']['output']>;
  linkedAt?: Maybe<Scalars['Date']['output']>;
  provider?: Maybe<SocialAuthProvider>;
  providerId?: Maybe<Scalars['String']['output']>;
};

export type SocialpayConfig = {
  __typename?: 'SocialpayConfig';
  certId?: Maybe<Scalars['String']['output']>;
  enableSocialpay?: Maybe<Scalars['Boolean']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
};

export type SocialpayConfigInput = {
  certId?: InputMaybe<Scalars['String']['input']>;
  enableSocialpay?: InputMaybe<Scalars['Boolean']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
};

export type SomeType = {
  __typename?: 'SomeType';
  visibility?: Maybe<CacheControlScope>;
};

export type Structure = {
  __typename?: 'Structure';
  _id: Scalars['String']['output'];
  code?: Maybe<Scalars['String']['output']>;
  coordinate?: Maybe<Coordinate>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Attachment>;
  links?: Maybe<Scalars['JSON']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  supervisor?: Maybe<User>;
  supervisorId?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SuccessResult = {
  __typename?: 'SuccessResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Tag = {
  __typename?: 'Tag';
  _id?: Maybe<Scalars['String']['output']>;
  colorCode?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  isGroup?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  objectCount?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['String']['output']>;
  relatedIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  totalObjectCount?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type TagsListResponse = {
  __typename?: 'TagsListResponse';
  list?: Maybe<Array<Maybe<Tag>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Template = {
  __typename?: 'Template';
  _id: Scalars['String']['output'];
  categories?: Maybe<Array<Maybe<TemplateCategory>>>;
  categoryIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  content?: Maybe<Scalars['JSON']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  updatedBy?: Maybe<User>;
};

export type TemplateCategory = {
  __typename?: 'TemplateCategory';
  _id?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  isRoot?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<TemplateCategory>;
  parentId?: Maybe<Scalars['String']['output']>;
  templateCount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  updatedBy?: Maybe<User>;
};

export type TemplateCategoryListResponse = {
  __typename?: 'TemplateCategoryListResponse';
  list?: Maybe<Array<Maybe<TemplateCategory>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type TemplateListResponse = {
  __typename?: 'TemplateListResponse';
  list?: Maybe<Array<Maybe<Template>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type TestUser = {
  __typename?: 'TestUser';
  email?: Maybe<Scalars['String']['output']>;
  enableTestUser?: Maybe<Scalars['Boolean']['output']>;
  otp?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type TestUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  enableTestUser?: InputMaybe<Scalars['Boolean']['input']>;
  otp?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export enum TimelyType {
  Daily = 'daily',
  Monthly = 'monthly',
  Seasonally = 'seasonally',
  Weekly = 'weekly'
}

export enum TokenDeliveryMethod {
  Cookie = 'cookie',
  Header = 'header'
}

export type TokiConfig = {
  __typename?: 'TokiConfig';
  apiKey?: Maybe<Scalars['String']['output']>;
  enableToki?: Maybe<Scalars['Boolean']['output']>;
  merchantId?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  production?: Maybe<Scalars['Boolean']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type TokiConfigInput = {
  apiKey?: InputMaybe<Scalars['String']['input']>;
  enableToki?: InputMaybe<Scalars['Boolean']['input']>;
  merchantId?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  production?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Trigger = {
  __typename?: 'Trigger';
  actionId?: Maybe<Scalars['String']['output']>;
  config?: Maybe<Scalars['JSON']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isCustom?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['JSON']['output']>;
  style?: Maybe<Scalars['JSON']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  workflowId?: Maybe<Scalars['String']['output']>;
};

export type TriggerInput = {
  actionId?: InputMaybe<Scalars['String']['input']>;
  config?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isCustom?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['JSON']['input']>;
  style?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  workflowId?: InputMaybe<Scalars['String']['input']>;
};

export type TwoFactorConfig = {
  __typename?: 'TwoFactorConfig';
  codeLength?: Maybe<Scalars['Int']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  emailSubject?: Maybe<Scalars['String']['output']>;
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  messageTemplate?: Maybe<Scalars['String']['output']>;
  smsProvider?: Maybe<Scalars['String']['output']>;
};

export type TwoFactorConfigInput = {
  codeLength?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  emailSubject?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  messageTemplate?: InputMaybe<Scalars['String']['input']>;
  smsProvider?: InputMaybe<Scalars['String']['input']>;
};

export type Unit = {
  __typename?: 'Unit';
  _id: Scalars['String']['output'];
  code?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Department>;
  departmentId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  supervisor?: Maybe<User>;
  supervisorId?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userCount?: Maybe<Scalars['Int']['output']>;
  userIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type UnitListQueryResponse = {
  __typename?: 'UnitListQueryResponse';
  list?: Maybe<Array<Maybe<Unit>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Uom = {
  __typename?: 'Uom';
  _id: Scalars['String']['output'];
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  isForSubscription?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  subscriptionConfig?: Maybe<Scalars['JSON']['output']>;
  timely?: Maybe<TimelyType>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']['output']>;
  branchIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  branches?: Maybe<Array<Maybe<Branch>>>;
  brandIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  brands?: Maybe<Array<Maybe<Brand>>>;
  chatStatus?: Maybe<UserChatStatus>;
  configs?: Maybe<Scalars['JSON']['output']>;
  configsConstants?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  currentOrganization?: Maybe<Organization>;
  cursor?: Maybe<Scalars['String']['output']>;
  customPermissions?: Maybe<Array<Maybe<CustomPermission>>>;
  department?: Maybe<Department>;
  departmentIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  departments?: Maybe<Array<Maybe<Department>>>;
  details?: Maybe<UserDetailsType>;
  email?: Maybe<Scalars['String']['output']>;
  emailSignatures?: Maybe<Scalars['JSON']['output']>;
  employeeId?: Maybe<Scalars['String']['output']>;
  getNotificationByEmail?: Maybe<Scalars['Boolean']['output']>;
  groupIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isOnboarded?: Maybe<Scalars['Boolean']['output']>;
  isOwner?: Maybe<Scalars['Boolean']['output']>;
  isShowNotification?: Maybe<Scalars['Boolean']['output']>;
  isSubscribed?: Maybe<Scalars['String']['output']>;
  leaderBoardPosition?: Maybe<Scalars['Int']['output']>;
  links?: Maybe<Scalars['JSON']['output']>;
  onboardedPlugins?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  organizations?: Maybe<Array<Maybe<CookieOrganization>>>;
  permissionGroupIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  positionIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  positions?: Maybe<Array<Maybe<Position>>>;
  propertiesData?: Maybe<Scalars['JSON']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  unitId?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export enum UserChatStatus {
  Offline = 'offline',
  Online = 'online'
}

export type UserDetails = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['Date']['input']>;
  coverPhoto?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  employeeId?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  operatorPhone?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  shortName?: InputMaybe<Scalars['String']['input']>;
  workStartedDate?: InputMaybe<Scalars['Date']['input']>;
};

export type UserDetailsType = {
  __typename?: 'UserDetailsType';
  avatar?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['Date']['output']>;
  coverPhoto?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  employeeId?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  operatorPhone?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  shortName?: Maybe<Scalars['String']['output']>;
  workStartedDate?: Maybe<Scalars['Date']['output']>;
};

export type UserMovement = {
  __typename?: 'UserMovement';
  _id?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  contentTypeDetail?: Maybe<Scalars['JSON']['output']>;
  contentTypeId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  createdByDetail?: Maybe<Scalars['JSON']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  userDetail?: Maybe<Scalars['JSON']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserPermission = {
  __typename?: 'UserPermission';
  actions: Array<Maybe<Scalars['String']['output']>>;
  module: Scalars['String']['output'];
  plugin?: Maybe<Scalars['String']['output']>;
  scope: Scalars['String']['output'];
};

export type UsersListResponse = {
  __typename?: 'UsersListResponse';
  list?: Maybe<Array<Maybe<User>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type VerificationRequest = {
  __typename?: 'VerificationRequest';
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  description?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  verifiedBy?: Maybe<Scalars['String']['output']>;
};

export type Workflow = {
  __typename?: 'Workflow';
  actions?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  automationId?: Maybe<Scalars['String']['output']>;
  config?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nextActionId?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['JSON']['output']>;
  templateId?: Maybe<Scalars['String']['output']>;
};

export type WorkflowInput = {
  actions?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  automationId?: InputMaybe<Scalars['String']['input']>;
  config?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nextActionId?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['JSON']['input']>;
  templateId?: InputMaybe<Scalars['String']['input']>;
};

export type AutomationsTotalCountResponse = {
  __typename?: 'automationsTotalCountResponse';
  byStatus?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of federation types */
export type FederationTypes = ResolversObject<{
  Branch: Branch;
  Brand: Brand;
  BundleCondition: BundleCondition;
  BundleRule: BundleRule;
  Company: Company;
  Customer: Customer;
  Department: Department;
  Position: Position;
  Product: Product;
  ProductCategory: ProductCategory;
  ProductsConfig: ProductsConfig;
  Segment: Segment;
  Tag: Tag;
  Unit: Unit;
  User: User;
}>;

/** Mapping of federation reference types */
export type FederationReferenceTypes = ResolversObject<{
  Branch:
    ( { __typename: 'Branch' }
    & GraphQLRecursivePick<FederationTypes['Branch'], {"_id":true}> );
  Brand:
    ( { __typename: 'Brand' }
    & GraphQLRecursivePick<FederationTypes['Brand'], {"_id":true}> );
  BundleCondition:
    ( { __typename: 'BundleCondition' }
    & GraphQLRecursivePick<FederationTypes['BundleCondition'], {"_id":true}> );
  BundleRule:
    ( { __typename: 'BundleRule' }
    & GraphQLRecursivePick<FederationTypes['BundleRule'], {"_id":true}> );
  Company:
    ( { __typename: 'Company' }
    & GraphQLRecursivePick<FederationTypes['Company'], {"_id":true}> );
  Customer:
    ( { __typename: 'Customer' }
    & GraphQLRecursivePick<FederationTypes['Customer'], {"_id":true}> );
  Department:
    ( { __typename: 'Department' }
    & GraphQLRecursivePick<FederationTypes['Department'], {"_id":true}> );
  Position:
    ( { __typename: 'Position' }
    & GraphQLRecursivePick<FederationTypes['Position'], {"_id":true}> );
  Product:
    ( { __typename: 'Product' }
    & GraphQLRecursivePick<FederationTypes['Product'], {"_id":true}> );
  ProductCategory:
    ( { __typename: 'ProductCategory' }
    & GraphQLRecursivePick<FederationTypes['ProductCategory'], {"_id":true}> );
  ProductsConfig:
    ( { __typename: 'ProductsConfig' }
    & GraphQLRecursivePick<FederationTypes['ProductsConfig'], {"_id":true}> );
  Segment:
    ( { __typename: 'Segment' }
    & GraphQLRecursivePick<FederationTypes['Segment'], {"_id":true}> );
  Tag:
    ( { __typename: 'Tag' }
    & GraphQLRecursivePick<FederationTypes['Tag'], {"_id":true}> );
  Unit:
    ( { __typename: 'Unit' }
    & GraphQLRecursivePick<FederationTypes['Unit'], {"_id":true}> );
  User:
    ( { __typename: 'User' }
    & GraphQLRecursivePick<FederationTypes['User'], {"_id":true}> );
}>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Action: ResolverTypeWrapper<Action>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ActionCode: ResolverTypeWrapper<ActionCode>;
  ActionCodeType: ActionCodeType;
  ActionInput: ActionInput;
  ActivityLog: ResolverTypeWrapper<IActivityLogDocument>;
  ActivityLogsList: ResolverTypeWrapper<Omit<ActivityLogsList, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['ActivityLog']>>> }>;
  AiAgentHealth: ResolverTypeWrapper<AiAgentHealth>;
  App: ResolverTypeWrapper<IAppDocument>;
  ApprovalChange: ResolverTypeWrapper<ApprovalChange>;
  ApprovalChangeInput: ApprovalChangeInput;
  ApprovalContentMeta: ResolverTypeWrapper<ApprovalContentMeta>;
  ApprovalDecision: ResolverTypeWrapper<ApprovalDecision>;
  ApprovalLock: ResolverTypeWrapper<IApprovalLockDocument>;
  ApprovalLockCreateInput: ApprovalLockCreateInput;
  ApprovalLockState: ResolverTypeWrapper<Omit<ApprovalLockState, 'lock' | 'pendingRequest'> & { lock?: Maybe<ResolversTypes['ApprovalLock']>, pendingRequest?: Maybe<ResolversTypes['ApprovalRequest']> }>;
  ApprovalRequest: ResolverTypeWrapper<IApprovalRequestDocument>;
  ApprovalRequestCreateInput: ApprovalRequestCreateInput;
  ApprovalRequestsList: ResolverTypeWrapper<Omit<ApprovalRequestsList, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['ApprovalRequest']>>> }>;
  Attachment: ResolverTypeWrapper<Attachment>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  AttachmentInput: AttachmentInput;
  Auth: ResolverTypeWrapper<Auth>;
  AuthConfig: ResolverTypeWrapper<AuthConfig>;
  AuthConfigInput: AuthConfigInput;
  AuthInput: AuthInput;
  AuthMethod: AuthMethod;
  AuthTokenResponse: ResolverTypeWrapper<Omit<AuthTokenResponse, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  Automation: ResolverTypeWrapper<IAutomationDocument>;
  AutomationHistories: ResolverTypeWrapper<Omit<AutomationHistories, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['AutomationHistory']>>> }>;
  AutomationHistory: ResolverTypeWrapper<IAutomationExecutionDocument>;
  AutomationNote: ResolverTypeWrapper<AutomationNote>;
  AutomationStats: ResolverTypeWrapper<AutomationStats>;
  AutomationStatsBucket: ResolverTypeWrapper<AutomationStatsBucket>;
  AutomationStatsCount: ResolverTypeWrapper<AutomationStatsCount>;
  AutomationStatsErrorMessage: ResolverTypeWrapper<AutomationStatsErrorMessage>;
  AutomationStatsNode: ResolverTypeWrapper<AutomationStatsNode>;
  AutomationWorkflowTemplate: ResolverTypeWrapper<IAutomationWorkflowTemplateDocument>;
  AutomationsListResponse: ResolverTypeWrapper<Omit<AutomationsListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Automation']>>> }>;
  AvgEmailStats: ResolverTypeWrapper<AvgEmailStats>;
  Branch: ResolverTypeWrapper<IBranchDocument>;
  BranchesListResponse: ResolverTypeWrapper<Omit<BranchesListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Branch']>>> }>;
  Brand: ResolverTypeWrapper<IBrandDocument>;
  BrandListResponse: ResolverTypeWrapper<Omit<BrandListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Brand']>>> }>;
  BroadcastEmailDryRun: ResolverTypeWrapper<BroadcastEmailDryRun>;
  BroadcastEmailFieldCoverage: ResolverTypeWrapper<BroadcastEmailFieldCoverage>;
  BroadcastRecipient: ResolverTypeWrapper<IBroadcastRecipientDocument>;
  BroadcastRecipientEmail: ResolverTypeWrapper<BroadcastRecipientEmail>;
  BroadcastRecipientEmailEvent: ResolverTypeWrapper<BroadcastRecipientEmailEvent>;
  BroadcastRecipientListResponse: ResolverTypeWrapper<Omit<BroadcastRecipientListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['BroadcastRecipient']>>> }>;
  BroadcastRun: ResolverTypeWrapper<IBroadcastRunDocument>;
  BroadcastTrace: ResolverTypeWrapper<IBroadcastTraceDocument>;
  BundleCondition: ResolverTypeWrapper<IBundleConditionDocument>;
  BundleRule: ResolverTypeWrapper<IBundleRuleDocument>;
  BundleRuleItem: ResolverTypeWrapper<Omit<BundleRuleItem, 'products'> & { products?: Maybe<Array<Maybe<ResolversTypes['Product']>>> }>;
  BundleRuleItemInput: BundleRuleItemInput;
  CONTACT_STATUS: Contact_Status;
  CPComment: ResolverTypeWrapper<ICPCommentDocument>;
  CPCommentFilter: CpCommentFilter;
  CPCommentInput: CpCommentInput;
  CPCommentListResponse: ResolverTypeWrapper<Omit<CpCommentListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['CPComment']>>> }>;
  CPCommentUpdateInput: CpCommentUpdateInput;
  CPCommentUserType: CpCommentUserType;
  CPExamplePost: ResolverTypeWrapper<CpExamplePost>;
  CPNotification: ResolverTypeWrapper<ICPNotificationDocument>;
  CPNotificationFilters: CpNotificationFilters;
  CPNotificationKind: CpNotificationKind;
  CPNotificationListResponse: ResolverTypeWrapper<Omit<CpNotificationListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['CPNotification']>>> }>;
  CPNotificationPriority: CpNotificationPriority;
  CPNotificationResult: ResolverTypeWrapper<CpNotificationResult>;
  CPNotificationSendInput: CpNotificationSendInput;
  CPNotificationStatus: CpNotificationStatus;
  CPNotificationType: CpNotificationType;
  CPUnit: ResolverTypeWrapper<CpUnit>;
  CPUnitDepartment: ResolverTypeWrapper<CpUnitDepartment>;
  CPUnitUser: ResolverTypeWrapper<CpUnitUser>;
  CPUnitUserDetails: ResolverTypeWrapper<CpUnitUserDetails>;
  CPUser: ResolverTypeWrapper<ICPUserDocument>;
  CPUserListResponse: ResolverTypeWrapper<Omit<CpUserListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['CPUser']>>> }>;
  CPUserRemoveResponse: ResolverTypeWrapper<CpUserRemoveResponse>;
  CPUserType: CpUserType;
  CURSOR_DIRECTION: Cursor_Direction;
  CURSOR_MODE: Cursor_Mode;
  CUSTOMER_RELATION_TYPE: Customer_Relation_Type;
  CacheControlScope: CacheControlScope;
  ClientPortal: ResolverTypeWrapper<IClientPortalDocument>;
  ClientPortalConfigInput: ClientPortalConfigInput;
  ClientPortalListResponse: ResolverTypeWrapper<Omit<ClientPortalListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['ClientPortal']>>> }>;
  CompaniesListResponse: ResolverTypeWrapper<Omit<CompaniesListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Company']>>> }>;
  Company: ResolverTypeWrapper<ICompanyDocument>;
  Config: ResolverTypeWrapper<IConfigDocument>;
  Conformity: ResolverTypeWrapper<IConformityDocument>;
  CookieOrganization: ResolverTypeWrapper<CookieOrganization>;
  Coordinate: ResolverTypeWrapper<Coordinate>;
  CoordinateInput: CoordinateInput;
  CoreModulesGlobalSearchResult: ResolverTypeWrapper<CoreModulesGlobalSearchResult>;
  CpFieldGroupParams: CpFieldGroupParams;
  CpFieldsParams: CpFieldsParams;
  CurrentUserPermissionsResult: ResolverTypeWrapper<CurrentUserPermissionsResult>;
  CustomPermission: ResolverTypeWrapper<CustomPermission>;
  Customer: ResolverTypeWrapper<ICustomerDocument>;
  CustomersListResponse: ResolverTypeWrapper<Omit<CustomersListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Customer']>>> }>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DefaultPermissionGroup: ResolverTypeWrapper<Omit<DefaultPermissionGroup, 'members'> & { members?: Maybe<Array<Maybe<ResolversTypes['User']>>> }>;
  DeliveryList: ResolverTypeWrapper<Omit<DeliveryList, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['SmsDelivery']>>> }>;
  DeliveryReport: ResolverTypeWrapper<IDeliveryReportsDocument>;
  Department: ResolverTypeWrapper<IDepartmentDocument>;
  DepartmentsListResponse: ResolverTypeWrapper<Omit<DepartmentsListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Department']>>> }>;
  Document: ResolverTypeWrapper<IDocumentDocument>;
  DocumentEditorAttribute: ResolverTypeWrapper<DocumentEditorAttribute>;
  DocumentListResponse: ResolverTypeWrapper<Omit<DocumentListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Document']>>> }>;
  DocumentsTypes: ResolverTypeWrapper<DocumentsTypes>;
  ENV: ResolverTypeWrapper<Env>;
  EmailAddress: ResolverTypeWrapper<IEmailAddressDocument>;
  EmailAddressesList: ResolverTypeWrapper<Omit<EmailAddressesList, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['EmailAddress']>>> }>;
  EmailDeliveriesList: ResolverTypeWrapper<Omit<EmailDeliveriesList, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['EmailDelivery']>>> }>;
  EmailDelivery: ResolverTypeWrapper<IEmailDeliveryDocument>;
  EmailRampStatus: ResolverTypeWrapper<EmailRampStatus>;
  EmailSender: ResolverTypeWrapper<IEmailSenderDocument>;
  EmailSenderOptions: ResolverTypeWrapper<Omit<EmailSenderOptions, 'senders'> & { senders?: Maybe<Array<Maybe<ResolversTypes['EmailSender']>>> }>;
  EmailSignature: EmailSignature;
  EmailTemplate: ResolverTypeWrapper<IEmailTemplateDocument>;
  EmailTemplatesListResponse: ResolverTypeWrapper<Omit<EmailTemplatesListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['EmailTemplate']>>> }>;
  EngageCalendarEntry: ResolverTypeWrapper<EngageCalendarEntry>;
  EngageDeliveryReport: ResolverTypeWrapper<Omit<EngageDeliveryReport, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['DeliveryReport']>>> }>;
  EngageMemberListResponse: ResolverTypeWrapper<Omit<EngageMemberListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['User']>>> }>;
  EngageMessage: ResolverTypeWrapper<IEngageMessageDocument>;
  EngageMessageEmail: EngageMessageEmail;
  EngageMessageListResponse: ResolverTypeWrapper<Omit<EngageMessageListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['EngageMessage']>>> }>;
  EngageMessageMessenger: EngageMessageMessenger;
  EngageMessageNotification: EngageMessageNotification;
  EngageMessageSms: ResolverTypeWrapper<EngageMessageSms>;
  EngageMessageSmsInput: EngageMessageSmsInput;
  EngageRecurrenceInput: EngageRecurrenceInput;
  EngageScheduleDate: ResolverTypeWrapper<EngageScheduleDate>;
  EngageScheduleDateInput: EngageScheduleDateInput;
  Entity: ResolverTypeWrapper<Entity>;
  EntityInput: EntityInput;
  Export: ResolverTypeWrapper<IExportDocument>;
  ExportHeader: ResolverTypeWrapper<ExportHeader>;
  ExportHistoryList: ResolverTypeWrapper<Omit<ExportHistoryList, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Export']>>> }>;
  FacebookOAuthConfig: ResolverTypeWrapper<FacebookOAuthConfig>;
  FacebookOAuthConfigInput: FacebookOAuthConfigInput;
  Favorite: ResolverTypeWrapper<IFavoritesDocument>;
  FcmDevice: ResolverTypeWrapper<FcmDevice>;
  FcmPlatform: FcmPlatform;
  Field: ResolverTypeWrapper<IFieldDocument>;
  FieldGroup: ResolverTypeWrapper<IFieldGroupDocument>;
  FieldGroupListResponse: ResolverTypeWrapper<Omit<FieldGroupListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['FieldGroup']>>> }>;
  FieldGroupOrderItem: FieldGroupOrderItem;
  FieldGroupParams: FieldGroupParams;
  FieldListResponse: ResolverTypeWrapper<Omit<FieldListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Field']>>> }>;
  FieldOption: ResolverTypeWrapper<FieldOption>;
  FieldOptionInput: FieldOptionInput;
  FieldsParams: FieldsParams;
  FileUploadServiceInfo: ResolverTypeWrapper<FileUploadServiceInfo>;
  FirebaseConfig: ResolverTypeWrapper<FirebaseConfig>;
  FirebaseConfigInput: FirebaseConfigInput;
  GlobalSearchResultItem: ResolverTypeWrapper<GlobalSearchResultItem>;
  GoogleOAuthConfig: ResolverTypeWrapper<GoogleOAuthConfig>;
  GoogleOAuthConfigInput: GoogleOAuthConfigInput;
  IClientPortalFilter: IClientPortalFilter;
  IClientPortalUserFilter: IClientPortalUserFilter;
  Import: ResolverTypeWrapper<IImportDocument>;
  ImportColumnMapping: ResolverTypeWrapper<ImportColumnMapping>;
  ImportColumnMappingInput: ImportColumnMappingInput;
  ImportColumnPreview: ResolverTypeWrapper<ImportColumnPreview>;
  ImportExportOperation: ImportExportOperation;
  ImportExportType: ResolverTypeWrapper<ImportExportType>;
  ImportHistoryList: ResolverTypeWrapper<Omit<ImportHistoryList, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Import']>>> }>;
  ImportPreviewColumn: ResolverTypeWrapper<ImportPreviewColumn>;
  ImportPreviewField: ResolverTypeWrapper<ImportPreviewField>;
  InputRule: InputRule;
  InternalNote: ResolverTypeWrapper<IInternalNoteDocument>;
  InternalNotesByAction: ResolverTypeWrapper<InternalNotesByAction>;
  InvitationEntry: InvitationEntry;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Log: ResolverTypeWrapper<ILogDocument>;
  LogContentType: ResolverTypeWrapper<LogContentType>;
  MailConfig: ResolverTypeWrapper<MailConfig>;
  MailConfigInput: MailConfigInput;
  MainLogsList: ResolverTypeWrapper<Omit<MainLogsList, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Log']>>> }>;
  ManualVerificationConfig: ResolverTypeWrapper<ManualVerificationConfig>;
  ManualVerificationConfigInput: ManualVerificationConfigInput;
  ModifiedNote: ResolverTypeWrapper<ModifiedNote>;
  MultiFactorConfig: ResolverTypeWrapper<MultiFactorConfig>;
  MultiFactorConfigInput: MultiFactorConfigInput;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  NoteInput: NoteInput;
  Notification: ResolverTypeWrapper<INotificationDocument>;
  NotificationConfig: ResolverTypeWrapper<NotificationConfig>;
  NotificationConfigListResponse: ResolverTypeWrapper<NotificationConfigListResponse>;
  NotificationFilters: NotificationFilters;
  NotificationModule: ResolverTypeWrapper<NotificationModule>;
  NotificationModuleEvent: ResolverTypeWrapper<NotificationModuleEvent>;
  NotificationPluginType: ResolverTypeWrapper<NotificationPluginType>;
  NotificationPriority: NotificationPriority;
  NotificationSettings: ResolverTypeWrapper<NotificationSettings>;
  NotificationSettingsChannelInput: NotificationSettingsChannelInput;
  NotificationSettingsEventInput: NotificationSettingsEventInput;
  NotificationStatus: NotificationStatus;
  NotificationType: NotificationType;
  NotificationsList: ResolverTypeWrapper<Omit<NotificationsList, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Notification']>>> }>;
  OAuthClientAccessTokenLifetime: OAuthClientAccessTokenLifetime;
  OAuthClientApp: ResolverTypeWrapper<IOAuthClientAppDocument>;
  OAuthClientAppStatus: OAuthClientAppStatus;
  OAuthClientAppType: OAuthClientAppType;
  OTPConfig: ResolverTypeWrapper<OtpConfig>;
  OTPConfigInput: OtpConfigInput;
  OTPEmailConfig: ResolverTypeWrapper<OtpEmailConfig>;
  OTPEmailConfigInput: OtpEmailConfigInput;
  OTPResendConfig: ResolverTypeWrapper<OtpResendConfig>;
  OTPResendConfigInput: OtpResendConfigInput;
  OTPSMSConfig: ResolverTypeWrapper<OtpsmsConfig>;
  OTPSMSConfigInput: OtpsmsConfigInput;
  Organization: ResolverTypeWrapper<Organization>;
  PackageProduct: ResolverTypeWrapper<Omit<PackageProduct, 'product'> & { product?: Maybe<ResolversTypes['Product']> }>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PasswordVerificationConfig: ResolverTypeWrapper<PasswordVerificationConfig>;
  PasswordVerificationConfigInput: PasswordVerificationConfigInput;
  PdfAttachment: ResolverTypeWrapper<PdfAttachment>;
  PdfAttachmentInput: PdfAttachmentInput;
  PermissionAction: ResolverTypeWrapper<PermissionAction>;
  PermissionGroup: ResolverTypeWrapper<IPermissionGroupDocument>;
  PermissionGroupPermission: ResolverTypeWrapper<PermissionGroupPermission>;
  PermissionInput: PermissionInput;
  PermissionModule: ResolverTypeWrapper<PermissionModule>;
  PermissionModulesByPlugin: ResolverTypeWrapper<PermissionModulesByPlugin>;
  PermissionScopeDescription: ResolverTypeWrapper<PermissionScopeDescription>;
  Position: ResolverTypeWrapper<IPositionDocument>;
  PositionListQueryResponse: ResolverTypeWrapper<Omit<PositionListQueryResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Position']>>> }>;
  PriceType: PriceType;
  Product: ResolverTypeWrapper<IProductDocument>;
  ProductBulkSimilarity: ResolverTypeWrapper<Omit<ProductBulkSimilarity, 'products'> & { products?: Maybe<Array<Maybe<ResolversTypes['Product']>>> }>;
  ProductCategory: ResolverTypeWrapper<IProductCategoryDocument>;
  ProductDurationType: ProductDurationType;
  ProductPackage: ResolverTypeWrapper<IPackageDocument>;
  ProductPackageInput: ProductPackageInput;
  ProductPackagesListResponse: ResolverTypeWrapper<Omit<ProductPackagesListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['ProductPackage']>>> }>;
  ProductRule: ResolverTypeWrapper<IProductRuleDocument>;
  ProductRulesCount: ResolverTypeWrapper<Omit<ProductRulesCount, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['ProductRule']>>> }>;
  ProductSimilarity: ResolverTypeWrapper<IProductSimilarityDocument>;
  ProductSimilarityField: ResolverTypeWrapper<ProductSimilarityField>;
  ProductSimilarityGroup: ResolverTypeWrapper<ProductSimilarityGroup>;
  ProductsConfig: ResolverTypeWrapper<IProductsConfigDocument>;
  ProductsListResponse: ResolverTypeWrapper<Omit<ProductsListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Product']>>> }>;
  PropertySystemField: ResolverTypeWrapper<ISystemFieldSettingDocument>;
  PropertySystemFieldLogicInput: PropertySystemFieldLogicInput;
  PropertyType: ResolverTypeWrapper<PropertyType>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RefreshToken: ResolverTypeWrapper<RefreshToken>;
  Relation: ResolverTypeWrapper<IRelationDocument>;
  RelationInput: RelationInput;
  ResetPasswordConfig: ResolverTypeWrapper<ResetPasswordConfig>;
  ResetPasswordConfigInput: ResetPasswordConfigInput;
  SMSProvidersConfig: ResolverTypeWrapper<SmsProvidersConfig>;
  SMSProvidersConfigInput: SmsProvidersConfigInput;
  SecurityAuthConfig: ResolverTypeWrapper<SecurityAuthConfig>;
  SecurityAuthConfigInput: SecurityAuthConfigInput;
  Segment: ResolverTypeWrapper<ISegmentDocument>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  SegmentDay: ResolverTypeWrapper<SegmentDay>;
  SegmentField: ResolverTypeWrapper<SegmentField>;
  SegmentMemberCount: ResolverTypeWrapper<SegmentMemberCount>;
  SegmentMemberPage: ResolverTypeWrapper<SegmentMemberPage>;
  SegmentOperator: ResolverTypeWrapper<SegmentOperator>;
  SegmentRelation: ResolverTypeWrapper<SegmentRelation>;
  SegmentStatus: SegmentStatus;
  SegmentUsage: ResolverTypeWrapper<SegmentUsage>;
  SegmentUsageAutomation: ResolverTypeWrapper<SegmentUsageAutomation>;
  SegmentUsageSegment: ResolverTypeWrapper<SegmentUsageSegment>;
  SegmentVisibility: SegmentVisibility;
  SettingsGlobalSearchResult: ResolverTypeWrapper<SettingsGlobalSearchResult>;
  SmsDelivery: ResolverTypeWrapper<ISmsRequestDocument>;
  SmsStatus: ResolverTypeWrapper<SmsStatus>;
  SocialAuthProvider: SocialAuthProvider;
  SocialAuthProviderInfo: ResolverTypeWrapper<SocialAuthProviderInfo>;
  SocialpayConfig: ResolverTypeWrapper<SocialpayConfig>;
  SocialpayConfigInput: SocialpayConfigInput;
  SomeType: ResolverTypeWrapper<SomeType>;
  Structure: ResolverTypeWrapper<IStructureDocument>;
  SuccessResult: ResolverTypeWrapper<SuccessResult>;
  Tag: ResolverTypeWrapper<ITagDocument>;
  TagsListResponse: ResolverTypeWrapper<Omit<TagsListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Tag']>>> }>;
  Template: ResolverTypeWrapper<ITemplateDocument>;
  TemplateCategory: ResolverTypeWrapper<ITemplateCategoryDocument>;
  TemplateCategoryListResponse: ResolverTypeWrapper<Omit<TemplateCategoryListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['TemplateCategory']>>> }>;
  TemplateListResponse: ResolverTypeWrapper<Omit<TemplateListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Template']>>> }>;
  TestUser: ResolverTypeWrapper<TestUser>;
  TestUserInput: TestUserInput;
  TimelyType: TimelyType;
  TokenDeliveryMethod: TokenDeliveryMethod;
  TokiConfig: ResolverTypeWrapper<TokiConfig>;
  TokiConfigInput: TokiConfigInput;
  Trigger: ResolverTypeWrapper<Trigger>;
  TriggerInput: TriggerInput;
  TwoFactorConfig: ResolverTypeWrapper<TwoFactorConfig>;
  TwoFactorConfigInput: TwoFactorConfigInput;
  Unit: ResolverTypeWrapper<IUnitDocument>;
  UnitListQueryResponse: ResolverTypeWrapper<Omit<UnitListQueryResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['Unit']>>> }>;
  Uom: ResolverTypeWrapper<IUomDocument>;
  User: ResolverTypeWrapper<IUserDocument>;
  UserChatStatus: UserChatStatus;
  UserDetails: UserDetails;
  UserDetailsType: ResolverTypeWrapper<UserDetailsType>;
  UserMovement: ResolverTypeWrapper<IUserMovementDocument>;
  UserPermission: ResolverTypeWrapper<UserPermission>;
  UsersListResponse: ResolverTypeWrapper<Omit<UsersListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversTypes['User']>>> }>;
  VerificationRequest: ResolverTypeWrapper<VerificationRequest>;
  Workflow: ResolverTypeWrapper<Workflow>;
  WorkflowInput: WorkflowInput;
  automationsTotalCountResponse: ResolverTypeWrapper<AutomationsTotalCountResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Action: Action;
  String: Scalars['String']['output'];
  ActionCode: ActionCode;
  ActionInput: ActionInput;
  ActivityLog: IActivityLogDocument;
  ActivityLogsList: Omit<ActivityLogsList, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['ActivityLog']>>> };
  AiAgentHealth: AiAgentHealth;
  App: IAppDocument;
  ApprovalChange: ApprovalChange;
  ApprovalChangeInput: ApprovalChangeInput;
  ApprovalContentMeta: ApprovalContentMeta;
  ApprovalDecision: ApprovalDecision;
  ApprovalLock: IApprovalLockDocument;
  ApprovalLockCreateInput: ApprovalLockCreateInput;
  ApprovalLockState: Omit<ApprovalLockState, 'lock' | 'pendingRequest'> & { lock?: Maybe<ResolversParentTypes['ApprovalLock']>, pendingRequest?: Maybe<ResolversParentTypes['ApprovalRequest']> };
  ApprovalRequest: IApprovalRequestDocument;
  ApprovalRequestCreateInput: ApprovalRequestCreateInput;
  ApprovalRequestsList: Omit<ApprovalRequestsList, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['ApprovalRequest']>>> };
  Attachment: Attachment;
  Float: Scalars['Float']['output'];
  AttachmentInput: AttachmentInput;
  Auth: Auth;
  AuthConfig: AuthConfig;
  AuthConfigInput: AuthConfigInput;
  AuthInput: AuthInput;
  AuthTokenResponse: Omit<AuthTokenResponse, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  Automation: IAutomationDocument;
  AutomationHistories: Omit<AutomationHistories, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['AutomationHistory']>>> };
  AutomationHistory: IAutomationExecutionDocument;
  AutomationNote: AutomationNote;
  AutomationStats: AutomationStats;
  AutomationStatsBucket: AutomationStatsBucket;
  AutomationStatsCount: AutomationStatsCount;
  AutomationStatsErrorMessage: AutomationStatsErrorMessage;
  AutomationStatsNode: AutomationStatsNode;
  AutomationWorkflowTemplate: IAutomationWorkflowTemplateDocument;
  AutomationsListResponse: Omit<AutomationsListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Automation']>>> };
  AvgEmailStats: AvgEmailStats;
  Branch: IBranchDocument;
  BranchesListResponse: Omit<BranchesListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Branch']>>> };
  Brand: IBrandDocument;
  BrandListResponse: Omit<BrandListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Brand']>>> };
  BroadcastEmailDryRun: BroadcastEmailDryRun;
  BroadcastEmailFieldCoverage: BroadcastEmailFieldCoverage;
  BroadcastRecipient: IBroadcastRecipientDocument;
  BroadcastRecipientEmail: BroadcastRecipientEmail;
  BroadcastRecipientEmailEvent: BroadcastRecipientEmailEvent;
  BroadcastRecipientListResponse: Omit<BroadcastRecipientListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['BroadcastRecipient']>>> };
  BroadcastRun: IBroadcastRunDocument;
  BroadcastTrace: IBroadcastTraceDocument;
  BundleCondition: IBundleConditionDocument;
  BundleRule: IBundleRuleDocument;
  BundleRuleItem: Omit<BundleRuleItem, 'products'> & { products?: Maybe<Array<Maybe<ResolversParentTypes['Product']>>> };
  BundleRuleItemInput: BundleRuleItemInput;
  CPComment: ICPCommentDocument;
  CPCommentFilter: CpCommentFilter;
  CPCommentInput: CpCommentInput;
  CPCommentListResponse: Omit<CpCommentListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['CPComment']>>> };
  CPCommentUpdateInput: CpCommentUpdateInput;
  CPExamplePost: CpExamplePost;
  CPNotification: ICPNotificationDocument;
  CPNotificationFilters: CpNotificationFilters;
  CPNotificationListResponse: Omit<CpNotificationListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['CPNotification']>>> };
  CPNotificationResult: CpNotificationResult;
  CPNotificationSendInput: CpNotificationSendInput;
  CPUnit: CpUnit;
  CPUnitDepartment: CpUnitDepartment;
  CPUnitUser: CpUnitUser;
  CPUnitUserDetails: CpUnitUserDetails;
  CPUser: ICPUserDocument;
  CPUserListResponse: Omit<CpUserListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['CPUser']>>> };
  CPUserRemoveResponse: CpUserRemoveResponse;
  ClientPortal: IClientPortalDocument;
  ClientPortalConfigInput: ClientPortalConfigInput;
  ClientPortalListResponse: Omit<ClientPortalListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['ClientPortal']>>> };
  CompaniesListResponse: Omit<CompaniesListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Company']>>> };
  Company: ICompanyDocument;
  Config: IConfigDocument;
  Conformity: IConformityDocument;
  CookieOrganization: CookieOrganization;
  Coordinate: Coordinate;
  CoordinateInput: CoordinateInput;
  CoreModulesGlobalSearchResult: CoreModulesGlobalSearchResult;
  CpFieldGroupParams: CpFieldGroupParams;
  CpFieldsParams: CpFieldsParams;
  CurrentUserPermissionsResult: CurrentUserPermissionsResult;
  CustomPermission: CustomPermission;
  Customer: ICustomerDocument;
  CustomersListResponse: Omit<CustomersListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Customer']>>> };
  Date: Scalars['Date']['output'];
  DefaultPermissionGroup: Omit<DefaultPermissionGroup, 'members'> & { members?: Maybe<Array<Maybe<ResolversParentTypes['User']>>> };
  DeliveryList: Omit<DeliveryList, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['SmsDelivery']>>> };
  DeliveryReport: IDeliveryReportsDocument;
  Department: IDepartmentDocument;
  DepartmentsListResponse: Omit<DepartmentsListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Department']>>> };
  Document: IDocumentDocument;
  DocumentEditorAttribute: DocumentEditorAttribute;
  DocumentListResponse: Omit<DocumentListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Document']>>> };
  DocumentsTypes: DocumentsTypes;
  ENV: Env;
  EmailAddress: IEmailAddressDocument;
  EmailAddressesList: Omit<EmailAddressesList, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['EmailAddress']>>> };
  EmailDeliveriesList: Omit<EmailDeliveriesList, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['EmailDelivery']>>> };
  EmailDelivery: IEmailDeliveryDocument;
  EmailRampStatus: EmailRampStatus;
  EmailSender: IEmailSenderDocument;
  EmailSenderOptions: Omit<EmailSenderOptions, 'senders'> & { senders?: Maybe<Array<Maybe<ResolversParentTypes['EmailSender']>>> };
  EmailSignature: EmailSignature;
  EmailTemplate: IEmailTemplateDocument;
  EmailTemplatesListResponse: Omit<EmailTemplatesListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['EmailTemplate']>>> };
  EngageCalendarEntry: EngageCalendarEntry;
  EngageDeliveryReport: Omit<EngageDeliveryReport, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['DeliveryReport']>>> };
  EngageMemberListResponse: Omit<EngageMemberListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['User']>>> };
  EngageMessage: IEngageMessageDocument;
  EngageMessageEmail: EngageMessageEmail;
  EngageMessageListResponse: Omit<EngageMessageListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['EngageMessage']>>> };
  EngageMessageMessenger: EngageMessageMessenger;
  EngageMessageNotification: EngageMessageNotification;
  EngageMessageSms: EngageMessageSms;
  EngageMessageSmsInput: EngageMessageSmsInput;
  EngageRecurrenceInput: EngageRecurrenceInput;
  EngageScheduleDate: EngageScheduleDate;
  EngageScheduleDateInput: EngageScheduleDateInput;
  Entity: Entity;
  EntityInput: EntityInput;
  Export: IExportDocument;
  ExportHeader: ExportHeader;
  ExportHistoryList: Omit<ExportHistoryList, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Export']>>> };
  FacebookOAuthConfig: FacebookOAuthConfig;
  FacebookOAuthConfigInput: FacebookOAuthConfigInput;
  Favorite: IFavoritesDocument;
  FcmDevice: FcmDevice;
  Field: IFieldDocument;
  FieldGroup: IFieldGroupDocument;
  FieldGroupListResponse: Omit<FieldGroupListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['FieldGroup']>>> };
  FieldGroupOrderItem: FieldGroupOrderItem;
  FieldGroupParams: FieldGroupParams;
  FieldListResponse: Omit<FieldListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Field']>>> };
  FieldOption: FieldOption;
  FieldOptionInput: FieldOptionInput;
  FieldsParams: FieldsParams;
  FileUploadServiceInfo: FileUploadServiceInfo;
  FirebaseConfig: FirebaseConfig;
  FirebaseConfigInput: FirebaseConfigInput;
  GlobalSearchResultItem: GlobalSearchResultItem;
  GoogleOAuthConfig: GoogleOAuthConfig;
  GoogleOAuthConfigInput: GoogleOAuthConfigInput;
  IClientPortalFilter: IClientPortalFilter;
  IClientPortalUserFilter: IClientPortalUserFilter;
  Import: IImportDocument;
  ImportColumnMapping: ImportColumnMapping;
  ImportColumnMappingInput: ImportColumnMappingInput;
  ImportColumnPreview: ImportColumnPreview;
  ImportExportType: ImportExportType;
  ImportHistoryList: Omit<ImportHistoryList, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Import']>>> };
  ImportPreviewColumn: ImportPreviewColumn;
  ImportPreviewField: ImportPreviewField;
  InputRule: InputRule;
  InternalNote: IInternalNoteDocument;
  InternalNotesByAction: InternalNotesByAction;
  InvitationEntry: InvitationEntry;
  JSON: Scalars['JSON']['output'];
  Log: ILogDocument;
  LogContentType: LogContentType;
  MailConfig: MailConfig;
  MailConfigInput: MailConfigInput;
  MainLogsList: Omit<MainLogsList, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Log']>>> };
  ManualVerificationConfig: ManualVerificationConfig;
  ManualVerificationConfigInput: ManualVerificationConfigInput;
  ModifiedNote: ModifiedNote;
  MultiFactorConfig: MultiFactorConfig;
  MultiFactorConfigInput: MultiFactorConfigInput;
  Mutation: Record<PropertyKey, never>;
  NoteInput: NoteInput;
  Notification: INotificationDocument;
  NotificationConfig: NotificationConfig;
  NotificationConfigListResponse: NotificationConfigListResponse;
  NotificationFilters: NotificationFilters;
  NotificationModule: NotificationModule;
  NotificationModuleEvent: NotificationModuleEvent;
  NotificationPluginType: NotificationPluginType;
  NotificationSettings: NotificationSettings;
  NotificationSettingsChannelInput: NotificationSettingsChannelInput;
  NotificationSettingsEventInput: NotificationSettingsEventInput;
  NotificationsList: Omit<NotificationsList, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Notification']>>> };
  OAuthClientApp: IOAuthClientAppDocument;
  OTPConfig: OtpConfig;
  OTPConfigInput: OtpConfigInput;
  OTPEmailConfig: OtpEmailConfig;
  OTPEmailConfigInput: OtpEmailConfigInput;
  OTPResendConfig: OtpResendConfig;
  OTPResendConfigInput: OtpResendConfigInput;
  OTPSMSConfig: OtpsmsConfig;
  OTPSMSConfigInput: OtpsmsConfigInput;
  Organization: Organization;
  PackageProduct: Omit<PackageProduct, 'product'> & { product?: Maybe<ResolversParentTypes['Product']> };
  PageInfo: PageInfo;
  PasswordVerificationConfig: PasswordVerificationConfig;
  PasswordVerificationConfigInput: PasswordVerificationConfigInput;
  PdfAttachment: PdfAttachment;
  PdfAttachmentInput: PdfAttachmentInput;
  PermissionAction: PermissionAction;
  PermissionGroup: IPermissionGroupDocument;
  PermissionGroupPermission: PermissionGroupPermission;
  PermissionInput: PermissionInput;
  PermissionModule: PermissionModule;
  PermissionModulesByPlugin: PermissionModulesByPlugin;
  PermissionScopeDescription: PermissionScopeDescription;
  Position: IPositionDocument;
  PositionListQueryResponse: Omit<PositionListQueryResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Position']>>> };
  Product: IProductDocument;
  ProductBulkSimilarity: Omit<ProductBulkSimilarity, 'products'> & { products?: Maybe<Array<Maybe<ResolversParentTypes['Product']>>> };
  ProductCategory: IProductCategoryDocument;
  ProductPackage: IPackageDocument;
  ProductPackageInput: ProductPackageInput;
  ProductPackagesListResponse: Omit<ProductPackagesListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['ProductPackage']>>> };
  ProductRule: IProductRuleDocument;
  ProductRulesCount: Omit<ProductRulesCount, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['ProductRule']>>> };
  ProductSimilarity: IProductSimilarityDocument;
  ProductSimilarityField: ProductSimilarityField;
  ProductSimilarityGroup: ProductSimilarityGroup;
  ProductsConfig: IProductsConfigDocument;
  ProductsListResponse: Omit<ProductsListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Product']>>> };
  PropertySystemField: ISystemFieldSettingDocument;
  PropertySystemFieldLogicInput: PropertySystemFieldLogicInput;
  PropertyType: PropertyType;
  Query: Record<PropertyKey, never>;
  RefreshToken: RefreshToken;
  Relation: IRelationDocument;
  RelationInput: RelationInput;
  ResetPasswordConfig: ResetPasswordConfig;
  ResetPasswordConfigInput: ResetPasswordConfigInput;
  SMSProvidersConfig: SmsProvidersConfig;
  SMSProvidersConfigInput: SmsProvidersConfigInput;
  SecurityAuthConfig: SecurityAuthConfig;
  SecurityAuthConfigInput: SecurityAuthConfigInput;
  Segment: ISegmentDocument;
  ID: Scalars['ID']['output'];
  SegmentDay: SegmentDay;
  SegmentField: SegmentField;
  SegmentMemberCount: SegmentMemberCount;
  SegmentMemberPage: SegmentMemberPage;
  SegmentOperator: SegmentOperator;
  SegmentRelation: SegmentRelation;
  SegmentUsage: SegmentUsage;
  SegmentUsageAutomation: SegmentUsageAutomation;
  SegmentUsageSegment: SegmentUsageSegment;
  SettingsGlobalSearchResult: SettingsGlobalSearchResult;
  SmsDelivery: ISmsRequestDocument;
  SmsStatus: SmsStatus;
  SocialAuthProviderInfo: SocialAuthProviderInfo;
  SocialpayConfig: SocialpayConfig;
  SocialpayConfigInput: SocialpayConfigInput;
  SomeType: SomeType;
  Structure: IStructureDocument;
  SuccessResult: SuccessResult;
  Tag: ITagDocument;
  TagsListResponse: Omit<TagsListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Tag']>>> };
  Template: ITemplateDocument;
  TemplateCategory: ITemplateCategoryDocument;
  TemplateCategoryListResponse: Omit<TemplateCategoryListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['TemplateCategory']>>> };
  TemplateListResponse: Omit<TemplateListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Template']>>> };
  TestUser: TestUser;
  TestUserInput: TestUserInput;
  TokiConfig: TokiConfig;
  TokiConfigInput: TokiConfigInput;
  Trigger: Trigger;
  TriggerInput: TriggerInput;
  TwoFactorConfig: TwoFactorConfig;
  TwoFactorConfigInput: TwoFactorConfigInput;
  Unit: IUnitDocument;
  UnitListQueryResponse: Omit<UnitListQueryResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['Unit']>>> };
  Uom: IUomDocument;
  User: IUserDocument;
  UserDetails: UserDetails;
  UserDetailsType: UserDetailsType;
  UserMovement: IUserMovementDocument;
  UserPermission: UserPermission;
  UsersListResponse: Omit<UsersListResponse, 'list'> & { list?: Maybe<Array<Maybe<ResolversParentTypes['User']>>> };
  VerificationRequest: VerificationRequest;
  Workflow: Workflow;
  WorkflowInput: WorkflowInput;
  automationsTotalCountResponse: AutomationsTotalCountResponse;
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
}>;

export type CacheControlDirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars['Boolean']['input']>;
  maxAge?: Maybe<Scalars['Int']['input']>;
  scope?: Maybe<CacheControlScope>;
};

export type CacheControlDirectiveResolver<Result, Parent, ContextType = IContext, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ActionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Action'] = ResolversParentTypes['Action']> = ResolversObject<{
  config?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextActionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  style?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  targetActionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workflowId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ActionCodeResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ActionCode'] = ResolversParentTypes['ActionCode']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expires?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ActionCodeType']>, ParentType, ContextType>;
}>;

export type ActivityLogResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ActivityLog'] = ResolversParentTypes['ActivityLog']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  action?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  activityType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  actor?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  actorType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  changes?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  context?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  contextType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  sourcePlugin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  targetType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ActivityLogsListResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ActivityLogsList'] = ResolversParentTypes['ActivityLogsList']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['ActivityLog']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type AiAgentHealthResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AiAgentHealth'] = ResolversParentTypes['AiAgentHealth']> = ResolversObject<{
  checkedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  checks?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  errors?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  ready?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  warnings?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type AppResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['App'] = ResolversParentTypes['App']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lastUsedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ApprovalChangeResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ApprovalChange'] = ResolversParentTypes['ApprovalChange']> = ResolversObject<{
  changeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ApprovalContentMetaResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ApprovalContentMeta'] = ResolversParentTypes['ApprovalContentMeta']> = ResolversObject<{
  contentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ApprovalDecisionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ApprovalDecision'] = ResolversParentTypes['ApprovalDecision']> = ResolversObject<{
  at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  decision?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ApprovalLockResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ApprovalLock'] = ResolversParentTypes['ApprovalLock']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  allowedUserIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  approvalMode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  approverScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lockedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerIdSnapshot?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  releaseReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  releasedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  releasedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ApprovalLockStateResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ApprovalLockState'] = ResolversParentTypes['ApprovalLockState']> = ResolversObject<{
  action?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['ApprovalContentMeta']>, ParentType, ContextType>;
  contentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasAccess?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lock?: Resolver<Maybe<ResolversTypes['ApprovalLock']>, ParentType, ContextType>;
  locked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  pendingRequest?: Resolver<Maybe<ResolversTypes['ApprovalRequest']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ApprovalRequestResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ApprovalRequest'] = ResolversParentTypes['ApprovalRequest']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  appliedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  applyError?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  change?: Resolver<Maybe<ResolversTypes['ApprovalChange']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['ApprovalContentMeta']>, ParentType, ContextType>;
  contentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  decisions?: Resolver<Maybe<Array<Maybe<ResolversTypes['ApprovalDecision']>>>, ParentType, ContextType>;
  kind?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lockId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notificationIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requester?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  requesterId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requiredApproverIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  requiredApprovers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  resolvedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ApprovalRequestsListResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ApprovalRequestsList'] = ResolversParentTypes['ApprovalRequestsList']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['ApprovalRequest']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type AttachmentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Attachment'] = ResolversParentTypes['Attachment']> = ResolversObject<{
  duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type AuthResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = ResolversObject<{
  authConfig?: Resolver<Maybe<ResolversTypes['AuthConfig']>, ParentType, ContextType>;
  facebookOAuth?: Resolver<Maybe<ResolversTypes['FacebookOAuthConfig']>, ParentType, ContextType>;
  googleOAuth?: Resolver<Maybe<ResolversTypes['GoogleOAuthConfig']>, ParentType, ContextType>;
  socialpayConfig?: Resolver<Maybe<ResolversTypes['SocialpayConfig']>, ParentType, ContextType>;
  tokiConfig?: Resolver<Maybe<ResolversTypes['TokiConfig']>, ParentType, ContextType>;
}>;

export type AuthConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AuthConfig'] = ResolversParentTypes['AuthConfig']> = ResolversObject<{
  accessTokenExpirationInDays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  deliveryMethod?: Resolver<Maybe<ResolversTypes['TokenDeliveryMethod']>, ParentType, ContextType>;
  refreshTokenExpirationInDays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type AuthTokenResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AuthTokenResponse'] = ResolversParentTypes['AuthTokenResponse']> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expiresIn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type AutomationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Automation'] = ResolversParentTypes['Automation']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  actions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Action']>>>, ParentType, ContextType>;
  activatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  activatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  approvalLockState?: Resolver<Maybe<ResolversTypes['ApprovalLockState']>, ParentType, ContextType, Partial<AutomationApprovalLockStateArgs>>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  duplicatedFrom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duplicatedFromName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  edgeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flowDirection?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<Array<Maybe<ResolversTypes['AutomationNote']>>>, ParentType, ContextType>;
  ownedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerContentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  triggers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Trigger']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  workflows?: Resolver<Maybe<Array<Maybe<ResolversTypes['Workflow']>>>, ParentType, ContextType>;
}>;

export type AutomationHistoriesResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AutomationHistories'] = ResolversParentTypes['AutomationHistories']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['AutomationHistory']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type AutomationHistoryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AutomationHistory'] = ResolversParentTypes['AutomationHistory']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  actions?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  automationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  depth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errorCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  failedActionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  failedActionType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  handledFailureActionIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  inputs?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  modifiedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  nextActionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parentExecutionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startWaitingDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  triggerConfig?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  triggerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  triggerType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  waitingActionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workflowId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type AutomationNoteResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AutomationNote'] = ResolversParentTypes['AutomationNote']> = ResolversObject<{
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
}>;

export type AutomationStatsResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AutomationStats'] = ResolversParentTypes['AutomationStats']> = ResolversObject<{
  byErrorCode?: Resolver<Maybe<Array<Maybe<ResolversTypes['AutomationStatsCount']>>>, ParentType, ContextType>;
  byStatus?: Resolver<Maybe<Array<Maybe<ResolversTypes['AutomationStatsCount']>>>, ParentType, ContextType>;
  errorMessages?: Resolver<Maybe<Array<Maybe<ResolversTypes['AutomationStatsErrorMessage']>>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['AutomationStatsNode']>>>, ParentType, ContextType>;
  timeSeries?: Resolver<Maybe<Array<Maybe<ResolversTypes['AutomationStatsBucket']>>>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type AutomationStatsBucketResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AutomationStatsBucket'] = ResolversParentTypes['AutomationStatsBucket']> = ResolversObject<{
  complete?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  waiting?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type AutomationStatsCountResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AutomationStatsCount'] = ResolversParentTypes['AutomationStatsCount']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type AutomationStatsErrorMessageResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AutomationStatsErrorMessage'] = ResolversParentTypes['AutomationStatsErrorMessage']> = ResolversObject<{
  actionTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  errorCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type AutomationStatsNodeResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AutomationStatsNode'] = ResolversParentTypes['AutomationStatsNode']> = ResolversObject<{
  actionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  actionType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avgDurationMs?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  errorCodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['AutomationStatsCount']>>>, ParentType, ContextType>;
  maxDurationMs?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  waiting?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type AutomationWorkflowTemplateResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AutomationWorkflowTemplate'] = ResolversParentTypes['AutomationWorkflowTemplate']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  actions?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entryActionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  inputs?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type AutomationsListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AutomationsListResponse'] = ResolversParentTypes['AutomationsListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Automation']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
}>;

export type AvgEmailStatsResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AvgEmailStats'] = ResolversParentTypes['AvgEmailStats']> = ResolversObject<{
  avgBouncePercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avgClickPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avgComplaintPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avgDeliveryPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avgOpenPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avgRejectPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avgRenderingFailurePercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avgSendPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
}>;

export type BranchResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Branch'] = ResolversParentTypes['Branch'], FederationReferenceType extends FederationReferenceTypes['Branch'] = FederationReferenceTypes['Branch']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Branch']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['Branch']>>>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordinate?: Resolver<Maybe<ResolversTypes['Coordinate']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasChildren?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  holidays?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Attachment']>, ParentType, ContextType>;
  links?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Branch']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  radius?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supervisor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  supervisorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  workhours?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
}>;

export type BranchesListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BranchesListResponse'] = ResolversParentTypes['BranchesListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Branch']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type BrandResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Brand'] = ResolversParentTypes['Brand'], FederationReferenceType extends FederationReferenceTypes['Brand'] = FederationReferenceTypes['Brand']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Brand']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailConfig?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  memberIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type BrandListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BrandListResponse'] = ResolversParentTypes['BrandListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Brand']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type BroadcastEmailDryRunResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BroadcastEmailDryRun'] = ResolversParentTypes['BroadcastEmailDryRun']> = ResolversObject<{
  fields?: Resolver<Maybe<Array<Maybe<ResolversTypes['BroadcastEmailFieldCoverage']>>>, ParentType, ContextType>;
  sampleHtml?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampled?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  unresolved?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
}>;

export type BroadcastEmailFieldCoverageResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BroadcastEmailFieldCoverage'] = ResolversParentTypes['BroadcastEmailFieldCoverage']> = ResolversObject<{
  filled?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  missing?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type BroadcastRecipientResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BroadcastRecipient'] = ResolversParentTypes['BroadcastRecipient']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  attempts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  execution?: Resolver<Maybe<ResolversTypes['AutomationHistory']>, ParentType, ContextType>;
  finishedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  runId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type BroadcastRecipientEmailResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BroadcastRecipientEmail'] = ResolversParentTypes['BroadcastRecipientEmail']> = ResolversObject<{
  events?: Resolver<Maybe<Array<Maybe<ResolversTypes['BroadcastRecipientEmailEvent']>>>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  html?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  replyTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type BroadcastRecipientEmailEventResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BroadcastRecipientEmailEvent'] = ResolversParentTypes['BroadcastRecipientEmailEvent']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type BroadcastRecipientListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BroadcastRecipientListResponse'] = ResolversParentTypes['BroadcastRecipientListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['BroadcastRecipient']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type BroadcastRunResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BroadcastRun'] = ResolversParentTypes['BroadcastRun']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  counts?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  finishedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  method?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  runCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  startedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type BroadcastTraceResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BroadcastTrace'] = ResolversParentTypes['BroadcastTrace']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  engageMessageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type BundleConditionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BundleCondition'] = ResolversParentTypes['BundleCondition'], FederationReferenceType extends FederationReferenceTypes['BundleCondition'] = FederationReferenceTypes['BundleCondition']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['BundleCondition']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isDefault?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type BundleRuleResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BundleRule'] = ResolversParentTypes['BundleRule'], FederationReferenceType extends FederationReferenceTypes['BundleRule'] = FederationReferenceTypes['BundleRule']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['BundleRule']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rules?: Resolver<Maybe<Array<Maybe<ResolversTypes['BundleRuleItem']>>>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type BundleRuleItemResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BundleRuleItem'] = ResolversParentTypes['BundleRuleItem']> = ResolversObject<{
  allowSkip?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  percent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceAdjustFactor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priceAdjustType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priceType?: Resolver<Maybe<ResolversTypes['PriceType']>, ParentType, ContextType>;
  priceValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  productIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type CpCommentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPComment'] = ResolversParentTypes['CPComment']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  typeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userType?: Resolver<Maybe<ResolversTypes['CPCommentUserType']>, ParentType, ContextType>;
}>;

export type CpCommentListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPCommentListResponse'] = ResolversParentTypes['CPCommentListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['CPComment']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type CpExamplePostResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPExamplePost'] = ResolversParentTypes['CPExamplePost']> = ResolversObject<{
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type CpNotificationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPNotification'] = ResolversParentTypes['CPNotification']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  action?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientPortalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentTypeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cpUserId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  expiresAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  isRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priorityLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  readAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['CPNotificationResult']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
}>;

export type CpNotificationListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPNotificationListResponse'] = ResolversParentTypes['CPNotificationListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['CPNotification']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type CpNotificationResultResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPNotificationResult'] = ResolversParentTypes['CPNotificationResult']> = ResolversObject<{
  android?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  ios?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  web?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type CpUnitResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPUnit'] = ResolversParentTypes['CPUnit']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['CPUnitDepartment']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['CPUnitUser']>>>, ParentType, ContextType>;
}>;

export type CpUnitDepartmentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPUnitDepartment'] = ResolversParentTypes['CPUnitDepartment']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type CpUnitUserResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPUnitUser'] = ResolversParentTypes['CPUnitUser']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['CPUnitUserDetails']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type CpUnitUserDetailsResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPUnitUserDetails'] = ResolversParentTypes['CPUnitUserDetails']> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shortName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type CpUserResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPUser'] = ResolversParentTypes['CPUser']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accountLockedUntil?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientPortal?: Resolver<Maybe<ResolversTypes['ClientPortal']>, ParentType, ContextType>;
  clientPortalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyRegistrationNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  customFieldsData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  erxesCompanyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  erxesCustomerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  failedLoginAttempts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fcmTokens?: Resolver<Maybe<Array<Maybe<ResolversTypes['FcmDevice']>>>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isEmailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPhoneVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastLoginAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  otpResendAttempts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  otpResendLastAttempt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryAuthMethod?: Resolver<Maybe<ResolversTypes['AuthMethod']>, ParentType, ContextType>;
  propertiesData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  socialAuthProviders?: Resolver<Maybe<Array<Maybe<ResolversTypes['SocialAuthProviderInfo']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verificationRequest?: Resolver<Maybe<ResolversTypes['VerificationRequest']>, ParentType, ContextType>;
}>;

export type CpUserListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPUserListResponse'] = ResolversParentTypes['CPUserListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['CPUser']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type CpUserRemoveResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CPUserRemoveResponse'] = ResolversParentTypes['CPUserRemoveResponse']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type ClientPortalResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ClientPortal'] = ResolversParentTypes['ClientPortal']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  auth?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enableManualVerification?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  erxesIntegrationToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firebaseConfig?: Resolver<Maybe<ResolversTypes['FirebaseConfig']>, ParentType, ContextType>;
  manualVerificationConfig?: Resolver<Maybe<ResolversTypes['ManualVerificationConfig']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  securityAuthConfig?: Resolver<Maybe<ResolversTypes['SecurityAuthConfig']>, ParentType, ContextType>;
  smsProvidersConfig?: Resolver<Maybe<ResolversTypes['SMSProvidersConfig']>, ParentType, ContextType>;
  testUser?: Resolver<Maybe<ResolversTypes['TestUser']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  useB2B?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type ClientPortalListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ClientPortalListResponse'] = ResolversParentTypes['ClientPortalListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['ClientPortal']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type CompaniesListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CompaniesListResponse'] = ResolversParentTypes['CompaniesListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Company']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type CompanyResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company'], FederationReferenceType extends FederationReferenceTypes['Company'] = FederationReferenceTypes['Company']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Company']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addresses?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  businessType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Customer']>>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emails?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  getTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  industry?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  isSubscribed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  links?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mergedIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  names?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ownerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parentCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  parentCompanyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phones?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  primaryAddress?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  primaryEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  propertiesData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  trackedData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Config'] = ResolversParentTypes['Config']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
}>;

export type ConformityResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Conformity'] = ResolversParentTypes['Conformity']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mainType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mainTypeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  relType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  relTypeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type CookieOrganizationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CookieOrganization'] = ResolversParentTypes['CookieOrganization']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subdomain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type CoordinateResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Coordinate'] = ResolversParentTypes['Coordinate']> = ResolversObject<{
  latitude?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type CoreModulesGlobalSearchResultResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CoreModulesGlobalSearchResult'] = ResolversParentTypes['CoreModulesGlobalSearchResult']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['GlobalSearchResultItem']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type CurrentUserPermissionsResultResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CurrentUserPermissionsResult'] = ResolversParentTypes['CurrentUserPermissionsResult']> = ResolversObject<{
  permissions?: Resolver<Array<Maybe<ResolversTypes['UserPermission']>>, ParentType, ContextType>;
  pluginsWithPermissions?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
}>;

export type CustomPermissionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CustomPermission'] = ResolversParentTypes['CustomPermission']> = ResolversObject<{
  actions?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  module?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plugin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type CustomerResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer'], FederationReferenceType extends FederationReferenceTypes['Customer'] = FederationReferenceTypes['Customer']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Customer']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addresses?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  clientPortalId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Company']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailValidationStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emails?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  hasAuthority?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  integrationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isOnline?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isSubscribed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastSeenAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  leadStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  links?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  middleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ownerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneValidationStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phones?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryAddress?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  primaryEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  propertiesData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  remoteAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sessionCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  trackedData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  urlVisits?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  visitorContactInfo?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
}>;

export type CustomersListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CustomersListResponse'] = ResolversParentTypes['CustomersListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Customer']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DefaultPermissionGroupResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DefaultPermissionGroup'] = ResolversParentTypes['DefaultPermissionGroup']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Array<Maybe<ResolversTypes['PermissionGroupPermission']>>, ParentType, ContextType>;
  plugin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type DeliveryListResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DeliveryList'] = ResolversParentTypes['DeliveryList']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['SmsDelivery']>>>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type DeliveryReportResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DeliveryReport'] = ResolversParentTypes['DeliveryReport']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  customerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  engage?: Resolver<Maybe<ResolversTypes['EngageMessage']>, ParentType, ContextType>;
  mailId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type DepartmentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Department'] = ResolversParentTypes['Department'], FederationReferenceType extends FederationReferenceTypes['Department'] = FederationReferenceTypes['Department']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Department']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  childCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['Department']>>>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supervisor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  supervisorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  workhours?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
}>;

export type DepartmentsListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DepartmentsListResponse'] = ResolversParentTypes['DepartmentsListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Department']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type DocumentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  approvalLockState?: Resolver<Maybe<ResolversTypes['ApprovalLockState']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  replacer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
}>;

export type DocumentEditorAttributeResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DocumentEditorAttribute'] = ResolversParentTypes['DocumentEditorAttribute']> = ResolversObject<{
  groupDetail?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type DocumentListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DocumentListResponse'] = ResolversParentTypes['DocumentListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Document']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type DocumentsTypesResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DocumentsTypes'] = ResolversParentTypes['DocumentsTypes']> = ResolversObject<{
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
}>;

export type EnvResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ENV'] = ResolversParentTypes['ENV']> = ResolversObject<{
  RELEASE?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  USE_BRAND_RESTRICTIONS?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type EmailAddressResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EmailAddress'] = ResolversParentTypes['EmailAddress']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  deliveredCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lane?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastDeliveredAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lastSentAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lastSoftBounceAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  releaseNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  releasedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  releasedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  softBounceCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  suppressedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  suppressedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  suppressionReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type EmailAddressesListResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EmailAddressesList'] = ResolversParentTypes['EmailAddressesList']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['EmailAddress']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type EmailDeliveriesListResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EmailDeliveriesList'] = ResolversParentTypes['EmailDeliveriesList']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['EmailDelivery']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type EmailDeliveryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EmailDelivery'] = ResolversParentTypes['EmailDelivery']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bounced?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  ccEmails?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  clicked?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  complained?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  deliveryStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deliveryStatusAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  messageId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notificationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  opened?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  providerResponse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rejected?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  toEmails?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type EmailRampStatusResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EmailRampStatus'] = ResolversParentTypes['EmailRampStatus']> = ResolversObject<{
  advanceRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  dailyBudget?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dropRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  haltRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  haltReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  haltedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lastEvaluatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lastRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  tier?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tiers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  usedToday?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  windowDays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type EmailSenderResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EmailSender'] = ResolversParentTypes['EmailSender']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type EmailSenderOptionsResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EmailSenderOptions'] = ResolversParentTypes['EmailSenderOptions']> = ResolversObject<{
  alignedFrom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  defaultSenderEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sameAsMailConfig?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  senders?: Resolver<Maybe<Array<Maybe<ResolversTypes['EmailSender']>>>, ParentType, ContextType>;
  supportsDynamicSender?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  supportsSenderVerification?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type EmailTemplateResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EmailTemplate'] = ResolversParentTypes['EmailTemplate']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentFormat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentJson?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type EmailTemplatesListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EmailTemplatesListResponse'] = ResolversParentTypes['EmailTemplatesListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['EmailTemplate']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
}>;

export type EngageCalendarEntryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EngageCalendarEntry'] = ResolversParentTypes['EngageCalendarEntry']> = ResolversObject<{
  at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  engageMessageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  method?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  runCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  runId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type EngageDeliveryReportResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EngageDeliveryReport'] = ResolversParentTypes['EngageDeliveryReport']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['DeliveryReport']>>>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type EngageMemberListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EngageMemberListResponse'] = ResolversParentTypes['EngageMemberListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type EngageMessageResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EngageMessage'] = ResolversParentTypes['EngageMessage']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  approvalLockState?: Resolver<Maybe<ResolversTypes['ApprovalLockState']>, ParentType, ContextType, Partial<EngageMessageApprovalLockStateArgs>>;
  brandId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  brandIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  brands?: Resolver<Maybe<Array<Maybe<ResolversTypes['Brand']>>>, ParentType, ContextType>;
  cpId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  customerTagIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  customerTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  fromEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fromIntegration?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  fromUserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  isDraft?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isLive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  kind?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastRunAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  messenger?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  messengerReceivedCustomerIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  method?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextRunAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  notification?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  runCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  scheduleDate?: Resolver<Maybe<ResolversTypes['EngageScheduleDate']>, ParentType, ContextType>;
  segmentIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  segments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Segment']>>>, ParentType, ContextType>;
  shortMessage?: Resolver<Maybe<ResolversTypes['EngageMessageSms']>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stopDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  tagIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  targetCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  targetIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  targetType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalCustomersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validCustomersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  workflowAutomationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type EngageMessageListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EngageMessageListResponse'] = ResolversParentTypes['EngageMessageListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['EngageMessage']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type EngageMessageSmsResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EngageMessageSms'] = ResolversParentTypes['EngageMessageSms']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fromIntegrationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type EngageScheduleDateResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['EngageScheduleDate'] = ResolversParentTypes['EngageScheduleDate']> = ResolversObject<{
  dateTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  day?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  every?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hour?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minute?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  month?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  monthDay?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  monthOfYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  timeZone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weekDay?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type EntityResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Entity'] = ResolversParentTypes['Entity']> = ResolversObject<{
  contentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type ExportResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Export'] = ResolversParentTypes['Export']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  collectionName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  elapsedSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  entityType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedSecondsRemaining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fileKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  filters?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  ids?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moduleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pluginName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  processedRows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rowsPerSecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  selectedFields?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  startedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subdomain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalRows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ExportHeaderResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ExportHeader'] = ResolversParentTypes['ExportHeader']> = ResolversObject<{
  isDefault?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ExportHistoryListResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ExportHistoryList'] = ResolversParentTypes['ExportHistoryList']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Export']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type FacebookOAuthConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['FacebookOAuthConfig'] = ResolversParentTypes['FacebookOAuthConfig']> = ResolversObject<{
  appId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  appSecret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  redirectUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type FavoriteResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  breadcrumb?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type FcmDeviceResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['FcmDevice'] = ResolversParentTypes['FcmDevice']> = ResolversObject<{
  deviceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  platform?: Resolver<ResolversTypes['FcmPlatform'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type FieldResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Field'] = ResolversParentTypes['Field']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  configs?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  groupId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isRequired?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isVisible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isVisibleInCard?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isVisibleToCreate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  logics?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  options?: Resolver<Maybe<Array<Maybe<ResolversTypes['FieldOption']>>>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  validations?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
}>;

export type FieldGroupResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['FieldGroup'] = ResolversParentTypes['FieldGroup']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  configs?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logics?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
}>;

export type FieldGroupListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['FieldGroupListResponse'] = ResolversParentTypes['FieldGroupListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['FieldGroup']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type FieldListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['FieldListResponse'] = ResolversParentTypes['FieldListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Field']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type FieldOptionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['FieldOption'] = ResolversParentTypes['FieldOption']> = ResolversObject<{
  coordinates?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type FileUploadServiceInfoResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['FileUploadServiceInfo'] = ResolversParentTypes['FileUploadServiceInfo']> = ResolversObject<{
  videoUploadEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type FirebaseConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['FirebaseConfig'] = ResolversParentTypes['FirebaseConfig']> = ResolversObject<{
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  serviceAccountKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type GlobalSearchResultItemResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['GlobalSearchResultItem'] = ResolversParentTypes['GlobalSearchResultItem']> = ResolversObject<{
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  matchFields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  module?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type GoogleOAuthConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['GoogleOAuthConfig'] = ResolversParentTypes['GoogleOAuthConfig']> = ResolversObject<{
  clientId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientSecret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  credentials?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  redirectUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ImportResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Import'] = ResolversParentTypes['Import']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  collectionName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  columnMapping?: Resolver<Maybe<Array<Maybe<ResolversTypes['ImportColumnMapping']>>>, ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  elapsedSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  entityType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errorFileUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errorRows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  estimatedSecondsRemaining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fileKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  importedIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moduleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pluginName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  processedRows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rowsPerSecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  startedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subdomain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  successRows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ImportColumnMappingResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ImportColumnMapping'] = ResolversParentTypes['ImportColumnMapping']> = ResolversObject<{
  header?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ImportColumnPreviewResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ImportColumnPreview'] = ResolversParentTypes['ImportColumnPreview']> = ResolversObject<{
  columns?: Resolver<Maybe<Array<Maybe<ResolversTypes['ImportPreviewColumn']>>>, ParentType, ContextType>;
  fields?: Resolver<Maybe<Array<Maybe<ResolversTypes['ImportPreviewField']>>>, ParentType, ContextType>;
  totalRows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ImportExportTypeResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ImportExportType'] = ResolversParentTypes['ImportExportType']> = ResolversObject<{
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ImportHistoryListResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ImportHistoryList'] = ResolversParentTypes['ImportHistoryList']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Import']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ImportPreviewColumnResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ImportPreviewColumn'] = ResolversParentTypes['ImportPreviewColumn']> = ResolversObject<{
  confidence?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  header?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleValues?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ImportPreviewFieldResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ImportPreviewField'] = ResolversParentTypes['ImportPreviewField']> = ResolversObject<{
  dataType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  example?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  options?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  required?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type InternalNoteResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['InternalNote'] = ResolversParentTypes['InternalNote']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contentTypeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdUserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type InternalNotesByActionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['InternalNotesByAction'] = ResolversParentTypes['InternalNotesByAction']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['ModifiedNote']>>>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LogResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Log'] = ResolversParentTypes['Log']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  action?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prevObject?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  processId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type LogContentTypeResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['LogContentType'] = ResolversParentTypes['LogContentType']> = ResolversObject<{
  collectionName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  moduleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pluginName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type MailConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['MailConfig'] = ResolversParentTypes['MailConfig']> = ResolversObject<{
  invitationContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registrationContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type MainLogsListResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['MainLogsList'] = ResolversParentTypes['MainLogsList']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Log']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ManualVerificationConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ManualVerificationConfig'] = ResolversParentTypes['ManualVerificationConfig']> = ResolversObject<{
  userIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  verifyCompany?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  verifyCustomer?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type ModifiedNoteResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ModifiedNote'] = ResolversParentTypes['ModifiedNote']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  action?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contentTypeDetail?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type MultiFactorConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['MultiFactorConfig'] = ResolversParentTypes['MultiFactorConfig']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['OTPEmailConfig']>, ParentType, ContextType>;
  isEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sms?: Resolver<Maybe<ResolversTypes['OTPSMSConfig']>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  approvalLockCreate?: Resolver<Maybe<ResolversTypes['ApprovalLock']>, ParentType, ContextType, RequireFields<MutationApprovalLockCreateArgs, 'input'>>;
  approvalLockForceRelease?: Resolver<Maybe<ResolversTypes['ApprovalLock']>, ParentType, ContextType, RequireFields<MutationApprovalLockForceReleaseArgs, '_id' | 'reason'>>;
  approvalLockRelease?: Resolver<Maybe<ResolversTypes['ApprovalLock']>, ParentType, ContextType, RequireFields<MutationApprovalLockReleaseArgs, '_id'>>;
  approvalRequestApprove?: Resolver<Maybe<ResolversTypes['ApprovalRequest']>, ParentType, ContextType, RequireFields<MutationApprovalRequestApproveArgs, '_id'>>;
  approvalRequestCancel?: Resolver<Maybe<ResolversTypes['ApprovalRequest']>, ParentType, ContextType, RequireFields<MutationApprovalRequestCancelArgs, '_id'>>;
  approvalRequestCreate?: Resolver<Maybe<ResolversTypes['ApprovalRequest']>, ParentType, ContextType, RequireFields<MutationApprovalRequestCreateArgs, 'input'>>;
  approvalRequestReject?: Resolver<Maybe<ResolversTypes['ApprovalRequest']>, ParentType, ContextType, RequireFields<MutationApprovalRequestRejectArgs, '_id'>>;
  appsAdd?: Resolver<Maybe<ResolversTypes['App']>, ParentType, ContextType, RequireFields<MutationAppsAddArgs, 'name'>>;
  appsEdit?: Resolver<Maybe<ResolversTypes['App']>, ParentType, ContextType, RequireFields<MutationAppsEditArgs, '_id'>>;
  appsRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationAppsRemoveArgs, '_id'>>;
  appsRevoke?: Resolver<Maybe<ResolversTypes['App']>, ParentType, ContextType, RequireFields<MutationAppsRevokeArgs, '_id'>>;
  archiveAutomations?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType, Partial<MutationArchiveAutomationsArgs>>;
  archiveNotification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationArchiveNotificationArgs, '_id'>>;
  archiveNotifications?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationArchiveNotificationsArgs>>;
  automationWorkflowTemplatesAdd?: Resolver<Maybe<ResolversTypes['AutomationWorkflowTemplate']>, ParentType, ContextType, RequireFields<MutationAutomationWorkflowTemplatesAddArgs, 'name'>>;
  automationWorkflowTemplatesEdit?: Resolver<Maybe<ResolversTypes['AutomationWorkflowTemplate']>, ParentType, ContextType, RequireFields<MutationAutomationWorkflowTemplatesEditArgs, '_id'>>;
  automationWorkflowTemplatesRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationAutomationWorkflowTemplatesRemoveArgs, '_id'>>;
  automationsAdd?: Resolver<Maybe<ResolversTypes['Automation']>, ParentType, ContextType, Partial<MutationAutomationsAddArgs>>;
  automationsAiAgentAdd?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationAutomationsAiAgentAddArgs>>;
  automationsAiAgentEdit?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationAutomationsAiAgentEditArgs, '_id'>>;
  automationsAiAgentReindex?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationAutomationsAiAgentReindexArgs, '_id'>>;
  automationsAiAgentRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationAutomationsAiAgentRemoveArgs, '_id'>>;
  automationsCreateFromTemplate?: Resolver<Maybe<ResolversTypes['Automation']>, ParentType, ContextType, Partial<MutationAutomationsCreateFromTemplateArgs>>;
  automationsDuplicate?: Resolver<Maybe<ResolversTypes['Automation']>, ParentType, ContextType, RequireFields<MutationAutomationsDuplicateArgs, '_id'>>;
  automationsEdit?: Resolver<Maybe<ResolversTypes['Automation']>, ParentType, ContextType, Partial<MutationAutomationsEditArgs>>;
  automationsRemove?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType, Partial<MutationAutomationsRemoveArgs>>;
  automationsSaveAsTemplate?: Resolver<Maybe<ResolversTypes['Automation']>, ParentType, ContextType, RequireFields<MutationAutomationsSaveAsTemplateArgs, '_id'>>;
  branchesAdd?: Resolver<Maybe<ResolversTypes['Branch']>, ParentType, ContextType, Partial<MutationBranchesAddArgs>>;
  branchesEdit?: Resolver<Maybe<ResolversTypes['Branch']>, ParentType, ContextType, RequireFields<MutationBranchesEditArgs, '_id'>>;
  branchesRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationBranchesRemoveArgs>>;
  brandsAdd?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType, RequireFields<MutationBrandsAddArgs, 'name'>>;
  brandsEdit?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType, RequireFields<MutationBrandsEditArgs, '_id' | 'name'>>;
  brandsRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationBrandsRemoveArgs>>;
  broadcastUpdateConfigs?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationBroadcastUpdateConfigsArgs, 'configsMap'>>;
  bundleConditionAdd?: Resolver<Maybe<ResolversTypes['BundleCondition']>, ParentType, ContextType, Partial<MutationBundleConditionAddArgs>>;
  bundleConditionDefault?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationBundleConditionDefaultArgs, '_id'>>;
  bundleConditionEdit?: Resolver<Maybe<ResolversTypes['BundleCondition']>, ParentType, ContextType, RequireFields<MutationBundleConditionEditArgs, '_id'>>;
  bundleConditionRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationBundleConditionRemoveArgs>>;
  bundleConditionSetBulk?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationBundleConditionSetBulkArgs, 'bundleId'>>;
  bundleRulesAdd?: Resolver<Maybe<ResolversTypes['BundleRule']>, ParentType, ContextType, Partial<MutationBundleRulesAddArgs>>;
  bundleRulesEdit?: Resolver<Maybe<ResolversTypes['BundleRule']>, ParentType, ContextType, RequireFields<MutationBundleRulesEditArgs, '_id'>>;
  bundleRulesRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationBundleRulesRemoveArgs>>;
  checkTokiUserLegalAge?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCheckTokiUserLegalAgeArgs, 'token'>>;
  clientPortalAdd?: Resolver<Maybe<ResolversTypes['ClientPortal']>, ParentType, ContextType, RequireFields<MutationClientPortalAddArgs, 'name'>>;
  clientPortalChangeToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationClientPortalChangeTokenArgs, '_id'>>;
  clientPortalCommentAdd?: Resolver<Maybe<ResolversTypes['CPComment']>, ParentType, ContextType, RequireFields<MutationClientPortalCommentAddArgs, 'comment'>>;
  clientPortalCommentDelete?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationClientPortalCommentDeleteArgs, '_id'>>;
  clientPortalCommentUpdate?: Resolver<Maybe<ResolversTypes['CPComment']>, ParentType, ContextType, RequireFields<MutationClientPortalCommentUpdateArgs, '_id' | 'comment'>>;
  clientPortalCompanyEdit?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, Partial<MutationClientPortalCompanyEditArgs>>;
  clientPortalCustomerEdit?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, Partial<MutationClientPortalCustomerEditArgs>>;
  clientPortalDelete?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationClientPortalDeleteArgs, '_id'>>;
  clientPortalLogout?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientPortalMarkAllNotificationsAsRead?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationClientPortalMarkAllNotificationsAsReadArgs>>;
  clientPortalMarkNotificationAsRead?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationClientPortalMarkNotificationAsReadArgs, '_id'>>;
  clientPortalSendNotification?: Resolver<Maybe<ResolversTypes['CPNotification']>, ParentType, ContextType, RequireFields<MutationClientPortalSendNotificationArgs, 'clientPortalId' | 'cpUserId' | 'input'>>;
  clientPortalUpdate?: Resolver<Maybe<ResolversTypes['ClientPortal']>, ParentType, ContextType, RequireFields<MutationClientPortalUpdateArgs, '_id'>>;
  clientPortalUserAddFcmToken?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<MutationClientPortalUserAddFcmTokenArgs, 'deviceId' | 'platform' | 'token'>>;
  clientPortalUserChangePassword?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<MutationClientPortalUserChangePasswordArgs, 'currentPassword' | 'newPassword'>>;
  clientPortalUserConfirmChangeEmail?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<MutationClientPortalUserConfirmChangeEmailArgs, 'code'>>;
  clientPortalUserConfirmChangePhone?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<MutationClientPortalUserConfirmChangePhoneArgs, 'code'>>;
  clientPortalUserDelete?: Resolver<Maybe<ResolversTypes['CPUserRemoveResponse']>, ParentType, ContextType>;
  clientPortalUserEdit?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, Partial<MutationClientPortalUserEditArgs>>;
  clientPortalUserForgotPassword?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationClientPortalUserForgotPasswordArgs, 'identifier'>>;
  clientPortalUserLinkSocialAccount?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<MutationClientPortalUserLinkSocialAccountArgs, 'provider' | 'token'>>;
  clientPortalUserLoginWithCredentials?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationClientPortalUserLoginWithCredentialsArgs>>;
  clientPortalUserLoginWithOTP?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationClientPortalUserLoginWithOtpArgs, 'identifier' | 'otp'>>;
  clientPortalUserLoginWithSocial?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationClientPortalUserLoginWithSocialArgs, 'provider' | 'token'>>;
  clientPortalUserLoginWithToki?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationClientPortalUserLoginWithTokiArgs, 'token'>>;
  clientPortalUserRefreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationClientPortalUserRefreshTokenArgs, 'refreshToken'>>;
  clientPortalUserRegister?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, Partial<MutationClientPortalUserRegisterArgs>>;
  clientPortalUserRegisterWithSocial?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<MutationClientPortalUserRegisterWithSocialArgs, 'provider' | 'token'>>;
  clientPortalUserRemoveFcmToken?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<MutationClientPortalUserRemoveFcmTokenArgs, 'deviceId'>>;
  clientPortalUserRequestChangeEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationClientPortalUserRequestChangeEmailArgs, 'newEmail'>>;
  clientPortalUserRequestChangePhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationClientPortalUserRequestChangePhoneArgs, 'newPhone'>>;
  clientPortalUserRequestOTP?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationClientPortalUserRequestOtpArgs, 'identifier'>>;
  clientPortalUserResetPassword?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationClientPortalUserResetPasswordArgs, 'newPassword'>>;
  clientPortalUserUnlinkSocialAccount?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<MutationClientPortalUserUnlinkSocialAccountArgs, 'provider'>>;
  clientPortalUserVerify?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<MutationClientPortalUserVerifyArgs, 'code'>>;
  companiesAdd?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, Partial<MutationCompaniesAddArgs>>;
  companiesEdit?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<MutationCompaniesEditArgs, '_id'>>;
  companiesMerge?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, Partial<MutationCompaniesMergeArgs>>;
  companiesRemove?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType, Partial<MutationCompaniesRemoveArgs>>;
  configsActivateInstallation?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationConfigsActivateInstallationArgs, 'hostname' | 'token'>>;
  configsManagePluginInstall?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationConfigsManagePluginInstallArgs, 'name' | 'type'>>;
  configsUpdate?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationConfigsUpdateArgs, 'configsMap'>>;
  conformityAdd?: Resolver<Maybe<ResolversTypes['Conformity']>, ParentType, ContextType, Partial<MutationConformityAddArgs>>;
  conformityEdit?: Resolver<Maybe<ResolversTypes['SuccessResult']>, ParentType, ContextType, Partial<MutationConformityEditArgs>>;
  cpCustomersAdd?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, Partial<MutationCpCustomersAddArgs>>;
  cpManageRelations?: Resolver<Maybe<Array<ResolversTypes['Relation']>>, ParentType, ContextType, RequireFields<MutationCpManageRelationsArgs, 'contentId' | 'contentType' | 'relatedContentType'>>;
  cpTagsAdd?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationCpTagsAddArgs, 'name'>>;
  cpTagsTag?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationCpTagsTagArgs, 'tagIds' | 'targetIds' | 'type'>>;
  cpUsersAdd?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<MutationCpUsersAddArgs, 'clientPortalId'>>;
  cpUsersEdit?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<MutationCpUsersEditArgs, '_id'>>;
  cpUsersRemove?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType, RequireFields<MutationCpUsersRemoveArgs, 'ids'>>;
  cpUsersSetPassword?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<MutationCpUsersSetPasswordArgs, '_id' | 'newPassword'>>;
  createMultipleRelations?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationCreateMultipleRelationsArgs, 'relations'>>;
  createRelation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType, RequireFields<MutationCreateRelationArgs, 'relation'>>;
  customersAdd?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, Partial<MutationCustomersAddArgs>>;
  customersChangeState?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<MutationCustomersChangeStateArgs, '_id' | 'value'>>;
  customersChangeStateBulk?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationCustomersChangeStateBulkArgs, '_ids' | 'value'>>;
  customersChangeVerificationStatus?: Resolver<Maybe<Array<Maybe<ResolversTypes['Customer']>>>, ParentType, ContextType, RequireFields<MutationCustomersChangeVerificationStatusArgs, 'status' | 'type'>>;
  customersEdit?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<MutationCustomersEditArgs, '_id'>>;
  customersMerge?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, Partial<MutationCustomersMergeArgs>>;
  customersRemove?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType, Partial<MutationCustomersRemoveArgs>>;
  customersVerify?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCustomersVerifyArgs, 'verificationType'>>;
  deleteRelation?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteRelationArgs, 'id'>>;
  departmentsAdd?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType, Partial<MutationDepartmentsAddArgs>>;
  departmentsEdit?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType, RequireFields<MutationDepartmentsEditArgs, '_id'>>;
  departmentsRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationDepartmentsRemoveArgs>>;
  documentsRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationDocumentsRemoveArgs, '_id'>>;
  documentsSave?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType, RequireFields<MutationDocumentsSaveArgs, 'name'>>;
  editOrganizationDomain?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, Partial<MutationEditOrganizationDomainArgs>>;
  editOrganizationInfo?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, Partial<MutationEditOrganizationInfoArgs>>;
  emailAddressRelease?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationEmailAddressReleaseArgs, 'email' | 'note'>>;
  emailRampRelease?: Resolver<Maybe<ResolversTypes['EmailRampStatus']>, ParentType, ContextType, RequireFields<MutationEmailRampReleaseArgs, 'note'>>;
  emailTemplateAdd?: Resolver<Maybe<ResolversTypes['EmailTemplate']>, ParentType, ContextType, RequireFields<MutationEmailTemplateAddArgs, 'name'>>;
  emailTemplateEdit?: Resolver<Maybe<ResolversTypes['EmailTemplate']>, ParentType, ContextType, RequireFields<MutationEmailTemplateEditArgs, '_id' | 'name'>>;
  emailTemplateRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationEmailTemplateRemoveArgs, '_id'>>;
  engageMessageAdd?: Resolver<Maybe<ResolversTypes['EngageMessage']>, ParentType, ContextType, Partial<MutationEngageMessageAddArgs>>;
  engageMessageCancelSchedule?: Resolver<Maybe<ResolversTypes['EngageMessage']>, ParentType, ContextType, RequireFields<MutationEngageMessageCancelScheduleArgs, '_id'>>;
  engageMessageCopy?: Resolver<Maybe<ResolversTypes['EngageMessage']>, ParentType, ContextType, RequireFields<MutationEngageMessageCopyArgs, '_id'>>;
  engageMessageEdit?: Resolver<Maybe<ResolversTypes['EngageMessage']>, ParentType, ContextType, RequireFields<MutationEngageMessageEditArgs, '_id'>>;
  engageMessageRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationEngageMessageRemoveArgs>>;
  engageMessageRemoveVerifiedEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationEngageMessageRemoveVerifiedEmailArgs, 'email'>>;
  engageMessageSendTestEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationEngageMessageSendTestEmailArgs, 'content' | 'from' | 'title' | 'to'>>;
  engageMessageSetLive?: Resolver<Maybe<ResolversTypes['EngageMessage']>, ParentType, ContextType, RequireFields<MutationEngageMessageSetLiveArgs, '_id'>>;
  engageMessageSetLiveManual?: Resolver<Maybe<ResolversTypes['EngageMessage']>, ParentType, ContextType, RequireFields<MutationEngageMessageSetLiveManualArgs, '_id'>>;
  engageMessageSetPause?: Resolver<Maybe<ResolversTypes['EngageMessage']>, ParentType, ContextType, RequireFields<MutationEngageMessageSetPauseArgs, '_id'>>;
  engageMessageSetSchedule?: Resolver<Maybe<ResolversTypes['EngageMessage']>, ParentType, ContextType, RequireFields<MutationEngageMessageSetScheduleArgs, '_id'>>;
  engageMessageVerifyEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationEngageMessageVerifyEmailArgs, 'email'>>;
  engageSendMail?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationEngageSendMailArgs, 'from' | 'subject' | 'to'>>;
  engagesUpdateConfigs?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationEngagesUpdateConfigsArgs, 'configsMap'>>;
  exportCancel?: Resolver<Maybe<ResolversTypes['Export']>, ParentType, ContextType, RequireFields<MutationExportCancelArgs, 'exportId'>>;
  exportRetry?: Resolver<Maybe<ResolversTypes['Export']>, ParentType, ContextType, RequireFields<MutationExportRetryArgs, 'exportId'>>;
  exportStart?: Resolver<Maybe<ResolversTypes['Export']>, ParentType, ContextType, RequireFields<MutationExportStartArgs, 'entityType'>>;
  fieldAdd?: Resolver<Maybe<ResolversTypes['Field']>, ParentType, ContextType, Partial<MutationFieldAddArgs>>;
  fieldEdit?: Resolver<Maybe<ResolversTypes['Field']>, ParentType, ContextType, RequireFields<MutationFieldEditArgs, '_id'>>;
  fieldGroupAdd?: Resolver<Maybe<ResolversTypes['FieldGroup']>, ParentType, ContextType, Partial<MutationFieldGroupAddArgs>>;
  fieldGroupEdit?: Resolver<Maybe<ResolversTypes['FieldGroup']>, ParentType, ContextType, RequireFields<MutationFieldGroupEditArgs, '_id'>>;
  fieldGroupRemove?: Resolver<Maybe<ResolversTypes['FieldGroup']>, ParentType, ContextType, RequireFields<MutationFieldGroupRemoveArgs, '_id'>>;
  fieldGroupsUpdateOrder?: Resolver<Maybe<Array<Maybe<ResolversTypes['FieldGroup']>>>, ParentType, ContextType, RequireFields<MutationFieldGroupsUpdateOrderArgs, 'orders'>>;
  fieldRemove?: Resolver<Maybe<ResolversTypes['Field']>, ParentType, ContextType, RequireFields<MutationFieldRemoveArgs, '_id'>>;
  forgotPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
  importCancel?: Resolver<Maybe<ResolversTypes['Import']>, ParentType, ContextType, RequireFields<MutationImportCancelArgs, 'importId'>>;
  importResume?: Resolver<Maybe<ResolversTypes['Import']>, ParentType, ContextType, RequireFields<MutationImportResumeArgs, 'importId'>>;
  importRetry?: Resolver<Maybe<ResolversTypes['Import']>, ParentType, ContextType, RequireFields<MutationImportRetryArgs, 'importId'>>;
  importStart?: Resolver<Maybe<ResolversTypes['Import']>, ParentType, ContextType, RequireFields<MutationImportStartArgs, 'entityType' | 'fileKey' | 'fileName'>>;
  internalNotesAdd?: Resolver<Maybe<ResolversTypes['InternalNote']>, ParentType, ContextType, RequireFields<MutationInternalNotesAddArgs, 'contentType'>>;
  internalNotesEdit?: Resolver<Maybe<ResolversTypes['InternalNote']>, ParentType, ContextType, RequireFields<MutationInternalNotesEditArgs, '_id'>>;
  internalNotesRemove?: Resolver<Maybe<ResolversTypes['InternalNote']>, ParentType, ContextType, RequireFields<MutationInternalNotesRemoveArgs, '_id'>>;
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  loginWithGoogle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  loginWithMagicLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLoginWithMagicLinkArgs, 'email'>>;
  logout?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  manageRelations?: Resolver<Maybe<Array<ResolversTypes['Relation']>>, ParentType, ContextType, RequireFields<MutationManageRelationsArgs, 'contentId' | 'contentType' | 'relatedContentType'>>;
  markAsReadNotifications?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationMarkAsReadNotificationsArgs>>;
  markNotificationAsRead?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationMarkNotificationAsReadArgs, '_id'>>;
  oauthClientAppsAdd?: Resolver<Maybe<ResolversTypes['OAuthClientApp']>, ParentType, ContextType, RequireFields<MutationOauthClientAppsAddArgs, 'name' | 'type'>>;
  oauthClientAppsEdit?: Resolver<Maybe<ResolversTypes['OAuthClientApp']>, ParentType, ContextType, RequireFields<MutationOauthClientAppsEditArgs, '_id' | 'name' | 'type'>>;
  oauthClientAppsRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationOauthClientAppsRemoveArgs, '_id'>>;
  oauthClientAppsRevoke?: Resolver<Maybe<ResolversTypes['OAuthClientApp']>, ParentType, ContextType, RequireFields<MutationOauthClientAppsRevokeArgs, '_id'>>;
  permissionGroupAdd?: Resolver<Maybe<ResolversTypes['PermissionGroup']>, ParentType, ContextType, RequireFields<MutationPermissionGroupAddArgs, 'name' | 'permissions'>>;
  permissionGroupEdit?: Resolver<Maybe<ResolversTypes['PermissionGroup']>, ParentType, ContextType, RequireFields<MutationPermissionGroupEditArgs, '_id'>>;
  permissionGroupRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationPermissionGroupRemoveArgs, '_id'>>;
  positionsAdd?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType, Partial<MutationPositionsAddArgs>>;
  positionsEdit?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType, RequireFields<MutationPositionsEditArgs, '_id'>>;
  positionsRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationPositionsRemoveArgs>>;
  productBulkSimilarityAdd?: Resolver<Maybe<ResolversTypes['ProductBulkSimilarity']>, ParentType, ContextType, RequireFields<MutationProductBulkSimilarityAddArgs, 'doc'>>;
  productBulkSimilarityEdit?: Resolver<Maybe<ResolversTypes['ProductBulkSimilarity']>, ParentType, ContextType, RequireFields<MutationProductBulkSimilarityEditArgs, '_id' | 'doc'>>;
  productBulkSimilarityRemove?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationProductBulkSimilarityRemoveArgs, '_id'>>;
  productCategoriesAdd?: Resolver<Maybe<ResolversTypes['ProductCategory']>, ParentType, ContextType, RequireFields<MutationProductCategoriesAddArgs, 'code' | 'name'>>;
  productCategoriesEdit?: Resolver<Maybe<ResolversTypes['ProductCategory']>, ParentType, ContextType, RequireFields<MutationProductCategoriesEditArgs, '_id' | 'code' | 'name'>>;
  productCategoriesRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationProductCategoriesRemoveArgs, '_id'>>;
  productPackagesAdd?: Resolver<Maybe<ResolversTypes['ProductPackage']>, ParentType, ContextType, Partial<MutationProductPackagesAddArgs>>;
  productPackagesChangeStatus?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductPackage']>>>, ParentType, ContextType, RequireFields<MutationProductPackagesChangeStatusArgs, '_ids' | 'status'>>;
  productPackagesEdit?: Resolver<Maybe<ResolversTypes['ProductPackage']>, ParentType, ContextType, RequireFields<MutationProductPackagesEditArgs, '_id'>>;
  productPackagesRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationProductPackagesRemoveArgs, '_ids'>>;
  productRulesAdd?: Resolver<Maybe<ResolversTypes['ProductRule']>, ParentType, ContextType, RequireFields<MutationProductRulesAddArgs, 'name' | 'unitPrice'>>;
  productRulesEdit?: Resolver<Maybe<ResolversTypes['ProductRule']>, ParentType, ContextType, RequireFields<MutationProductRulesEditArgs, '_id' | 'name' | 'unitPrice'>>;
  productRulesRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationProductRulesRemoveArgs>>;
  productsAdd?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, Partial<MutationProductsAddArgs>>;
  productsConfigsUpdate?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationProductsConfigsUpdateArgs, 'configsMap'>>;
  productsDuplicate?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationProductsDuplicateArgs, '_id'>>;
  productsEdit?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationProductsEditArgs, '_id'>>;
  productsMerge?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, Partial<MutationProductsMergeArgs>>;
  productsRemove?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationProductsRemoveArgs>>;
  propertySystemFieldEdit?: Resolver<ResolversTypes['PropertySystemField'], ParentType, ContextType, RequireFields<MutationPropertySystemFieldEditArgs, 'code' | 'contentType'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'newPassword' | 'token'>>;
  segmentsAdd?: Resolver<Maybe<ResolversTypes['Segment']>, ParentType, ContextType, RequireFields<MutationSegmentsAddArgs, 'contentType' | 'root'>>;
  segmentsEdit?: Resolver<Maybe<ResolversTypes['Segment']>, ParentType, ContextType, RequireFields<MutationSegmentsEditArgs, '_id' | 'root'>>;
  segmentsRebuild?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationSegmentsRebuildArgs, '_id'>>;
  segmentsRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationSegmentsRemoveArgs, 'ids'>>;
  segmentsStopRebuild?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationSegmentsStopRebuildArgs, '_id'>>;
  structuresAdd?: Resolver<Maybe<ResolversTypes['Structure']>, ParentType, ContextType, RequireFields<MutationStructuresAddArgs, 'title'>>;
  structuresEdit?: Resolver<Maybe<ResolversTypes['Structure']>, ParentType, ContextType, RequireFields<MutationStructuresEditArgs, '_id' | 'title'>>;
  structuresRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationStructuresRemoveArgs, '_id'>>;
  tagsAdd?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationTagsAddArgs, 'name'>>;
  tagsEdit?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationTagsEditArgs, '_id'>>;
  tagsRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationTagsRemoveArgs, '_id'>>;
  tagsTag?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationTagsTagArgs, 'tagIds' | 'targetIds' | 'type'>>;
  templateAdd?: Resolver<Maybe<ResolversTypes['Template']>, ParentType, ContextType, Partial<MutationTemplateAddArgs>>;
  templateCategoryAdd?: Resolver<Maybe<ResolversTypes['TemplateCategory']>, ParentType, ContextType, Partial<MutationTemplateCategoryAddArgs>>;
  templateCategoryEdit?: Resolver<Maybe<ResolversTypes['TemplateCategory']>, ParentType, ContextType, RequireFields<MutationTemplateCategoryEditArgs, '_id'>>;
  templateCategoryRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationTemplateCategoryRemoveArgs>>;
  templateEdit?: Resolver<Maybe<ResolversTypes['Template']>, ParentType, ContextType, RequireFields<MutationTemplateEditArgs, '_id'>>;
  templateRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationTemplateRemoveArgs>>;
  templateUse?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationTemplateUseArgs, '_id'>>;
  toggleFavorite?: Resolver<Maybe<ResolversTypes['Favorite']>, ParentType, ContextType, RequireFields<MutationToggleFavoriteArgs, 'path'>>;
  unitsAdd?: Resolver<Maybe<ResolversTypes['Unit']>, ParentType, ContextType, Partial<MutationUnitsAddArgs>>;
  unitsEdit?: Resolver<Maybe<ResolversTypes['Unit']>, ParentType, ContextType, RequireFields<MutationUnitsEditArgs, '_id'>>;
  unitsRemove?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationUnitsRemoveArgs>>;
  uomsAdd?: Resolver<Maybe<ResolversTypes['Uom']>, ParentType, ContextType, Partial<MutationUomsAddArgs>>;
  uomsEdit?: Resolver<Maybe<ResolversTypes['Uom']>, ParentType, ContextType, RequireFields<MutationUomsEditArgs, '_id'>>;
  uomsRemove?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationUomsRemoveArgs>>;
  updateNotificationSettingsChannel?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationUpdateNotificationSettingsChannelArgs>>;
  updateNotificationSettingsEvent?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationUpdateNotificationSettingsEventArgs>>;
  updateRelation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType, RequireFields<MutationUpdateRelationArgs, 'id' | 'relation'>>;
  userAddCustomPermission?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUserAddCustomPermissionArgs, 'permission' | 'userId'>>;
  userRemoveCustomPermission?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUserRemoveCustomPermissionArgs, 'module' | 'userId'>>;
  userUpdatePermissionGroups?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUserUpdatePermissionGroupsArgs, 'groupIds' | 'userId'>>;
  usersChangePassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUsersChangePasswordArgs, 'currentPassword' | 'newPassword'>>;
  usersConfigEmailSignatures?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationUsersConfigEmailSignaturesArgs>>;
  usersConfigGetNotificationByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationUsersConfigGetNotificationByEmailArgs>>;
  usersConfirmInvitation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationUsersConfirmInvitationArgs>>;
  usersCreateOwner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationUsersCreateOwnerArgs, 'email' | 'firstName' | 'password'>>;
  usersEdit?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUsersEditArgs, '_id'>>;
  usersEditProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUsersEditProfileArgs, 'email' | 'username'>>;
  usersInvite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationUsersInviteArgs>>;
  usersResendInvitation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationUsersResendInvitationArgs, 'email'>>;
  usersResetMemberPassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUsersResetMemberPasswordArgs, '_id' | 'newPassword'>>;
  usersSetActiveStatus?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUsersSetActiveStatusArgs, '_id'>>;
  usersSetActiveStatusBatch?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUsersSetActiveStatusBatchArgs, '_ids'>>;
  usersSetChatStatus?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUsersSetChatStatusArgs, '_id'>>;
  usersUpdatePermissionGroups?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationUsersUpdatePermissionGroupsArgs, 'groupIds' | 'userIds'>>;
}>;

export type NotificationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  action?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentTypeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  emailDelivery?: Resolver<Maybe<ResolversTypes['EmailDelivery']>, ParentType, ContextType>;
  fromUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  fromUserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isRead?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  kind?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type NotificationConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['NotificationConfig'] = ResolversParentTypes['NotificationConfig']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  action?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  emailSubject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailTemplateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  expiresAfterDays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  inAppEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type NotificationConfigListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['NotificationConfigListResponse'] = ResolversParentTypes['NotificationConfigListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['NotificationConfig']>>>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type NotificationModuleResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['NotificationModule'] = ResolversParentTypes['NotificationModule']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  events?: Resolver<Maybe<Array<Maybe<ResolversTypes['NotificationModuleEvent']>>>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type NotificationModuleEventResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['NotificationModuleEvent'] = ResolversParentTypes['NotificationModuleEvent']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type NotificationPluginTypeResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['NotificationPluginType'] = ResolversParentTypes['NotificationPluginType']> = ResolversObject<{
  modules?: Resolver<Maybe<Array<Maybe<ResolversTypes['NotificationModule']>>>, ParentType, ContextType>;
  pluginName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type NotificationSettingsResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['NotificationSettings'] = ResolversParentTypes['NotificationSettings']> = ResolversObject<{
  channels?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  events?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type NotificationsListResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['NotificationsList'] = ResolversParentTypes['NotificationsList']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Notification']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type OAuthClientAppResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['OAuthClientApp'] = ResolversParentTypes['OAuthClientApp']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accessTokenLifetime?: Resolver<Maybe<ResolversTypes['OAuthClientAccessTokenLifetime']>, ParentType, ContextType>;
  clientId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  generatedSecret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastUsedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  redirectUrls?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['OAuthClientAppStatus']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['OAuthClientAppType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type OtpConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['OTPConfig'] = ResolversParentTypes['OTPConfig']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['OTPEmailConfig']>, ParentType, ContextType>;
  sms?: Resolver<Maybe<ResolversTypes['OTPSMSConfig']>, ParentType, ContextType>;
}>;

export type OtpEmailConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['OTPEmailConfig'] = ResolversParentTypes['OTPEmailConfig']> = ResolversObject<{
  codeLength?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  emailSubject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enableEmailVerification?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  enablePasswordlessLogin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  messageTemplate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type OtpResendConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['OTPResendConfig'] = ResolversParentTypes['OTPResendConfig']> = ResolversObject<{
  cooldownPeriodInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxAttemptsPerHour?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type OtpsmsConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['OTPSMSConfig'] = ResolversParentTypes['OTPSMSConfig']> = ResolversObject<{
  codeLength?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  enablePasswordlessLogin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  enablePhoneVerification?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  messageTemplate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  smsProvider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type OrganizationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = ResolversObject<{
  bundleNames?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  charge?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  contactRemaining?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  experience?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  experienceName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiryDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isPaid?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isWhiteLabel?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  onboardedPlugins?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  plan?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  promoCodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  purchased?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  setupService?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  subdomain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type PackageProductResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PackageProduct'] = ResolversParentTypes['PackageProduct']> = ResolversObject<{
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasPreviousPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type PasswordVerificationConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PasswordVerificationConfig'] = ResolversParentTypes['PasswordVerificationConfig']> = ResolversObject<{
  emailContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailSubject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  smsContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verifyByOTP?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type PdfAttachmentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PdfAttachment'] = ResolversParentTypes['PdfAttachment']> = ResolversObject<{
  pages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attachment']>>>, ParentType, ContextType>;
  pdf?: Resolver<Maybe<ResolversTypes['Attachment']>, ParentType, ContextType>;
}>;

export type PermissionActionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PermissionAction'] = ResolversParentTypes['PermissionAction']> = ResolversObject<{
  always?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  disabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type PermissionGroupResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PermissionGroup'] = ResolversParentTypes['PermissionGroup']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Array<Maybe<ResolversTypes['PermissionGroupPermission']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type PermissionGroupPermissionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PermissionGroupPermission'] = ResolversParentTypes['PermissionGroupPermission']> = ResolversObject<{
  actions?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  module?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plugin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type PermissionModuleResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PermissionModule'] = ResolversParentTypes['PermissionModule']> = ResolversObject<{
  actions?: Resolver<Array<Maybe<ResolversTypes['PermissionAction']>>, ParentType, ContextType>;
  always?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerFields?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  plugin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scopeField?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scopes?: Resolver<Maybe<Array<Maybe<ResolversTypes['PermissionScopeDescription']>>>, ParentType, ContextType>;
}>;

export type PermissionModulesByPluginResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PermissionModulesByPlugin'] = ResolversParentTypes['PermissionModulesByPlugin']> = ResolversObject<{
  modules?: Resolver<Array<Maybe<ResolversTypes['PermissionModule']>>, ParentType, ContextType>;
  plugin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type PermissionScopeDescriptionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PermissionScopeDescription'] = ResolversParentTypes['PermissionScopeDescription']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type PositionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Position'] = ResolversParentTypes['Position'], FederationReferenceType extends FederationReferenceTypes['Position'] = FederationReferenceTypes['Position']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Position']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['Position']>>>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
}>;

export type PositionListQueryResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PositionListQueryResponse'] = ResolversParentTypes['PositionListQueryResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Position']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ProductResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product'], FederationReferenceType extends FederationReferenceTypes['Product'] = FederationReferenceTypes['Product']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Product']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  attachment?: Resolver<Maybe<ResolversTypes['Attachment']>, ParentType, ContextType>;
  attachmentMore?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attachment']>>>, ParentType, ContextType>;
  barcodeDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  barcodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['ProductCategory']>, ParentType, ContextType>;
  categoryId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discount?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<ProductDiscountArgs>>;
  discounts?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  durationType?: Resolver<Maybe<ResolversTypes['ProductDurationType']>, ParentType, ContextType>;
  hasSimilarity?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  inventories?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pdfAttachment?: Resolver<Maybe<ResolversTypes['PdfAttachment']>, ParentType, ContextType>;
  propertiesData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  remainder?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  scopeBrandIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  shortName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  similarity?: Resolver<Maybe<ResolversTypes['ProductBulkSimilarity']>, ParentType, ContextType>;
  similarityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subUoms?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  tagIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unitPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  uom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  variants?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  vendor?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  vendorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attachment']>>>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
}>;

export type ProductBulkSimilarityResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProductBulkSimilarity'] = ResolversParentTypes['ProductBulkSimilarity']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  fields?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductSimilarityField']>>>, ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  productIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  propertiesData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  starProductId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type ProductCategoryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProductCategory'] = ResolversParentTypes['ProductCategory'], FederationReferenceType extends FederationReferenceTypes['ProductCategory'] = FederationReferenceTypes['ProductCategory']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['ProductCategory']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  attachment?: Resolver<Maybe<ResolversTypes['Attachment']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isRoot?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isSimilarity?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  mask?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  maskType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  meta?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  scopeBrandIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  similarities?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ProductPackageResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProductPackage'] = ResolversParentTypes['ProductPackage']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coverImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  percent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['PackageProduct']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  totalPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type ProductPackagesListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProductPackagesListResponse'] = ResolversParentTypes['ProductPackagesListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductPackage']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ProductRuleResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProductRule'] = ResolversParentTypes['ProductRule']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bundleId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductCategory']>>>, ParentType, ContextType>;
  categoryIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  excludeCategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductCategory']>>>, ParentType, ContextType>;
  excludeCategoryIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  excludeProductIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  excludeProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  excludeTagIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  excludeTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  tagIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  unitPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
}>;

export type ProductRulesCountResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProductRulesCount'] = ResolversParentTypes['ProductRulesCount']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductRule']>>>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ProductSimilarityResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProductSimilarity'] = ResolversParentTypes['ProductSimilarity']> = ResolversObject<{
  groups?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductSimilarityGroup']>>>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
}>;

export type ProductSimilarityFieldResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProductSimilarityField'] = ResolversParentTypes['ProductSimilarityField']> = ResolversObject<{
  fieldId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  values?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
}>;

export type ProductSimilarityGroupResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProductSimilarityGroup'] = ResolversParentTypes['ProductSimilarityGroup']> = ResolversObject<{
  fieldId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ProductsConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProductsConfig'] = ResolversParentTypes['ProductsConfig'], FederationReferenceType extends FederationReferenceTypes['ProductsConfig'] = FederationReferenceTypes['ProductsConfig']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['ProductsConfig']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
}>;

export type ProductsListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProductsListResponse'] = ResolversParentTypes['ProductsListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type PropertySystemFieldResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PropertySystemField'] = ResolversParentTypes['PropertySystemField']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isRequired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVisible?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVisibleToCreate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  logics?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type PropertyTypeResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['PropertyType'] = ResolversParentTypes['PropertyType']> = ResolversObject<{
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _sentryGraphqlTest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  activeExports?: Resolver<Maybe<Array<Maybe<ResolversTypes['Export']>>>, ParentType, ContextType, Partial<QueryActiveExportsArgs>>;
  activeImports?: Resolver<Maybe<Array<Maybe<ResolversTypes['Import']>>>, ParentType, ContextType, Partial<QueryActiveImportsArgs>>;
  activityLogs?: Resolver<Maybe<ResolversTypes['ActivityLogsList']>, ParentType, ContextType, RequireFields<QueryActivityLogsArgs, 'targetId'>>;
  allBrands?: Resolver<Maybe<Array<Maybe<ResolversTypes['Brand']>>>, ParentType, ContextType>;
  allBundleConditions?: Resolver<Maybe<Array<Maybe<ResolversTypes['BundleCondition']>>>, ParentType, ContextType>;
  allUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, Partial<QueryAllUsersArgs>>;
  appDetail?: Resolver<Maybe<ResolversTypes['App']>, ParentType, ContextType, Partial<QueryAppDetailArgs>>;
  approvalLockState?: Resolver<Maybe<ResolversTypes['ApprovalLockState']>, ParentType, ContextType, RequireFields<QueryApprovalLockStateArgs, 'contentId' | 'contentType'>>;
  approvalLockStates?: Resolver<Maybe<Array<Maybe<ResolversTypes['ApprovalLockState']>>>, ParentType, ContextType, RequireFields<QueryApprovalLockStatesArgs, 'contentIds' | 'contentType'>>;
  approvalRequestDetail?: Resolver<Maybe<ResolversTypes['ApprovalRequest']>, ParentType, ContextType, RequireFields<QueryApprovalRequestDetailArgs, '_id'>>;
  approvalRequests?: Resolver<Maybe<ResolversTypes['ApprovalRequestsList']>, ParentType, ContextType, Partial<QueryApprovalRequestsArgs>>;
  apps?: Resolver<Maybe<Array<Maybe<ResolversTypes['App']>>>, ParentType, ContextType, Partial<QueryAppsArgs>>;
  appsTotalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryAppsTotalCountArgs>>;
  automationBotsConstants?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  automationConstants?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  automationDetail?: Resolver<Maybe<ResolversTypes['Automation']>, ParentType, ContextType, RequireFields<QueryAutomationDetailArgs, '_id'>>;
  automationExecutionCounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['AutomationStatsCount']>>>, ParentType, ContextType, RequireFields<QueryAutomationExecutionCountsArgs, 'automationIds'>>;
  automationHistories?: Resolver<Maybe<ResolversTypes['AutomationHistories']>, ParentType, ContextType, RequireFields<QueryAutomationHistoriesArgs, 'automationId'>>;
  automationHistoriesTotalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<QueryAutomationHistoriesTotalCountArgs, 'automationId'>>;
  automationNodeOutput?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryAutomationNodeOutputArgs, 'nodeType'>>;
  automationReferenceFields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryAutomationReferenceFieldsArgs, 'field' | 'type'>>;
  automationSetPropertyTargets?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryAutomationSetPropertyTargetsArgs, 'sourceType'>>;
  automationStats?: Resolver<Maybe<ResolversTypes['AutomationStats']>, ParentType, ContextType, RequireFields<QueryAutomationStatsArgs, 'automationId'>>;
  automationWorkflowTemplates?: Resolver<Maybe<Array<Maybe<ResolversTypes['AutomationWorkflowTemplate']>>>, ParentType, ContextType, Partial<QueryAutomationWorkflowTemplatesArgs>>;
  automations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Automation']>>>, ParentType, ContextType, Partial<QueryAutomationsArgs>>;
  automationsAiAgentDetail?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<QueryAutomationsAiAgentDetailArgs>>;
  automationsAiAgentHealth?: Resolver<ResolversTypes['AiAgentHealth'], ParentType, ContextType, RequireFields<QueryAutomationsAiAgentHealthArgs, 'agentId'>>;
  automationsAiAgentKnowledgeSourceStatuses?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryAutomationsAiAgentKnowledgeSourceStatusesArgs, 'agentId'>>;
  automationsAiAgentTotalCounts?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  automationsAiAgents?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<QueryAutomationsAiAgentsArgs>>;
  automationsMain?: Resolver<Maybe<ResolversTypes['AutomationsListResponse']>, ParentType, ContextType, Partial<QueryAutomationsMainArgs>>;
  automationsTotalCount?: Resolver<Maybe<ResolversTypes['automationsTotalCountResponse']>, ParentType, ContextType, Partial<QueryAutomationsTotalCountArgs>>;
  beforeResolverAvailable?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryBeforeResolverAvailableArgs, 'resolver'>>;
  branchDetail?: Resolver<Maybe<ResolversTypes['Branch']>, ParentType, ContextType, RequireFields<QueryBranchDetailArgs, '_id'>>;
  branches?: Resolver<Maybe<Array<Maybe<ResolversTypes['Branch']>>>, ParentType, ContextType, Partial<QueryBranchesArgs>>;
  branchesMain?: Resolver<Maybe<ResolversTypes['BranchesListResponse']>, ParentType, ContextType, Partial<QueryBranchesMainArgs>>;
  brandDetail?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType, RequireFields<QueryBrandDetailArgs, '_id'>>;
  brands?: Resolver<Maybe<ResolversTypes['BrandListResponse']>, ParentType, ContextType, Partial<QueryBrandsArgs>>;
  brandsGetLast?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType>;
  brandsTotalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  broadcastEmailDryRun?: Resolver<Maybe<ResolversTypes['BroadcastEmailDryRun']>, ParentType, ContextType, RequireFields<QueryBroadcastEmailDryRunArgs, '_id'>>;
  broadcastRecipientEmail?: Resolver<Maybe<ResolversTypes['BroadcastRecipientEmail']>, ParentType, ContextType, RequireFields<QueryBroadcastRecipientEmailArgs, '_id'>>;
  bundleConditionDetail?: Resolver<Maybe<ResolversTypes['BundleCondition']>, ParentType, ContextType, RequireFields<QueryBundleConditionDetailArgs, '_id'>>;
  bundleConditionTotalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bundleConditions?: Resolver<Maybe<Array<Maybe<ResolversTypes['BundleCondition']>>>, ParentType, ContextType, Partial<QueryBundleConditionsArgs>>;
  bundleRuleDetail?: Resolver<Maybe<ResolversTypes['BundleRule']>, ParentType, ContextType, RequireFields<QueryBundleRuleDetailArgs, '_id'>>;
  bundleRules?: Resolver<Maybe<Array<Maybe<ResolversTypes['BundleRule']>>>, ParentType, ContextType>;
  categoriesWithChilds?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductCategory']>>>, ParentType, ContextType, RequireFields<QueryCategoriesWithChildsArgs, 'ids'>>;
  clientPortalComment?: Resolver<Maybe<ResolversTypes['CPComment']>, ParentType, ContextType, RequireFields<QueryClientPortalCommentArgs, '_id'>>;
  clientPortalComments?: Resolver<Maybe<ResolversTypes['CPCommentListResponse']>, ParentType, ContextType, Partial<QueryClientPortalCommentsArgs>>;
  clientPortalCurrentUser?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType>;
  clientPortalNotificationDetail?: Resolver<Maybe<ResolversTypes['CPNotification']>, ParentType, ContextType, RequireFields<QueryClientPortalNotificationDetailArgs, '_id'>>;
  clientPortalNotifications?: Resolver<Maybe<ResolversTypes['CPNotificationListResponse']>, ParentType, ContextType, Partial<QueryClientPortalNotificationsArgs>>;
  clientPortalUnreadNotificationCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryClientPortalUnreadNotificationCountArgs>>;
  companies?: Resolver<Maybe<ResolversTypes['CompaniesListResponse']>, ParentType, ContextType, Partial<QueryCompaniesArgs>>;
  companyDetail?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<QueryCompanyDetailArgs, '_id'>>;
  configs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Config']>>>, ParentType, ContextType>;
  configsByCode?: Resolver<Maybe<Array<Maybe<ResolversTypes['Config']>>>, ParentType, ContextType, Partial<QueryConfigsByCodeArgs>>;
  configsCheckActivateInstallation?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryConfigsCheckActivateInstallationArgs, 'hostname'>>;
  configsCheckPremiumService?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryConfigsCheckPremiumServiceArgs, 'type'>>;
  configsConstants?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  configsFileUploadInfo?: Resolver<Maybe<ResolversTypes['FileUploadServiceInfo']>, ParentType, ContextType>;
  configsGetEmailTemplate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<QueryConfigsGetEmailTemplateArgs>>;
  configsGetEnv?: Resolver<Maybe<ResolversTypes['ENV']>, ParentType, ContextType>;
  configsGetInstallationStatus?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryConfigsGetInstallationStatusArgs, 'name'>>;
  configsGetValue?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryConfigsGetValueArgs, 'code'>>;
  configsGetVersion?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<QueryConfigsGetVersionArgs>>;
  contactsLogs?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<QueryContactsLogsArgs>>;
  coreModulesGlobalSearch?: Resolver<Maybe<ResolversTypes['CoreModulesGlobalSearchResult']>, ParentType, ContextType, Partial<QueryCoreModulesGlobalSearchArgs>>;
  cpAutomationDetail?: Resolver<Maybe<ResolversTypes['Automation']>, ParentType, ContextType, RequireFields<QueryCpAutomationDetailArgs, '_id'>>;
  cpBranchDetail?: Resolver<Maybe<ResolversTypes['Branch']>, ParentType, ContextType, RequireFields<QueryCpBranchDetailArgs, '_id'>>;
  cpBranches?: Resolver<Maybe<Array<Maybe<ResolversTypes['Branch']>>>, ParentType, ContextType, Partial<QueryCpBranchesArgs>>;
  cpBranchesMain?: Resolver<Maybe<ResolversTypes['BranchesListResponse']>, ParentType, ContextType, Partial<QueryCpBranchesMainArgs>>;
  cpCompanies?: Resolver<Maybe<ResolversTypes['CompaniesListResponse']>, ParentType, ContextType, Partial<QueryCpCompaniesArgs>>;
  cpCustomerDetail?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<QueryCpCustomerDetailArgs, '_id'>>;
  cpCustomers?: Resolver<Maybe<ResolversTypes['CustomersListResponse']>, ParentType, ContextType, Partial<QueryCpCustomersArgs>>;
  cpDepartments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Department']>>>, ParentType, ContextType, Partial<QueryCpDepartmentsArgs>>;
  cpFieldDetail?: Resolver<Maybe<ResolversTypes['Field']>, ParentType, ContextType, RequireFields<QueryCpFieldDetailArgs, '_id'>>;
  cpFieldGroups?: Resolver<Maybe<Array<Maybe<ResolversTypes['FieldGroup']>>>, ParentType, ContextType, Partial<QueryCpFieldGroupsArgs>>;
  cpFields?: Resolver<Maybe<Array<Maybe<ResolversTypes['Field']>>>, ParentType, ContextType, Partial<QueryCpFieldsArgs>>;
  cpGetRelationsByEntity?: Resolver<Maybe<Array<ResolversTypes['Relation']>>, ParentType, ContextType, RequireFields<QueryCpGetRelationsByEntityArgs, 'contentId' | 'contentType' | 'relatedContentType'>>;
  cpProductCategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductCategory']>>>, ParentType, ContextType, Partial<QueryCpProductCategoriesArgs>>;
  cpProductDetail?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryCpProductDetailArgs>>;
  cpProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, Partial<QueryCpProductsArgs>>;
  cpTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType, Partial<QueryCpTagsArgs>>;
  cpUnits?: Resolver<Maybe<Array<Maybe<ResolversTypes['CPUnit']>>>, ParentType, ContextType, Partial<QueryCpUnitsArgs>>;
  cpUoms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Uom']>>>, ParentType, ContextType>;
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  currentUserPermissions?: Resolver<Maybe<ResolversTypes['CurrentUserPermissionsResult']>, ParentType, ContextType>;
  customerDetail?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<QueryCustomerDetailArgs, '_id'>>;
  customers?: Resolver<Maybe<ResolversTypes['CustomersListResponse']>, ParentType, ContextType, Partial<QueryCustomersArgs>>;
  customersCount?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<QueryCustomersCountArgs>>;
  departmentDetail?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType, RequireFields<QueryDepartmentDetailArgs, '_id'>>;
  departments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Department']>>>, ParentType, ContextType, Partial<QueryDepartmentsArgs>>;
  departmentsMain?: Resolver<Maybe<ResolversTypes['DepartmentsListResponse']>, ParentType, ContextType, Partial<QueryDepartmentsMainArgs>>;
  documents?: Resolver<Maybe<ResolversTypes['DocumentListResponse']>, ParentType, ContextType, Partial<QueryDocumentsArgs>>;
  documentsDetail?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType, RequireFields<QueryDocumentsDetailArgs, '_id'>>;
  documentsGetEditorAttributes?: Resolver<Maybe<Array<Maybe<ResolversTypes['DocumentEditorAttribute']>>>, ParentType, ContextType, RequireFields<QueryDocumentsGetEditorAttributesArgs, 'contentType'>>;
  documentsProcess?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<QueryDocumentsProcessArgs>>;
  documentsTotalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryDocumentsTotalCountArgs>>;
  documentsTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['DocumentsTypes']>>>, ParentType, ContextType>;
  emailAddresses?: Resolver<Maybe<ResolversTypes['EmailAddressesList']>, ParentType, ContextType, Partial<QueryEmailAddressesArgs>>;
  emailContentPreview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<QueryEmailContentPreviewArgs>>;
  emailDeliveries?: Resolver<Maybe<ResolversTypes['EmailDeliveriesList']>, ParentType, ContextType, Partial<QueryEmailDeliveriesArgs>>;
  emailDeliveryDetail?: Resolver<Maybe<ResolversTypes['EmailDelivery']>, ParentType, ContextType, RequireFields<QueryEmailDeliveryDetailArgs, '_id'>>;
  emailRampStatus?: Resolver<Maybe<ResolversTypes['EmailRampStatus']>, ParentType, ContextType>;
  emailSenderOptions?: Resolver<Maybe<ResolversTypes['EmailSenderOptions']>, ParentType, ContextType, Partial<QueryEmailSenderOptionsArgs>>;
  emailTemplateDetail?: Resolver<Maybe<ResolversTypes['EmailTemplate']>, ParentType, ContextType, RequireFields<QueryEmailTemplateDetailArgs, '_id'>>;
  emailTemplates?: Resolver<Maybe<ResolversTypes['EmailTemplatesListResponse']>, ParentType, ContextType, Partial<QueryEmailTemplatesArgs>>;
  enabledServices?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  engageBroadcastRecipients?: Resolver<Maybe<ResolversTypes['BroadcastRecipientListResponse']>, ParentType, ContextType, RequireFields<QueryEngageBroadcastRecipientsArgs, 'runId'>>;
  engageBroadcastRuns?: Resolver<Maybe<Array<Maybe<ResolversTypes['BroadcastRun']>>>, ParentType, ContextType, RequireFields<QueryEngageBroadcastRunsArgs, 'engageMessageId'>>;
  engageBroadcastTraces?: Resolver<Maybe<Array<Maybe<ResolversTypes['BroadcastTrace']>>>, ParentType, ContextType, RequireFields<QueryEngageBroadcastTracesArgs, 'engageMessageId'>>;
  engageEmailPercentages?: Resolver<Maybe<ResolversTypes['AvgEmailStats']>, ParentType, ContextType>;
  engageMembers?: Resolver<Maybe<ResolversTypes['EngageMemberListResponse']>, ParentType, ContextType, Partial<QueryEngageMembersArgs>>;
  engageMessageCounts?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryEngageMessageCountsArgs, 'name'>>;
  engageMessageDetail?: Resolver<Maybe<ResolversTypes['EngageMessage']>, ParentType, ContextType, Partial<QueryEngageMessageDetailArgs>>;
  engageMessages?: Resolver<Maybe<ResolversTypes['EngageMessageListResponse']>, ParentType, ContextType, Partial<QueryEngageMessagesArgs>>;
  engageMessagesTotalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryEngageMessagesTotalCountArgs>>;
  engageReportsList?: Resolver<Maybe<ResolversTypes['EngageDeliveryReport']>, ParentType, ContextType, Partial<QueryEngageReportsListArgs>>;
  engageScheduleCalendar?: Resolver<Maybe<Array<Maybe<ResolversTypes['EngageCalendarEntry']>>>, ParentType, ContextType, RequireFields<QueryEngageScheduleCalendarArgs, 'from' | 'to'>>;
  engageSchedulePreview?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryEngageSchedulePreviewArgs, 'recurrence'>>;
  engageSmsDeliveries?: Resolver<Maybe<ResolversTypes['DeliveryList']>, ParentType, ContextType, RequireFields<QueryEngageSmsDeliveriesArgs, 'type'>>;
  engageVerifiedEmails?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  engagesConfigDetail?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  exportHeaders?: Resolver<Maybe<Array<Maybe<ResolversTypes['ExportHeader']>>>, ParentType, ContextType, RequireFields<QueryExportHeadersArgs, 'entityType'>>;
  exportHistories?: Resolver<Maybe<ResolversTypes['ExportHistoryList']>, ParentType, ContextType, Partial<QueryExportHistoriesArgs>>;
  exportProgress?: Resolver<Maybe<ResolversTypes['Export']>, ParentType, ContextType, RequireFields<QueryExportProgressArgs, 'exportId'>>;
  fieldDetail?: Resolver<Maybe<ResolversTypes['Field']>, ParentType, ContextType, RequireFields<QueryFieldDetailArgs, '_id'>>;
  fieldGroups?: Resolver<Maybe<ResolversTypes['FieldGroupListResponse']>, ParentType, ContextType, Partial<QueryFieldGroupsArgs>>;
  fields?: Resolver<Maybe<ResolversTypes['FieldListResponse']>, ParentType, ContextType, Partial<QueryFieldsArgs>>;
  fieldsCombinedByContentType?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryFieldsCombinedByContentTypeArgs, 'contentType'>>;
  getAutomationExecutionDetail?: Resolver<Maybe<ResolversTypes['AutomationHistory']>, ParentType, ContextType, RequireFields<QueryGetAutomationExecutionDetailArgs, 'executionId'>>;
  getAutomationWebhookEndpoint?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryGetAutomationWebhookEndpointArgs, '_id'>>;
  getCPExamplePosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['CPExamplePost']>>>, ParentType, ContextType>;
  getClientPortal?: Resolver<Maybe<ResolversTypes['ClientPortal']>, ParentType, ContextType, Partial<QueryGetClientPortalArgs>>;
  getClientPortalNotificationsByCpUserId?: Resolver<Maybe<ResolversTypes['CPNotificationListResponse']>, ParentType, ContextType, RequireFields<QueryGetClientPortalNotificationsByCpUserIdArgs, 'cpUserId'>>;
  getClientPortalUser?: Resolver<Maybe<ResolversTypes['CPUser']>, ParentType, ContextType, RequireFields<QueryGetClientPortalUserArgs, '_id'>>;
  getClientPortalUsers?: Resolver<Maybe<ResolversTypes['CPUserListResponse']>, ParentType, ContextType, Partial<QueryGetClientPortalUsersArgs>>;
  getClientPortals?: Resolver<Maybe<ResolversTypes['ClientPortalListResponse']>, ParentType, ContextType, Partial<QueryGetClientPortalsArgs>>;
  getFavoritesByCurrentUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['Favorite']>>>, ParentType, ContextType>;
  getRelationsByEntities?: Resolver<Maybe<Array<ResolversTypes['Relation']>>, ParentType, ContextType, RequireFields<QueryGetRelationsByEntitiesArgs, 'contentIds' | 'contentTypes'>>;
  getRelationsByEntity?: Resolver<Maybe<Array<ResolversTypes['Relation']>>, ParentType, ContextType, RequireFields<QueryGetRelationsByEntityArgs, 'contentId' | 'contentType' | 'relatedContentType'>>;
  importColumnPreview?: Resolver<Maybe<ResolversTypes['ImportColumnPreview']>, ParentType, ContextType, RequireFields<QueryImportColumnPreviewArgs, 'entityType' | 'fileKey' | 'fileName'>>;
  importExportTypes?: Resolver<Array<ResolversTypes['ImportExportType']>, ParentType, ContextType, RequireFields<QueryImportExportTypesArgs, 'operation'>>;
  importFields?: Resolver<Maybe<Array<Maybe<ResolversTypes['ImportPreviewField']>>>, ParentType, ContextType, RequireFields<QueryImportFieldsArgs, 'entityType'>>;
  importHistories?: Resolver<Maybe<ResolversTypes['ImportHistoryList']>, ParentType, ContextType, Partial<QueryImportHistoriesArgs>>;
  importProgress?: Resolver<Maybe<ResolversTypes['Import']>, ParentType, ContextType, RequireFields<QueryImportProgressArgs, 'importId'>>;
  internalNoteDetail?: Resolver<Maybe<ResolversTypes['InternalNote']>, ParentType, ContextType, RequireFields<QueryInternalNoteDetailArgs, '_id'>>;
  internalNotes?: Resolver<Maybe<Array<Maybe<ResolversTypes['InternalNote']>>>, ParentType, ContextType, RequireFields<QueryInternalNotesArgs, 'contentType'>>;
  internalNotesAsLogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType, RequireFields<QueryInternalNotesAsLogsArgs, 'contentTypeId'>>;
  internalNotesByAction?: Resolver<Maybe<ResolversTypes['InternalNotesByAction']>, ParentType, ContextType, Partial<QueryInternalNotesByActionArgs>>;
  isFavorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryIsFavoriteArgs, 'path'>>;
  logDetail?: Resolver<Maybe<ResolversTypes['Log']>, ParentType, ContextType, RequireFields<QueryLogDetailArgs, '_id'>>;
  logsGetContentTypes?: Resolver<Array<ResolversTypes['LogContentType']>, ParentType, ContextType>;
  logsMainList?: Resolver<Maybe<ResolversTypes['MainLogsList']>, ParentType, ContextType, Partial<QueryLogsMainListArgs>>;
  notificationDetail?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType, RequireFields<QueryNotificationDetailArgs, '_id'>>;
  notificationSettings?: Resolver<Maybe<ResolversTypes['NotificationSettings']>, ParentType, ContextType>;
  notifications?: Resolver<Maybe<ResolversTypes['NotificationsList']>, ParentType, ContextType, Partial<QueryNotificationsArgs>>;
  oauthClientAppDetail?: Resolver<Maybe<ResolversTypes['OAuthClientApp']>, ParentType, ContextType, RequireFields<QueryOauthClientAppDetailArgs, '_id'>>;
  oauthClientApps?: Resolver<Maybe<Array<Maybe<ResolversTypes['OAuthClientApp']>>>, ParentType, ContextType, Partial<QueryOauthClientAppsArgs>>;
  oauthClientAppsTotalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryOauthClientAppsTotalCountArgs>>;
  permissionDefaultGroups?: Resolver<Maybe<Array<Maybe<ResolversTypes['DefaultPermissionGroup']>>>, ParentType, ContextType>;
  permissionGroupDetail?: Resolver<Maybe<ResolversTypes['PermissionGroup']>, ParentType, ContextType, RequireFields<QueryPermissionGroupDetailArgs, 'id'>>;
  permissionGroups?: Resolver<Maybe<Array<Maybe<ResolversTypes['PermissionGroup']>>>, ParentType, ContextType>;
  permissionModules?: Resolver<Maybe<Array<Maybe<ResolversTypes['PermissionModulesByPlugin']>>>, ParentType, ContextType>;
  pluginsNotifications?: Resolver<Maybe<Array<Maybe<ResolversTypes['NotificationPluginType']>>>, ParentType, ContextType>;
  positionDetail?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType, Partial<QueryPositionDetailArgs>>;
  positions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Position']>>>, ParentType, ContextType, Partial<QueryPositionsArgs>>;
  positionsMain?: Resolver<Maybe<ResolversTypes['PositionListQueryResponse']>, ParentType, ContextType, Partial<QueryPositionsMainArgs>>;
  productBulkSimilarities?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductBulkSimilarity']>>>, ParentType, ContextType, Partial<QueryProductBulkSimilaritiesArgs>>;
  productBulkSimilaritiesTotalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryProductBulkSimilaritiesTotalCountArgs>>;
  productBulkSimilarity?: Resolver<Maybe<ResolversTypes['ProductBulkSimilarity']>, ParentType, ContextType, RequireFields<QueryProductBulkSimilarityArgs, '_id'>>;
  productCategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductCategory']>>>, ParentType, ContextType, Partial<QueryProductCategoriesArgs>>;
  productCategoriesTotalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryProductCategoriesTotalCountArgs>>;
  productCategoryDetail?: Resolver<Maybe<ResolversTypes['ProductCategory']>, ParentType, ContextType, Partial<QueryProductCategoryDetailArgs>>;
  productCountByTags?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  productDetail?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryProductDetailArgs>>;
  productLastCodeByCategory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<QueryProductLastCodeByCategoryArgs>>;
  productPackageDetail?: Resolver<Maybe<ResolversTypes['ProductPackage']>, ParentType, ContextType, RequireFields<QueryProductPackageDetailArgs, '_id'>>;
  productPackages?: Resolver<Maybe<ResolversTypes['ProductPackagesListResponse']>, ParentType, ContextType, Partial<QueryProductPackagesArgs>>;
  productRules?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductRule']>>>, ParentType, ContextType>;
  productRulesWithCount?: Resolver<Maybe<ResolversTypes['ProductRulesCount']>, ParentType, ContextType>;
  productSimilarities?: Resolver<Maybe<ResolversTypes['ProductSimilarity']>, ParentType, ContextType, RequireFields<QueryProductSimilaritiesArgs, '_id'>>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, Partial<QueryProductsArgs>>;
  productsConfigs?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductsConfig']>>>, ParentType, ContextType>;
  productsMain?: Resolver<Maybe<ResolversTypes['ProductsListResponse']>, ParentType, ContextType, Partial<QueryProductsMainArgs>>;
  productsTotalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryProductsTotalCountArgs>>;
  propertySystemFields?: Resolver<Array<ResolversTypes['PropertySystemField']>, ParentType, ContextType, RequireFields<QueryPropertySystemFieldsArgs, 'contentType'>>;
  propertyTypes?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  recordReferenceFields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryRecordReferenceFieldsArgs, 'type'>>;
  recordReferenceResolvePlaceholders?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryRecordReferenceResolvePlaceholdersArgs, 'targetType'>>;
  search?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'value'>>;
  segmentDetail?: Resolver<Maybe<ResolversTypes['Segment']>, ParentType, ContextType, RequireFields<QuerySegmentDetailArgs, '_id'>>;
  segmentFields?: Resolver<Array<ResolversTypes['SegmentField']>, ParentType, ContextType, RequireFields<QuerySegmentFieldsArgs, 'contentType'>>;
  segmentGrowth?: Resolver<Array<ResolversTypes['SegmentDay']>, ParentType, ContextType, RequireFields<QuerySegmentGrowthArgs, 'segmentId'>>;
  segmentMemberCount?: Resolver<ResolversTypes['SegmentMemberCount'], ParentType, ContextType, RequireFields<QuerySegmentMemberCountArgs, 'segmentId'>>;
  segmentMembers?: Resolver<ResolversTypes['SegmentMemberPage'], ParentType, ContextType, RequireFields<QuerySegmentMembersArgs, 'segmentId'>>;
  segmentRelations?: Resolver<Array<ResolversTypes['SegmentRelation']>, ParentType, ContextType, RequireFields<QuerySegmentRelationsArgs, 'subjectType'>>;
  segmentSameDefinition?: Resolver<Maybe<ResolversTypes['Segment']>, ParentType, ContextType, RequireFields<QuerySegmentSameDefinitionArgs, 'contentType' | 'root'>>;
  segmentUsage?: Resolver<Array<ResolversTypes['SegmentUsage']>, ParentType, ContextType, RequireFields<QuerySegmentUsageArgs, 'ids'>>;
  segments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Segment']>>>, ParentType, ContextType, RequireFields<QuerySegmentsArgs, 'contentTypes'>>;
  segmentsGetTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  segmentsPreviewCount?: Resolver<ResolversTypes['SegmentMemberCount'], ParentType, ContextType, RequireFields<QuerySegmentsPreviewCountArgs, 'contentType' | 'root'>>;
  settingsGlobalSearch?: Resolver<Maybe<ResolversTypes['SettingsGlobalSearchResult']>, ParentType, ContextType, Partial<QuerySettingsGlobalSearchArgs>>;
  structureDetail?: Resolver<Maybe<ResolversTypes['Structure']>, ParentType, ContextType>;
  tagDetail?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagDetailArgs, '_id'>>;
  tags?: Resolver<Maybe<ResolversTypes['TagsListResponse']>, ParentType, ContextType, Partial<QueryTagsArgs>>;
  tagsGetTypes?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  tagsMain?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType, Partial<QueryTagsMainArgs>>;
  tagsQueryCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryTagsQueryCountArgs>>;
  templateCategories?: Resolver<Maybe<ResolversTypes['TemplateCategoryListResponse']>, ParentType, ContextType, Partial<QueryTemplateCategoriesArgs>>;
  templateCategory?: Resolver<Maybe<ResolversTypes['TemplateCategory']>, ParentType, ContextType, Partial<QueryTemplateCategoryArgs>>;
  templateDetail?: Resolver<Maybe<ResolversTypes['Template']>, ParentType, ContextType, RequireFields<QueryTemplateDetailArgs, '_id'>>;
  templateList?: Resolver<Maybe<ResolversTypes['TemplateListResponse']>, ParentType, ContextType, Partial<QueryTemplateListArgs>>;
  templatesGetTypes?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  unitDetail?: Resolver<Maybe<ResolversTypes['Unit']>, ParentType, ContextType, RequireFields<QueryUnitDetailArgs, '_id'>>;
  units?: Resolver<Maybe<Array<Maybe<ResolversTypes['Unit']>>>, ParentType, ContextType, Partial<QueryUnitsArgs>>;
  unitsMain?: Resolver<Maybe<ResolversTypes['UnitListQueryResponse']>, ParentType, ContextType, Partial<QueryUnitsMainArgs>>;
  unreadNotificationsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  uoms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Uom']>>>, ParentType, ContextType>;
  uomsTotalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userDetail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserDetailArgs>>;
  userMovements?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserMovement']>>>, ParentType, ContextType, RequireFields<QueryUserMovementsArgs, 'userId'>>;
  users?: Resolver<Maybe<ResolversTypes['UsersListResponse']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
  usersTotalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryUsersTotalCountArgs>>;
}>;

export type RefreshTokenResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['RefreshToken'] = ResolversParentTypes['RefreshToken']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  deviceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiresAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  ipAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userAgent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type RelationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Relation'] = ResolversParentTypes['Relation']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  entities?: Resolver<Array<ResolversTypes['Entity']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
}>;

export type ResetPasswordConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ResetPasswordConfig'] = ResolversParentTypes['ResetPasswordConfig']> = ResolversObject<{
  emailContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailSubject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type SmsProvidersConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SMSProvidersConfig'] = ResolversParentTypes['SMSProvidersConfig']> = ResolversObject<{
  callPro?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  twilio?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
}>;

export type SecurityAuthConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SecurityAuthConfig'] = ResolversParentTypes['SecurityAuthConfig']> = ResolversObject<{
  multiFactorConfig?: Resolver<Maybe<ResolversTypes['MultiFactorConfig']>, ParentType, ContextType>;
  otpConfig?: Resolver<Maybe<ResolversTypes['OTPConfig']>, ParentType, ContextType>;
  otpResendConfig?: Resolver<Maybe<ResolversTypes['OTPResendConfig']>, ParentType, ContextType>;
  resetPasswordConfig?: Resolver<Maybe<ResolversTypes['ResetPasswordConfig']>, ParentType, ContextType>;
}>;

export type SegmentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Segment'] = ResolversParentTypes['Segment'], FederationReferenceType extends FederationReferenceTypes['Segment'] = FederationReferenceTypes['Segment']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Segment']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  buildCancelRequested?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  buildProcessed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  buildStartedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  buildTotal?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  membersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  membersCountedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revision?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  root?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SegmentStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['SegmentVisibility'], ParentType, ContextType>;
}>;

export type SegmentDayResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SegmentDay'] = ResolversParentTypes['SegmentDay']> = ResolversObject<{
  at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  joined?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  left?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type SegmentFieldResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SegmentField'] = ResolversParentTypes['SegmentField']> = ResolversObject<{
  component?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  input?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operators?: Resolver<Array<ResolversTypes['SegmentOperator']>, ParentType, ContextType>;
  options?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  query?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type SegmentMemberCountResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SegmentMemberCount'] = ResolversParentTypes['SegmentMemberCount']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  exceeded?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  unsupported?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
}>;

export type SegmentMemberPageResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SegmentMemberPage'] = ResolversParentTypes['SegmentMemberPage']> = ResolversObject<{
  ids?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  nextCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unsupported?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
}>;

export type SegmentOperatorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SegmentOperator'] = ResolversParentTypes['SegmentOperator']> = ResolversObject<{
  hint?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  input?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type SegmentRelationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SegmentRelation'] = ResolversParentTypes['SegmentRelation']> = ResolversObject<{
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  measureOperators?: Resolver<Array<ResolversTypes['SegmentOperator']>, ParentType, ContextType>;
  relatedType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subjectType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type SegmentUsageResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SegmentUsage'] = ResolversParentTypes['SegmentUsage']> = ResolversObject<{
  automations?: Resolver<Array<ResolversTypes['SegmentUsageAutomation']>, ParentType, ContextType>;
  segmentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  segments?: Resolver<Array<ResolversTypes['SegmentUsageSegment']>, ParentType, ContextType>;
}>;

export type SegmentUsageAutomationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SegmentUsageAutomation'] = ResolversParentTypes['SegmentUsageAutomation']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type SegmentUsageSegmentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SegmentUsageSegment'] = ResolversParentTypes['SegmentUsageSegment']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type SettingsGlobalSearchResultResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SettingsGlobalSearchResult'] = ResolversParentTypes['SettingsGlobalSearchResult']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['GlobalSearchResultItem']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type SmsDeliveryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SmsDelivery'] = ResolversParentTypes['SmsDelivery']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  conversationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  direction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  engageMessageId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errorMessages?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  erxesApiId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  integrationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requestData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  responseData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusUpdates?: Resolver<Maybe<Array<Maybe<ResolversTypes['SmsStatus']>>>, ParentType, ContextType>;
  telnyxId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type SmsStatusResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SmsStatus'] = ResolversParentTypes['SmsStatus']> = ResolversObject<{
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type SocialAuthProviderInfoResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SocialAuthProviderInfo'] = ResolversParentTypes['SocialAuthProviderInfo']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['SocialAuthProvider']>, ParentType, ContextType>;
  providerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type SocialpayConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SocialpayConfig'] = ResolversParentTypes['SocialpayConfig']> = ResolversObject<{
  certId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enableSocialpay?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  publicKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type SomeTypeResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SomeType'] = ResolversParentTypes['SomeType']> = ResolversObject<{
  visibility?: Resolver<Maybe<ResolversTypes['CacheControlScope']>, ParentType, ContextType>;
}>;

export type StructureResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Structure'] = ResolversParentTypes['Structure']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordinate?: Resolver<Maybe<ResolversTypes['Coordinate']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Attachment']>, ParentType, ContextType>;
  links?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supervisor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  supervisorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type SuccessResultResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SuccessResult'] = ResolversParentTypes['SuccessResult']> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type TagResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag'], FederationReferenceType extends FederationReferenceTypes['Tag'] = FederationReferenceTypes['Tag']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Tag']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  colorCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isGroup?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  objectCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  relatedIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  totalObjectCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type TagsListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['TagsListResponse'] = ResolversParentTypes['TagsListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type TemplateResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Template'] = ResolversParentTypes['Template']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['TemplateCategory']>>>, ParentType, ContextType>;
  categoryIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type TemplateCategoryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['TemplateCategory'] = ResolversParentTypes['TemplateCategory']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  isRoot?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['TemplateCategory']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  templateCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type TemplateCategoryListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['TemplateCategoryListResponse'] = ResolversParentTypes['TemplateCategoryListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['TemplateCategory']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type TemplateListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['TemplateListResponse'] = ResolversParentTypes['TemplateListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Template']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type TestUserResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['TestUser'] = ResolversParentTypes['TestUser']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enableTestUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  otp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type TokiConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['TokiConfig'] = ResolversParentTypes['TokiConfig']> = ResolversObject<{
  apiKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enableToki?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  merchantId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  production?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type TriggerResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Trigger'] = ResolversParentTypes['Trigger']> = ResolversObject<{
  actionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isCustom?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  style?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workflowId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type TwoFactorConfigResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['TwoFactorConfig'] = ResolversParentTypes['TwoFactorConfig']> = ResolversObject<{
  codeLength?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  emailSubject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  messageTemplate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  smsProvider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type UnitResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Unit'] = ResolversParentTypes['Unit'], FederationReferenceType extends FederationReferenceTypes['Unit'] = FederationReferenceTypes['Unit']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Unit']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType>;
  departmentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supervisor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  supervisorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
}>;

export type UnitListQueryResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['UnitListQueryResponse'] = ResolversParentTypes['UnitListQueryResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Unit']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type UomResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Uom'] = ResolversParentTypes['Uom']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  isForSubscription?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subscriptionConfig?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  timely?: Resolver<Maybe<ResolversTypes['TimelyType']>, ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'], FederationReferenceType extends FederationReferenceTypes['User'] = FederationReferenceTypes['User']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['User']> | FederationReferenceType, FederationReferenceType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  branchIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  branches?: Resolver<Maybe<Array<Maybe<ResolversTypes['Branch']>>>, ParentType, ContextType>;
  brandIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  brands?: Resolver<Maybe<Array<Maybe<ResolversTypes['Brand']>>>, ParentType, ContextType>;
  chatStatus?: Resolver<Maybe<ResolversTypes['UserChatStatus']>, ParentType, ContextType>;
  configs?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  configsConstants?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  currentOrganization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customPermissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['CustomPermission']>>>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType>;
  departmentIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  departments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Department']>>>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['UserDetailsType']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailSignatures?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  employeeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getNotificationByEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  groupIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isOnboarded?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isOwner?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isShowNotification?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isSubscribed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  leaderBoardPosition?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  links?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  onboardedPlugins?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  organizations?: Resolver<Maybe<Array<Maybe<ResolversTypes['CookieOrganization']>>>, ParentType, ContextType>;
  permissionGroupIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  positionIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  positions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Position']>>>, ParentType, ContextType>;
  propertiesData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unitId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type UserDetailsTypeResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['UserDetailsType'] = ResolversParentTypes['UserDetailsType']> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  coverPhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employeeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  middleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  operatorPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shortName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workStartedDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type UserMovementResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['UserMovement'] = ResolversParentTypes['UserMovement']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentTypeDetail?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  contentTypeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdByDetail?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userDetail?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type UserPermissionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['UserPermission'] = ResolversParentTypes['UserPermission']> = ResolversObject<{
  actions?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  module?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plugin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type UsersListResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['UsersListResponse'] = ResolversParentTypes['UsersListResponse']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type VerificationRequestResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['VerificationRequest'] = ResolversParentTypes['VerificationRequest']> = ResolversObject<{
  attachments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attachment']>>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verifiedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type WorkflowResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Workflow'] = ResolversParentTypes['Workflow']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  automationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextActionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  templateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type AutomationsTotalCountResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['automationsTotalCountResponse'] = ResolversParentTypes['automationsTotalCountResponse']> = ResolversObject<{
  byStatus?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = IContext> = ResolversObject<{
  Action?: ActionResolvers<ContextType>;
  ActionCode?: ActionCodeResolvers<ContextType>;
  ActivityLog?: ActivityLogResolvers<ContextType>;
  ActivityLogsList?: ActivityLogsListResolvers<ContextType>;
  AiAgentHealth?: AiAgentHealthResolvers<ContextType>;
  App?: AppResolvers<ContextType>;
  ApprovalChange?: ApprovalChangeResolvers<ContextType>;
  ApprovalContentMeta?: ApprovalContentMetaResolvers<ContextType>;
  ApprovalDecision?: ApprovalDecisionResolvers<ContextType>;
  ApprovalLock?: ApprovalLockResolvers<ContextType>;
  ApprovalLockState?: ApprovalLockStateResolvers<ContextType>;
  ApprovalRequest?: ApprovalRequestResolvers<ContextType>;
  ApprovalRequestsList?: ApprovalRequestsListResolvers<ContextType>;
  Attachment?: AttachmentResolvers<ContextType>;
  Auth?: AuthResolvers<ContextType>;
  AuthConfig?: AuthConfigResolvers<ContextType>;
  AuthTokenResponse?: AuthTokenResponseResolvers<ContextType>;
  Automation?: AutomationResolvers<ContextType>;
  AutomationHistories?: AutomationHistoriesResolvers<ContextType>;
  AutomationHistory?: AutomationHistoryResolvers<ContextType>;
  AutomationNote?: AutomationNoteResolvers<ContextType>;
  AutomationStats?: AutomationStatsResolvers<ContextType>;
  AutomationStatsBucket?: AutomationStatsBucketResolvers<ContextType>;
  AutomationStatsCount?: AutomationStatsCountResolvers<ContextType>;
  AutomationStatsErrorMessage?: AutomationStatsErrorMessageResolvers<ContextType>;
  AutomationStatsNode?: AutomationStatsNodeResolvers<ContextType>;
  AutomationWorkflowTemplate?: AutomationWorkflowTemplateResolvers<ContextType>;
  AutomationsListResponse?: AutomationsListResponseResolvers<ContextType>;
  AvgEmailStats?: AvgEmailStatsResolvers<ContextType>;
  Branch?: BranchResolvers<ContextType>;
  BranchesListResponse?: BranchesListResponseResolvers<ContextType>;
  Brand?: BrandResolvers<ContextType>;
  BrandListResponse?: BrandListResponseResolvers<ContextType>;
  BroadcastEmailDryRun?: BroadcastEmailDryRunResolvers<ContextType>;
  BroadcastEmailFieldCoverage?: BroadcastEmailFieldCoverageResolvers<ContextType>;
  BroadcastRecipient?: BroadcastRecipientResolvers<ContextType>;
  BroadcastRecipientEmail?: BroadcastRecipientEmailResolvers<ContextType>;
  BroadcastRecipientEmailEvent?: BroadcastRecipientEmailEventResolvers<ContextType>;
  BroadcastRecipientListResponse?: BroadcastRecipientListResponseResolvers<ContextType>;
  BroadcastRun?: BroadcastRunResolvers<ContextType>;
  BroadcastTrace?: BroadcastTraceResolvers<ContextType>;
  BundleCondition?: BundleConditionResolvers<ContextType>;
  BundleRule?: BundleRuleResolvers<ContextType>;
  BundleRuleItem?: BundleRuleItemResolvers<ContextType>;
  CPComment?: CpCommentResolvers<ContextType>;
  CPCommentListResponse?: CpCommentListResponseResolvers<ContextType>;
  CPExamplePost?: CpExamplePostResolvers<ContextType>;
  CPNotification?: CpNotificationResolvers<ContextType>;
  CPNotificationListResponse?: CpNotificationListResponseResolvers<ContextType>;
  CPNotificationResult?: CpNotificationResultResolvers<ContextType>;
  CPUnit?: CpUnitResolvers<ContextType>;
  CPUnitDepartment?: CpUnitDepartmentResolvers<ContextType>;
  CPUnitUser?: CpUnitUserResolvers<ContextType>;
  CPUnitUserDetails?: CpUnitUserDetailsResolvers<ContextType>;
  CPUser?: CpUserResolvers<ContextType>;
  CPUserListResponse?: CpUserListResponseResolvers<ContextType>;
  CPUserRemoveResponse?: CpUserRemoveResponseResolvers<ContextType>;
  ClientPortal?: ClientPortalResolvers<ContextType>;
  ClientPortalListResponse?: ClientPortalListResponseResolvers<ContextType>;
  CompaniesListResponse?: CompaniesListResponseResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  Config?: ConfigResolvers<ContextType>;
  Conformity?: ConformityResolvers<ContextType>;
  CookieOrganization?: CookieOrganizationResolvers<ContextType>;
  Coordinate?: CoordinateResolvers<ContextType>;
  CoreModulesGlobalSearchResult?: CoreModulesGlobalSearchResultResolvers<ContextType>;
  CurrentUserPermissionsResult?: CurrentUserPermissionsResultResolvers<ContextType>;
  CustomPermission?: CustomPermissionResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomersListResponse?: CustomersListResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DefaultPermissionGroup?: DefaultPermissionGroupResolvers<ContextType>;
  DeliveryList?: DeliveryListResolvers<ContextType>;
  DeliveryReport?: DeliveryReportResolvers<ContextType>;
  Department?: DepartmentResolvers<ContextType>;
  DepartmentsListResponse?: DepartmentsListResponseResolvers<ContextType>;
  Document?: DocumentResolvers<ContextType>;
  DocumentEditorAttribute?: DocumentEditorAttributeResolvers<ContextType>;
  DocumentListResponse?: DocumentListResponseResolvers<ContextType>;
  DocumentsTypes?: DocumentsTypesResolvers<ContextType>;
  ENV?: EnvResolvers<ContextType>;
  EmailAddress?: EmailAddressResolvers<ContextType>;
  EmailAddressesList?: EmailAddressesListResolvers<ContextType>;
  EmailDeliveriesList?: EmailDeliveriesListResolvers<ContextType>;
  EmailDelivery?: EmailDeliveryResolvers<ContextType>;
  EmailRampStatus?: EmailRampStatusResolvers<ContextType>;
  EmailSender?: EmailSenderResolvers<ContextType>;
  EmailSenderOptions?: EmailSenderOptionsResolvers<ContextType>;
  EmailTemplate?: EmailTemplateResolvers<ContextType>;
  EmailTemplatesListResponse?: EmailTemplatesListResponseResolvers<ContextType>;
  EngageCalendarEntry?: EngageCalendarEntryResolvers<ContextType>;
  EngageDeliveryReport?: EngageDeliveryReportResolvers<ContextType>;
  EngageMemberListResponse?: EngageMemberListResponseResolvers<ContextType>;
  EngageMessage?: EngageMessageResolvers<ContextType>;
  EngageMessageListResponse?: EngageMessageListResponseResolvers<ContextType>;
  EngageMessageSms?: EngageMessageSmsResolvers<ContextType>;
  EngageScheduleDate?: EngageScheduleDateResolvers<ContextType>;
  Entity?: EntityResolvers<ContextType>;
  Export?: ExportResolvers<ContextType>;
  ExportHeader?: ExportHeaderResolvers<ContextType>;
  ExportHistoryList?: ExportHistoryListResolvers<ContextType>;
  FacebookOAuthConfig?: FacebookOAuthConfigResolvers<ContextType>;
  Favorite?: FavoriteResolvers<ContextType>;
  FcmDevice?: FcmDeviceResolvers<ContextType>;
  Field?: FieldResolvers<ContextType>;
  FieldGroup?: FieldGroupResolvers<ContextType>;
  FieldGroupListResponse?: FieldGroupListResponseResolvers<ContextType>;
  FieldListResponse?: FieldListResponseResolvers<ContextType>;
  FieldOption?: FieldOptionResolvers<ContextType>;
  FileUploadServiceInfo?: FileUploadServiceInfoResolvers<ContextType>;
  FirebaseConfig?: FirebaseConfigResolvers<ContextType>;
  GlobalSearchResultItem?: GlobalSearchResultItemResolvers<ContextType>;
  GoogleOAuthConfig?: GoogleOAuthConfigResolvers<ContextType>;
  Import?: ImportResolvers<ContextType>;
  ImportColumnMapping?: ImportColumnMappingResolvers<ContextType>;
  ImportColumnPreview?: ImportColumnPreviewResolvers<ContextType>;
  ImportExportType?: ImportExportTypeResolvers<ContextType>;
  ImportHistoryList?: ImportHistoryListResolvers<ContextType>;
  ImportPreviewColumn?: ImportPreviewColumnResolvers<ContextType>;
  ImportPreviewField?: ImportPreviewFieldResolvers<ContextType>;
  InternalNote?: InternalNoteResolvers<ContextType>;
  InternalNotesByAction?: InternalNotesByActionResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Log?: LogResolvers<ContextType>;
  LogContentType?: LogContentTypeResolvers<ContextType>;
  MailConfig?: MailConfigResolvers<ContextType>;
  MainLogsList?: MainLogsListResolvers<ContextType>;
  ManualVerificationConfig?: ManualVerificationConfigResolvers<ContextType>;
  ModifiedNote?: ModifiedNoteResolvers<ContextType>;
  MultiFactorConfig?: MultiFactorConfigResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  NotificationConfig?: NotificationConfigResolvers<ContextType>;
  NotificationConfigListResponse?: NotificationConfigListResponseResolvers<ContextType>;
  NotificationModule?: NotificationModuleResolvers<ContextType>;
  NotificationModuleEvent?: NotificationModuleEventResolvers<ContextType>;
  NotificationPluginType?: NotificationPluginTypeResolvers<ContextType>;
  NotificationSettings?: NotificationSettingsResolvers<ContextType>;
  NotificationsList?: NotificationsListResolvers<ContextType>;
  OAuthClientApp?: OAuthClientAppResolvers<ContextType>;
  OTPConfig?: OtpConfigResolvers<ContextType>;
  OTPEmailConfig?: OtpEmailConfigResolvers<ContextType>;
  OTPResendConfig?: OtpResendConfigResolvers<ContextType>;
  OTPSMSConfig?: OtpsmsConfigResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  PackageProduct?: PackageProductResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PasswordVerificationConfig?: PasswordVerificationConfigResolvers<ContextType>;
  PdfAttachment?: PdfAttachmentResolvers<ContextType>;
  PermissionAction?: PermissionActionResolvers<ContextType>;
  PermissionGroup?: PermissionGroupResolvers<ContextType>;
  PermissionGroupPermission?: PermissionGroupPermissionResolvers<ContextType>;
  PermissionModule?: PermissionModuleResolvers<ContextType>;
  PermissionModulesByPlugin?: PermissionModulesByPluginResolvers<ContextType>;
  PermissionScopeDescription?: PermissionScopeDescriptionResolvers<ContextType>;
  Position?: PositionResolvers<ContextType>;
  PositionListQueryResponse?: PositionListQueryResponseResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductBulkSimilarity?: ProductBulkSimilarityResolvers<ContextType>;
  ProductCategory?: ProductCategoryResolvers<ContextType>;
  ProductPackage?: ProductPackageResolvers<ContextType>;
  ProductPackagesListResponse?: ProductPackagesListResponseResolvers<ContextType>;
  ProductRule?: ProductRuleResolvers<ContextType>;
  ProductRulesCount?: ProductRulesCountResolvers<ContextType>;
  ProductSimilarity?: ProductSimilarityResolvers<ContextType>;
  ProductSimilarityField?: ProductSimilarityFieldResolvers<ContextType>;
  ProductSimilarityGroup?: ProductSimilarityGroupResolvers<ContextType>;
  ProductsConfig?: ProductsConfigResolvers<ContextType>;
  ProductsListResponse?: ProductsListResponseResolvers<ContextType>;
  PropertySystemField?: PropertySystemFieldResolvers<ContextType>;
  PropertyType?: PropertyTypeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RefreshToken?: RefreshTokenResolvers<ContextType>;
  Relation?: RelationResolvers<ContextType>;
  ResetPasswordConfig?: ResetPasswordConfigResolvers<ContextType>;
  SMSProvidersConfig?: SmsProvidersConfigResolvers<ContextType>;
  SecurityAuthConfig?: SecurityAuthConfigResolvers<ContextType>;
  Segment?: SegmentResolvers<ContextType>;
  SegmentDay?: SegmentDayResolvers<ContextType>;
  SegmentField?: SegmentFieldResolvers<ContextType>;
  SegmentMemberCount?: SegmentMemberCountResolvers<ContextType>;
  SegmentMemberPage?: SegmentMemberPageResolvers<ContextType>;
  SegmentOperator?: SegmentOperatorResolvers<ContextType>;
  SegmentRelation?: SegmentRelationResolvers<ContextType>;
  SegmentUsage?: SegmentUsageResolvers<ContextType>;
  SegmentUsageAutomation?: SegmentUsageAutomationResolvers<ContextType>;
  SegmentUsageSegment?: SegmentUsageSegmentResolvers<ContextType>;
  SettingsGlobalSearchResult?: SettingsGlobalSearchResultResolvers<ContextType>;
  SmsDelivery?: SmsDeliveryResolvers<ContextType>;
  SmsStatus?: SmsStatusResolvers<ContextType>;
  SocialAuthProviderInfo?: SocialAuthProviderInfoResolvers<ContextType>;
  SocialpayConfig?: SocialpayConfigResolvers<ContextType>;
  SomeType?: SomeTypeResolvers<ContextType>;
  Structure?: StructureResolvers<ContextType>;
  SuccessResult?: SuccessResultResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagsListResponse?: TagsListResponseResolvers<ContextType>;
  Template?: TemplateResolvers<ContextType>;
  TemplateCategory?: TemplateCategoryResolvers<ContextType>;
  TemplateCategoryListResponse?: TemplateCategoryListResponseResolvers<ContextType>;
  TemplateListResponse?: TemplateListResponseResolvers<ContextType>;
  TestUser?: TestUserResolvers<ContextType>;
  TokiConfig?: TokiConfigResolvers<ContextType>;
  Trigger?: TriggerResolvers<ContextType>;
  TwoFactorConfig?: TwoFactorConfigResolvers<ContextType>;
  Unit?: UnitResolvers<ContextType>;
  UnitListQueryResponse?: UnitListQueryResponseResolvers<ContextType>;
  Uom?: UomResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserDetailsType?: UserDetailsTypeResolvers<ContextType>;
  UserMovement?: UserMovementResolvers<ContextType>;
  UserPermission?: UserPermissionResolvers<ContextType>;
  UsersListResponse?: UsersListResponseResolvers<ContextType>;
  VerificationRequest?: VerificationRequestResolvers<ContextType>;
  Workflow?: WorkflowResolvers<ContextType>;
  automationsTotalCountResponse?: AutomationsTotalCountResponseResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = IContext> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
}>;
