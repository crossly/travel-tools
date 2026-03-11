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

## 验证

```bash
pnpm test
pnpm typecheck
pnpm build
```
