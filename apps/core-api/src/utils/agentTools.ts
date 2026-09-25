import { AgentToolDeclaration } from 'erxes-api-shared/utils';

/**
 * GraphQL operations exposed to the agent through the /agent-tools/*
 * endpoints. Each entry names a real Query/Mutation field on the core
 * subgraph schema; execution runs in-process through the wrapped resolver
 * pipeline, and `permission` is checked against the acting user on every
 * call.
 *
 * The GraphQL argument names differ from the old tRPC procedure inputs —
 * the descriptions below call out the actual SDL arguments the agent must
 * pass.
 */
export const agentTools: AgentToolDeclaration[] = [
  // contacts — customers
  {
    operation: 'customers',
    permission: { module: 'contacts', action: 'contactsRead' },
    description:
      'Search customers (people) with structured filters: { searchValue, ids, tagIds, brandIds, type, status, leadStatus, segment, sortField, sortDirection, limit, cursor, ... }. Returns { list, totalCount, pageInfo } — read totalCount for "how many customers ..." questions instead of a separate count call. Use customerDetail when you already know the _id.',
    selection:
      '{ list { _id state createdAt updatedAt avatar integrationId clientPortalId firstName lastName middleName birthDate sex email primaryEmail emails primaryPhone phones primaryAddress addresses phone tagIds remoteAddress location visitorContactInfo trackedData propertiesData ownerId position department leadStatus hasAuthority description isSubscribed code emailValidationStatus phoneValidationStatus status isOnline lastSeenAt sessionCount urlVisits score links cursor } totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor } }',
  },
  {
    operation: 'customerDetail',
    permission: { module: 'contacts', action: 'contactsRead' },
    description:
      'Get a single customer by { _id }. Always call this before customersEdit to confirm the record and read its current values.',
  },
  // contacts — companies
  {
    operation: 'companies',
    permission: { module: 'contacts', action: 'contactsRead' },
    description:
      'Search companies with structured filters: { searchValue, ids, tagIds, status, sortField, sortDirection, limit, cursor, ... }. Returns { list, totalCount, pageInfo }. Use companyDetail when you already know the _id.',
    selection:
      '{ list { _id createdAt updatedAt avatar size website industry parentCompanyId ownerId mergedIds names primaryName emails primaryEmail phones primaryPhone primaryAddress addresses status businessType description isSubscribed links tagIds trackedData propertiesData code location score cursor } totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor } }',
  },
  {
    operation: 'companyDetail',
    permission: { module: 'contacts', action: 'contactsRead' },
    description:
      'Get a single company by { _id }. Call this before companiesEdit to confirm the record and read its current values.',
  },
  // organization — structure
  {
    operation: 'unitsMain',
    permission: { module: 'organization', action: 'organizationRead' },
    description:
      'List units (cross-department organizational groupings): { ids, searchValue, status, parentId, limit, cursor, ... }. Returns { list, totalCount, pageInfo }. Use to resolve a unit name/code to its _id; unitDetail gets one by _id.',
    selection:
      '{ list { _id title departmentId supervisorId code description userCount userIds } totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor } }',
  },
  {
    operation: 'unitDetail',
    permission: { module: 'organization', action: 'organizationRead' },
    description: 'Get a single unit by { _id }.',
  },
  {
    operation: 'departmentsMain',
    permission: { module: 'organization', action: 'organizationRead' },
    description:
      'List departments: { ids, searchValue, status, parentId, onlyFirstLevel, limit, cursor, ... }. Returns { list, totalCount, pageInfo }. Department IDs are needed for inventory operations and team member assignment; use parentId to walk the tree one level at a time. departmentDetail gets one by _id.',
    selection:
      '{ list { _id title description parentId supervisorId code order childCount userCount userIds workhours status } totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor } }',
  },
  {
    operation: 'departmentDetail',
    permission: { module: 'organization', action: 'organizationRead' },
    description: 'Get a single department by { _id }.',
  },
  {
    operation: 'branchesMain',
    permission: { module: 'organization', action: 'organizationRead' },
    description:
      'List branches (physical/logical locations): { ids, searchValue, status, parentId, onlyFirstLevel, limit, cursor, ... }. Returns { list, totalCount, pageInfo }. Branch IDs are needed for inventory operations and team member assignment. branchDetail gets one by _id.',
    selection:
      '{ list { _id title parentId supervisorId code order userIds userCount status address radius hasChildren workhours holidays phoneNumber email links } totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor } }',
  },
  {
    operation: 'branchDetail',
    permission: { module: 'organization', action: 'organizationRead' },
    description: 'Get a single branch by { _id }.',
  },
  // organization — brands
  {
    operation: 'brands',
    permission: { module: 'brands', action: 'brandsRead' },
    description:
      'List brands: { searchValue, limit, cursor, ... }. Returns { list, totalCount, pageInfo }. Brands group channels/integrations (messenger, forms, etc.). Use to resolve a brand name to its _id; brandDetail gets one by _id.',
    selection:
      '{ list { _id name description code userId createdAt emailConfig memberIds cursor } totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor } }',
  },
  {
    operation: 'brandDetail',
    permission: { module: 'brands', action: 'brandsRead' },
    description:
      'Get a single brand by { _id }. Call before brandsEdit.',
  },
  // organization — team members
  {
    operation: 'users',
    permission: { module: 'teamMembers', action: 'teamMembersRead' },
    description:
      'List team members (staff users): { searchValue, isActive, ids, brandIds, departmentId(s), branchId(s), unitId, segment, status, sortField, limit, cursor, ... }, e.g. { searchValue: "a@b.com" } or { isActive: true }. Returns { list, totalCount, pageInfo }. Use to resolve a person\'s name/email to their user _id (needed for ownerId, assignee, etc.). userDetail gets one by _id; usersTotalCount returns just the count.',
    selection:
      '{ list { _id createdAt username email isActive links status chatStatus emailSignatures getNotificationByEmail onboardedPlugins groupIds permissionGroupIds isSubscribed isShowNotification propertiesData isOwner configs configsConstants departmentIds brandIds branchIds positionIds unitId score leaderBoardPosition employeeId isOnboarded cursor } totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor } }',
  },
  {
    operation: 'userDetail',
    permission: { module: 'teamMembers', action: 'teamMembersRead' },
    description: 'Get a single team member by { _id }.',
  },
  {
    operation: 'usersTotalCount',
    permission: { module: 'teamMembers', action: 'teamMembersRead' },
    description:
      'Count team members matching a filter: { searchValue, isActive, ids, departmentId(s), branchId(s), unitId, segment, ... }, e.g. { isActive: true }.',
  },
  // tags
  {
    operation: 'tags',
    permission: { module: 'tags', action: 'tagsRead' },
    description:
      'List tags: { type, searchValue, parentId, ids, limit, cursor, ... }. Returns { list, totalCount, pageInfo }. Tags are scoped per entity type — filter with { type: "core:customer" } for customer tags, "core:company" for companies, "core:product" for products. Use to resolve tag names to _ids before setting tagIds in create/update docs; parentId walks the tag tree. tagDetail gets one by _id.',
    selection:
      '{ list { _id name colorCode parentId relatedIds isGroup description type order objectCount totalObjectCount createdAt } pageInfo { hasNextPage hasPreviousPage startCursor endCursor } totalCount }',
  },
  {
    operation: 'tagDetail',
    permission: { module: 'tags', action: 'tagsRead' },
    description: 'Get a single tag by { _id }.',
  },
  // products
  {
    operation: 'products',
    permission: { module: 'products', action: 'productsRead' },
    description:
      'Search products with structured filters plus pagination: { searchValue, categoryId, categoryIds, ids, tagIds, status, type, brandIds, vendorId, segment, page, perPage, sortField, sortDirection, ... }. categoryId/categoryIds automatically expand to include all child categories. Use productDetail for a single known product and productsTotalCount for totals.',
  },
  {
    operation: 'productDetail',
    permission: { module: 'products', action: 'productsRead' },
    description:
      'Get a single product by { _id }. Call this before productsEdit to confirm the record and read current values.',
  },
  {
    operation: 'productsTotalCount',
    permission: { module: 'products', action: 'productsRead' },
    description:
      'Count products matching a filter: { searchValue, categoryId, categoryIds, ids, tagIds, status, type, ... } — categoryId automatically includes all child categories. Use for "how many products ..." questions instead of fetching records.',
  },
  {
    operation: 'productCategories',
    permission: { module: 'products', action: 'productsRead' },
    description:
      'List product categories: { ids, parentId, withChild, searchValue, status, brandIds }. Categories form a tree via parentId/order; pass withChild: true or use categoriesWithChilds to include descendants. Use this to resolve a category name or code to its _id before creating/updating products or filtering products by categoryId.',
  },
  {
    operation: 'productCategoryDetail',
    permission: { module: 'products', action: 'productsRead' },
    description:
      'Get a single product category by { _id }. Call before productCategoriesEdit.',
  },
  {
    operation: 'categoriesWithChilds',
    permission: { module: 'products', action: 'productsRead' },
    description:
      'Get categories plus ALL their descendants. Input: { ids: ["categoryId", ...] }. Use to gather every subcategory under a parent, e.g. before bulk product operations across a whole category tree. (products/productsTotalCount already expand a single categoryId automatically.)',
  },
  {
    operation: 'productCategoriesTotalCount',
    permission: { module: 'products', action: 'productsRead' },
    description:
      'Count product categories matching a filter: { ids, parentId, withChild, searchValue, status, brandIds }.',
  },
  {
    operation: 'uoms',
    permission: { module: 'products', action: 'productsRead' },
    description:
      'List all units of measure (UOM) — no arguments. Use to resolve a UOM code/name to the exact value expected in productsAdd doc.uom.',
  },
  {
    operation: 'productsConfigs',
    permission: { module: 'products', action: 'productsRead' },
    description:
      'List all product module configuration entries — no arguments. Find the entry whose code matches the setting you need.',
  },
  // forms / properties
  {
    operation: 'fields',
    permission: { module: 'properties', action: 'propertiesRead' },
    description:
      'List custom field definitions: { params: { contentType, searchValue, ... } }. Returns field metadata (name, label, type, validation, options). For a complete field list including built-in schema fields, use fieldsCombinedByContentType instead. fieldDetail gets one by _id.',
    selection:
      '{ list { _id name code type order groupId validations logics configs icon isVisible isVisibleToCreate isRequired isVisibleInCard createdAt updatedAt } pageInfo { hasNextPage hasPreviousPage startCursor endCursor } totalCount }',
  },
  {
    operation: 'fieldDetail',
    permission: { module: 'properties', action: 'propertiesRead' },
    description:
      'Get a single custom field definition by { _id }. Returns the field metadata (type, validation, options) needed to format customFieldsData values on create/update.',
  },
  {
    operation: 'fieldsCombinedByContentType',
    permission: { module: 'properties', action: 'propertiesRead' },
    description:
      'Get ALL fields (built-in schema fields + custom fields with select options) for one content type. Input: { contentType, usageType?, excludedNames?, segmentId?, config?, onlyDates? } — contentType format "plugin:module.collection", e.g. "core:contacts.customers", "core:contacts.companies", "core:products.product", "core:organization.users". Call this BEFORE writing customFieldsData on any create/update to learn the custom field IDs and their types.',
  },
  {
    operation: 'fieldGroups',
    permission: { module: 'properties', action: 'propertiesRead' },
    description:
      'List custom field groups (sections that custom fields belong to): { params: { contentType, ... } }. Use with fields to understand how custom fields are organized.',
    selection:
      '{ list { _id name code description contentType order logics configs createdAt updatedAt } pageInfo { hasNextPage hasPreviousPage startCursor endCursor } totalCount }',
  },
  // documents
  {
    operation: 'documents',
    permission: { module: 'documents', action: 'documentsRead' },
    description:
      'List document templates (printable documents with placeholders): { searchValue, contentType, subType, limit, cursor, ... }. Returns { list, totalCount, pageInfo }. Use to find the template _id before rendering with documentsProcess.',
    selection:
      '{ list { _id tagIds code createdAt contentType subType name content replacer cursor } pageInfo { hasNextPage hasPreviousPage startCursor endCursor } totalCount }',
  },
  {
    operation: 'documentsDetail',
    permission: { module: 'documents', action: 'documentsRead' },
    description:
      'Get a single document template by { _id }. Inspect its content to see which placeholders documentsProcess will fill.',
  },
  {
    operation: 'documentsProcess',
    permission: { module: 'documents', action: 'documentsRead' },
    description:
      'Render a document template for specific records. Input: { _id, replacerIds?, config? } — _id is the template ID; replacerIds are the record IDs (e.g. customer IDs) whose data fills the template placeholders. Find the template first with documents. Read-only: generates content, changes nothing.',
  },
  // logs
  {
    operation: 'logsMainList',
    permission: { module: 'logs', action: 'logsRead' },
    description:
      'List system/audit logs: { status, source, action, userIds, contentType, documentId, createdAtFrom, createdAtTo, filters, limit, cursor, ... } — `filters` matches fields inside each log\'s payload with { operator?, value } entries (operator defaults to "eq"), e.g. { filters: { targetId: { value: "recordId" } } }. Returns { list, totalCount, pageInfo }. Use to audit history and trace what changed, when, and by whom.',
    selection:
      '{ list { _id createdAt payload source action status userId cursor processId contentType name prevObject } totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor } }',
  },
  // client portal
  {
    operation: 'getClientPortalUsers',
    permission: { module: 'clientPortal', action: 'clientPortalRead' },
    description:
      'List client portal users (end customers with portal accounts): { filter: { erxesCustomerId?, clientPortalId?, type?, isVerified?, searchValue?, limit?, skip? } }. Pass filter.erxesCustomerId (from customerDetail) to find the portal account linked to a customer. Returns { list, totalCount }.',
    selection:
      '{ list { _id type email phone username code firstName lastName avatar companyName companyRegistrationNumber clientPortalId erxesCustomerId erxesCompanyId customFieldsData propertiesData isVerified isPhoneVerified isEmailVerified failedLoginAttempts accountLockedUntil lastLoginAt primaryAuthMethod otpResendAttempts otpResendLastAttempt createdAt updatedAt } totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor } }',
  },
  {
    operation: 'getClientPortalUser',
    permission: { module: 'clientPortal', action: 'clientPortalRead' },
    description:
      'Get one client portal user by { _id }. Use getClientPortalUsers to search by name/email/phone instead.',
  },
  {
    operation: 'getClientPortal',
    permission: { module: 'clientPortal', action: 'clientPortalRead' },
    description:
      'Get a client portal configuration by { _id }. Returns portal settings (name, domain, features). The portal _id is needed for getClientPortalUsers and clientPortalSendNotification.',
  },
  {
    operation: 'getClientPortalNotificationsByCpUserId',
    permission: { module: 'clientPortal', action: 'clientPortalRead' },
    description:
      'List notifications previously sent to a portal user: { cpUserId, clientPortalId?, status?, priority?, type?, kind?, limit?, cursor?, ... }. Returns { list, totalCount }. Get cpUserId from getClientPortalUsers.',
    selection:
      '{ list { _id cpUserId clientPortalId title message type contentType contentTypeId isRead readAt priority priorityLevel metadata action kind createdAt expiresAt updatedAt } totalCount pageInfo { hasNextPage hasPreviousPage startCursor endCursor } }',
  },
  // approval
  {
    operation: 'approvalLockState',
    permission: { module: 'approval', action: 'approvalLocksManage' },
    description:
      'Check the approval-lock state of ONE record before editing it. Input: { contentType, contentId, action?, ownerId? } — contentType like "sales:deal", contentId is the record _id. Returns whether the current user has access and the lock reason. Always check this before mutating pipeline records (deals, tickets) so you do not fight an active approval lock. Use approvalLockStates for multiple records at once.',
  },
  {
    operation: 'approvalLockStates',
    permission: { module: 'approval', action: 'approvalLocksManage' },
    description:
      'Batch-check approval-lock states for MULTIPLE records of one content type. Input: { contentType, contentIds, ownerIdsByContentId?, action? }. Use instead of approvalLockState when working with a list of records.',
  },
  // import / export
  {
    operation: 'importFields',
    permission: { module: 'importExport', action: 'importsManage' },
    description:
      'Get the importable fields (columns) for an entity type. Input: { entityType } — e.g. "core:contacts.customers", "core:contacts.companies", "core:product.product", "core:organization.users". Use to prepare import data with the exact expected columns. For the full field list of an entity also see fieldsCombinedByContentType.',
  },
];
