# Runtime plugin contract

erxes core carries **no plugin list**. A plugin is installed exactly while its
process is alive: it announces itself in Redis when it starts, heartbeats while
it runs, and disappears when it stops — no restart or rebuild of core, and no
env-based plugin list to configure. This document is the contract an
external plugin repository must implement. The reference implementation is
[`examples/plugin-hello`](../examples/plugin-hello/AGENTS.md).

## Registry: presence in Redis

A plugin process registers by calling `startPlugin({...})` from
`erxes-api-shared`, which writes the following once the HTTP listener is up:

| Key / channel               | Type          | Meaning                                                                                              |
| --------------------------- | ------------- | ---------------------------------------------------------------------------------------------------- |
| `erxes-service-{name}`      | string        | Base address of the plugin (`SERVICE_ADDRESS`, or `http://localhost:<port>`)                         |
| `erxesservice:config:{name}`| string (JSON) | Manifest: `{ dbConnectionString, hasSubscriptions, meta, releaseVersion, uiRemoteEntry? }`           |
| `erxes:plugins`             | set           | Names of registered plugins (never contains `core` or internal services)                             |
| `erxes:plugin:alive:{name}` | string        | Heartbeat, TTL **30 s**, refreshed every **10 s**                                                    |
| `erxes:plugins:changed`     | pub/sub       | Payload `{ "name": "<plugin>", "event": "joined" \| "left" }`                                        |

Lifecycle:

- **Join:** on listen, the plugin writes the address and manifest, `SADD`s
  itself to `erxes:plugins`, sets the heartbeat key, starts the 10-second
  heartbeat interval, and publishes `joined`. This happens in every
  `NODE_ENV`.
- **Graceful leave:** on `SIGINT`/`SIGTERM`, `SREM` from `erxes:plugins`,
  delete the heartbeat and address keys, publish `left`. The manifest key is
  deliberately kept and merged on rejoin.
- **Crash:** the heartbeat expires. The gateway's reaper runs every 10 s,
  removes set members whose heartbeat is gone, and publishes `left` for each —
  a dead plugin disappears within ~45 s worst case.

Consumers (`getPlugins()`, `isEnabled()`, `getPlugin()`,
`getPluginAddress()` in `erxes-api-shared`) read this registry. Per-process
caches never cache misses, are invalidated by a subscriber on
`erxes:plugins:changed`, and carry a 60 s safety TTL.

## Gateway behavior

- **Boot is non-blocking:** only `core` must be reachable. Whichever plugins
  are alive are picked up; everything else joins at runtime.
- **On `erxes:plugins:changed` (debounced 2 s):** recompute proxy targets from
  `getPlugins()`, fetch each subgraph's SDL skipping and logging any plugin
  that fails, then compose the supergraph. If composition fails, the last good
  supergraph stays in place.
- **Router:** the Apollo Router runs with `--hot-reload`, so a rewritten
  supergraph file is picked up without a router restart.
- **Subscriptions:** the executable subscription schema is rebuilt on every
  join/leave (`subscriptionPlugin.js` is fetched from newly joined plugins with
  `hasSubscriptions`, departed plugins drop out). The schema is read at
  subscribe time, so new connections get the current schema without a restart.
- **Locales:** `GET /locales/:lng/:file` is answered from the gateway's own
  `src/locales` first; on a miss it fans out to
  `${plugin.address}/locales/{lng}/{file}` for every live plugin. A plugin
  serves that route itself by passing `localesDir` to `startPlugin` (files laid
  out as `{lng}/{file}.json`).

## Frontend remotes

- `GET /get-frontend-plugins` (core-api) returns
  `[{ name: '<plugin>_ui', entry: <uiRemoteEntry> }]` built from
  `getAvailablePlugins(subdomain)`; plugins without a `uiRemoteEntry` in their
  manifest are skipped. Remote names use underscores only — dashes in a plugin
  name are converted (`erxes-agent` → `erxes_agent_ui`). In SaaS mode the list
  is intersected with the organization's charges.
- core-ui fetches the list and calls `init()` at boot in **every**
  environment, then re-syncs every **30 s** and on **window focus**:
  new remotes are added with `registerRemotes`, removed remotes are dropped
  from `pluginsConfigState` so their navigation and routes disappear.
- A remote must expose:
  - `./config` — a module with a named export `CONFIG: IUIConfig`
    (`name`, `path`, `icon`, `i18n`/`i18nNamespace`, `modules`, widgets, …);
    loaded once per remote into `pluginsConfigState`.
  - `./<pluginName>` — the route module the host mounts at `/<path>/*`
    (named export; e.g. `hello_ui` exposes `./hello` → `HelloMain.tsx`).

## Writing a plugin

Copy [`examples/plugin-hello`](../examples/plugin-hello/) — its `api/` and
`ui/` halves show the full shape; see
[`examples/plugin-hello/AGENTS.md`](../examples/plugin-hello/AGENTS.md) for the
project layout, aliases, and validation commands.

Backend (`startPlugin` options, `erxes-api-shared/utils`):

- `name`, `port` — identity and listen port (`PORT` env overrides `port`).
- `graphql`, `apolloServerContext` — the subgraph schema (built with
  `@apollo/subgraph`) and context.
- `trpcAppRouter` — `{ router, createContext }`; mounted at `/trpc`.
- `hasSubscriptions` + `subscriptionPluginPath` — serve
  `/subscriptionPlugin.js` for the gateway's subscription schema.
- `uiRemoteEntry` — remoteEntry.js URL; defaults to
  `process.env.UI_REMOTE_ENTRY`. Stored in the manifest.
- `localesDir` — enables `GET /locales/:lng/:file` on the plugin.
- `meta` — permissions, automations, segments, notifications, documents,
  tags, import/export, and the other extension points declared in
  `start-plugin.ts`.
- `SERVICE_ADDRESS` — env override for the registered address (default
  `http://localhost:<port>`); needed when consumers reach the plugin on a
  different host or container name.

Dependencies: until the SDK packages are published (a later phase), plugin
repositories consume `erxes-api-shared`, `erxes-ui` and `ui-modules` as
**source dependencies** — keep a checkout of this repository alongside the
plugin repo, the way `examples/plugin-hello` does inside the workspace.

### Extracted plugin repositories

The plugins that used to live in this monorepo are now separate repositories,
`amaraa0404org/erxes-plugin-<name>`:

`accounting`, `content`, `frontline`, `insurance`, `loyalty`, `mongolian`,
`operation`, `payment`, `posclient` (api only), `sales`, `tourism`.

## Running the example

```bash
pnpm install
pnpm dev:api            # gateway :4000 + core-api :3300 + services
pnpm nx serve hello_api # plugin API on :3340, registers itself in Redis
pnpm nx serve hello_ui  # remote on :3099
pnpm dev:ui             # core-ui host on :3001
```

Within ~15 s of `hello_api` starting, `{ helloPing }` resolves through the
gateway at `http://localhost:4000/graphql`; once `hello_ui` is serving, a Hello
navigation entry appears in core-ui within ~30 s. Stopping the plugin reverses
both — immediately on a graceful stop, within ~45 s after a kill.
