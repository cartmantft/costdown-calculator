# Contract: Currency preference persistence (local storage)

## Storage keys
- `dca:lastCurrency`: string, values `KRW` or `USD`

## Operations

### Get last currency
- **Trigger**: Calculator loads.
- **Process**: Read `dca:lastCurrency`. If missing, fall back to default currency (spec requirement: last used when available).
- **Output**: `KRW` | `USD` | `null` (meaning use default).

### Set last currency
- **Trigger**: User toggles the inline selector.
- **Process**: Write selected code to `dca:lastCurrency`.
- **Output**: None (side effect persists preference).

## Error handling
- If stored value is not `KRW` or `USD`, ignore it and fall back to default, then overwrite on next valid toggle.
