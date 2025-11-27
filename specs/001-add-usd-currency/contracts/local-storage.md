# Local Storage Contract - DCA Currency & History

## Keys
- `dca:lastCurrency`: string (`"KRW"` \| `"USD"`)
- `dca:history`: JSON stringified array of `HistoryEntry`

## HistoryEntry Shape
```json
{
  "id": "2025-11-27T12:00:00.000Z",
  "currency": "USD",
  "inputs": [
    { "id": "lot-1", "price": 10.12, "quantity": 3, "fee": null }
  ],
  "result": {
    "averageCost": 10.12,
    "totalInvested": 30.36,
    "perLot": [{ "lotId": "lot-1", "averageCost": 10.12, "total": 30.36 }]
  },
  "createdAt": "2025-11-27T12:00:00.000Z"
}
```

## Rules
- Max 10 entries; on new save with 10 existing, drop the oldest (by `createdAt`).
- Currency is required and must match form currency at save time.
- USD values are stored/displayed rounded half-up to 2 decimals; KRW retains current formatting.
- Restore uses persisted currency, inputs, and results without conversion.
- If data is missing or JSON parse fails, fall back to empty history and default currency `KRW`.
