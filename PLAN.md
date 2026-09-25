# PLAN — Phase 1: Plugin-free core with runtime plugins

> **Every agent must read this file before doing any work in this repository.**
> This file describes exactly one phase. When the phase is finished the
> maintainer replaces this file with the next phase. Do not start work that
> belongs to a later phase, and do not rewrite this plan on your own.

## Goal

Turn this repository into a **plugin-free erxes core** that loads plugins
**at runtime**, with a clean directory layout and correct GraphQL/tRPC types.

1. Every plugin moves to its own repository (history preserved) and is deleted
   from this repository.
2. `ENABLED_PLUGINS`, `ENABLED_PLUGINS_ONLY_API` and `ENABLED_SERVICES` are
   removed completely. A plugin announces itself when its process starts, and
   core (gateway, core-api, services, core-ui) picks it up **without restart
   or rebuild**. When a plugin stops, it disappears the same way.
3. Core GraphQL schemas and tRPC routers get correct types: no `any` in tRPC
   (except documented, genuinely necessary cases) and correct nullability in
   GraphQL schemas. **Core only**. Plugins are gone.
4. The remaining directories are reorganized into a conventional layout.

## Out of scope for Phase 1

- **Deployment**: Dockerfiles, CI workflows, Helm/compose, image publishing,
  npm publishing. Do not edit them. They may point to stale paths after the
  restructure; this is expected (see Carry-over). The only exception is
  deleting plugin-owned workflow files together with the plugin (Milestone 4).
- **Core redesign** (next phase): changing GraphQL operation names, converting
  interpolated argument lists to `input` types, replacing `JSON` scalars with
  real types, redesigning modules, a typed cross-service contract package,
  publishing `erxes-api-shared` / `erxes-ui` / `ui-modules` as npm packages.
- Making the extracted plugin repositories build standalone. In Phase 1 they
  are history-preserving snapshots.
- Admin UI for installing, enabling or disabling plugins, and a plugin
  marketplace. In Phase 1, a running plugin counts as installed.

## Working agreement (applies to every milestone)

- **Scope authorization.** This plan is the explicit repository-level scope
  that the root `AGENTS.md` requires for editing core, shared libraries and
  root configuration. The plugin scope boundary rule and the plugin-guide
  maintenance rule do **not** apply to Phase 1 changes that touch a plugin
  only to extract or delete it. All other root rules still apply: named
  exports, no `any` in new code, erxes-ui components, unique GraphQL operation
  names, and so on.
- **Branch.** Work on `refactor/phase-1`, which is based on
  `amaraa0404org/erxes` `main`. Do not push, and do not create remote
  repositories, unless the user asks you to in the current conversation.
- **Commits.** Make one focused commit per task, using Conventional Commits
  (`feat(gateway): …`, `refactor(core-api): …`). Never add AI or tool
  attribution: no "Generated with" footer and no `Co-Authored-By` trailer.
- **Progress.** Tick the task's checkbox in this file in the same commit that
  completes the task. Append entries to the *Contract changes log* and
  *Open issues* sections below as you go. Do not edit any other part of this
  file.
- **Settled decisions.** Everything under *Design (settled)* has already been
  decided. If a decision turns out to be wrong or infeasible, **stop**, record
  the problem under *Open issues*, and ask the user. Do not substitute your
  own design.
- **Verification.** Every task ends with the relevant Nx targets passing for
  the projects you touched (`pnpm nx build|test|lint <project>` where the
  target exists). Milestones with runtime behavior also require the manual
  end-to-end scenario described in that milestone. Local MongoDB and Redis
  are required for it (start them with Docker or Homebrew, and do not commit
  infrastructure files for this).
- **Destructive steps.** Deleting plugin code (Milestone 4) happens only after
  all extracted repositories have been created and verified locally.

## Current state (verified 2026-09-25)

Facts the milestones below depend on.

- **Backend discovery** (`backend/erxes-api-shared/src/utils/service-discovery.ts`):
  - `getPlugins()` returns `['core', ...ENABLED_PLUGINS, ...ENABLED_PLUGINS_ONLY_API]`.
  - `joinErxesGateway()` writes `erxes-service-{name}` (the address) and
    `erxesservice:config:{name}` (config and meta) to Redis. Neither key has a
    TTL or a heartbeat.
  - `leaveErxesGateway()` is a no-op.
  - `serviceInfoCache` and `pluginAddressCache` never expire, and they cache
    misses too. A fix for the miss caching exists as commit `d6f5e3b407` on
    branch `fix/service-discovery-cache-miss`, together with a Redis-mocking
    test harness. Cherry-pick it as the starting point for Milestone 1.
  - `isEnabled()` gates every `sendTRPCMessage` and `sendCoreModuleProducer`
    call.
