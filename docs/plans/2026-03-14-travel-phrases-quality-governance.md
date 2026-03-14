# Travel Phrases Quality Governance Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add stable quality-management rules for Travel Phrases homepage curation so featured country packs stay limited, ordered, and non-duplicative.

**Architecture:** Define a single curated featured-country set in code, enforce it in tests, and update the homepage to render featured packs from that curated order only. Keep region sections useful by excluding already-featured packs, so the page does not repeat the same country cards twice.

**Tech Stack:** TypeScript loaders, React page components, JSON country data, Vitest, Node.js scripts

### Task 1: Add failing tests for featured-pack governance

**Files:**
- Modify: `tests/travel-phrases-content.test.ts`
- Modify: `tests/travel-phrases-page.test.ts`

**Step 1: Write the failing test**

Add assertions that:
- featured packs are capped to a curated set of six slugs in a stable order
- the homepage does not duplicate featured pack links again in region sections

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts`
Expected: FAIL because featured packs currently total eight and featured cards are duplicated in the region grid.

### Task 2: Implement curated featured-pack selection

**Files:**
- Modify: `src/lib/travel-phrases.ts`
- Modify: `src/features/travel-phrases/home-page.tsx`
- Modify: `scripts/sync-travel-phrases-country-metadata.mjs`

**Step 1: Write minimal implementation**

Add:
- a single curated featured-country slug list and max count
- a helper that returns featured summaries in explicit order
- homepage logic that excludes those same packs from region sections
- sync-script governance so only the curated featured set stays marked `featured`

**Step 2: Run sync and regenerate derived assets**

Run: `node ./scripts/sync-travel-phrases-country-metadata.mjs`
Expected: Source country packs reflect the curated featured set.

Run: `node ./scripts/generate-sitemap.mjs`
Expected: `src/data/travel-phrases/index.json` and `public/sitemap.xml` reflect the updated featured flags.

### Task 3: Verify Travel Phrases quality rules

**Files:**
- Modify: `src/data/travel-phrases/index.json`
- Modify: `public/sitemap.xml`

**Step 1: Run focused tests**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts`
Expected: PASS

**Step 2: Run Travel Phrases verification**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts tests/sitemap.test.ts tests/route-heads.test.ts -t "travel phrase|TravelPhrasesCountryPage|TravelPhrasesHomePage|sitemap"`
Expected: PASS
