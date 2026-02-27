# 💱 Tiny Currency

A lightweight, offline-capable currency converter PWA for travelers. Built on Cloudflare Workers with zero client-side dependencies.

## Features

- **VPN-Resistant Detection** — Detects your currency via browser timezone, not just IP
- **Instant Conversion** — Real-time currency conversion as you type
- **Currency Picker** — Tap source/target to switch between 50+ currencies with search
- **Offline Support** — Service Worker caches pages and rates for offline use
- **Dark Mode** — Automatically follows system preference
- **Mobile-First** — Installable PWA, safe-area support, optimized for phones

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Cloudflare Workers |
| Framework | [Hono](https://hono.dev) |
| Language | TypeScript + JSX |
| Storage | Cloudflare KV (rate cache) |
| Rates API | [Frankfurter](https://frankfurter.app) |
| Frontend | Vanilla JS (no framework) |

## Getting Started

### Prerequisites

- Node.js 18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- A Cloudflare account with KV namespace

### Setup

```bash
git clone https://github.com/crossly/tiny-currency.git
cd tiny-currency
npm install
```

Create a KV namespace and update `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "RATES_KV"
id = "your-kv-namespace-id"
```

### Development

```bash
npm run dev
```

### Deploy

```bash
npm run deploy
```

## How It Works

### Currency Detection

1. Browser sends system timezone (e.g. `Asia/Shanghai`) to `/api/detect`
2. Server maps timezone → currency, IP → currency
3. When they differ (VPN scenario), timezone wins
4. User can always manually switch via the currency picker

### Rate Updates

- Hourly cron pre-caches rates for 8 major currencies (USD, EUR, GBP, JPY, CNY, AUD, CAD, CHF)
- On-demand fetch for other base currencies
- Rates cached in KV for 1 hour

## Project Structure

```
src/
├── index.tsx            # Hono app & routes
├── api/
│   ├── detect.ts        # Location detection API
│   └── rates.ts         # Exchange rate API
├── pages/
│   ├── home.tsx         # Converter UI + currency picker
│   └── setup.tsx        # Onboarding flow
├── components/
│   └── layout.tsx       # Shared layout & styles
├── lib/
│   ├── currencies.ts    # Currency data & timezone mappings
│   └── cron.ts          # Scheduled rate updates
└── static/
    ├── app.ts           # SW registration
    ├── sw.ts            # Service Worker
    └── manifest.ts      # PWA manifest
```

## License

ISC
