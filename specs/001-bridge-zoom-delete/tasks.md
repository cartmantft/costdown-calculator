# Tasks: 브릿지 아이콘, 줌 차단, 삭제 영속

**Input**: Design documents from `/specs/001-bridge-zoom-delete/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 환경 및 기본 설정 정리

- [X] T001 `.env.example`을 검토해 `VITE_DCA_HISTORY_LIMIT`, `VITE_APP_CURRENCY_SYMBOL`, `VITE_APP_CURRENCY`가 최신 요구사항과 일치하는지 확인하고 필요 시 문구 보완 (`/Users/stan/Desktop/projects/costdown-calculator/.env.example`)
- [X] T002 `package.json` 기준 의존성 설치 상태 점검 및 `npm install` 실행 여부 확인 (`/Users/stan/Desktop/projects/costdown-calculator/package.json`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 스토리에 공통 적용되는 도메인/스토리지 기반 정비

- [X] T003 `src/features/dca/types.ts`를 데이터 모델에 맞춰 보완(필드/타입, lot 최대 5 규칙 주석)하여 후속 스토리 타입 불일치 방지 (`/Users/stan/Desktop/projects/costdown-calculator/src/features/dca/types.ts`)
- [X] T004 `src/lib/localStorage.ts`와 `src/features/dca/history.ts`의 스토리지 키/버전/limit 상수 정합성을 점검해 단일 소스 오브 트루스 주석으로 명시 (`/Users/stan/Desktop/projects/costdown-calculator/src/lib/localStorage.ts`, `/Users/stan/Desktop/projects/costdown-calculator/src/features/dca/history.ts`)

**Checkpoint**: 타입/스토리지 기반 합의 완료 → 스토리 작업 시작 가능

---

## Phase 3: User Story 1 - 삭제한 항목은 계속 삭제 상태 (Priority: P1) 🎯 MVP

**Goal**: 삭제된 계산 기록이 재실행 후에도 되살아나지 않고 빈 상태가 유지된다.

**Independent Test**: 항목을 삭제한 뒤 앱을 3회 연속 재실행해도 해당 항목이 나타나지 않는지 확인한다.

### Implementation for User Story 1

- [X] T005 [P] [US1] `src/features/dca/history.ts`에서 삭제/저장 로직을 강화해 빈 배열도 영속 저장하고 `updatedAt`을 갱신하여 재실행 시 복구가 일어나지 않도록 한다 (`/Users/stan/Desktop/projects/costdown-calculator/src/features/dca/history.ts`)
- [X] T006 [US1] `src/features/dca/hooks.ts` 초기 로드와 `deleteEntry` 흐름을 수정해 사용자 삭제 이후에도 mock 히스토리가 다시 주입되지 않게 하고 상태/스토리지 동기화를 보장한다 (`/Users/stan/Desktop/projects/costdown-calculator/src/features/dca/hooks.ts`)
- [X] T007 [P] [US1] `src/components/dca/DcaHistoryList.tsx` 빈 상태/삭제 UI를 조정해 마지막 항목 삭제 후 즉시 빈 상태가 보이고 재실행 시에도 빈 상태가 유지되도록 한다 (`/Users/stan/Desktop/projects/costdown-calculator/src/components/dca/DcaHistoryList.tsx`)
- [X] T008 [US1] `specs/001-bridge-zoom-delete/quickstart.md`에 삭제 영속 수동 검증 시나리오(삭제→재실행 3회→재등장 0건)를 추가한다 (`/Users/stan/Desktop/projects/costdown-calculator/specs/001-bridge-zoom-delete/quickstart.md`)

**Checkpoint**: 삭제 영속성 독립 검증 완료

---

## Phase 4: User Story 2 - 브랜드 진입 화면 노출 (Priority: P2)

**Goal**: 브릿지 뷰와 공통 내비게이션 바에 앱 아이콘/이름/브랜드 색이 일관 노출되며 로드 실패 시에도 대체 표시로 진입을 막지 않는다.

**Independent Test**: 토스 진입 후 브릿지 뷰와 화면 전환 시 동일 아이콘·이름·색상이 1초 내 표시되고, 에셋 실패 시 이름-only 대체가 보이는지 확인한다.

### Implementation for User Story 2

- [X] T009 [P] [US2] `src/routes/HomePage.tsx` 상단에 브릿지 헤더를 추가/보완해 `public/logo.png` 아이콘, 앱 이름, 브랜드 색이 함께 노출되도록 구성한다 (`/Users/stan/Desktop/projects/costdown-calculator/src/routes/HomePage.tsx`, `/Users/stan/Desktop/projects/costdown-calculator/public/logo.png`)
- [X] T010 [US2] 공통 내비게이션 바(새 컴포넌트 또는 기존 레이아웃)를 도입/연결해 모든 주요 화면에서 동일 아이콘과 이름이 유지되도록 한다 (`/Users/stan/Desktop/projects/costdown-calculator/src/components/common`, `/Users/stan/Desktop/projects/costdown-calculator/src/App.tsx`)
- [X] T011 [P] [US2] 브랜드 에셋 로드 실패 시 이름+중립 배경 대체 표시와 재시도 처리를 추가한다 (`/Users/stan/Desktop/projects/costdown-calculator/src/routes/HomePage.tsx`)
- [X] T012 [US2] `specs/001-bridge-zoom-delete/quickstart.md`에 브릿지/내비 브랜드 노출 확인 절차를 추가한다 (`/Users/stan/Desktop/projects/costdown-calculator/specs/001-bridge-zoom-delete/quickstart.md`)

**Checkpoint**: 브랜드 노출 및 대체 처리 독립 검증 완료

---

## Phase 5: User Story 3 - 줌 제스처 차단 (Priority: P3)

**Goal**: 핀치·멀티터치·더블탭으로도 화면 확대/축소가 되지 않으며 기본 제스처(탭/스크롤/입력)는 유지된다.

**Independent Test**: 주요 화면에서 핀치·멀티터치를 반복해도 스케일 변화가 없고 탭/스크롤/입력 반응이 유지되는지 확인한다.

### Implementation for User Story 3

- [X] T013 [P] [US3] `index.html` 메타 뷰포트에 `initial-scale=1, maximum-scale=1, user-scalable=no`를 설정한다 (`/Users/stan/Desktop/projects/costdown-calculator/index.html`)
- [X] T014 [US3] `src/main.tsx` 등에 멀티터치/더블탭 줌 방지 이벤트 핸들러를 추가해 브라우저별 줌을 차단하되 기본 제스처는 유지한다 (`/Users/stan/Desktop/projects/costdown-calculator/src/main.tsx`)
- [X] T015 [US3] `specs/001-bridge-zoom-delete/quickstart.md`에 줌 차단 수동 검증 절차를 추가한다 (`/Users/stan/Desktop/projects/costdown-calculator/specs/001-bridge-zoom-delete/quickstart.md`)

**Checkpoint**: 줌 차단 독립 검증 완료

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T016 [P] 문서 정리: 사양/플랜/퀵스타트 변경분을 반영한 간단 changelog 추가 (`/Users/stan/Desktop/projects/costdown-calculator/specs/001-bridge-zoom-delete/quickstart.md`)
- [X] T017 `npm run lint`를 실행해 모든 변경이 린트 통과하는지 확인 (`/Users/stan/Desktop/projects/costdown-calculator/package.json`)

---

## Dependencies & Execution Order

- Phase 1 → Phase 2 → User Stories(3/4/5) → Phase 6 순서.  
- User Story 병렬 가능: US1(P1) 완료가 MVP, US2(P2)·US3(P3)은 Foundational 완료 후 병렬 진행 가능.

## Parallel Opportunities

- [P] 태그가 붙은 작업은 병렬 가능: T005/T007, T009/T011, T013, T016 등.  
- 다른 스토리 간 충돌을 피하려면 동일 파일 편집이 겹치지 않도록 분배.

## Implementation Strategy

- MVP 우선: Phase 1–2 완료 후 US1만 완성/검증 → 삭제 영속성 확보.  
- 이후 US2와 US3을 병렬로 진행해 브랜드 노출과 줌 차단을 추가.  
- 마무리로 Polish Phase에서 문서/린트 체크 수행.  
- 각 스토리는 독립 수동 검증(quickstart 업데이트 포함) 후 종료.
