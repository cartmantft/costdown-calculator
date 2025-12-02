# Data Model: Inline currency toggle

## Entities

### CurrencySelection
- **Fields**:
  - `code`: KRW | USD (required)
  - `source`: `lastUsed` | `prefilled` (optional, for analytics/debug)
  - `persistedAt`: timestamp (when stored locally)
- **Validation**:
  - Code must be one of KRW or USD.
  - Only one active currency selector per screen.
- **State**:
  - Loads from stored preference when calculator opens.
  - Updates immediately on toggle and writes to local storage.

### HoldingEntry
- **Fields**:
  - `symbol`: string (required)
  - `averagePrice`: number/string input (required, non-negative)
  - `quantity`: number/string input (required, non-negative)
  - `currency`: KRW | USD (required; bound to CurrencySelection)
- **Validation**:
  - Numeric fields must parse to finite, non-negative values.
  - Currency must mirror the current CurrencySelection.
- **State**:
  - When toggling currency, `averagePrice` value persists while `currency` label updates; no automatic conversion.
  - Prefilled entries show stored currency; if missing, default to last-used currency.

## Relationships
- `HoldingEntry.currency` references `CurrencySelection.code`; UI must keep them in sync.
- CurrencySelection persistence informs default for new HoldingEntry forms.
