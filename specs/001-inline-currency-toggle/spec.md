# Feature Specification: Inline currency toggle in average price field

**Feature Branch**: `001-inline-currency-toggle`  
**Created**: 2025-11-27  
**Status**: Draft  
**Input**: User description: "[스크린샷, 2025-11-27 오후 12.12.44.png 1125x2436] krw/usd 통화 선택 UI 화면이 어색하게 나와 최 상단이 아니라 현재 평균 단가 입력 창에서 원/달러 이렇게 사용자가 스위칭 할 수 있게 해야 할 거같아"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Inline currency switch at current average price (Priority: P1)

Users change KRW/USD directly beside the "현재 평균단가" field while entering values, without relying on a separate top banner.

**Why this priority**: Removes confusion about which currency applies to the main input and keeps the control where the user is focusing.

**Independent Test**: Open the calculator, focus the average price field, and complete a currency switch and entry without interacting with any other currency UI.

**Acceptance Scenarios**:

1. **Given** the calculator form is open, **When** the user focuses or views the "현재 평균단가" input, **Then** a KRW/USD selector is visible inline with that field and is tappable.
2. **Given** only the inline selector is available, **When** the user toggles to USD, **Then** the field suffix/label changes to USD and no separate top-level currency selector remains.

---

### User Story 2 - Remember the last-used currency (Priority: P2)

Returning users see the inline selector default to the currency they last used in the calculator.

**Why this priority**: Maintains continuity and prevents accidental currency mismatch on repeat visits.

**Independent Test**: Switch currency to USD, navigate away, return to the calculator, and confirm the inline selector is still USD.

**Acceptance Scenarios**:

1. **Given** a user previously selected USD, **When** they reopen the calculator, **Then** the inline selector shows USD without extra actions.

---

### User Story 3 - Switching after entering a value (Priority: P3)

Users can change the currency after typing an amount in the average price field and clearly understand the currency context of their entry.

**Why this priority**: Prevents accidental mislabeling of typed numbers when a currency change happens mid-entry.

**Independent Test**: Enter a KRW amount, toggle to USD, and confirm the number remains while the currency label updates and the user can adjust before saving.

**Acceptance Scenarios**:

1. **Given** a value is already typed, **When** the user toggles currency, **Then** the numeric value remains and the field label updates to the new currency without auto-converting the number.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- User toggles currency after entering multiple fields: numeric values remain; currency labels update; no silent conversion occurs, and user can edit before saving.
- A saved or prefilled entry is opened: inline selector reflects the saved currency; if absent, it falls back to the last-used currency without showing multiple selectors.
- Small-screen or scrolled view: only the inline selector appears; no duplicate selector is rendered at the top of the form.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The calculator MUST present a KRW/USD selector inline with the "현재 평균단가" input so currency can be changed without leaving that field.
- **FR-002**: The prior top-level currency selector MUST be removed or hidden so only one currency control is available on the page.
- **FR-003**: Switching the inline selector MUST immediately update currency labels/suffixes for the average price field (and any totals shown on the screen) before submission.
- **FR-004**: The selected currency MUST default to the most recent choice when the calculator is reopened or reloaded.
- **FR-005**: When a user toggles currency after entering a number, the numeric value MUST stay visible while the currency label changes; no automatic currency conversion occurs.
- **FR-006**: When opening saved or prefilled data, the inline selector MUST reflect that entry’s currency; if none is stored, it defaults to the last-used currency.

### Key Entities *(include if feature involves data)*

- **Currency selection**: Current calculator currency (KRW or USD); persisted per user device to restore defaults.
- **Holding entry**: A record of symbol, average price, quantity, and associated currency context used in calculations and summaries.

### Assumptions

- Toggling currency does not perform exchange-rate conversion; users will re-enter values if they change currency.
- Only KRW and USD are in scope for this selector.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Users can switch KRW/USD at the average price field in under two taps without scrolling in 100% of test sessions.
- **SC-002**: QA finds zero instances of duplicate currency selectors across supported device sizes and states.
- **SC-003**: After toggling currency, 95% of test runs show the updated currency label on the average price field and related totals before submission.
- **SC-004**: In a sample of returning users (n ≥ 10), at least 90% see their last-used currency restored on load.
