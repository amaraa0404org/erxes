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
| `hello_ui`  | `ui/`     | Frontend UI (Milestone 2) |

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

- `~/*` → `src/*`, `@/*` → `src/modules/*` (same convention as
  `backend/plugins/*`).
- `erxes-api-shared/*` → `backend/erxes-api-shared/src/*` in dev; the published
  workspace package in `tsconfig.build.json`.

## Validation

- `pnpm nx build hello_api` (runs `^build` first, so `erxes-api-shared`
  rebuilds)
- `pnpm nx serve hello_api` — dev server on `:3340`
- `pnpm nx show project hello_api` — project graph resolution
- Smoke: `curl http://localhost:3340/health` → `ok`;
  `curl http://localhost:3340/locales/en/hello.json` → the en translations;
  `{ helloPing }` on `:3340/graphql` and through the gateway on
  `:4000/graphql` once the plugin has registered.
