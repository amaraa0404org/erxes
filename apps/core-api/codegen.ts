import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { CodegenConfig } from '@graphql-codegen/cli';

const projectDir = typeof __dirname === 'string' ? __dirname : process.cwd();
const sdlPath = join(
  projectDir,
  'node_modules',
  '.cache',
  'core-api-schema.graphql',
);

// The subgraph SDL is assembled at runtime: every module contributes plain
// template strings (`types` / `queries` / `mutations`) that
// `src/apollo/typeDefs.ts` interpolates, so a static loader
// (graphql-tag-pluck, code-file) cannot see it. Evaluate the real module
// under tsx — which resolves the `@`, `~` and `erxes-api-shared` tsconfig
// paths — and print the DocumentNode back to SDL. The SDL is written to a
// cache file because piping it through stdout truncates past the 64 KB pipe
// buffer on macOS.
mkdirSync(join(projectDir, 'node_modules', '.cache'), { recursive: true });

execFileSync(
  'pnpm',
  [
    'exec',
    'tsx',
    '-e',
    [
      `import('./src/apollo/typeDefs.ts').then(async (m) => {`,
      `  const { writeFileSync } = await import('node:fs');`,
      `  const { print } = await import('graphql');`,
      `  const typeDefs = m.default?.typeDefs ?? m.typeDefs;`,
      `  writeFileSync(${JSON.stringify(sdlPath)}, print(await typeDefs()));`,
      `  process.exit(0);`,
      `});`,
    ].join('\n'),
  ],
  { cwd: projectDir, stdio: ['ignore', 'inherit', 'inherit'] },
);

