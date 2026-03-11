# Travel Tools Monorepo

A Cloudflare-native travel utility site organized as a real workspace monorepo.

Current tools:

- `Currency Converter`
- `Split Bill`

## Workspace Layout

```text
apps/
  web/       React + Vite frontend
  worker/    Hono + Cloudflare Worker
packages/
  shared/    shared domain logic, tool registry, storage keys, FX helpers
  i18n/      locale messages and translation helpers
  ui/        shared UI primitives
migrations/  D1 schema migrations
tests/       repo-level verification
```

## Stack

- Frontend: React + Vite + Tailwind
- Backend: Cloudflare Workers + Hono
- Data: Cloudflare D1 + KV
- PWA: manifest + service worker
- Monorepo: pnpm workspace

## Commands

```bash
pnpm install
pnpm run dev:web
pnpm run dev:worker
pnpm run test
pnpm run typecheck
pnpm run build
pnpm --filter @travel-tools/worker exec wrangler deploy --dry-run
```

## Routes

- `/:locale`
- `/:locale/tools/currency`
- `/:locale/tools/split-bill`
- `/:locale/settings`

## API

- `/api/site/*`
- `/api/fx/*`
- `/api/split-bill/*`

Legacy compatibility routes are still preserved where needed.

## Extending

- CI is defined in [.github/workflows/ci.yml](/Users/ricky/Documents/GitHub/tiny-currency/.github/workflows/ci.yml)
- New tool integration guide: [docs/adding-a-tool.md](/Users/ricky/Documents/GitHub/tiny-currency/docs/adding-a-tool.md)
