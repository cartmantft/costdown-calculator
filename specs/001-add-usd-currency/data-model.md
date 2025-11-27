# Data Model - USD Currency Support for DCA

## Entities

### CurrencySetting
| Field | Type | Rules/Notes |
| --- | --- | --- |
| code | enum (`KRW` \| `USD`) | default `KRW`; last selection persisted in local storage (`dca:lastCurrency`) |
| symbol | string | derived from config/env (`₩`, `$`); fallback to code if missing |

### LotInput
| Field | Type | Rules/Notes |
| --- | --- | --- |
| id | string | client-generated (e.g., uuid or timestamp-based) |
| price | number | required; `USD` 입력은 소수 2자리로 반올림 저장; `KRW` 기존 포맷 유지 |
| quantity | number | required; >0; supports decimal quantities |
| fee | number \| null | optional; keep existing handling |

### CalculationResult
| Field | Type | Rules/Notes |
| --- | --- | --- |
| averageCost | number | same currency as selection; USD 2-dec display |
| totalInvested | number | sum(price\*quantity + fee); USD 2-dec display |
| perLot | Array<{ lotId, averageCost, total }> | aligned to lot inputs; USD 2-dec display |

### HistoryEntry
| Field | Type | Rules/Notes |
| --- | --- | --- |
| id | string | timestamp-based id for ordering |
| currency | enum (`KRW` \| `USD`) | required; displayed badge in history list |
| inputs | LotInput[] | max 5 lots; values reflect stored rounding policy |
| result | CalculationResult | computed at save time |
| createdAt | ISO string | used for display and eviction |

## Relationships & Limits
- History list holds up to 10 entries; on insert when full, drop the oldest.
- CurrencySetting applies to form inputs, calculations, display, and history restore.
- Switching currency clears current inputs/results after confirmation; does not convert values.

## Validation & Precision
- Lot count ≤ 5; numeric fields required.
- USD: round half-up to 2 decimals on entry; display and storage to 2 decimals consistently.
- KRW: keep existing integer/formatting behavior.
