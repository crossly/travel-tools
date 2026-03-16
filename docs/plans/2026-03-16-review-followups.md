# Review Followups Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the post-review runtime, hydration, and soft-404 issues without regressing existing behavior.

**Architecture:** Keep each fix narrowly scoped to the affected route or feature, and drive every change from a failing regression test first. Preserve current UI behavior where possible, but move environment-sensitive defaults and missing-resource handling to deterministic route-layer logic.

**Tech Stack:** TanStack Router, React, Vitest, Testing Library, TypeScript

### Task 1: Local Apps Hook Ordering

**Files:**
- Modify: `src/features/local-apps/country-page.tsx`
- Test: `tests/local-apps-country-page.test.tsx`

**Step 1: Write the failing test**

Add a test that renders `LocalAppsCountryPage` first with `guide={null}` and a valid `summary`, then rerenders it with a populated `guide`, and asserts the component rerenders without throwing a hook order error.

**Step 2: Run test to verify it fails**

Run: `pnpm test tests/local-apps-country-page.test.tsx`
Expected: FAIL because `useMemo` is currently called only after early returns.

**Step 3: Write minimal implementation**

Move the `categorySections` memo so it is evaluated before any early return and safely handles `guide === null`.

**Step 4: Run test to verify it passes**

Run: `pnpm test tests/local-apps-country-page.test.tsx`
Expected: PASS

### Task 2: Jet Lag SSR-Safe Defaults

**Files:**
- Modify: `src/features/jet-lag/page.tsx`
- Modify: `src/lib/jet-lag.ts`
- Test: `tests/jet-lag-page.test.ts`

**Step 1: Write the failing test**

Add a regression test that proves the first render uses a deterministic default state and only applies browser-derived preferences after hydration/effects.

**Step 2: Run test to verify it fails**

Run: `pnpm test tests/jet-lag-page.test.ts`
Expected: FAIL because initial render currently depends on `new Date()` and resolved browser timezone.

**Step 3: Write minimal implementation**

Introduce a deterministic initial preference factory for render-time use, then move environment-derived defaults into a client-side effect path.

**Step 4: Run test to verify it passes**

Run: `pnpm test tests/jet-lag-page.test.ts`
Expected: PASS

### Task 3: Real 404 Handling For Missing Country Routes

**Files:**
- Modify: `src/routes/$locale/local-apps/$country.tsx`
- Modify: `src/routes/$locale/travel-phrases/$country.tsx`
- Test: `tests/route-heads.test.ts`

**Step 1: Write the failing test**

Add route-level tests that assert the missing-country loaders throw or return a real 404 response instead of rendering a soft-404 page with HTTP 200 semantics.

**Step 2: Run test to verify it fails**

Run: `pnpm test tests/route-heads.test.ts`
Expected: FAIL because missing country slugs currently resolve without a 404.

**Step 3: Write minimal implementation**

Update the route loaders to produce a real not-found response while preserving the existing not-found UI and metadata expectations where appropriate.

**Step 4: Run test to verify it passes**

Run: `pnpm test tests/route-heads.test.ts`
Expected: PASS

### Task 4: Final Verification

**Files:**
- Verify only

**Step 1: Run targeted tests**

Run:
- `pnpm test tests/local-apps-country-page.test.tsx`
- `pnpm test tests/jet-lag-page.test.ts`
- `pnpm test tests/route-heads.test.ts`

Expected: PASS

**Step 2: Run full verification**

Run:
- `pnpm test`
- `pnpm build`

Expected: PASS
