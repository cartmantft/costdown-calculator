# Tasks: USD Currency Support for DCA

**Input**: Design documents from `/specs/001-add-usd-currency/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual QA only (spec notes no automated tests yet).  
**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Environment/config initialization for multi통화

- [X] T001 Copy `.env.example` to `.env` and set `VITE_APP_CURRENCY`/`VITE_APP_CURRENCY_SYMBOL` defaults for KRW/USD fallbacks (`.env.example`, `.env`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infra that all stories depend on

- [X] T002 Define currency enums/defaults and expose KRW/USD symbols in `src/config/appConfig.ts` and `src/features/dca/types.ts`
- [X] T003 [P] Extend number formatting to accept currency-aware options and USD 2-dec rounding helpers in `src/lib/numberFormat.ts`
- [X] T004 [P] Refine local storage keys/schema constants for currency-aware history (`dca:lastCurrency`, `dca:history`) in `src/lib/localStorage.ts` and `src/features/dca/history.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Calculate in USD (Priority: P1) 🎯 MVP

**Goal**: USD 선택 시 입력·계산·표시 전 구간을 USD 2-dec 정책으로 처리하고 KRW와 혼선 없이 계산한다.

**Independent Test**: USD 선택 후 최대 5개 lot 입력 → 결과와 심볼 모두 USD로 표시되고 2자리 반올림으로 유지.

### Implementation for User Story 1

- [X] T005 [P] [US1] Add currency state to calculator (input includes currency) and pipe through calculations with USD 2-dec rounding in `src/features/dca/hooks.ts` and `src/features/dca/calc.ts`
- [X] T006 [P] [US1] Add TDS `SegmentedControl` for KRW/USD selection with default from config in `src/routes/HomePage.tsx` and pass to form/result
- [X] T007 [P] [US1] Apply USD 입력 2-dec 반올림/표시와 심볼 노출 on fields in `src/components/dca/DcaForm.tsx`
- [X] T008 [US1] Render results with currency symbol/code and USD 2-dec formatting in `src/components/dca/DcaResult.tsx`

**Checkpoint**: User Story 1 independently functional (USD 계산/표시 완료)

---

## Phase 4: User Story 2 - Save and Restore Currency Context (Priority: P2)

**Goal**: 저장/복원 시 통화 컨텍스트와 포맷이 그대로 유지된다.

**Independent Test**: USD/KRW 각각 저장 후 복원 → 폼·결과·심볼이 저장된 통화로 일치.

### Implementation for User Story 2

- [X] T009 [P] [US2] Persist currency on history entries and validate schema/limit 10 in `src/features/dca/history.ts` and `src/features/dca/types.ts`
- [X] T010 [P] [US2] Store and load last selected currency (`dca:lastCurrency`) in `src/features/dca/hooks.ts`
- [X] T011 [US2] Show currency badge on history cards and restore currency on selection in `src/components/dca/DcaHistoryList.tsx` and `src/routes/HomePage.tsx`

**Checkpoint**: User Stories 1 AND 2 independently functional

---

## Phase 5: User Story 3 - Switch Currency Safely (Priority: P3)

**Goal**: 통화 전환 시 기존 값이 섞이지 않도록 경고 후 초기화한다.

**Independent Test**: 값 입력 상태에서 KRW↔USD 전환 시 ConfirmDialog 표시 → 확인 시 입력/결과 초기화, 취소 시 유지.

### Implementation for User Story 3

- [X] T012 [P] [US3] Implement currency switch guard with TDS `ConfirmDialog` in `src/routes/HomePage.tsx` (and prop handling in `src/components/dca/DcaForm.tsx` if needed)
- [X] T013 [US3] Reset lots/input/result to defaults on confirmed currency switch without conversion in `src/features/dca/hooks.ts`
- [X] T014 [US3] Surface toast messaging for switch outcomes and limits with currency context in `src/routes/HomePage.tsx`

**Checkpoint**: All user stories independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: UX consistency, docs, QA

- [X] T015 [P] Align currency labels/suffixes across DCA UI and styles (KRW/USD) in `src/components/dca/*.tsx` and `src/styles/global.css`
- [ ] T016 [P] Run manual QA per `specs/001-add-usd-currency/quickstart.md` and update notes/screens if deviations found

---

## Dependencies & Execution Order

### Phase Dependencies
- Setup → Foundational → User Stories → Polish
- User stories can start after Phase 2; recommended order P1 → P2 → P3

### User Story Dependencies
- US1: none (after foundational)
- US2: depends on US1 currency plumbing
- US3: depends on US1 currency state and US2 persistence readiness

### Within Each User Story
- Implement shared state/formatting before UI wiring; UI before persistence/guardrails; ensure rounding rules applied at input and result stages.

---

## Parallel Opportunities
- [P] tasks can run concurrently: T003 with T004; T005~T007 in parallel after foundation; T009 and T010 concurrently; T012 with T015/T016 after US2.
- Different user stories can be staffed in parallel once dependencies noted above are satisfied.

---

## Parallel Example: User Story 1

```bash
# Parallelizable within US1 after foundation:
T005 (currency state + calc) &
T006 (SegmentedControl UI) &
T007 (USD input rounding)

# Then finish:
T008 (result display) after T005/T007 land
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phases 1–2
2. Deliver US1 (T005–T008)
3. Manual QA for USD calc/표시 → demo

### Incremental Delivery
1. Foundation ready → US1 live (MVP)
2. Add US2 (persist/restore) → QA → demo
3. Add US3 (switch guard) → QA → demo
4. Polish tasks to wrap UX copy/QA notes
