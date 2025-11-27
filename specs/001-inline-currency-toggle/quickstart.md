# Quickstart: Inline currency toggle

1) **Checkout branch**  
`git checkout 001-inline-currency-toggle`

2) **Install & lint**  
`npm install` (once), `npm run lint` to verify no regressions.

3) **Run dev server**  
`npm run dev` (Granite + Vite). Use `DEV_SERVER_HOST/PORT` from `.env` if needed.

4) **Implement UI changes**  
- Move currency selector into the “현재 평균단가” input area in the DCA form component.  
- Remove or hide the prior top-level currency selector.  
- Ensure toggle updates currency label/suffix immediately and keeps numeric value untouched.

5) **Persistence**  
- Read `dca:lastCurrency` on load to default the inline selector.  
- Write selected currency on toggle; ignore invalid stored values.

6) **Manual verification**  
- Toggle KRW/USD inline without scrolling; confirm no duplicate selectors.  
- Enter a value, switch currency, verify number persists and label changes.  
- Reload: last-used currency restored.  
- Open a saved/prefilled entry: inline selector matches stored currency; if missing, falls back to last-used.
