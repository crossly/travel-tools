# Split Bill Members Note

## Current State

`Split Bill` still uses a simplified participant model.

- The database has a `members` table.
- `snapshotTrip()` currently returns `members: []`.
- `settlement()` still derives placeholder participant ids like `p1`, `p2`, `p3`.
- The frontend maps `p1` to the current device owner and renders the rest as generic teammates.

Relevant files:

- [src/server/split-bill.ts](/Users/ricky/Documents/GitHub/tiny-currency/src/server/split-bill.ts)
- [src/features/split-bill/settlement-page.tsx](/Users/ricky/Documents/GitHub/tiny-currency/src/features/split-bill/settlement-page.tsx)
- [src/lib/types.ts](/Users/ricky/Documents/GitHub/tiny-currency/src/lib/types.ts)

## What This Means

This is acceptable for the current product shape because:

- the app is still owner-local and device-local
- there is no real trip sharing flow yet
- users are not editing participant rosters directly

But it is not fully converged. The type system and API suggest real members exist, while the actual settlement logic still uses synthetic placeholders.

## Recommended Next Move

Do not upgrade this immediately unless product scope changes.

Upgrade only when at least one of these becomes real:

- editable participant names
- share / join flow
- participant-level payer selection
- multi-device collaboration

Until then, keep the simplified model and avoid partially exposing `members` in the UI, because a half-upgraded participant system will be harder to maintain than the current explicit simplification.
