# Route Crate

`Route Crate` is a single-package TanStack Start application for travel-focused utilities.

## Stack

- TanStack Start
- TanStack Router file-based routing
- Tailwind CSS
- shadcn-style local UI components
- Cloudflare Workers + D1 + KV

## Routes

- `/$locale`
- `/$locale/currency`
- `/$locale/bill-splitter`
- `/$locale/bill-splitter/$tripId`
- `/$locale/bill-splitter/$tripId/add`
- `/$locale/bill-splitter/$tripId/settlement`
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

## FX Providers

- Default fallback source: `Frankfurter`
- Optional primary source: `Open Exchange Rates`

Set these Cloudflare vars or secrets to enable the dual-source strategy:

```bash
wrangler secret put OPEN_EXCHANGE_RATES_APP_ID
```

Optional:

```bash
wrangler secret put OPEN_EXCHANGE_RATES_API_BASE
```

When `OPEN_EXCHANGE_RATES_APP_ID` is present, the worker will:

- use `Open Exchange Rates` as the primary latest/historical source
- fall back to `Frankfurter` if the primary source fails
- sync the canonical latest-rate snapshot into KV every hour
- derive non-canonical base rates in memory instead of prewriting every currency into KV
- prefer local canonical rates for current-day conversions without writing per-request latest-day cache entries

## Verification

```bash
pnpm test
pnpm typecheck
pnpm build
```