- **Gateway** (`backend/gateway`):
  - It spawns an Apollo Router v1.59.2 binary with a supergraph file composed
    by `rover` (`apollo-router/index.ts`, `supergraph-compose.ts`).
  - In production, a supergraph change means killing the router and spawning
    it again (`restartRouter`). That restart is triggered only by the BullMQ
    job `update-apollo-router`, which is enqueued only when
    `NODE_ENV=production`.
  - In development, a 10-second poll rewrites the supergraph file.
  - At boot, the gateway blocks until **every** plugin in the env list has
    registered (`proxy/targets.ts` `retryGetProxyTargets`).
  - The subscription schema is built once at boot
    (`subscription/index.ts`, `downloadPlugins.ts`).
  - `setActivePlugins()` writes an `erxes-active-plugins` snapshot once at
    boot. It is read by `permissions/utils.ts` and `oauth/utils.ts`.
  - `/locales/:lng/:file` is served from `src/locales` first and then fans out
    to `${plugin.address}/locales/...`. **No plugin serves `/locales` today**;
    the plugin namespaces live in `backend/gateway/src/locales/{en,mn}/<plugin>.json`.
- **core-api**:
  - `GET /get-frontend-plugins` (`modules/organization/routes.ts`) builds the
    Module Federation remote list from `ENABLED_PLUGINS` with a hard-coded
    `https://plugins.erxes.io/<version>/<p>_ui/remoteEntry.js`.
  - In SaaS mode, the list is intersected with the organization's charges,
    and `agent_ui` is appended.
  - Plugin meta (permissions, automations, segments, and so on) is aggregated
    lazily per request through `getPlugins()` and `getPlugin()`. This is
    already runtime-friendly.
- **core-ui**:
  - In development, the remote names are compiled in from `ENABLED_PLUGINS`
    (`module-federation.config.ts`, `rspack.config.ts` DefinePlugin) and
    served through `--devRemotes` (`scripts/start-ui-dev.js`).
  - In production, `bootstrap.tsx` fetches `/get-frontend-plugins` once and
    calls `init()`. `registerRemotes` is never used.
  - `PluginConfigsProvidersEffect.tsx` loads `<remote>/config` once.
  - `erxes-ui` `isEnabled()` reads the build-time `ENABLED_PLUGINS`. It is
    used only inside plugins.
- **Core → plugin coupling** that must be resolved: see Milestone 3.
- **Types**:
  - The tRPC code in core-api contains about 166 `any` (143 of them `z.any()`
    and 99 verbatim `.input(z.any())`), plus about 17 in
    `erxes-api-shared/src/utils/trpc`.
  - `sendTRPCMessage` is untyped: `Promise<any>`, with no router generic.
  - The GraphQL schemas are about 89% nullable fields and about 93% `[T]`
    lists. 12 `@key` entities have a nullable `_id`.
  - There is no GraphQL codegen. `Resolver<Parent = any, Args = any, …>`
    defaults are used across about 25 resolver maps.
  - core-api has `noImplicitAny: false`. Backend projects have no eslint
    config and no lint target. The root eslint config sets
    `no-explicit-any: off`.

## Design (settled)

### D1. Runtime plugin registry: presence-based, in Redis

A plugin is **installed** exactly while its process is alive and sends
heartbeats. There is no env list and no database registry.

**Redis keys.** Keep the existing keys so the diff stays small, and add
presence tracking:

| Key / channel | Type | Written by | Meaning |
| --- | --- | --- | --- |
| `erxes-service-{name}` | string | plugin, core, services | base address (existing) |
| `erxesservice:config:{name}` | string (JSON) | plugin | manifest: `{ hasSubscriptions, meta, releaseVersion, uiRemoteEntry? }` (existing, plus `uiRemoteEntry`) |
| `erxes:plugins` | set | plugin | names of registered plugins (never contains `core` or services) |
| `erxes:plugin:alive:{name}` | string, TTL 30 s | plugin | heartbeat, refreshed every 10 s |
| `erxes:plugins:changed` | pub/sub channel | plugin, gateway reaper | payload `{ name, event: 'joined' \| 'left' }` |

