# Travel Phrases Localization MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade Travel Phrases country pages from generic template packs into localized country landing pages with unique metadata, country-specific guidance, and indexable content.

**Architecture:** Keep the existing shared phrase-definition system for core phrase coverage, then add per-country metadata for localized intro copy, travel tips, and optional extra phrases. Render those country-specific sections directly in the server output so each country page has materially different HTML and stronger SEO signals without rebuilding the whole feature.

**Tech Stack:** TanStack Router, React, TypeScript, JSON content packs, Vitest

### Task 1: Add failing tests for country localization content

**Files:**
- Modify: `tests/travel-phrases-content.test.ts`
- Modify: `tests/route-heads.test.ts`
- Test: `tests/travel-phrases-content.test.ts`
- Test: `tests/route-heads.test.ts`

**Step 1: Write the failing tests**

Add assertions that:
- country packs expose localized intro text and travel tips
- country packs can include country-specific extra phrases in addition to shared phrases
- country page head metadata uses country-specific description text instead of generic templates

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/route-heads.test.ts`
Expected: FAIL because localized metadata and extra phrase fields are not implemented yet.

**Step 3: Write minimal implementation**

Implement only the types and mapping needed to satisfy the new test expectations.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/route-heads.test.ts`
Expected: PASS

### Task 2: Extend the data model for country-specific content

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `src/lib/travel-phrases.ts`
- Modify: `src/data/travel-phrases/japan.json`
- Modify: `src/data/travel-phrases/united-arab-emirates.json`
- Modify: `src/data/travel-phrases/index.json`

**Step 1: Write the failing test**

Cover the new shape from the public loader:
- `intro`
- `seoDescription`
- `travelTips`
- `extraPhrases`

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts`
Expected: FAIL because the JSON shape and public types do not exist yet.

**Step 3: Write minimal implementation**

Add optional localized fields to raw country packs and expose them on `PhraseCountryPack` and `PhraseCountrySummary`. Preserve backward compatibility so existing country packs still load if they do not yet have all localized extras.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts`
Expected: PASS

### Task 3: Render full localized country content in HTML

**Files:**
- Modify: `src/features/travel-phrases/country-page.tsx`
- Modify: `src/routes/$locale/travel-phrases/$country.tsx`
- Modify: `src/lib/seo.ts`

**Step 1: Write the failing test**

Add or update tests to verify:
- country page metadata reflects country-specific SEO copy
- localized sections are part of the rendered content model

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/route-heads.test.ts`
Expected: FAIL because the page still uses generic metadata and tab-only content emphasis.

**Step 3: Write minimal implementation**

Render:
- country intro
- travel tips
- shared phrase sections
- extra phrase section when present

Keep all sections in the HTML output and keep the existing tap-to-play interaction for phrase cards.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/route-heads.test.ts`
Expected: PASS

### Task 4: Verify the MVP end-to-end

**Files:**
- No code changes required unless issues appear during verification

**Step 1: Run focused verification**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/route-heads.test.ts tests/travel-phrases-page.test.ts`
Expected: PASS

**Step 2: Run broader sanity check if time allows**

Run: `pnpm vitest run`
Expected: PASS or identify unrelated pre-existing failures.

**Step 3: Summarize assumptions**

Document that the MVP localizes a small set of flagship countries first and keeps the shared phrase base for operational simplicity.
