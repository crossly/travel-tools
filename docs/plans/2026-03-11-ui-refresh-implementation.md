# Travel Tools UI Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Travel Tools UI into a unified, reusable design system with complete light/dark theming, a real site shell, and clearer interactions for the home page, currency tool, split-bill tool, and settings page.

**Architecture:** Keep the current monorepo, routing, and Cloudflare deployment unchanged. Move visual structure into reusable UI components inside `packages/ui`, move theme persistence into shared storage-backed app state, and then rebuild the affected pages using those primitives. Because the repo does not yet have a browser component test harness, use automated tests for storage/theme logic and route-safe shared logic, then use `typecheck`, `build`, and a strict manual verification checklist for visual behavior.

**Tech Stack:** pnpm workspace, React 18, Vite, Tailwind utilities, TypeScript, React Router, Cloudflare Workers, Node built-in test runner.

## Preconditions

- Work from a clean branch created from `main`.
- Use a `codex/` branch name, for example `codex/ui-refresh-shell`.
- Do not change API routes or deployment topology in this plan.
- Do not add a new frontend test framework in this pass.

### Task 1: Establish Theme Tokens And Theme Persistence

**Files:**
- Modify: `apps/web/src/styles.css`
- Modify: `packages/shared/src/storage.ts`
- Modify: `apps/web/src/lib/storage.ts`
- Modify: `apps/web/src/main.tsx`
- Test: `tests/storage-migration.test.js`

**Step 1: Write the failing test for theme storage**

Add a test to `tests/storage-migration.test.js` that asserts:
- `travel-tools:site:theme` can be read and written
- missing theme falls back to `system`
- legacy storage migration behavior is unchanged

Use a fake in-memory storage object similar to the existing storage migration tests.

**Step 2: Run test to verify it fails**

Run: `pnpm run test -- tests/storage-migration.test.js`
Expected: FAIL because theme helpers are missing or theme fallback is not implemented.

**Step 3: Write minimal storage implementation**

Implement:
- `type SiteTheme = 'light' | 'dark' | 'system'`
- `readTheme(storage?)`
- `writeTheme(theme, storage?)`
- fallback to `system` when unset or invalid

Keep the API small and colocate browser wrappers in `apps/web/src/lib/storage.ts`.

**Step 4: Replace hard-coded visual variables with semantic theme tokens**

In `apps/web/src/styles.css`:
- replace the current root variables with semantic surface/text/border/status/accent tokens
- add `[data-theme="light"]` and `[data-theme="dark"]` token blocks
- keep `system` behavior implemented in JavaScript, not in CSS selectors
- give light and dark mode separate `body` background recipes
- remove the current dark-mode reuse of the warm light gradient

**Step 5: Apply theme on boot**

In `apps/web/src/main.tsx`:
- read the saved theme
- resolve `system` against `window.matchMedia('(prefers-color-scheme: dark)')`
- set `document.documentElement.dataset.theme`
- listen for system theme changes only when the saved value is `system`

**Step 6: Run automated verification**

Run:
- `pnpm run test`
- `pnpm run typecheck`

Expected:
- PASS

**Step 7: Run manual verification**

Check in the browser:
- saved light theme survives reload
- saved dark theme survives reload
- system theme follows OS preference
- no first-paint flash back to the wrong theme

**Step 8: Commit**

```bash
git add tests/storage-migration.test.js packages/shared/src/storage.ts apps/web/src/lib/storage.ts apps/web/src/main.tsx apps/web/src/styles.css
git commit -m "feat: add semantic theming foundation"
```

### Task 2: Replace `Layout` And `Card` With Reusable Shell And Surface Primitives

**Files:**
- Create: `packages/ui/src/AppShell.tsx`
- Create: `packages/ui/src/TopBar.tsx`
- Create: `packages/ui/src/BottomNav.tsx`
- Create: `packages/ui/src/Panel.tsx`
- Create: `packages/ui/src/HeroPanel.tsx`
- Create: `packages/ui/src/SectionHeader.tsx`
- Modify: `packages/ui/src/index.ts`
- Modify: `packages/ui/package.json`
- Keep temporarily: `packages/ui/src/Card.tsx`
- Keep temporarily: `packages/ui/src/Layout.tsx`

**Step 1: Define the public component APIs**

Write the prop interfaces first:
- `AppShell`
- `TopBar`
- `BottomNav`
- `Panel`
- `HeroPanel`
- `SectionHeader`

Use semantic props only:
- `tone`
- `padding`
- `actions`
- `currentTool`
- `showBottomNav`

Do not add tool-specific props such as `isCurrencyPage`.

**Step 2: Implement minimal components**

Build the components with:
- current safe-area handling from `Layout`
- semantic tones from the new CSS tokens
- a shared header structure that can render brand, tool switcher, language toggle, theme toggle, and settings link