**Plugin side** (`startPlugin` / `joinErxesGateway` in `erxes-api-shared`):

- **On listen:** write the address and manifest, `SADD erxes:plugins`, set the
  heartbeat key, start a 10-second heartbeat interval, and publish `joined`.
  Do this in every `NODE_ENV`.
- **On SIGINT/SIGTERM:** `leaveErxesGateway` runs `SREM`, deletes the heartbeat
  and address keys, and publishes `left`.
- **Address:** `process.env.SERVICE_ADDRESS` if set, otherwise
  `http://localhost:${port}`. Remove `LOAD_BALANCER_ADDRESS` and the
  `plugin-${name}-api` hostname convention.
- **UI remote entry:** new optional `startPlugin` option `uiRemoteEntry`,
  defaulting to `process.env.UI_REMOTE_ENTRY`. It is stored in the manifest.
- **Locales:** new optional `startPlugin` option `localesDir`. When set, the
  plugin serves `GET /locales/:lng/:file`, using the same validation as the
  gateway's `isValidLocaleParams` plus the path-traversal check. The gateway's
  existing fan-out then works unchanged.

**Consumer side** (`erxes-api-shared` utilities used by every process):

- `getPlugins()` returns `['core', ...alive members of erxes:plugins]`, where
  "alive" means the heartbeat key exists.
- `isEnabled(name)` returns whether `name` is in `getPlugins()`.
- The per-process caches (`serviceInfoCache`, `pluginAddressCache`):
  - never cache misses;
  - are invalidated by a Redis subscriber on `erxes:plugins:changed`, using a
    dedicated ioredis connection;
  - have a 60-second safety TTL.
- Delete `setActivePlugins()`, `getActivePlugins()` and the
  `erxes-active-plugins` key. Their consumers use `getPlugins()`.
- `getAvailablePlugins(subdomain)`:
  - OS mode: `getPlugins()`.
  - SaaS mode: organization charges ∩ `getPlugins()`, with no env
    intersection. Keep the rest of the SaaS logic as it is.
- Keep the pure logic (manifest parsing, alive filtering, diffing target
  lists) in functions that can be unit-tested without Redis.

**Gateway:**

- **Boot:** don't wait for any plugin. Only core must be reachable.
- **Reaper:** every 10 seconds, remove `erxes:plugins` members whose heartbeat
  has expired, and publish `left` for each one.
- **On `erxes:plugins:changed` (debounced 2 s):**
  - recompute the proxy targets from `getPlugins()`;
  - fetch each subgraph's SDL, **skipping** any plugin that fails and logging
    it;
  - compose the supergraph. If composition fails, keep the last good
    supergraph and log the error.
- **Router:** always spawn it with `--hot-reload`, so a new supergraph file is
  picked up without a restart. Delete:
  - the `restartRouter`-on-change path, but keep crash recovery;
  - the BullMQ `update-apollo-router` job and its producer in
    `joinErxesGateway`;
  - the 10-second development poll.
- **Subscriptions:** rebuild the executable subscription schema on change
  (download `subscriptionPlugin.js` for newly joined plugins, drop it for plugins
  that left). Serve it through graphql-ws `useServer({ schema: () => current })`,
  so new connections get the new schema without a restart.

### D2. Runtime UI remotes

- **`GET /get-frontend-plugins`:** keep the path and the response shape
  `{ name: '<plugin>_ui', entry }[]`. Build it from `getAvailablePlugins(subdomain)`,
  including only plugins whose manifest has a `uiRemoteEntry`, with
  `entry = uiRemoteEntry`. Remove the `plugins.erxes.io` URL construction and
  the SaaS `agent_ui` append.
- **core-ui startup:** in **every** environment, development included,
  `bootstrap.tsx` fetches the list and calls `init()`.
  - Remove `remotes` from `module-federation.config.ts`, remove
    `ENABLED_PLUGINS` from the rspack DefinePlugin, and drop `--devRemotes`.
  - `nx serve core-ui` must work with zero plugin projects in the workspace.
- **Live updates:** core-ui re-fetches the list every 30 seconds and on window
  focus, then diffs it against the current remotes.
  - New remote: `registerRemotes([...])`, load `<remote>/config`, and add it
    to `pluginsConfigState`.
  - Removed remote: delete it from `pluginsConfigState`, so its navigation and
    routes disappear.
  - Put the diff in a pure, unit-tested function.
