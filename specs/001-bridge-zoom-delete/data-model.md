# 데이터 모델 (Phase 1)

## 엔터티

### Calculation Entry
- **id**: string (고유 식별자, 삭제/정렬에 사용)
- **symbol**: string (예: 티커/라벨)
- **title**: string (표시용 이름)
- **amount**: number (기준 금액 또는 총액)
- **currencySymbol**: string (표시 화폐 기호)
- **currencyCode**: string (예: KRW, USD)
- **scheduleType**: string (예: dca, lump-sum)
- **lots**: array<{date: string, amount: number}> (분할 매수 정보, 최대 5)
- **createdAt**: string (ISO 타임스탬프)
- **updatedAt**: string (ISO 타임스탬프)

### History List
- **entries**: Calculation Entry[] (최근순 정렬, 최대 10)
- **updatedAt**: string (목록 갱신 시각)
- **version**: number (스키마 변경 추적용)

## 제약 및 검증
- History List는 최대 10개를 초과하지 않는다.
- Calculation Entry는 lots 길이가 5를 넘지 않는다.
- id는 리스트 내에서 유일해야 한다.
- 삭제 시 해당 id 항목은 entries에서 제거되고 저장소에도 즉시 반영해야 한다.
- 화폐 코드는 환경 설정과 일치해야 한다(설정된 기본 통화).

## 상태 전이
- **Add**: 저장소 로드 → 새 Entry 유효성 검사 → entries에 삽입(최신 우선) → 10개 초과 시 가장 오래된 항목 제거 → 저장.
- **Delete**: id로 항목 조회 → entries에서 제거 → 저장 → UI 업데이트.
- **Load**: 저장소에서 entries 로드 → 스키마 버전 확인 → 유효하지 않으면 초기화 또는 마이그레이션 → UI 반영.
- **Replace/Update**: id로 항목 갱신 → lots/amount 검증 → updatedAt 갱신 → 저장.