**Step 3: Export the new components**

Update `packages/ui/src/index.ts` and `packages/ui/package.json` exports so `@travel-tools/ui` exposes the new primitives.

**Step 4: Run package verification**

Run:
- `pnpm --filter @travel-tools/ui run typecheck`
- `pnpm run typecheck`

Expected:
- PASS

**Step 5: Commit**

```bash
git add packages/ui/src/AppShell.tsx packages/ui/src/TopBar.tsx packages/ui/src/BottomNav.tsx packages/ui/src/Panel.tsx packages/ui/src/HeroPanel.tsx packages/ui/src/SectionHeader.tsx packages/ui/src/index.ts packages/ui/package.json
git commit -m "feat: add reusable site shell primitives"
```

### Task 3: Add Shared Site Controls For Tool Switching, Locale Switching, And Theme Switching

**Files:**
- Create: `packages/ui/src/SegmentedControl.tsx`
- Create: `packages/ui/src/IconButton.tsx`
- Modify: `packages/shared/src/site.ts`
- Modify: `packages/i18n/src/index.ts`
- Modify: `apps/web/src/hooks/useI18n.tsx`
- Modify: `apps/web/src/lib/routes.ts`
- Modify: `apps/web/src/lib/storage.ts`
- Modify: `apps/web/src/App.tsx`

**Step 1: Add missing shared metadata**

Update `packages/shared/src/site.ts` so each tool has enough metadata for navigation:
- `slug`
- `entryPath`
- `icon`
- localized name continues to come from i18n

If needed, add a helper for current tool lookup by pathname.

**Step 2: Add translation keys**

Add i18n keys for:
- theme labels
- tool switcher labels
- shell labels
- bottom navigation labels

Do not hard-code these labels inside UI components.

**Step 3: Implement switcher controls**

Create:
- `SegmentedControl` for theme and language
- `IconButton` for compact shell actions

Keep them generic so they can be reused in settings and header.

**Step 4: Wire the shell-level state**

Ensure:
- locale switch updates the URL and persists preference
- theme switch updates storage and `data-theme`
- tool switch navigates without bypassing locale

**Step 5: Run verification**

Run:
- `pnpm run typecheck`
- `pnpm run build`

Expected:
- PASS

**Step 6: Manual verification**

Check:
- header switchers work on home and tool pages
- locale switch preserves current route
- theme switch updates immediately
- mobile shell still fits inside safe areas

**Step 7: Commit**

```bash
git add packages/ui/src/SegmentedControl.tsx packages/ui/src/IconButton.tsx packages/shared/src/site.ts packages/i18n/src/index.ts apps/web/src/hooks/useI18n.tsx apps/web/src/lib/routes.ts apps/web/src/lib/storage.ts apps/web/src/App.tsx
git commit -m "feat: add shared shell navigation controls"
```

### Task 4: Rebuild The Home Page Around Reusable Feature Sections

**Files:**
- Create: `packages/ui/src/ToolFeatureCard.tsx`
- Create: `packages/ui/src/InfoChip.tsx`
- Modify: `apps/web/src/pages/HomePage.tsx`
- Modify: `packages/ui/src/index.ts`
- Modify: `packages/i18n/src/index.ts`

**Step 1: Define reusable home-page components**

Create:
- `ToolFeatureCard`
- `InfoChip`

`ToolFeatureCard` should accept:
- `title`
- `description`
- `icon`
- `href`
- `tone`
- `meta`
- `ctaLabel`

Do not create a one-off `CurrencyCard` or `SplitBillCard`.

**Step 2: Restructure the page**

Update `apps/web/src/pages/HomePage.tsx` to use:
- a hero section
- recent tool CTA integrated into the hero
- two differentiated feature cards
- a future tools section using the same card primitives

**Step 3: Add supporting copy**

Add i18n strings for:
- hero title
- hero description
- future tools teaser
- home page CTA labels
- tool feature metadata copy

**Step 4: Run verification**

Run:
- `pnpm run typecheck`
- `pnpm run build`

Expected:
- PASS

**Step 5: Manual verification**

Check:
- homepage reads as a product landing page, not a route list
- recent tool CTA is prominent but not visually separate junk
- currency and split-bill cards feel related but visually distinct

**Step 6: Commit**

```bash
git add packages/ui/src/ToolFeatureCard.tsx packages/ui/src/InfoChip.tsx packages/ui/src/index.ts packages/i18n/src/index.ts apps/web/src/pages/HomePage.tsx
git commit -m "feat: redesign home page with reusable feature cards"
```

### Task 5: Rebuild The Currency Tool With Clear State Feedback