- **Replace `isEnabled()`:** delete `isEnabled()` from `erxes-ui`. Add
  `useIsPluginEnabled(name)` to `ui-modules`, backed by `pluginsConfigState`,
  for plugins to use.

### D3. Where things go

**Extracted plugin repositories.** They are created locally, as siblings of
this repository, at `../erxes-plugins/erxes-plugin-<name>`. Their remote name
is `amaraa0404org/erxes-plugin-<name>`, but create and push the remotes only
after the user confirms.

The layout inside each extracted repository (built with `git filter-repo`
path renames):

| From (this repo) | To (plugin repo) |
| --- | --- |
| `backend/plugins/<n>_api/` | `api/` |
| `frontend/plugins/<n>_ui/` | `ui/` |
| `backend/gateway/src/locales/{en,mn}/<n>.json` | `api/locales/{en,mn}/<n>.json` |
| `backend/saas-migrations/<n>/` | `migrations/saas/` |
| `.github/workflows/ci-{api,ui}-<n>.yml` | `.github/workflows/` |
| `frontend/plugins/AGENTS.md` | `docs/frontend-plugin-rules.md` |

Plugin-specific extras, added with history:

- **frontline:**
  - `apps/frontline-widgets/` → `apps/frontline-widgets/`
  - `apps/help-center/` → `apps/help-center/`
  - `cloudflare/mail-worker/` → `workers/mail-worker/`
  - `ci-apps-frontline-widgets.yml` and `ci-apps-help-center.yml`
- **posclient:**
  - `apps/posclient-front/` → `apps/posclient-front/`
  - `ci-apps-posclient-front.yml`
- **sales:** `frontend/libs/ui-modules/src/modules/sales/` → `shared-ui/sales/`
- **loyalty:** the loyalty parts of `ui-modules/src/modules/payments`
  (`useLoyaltyScoreCampaign`, `ScoreCampaignQuery`) → `shared-ui/payments/`
- **mongolian:** `ui-modules` `contacts/hooks/useCompanyNameByRegister.ts` and
  its query → `shared-ui/contacts/`

Plugins: `accounting`, `content`, `frontline`, `insurance`, `loyalty`,
`mongolian`, `operation`, `payment`, `posclient` (api only), `sales`,
`tourism`. `frontend/plugins/mastra_ui` (an orphan file with no project) and
`backend/gateway/src/locales/*/mastra.json` are simply deleted.

**Target layout of this repository** (Milestone 5). Nx project names and the
package names `erxes-api-shared`, `erxes-ui` and `ui-modules` stay unchanged.

```text
apps/
  core-api/          ← backend/core-api
  gateway/           ← backend/gateway
  automations/       ← backend/services/automations   (project: automations-service)
  logs/              ← backend/services/logs          (project: logs-service)
  core-ui/           ← frontend/core-ui
packages/
  erxes-api-shared/  ← backend/erxes-api-shared
  erxes-ui/          ← frontend/libs/erxes-ui
  ui-modules/        ← frontend/libs/ui-modules
tools/
  saas-migrations/   ← backend/saas-migrations (core parts only)
examples/
  plugin-hello/api/  (new, Milestone 1; project: hello_api)
  plugin-hello/ui/   (new, Milestone 2; project: hello_ui)
  client-portal/     ← apps/client-portal-template (stays outside the pnpm workspace and Nx)
docs/
```

### D4. Types

- **tRPC:**
  - `erxes-api-shared` context and setup types use real types (`AnyTRPCRouter`,
    typed context, `unknown` instead of `any`).
  - `sendTRPCMessage<TOutput = unknown>` and
    `sendCoreModuleProducer<TOutput = unknown>` become generic, and every core
    call site supplies its result type.
  - Every core `z.any()` input becomes a real zod schema. Free-form Mongo
    selectors, update docs and options are allowed as
    `z.record(z.string(), z.unknown())`.
  - Router paths (`module.action`) must not change: they are the plugin
    contract.
- **GraphQL:**
  - Adopt `@graphql-codegen/cli` with the `typescript` and
    `typescript-resolvers` plugins (`federation: true`, `contextType: IContext`,
    mappers to the Mongoose document interfaces) for `core-api`. Add a
    `codegen` Nx target, and commit the output to
    `apps/core-api/src/__generated__/graphql.ts`.
  - Replace the `Resolver<any, any, IContext>` maps with the generated
    `Resolvers` types, module by module.
  - Pin devDependency versions published at least 7 days ago.
