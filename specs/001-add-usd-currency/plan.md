# Implementation Plan: USD Currency Support for DCA

**Branch**: `[001-add-usd-currency]` | **Date**: 2025-11-27 | **Spec**: `/Users/stan/Desktop/projects/costdown-calculator/specs/001-add-usd-currency/spec.md`  
**Input**: Feature specification from `/specs/001-add-usd-currency/spec.md`

## Summary
- USD 통화 선택/계산/표시를 지원하고, USD는 입력·계산·표시 모두 소수 2자리(half-up)로 일관 처리.
- 기본 통화는 KRW지만 사용자의 마지막 선택 통화를 로컬 스토리지에 저장해 재방문 시 이어받음.
- AppInToS 미니앱 톤앤매너를 위해 TDS 모바일 컴포넌트(예: SegmentedControl, TextField/Stepper, ConfirmDialog, Toast, BottomCTA)로 UI를 통일.

## Technical Context
**Language/Version**: TypeScript 5.9, React 18, Vite 7 (Granite dev wrapper)  
**Primary Dependencies**: @toss/tds-mobile 2.1.2, @apps-in-toss/web-framework 1.5.0, @emotion/react 11.x, @vitejs/plugin-react, eslint, typescript  
**Storage**: Browser localStorage (`dca:lastCurrency`, `dca:history` capped at 10)  
**Testing**: Manual QA per spec; unit tests not present (vitest optional if added)  
**Target Platform**: Web (Granite + Vite) mobile-first AppInToS 미니앱  
**Project Type**: Single web frontend  
**Performance Goals**: Form interactions <100ms, history ops O(10); keep bundle lean and mobile-responsive  
**Constraints**: Max 5 lots, history 10 entries, no FX conversion, offline-capable, USD 2-dec rounding, TDS 컴포넌트 우선 사용  
**Scale/Scope**: Single-page calculator with form/result/history

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*
- Constitution file is a placeholder with no enforceable principles; no violations detected. **Status: PASS**

## Project Structure
```text
specs/001-add-usd-currency/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md (via /speckit.tasks)

src/
├── main.tsx
├── App.tsx
├── routes/HomePage.tsx
├── components/
│   ├── common/
│   └── dca/
├── features/dca/
│   ├── calc/
│   ├── history/
│   ├── hooks/
│   ├── mock/
│   ├── types/
│   └── ...
├── lib/
└── styles/global.css

public/
└── assets...
```

**Structure Decision**: Single web frontend (Vite/Granite) using TDS 모바일 컴포넌트; feature logic isolated under `src/features/dca`, UI under `src/components/dca`, shared primitives under `src/components/common`.

## Phase 0 - Research (completed)
- Output: `/Users/stan/Desktop/projects/costdown-calculator/specs/001-add-usd-currency/research.md`
- All unknowns resolved: rounding policy, default currency persistence, TDS-first UI approach, local storage schema, no external APIs/Fx.

## Phase 1 - Design & Contracts (completed)
- Data Model: `/Users/stan/Desktop/projects/costdown-calculator/specs/001-add-usd-currency/data-model.md`
- Contracts: `/Users/stan/Desktop/projects/costdown-calculator/specs/001-add-usd-currency/contracts/local-storage.md`
- Quickstart: `/Users/stan/Desktop/projects/costdown-calculator/specs/001-add-usd-currency/quickstart.md`
- Agent Context: `.specify/scripts/bash/update-agent-context.sh codex` (run post-plan updates as needed)

## Complexity Tracking
No constitution violations or additional complexity to justify.
