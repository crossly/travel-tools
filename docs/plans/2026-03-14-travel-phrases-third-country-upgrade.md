# Travel Phrases Third Country Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade a third batch of high-value Travel Phrases country packs from generated defaults to hand-authored localized landing-page content without over-expanding the homepage featured section.

**Architecture:** Keep the existing page components and data shape intact. Replace generic metadata in six country JSON packs with more country-specific descriptions, intros, tips, highlights, FAQs, and related-country links, while intentionally keeping `featured` false so the homepage stays curated. Validate the new specificity through tests first, then regenerate the derived summary index and sitemap.

**Tech Stack:** JSON content packs, TypeScript loaders, React pages, Vitest, Node.js scripts

### Task 1: Add failing tests for the third localization batch

**Files:**
- Modify: `tests/travel-phrases-content.test.ts`
- Modify: `tests/travel-phrases-page.test.ts`

**Step 1: Write the failing test**

Add assertions that `malaysia`, `vietnam`, `taiwan`, `hong-kong`, `germany`, and `portugal` expose country-specific copy and highlights instead of generic defaults, and remain non-featured so homepage curation does not balloon.

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts`
Expected: FAIL because those packs still use generated default metadata.

### Task 2: Hand-author localized metadata for the third batch

**Files:**
- Modify: `src/data/travel-phrases/malaysia.json`
- Modify: `src/data/travel-phrases/vietnam.json`
- Modify: `src/data/travel-phrases/taiwan.json`
- Modify: `src/data/travel-phrases/hong-kong.json`
- Modify: `src/data/travel-phrases/germany.json`
- Modify: `src/data/travel-phrases/portugal.json`

**Step 1: Write minimal implementation**

Replace generated metadata with country-specific:
- `description`
- `intro`
- `teaser`
- `travelTips`
- `highlights`
- `relatedSlugs`
- `faq`

Keep `featured` false for this batch.

**Step 2: Run tests to verify green**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts`
Expected: PASS

### Task 3: Regenerate derived assets and verify Travel Phrases coverage

**Files:**
- Modify: `src/data/travel-phrases/index.json`
- Modify: `public/sitemap.xml`

**Step 1: Regenerate derived assets**

Run: `node ./scripts/generate-sitemap.mjs`
Expected: Updated summaries and sitemap contain the new third-batch country metadata.

**Step 2: Run Travel Phrases verification**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts tests/sitemap.test.ts tests/route-heads.test.ts -t "travel phrase|TravelPhrasesCountryPage|TravelPhrasesHomePage|sitemap"`
Expected: PASS