- **Nullability rule:** mark a field `!` only when a value is **guaranteed at
  runtime**:
  - the Mongoose field is required or has a default; or
  - the resolver always returns a value.

  Watch out for `.lean()`: it returns `undefined` for missing arrays and
  fields. When in doubt, leave the field nullable.
  - All `_id` fields on object types get `!`, `@key` entities first.
  - List items that are never null become `[T!]`. A list whose resolver always
    returns an array becomes `[T!]!`.
  - Arguments without which the resolver throws or misbehaves get `!`.
  - Do not rename or remove fields, arguments or operations, except the
    removals in Milestone 3.
  - Update the hand-written frontend TypeScript interfaces in core-ui,
    erxes-ui and ui-modules that mirror any field whose nullability you
    changed.
- **Enforcement:**
  - Add an eslint flat config to `core-api`, `gateway`, `erxes-api-shared`,
    `automations-service` and `logs-service`, so the Nx lint target is
    inferred.
  - It sets `@typescript-eslint/no-explicit-any: error` for files under
    `**/trpc/**`, `**/graphql/**` and `**/apollo/**`.
  - Each remaining necessary `any` gets a line-level disable comment with a
    reason.
  - `noImplicitAny` for the whole project is deferred to the next phase.

## Milestones and tasks

Do the milestones in order. Within a milestone, do the tasks in order unless
they are marked as independent.

### Milestone 0: Baseline

- [x] 0.1 Run `build` (and `test`, where the target exists) for `erxes-api-shared`,
  `core-api`, `gateway`, `automations-service`, `logs-service`, `core-ui`,
  `erxes-ui` and `ui-modules`. Record pass or fail and the pre-existing
  failures in the *Baseline* table below. Later milestones must not add
  failures beyond this baseline.

### Milestone 1: Backend runtime registry (D1)

Plugins are still in the repository. Use them, and the new example plugin, to
test.

- [x] 1.1 Cherry-pick `d6f5e3b407`, the service-discovery miss-cache fix and
  its test harness.
- [x] 1.2 Implement the D1 plugin side in `erxes-api-shared`: presence
  keys, heartbeat, graceful leave, pub/sub, `SERVICE_ADDRESS`,
  `uiRemoteEntry` and `localesDir`.
- [x] 1.3 Implement the D1 consumer side: `getPlugins()`, `isEnabled()`, cache
  invalidation, and `getAvailablePlugins()`. Delete `setActivePlugins()` and
  `getActivePlugins()`, and migrate their consumers. Add unit tests for the
  pure functions.
- [x] 1.4 Gateway, per D1:
  - non-blocking boot, the reaper, and debounced recomposition that skips
    failing subgraphs and keeps the last good supergraph;
  - `--hot-reload`;
  - the dynamic subscription schema;
  - delete the `update-apollo-router` job and the development poll.
- [x] 1.5 Remove every reader of `ENABLED_PLUGINS`, `ENABLED_PLUGINS_ONLY_API`
  and `ENABLED_SERVICES` on the backend. Replace `scripts/start-api-dev.js`
  with a root script `dev:api`, which runs
  `nx run-many -t serve -p core-api gateway automations-service logs-service`.
- [x] 1.6 Create `examples/plugin-hello/api` (Nx project `hello_api`):
  - a `startPlugin` service with one GraphQL query `helloPing: String!`, one
    tRPC query `hello.ping`, `localesDir`, and a `UI_REMOTE_ENTRY` default for
    its development UI;
  - `examples/plugin-hello/AGENTS.md`, a short guide.
- [x] 1.7 End-to-end check. Record the evidence (commands, timings) in the
  commit message body.
  1. Start `dev:api` with no plugins; the gateway boots.
  2. Start `hello_api`. Within about 15 seconds `{ helloPing }` works through
     the gateway at `:4000/graphql`, with no restart.
  3. Stop `hello_api`. Within about 45 seconds `helloPing` is gone from the
     schema.
  4. Repeat steps 2 and 3 with one real plugin (`sales_api`).

### Milestone 2: Frontend runtime remotes (D2)

- [x] 2.1 core-api `GET /get-frontend-plugins` per D2.
- [ ] 2.2 core-ui:
  - `init()` in every environment; delete the static remotes and the
    `ENABLED_PLUGINS` define;
  - replace `scripts/start-ui-dev.js` with the root script `dev:ui`, which
    serves `core-ui` alone;
  - the 30-second and on-focus live diff with `registerRemotes`, plus a unit
    test for the diff.
