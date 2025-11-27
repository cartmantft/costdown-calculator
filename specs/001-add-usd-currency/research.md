# Research - USD Currency Support for DCA

- **Decision**: USD는 입력 시 2자리로 반올림(half-up)해 저장하고 계산/표시/히스토리 모두 2자리로 통일  
  **Rationale**: 사용자가 기대하는 통화 포맷과 일치하며 반올림 일관성으로 혼선을 방지함  
  **Alternatives considered**: 4자리 입력·표시 유지(정밀도 높지만 UI 가독성 저하), 입력 정밀 보존·표시는 2자리(동기화 혼선 위험)

- **Decision**: 초기 기본 통화는 KRW, 마지막 선택 통화를 로컬 스토리지에 저장해 이후 방문 시 기본으로 이어받음 (`dca:lastCurrency`)  
  **Rationale**: 기존 사용자 흐름을 깨지 않으면서 재방문 시 재설정 부담을 줄임  
  **Alternatives considered**: 세션 한정 기억(새 방문 시 리셋되어 반복 설정 필요), 항상 KRW 고정(USD 사용자 불편)

- **Decision**: UI는 TDS 모바일 컴포넌트 우선 — SegmentedControl로 통화 선택, TextField/Stepper로 lot 입력, ConfirmDialog로 통화 전환 경고, BottomCTA로 제출/리셋, Toast로 피드백  
  **Rationale**: AppInToS 미니앱 톤앤매너 유지 및 재사용으로 일관성과 개발 속도 확보  
  **Alternatives considered**: 커스텀 컴포넌트(스타일 불일치), 기본 HTML 입력(접근성·모바일 피드백 미흡)

- **Decision**: 히스토리는 로컬 스토리지 `dca:history`에 배열로 저장하며 각 엔트리에 currency 코드(`KRW`/`USD`), inputs, results, timestamp 포함; 최대 10개 유지, 초과 시 가장 오래된 항목 제거  
  **Rationale**: 사양 상 10개 제한을 지키면서 복원에 필요한 최소 정보를 일관된 스키마로 제공  
  **Alternatives considered**: 통화별 별도 버킷(구현 복잡도↑), 무제한 저장(성능·정책 위반)

- **Decision**: 외부 API/환율 연동 없음; 모든 계산은 선택 통화 기준으로만 처리  
  **Rationale**: 스펙에서 FX 제외를 명시했고 오프라인 우선 동작이 간단함  
  **Alternatives considered**: 실시간 환율 조회(요구사항 아님, 의존도 및 오류 표면 증가)
