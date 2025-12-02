# Implementation Plan: Inline currency toggle in average price field

**Branch**: `001-inline-currency-toggle` | **Date**: 2025-11-27 | **Spec**: /Users/stan/Desktop/projects/costdown-calculator/specs/001-inline-currency-toggle/spec.md
**Input**: Feature specification from `/specs/001-inline-currency-toggle/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Move the KRW/USD selector into the “현재 평균단가” input area so users switch currency where they type, remove the prior top-level selector, persist last-used currency on return, and keep entered numbers intact when toggling currency without auto-conversion.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.9, React 18  
**Primary Dependencies**: Vite 7 (Granite wrapper), @toss/tds-mobile 2.1.2, @apps-in-toss/web-framework 1.5.0, @emotion/react 11.x  
**Storage**: Browser localStorage for currency/default history  
**Testing**: eslint flat config (`npm run lint`), manual form validation flows  
**Target Platform**: Web (mobile-first responsive)  
**Project Type**: Single-page web app  
**Performance Goals**: Currency toggle and label updates feel immediate (<0.1s perceived delay) on modern mobile devices  
**Constraints**: Single currency control per screen; no automatic FX conversion; align with existing TDS Mobile form styles; offline-capable for stored defaults/history  
**Scale/Scope**: One calculator flow with local history capped at 10 entries; two currencies (KRW, USD)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution file is placeholder-only (no defined principles or gates). No enforceable constraints detected; proceeding with standard simplicity and UX clarity.

## Project Structure

### Documentation (this feature)

```text
specs/001-inline-currency-toggle/
├── plan.md              # This file (/speckit.plan output)
├── research.md          # Phase 0 output (/speckit.plan)
├── data-model.md        # Phase 1 output (/speckit.plan)
├── quickstart.md        # Phase 1 output (/speckit.plan)
├── contracts/           # Phase 1 output (/speckit.plan)
└── tasks.md             # Phase 2 output (/speckit.tasks; not created here)
```

### Source Code (repository root)

```text
src/
├── main.tsx
├── App.tsx
├── routes/HomePage.tsx
├── components/
│   ├── dca/        # form, result, history list
│   └── common/     # shared UI building blocks
├── features/dca/   # calc, history, hooks, types, mock
├── lib/            # env, formatting, storage utils
└── styles/global.css

public/
dist/
```

**Structure Decision**: Single web app with DCA feature modules under `src/features/dca` and UI under `src/components`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