- [ ] 2.3 Delete `erxes-ui` `isEnabled()` and add `ui-modules`
  `useIsPluginEnabled()`.
- [x] 2.4 Create `examples/plugin-hello/ui` (Nx project `hello_ui`): a Module
  Federation remote exposing `./config` (a navigation entry and one page
  that calls `helloPing`) and `./hello`, served on its own port.
- [ ] 2.5 End-to-end check:
  1. Open core-ui with only core running.
  2. Start `hello_api` and `hello_ui`. Within about 30 seconds the Hello
     navigation item appears and the page renders `helloPing`, with no reload
     of core-ui and no restart.
  3. Stop both. The navigation item disappears.

### Milestone 3: Decouple core from plugin domains

Remove plugin knowledge from core. Log every removed field, argument, template
or constant in the *Contract changes log*, naming the plugin that must take it
over.

- [ ] 3.1 core-api GraphQL:
  - remove the `Customer.conversations` field (frontline should extend
    `Customer` through federation);
  - remove the `pipelineId` argument and filter from the products queries
    (sales);
  - remove the `clientPortalCheckTokiInvoice` mutation (payment).
- [ ] 3.2 core-api import-export templates: remove `frontline:ticket.ticket`
  and `accounting:account.account` (`modules/import-export/trpc/templates.ts`).
- [ ] 3.3 Keep the optional contract calls from core to plugins, which degrade
  gracefully when the plugin is absent, and make sure each is gated by
  `isEnabled` and never throws when the plugin is missing:
  - broadcast `Engages.ts` → frontline (×4)
  - `contacts/utils.ts` `findIntegrations` → frontline
  - `clientportal/db/models/Comment.ts` → sales
  - `erxes-api-shared/src/utils/editor.ts` → sales

  Delete the commented-out frontline calls in `broadcast/utils/common.ts` and
  `broadcast/utils/telnyx.ts`. List the kept calls under *Carry-over*.
- [ ] 3.4 core-ui: remove plugin-specific code:
  - the `'sales'` namespace preload in `i18n/config.ts`;
  - `'mongolian'` in `GlobalSearchItem.tsx`;
  - `'frontline:conversation'` in `widgets/constants/core-relations.ts`;
  - `'sales:deal'` in `documents/constants.ts`;
  - the legacy `tickets:ticket` map in `useManagePropertySidebarContent.ts`;
  - `.sales-description` in `styles.css`.
- [ ] 3.5 ui-modules: remove `pipelineId` from the products queries and
  `SelectProductsBulk`. The `sales` module, the loyalty hook in `payments` and
  `useCompanyNameByRegister` are removed in Milestone 4, after extraction.
  Confirm now that core-ui does not import them. If it does, stop and record
  it under *Open issues*.
- [ ] 3.6 Build and test every core project against the baseline. Boot core
  with zero plugins and smoke-test contacts, products, the client portal
  and broadcasts.

### Milestone 4: Extract plugins, then delete them

- [ ] 4.1 For each plugin, from a fresh `git clone --no-local` of this
  repository at the current `HEAD`, run `git filter-repo` with the D3 paths
  and renames into `../erxes-plugins/erxes-plugin-<name>`. Then add, in one
  commit per repository:
  - a copy of `LICENSE.md`;
  - a `.gitignore`;
  - a `README.md` stating: source repository and commit SHA, the layout,
    "snapshot, not yet standalone-buildable", the entries of the *Contract
    changes log* that affect this plugin, and its known dependencies on other
    plugins (for example frontline_ui imports content_ui types; posclient,
    mongolian, loyalty, tourism, accounting and frontline call sales over
    tRPC).
- [ ] 4.2 Verify each extracted repository: `git log --follow` shows history
  for a sample file, and every D3 source path is present. **Ask the user**
  whether to create the GitHub repositories (visibility?) and push. Do this
  only if they confirm.
- [ ] 4.3 Delete from this repository:
  - `backend/plugins/`, `frontend/plugins/`
  - the plugin locale files and `mastra.json` in the gateway
  - the plugin directories in `backend/saas-migrations/`
  - `apps/frontline-widgets`, `apps/help-center`, `apps/posclient-front`,
    `cloudflare/`
  - `ui-modules` `modules/sales`, the loyalty payments hook and
    `useCompanyNameByRegister` (fix the barrel exports)
  - the plugin CI workflows (`ci-api-<plugin>`, `ci-ui-<plugin>`,
    `ci-apps-*` for the moved apps)
  - `scripts/create-plugin.js` and `scripts/create-backend-plugin.js` (the
    example plugin replaces the generator)
  - the plugin references in root `tsconfig.json`, `.gitignore` and
    `.nxignore`
