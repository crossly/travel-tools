# Adding a Tool

Add new tools inside the single TanStack Start app.

## 1. Register site metadata

Update `src/lib/site.ts`:

- add a new tool entry to `TOOLS`
- define its localized route path

## 2. Add translations

Update `src/lib/i18n/index.tsx`:

- add the tool name
- add the tool description
- add any page-specific strings

## 3. Add feature code

Create a feature folder:

- `src/features/<tool>/`

Keep page-level UI composed from reusable app and ui components:

- `src/components/app/*`
- `src/components/ui/*`

## 4. Add routes

Create TanStack Start route files under:

- `src/routes/$locale/tools/<tool>/...`
- `src/routes/api/<tool>/...` if the tool needs explicit API routes

## 5. Verify

Run:

```bash
pnpm test
pnpm typecheck
pnpm build
```
