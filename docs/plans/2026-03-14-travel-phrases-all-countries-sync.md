# Travel Phrases All Countries Sync Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Synchronize the enhanced Travel Phrases country-page content model across every country pack, not just the first two localized examples.

**Architecture:** Enforce the enhanced metadata shape through tests and validation first, then use a batch sync script to backfill missing fields across all country JSON files. Keep existing hand-tuned content for Japan and the UAE, and generate consistent default localized copy for the remaining countries so the data stays maintainable and future country additions can be normalized the same way.

**Tech Stack:** Node.js scripts, JSON content packs, TypeScript validation, Vitest

### Task 1: Add failing tests for complete country metadata coverage

**Files:**
- Modify: `tests/travel-phrases-content.test.ts`
- Modify: `src/lib/travel-phrases.ts`

**Step 1: Write the failing test**

Add assertions that every raw country pack includes:
- `description`
- `intro`
- `travelTips`
- `teaser`
- `highlights`
- `featured`
- `relatedSlugs`
- `faq`

Also require the validator to report missing fields.

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts`
Expected: FAIL because most countries are still missing these fields.

**Step 3: Write minimal implementation**

Update validation to check for missing enhanced metadata.

**Step 4: Run test to verify it still fails for data reasons**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts`
Expected: FAIL with missing-field errors until the sync script updates the JSON files.

### Task 2: Create a batch metadata sync script

**Files:**
- Create: `scripts/sync-travel-phrases-country-metadata.mjs`
- Modify: `package.json`

**Step 1: Write the failing test**

The previous test should already be failing for missing metadata across most country files.

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts`
Expected: FAIL

**Step 3: Write minimal implementation**

Create a script that:
- reads all country packs
- preserves existing custom values
- fills missing metadata with localized defaults derived from country, language, region, and category labels
- assigns related-country slugs from the same region
- writes the normalized JSON back to disk

**Step 4: Run the sync script**

Run: `node ./scripts/sync-travel-phrases-country-metadata.mjs`
Expected: All country JSON files updated with the enhanced metadata fields.

### Task 3: Regenerate derived files and verify

**Files:**
- Modify: `src/data/travel-phrases/index.json`
- Modify: `public/sitemap.xml`

**Step 1: Regenerate derived assets**

Run: `node ./scripts/generate-sitemap.mjs`
Expected: Index and sitemap reflect the synchronized metadata.

**Step 2: Run tests to verify green**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts tests/sitemap.test.ts tests/route-heads.test.ts -t "travel phrase|TravelPhrasesCountryPage|TravelPhrasesHomePage|sitemap"`
Expected: PASS