**Files:**
- Create: `packages/ui/src/Field.tsx`
- Create: `packages/ui/src/ActionButton.tsx`
- Create: `packages/ui/src/StatusBanner.tsx`
- Create: `packages/ui/src/AmountDisplay.tsx`
- Modify: `packages/ui/src/index.ts`
- Modify: `apps/web/src/pages/CurrencyPage.tsx`
- Modify: `apps/web/src/lib/api.ts`
- Modify: `apps/web/src/lib/storage.ts`
- Modify: `packages/i18n/src/index.ts`

**Step 1: Extract reusable form and feedback primitives**

Create:
- `Field`
- `ActionButton`
- `StatusBanner`
- `AmountDisplay`

Make sure these work for both currency and split-bill pages.

**Step 2: Normalize currency page state model**

Refactor `apps/web/src/pages/CurrencyPage.tsx` state into explicit statuses:
- `idle`
- `loading`
- `success`
- `cached`
- `offline`
- `error`

Do not keep all user-facing feedback in one unstructured string.

**Step 3: Fix refresh behavior**

Ensure the refresh button reuses the same logic path as automatic loading so it updates:
- `rates`
- `updatedAt`
- cache write
- status banner

Avoid the current one-off refresh branch.

**Step 4: Rebuild the page with the new primitives**

Use:
- `HeroPanel` for the result block
- `Field` for amount and currency controls
- `ActionButton` for detect and refresh
- `StatusBanner` for detection, cache, offline, and error states
- `AmountDisplay` for the main result

Add quick amount chips only if they can reuse `InfoChip`.

**Step 5: Add missing strings**

Add translation keys for:
- live rate
- saved rate
- offline
- detecting
- refreshing
- updated just now
- quick amount labels

**Step 6: Run verification**

Run:
- `pnpm run typecheck`
- `pnpm run build`

Expected:
- PASS

**Step 7: Manual verification**

Check:
- swap updates both fields cleanly
- detect shows a clear success banner
- refresh cannot be spam-clicked
- cached/offline states are visually distinct
- updated time remains correct after manual refresh

**Step 8: Commit**

```bash
git add packages/ui/src/Field.tsx packages/ui/src/ActionButton.tsx packages/ui/src/StatusBanner.tsx packages/ui/src/AmountDisplay.tsx packages/ui/src/index.ts apps/web/src/pages/CurrencyPage.tsx apps/web/src/lib/api.ts apps/web/src/lib/storage.ts packages/i18n/src/index.ts
git commit -m "feat: redesign currency converter interactions"
```

### Task 6: Rebuild The Split Bill Entry Page As A Guided Flow

**Files:**
- Create: `packages/ui/src/StepPanel.tsx`
- Create: `packages/ui/src/EmptyState.tsx`
- Modify: `packages/ui/src/index.ts`
- Modify: `apps/web/src/pages/SplitBillHomePage.tsx`
- Modify: `packages/i18n/src/index.ts`

**Step 1: Create reusable step-flow primitives**

Create:
- `StepPanel`
- `EmptyState`

`StepPanel` should support:
- `stepNumber`
- `title`
- `description`
- `status: pending | active | complete`
- `actions`

These should remain generic enough for future onboarding or setup flows.

**Step 2: Reorganize page state**

In `SplitBillHomePage.tsx`:
- treat nickname setup as step 1
- treat trip creation as step 2
- treat recent trips as step 3

Disable or visually soften trip creation when no nickname is available.

**Step 3: Rebuild the layout**

Use:
- `StepPanel` for identity and trip creation
- `Panel` or `EmptyState` for recent trips
- shared `Field` and `ActionButton` from Task 5

Do not leave three equal-weight generic cards stacked vertically.

**Step 4: Add helper copy**

Add translation keys for:
- expense currency helper
- settlement currency helper
- continue recent trip
- no recent trips copy
- local-first reassurance copy

**Step 5: Run verification**

Run:
- `pnpm run typecheck`
- `pnpm run build`

Expected:
- PASS

**Step 6: Manual verification**

Check:
- first-time users see a clear primary path
- nickname completion visibly unlocks trip creation
- existing users can jump straight into a recent trip
- the page no longer feels like three undifferentiated forms

**Step 7: Commit**

```bash
git add packages/ui/src/StepPanel.tsx packages/ui/src/EmptyState.tsx packages/ui/src/index.ts apps/web/src/pages/SplitBillHomePage.tsx packages/i18n/src/index.ts
git commit -m "feat: redesign split bill onboarding flow"
```

### Task 7: Rebuild Settings Into A Real Site Preferences Screen

**Files:**
- Create: `packages/ui/src/SettingsGroup.tsx`
- Modify: `packages/ui/src/index.ts`
- Modify: `apps/web/src/pages/SettingsPage.tsx`
- Modify: `packages/i18n/src/index.ts`
- Modify: `apps/web/src/lib/storage.ts`

**Step 1: Create reusable settings section wrapper**

Build `SettingsGroup` with:
- title
- description
- children
- optional action area

