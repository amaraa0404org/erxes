# plugin-hello — Reference plugin

`plugin-hello` is the minimal example of an erxes runtime plugin. It exists to
exercise the presence-based plugin registry (PLAN.md D1): a plugin process
announces itself to the gateway through Redis and appears in the schema with no
restart or rebuild, then disappears when the process stops.

It is also the reference shape for extracted plugin repositories
(`../erxes-plugins/erxes-plugin-<name>`): an `api/` directory with its own
`package.json`, Nx project, tsconfig path aliases, and a `startPlugin` entry
that depends only on `erxes-api-shared`.

## Projects

| Project    | Path       | Layer       |
| ---------- | ---------- | ----------- |
| `hello_api` | `api/`    | Backend API |
| `hello_ui`  | `ui/`     | Frontend UI |

## api (`hello_api`)

- Starts through `startPlugin({ name: 'hello', port: 3340, ... })` from
  `erxes-api-shared/utils` (`src/main.ts`).
- `uiRemoteEntry` defaults to `process.env.UI_REMOTE_ENTRY`, falling back to
  `http://localhost:3099/remoteEntry.js` so the dev UI works out of the box.
  It is stored in the plugin manifest and returned by
  `GET /get-frontend-plugins`.
- `localesDir` points at `src/locales`; the plugin serves
  `GET /locales/:lng/:file` (e.g. `/locales/en/hello.json`). Locale files are
  laid out per language like the gateway's own locales
  (`{en,mn}/hello.json`), matching the namespace the frontend requests.
- `hasSubscriptions: false`; no models, no `connectionResolvers` — the plugin
  is deliberately stateless.

### Contracts provided

- GraphQL (subgraph): `Query.helloPing: String!` → `'pong'`
  (`src/modules/hello/graphql/`).
- tRPC: `hello.ping` query → `{ pong: true }` (`src/trpc/init-trpc.ts`).
- HTTP: `GET /locales/:lng/:file` from `src/locales/{lng}/{file}.json`.
- Registration manifest: `uiRemoteEntry` from `UI_REMOTE_ENTRY` or the dev
  default above.

### Path aliases (tsconfig)

- `~/*` → `src/*`, `@/*` → `src/modules/*`.
- `erxes-api-shared/*` → `packages/erxes-api-shared/src/*` in dev; the published
  workspace package in `tsconfig.build.json`.

## ui (`hello_ui`)

- Module Federation remote `hello_ui`, built with `@nx/rspack`; dev server on
  **3099**, which matches `hello_api`'s default `uiRemoteEntry`.
- Exposes (`module-federation.config.ts`):
  - `./config` → `src/config.tsx`: `CONFIG: IUIConfig` with
    `name: 'hello'`, `path: 'hello'`, `i18n: true` (loads the `hello`
    namespace served by `hello_api`'s `localesDir`), and one `hello` module
    for the navigation entry.
  - `./hello` → `src/modules/hello/HelloMain.tsx`: named export `Hello`, the
    route module the host loads at `/hello/*`.
- `src/modules/hello/HelloPage.tsx` runs `query HelloPing { helloPing }`
  (`src/modules/hello/graphql/queries.ts`) through the shared Apollo Client
  and renders loading, error, empty, and result states with `erxes-ui`
  components.
- `src/main.ts` is a dynamic `import('./bootstrap')` boundary; `bootstrap.tsx`
  renders a stub because the remote is mounted through the host.
- No `package.json`: dependencies resolve from the root install.

### Path aliases (tsconfig)

- `~/*` → `src/*`, `@/*` → `src/modules/*`, plus `erxes-ui` →
  `packages/erxes-ui/src` and `ui-modules` →
  `packages/ui-modules/src` (repo-root-relative). The directory form matters:
  `withNx` turns these paths into rspack aliases, and a file-valued alias
  would break deep imports like `erxes-ui/hooks`.

## Validation

- `pnpm nx build hello_api` (runs `^build` first, so `erxes-api-shared`
  rebuilds)
- `pnpm nx serve hello_api` — dev server on `:3340`
- `pnpm nx show project hello_api` — project graph resolution
- `pnpm nx build hello_ui` / `pnpm nx lint hello_ui`
- `pnpm nx serve hello_ui` — Module Federation dev server on `:3099`
  (`remoteEntry.js` at `http://localhost:3099/remoteEntry.js`)
- Smoke: `curl http://localhost:3340/health` → `ok`;
  `curl http://localhost:3340/locales/en/hello.json` → the en translations;
  `{ helloPing }` on `:3340/graphql` and through the gateway on
  `:4000/graphql` once the plugin has registered; with `hello_ui` serving,
  core-ui picks the remote up from `GET /get-frontend-plugins` and renders a
  Hello navigation entry whose page shows `pong`.
