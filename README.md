# Travel Tools

`Travel Tools` is a single-package TanStack Start application for travel-focused utilities.

## Stack

- TanStack Start
- TanStack Router file-based routing
- Tailwind CSS
- shadcn-style local UI components
- Cloudflare Workers + D1 + KV

## Routes

- `/$locale`
- `/$locale/tools/currency`
- `/$locale/tools/split-bill`
- `/$locale/tools/split-bill/$tripId`
- `/$locale/tools/split-bill/$tripId/add`
- `/$locale/tools/split-bill/$tripId/settlement`
- `/$locale/settings`

## API

- `GET /api/site/health`
- `GET /api/fx/detect`
- `GET /api/fx/rates`
- `POST /api/split-bill/device/bootstrap`
- `GET|POST /api/split-bill/trips`
- `PATCH|DELETE /api/split-bill/trips/:tripId/*`

## Local Development

```bash
pnpm install
pnpm dev
```

## Verification

```bash
pnpm test
pnpm typecheck
pnpm build
```
