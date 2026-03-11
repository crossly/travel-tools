# Travel Tools Monorepo

一个运行在 Cloudflare 生态中的旅行小工具站，现在已经拆成真正的 workspace monorepo。

当前工具：

- `汇率换算`
- `旅行 AA`

## 仓库结构

```text
apps/
  web/       React + Vite 前端
  worker/    Hono + Cloudflare Worker
packages/
  shared/    共享领域能力、工具注册表、存储 key、汇率工具
  i18n/      多语言文案与翻译函数
  ui/        共享 UI 基础组件
migrations/  D1 数据库迁移
tests/       仓库级验证
```

## 技术栈

- 前端：React + Vite + Tailwind
- 后端：Cloudflare Workers + Hono
- 数据：Cloudflare D1 + KV
- PWA：manifest + service worker
- Monorepo：pnpm workspace

## 常用命令

```bash
pnpm install
pnpm run dev:web
pnpm run dev:worker
pnpm run test
pnpm run typecheck
pnpm run build
pnpm --filter @travel-tools/worker exec wrangler deploy --dry-run
```

## 路由

- `/:locale`
- `/:locale/tools/currency`
- `/:locale/tools/split-bill`
- `/:locale/settings`

## API

- `/api/site/*`
- `/api/fx/*`
- `/api/split-bill/*`

需要兼容的旧路由仍然保留。

## 扩展规范

- CI 配置见 [.github/workflows/ci.yml](/Users/ricky/Documents/GitHub/tiny-currency/.github/workflows/ci.yml)
- 新工具接入说明见 [docs/adding-a-tool.md](/Users/ricky/Documents/GitHub/tiny-currency/docs/adding-a-tool.md)
