# Travel Phrases Final Country Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the last generic Travel Phrases country metadata and upgrade every remaining country pack to country-specific landing-page copy.

**Architecture:** Use tests to enforce a simple rule: no country pack may keep the original generated intro, teaser, tips, or FAQ phrasing. Then extend the metadata sync script with explicit country profiles for the remaining generic packs so the data update can be applied consistently and regenerated in one pass without disturbing already hand-authored countries.

**Tech Stack:** Node.js scripts, JSON country packs, TypeScript loaders, Vitest

### Task 1: Add failing “no generic templates left” coverage

**Files:**
- Modify: `tests/travel-phrases-content.test.ts`
- Modify: `tests/travel-phrases-page.test.ts`

**Step 1: Write the failing test**

Add assertions that:
- no raw country pack still matches the old generated intro / teaser / travel tip / FAQ defaults
- region cards expose at least one highlight from the final batch of non-featured countries

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts`
Expected: FAIL because 27 country packs still use generated default metadata.

### Task 2: Upgrade the batch sync script with country-specific profiles

**Files:**
- Modify: `scripts/sync-travel-phrases-country-metadata.mjs`

**Step 1: Write minimal implementation**

Extend the script so it can:
- detect packs still using generated defaults
- map remaining slugs to country-specific localized copy
- overwrite only the generic fields for those packs
- keep already hand-authored packs intact

**Step 2: Run the sync script**

Run: `node ./scripts/sync-travel-phrases-country-metadata.mjs`
Expected: Remaining country JSON files are updated with non-generic metadata.

### Task 3: Regenerate derived files and verify Travel Phrases coverage

**Files:**
- Modify: `src/data/travel-phrases/index.json`
- Modify: `public/sitemap.xml`

**Step 1: Regenerate derived assets**

Run: `node ./scripts/generate-sitemap.mjs`
Expected: Country summary metadata and sitemap reflect the final batch update.

**Step 2: Run Travel Phrases verification**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts tests/sitemap.test.ts tests/route-heads.test.ts -t "travel phrase|TravelPhrasesCountryPage|TravelPhrasesHomePage|sitemap"`
Expected: PASS
