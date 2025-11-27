# Quickstart - Implement USD Currency Support for DCA

1) **Currency 선택 UI**: `SegmentedControl`(TDS)로 `KRW`/`USD` 토글 추가·정비, 기본값은 로컬 스토리지 `dca:lastCurrency` → 없으면 `KRW`.  
2) **상태 & 저장소**: 통화 상태를 계산 훅/컨텍스트에 전달하고, 선택 시 `dca:lastCurrency`에 즉시 저장.  
3) **입력 정밀도**: USD 입력값은 onChange 시 2자리 반올림(half-up) 후 상태에 저장; 표시도 2자리 고정. KRW는 기존 포맷 유지.  
4) **계산 파이프라인**: `calculateDca` 로직이 통화 코드와 함께 동작하도록 확장; 결과 포맷터에서 USD는 2자리, KRW는 현행 로직.  
5) **히스토리 저장/복원**: 저장 시 currency 포함해 `dca:history`에 push, 10개 초과 시 oldest drop. 복원 시 currency/state/form/results 모두 설정.  
6) **전환 가드**: 통화 변경 시 입력이 있으면 `ConfirmDialog`로 경고 후 확인 시 폼/결과 초기화; 취소 시 유지.  
7) **UI 일관성**: 입력(TextField/Stepper), 제출/초기화 버튼(BottomCTA + Button/TextButton), 피드백(Toast), 배지(Badge) 등 TDS 컴포넌트 사용.  
8) **수동 QA**: USD 계산 5 lot 2자리 표시, 전환 가드, 히스토리 USD/KRW 각각 저장·복원, 기본 통화 기억 동작, 오류/토스트 표시 확인.
