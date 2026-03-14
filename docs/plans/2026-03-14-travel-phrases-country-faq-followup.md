# Travel Phrases Country FAQ Follow-Up Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen Travel Phrases country pages with country-specific FAQ content, related-country discovery links, and FAQ-friendly structured data.

**Architecture:** Keep FAQ content data-driven inside each country pack, then expose it from the existing loader alongside automatically derived related-country summaries from the same region. Render both sections directly in the country page HTML and emit FAQ JSON-LD in the route head so the page carries stronger long-tail search signals without needing a larger CMS layer.

**Tech Stack:** TanStack Router, React, TypeScript, JSON content packs, Vitest

### Task 1: Add failing tests for FAQ and related-country content

**Files:**
- Modify: `tests/travel-phrases-content.test.ts`
- Modify: `tests/travel-phrases-page.test.ts`
- Modify: `tests/route-heads.test.ts`

**Step 1: Write the failing test**

Add assertions that:
- country packs expose FAQ items
- country packs expose related-country summaries
- the country page renders FAQ and related-country sections in HTML
- route head metadata includes FAQ structured data items

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts tests/route-heads.test.ts -t "travel phrase|TravelPhrasesCountryPage"`
Expected: FAIL because FAQ content and related-country links do not exist yet.

**Step 3: Write minimal implementation**

Implement only the fields and mapping needed for the tests.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/travel-phrases-page.test.ts tests/route-heads.test.ts -t "travel phrase|TravelPhrasesCountryPage"`
Expected: PASS

### Task 2: Extend the data model and route output

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `src/lib/travel-phrases.ts`
- Modify: `src/lib/seo.ts`
- Modify: `src/routes/$locale/travel-phrases/$country.tsx`
- Modify: `src/data/travel-phrases/japan.json`
- Modify: `src/data/travel-phrases/united-arab-emirates.json`

**Step 1: Write the failing test**

Verify that FAQ fields and derived related-country items are present on the loaded pack.

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts`
Expected: FAIL

**Step 3: Write minimal implementation**

Add:
- `faq` to country packs
- `relatedCountries` to the loaded public pack
- optional extra structured-data items for FAQ JSON-LD

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/travel-phrases-content.test.ts tests/route-heads.test.ts -t "travel phrase"`
Expected: PASS

### Task 3: Render the new sections and verify

**Files:**
- Modify: `src/features/travel-phrases/country-page.tsx`

**Step 1: Write the failing test**

Require visible FAQ and related-country sections in the country-page render test.

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/travel-phrases-page.test.ts -t "TravelPhrasesCountryPage"`
Expected: FAIL

**Step 3: Write minimal implementation**

Render a lightweight FAQ section and related-country links below the phrase content.

**Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/travel-phrases-page.test.ts -t "TravelPhrasesCountryPage"`
Expected: PASS
