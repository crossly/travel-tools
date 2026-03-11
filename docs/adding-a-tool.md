# Adding A Tool

This monorepo is designed so new travel tools can be added without creating a parallel app.

## Rule

Every new tool should plug into the existing site shell, shared packages, and Worker API structure.

Do not create:

- a separate repo
- a second frontend stack
- a separate deployment target
- a tool-specific i18n system

## What To Add

For a new tool called `packing-list`, add:

### 1. Register the tool

Update [packages/shared/src/site.ts](/Users/ricky/Documents/GitHub/tiny-currency/packages/shared/src/site.ts):

- add the new `slug` to `ToolDefinition`
- add a new item in `TOOLS`
- use `entryPath: '/tools/packing-list'`

### 2. Add i18n keys

Update [packages/i18n/src/index.ts](/Users/ricky/Documents/GitHub/tiny-currency/packages/i18n/src/index.ts):

- `tool.packing-list.name`
- `tool.packing-list.description`
- page-specific keys
- API error translations if needed

### 3. Add the page in `apps/web`

Create:

- `apps/web/src/pages/PackingListPage.tsx`

Use:

- `@travel-tools/ui` for page shell and cards
- `useI18n`
- `useLocalizedPath` / `useLocalizedNavigate`
- shared storage keys only when persistence is needed

### 4. Wire the route

Update [apps/web/src/App.tsx](/Users/ricky/Documents/GitHub/tiny-currency/apps/web/src/App.tsx):

- add `/:locale/tools/packing-list`

### 5. Add Worker API only if the tool needs it

Put new endpoints under:

- `/api/packing-list/*`

Keep cross-tool capabilities in shared namespaces:

- `/api/site/*`
- `/api/fx/*`

### 6. Reuse shared packages first

Before adding new code, check whether it belongs in:

- `packages/shared`
- `packages/i18n`
- `packages/ui`

If the capability is useful for more than one tool, do not keep it inside a single page module.

## Acceptance Checklist

- tool appears on `/:locale`
- route works under both `zh-CN` and `en-US`
- no hard-coded strings outside `packages/i18n`
- no duplicate layout/card/toast logic
- no new deployment target
- `pnpm run test` passes
- `pnpm run typecheck` passes
- `pnpm run build` passes
- `pnpm --filter @travel-tools/worker exec wrangler deploy --dry-run` passes
