# Implementation Plan: 브릿지 아이콘, 줌 차단, 삭제 영속

**Branch**: `001-bridge-zoom-delete` | **Date**: 2025-12-02 | **Spec**: specs/001-bridge-zoom-delete/spec.md  
**Input**: Feature specification from `/specs/001-bridge-zoom-delete/spec.md`

## Summary

- 브릿지 뷰와 공통 내비게이션 바에 앱 아이콘/이름/브랜드 색을 일관 노출하고, 실패 시 이름 기반 대체 표시 후 재시도.  
- 전 화면 핀치/멀티터치 줌을 차단해 뷰포트 스케일을 고정하되 탭/스크롤/입력은 정상 유지.  
- 계산 히스토리 삭제가 재실행 후에도 복원되지 않도록 로컬 스토리지 단일 소스와 동기화, 최대 10개/lot 5개 제약 준수.

## Technical Context

**Language/Version**: TypeScript 5.9, React 18  
**Primary Dependencies**: Vite 7 (Granite wrapper), @toss/tds-mobile 2.1.2, @apps-in-toss/web-framework 1.5.0, @emotion/react 11.x  
**Storage**: Browser localStorage (히스토리, 설정)  
**Testing**: 현재 자동화 테스트 없음; 수동 검증 + `npm run lint`  
**Target Platform**: 토스 미니앱 웹뷰(모바일 중심)  
**Project Type**: Web single-app (프론트엔드 단일 코드베이스)  
**Performance Goals**: 초기/화면 전환 시 2초 내 반응, 브릿지 뷰 1초 내 브랜드 노출, 줌 차단으로 레이아웃 안정 유지  
**Constraints**: 히스토리 10개, lot 5개, 줌 비활성, 라이트 모드 고정, 오프라인에서도 삭제 상태 유지  
**Scale/Scope**: 단일 미니앱, 주요 화면 몇 개, 로컬 저장 기반 적은 데이터량

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 현재 constitution 파일이 템플릿 상태로 원칙/게이트가 정의되어 있지 않음. 적용 가능한 게이트가 없어 진행을 허용하되, 향후 채워질 경우 재평가 필요.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
specs/001-bridge-zoom-delete/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/

src/
├── main.tsx
├── App.tsx
├── routes/
│   └── HomePage.tsx
├── components/
│   ├── dca/         # 폼, 결과, 히스토리 UI
│   └── common/      # 공용 UI 빌딩 블록
├── features/
│   └── dca/         # calc, history, hooks, types, mock
├── lib/             # env, number formatting, storage utils
└── styles/
    └── global.css
```

**Structure Decision**: 단일 프론트엔드 앱 구조를 유지하고, 히스토리/브랜드/뷰포트 로직은 `features/dca`(도메인)와 `components`(뷰) 및 `lib/storage` 유틸을 중심으로 수정한다.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | - | - |
