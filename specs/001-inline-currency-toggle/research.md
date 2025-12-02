# Research: Inline currency toggle in average price field

## Decision 1: Inline-only currency selector beside average price
- **Rationale**: Keeps currency context where users input the critical number, eliminates duplicated controls, and mirrors screenshot feedback about awkward top placement.
- **Alternatives considered**: (a) Keep top-level selector plus inline hint (rejected: duplicate controls increase confusion). (b) Modal selector (rejected: extra tap and removes context while typing).

## Decision 2: Preserve numeric value on toggle, no auto FX conversion
- **Rationale**: Prevents silent value changes; aligns with requirement to keep numbers intact and let users adjust manually if they switch currency.
- **Alternatives considered**: (a) Auto-convert using latest FX (rejected: adds dependency and risk of surprise changes). (b) Force clear on toggle (rejected: loses user input unexpectedly).

## Decision 3: Persist last-used currency per device via local storage
- **Rationale**: Matches existing history/default behavior and requirement to restore currency on return; works offline.
- **Alternatives considered**: (a) Session-only memory (rejected: loses preference on reopen). (b) Server-side profile (rejected: feature is offline/local and no auth context).