Use it for appearance, language, profile, and data import/export.

**Step 2: Add theme controls**

Update `SettingsPage.tsx` so the first section is `Appearance` with:
- `Light`
- `Dark`
- `System`

Use the shared `SegmentedControl`.

**Step 3: Reorder settings**

Final order:
- appearance
- language
- profile
- split-bill data export
- split-bill data import

Do not surface tool-specific data controls before site-level preferences.

**Step 4: Improve data import/export presentation**

Keep current behavior, but visually separate:
- export action
- export output
- import input
- import action

Prefer `Panel` plus `Field` composition over ad hoc spacing.

**Step 5: Run verification**

Run:
- `pnpm run typecheck`
- `pnpm run build`

Expected:
- PASS

**Step 6: Manual verification**

Check:
- theme setting updates immediately and persists
- locale setting still updates URL correctly
- profile save and import/export still work
- page reads as site settings first, tool settings second

**Step 7: Commit**

```bash
git add packages/ui/src/SettingsGroup.tsx packages/ui/src/index.ts apps/web/src/pages/SettingsPage.tsx packages/i18n/src/index.ts apps/web/src/lib/storage.ts
git commit -m "feat: redesign settings as site preferences"
```

### Task 8: Upgrade Toasts And Inline Feedback Rules

**Files:**
- Modify: `apps/web/src/hooks/useToast.tsx`
- Modify: `apps/web/src/styles.css`
- Modify: `packages/i18n/src/index.ts`
- Reuse: `packages/ui/src/StatusBanner.tsx`

**Step 1: Expand toast data model**

Add support for:
- per-toast duration
- dismiss action
- optional description

Default durations:
- success: `2500`
- info: `3500`
- error: `5000`

**Step 2: Improve toast rendering**

Update the toast UI to include:
- close button
- stronger visual distinction by type
- motion in and out

Do not allow error toasts to vanish as quickly as success toasts.

**Step 3: Define feedback usage rules in code comments**

Add short comments documenting:
- use toasts for lightweight confirmation
- use `StatusBanner` for primary page-state feedback

This is to stop future pages from inventing a third pattern.

**Step 4: Run verification**

Run:
- `pnpm run typecheck`
- `pnpm run build`

Expected:
- PASS

**Step 5: Manual verification**

Check:
- success toast disappears quickly
- error toast stays long enough to read
- toasts can be dismissed manually
- page-level statuses remain inline, not duplicated as toast spam

**Step 6: Commit**

```bash
git add apps/web/src/hooks/useToast.tsx apps/web/src/styles.css packages/i18n/src/index.ts
git commit -m "feat: improve unified feedback system"
```

### Task 9: Final Regression Sweep And Documentation Update

**Files:**
- Modify: `README.md`
- Modify: `docs/adding-a-tool.md`

**Step 1: Update docs**

Document:
- the new design primitives in `packages/ui`
- the theme model
- how new tools should use `AppShell`, `Panel`, `Field`, `ActionButton`, and `StatusBanner`

Do not leave `docs/adding-a-tool.md` describing the old page composition pattern.

**Step 2: Run full repo verification**

Run:
- `pnpm run test`
- `pnpm run typecheck`
- `pnpm run build`
- `pnpm --filter @travel-tools/worker exec wrangler deploy --dry-run`

Expected:
- PASS

**Step 3: Run end-to-end manual checklist**

Check:
- `/:locale` home page in `zh-CN` and `en-US`
- theme switching in all modes
- currency detect, refresh, cached state, offline state
- split-bill nickname setup, trip creation, recent trip continue
- settings language/theme/profile/import/export

**Step 4: Commit**

```bash
git add README.md docs/adding-a-tool.md
git commit -m "docs: document refreshed travel tools design system"
```

## Manual QA Checklist

- Verify light mode and dark mode are both intentionally art-directed.
- Verify the header reads as one product shell across all pages.
- Verify mobile safe-area spacing on iPhone-sized and Android-sized viewports.
- Verify desktop layout still feels intentional and not simply stretched mobile cards.
- Verify both tools share the same components while still showing different content emphasis.
- Verify no page relies on raw grey text for critical status.
- Verify build info remains present but visually secondary.

## Risks To Watch

- Theme bootstrapping can cause a first-paint flash if applied too late.
- Over-abstracting components too early can create props bloat; keep APIs semantic and small.
- Replacing `Layout` and `Card` in one pass can create wide regressions; migrate page by page.
- Because there is no browser UI test harness yet, visual regressions must be checked carefully after each task.

## Out Of Scope

- Adding a new analytics provider
- Adding a new tool
- Reworking worker APIs
- Introducing a component test framework
- Server-side rendering or SEO architecture changes

Plan complete and saved to `docs/plans/2026-03-11-ui-refresh-implementation.md`. Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