// The subgraph only declares `extend type Query|Mutation` — the root types are
// materialized by Apollo Federation at runtime — so normalize the extensions
// into plain definitions to get a standalone schema for codegen.
const sdl = readFileSync(sdlPath, 'utf-8').replace(
  /extend\s+type\s+(Query|Mutation|Subscription)\s*{/g,
  'type $1 {',
);

// Map GraphQL object types to their Mongoose document interfaces. Paths are
// relative to the generated file (`src/__generated__/graphql.ts`); shared
// entities resolve to `erxes-api-shared`.
const mappers = {
  ActivityLog: 'erxes-api-shared/core-modules#IActivityLogDocument',
  App: 'erxes-api-shared/core-types#IAppDocument',
  ApprovalLock: '../modules/approval/db/definitions/approvalLocks#IApprovalLockDocument',
  ApprovalRequest:
    '../modules/approval/db/definitions/approvalRequests#IApprovalRequestDocument',
  Automation: 'erxes-api-shared/core-modules#IAutomationDocument',
  AutomationHistory: 'erxes-api-shared/core-modules#IAutomationExecutionDocument',
  AutomationWorkflowTemplate:
    '../modules/automations/db/models/AutomationWorkflowTemplates#IAutomationWorkflowTemplateDocument',
  Branch: '../modules/organization/structure/@types/structure#IBranchDocument',
  Brand: '../modules/organization/brand/types#IBrandDocument',
  BroadcastRecipient:
    '../modules/broadcast/db/models/BroadcastRecipients#IBroadcastRecipientDocument',
  BroadcastRun:
    '../modules/broadcast/db/models/BroadcastRuns#IBroadcastRunDocument',
  BroadcastTrace:
    '../modules/broadcast/db/models/BroadcastTraces#IBroadcastTraceDocument',
  BundleCondition: '../modules/bundle/@types/bundleCondition#IBundleConditionDocument',
  BundleRule: '../modules/bundle/@types/bundleRule#IBundleRuleDocument',
  CPComment: '../modules/clientportal/types/comment#ICPCommentDocument',
  CPNotification:
    '../modules/clientportal/types/cpNotification#ICPNotificationDocument',
  CPUnit: '../modules/organization/structure/@types/structure#IUnitDocument',
  CPUser: '../modules/clientportal/types/cpUser#ICPUserDocument',
  ClientPortal: '../modules/clientportal/types/clientPortal#IClientPortalDocument',
  Company: 'erxes-api-shared/core-types#ICompanyDocument',
  Config: '../modules/organization/settings/db/definitions/configs#IConfigDocument',
  Conformity: '../modules/conformities/db/definitions/conformities#IConformityDocument',
  Customer: 'erxes-api-shared/core-types#ICustomerDocument',
  DeliveryReport: '../modules/broadcast/@types/delivery#IDeliveryReportsDocument',
  Department: '../modules/organization/structure/@types/structure#IDepartmentDocument',
  Document: '../modules/documents/types#IDocumentDocument',
  EmailAddress: 'erxes-api-shared/core-modules#IEmailAddressDocument',
  EmailDelivery: 'erxes-api-shared/core-modules#IEmailDeliveryDocument',
  EmailSender: 'erxes-api-shared/core-modules#IEmailSenderDocument',
  EmailTemplate: 'erxes-api-shared/core-types#IEmailTemplateDocument',
  EngageMessage: '../modules/broadcast/@types/engage#IEngageMessageDocument',
  Export: '../modules/import-export/db/models/Exports#IExportDocument',
  Favorite: '../modules/organization/settings/db/definitions/favorites#IFavoritesDocument',
  Field: '../modules/properties/@types/field#IFieldDocument',
  FieldGroup: '../modules/properties/@types/group#IFieldGroupDocument',
  Import: '../modules/import-export/db/models/Imports#IImportDocument',
  InternalNote: '../modules/internalNote/types#IInternalNoteDocument',
  Log: 'erxes-api-shared/core-types#ILogDocument',
  Notification: 'erxes-api-shared/core-modules#INotificationDocument',
  OAuthClientApp: '../modules/auth/db/definitions/oauthClientApps#IOAuthClientAppDocument',
  PermissionGroup: 'erxes-api-shared/core-types#IPermissionGroupDocument',
  Position: '../modules/organization/structure/@types/structure#IPositionDocument',
  Product: 'erxes-api-shared/core-types#IProductDocument',
  ProductCategory: 'erxes-api-shared/core-types#IProductCategoryDocument',
  ProductBulkSimilarity:
    '../modules/products/@types/similarity#IProductSimilarityDocument',
  ProductPackage: '../modules/products/@types/package#IPackageDocument',
  ProductRule: '../modules/products/@types/rule#IProductRuleDocument',
  ProductsConfig: 'erxes-api-shared/core-types#IProductsConfigDocument',
  PropertySystemField:
    '../modules/properties/@types/systemField#ISystemFieldSettingDocument',
  Relation: 'erxes-api-shared/core-types#IRelationDocument',
  Segment: '../modules/segments/db/definitions/segments#ISegmentDocument',
  SmsDelivery: '../modules/broadcast/@types/sms#ISmsRequestDocument',
  Structure: '../modules/organization/structure/@types/structure#IStructureDocument',
  Tag: 'erxes-api-shared/core-types#ITagDocument',
  Template: '../modules/template/@types/template#ITemplateDocument',
  TemplateCategory: '../modules/template/@types/category#ITemplateCategoryDocument',
  Unit: '../modules/organization/structure/@types/structure#IUnitDocument',
  Uom: 'erxes-api-shared/core-types#IUomDocument',
  User: 'erxes-api-shared/core-types#IUserDocument',
  UserMovement: 'erxes-api-shared/core-types#IUserMovementDocument',
};

const config: CodegenConfig = {
  schema: sdl,
  generates: {
    'src/__generated__/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        federation: true,
        contextType: '../connectionResolvers#IContext',
        useIndexSignature: true,
        useTypeImports: true,
        scalars: {
          Date: 'Date',
          JSON: 'Record<string, unknown>',
        },
        mappers,
      },
    },
  },
};

export default config;