- [ ] 4.4 Run `pnpm install` so the lockfile drops the plugin importers. Build
  and test every core project against the baseline. Repeat the Milestone 1
  and 2 end-to-end checks with `plugin-hello`.

### Milestone 5: Restructure directories (D3 target layout)

- [ ] 5.1 Move the files with `git mv`, in one commit containing only moves.
- [ ] 5.2 Fix every path in a separate commit:
  - `pnpm-workspace.yaml`
  - `tsconfig.base.json` paths and root `tsconfig.json` references (also fix
    the trailing comma)
  - each project's `project.json`, `tsconfig*`, `jest.config`, `eslint.config`,
    `rspack` and Module Federation config (the depth of `../` changes)
  - `nx.json` (drop the missing `.github/workflows/ci.yml` from
    `sharedGlobals`)
  - the root `eslint.config.js` allow list
  - `.gitignore`
  - the root `package.json` scripts

  Leave Dockerfiles and workflows alone; they are out of scope.
- [ ] 5.3 Hygiene:
  - delete the tracked `.pnpm-store/`, the root `index.html`,
    `MERGE_FK_TASK.md`, `HACKTOBERFEST.md` and `.opencode/AGENTS.md`;
  - delete root `core-libraries.ts` if nothing references it;
  - move `backend/README.md` content into `docs/` or delete it if obsolete;
  - add `.pnpm-store` to `.gitignore`.
- [ ] 5.4 `pnpm install`, then build and test every core project against the
  baseline, and repeat the end-to-end checks.

### Milestone 6: Core GraphQL and tRPC types (D4)

- [ ] 6.1 Shared contract types in `erxes-api-shared`: tRPC context and setup
  types, the `start-plugin` types, `IMainContext`, the `Resolver` defaults,
  and the generic `sendTRPCMessage` / `sendCoreModuleProducer`.
- [ ] 6.2 core-api tRPC: real zod inputs for every procedure, worst files
  first: `contacts/trpc/customer.ts`, `conformities/trpc/conformity.ts`,
  `forms/trpc/fields.ts`, `products/trpc/*`, `contacts/trpc/company.ts`,
  `relations/trpc/relation.ts`, `organization/**/trpc/*`, `tags`, `brand`,
  and the rest. Then `automations-service` tRPC (`z.any()` ×4). Type each
  core call site of `sendTRPCMessage`.
- [ ] 6.3 Set up codegen for core-api (the `codegen` target and generated
  types). Check that the generated schema matches the running subgraph SDL.
- [ ] 6.4 GraphQL nullability and resolver typing, module by module, one commit
  per module. Apply the D4 rules and switch the resolver maps to the
  generated types. Update the mirrored frontend interfaces in the same commit.
- [ ] 6.5 Gateway and `logs-service`: remove the `any` in GraphQL, tRPC and
  subscription code.
- [ ] 6.6 Enforcement, per D4: backend eslint configs and scoped
  `no-explicit-any: error`. `pnpm nx lint` passes for every core project.
- [ ] 6.7 Build and test every core project against the baseline, and run the
  end-to-end checks. Boot with zero plugins; the gateway must compose with no
  schema errors.

### Milestone 7: Docs and rules

- [ ] 7.1 `.env.sample`: remove the plugin-list keys, and document
  `SERVICE_ADDRESS` and `UI_REMOTE_ENTRY` (both for plugin processes).
- [ ] 7.2 `docs/plugin-runtime.md`: the plugin contract, covering the manifest,
  heartbeat and TTL, the pub/sub channel, the UI remote entry, `localesDir`,
  `/get-frontend-plugins`, and how to run `plugin-hello`.
- [ ] 7.3 `README.md` and `CONTRIBUTING.md`: update the development
  instructions to the new layout and scripts, and link the external plugin
  repositories.
- [ ] 7.4 `AGENTS.md`: update the structure, paths and plugin sections for
  external plugin repositories and `examples/plugin-hello`. Keep the
  "read PLAN.md" rule at the top. Target less than 12 KB. **Propose the diff
  to the user and wait for approval before committing.**

## Baseline

