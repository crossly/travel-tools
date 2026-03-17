# Route Crate Editorial Travel Desk UI Redesign

Date: 2026-03-17
Status: Proposed and user-approved

## Summary

Redesign Route Crate's shared shell, homepage, currency page, and split-bill landing page so the product feels like a mature travel product with a clear point of view rather than a collection of tidy utility cards. The target direction is "Editorial Travel Desk": warm, composed, brand-forward, and still fast to use.

This is a controlled UI refactor, not a product rewrite. The work should preserve current feature behavior and existing route structure while changing hierarchy, layout, component language, and presentation.

## Problem Statement

The current interface is usable and coherent, but it has four product-level weaknesses:

1. Too many surfaces share the same card treatment, which flattens hierarchy.
2. The homepage reads as a feature directory instead of a clear product front door.
3. Key tool pages foreground generic forms instead of a guided travel-task experience.
4. The visual system is clean but not distinctive enough to create brand memory.

There are also two technical issues worth resolving during the redesign because they affect trust and implementation stability:

1. Hydration mismatch on the homepage.
2. Invalid `hreflang` React prop usage.

## Goals

1. Make Route Crate feel like a branded travel product, not a neutral utility dashboard.
2. Improve visual hierarchy so users can identify the primary action and current context quickly.
3. Preserve or improve task efficiency on core tools, especially currency conversion and split-bill trip creation.
4. Establish a stronger shared shell and page language that can later extend to other tools.
5. Fix the known hydration and metadata issues as part of the redesign pass.

## Non-Goals

1. Do not change APIs, storage semantics, or route URLs.
2. Do not redesign every feature page in this phase.
3. Do not introduce heavy visual effects that degrade mobile usability or load performance.
4. Do not perform unrelated refactors outside the shell, homepage, currency page, and split-bill landing page.

## Design Direction

The chosen direction is "Editorial Travel Desk."

Characteristics:

- Warm travel-desk palette, still rooted in the existing beige and orange system.
- Stronger display typography and asymmetrical composition.
- Fewer repeated full-card containers.
- More deliberate distinctions between primary panels, secondary support surfaces, and ambient information.
- UI that feels like a control desk for travel decisions involving money, language, readiness, and on-the-ground recovery.

This direction should avoid common AI-generated aesthetics:

- No purple-blue glow palette.
- No decorative glassmorphism as the main visual idea.
- No repeated generic card grids for every section.
- No hero built around vanity metrics.

## Scope

### In Scope

- Shared shell and navigation chrome.
- Homepage information architecture and hero.
- Currency tool page layout and state presentation.
- Split-bill landing page layout and empty-state treatment.
- Supporting design tokens and base UI primitives needed to express the new hierarchy.
- Fixes for hydration mismatch and `hreflang` prop usage if they are in the touched areas or closely related code paths.

### Out of Scope

- Deep redesign of travel phrases, packing list, local apps, jet lag, settings, trip detail pages, settlement pages, or add-expense flow.
- Changes to API handlers or business rules.
- New product features beyond what is required to support the redesign.

## Target Files and Boundaries

Primary implementation targets:

- `src/components/app/app-shell.tsx`
- `src/components/app/app-shell-header-controls.tsx`
- `src/components/app/mobile-nav-menu.tsx`
- `src/features/site/home-page.tsx`
- `src/features/currency/currency-page.tsx`
- `src/features/split-bill/home-page.tsx`
- `src/styles.css`
- `src/components/ui/card.tsx`
- `src/components/ui/button.tsx`

Secondary updates may be needed in closely related shared components if required for consistency, but the implementation should keep write scope focused around these areas.

## Experience Model

### Shared Shell

The shell should communicate that the user is inside one coherent travel product.

Requirements:

1. The top region should feel like a product frame, not just a container for controls.
2. Brand, current context, and tool navigation should have visible hierarchy.
3. Desktop navigation should reduce the "row of identical pills" effect.
4. Mobile navigation should remain compact and obvious, with no loss of access to primary destinations.
5. The shell must remain reusable across unchanged tools without breaking layout.

Expected result:

- A more editorial top frame with clearer grouping.
- More intentional distinction between branding, tool navigation, and utility controls.
- Better continuity between homepage and tool pages.

### Homepage

The homepage should move from a symmetric feature directory to a composed front door for the product.

Requirements:

1. The first screen should establish Route Crate as a travel decision desk.
2. The hero should present a clear product story, not just a polished placeholder illustration.
3. The homepage should separate urgent tools from secondary support tools.
4. Not all tools should use identical card weight or layout.
5. Copy should be reduced where repetition does not add meaning.

Homepage structure:

1. Hero section:
   - Left side: product value proposition and primary framing.
   - Right side: composed decision panel or travel-desk motif tying together money, phrases, and split-bill use cases.
2. Primary tools section:
   - Currency, Bill Splitter, Packing List.
   - At least one item should receive primary visual emphasis.
3. Companion tools section:
   - Travel Phrases, Local Apps, Jet Lag.
   - Presented more like briefs or support modules than repeated utility cards.

Expected result:

- Clearer product narrative.
- Stronger scanability.
- Better visual rhythm and less grid monotony.

### Currency Page

The currency page should become a result-first tool rather than a generic form surface.

Requirements:

1. The converted value must be the visual focal point.
2. Rate freshness, update time, and cache status should be integrated into the main result region.
3. Core inputs must remain fast to use and easy to scan.
4. Secondary actions should not compete visually with the main conversion flow.
5. Offline/cached state should read as product context, not as a detached warning block.

Currency page structure:

