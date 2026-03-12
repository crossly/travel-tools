# Travel Tools

`Travel Tools` 现在是一个单包、单应用的 TanStack Start 项目。

## 技术栈

- TanStack Start
- TanStack Router 文件路由
- Tailwind CSS
- 本地 shadcn 风格组件
- Cloudflare Workers + D1 + KV

## 页面路由

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

## 本地开发

```bash
pnpm install
pnpm dev
```

## 汇率提供方

- 默认后备来源：`Frankfurter`
- 可选主来源：`Open Exchange Rates`

设置以下 Cloudflare secret 可启用双源策略：

```bash
wrangler secret put OPEN_EXCHANGE_RATES_APP_ID
```

可选：

```bash
wrangler secret put OPEN_EXCHANGE_RATES_API_BASE
```

当配置了 `OPEN_EXCHANGE_RATES_APP_ID` 后，Worker 会：

- 优先使用 `Open Exchange Rates` 获取最新和历史汇率
- 当主来源失败时回退到 `Frankfurter`
- 每小时仅把 canonical 最新汇率快照同步到 KV
- 读取时在内存中推导其它 base，避免把所有币种预写入 KV
- 对当日换算优先使用本地 canonical 汇率，避免每次请求再写一条最新日缓存

## 验证

```bash
pnpm test
pnpm typecheck
pnpm build
```
