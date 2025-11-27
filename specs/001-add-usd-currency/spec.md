# Feature Specification: USD Currency Support for DCA

**Feature Branch**: `[001-add-usd-currency]`  
**Created**: 2025-11-26  
**Status**: Draft  
**Input**: User description: "현재 프로젝트는 주식 물타기 계산기야 현재 원화만 적용중인데 달러도 추가하고 싶어"

## Clarifications

### Session 2025-11-27

- Q: USD 입력·계산·표시에 어떤 소수점 처리 정책을 쓸까? → A: USD는 입력 시 2자리로 반올림(half-up)해 저장하고 계산/표시/히스토리 모두 2자리로 통일한다.
- Q: 기본 통화는 어떻게 결정하고 재방문 시 무엇을 기본으로 둘까? → A: 초기 기본은 기존 KRW이고, 사용자가 마지막에 선택한 통화를 로컬 스토리지에 저장해 이후 방문 시 기본으로 이어받는다.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Calculate in USD (Priority: P1)

Individual investors want to choose USD as the working currency, enter lot data, and see average cost calculations and results entirely in USD without needing KRW conversion.

**Why this priority**: Enables the primary value of the feature—supporting USD-based investments and preventing wrong currency assumptions.

**Independent Test**: Start a new calculation, select USD, enter multiple lots, and verify results show only USD values and symbols without relying on KRW settings.

**Acceptance Scenarios**:

1. **Given** USD is selected before entering any data, **When** the user inputs up to five lots with prices and quantities, **Then** the calculator shows per-lot and aggregate averages and totals in USD with the correct symbol.
2. **Given** USD is selected, **When** the user edits lot values and recalculates, **Then** all derived values refresh consistently in USD formatting without mixing KRW defaults.

---

### User Story 2 - Save and Restore Currency Context (Priority: P2)

Investors want saved calculations to preserve which currency was used so they can revisit a USD or KRW scenario later without reselecting or reformatting.

**Why this priority**: Prevents misinterpretation of saved numbers and reduces repeat data entry for ongoing investment plans.

**Independent Test**: Save one USD calculation and one KRW calculation, then restore each and confirm the form, results, and formatting match the saved currency.

**Acceptance Scenarios**:

1. **Given** the user saves a USD calculation, **When** it appears in history, **Then** the entry shows a USD indicator and retains all USD inputs and outputs.
2. **Given** the user opens a USD history entry, **When** it is restored to the form, **Then** the form currency is USD and all values and symbols align with that currency.

---

### User Story 3 - Switch Currency Safely (Priority: P3)

Users may start in one currency and change their mind; they want to switch between KRW and USD without carrying over incompatible values.

**Why this priority**: Reduces user error and ensures calculations are not polluted by prior currency inputs.

**Independent Test**: Populate the form in one currency, attempt to switch, confirm the guardrail behavior, and proceed with a fresh calculation in the new currency.

**Acceptance Scenarios**:

1. **Given** the form has KRW data filled, **When** the user switches to USD, **Then** they are warned that inputs will be cleared and after confirmation the form resets with USD formatting.
2. **Given** the user switches from USD back to KRW, **When** they proceed, **Then** any previous USD values are cleared and new calculations show KRW symbols and totals only.

---

### Edge Cases

- Switching currency after partial input without confirmation could mix units; must prevent accidental carryover.
- History list containing both KRW and USD entries must remain readable and distinguishable within the 10-entry cap.
- Currency symbol or label missing from configuration should not block calculations; use safe defaults and surface a user-friendly notice.
- USD 가격은 입력 시 2자리로 반올림되고 입력/결과/히스토리 모두 2자리로 일관되게 표기된다; 추가 정밀도는 보존하지 않는다.
- Restoring a history entry created in a removed/default currency should still render and label amounts correctly.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Users MUST be able to select KRW or USD as the calculation currency before entering lots.
- **FR-002**: The calculator MUST compute all averages, totals, and summaries using only the selected currency values and formatting.
- **FR-003**: The UI MUST display the correct currency symbol and code on inputs, results, toasts, and summaries for the selected currency.
- **FR-004**: Saving a calculation MUST store the selected currency alongside inputs and results so history entries clearly indicate currency.
- **FR-005**: Restoring from history MUST reapply the stored currency, prefill values, and render results with matching currency labels.
- **FR-006**: Attempting to switch currency with populated fields MUST warn the user and, upon confirmation, clear prior values instead of converting them.
- **FR-007**: Currency-specific validation MUST allow up to five lots, enforce required numeric fields, and for USD limit inputs to 2 decimal places (round half-up on entry) with calculations/results/history also shown to 2 decimals; KRW formatting follows existing behavior.
- **FR-008**: Initial default currency is KRW; the last selected currency must be persisted locally and reused as the default on subsequent visits.

### Key Entities *(include if feature involves data)*

- **Currency Setting**: Current currency selection (KRW or USD), labels/symbols used for display, and defaults applied on load or when restoring history.
- **Calculation Input**: Lot entries (price, quantity, optional fee if present) tied to a currency context and subject to per-lot and total limits.
- **Calculation Result**: Aggregated average cost, total invested amount, and per-lot summaries produced in the chosen currency.
- **History Entry**: Saved snapshot including currency setting, inputs, results, timestamp, and any metadata shown in the history list.

## Assumptions

- Currency selection controls both input and output; no automatic FX conversion between KRW and USD is performed.
- Switching currency clears existing inputs instead of converting values to avoid incorrect mixed-unit calculations.
- Default currency follows the current app setting (KRW) until the user explicitly changes it; history entries keep their original currency.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete a USD-based DCA calculation with up to five lots in under 2 minutes from opening the form to seeing results.
- **SC-002**: 100% of new history entries display the correct currency indicator and restore with matching currency, values, and formatting in manual QA runs.
- **SC-003**: Currency switching with populated fields always surfaces a confirmation, and in 100% of tested attempts no mixed-currency values remain after the switch.
- **SC-004**: All visible monetary amounts (inputs, results, history) show the appropriate currency symbol/code for the chosen currency across supported devices.