1. Primary result panel:
   - Converted amount.
   - Base exchange rate.
   - Freshness or cache state.
   - Update timestamp.
2. Operations strip:
   - Amount input.
   - Source and target currency selectors.
   - Swap action.
   - Quick amount shortcuts.
3. Secondary actions:
   - Detect local currency as intelligent helper action.
   - Refresh rates as maintenance action with lower emphasis than the primary result.

Expected result:

- Faster recognition of "what is the answer?"
- Less visual fragmentation.
- Stronger trust in data freshness and state handling.

### Split-Bill Landing Page

The split-bill landing page should feel like the start of a trip workflow, not a form next to an empty list.

Requirements:

1. "Create a trip" must read as the primary job.
2. Device identity should be supporting context, not the leading element.
3. The form should be grouped into a clearer setup sequence.
4. The recent trips panel should feel like continuation, not dead space.
5. Empty state should guide the user and reinforce what happens next.

Split-bill page structure:

1. Primary start panel:
   - Trip name.
   - Expense and settlement currency group.
   - Split count.
   - Clear start action.
2. Supporting context:
   - Device identity in a quieter treatment.
   - Optional brief explanation of local-first behavior if space allows.
3. Recent trip continuation panel:
   - More intentional framing for "continue where you left off."
   - Stronger empty state language and composition.

Expected result:

- A more confident onboarding moment for new split-bill usage.
- Better perceived product polish even before a user creates data.

## Component and Styling Strategy

### Design Tokens and Global Styling

Update `src/styles.css` to support stronger hierarchy without replacing the existing brand family.

Required changes:

1. Refine color roles so primary, secondary, muted, and ambient surfaces have more contrast in purpose.
2. Improve spacing rhythm across sections, especially on the homepage.
3. Rework hero and shell background treatments to feel composed rather than simply soft.
4. Preserve accessible contrast in both light and dark themes.
5. Keep motion restrained and meaningful.

### Card System

`Card` should remain available as a primitive, but the redesign must stop relying on it as the default answer for every section.

Required changes:

1. Support lighter or more open sections that are not full cards.
2. Preserve full cards for dense or stateful content where enclosure improves comprehension.
3. Allow the homepage and shell to mix enclosed and unenclosed sections intentionally.

### Button System

Buttons should better communicate hierarchy.

Required changes:

1. Primary actions should feel assertive and branded.
2. Secondary and maintenance actions should look clearly subordinate.
3. Utility icon buttons should feel integrated with the shell rather than mechanically repeated.

## Responsiveness

The redesign must be intentionally adapted for mobile, not just compressed.

Requirements:

1. Homepage hero must remain legible and visually balanced on narrow screens.
2. Primary actions must remain visible without excessive scrolling.
3. Touch targets must stay comfortable.
4. Navigation should preserve access to core tools on mobile without feeling crowded.
5. Currency and split-bill layouts should collapse into clear vertical flows with preserved hierarchy.

## Accessibility and Usability

Requirements:

1. Focus styles must remain obvious after shell and button updates.
2. Semantic heading order must remain valid after homepage restructuring.
3. Color must not be the only channel for communicating data freshness or warning state.
4. Form labels and descriptions must stay attached to the correct fields.
5. Empty and warning states must remain understandable without relying on decorative layout.

## Data and State Handling

This redesign does not change core data flow, but presentation of state must be more coherent.

Requirements:

1. Currency freshness, cached state, offline state, and error state must still be represented.
2. Split-bill identity bootstrap, empty trips, loading trips, and creation errors must still be represented.
3. No visual restyling should hide or delay important state changes.
4. New layout choices must not depend on unstable client-only data during SSR unless hydration-safe handling is explicit.

## Technical Fixes Included in This Phase

1. Resolve the homepage hydration mismatch.
2. Replace invalid `hreflang` React prop usage with the correct React prop name.

These fixes are included because they are already visible during UI review and are likely to interfere with confident delivery if ignored.

## Testing Strategy

### Manual Verification

Check locally in desktop and mobile viewport for:

1. Homepage visual hierarchy and section differentiation.
2. Currency page result readability and state presentation.
3. Split-bill landing page primary-task clarity.
4. Navigation clarity in both desktop and mobile shells.
5. Light and dark theme appearance.

### Automated Verification

Run the most relevant existing test coverage after implementation:

1. Shell and navigation tests.
2. Homepage tests.
3. Currency page tests.
4. Split-bill homepage and route tests.
5. Any tests that cover metadata or known hydration-sensitive areas if affected.

At minimum, implementation planning should assume:

- `pnpm test`
- `pnpm typecheck`

and selective targeted tests during iteration if the full suite is too slow for every pass.

## Risks and Mitigations

### Risk: Styling drift spreads too far

Mitigation:

- Keep implementation focused on shared shell primitives and the three targeted pages.
- Avoid opportunistic redesign of unrelated feature pages.

### Risk: Brand-forward layout reduces tool efficiency

Mitigation:

- Keep result-first and task-first flows intact on tool pages.
- Prefer hierarchy changes over decorative additions.

### Risk: Shared shell changes regress unchanged pages

Mitigation:

- Keep shell API stable where possible.
- Verify at least one untouched feature page after shell changes.

### Risk: SSR or hydration regressions

Mitigation:

- Treat client-only values carefully.
- Verify touched pages in local preview with console open.

## Implementation Readiness

This spec is ready for implementation planning once reviewed. The next step should produce a concrete plan that breaks the redesign into bounded work items, likely in this order:

1. Design token and shared shell foundation.
2. Homepage restructure.
3. Currency page restructure.
4. Split-bill landing page restructure.
5. Stabilization fixes and verification.
