<p align="center">
 <img src="https://github.com/erxes/erxes/assets/1748857/53a70732-7385-475d-9cb5-efd0ec801db5" alt="erxes logo" width="20%" />
</p>

<p align="center">Experience Operating System (XOS) — a self-hosted core that loads business plugins at runtime.</p>

<p align="center">
   <a href="https://github.com/amaraa0404org/erxes/blob/main/LICENSE.md">
      <img alt="License Badge" src="https://img.shields.io/badge/license-AGPLv3-brightgreen">
  </a>
</p>

> This repository is the **plugin-free erxes core**, under active
> restructuring on `refactor/phase-1` (see [`PLAN.md`](PLAN.md)). Plugins are
> external repositories that register themselves at runtime — no env-based
> plugin lists and no plugin code in this tree.

## What is erxes?

erxes is a secure, self-hosted experience management infrastructure: an
Nx-powered pnpm monorepo of microservices (GraphQL Federation + tRPC) and
Module Federation micro-frontends (React 18, Rspack, TailwindCSS 4).

- **Core** — the modules every deployment shares: inbox, contacts, products,
  segments, automations, documents, organization.
- **Plugins** — separate processes and Module Federation remotes that announce
  themselves through Redis and appear in the gateway, the supergraph, and the
  UI without a core restart or rebuild. See
  [`docs/plugin-runtime.md`](docs/plugin-runtime.md).

## Repository structure

```text
apps/
  core-api/            Core backend modules and GraphQL API (3300)
  gateway/             API gateway — Apollo Router + service discovery (4000)
  automations/         Automations background service
  logs/                Logs background service
  core-ui/             Module Federation host (3001)
packages/
  erxes-api-shared/    Shared backend library (plugin contract, utils)
  erxes-ui/            Shared UI primitives
  ui-modules/          Shared business UI modules
tools/
  saas-migrations/     Core SaaS migrations
examples/
  plugin-hello/        Reference runtime plugin (api + ui)
  client-portal/       Standalone customer-portal template (outside Nx)
docs/                  Architecture and contract docs
```

## Quick start

Prerequisites: **Node.js 22**, **pnpm ≥ 8** (required), a local **MongoDB**
and **Redis** (any local instance — Docker, Homebrew, …).

```bash
git clone https://github.com/amaraa0404org/erxes.git
cd erxes
pnpm install

cp .env.sample .env     # then set MONGO_URL, REDIS_HOST, …

pnpm dev:api            # core-api + gateway + automations + logs (watch mode)
pnpm dev:ui             # core-ui on http://localhost:3001 (other terminal)
```

With no plugins running, core boots alone. To see a plugin join live:

```bash
pnpm nx serve hello_api   # plugin API on :3340 — registers itself in Redis
pnpm nx serve hello_ui    # plugin remote on :3099
```

Within seconds the gateway recomposes its supergraph and core-ui mounts the
remote; stopping the plugin removes it again. The contract and timings are in
[`docs/plugin-runtime.md`](docs/plugin-runtime.md).

## Working in the monorepo

```bash
pnpm nx serve <project>    # e.g. core-api, gateway, hello_api
pnpm nx build <project>
pnpm nx test <project>
pnpm nx lint <project>
pnpm nx affected --target=build
```

Backend projects consume `erxes-api-shared`; rebuild it after changing it:

```bash
pnpm nx build erxes-api-shared
```

## Plugins

Plugins live in their own repositories — `amaraa0404org/erxes-plugin-<name>` —
and implement the contract in [`docs/plugin-runtime.md`](docs/plugin-runtime.md):
`accounting`, `content`, `frontline`, `insurance`, `loyalty`, `mongolian`,
`operation`, `payment`, `posclient` (API only), `sales`, `tourism`.

To write a new plugin, copy [`examples/plugin-hello`](examples/plugin-hello/)
as the starting point.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Plugin work happens in the plugin
repositories, not here.

## License

See the [LICENSE](LICENSE.md) file.
