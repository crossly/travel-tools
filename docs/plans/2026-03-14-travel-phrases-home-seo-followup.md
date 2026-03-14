# Travel Phrases Home SEO Follow-Up Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the Travel Phrases home page feel more like a country discovery landing page and strengthen sitemap signals for localized phrase packs.

**Architecture:** Reuse the country summary index as the source of truth, then add lightweight teaser fields that can be rendered directly on the home page. Keep the UI mostly intact, but add visible, crawlable country highlights and region groupings so the page carries more unique travel-phrase context even before the user clicks into a country.

**Tech Stack:** TanStack Router, React, TypeScript, JSON content packs, Vitest, Node sitemap script

### Task 1: Add failing tests for richer home-page content

**Files:**
- Modify: `tests/travel-phrases-page.test.ts`
- Modify: `tests/sitemap.test.ts`

**Step 1: Write the failing test**

Add assertions that the home page renders:
- a visible highlight section for featured countries
- country teaser text tied to specific countries
- region-grouped content that still exists in the HTML

Add sitemap assertions for:
- `<lastmod>` entries
- stable presence of all travel phrase country URLs

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-page.test.ts tests/sitemap.test.ts`
Expected: FAIL because the current home page and sitemap do not expose those signals.

**Step 3: Write minimal implementation**

Implement only the fields and rendering needed for the failing tests.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/travel-phrases-page.test.ts tests/sitemap.test.ts`
Expected: PASS

### Task 2: Extend country summaries with home-page teaser fields

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `src/lib/travel-phrases.ts`
- Modify: `src/data/travel-phrases/index.json`

**Step 1: Write the failing test**

Verify that `listPhraseCountrySummaries()` exposes optional teaser copy for localized countries.

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-page.test.ts`
Expected: FAIL because teaser data is unavailable.

**Step 3: Write minimal implementation**

Add small teaser fields such as:
- `teaser`
- `highlights`
- `featured`

Only wire what the home page actually renders.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/travel-phrases-page.test.ts`
Expected: PASS

### Task 3: Upgrade the home page and sitemap output

**Files:**
- Modify: `src/features/travel-phrases/home-page.tsx`
- Modify: `scripts/generate-sitemap.mjs`
- Modify: `public/sitemap.xml` if regenerated during verification

**Step 1: Write the failing test**

Require:
- featured country area near the top
- region group headings or summaries
- country teaser text visible in HTML
- sitemap `<lastmod>` values

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-page.test.ts tests/sitemap.test.ts`
Expected: FAIL

**Step 3: Write minimal implementation**

Render a featured block using existing country summaries and keep all text in HTML. Update sitemap generation to include a stable date value based on file modification times or current build date.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/travel-phrases-page.test.ts tests/sitemap.test.ts`
Expected: PASS
