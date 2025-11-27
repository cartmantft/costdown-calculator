# Tasks: Inline currency toggle in average price field

**Input**: Design documents from `/specs/001-inline-currency-toggle/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No automated tests requested; focus on manual verification steps noted per story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Single web app under `src/`
- DCA UI: `src/components/dca/`
- DCA logic/storage: `src/features/dca/`, `src/lib/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm scope and environment before story work

- [X] T001 Review spec and plan requirements in specs/001-inline-currency-toggle/spec.md and specs/001-inline-currency-toggle/plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core understanding before UI changes

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Audit current currency selector placement and props in src/components/dca/DcaForm.tsx
- [X] T003 Review storage utilities for currency/history defaults in src/lib/localStorage.ts and usage in src/features/dca/history.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Inline currency switch at current average price (Priority: P1) 🎯 MVP

**Goal**: Users change KRW/USD directly beside the “현재 평균단가” field with no separate top selector.

**Independent Test**: Open the form, see a single inline KRW/USD toggle next to the average price input, switch currency, and observe labels update without using any other selector.

### Implementation for User Story 1

- [X] T004 [US1] Remove the prior top-level currency selector UI from src/components/dca/DcaForm.tsx so only one control remains
- [X] T005 [P] [US1] Add inline KRW/USD toggle adjacent to the “현재 평균단가” input in src/components/dca/DcaForm.tsx with TDS-Mobile styling
- [X] T006 [P] [US1] Wire inline toggle to update currency label/suffix for the average price field and on-screen totals in src/components/dca/DcaForm.tsx
- [X] T007 [US1] Adjust any shared styles to avoid duplicate spacing/gaps after removing top selector in src/styles/global.css (or component-scoped styles if present)

**Checkpoint**: User Story 1 independently functional and testable

---

## Phase 4: User Story 2 - Remember the last-used currency (Priority: P2)

**Goal**: Restore the last selected currency on return and persist new selections.

**Independent Test**: Switch to USD, leave/reload, and see the inline selector default to USD without extra taps.

### Implementation for User Story 2

- [X] T008 [US2] Load last-used currency from local storage key `dca:lastCurrency` on form init in src/components/dca/DcaForm.tsx via helpers in src/lib/localStorage.ts
- [X] T009 [P] [US2] Persist currency selection to `dca:lastCurrency` whenever toggle changes in src/components/dca/DcaForm.tsx using src/lib/localStorage.ts

**Checkpoint**: User Stories 1 and 2 independently functional and testable

---

## Phase 5: User Story 3 - Switching after entering a value (Priority: P3)

**Goal**: Users can toggle currency after typing a number; value stays while label updates with no auto-conversion.

**Independent Test**: Enter a KRW amount, toggle to USD, confirm the numeric value remains while the currency label changes before saving.

### Implementation for User Story 3

- [X] T010 [US3] Keep the numeric average price value intact on currency toggle while updating displayed currency label in src/components/dca/DcaForm.tsx
- [X] T011 [P] [US3] When loading prefilled/saved entries, ensure inline selector reflects stored currency or falls back to last-used in src/components/dca/DcaForm.tsx and src/features/dca/history.ts

**Checkpoint**: All user stories independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency and manual checks

- [X] T012 [P] Run lint and fix any styling/import issues in project (`npm run lint`)
- [ ] T013 Verify manual flows against quickstart checklist in specs/001-inline-currency-toggle/quickstart.md
- [ ] T014 [P] Update any relevant documentation or comments referencing currency selector placement in src/components/dca/DcaForm.tsx

---

## Dependencies & Execution Order

- Setup → Foundational → US1 (MVP) → US2 → US3 → Polish
- Story dependencies: US1 before US2 and US3 (US3 relies on inline toggle behavior and persistence); US2 before US3 for restored defaults.

## User Story Parallel Opportunities

- Within US1: T005 and T006 can proceed in parallel after T004 completes.
- US2 tasks (T008, T009) can run in parallel once US1 is stable.
- US3 tasks (T010, T011) can run after US2 loads persistence, with T011 in parallel if storage context is stable.

## Implementation Strategy

- MVP first: Complete US1 to deliver inline toggle without duplication.
- Incremental delivery: Layer persistence (US2) then post-entry toggle handling (US3).
- Manual verification at each checkpoint using acceptance scenarios from spec.md and quickstart.md.