Recorded 2026-09-25 on `refactor/phase-1` at `6c1d515a73`.

| Project | build | test | Pre-existing failures |
| --- | --- | --- | --- |
| erxes-api-shared | PASS | PASS (30 suites / 268 tests) | — |
| core-api | PASS | no test target | — |
| gateway | PASS | no test target | — |
| automations-service | PASS | no test target | — |
| logs-service | PASS | no test target | — |
| core-ui | PASS | PASS (6 suites / 26 tests) | — |
| erxes-ui | no build target | FAIL — placeholder script `echo "Error: no test specified" && exit 1` | package.json `test` script is a stub; the one real spec file never runs |
| ui-modules | no build target | FAIL — same placeholder script | same |

Notes: backend projects have inferred `lint` targets that stub `eslint .` with no
eslint config (would fail if run — fixed in 6.6). `erxes-ui`/`ui-modules` have
no `build` target.

## Contract changes log

_Append one line per removed or changed core contract:
`- <milestone.task> <what changed> — owner: <plugin>`._

- 1.2 `joinErxesGateway` no longer enqueues the BullMQ
  `update-apollo-router` job and drops `LOAD_BALANCER_ADDRESS` /
  `plugin-{name}-api` hostnames; the plugin address is `SERVICE_ADDRESS` or
  `http://localhost:{port}` — owner: core/gateway
- 1.2 New presence contract: `erxes:plugins` set, `erxes:plugin:alive:{name}`
  heartbeat (TTL 30 s, refreshed every 10 s), `erxes:plugins:changed` pub/sub
  payloads `{ name, event: 'joined'|'left' }`; the manifest may now carry a
  top-level `uiRemoteEntry` — owner: core/gateway
- 1.3 `setActivePlugins()` / `getActivePlugins()` and the
  `erxes-active-plugins` Redis key are deleted; consumers use `getPlugins()`
  — owner: core
- 1.3 `ENABLED_PLUGINS` / `ENABLED_PLUGINS_ONLY_API` no longer feed service
  discovery; `getPlugins()` returns `['core', ...alive members of
  erxes:plugins]` — owner: core
- 1.4 The BullMQ `update-apollo-router` job/worker and the development
  supergraph poll are deleted; the router always runs with `--hot-reload` and
  picks up recomposed supergraph files itself — owner: core/gateway
- 1.5 `scripts/start-api-dev.js` is deleted; root script `dev:api` serves
  `core-api gateway automations-service logs-service` directly — owner: core
- 2.1 `GET /get-frontend-plugins` builds the remote list from
  `getAvailablePlugins(subdomain)` and uses each plugin manifest's
  `uiRemoteEntry` as `entry`; the `plugins.erxes.io` CDN URL construction
  and the SaaS `agent_ui` append are gone — owner: core/plugins

## Open issues

_Append problems that block following this plan as written:
`- <date> <task>: <problem> — <status>`._

- 2026-09-25 task 1.7: `sales_api` under `tsx watch` does not complete
  `leaveErxesGateway` on SIGTERM (parent kills it mid-shutdown). The reaper
  covers it within ~45 s, but `erxes-service-{name}` stays stale. — open,
  reaper should also DEL the address key
- 2026-09-25 task 1.7: plugin GraphQL resolvers are wrapped in `checkLogin`
  by default; `helloPing` requires an authenticated request. Expected, but
  remember it for 2.5. — noted

## Carry-over to the next phase

- Optional core → plugin contract calls kept in Milestone 3.3 should become
  generic extension points.
- Broadcast `CONTENT_TYPES` still lists `deal`, `task`, `ticket` and
  `conversation`. `core-ui` `promotedNavigationActivities.ts` still ranks
  `cf-os` and `erxes-agent`. The legacy one-shot migrations in
  `core-api/src/commands/` still reference plugin content types.
- Deployment: Dockerfiles and workflows point to pre-restructure paths, and
  per-plugin CI and image publishing were removed with the plugins.
- SDK: publish `erxes-api-shared`, `erxes-ui` and `ui-modules` (exports
  maps, peer dependencies, no deep `src/` imports) so the plugin repositories
  can build standalone. Add a typed cross-service tRPC contract.
- GraphQL redesign: `input` types instead of interpolated argument lists, and
  fewer `JSON` scalars. Enable `noImplicitAny` for backend projects.
- Admin UI for enabling and disabling plugins, and installing plugins from a
  URL or marketplace.
