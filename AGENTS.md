# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds app code. Entry points live in `src/main.tsx` and `src/App.tsx`, routing is anchored in `src/routes/HomePage.tsx`.
- UI is split between `src/components/dca` (form, result, history list) and `src/components/common` (shared building blocks). Domain logic sits in `src/features/dca` (`calc`, `history`, `hooks`, `types`, `mock`), keeping calculations and localStorage history management decoupled from views.
- Cross-cutting helpers live in `src/lib` (env access, number formatting, API shell, storage utils). Global styling is centralized in `src/styles/global.css`; design tokens lean on TDS Mobile defaults.
- Static assets belong in `public/`; production bundles land in `dist/`. Tooling/config roots: `vite.config.ts`, `granite.config.ts`, `eslint.config.js`, and `tsconfig*.json`.

## Build, Test, and Development Commands
- Install once: `npm install`.
- Dev server: `npm run dev` (Granite + Vite; respects `DEV_SERVER_HOST/PORT` for LAN testing).
- Production build: `npm run build` (outputs to `dist/`); preview the bundle with `npm run preview`.
- Linting: `npm run lint` (ESLint flat config). Fix findings before opening a PR.
- Deploy: `npm run deploy` (AIT deploy wrapper); verify build success first.

## Coding Style & Naming Conventions
- React + TypeScript with functional components. Use PascalCase for components/files in `*.tsx`, camelCase for hooks/utilities (`useDcaCalculator`, `calculateDca`).
- Prefer single quotes, trailing semicolons, and 2-space indentation. Keep imports ordered: external packages, internal aliases, then styles/assets.
- UI components should reuse `@toss/tds-mobile` primitives; add shared UI pieces under `src/components/common`. Keep page-level layout tweaks in `src/styles/global.css` rather than inline styles.
- Keep domain logic pure inside `src/features/dca`; avoid reaching into DOM or globals from there.

## Testing Guidelines
- No automated test suite is present. When adding tests, colocate unit specs near logic (`src/features/dca/*.test.ts`) and favor pure functions (`calc`, `history`) for coverage.
- Until tests exist, manually verify: new calculations save to history (max 10 entries), additional lots cap at 5, saving/loading preserves symbol/quantities, and toasts surface errors.

## Environment & Configuration
- Copy `.env.example` → `.env` locally. Keys: `DEV_SERVER_HOST`, `DEV_SERVER_PORT`, `VITE_DCA_HISTORY_LIMIT` (default 10), `VITE_APP_CURRENCY_SYMBOL`/`VITE_APP_CURRENCY` (display labels). Example:
  ```
  DEV_SERVER_HOST=0.0.0.0
  DEV_SERVER_PORT=4173
  VITE_DCA_HISTORY_LIMIT=10
  VITE_APP_CURRENCY_SYMBOL=₩
  VITE_APP_CURRENCY=KRW
  ```
- `.env` is gitignored; keep secrets out of commits and PR descriptions.

## Commit & Pull Request Guidelines
- Follow the existing Git history style: concise, descriptive, present-tense messages (English or Korean). Example: `Refine DCA history cards`.
- Before opening a PR, run `npm run lint`, ensure builds succeed, and attach screenshots/GIFs for UI-visible changes. Link related issues and call out config/env updates explicitly. Keep PR descriptions short but actionable: what changed, why, and how to verify.

## Recent Changes
- 001-add-usd-currency: Added TypeScript 5.9, React 18, Vite 7 (Granite dev wrapper) + @toss/tds-mobile 2.1.2, @apps-in-toss/web-framework 1.5.0, @emotion/react 11.x, @vitejs/plugin-react, eslint, typescrip
- 001-add-usd-currency: Added [if applicable, e.g., PostgreSQL, CoreData, files or N/A]

## Active Technologies
- TypeScript 5.9, React 18, Vite 7 (Granite dev wrapper) + @toss/tds-mobile 2.1.2, @apps-in-toss/web-framework 1.5.0, @emotion/react 11.x, @vitejs/plugin-react, eslint, typescrip (001-add-usd-currency)
- Browser localStorage (`dca:lastCurrency`, `dca:history` capped at 10) (001-add-usd-currency)
