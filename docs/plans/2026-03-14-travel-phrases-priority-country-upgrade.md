# Travel Phrases Priority Country Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade a second batch of high-intent Travel Phrases country packs from generated default metadata to hand-authored localized landing-page content.

**Architecture:** Keep the existing shared data model and page UI unchanged, but replace generic metadata in six priority country JSON packs with country-specific descriptions, intros, tips, highlights, FAQs, and related-country choices. Use tests first to lock in the expected specificity and homepage visibility, then regenerate the derived summary index and sitemap.

**Tech Stack:** JSON country content packs, TypeScript loaders, React page components, Vitest, Node.js scripts

### Task 1: Add failing coverage for priority-country localization

**Files:**
- Modify: `tests/travel-phrases-content.test.ts`
- Modify: `tests/travel-phrases-page.test.ts`

**Step 1: Write the failing test**

Add assertions that:
- `thailand`, `south-korea`, `singapore`, `france`, `italy`, and `spain` contain country-specific English copy rather than generic “transport, hotel, dining” defaults.
- At least some of these countries are marked `featured` and expose unique teaser/highlight strings on the home page.

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts`
Expected: FAIL because the selected country packs still contain generated default metadata and are not featured.

### Task 2: Hand-author the second batch of country metadata

**Files:**
- Modify: `src/data/travel-phrases/thailand.json`
- Modify: `src/data/travel-phrases/south-korea.json`
- Modify: `src/data/travel-phrases/singapore.json`
- Modify: `src/data/travel-phrases/france.json`
- Modify: `src/data/travel-phrases/italy.json`
- Modify: `src/data/travel-phrases/spain.json`

**Step 1: Write minimal implementation**

Replace generic generated metadata with country-specific:
- `description`
- `intro`
- `teaser`
- `travelTips`
- `highlights`
- `featured`
- `relatedSlugs`
- `faq`

Keep the base phrase deck unchanged unless a truly country-specific phrase addition is clearly justified.

**Step 2: Run tests to verify green**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts`
Expected: PASS

### Task 3: Regenerate derived content and verify route-level SEO surfaces

**Files:**
- Modify: `src/data/travel-phrases/index.json`
- Modify: `public/sitemap.xml`

**Step 1: Regenerate derived assets**

Run: `node ./scripts/generate-sitemap.mjs`
Expected: Country summary metadata and sitemap reflect the upgraded country packs.

**Step 2: Run Travel Phrases verification**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts tests/sitemap.test.ts tests/route-heads.test.ts -t "travel phrase|TravelPhrasesCountryPage|TravelPhrasesHomePage|sitemap"`
Expected: PASS
