
```markdown
# Toss Design System (TDS) 주요 컴포넌트 상세 가이드

토스 디자인 시스템(TDS)은 토스 앱 전반에 사용하는 UI 컴포넌트 세트입니다. 아래에 각 주요 컴포넌트의 상세 명세와 사용법을 정리했습니다.

---

## 1. Button (버튼)

사용자가 어떤 액션을 트리거하거나 이벤트를 실행할 때 사용하는 기본 컴포넌트입니다. 폼 제출, 다이얼로그 열기, 작업 취소, 삭제 등 다양한 작업에 활용됩니다.

### 주요 속성 (Props)
- **type** (String, 선택): 버튼의 스타일 유형을 지정합니다. (예: `primary`, `secondary`)
- **variant** (String, 선택): 버튼 스타일의 강도나 형태를 지정합니다. (예: `strong`, `weak` – primary와 조합하여 사용)
- **size** (String, 선택): 버튼 크기 설정 (예: `large`, `medium`, `small`)
- **disabled** (Boolean, 선택): `true`이면 버튼을 비활성화합니다.
- **loading** (Boolean, 선택): `true`이면 버튼 내용 대신 로딩 스피너를 표시하고 사용자 입력을 막습니다.
- **onPress** (Function, 필수): 버튼 클릭(터치) 시 호출되는 핸들러 함수입니다. (웹 환경에서는 `onClick` 사용)

### 사용 예시
```jsx
<Button type="primary" variant="weak" size="large" onPress={handleSubmit} disabled={false}>
  확인
</Button>
```

> **주의사항:** 버튼에는 반드시 동작을 위한 이벤트 핸들러(`onPress`)를 지정하세요. 특히 `primary` 버튼은 중요한 액션에만 사용하고, 한 화면에 두 개 이상의 `primary` 버튼 사용은 지양하는 것이 좋습니다.

---

## 2. Icon Button (아이콘 버튼)

아이콘만으로 이루어진 버튼 컴포넌트입니다. 주로 간단한 동작(예: 닫기 X, 설정 ⚙️ 등)을 표시할 때 사용합니다. Button 컴포넌트의 변형으로, 아이콘을 자식으로 받고 동일한 인터랙션을 제공합니다.

### 주요 속성 (Props)
- Button과 거의 동일하며, 아이콘 관련 속성이 추가됩니다.
- **name** (String, 선택): 아이콘 이름.
- **src** (String, 선택): 이미지 소스 (아이콘 직접 지정 시).
- **size** (String, 선택): 버튼 크기를 조절하면 아이콘 크기도 함께 조절됩니다.
- **onPress**, **disabled** 등도 동일하게 적용됩니다.

### 사용 예시
```jsx
<IconButton name="close" onPress={onClose} size="medium" />
```

> **주의사항:** 아이콘 버튼은 시각적으로만 아이콘으로 표시되므로, 접근성 향상을 위해 아이콘의 의미를 대체할 수 있는 `aria-label`이나 대체 텍스트를 제공하는 것이 좋습니다.

---

## 3. Text Button (텍스트 버튼)

별도의 배경 없이 텍스트만으로 이루어진 버튼 스타일입니다. 화면에서 링크처럼 보이지만 실제로는 버튼 동작을 하며, 취소나 부가 액션 등 강조도가 낮은 액션에 사용합니다.

### 주요 속성 (Props)
- 기본 Button 속성과 동일하지만, `type`이나 `variant`에 따라 텍스트 색상만 변하고 배경은 투명합니다.
- 주로 `type="secondary"` 등으로 연한 색상의 텍스트 버튼을 만듭니다.
- **onPress** (필수), **disabled**, **loading** 등을 지원합니다.

### 사용 예시
```jsx
<TextButton onPress={goBack} disabled={false}>
  취소
</TextButton>
```

> **주의사항:** 배경이 없고 텍스트 형태이므로 주변 배경색과 대비를 충분히 주어야 하며, 클릭 가능한 요소임을 사용자에게 인지시킬 수 있도록 적절한 스타일(밑줄 또는 색상)을 사용합니다.

---

## 4. TextField (입력 필드)

한 줄짜리 텍스트 입력 컴포넌트입니다. 사용자의 텍스트 입력을 받는 기본 필드로, 폼이나 검색 입력 등에 사용됩니다.

### 주요 속성 (Props)
- **variant** (String, 선택): 입력 필드 스타일을 지정합니다. (예: `line` – 밑줄만 있는 스타일, `box` – 테두리 박스 등)
- **placeholder** (String, 선택): 입력란에 표시되는 안내 문구.
- **value** (String, 선택): 입력된 값 (제어 컴포넌트로 사용할 때).
- **defaultValue** (String, 선택): 초기 값 (비제어 컴포넌트로 사용할 때).
- **onChangeText** (Function, 선택): 텍스트 변경 시 호출되는 콜백. (웹 환경에서는 `onChange` 사용)
- **disabled** (Boolean, 선택): `true`이면 입력 불가 상태로 표시.
- **maxLength** (Number, 선택): 입력 가능한 최대 글자수 제한.

### 사용 예시
```jsx
<TextField variant="line" placeholder="이름을 입력하세요" value={name} onChangeText={setName} />
```

> **주의사항:** `value`와 `onChangeText`를 함께 사용하면 제어 컴포넌트로 동작하고, `defaultValue`만 사용하면 내부 상태로 비제어 컴포넌트로 동작합니다. 한 컴포넌트에서 두 방식을 혼용하지 않도록 주의하세요.

---

## 5. TextArea (멀티라인 입력)

여러 줄의 텍스트를 입력받을 수 있는 다중행 입력 컴포넌트입니다. 긴 본문이나 메모 입력에 사용합니다.

### 주요 속성 (Props)
- TextField와 거의 동일하며, 추가로 자동 높이 조절 등의 기능을 가질 수 있습니다.
- **rows** (Number, 선택): 기본 표시 행 개수.
- **maxLength**, **placeholder**, **disabled** 등 일반 속성을 지원합니다.

### 사용 예시
```jsx
<TextArea placeholder="내용을 입력하세요" rows={3} maxLength={500} />
```

> **주의사항:** TextArea는 기본적으로 내부 스크롤을 가질 수 있으므로, 컨테이너 높이를 제한하거나 `rows` 속성으로 초기 높이를 지정하는 것이 좋습니다.

---

## 6. SplitTextField (분할 입력 필드)

여러 개의 입력 칸으로 분할된 특수 텍스트 필드입니다. 보통 인증 코드 입력 등 고정 길이의 입력을 받을 때 사용합니다.

### 주요 속성 (Props)
- **length** (Number, 필수): 분할된 입력칸의 개수 (예: 6이면 한 글자 입력칸 6개).
- **value** (String, 선택): 전체 입력된 문자열 값. 각 칸에 한 글자씩 채워집니다.
- **onChangeText** (Function, 선택): 각 칸의 입력 변화 시 전체 값으로 콜백.
- **placeholder** (String, 선택): 모든 칸이 비었을 때 표시할 안내.

### 사용 예시
```jsx
<SplitTextField length={6} value={code} onChangeText={setCode} />
```

> **주의사항:** 일반적으로 숫자만 받는 용도로 사용된다면 키패드 타입을 숫자로 제한하는 등의 추가 설정을 해주세요 (예: 휴대폰 인증 코드 입력).

---

## 7. Checkbox (체크박스)

하나 이상의 항목을 선택할 때 사용하는 체크박스 컴포넌트입니다. 체크된 상태(✅)와 체크 해제 상태(◻️)를 가지며, 여러 개 항목을 동시에 선택 가능합니다.

### 주요 속성 (Props)
- **checked** (Boolean, 선택): 체크박스의 선택 상태를 제어할 때 사용합니다. `true`이면 체크된 상태를 표시합니다.
- **defaultChecked** (Boolean, 선택): 초기에 체크 상태를 설정하고, 이후 내부 상태로 관리할 때 사용합니다.
- **onCheckedChange** (Function, 선택): 체크 상태 변경 시 호출되는 함수입니다. (인자로 현재 상태 boolean을 받음)
- **disabled** (Boolean, 선택): `true`이면 체크박스를 비활성화하고, 클릭해도 상태가 변하지 않습니다.
- **size** (Number, 선택): 체크박스의 크기(px 단위)를 지정합니다.

**형태:**
- `<Checkbox.Circle />`: 동그라미 배경 안에 체크 표시
- `<Checkbox.Line />`: 체크 표시만 보이는 형태

### 사용 예시
```jsx
<Checkbox.Circle checked={checked} onCheckedChange={setChecked} />
<Checkbox.Line defaultChecked={true} disabled />
```

> **주의사항:** 여러 개의 체크박스를 그룹으로 사용할 때 개별적으로 상태를 관리할 수 있습니다. 모두 선택 기능 등을 구현하려면 상위에서 여러 체크박스의 상태를 종합적으로 관리하세요.

---

## 8. Switch (스위치 토글)

양자택일 상태 (ON/OFF)를 나타내는 토글 스위치입니다. 설정 화면 등에서 특정 옵션의 활성화/비활성화를 표시하고 제어할 때 사용합니다.

### 주요 속성 (Props)
- **checked** 또는 **value** (Boolean, 선택): 스위치의 현재 상태 (`on`이면 `true`).
- **onChange** (Function, 선택): 스위치를 토글할 때 호출되는 콜백, 새로운 상태(boolean)를 인자로 받습니다.
- **disabled** (Boolean, 선택): `true`이면 스위치를 비활성화하여 사용자가 변경할 수 없게 함.
- **label** (String, 선택): 스위치 옆에 표시할 레이블 텍스트.

### 사용 예시
```jsx
<Switch checked={isEnabled} onChange={setEnabled} />
```

> **주의사항:** 스위치는 즉시 상태가 변하는 토글이므로, 토글 시에 추가 확인 절차가 필요한 경우(중요한 설정 변경 등)에는 대신 확인 다이얼로그를 사용하는 것이 좋습니다.

---

## 9. Radio (라디오 버튼)

여러 옵션 중 하나만 선택할 수 있는 원형 라디오 버튼입니다. 일반적으로 라디오 버튼들은 그룹으로 묶어 사용하며, 한 그룹 내 하나의 옵션만 선택되도록 동작합니다.

### 주요 속성 (Props)
- **selected** (Boolean, 선택): 해당 라디오 옵션이 선택되었는지 나타냅니다.
- **onChange** (Function, 선택): 사용자가 이 옵션을 선택할 때 호출되는 콜백.
- **name** (String, 선택): 라디오 그룹 식별용 이름. 같은 `name`을 가진 Radio들은 그룹으로 간주되어 한 개만 선택 가능.
- **disabled** (Boolean, 선택): `true`이면 해당 옵션을 선택 불가 상태로 표시.

### 사용 예시
```jsx
<Radio name="gender" value="male" selected={gender === 'male'} onChange={() => setGender('male')}>
  남성
</Radio>
<Radio name="gender" value="female" selected={gender === 'female'} onChange={() => setGender('female')}>
  여성
</Radio>
```

> **주의사항:** Radio는 한 그룹 내에서 하나만 선택되므로, 여러 Radio를 사용할 땐 공통의 `name` 속성으로 그룹화해야 합니다. 선택 상태는 상위에서 관리하여 동시에 두 개가 선택되지 않도록 해주세요.

---

## 10. Segmented Control (세그먼트 컨트롤)

여러 옵션을 한 줄에 분할하여 버튼처럼 제공하는 토글 그룹입니다. 예를 들어 탭 스위치나 필터 전환 용도로 사용되며, 한 번에 하나의 세그먼트만 선택됩니다.

### 주요 속성 (Props)
- **options** (Array, 필수): 세그먼트에 표시할 옵션 목록. 문자열 배열이거나 `{ label, value }` 형태 배열로 전달할 수 있습니다.
- **selectedIndex** 또는 **value** (Number/String, 필수): 현재 선택된 세그먼트를 지정 (인덱스 또는 value로 관리).
- **onChange** (Function, 필수): 선택이 바뀔 때 호출되는 콜백. 선택된 값 또는 인덱스를 인자로 반환합니다.
- **disabled** (Boolean, 선택): `true`이면 전체 세그먼트 컨트롤을 비활성화.

### 사용 예시
```jsx
<SegmentedControl 
  options={['하루', '1주일', '1개월']} 
  selectedIndex={selectedIdx} 
  onChange={(idx) => setSelectedIdx(idx)} 
/>
```

> **주의사항:** 세그먼트가 너무 많으면 한 화면에 다 표시되지 않을 수 있으니, 3~4개 이하의 짧은 레이블로 구성하는 것이 좋습니다. 선택 상태를 명확히 나타낼 수 있도록 스타일을 지정합니다.

---

## 11. Slider (슬라이더)

손잡이를 드래그하여 연속적인 값 범위 중 하나의 값을 선택하게 하는 컴포넌트입니다. 볼륨 조절, 금액 범위 선택 등에 사용합니다.

### 주요 속성 (Props)
- **value** (Number, 필수): 현재 선택된 값.
- **min** (Number, 필수): 선택 가능한 최소값.
- **max** (Number, 필수): 선택 가능한 최대값.
- **step** (Number, 선택): 슬라이더 이동 한 단계당 증가하는 단위 값.
- **onValueChange** (Function, 선택): 값이 변경될 때 호출되는 콜백, 변경된 값(Number)을 인자로 받습니다.
- **disabled** (Boolean, 선택): `true`이면 슬라이더를 조작할 수 없게 비활성화합니다.

### 사용 예시
```jsx
<Slider min={0} max={100} step={1} value={volume} onValueChange={setVolume} />
```

> **주의사항:** 슬라이더의 현재 값에 대한 레이블 또는 수치 표시를 별도로 제공해 사용자가 정확한 값을 인지할 수 있게 해주세요.

---

## 12. Stepper (스테퍼)

숫자 값을 하나씩 증감하기 위한 `+`, `-` 버튼 형태의 컴포넌트입니다. 수량 입력 등에 사용합니다.

### 주요 속성 (Props)
- **value** (Number, 필수): 현재 값.
- **min** (Number, 선택): 최소값.
- **max** (Number, 선택): 최대값.
- **step** (Number, 선택): 한 번 클릭 시 증감 단위 (기본 1).
- **onChange** (Function, 필수): 값이 변경될 때 호출되는 콜백.
- **disabled** (Boolean 또는 Object, 선택): 비활성화 여부. `{ minus: true, plus: false }`처럼 개별 비활성화 가능.

### 사용 예시
```jsx
<Stepper value={count} min={0} max={10} onChange={(val) => setCount(val)} />
```

> **주의사항:** 최대/최소값에 도달하면 해당 방향 버튼을 자동으로 비활성화해주는 것이 일반적입니다. 너무 큰 step을 주지 않도록 유의하세요.

---

## 13. Numeric Spinner (숫자 스피너)

숫자 입력을 위해 사용되는 스피너 형태의 컴포넌트입니다. Stepper와 유사하지만 UI적으로 숫자가 회전하며 바뀌는 효과를 줄 수 있습니다.

### 주요 속성 (Props)
- **value** (Number, 필수): 현재 선택된 숫자 값.
- **min** (Number, 선택): 최소값.
- **max** (Number, 선택): 최대값.
- **onChange** (Function, 필수): 값 변경 시 호출되는 콜백.
- **disabled** (Boolean, 선택): 조작 불가 여부.

### 사용 예시
```jsx
<NumericSpinner value={rating} min={1} max={5} onChange={setRating} />
```

> **주의사항:** 모바일 환경에서는 숫자 스피너 사용 시 키패드를 열지 않고 선택할 수 있어 편리하지만, 사용자가 인지하기 쉽게 UI를 구성해야 합니다.

---

## 14. ListRow (리스트 행)

목록의 개별 항목을 나타내는 컨테이너 컴포넌트입니다. 설정 메뉴 항목 등 리스트 아이템을 구성할 때 사용됩니다.

### 주요 속성 (Props)
- **title** (String, 필수): 리스트 아이템의 주요 텍스트.
- **subtitle** (String, 선택): 부가 설명 텍스트 (제목 아래 작은 글씨).
- **leftIcon** (String or Element, 선택): 항목 왼쪽에 표시할 아이콘.
- **rightIcon** (String or Element, 선택): 항목 오른쪽에 표시할 아이콘 (예: 화살표).
- **onPress** (Function, 선택): 항목 전체를 탭했을 때 실행되는 함수.
- **disabled** (Boolean, 선택): 터치 상호작용 비활성화.

### 사용 예시
```jsx
<ListRow 
  title="알림 설정" 
  subtitle="푸시 알림 받기" 
  leftIcon="notification" 
  rightIcon="chevron-right" 
  onPress={openNotificationSettings} 
/>
```

> **주의사항:** 리스트 항목을 사용할 때 일관된 패딩과 폰트 스타일을 사용해 리스트의 일관성을 유지하세요.

---

## 15. ListHeader / ListFooter (리스트 헤더/푸터)

리스트 섹션의 헤더(제목) 또는 마지막 부분(설명)에 사용되는 컴포넌트입니다.

### 주요 속성 (Props)
- **ListHeader**
    - **title** (String, 필수): 섹션 제목이나 라벨.
    - **description** (String, 선택): 부가 설명 텍스트.
- **ListFooter**
    - 별도 속성 없이 섹션 사이의 여백이나 설명 텍스트를 넣는 용도로 사용됩니다.

### 사용 예시
```jsx
<ListHeader title="알림" description="알림 관련 설정" />
<ListRow ... />
<ListFooter><Text>기타 알림 설정은 프로필에서 관리합니다.</Text></ListFooter>
```

> **주의사항:** ListHeader의 텍스트는 너무 길지 않게 간결하게 작성합니다. ListFooter는 섹션의 끝을 구분해주는 역할이므로 필요하지 않은 경우 생략해도 됩니다.

---

## 16. Badge (배지)

작은 원이나 사각형 모양으로 숫자나 상태를 표시하는 컴포넌트입니다. 알림 개수, 신상 태그 등의 용도로 쓰입니다.

### 주요 속성 (Props)
- **text** (String or Number, 선택): 뱃지 안에 표시할 문자 또는 숫자.
- **color** (String, 선택): 배경 색상.
- **variant** (String, 선택): 배지 형태 (예: `dot`으로 설정하면 숫자 대신 작은 점만 표시).
- **size** (String or Number, 선택): 뱃지 크기.

### 사용 예시
```jsx
<Badge text={5} />
<Badge text="NEW" variant="dot" color="red" />
```

> **주의사항:** Badge는 너무 많은 글자를 담지 않도록 합니다. 보통 한두 글자나 숫자로 요약된 정보를 담는 용도로 사용하세요.

---

## 17. Tooltip (툴팁)

사용자가 어떤 UI 요소를 길게 누르거나 Hover(웹)할 때 나타나는 짧은 안내문구 박스입니다.

### 주요 속성 (Props)
- **content** (String or Element, 필수): 툴팁 안에 표시할 내용.
- **position** (String, 선택): 툴팁 표시 위치 (top, bottom, left, right).
- **visible** (Boolean, 선택): 툴팁을 강제로 보여줄지 여부.
- **onVisibleChange** (Function, 선택): 표시 상태 변경 콜백.

### 사용 예시
```jsx
<Tooltip content="여기에 추가 설명을 표시합니다" position="top">
  <IconButton name="help" />
</Tooltip>
```

> **주의사항:** 모바일에서는 Hover 개념이 없으므로 길게 누르기(long press) 등의 제스처로 툴팁을 노출시킵니다.

---

## 18. Toast (토스트 알림)

화면 하단 등에 잠시 나타났다 사라지는 짧은 알림 배너입니다. 간단한 피드백이나 메시지 전달에 사용됩니다.

### 주요 속성 (Props)
- **message** (String, 필수): 표시할 메시지 내용.
- **duration** (Number, 선택): 표시되는 시간 (ms).
- **type** (String, 선택): 유형에 따른 스타일 (success, error, info 등).
- **onClose** (Function, 선택): 사라질 때 호출되는 콜백.

### 사용 예시
```jsx
<Toast message="저장되었습니다" type="success" duration={2000} />
```

> **주의사항:** 토스트는 사용자 입력을 방해하지 않고 자동으로 사라져야 합니다. 중요한 정보 전달에는 토스트만 의존하지 마세요.

---

## 19. Modal (모달)

현재 화면 위에 겹쳐서 나타나는 팝업 레이어입니다. 배경을 어둡게 하고 사용자의 주의를 끌어야 할 때 사용합니다.

### 주요 속성 (Props)
- **open** (Boolean, 필수): 모달 표시 여부.
- **onClose** (Function, 선택): 모달을 닫을 때 호출되는 콜백.
- **children** (Node, 필수): 모달 내용.
- **closable** (Boolean, 선택): 배경 클릭 등으로 닫기 가능 여부.
- **title** (String, 선택): 상단 제목.
- **footer** (Node, 선택): 하단 액션 버튼 영역.

### 사용 예시
```jsx
<Modal open={open} onClose={() => setOpen(false)} title="안내">
  <p>내용을 입력하세요.</p>
  <Modal.Footer>
    <Button onPress={handleConfirm}>확인</Button>
  </Modal.Footer>
</Modal>
```

> **주의사항:** 반드시 닫을 수 있는 방법을 제공해야 하며, 한 화면에 여러 모달을 동시에 띄우지 않는 것이 좋습니다.

---

## 20. AlertDialog / ConfirmDialog (알림/확인 다이얼로그)

사용자 확인을 받기 위한 모달 팝업입니다.
- **AlertDialog**: 확인 버튼 하나 (정보 전달).
- **ConfirmDialog**: 확인/취소 버튼 두 개 (선택).

### 주요 속성 (Props)
- **open** (Boolean, 필수): 표시 여부.
- **title** (String, 필수): 제목.
- **description** (String, 선택): 설명.
- **confirmText** (String, 선택): 확인 버튼 텍스트.
- **cancelText** (String, 선택): 취소 버튼 텍스트 (ConfirmDialog용).
- **onConfirm** / **onCancel** (Function): 각 버튼 클릭 핸들러.
- **onClose** (Function): 다이얼로그 닫힘 핸들러.

### 사용 예시
```jsx
<ConfirmDialog 
  open={open} 
  title="삭제할까요?" 
  confirmText="삭제" 
  cancelText="취소" 
  onConfirm={handleDelete} 
  onClose={() => setOpen(false)} 
/>
```

> **주의사항:** 사용자의 흐름을 막으므로 남발하지 말고, 버튼 텍스트를 명확하게 작성하세요.

---

## 21. BottomSheet (바텀시트)

화면 하단에서 위로 슬라이드되어 나타나는 모달 패널입니다. 선택 옵션 리스트나 추가 상세 정보를 표시할 때 사용합니다.

### 주요 속성 (Props)
- **open** (Boolean, 필수): 표시 여부.
- **onClose** (Function, 선택): 닫힐 때 호출되는 함수.
- **children** (Node, 필수): 내부 콘텐츠.
- **title** (String, 선택): 상단 제목.
- **CTA** (Node, 선택): 고정된 하단 액션 영역 (`BottomSheet.CTA`).

### 사용 예시
```jsx
<BottomSheet.Root open={open} onClose={() => setOpen(false)} title="옵션 선택">
  <BottomSheet.Content>
    <p>바텀시트 내용</p>
  </BottomSheet.Content>
  <BottomSheet.CTA>
    <Button onPress={() => setOpen(false)}>닫기</Button>
  </BottomSheet.CTA>
</BottomSheet.Root>
```

> **주의사항:** 드래그 제스처로 닫을 수 있도록 지원하면 UX가 좋아집니다.

---

## 22. Navigation Bar (내비게이션 바)

페이지 최상단에 위치하며 현재 화면 제목과 뒤로 가기 버튼 등을 표시합니다.

### 주요 속성 (Props)
- **title** (String, 필수): 화면 제목.
- **onBack** (Function, 선택): 뒤로가기 버튼 핸들러.
- **actions** (Array, 선택): 우측 아이콘/버튼 배열 (예: `{ icon, onPress }`).
- **transparent** (Boolean, 선택): 배경 투명 여부.

### 사용 예시
```jsx
<NavigationBar title="설정" onBack={navigateBack} actions={[{ icon: 'close', onPress: closeModal }]} />
```

> **주의사항:** 제목이 너무 길면 잘릴 수 있으니 짧게 유지하고, 액션 아이콘은 너무 많이 두지 않는 것이 좋습니다.

---

## 23. Top (페이지 상단 레이아웃)

다양한 요소를 배치할 수 있는 페이지 상단 영역 컴포넌트입니다. 헤더나 타이틀 영역 구성에 활용됩니다.

### 주요 속성 (Props)
- **title** (String, 선택): 큰 제목.
- **subtitle** (String, 선택): 부제목.
- **left** (Node, 선택): 왼쪽 요소 (프로필 등).
- **right** (Node, 선택): 오른쪽 요소 (버튼 등).
- **backgroundColor** (String, 선택): 배경색.

### 사용 예시
```jsx
<Top 
  title="이벤트 안내" 
  subtitle="최신 소식" 
  right={<Button onPress={openAll}>전체 보기</Button>} 
/>
```

> **주의사항:** 스크롤되는 화면의 상단에 쓸 경우 상/하 여백을 고려해서 배치하세요.

---

## 24. Tab (탭)

한 화면에서 여러 카테고리로 콘텐츠를 구분할 때 사용하는 상단 탭입니다.

### 주요 속성 (Props)
- **tabs** (Array, 필수): 탭 이름 배열.
- **activeIndex** (Number, 필수): 현재 활성화된 탭 인덱스.
- **onChange** (Function, 필수): 탭 변경 시 호출되는 콜백.

### 사용 예시
```jsx
<Tab 
  tabs={['전체', '공지', '이벤트']} 
  activeIndex={activeTab} 
  onChange={(idx) => setActiveTab(idx)} 
/>
```

> **주의사항:** 현재 어떤 탭이 선택되었는지 시각적으로 잘 표시되도록 하고, 탭 전환 시 상태 관리에 유의하세요.

---

## 25. Tabbar (탭 바, 하단 내비게이션)

앱 하단에 고정되어 주요 화면 간 이동을 제공하는 탭형 내비게이션 바입니다.

### 주요 속성 (Props)
- **items** (Array, 필수): 항목 배열 (`{ icon, label, route }`).
- **activeIndex** (Number, 필수): 현재 활성화된 탭 인덱스.
- **onChange** (Function, 선택): 탭 변경 시 콜백.

### 사용 예시
```jsx
<Tabbar 
  items={[
    { icon: 'home', label: '홈' },
    { icon: 'search', label: '검색' }
  ]} 
  activeIndex={activeIdx} 
  onChange={(idx) => navigateTo(idx)} 
/>
```

> **주의사항:** 한 화면에 두 개 이상의 Tabbar를 사용하지 말고, 아이템 개수는 3~5개로 제한하세요.

---

## 26. Asset (에셋 표시)

아이콘, 이미지, 영상, Lottie 등을 일관된 스타일로 표시하는 컴포넌트입니다.

### 주요 속성 (Props)
- **frameShape** (Object, 선택): 프레임 크기와 모양 (`width`, `height`, `borderRadius`).
- **src** / **name** (String, 필수): 리소스 식별자.
- **alt** (String, 선택): 대체 텍스트.
- 하위 컴포넌트: `Asset.Icon`, `Asset.Image`, `Asset.Video`, `Asset.Lottie` 등.

### 사용 예시
```jsx
<Asset.Icon name="heart-line" color="green" />
<Asset.Image src="https://example.com/img.png" frameShape={{ width: 100, height: 100 }} />
```

> **주의사항:** 고용량 파일 사용 시 로딩 속도에 주의하고 적절한 크기의 파일을 사용하세요.

---

## 27. Loader (로더)

콘텐츠 로딩 중 표시하는 인디케이터(스피너)입니다.

### 주요 속성 (Props)
- **size** (String/Number, 선택): 크기 (`small`, `medium`, `large` 등).
- **color** (String, 선택): 색상.
- **type** (String, 선택): 모양 타입.

### 사용 예시
```jsx
<Loader size="large" color="#00C785" />
```

> **주의사항:** 로딩이 길어지면 "불러오는 중..." 같은 안내 문구를 함께 제공하는 것이 좋습니다.

---

## 28. Progress Bar (프로그레스 바)

진행 상황을 막대 형태로 보여주는 컴포넌트입니다.

### 주요 속성 (Props)
- **value** (Number, 필수): 현재 진행 값.
- **max** (Number, 선택): 최대 값 (기본 100).
- **color** (String, 선택): 진행 막대 색상.

### 사용 예시
```jsx
<ProgressBar value={75} max={100} color="#00C785" />
```

> **주의사항:** 값이 최대치를 넘지 않도록 하고, 0%나 100%일 때의 UI 처리도 신경 써야 합니다.

---

## 29. Progress Stepper (단계 진행 표시기)

여러 단계의 진행 상태를 점이나 선으로 표시합니다. (예: 1/3단계)

### 주요 속성 (Props)
- **steps** (Number, 필수): 전체 단계 수.
- **current** (Number, 필수): 현재 단계 인덱스.
- **description** (Boolean, 선택): 설명 표시 여부.

### 사용 예시
```jsx
<ProgressStepper steps={3} current={2} />
```

> **주의사항:** 단계가 너무 많으면(5단계 초과) 사용자에게 부담이 될 수 있으니 주의하세요.

---

## 30. Rating (별점 등급)

별 모양 아이콘으로 평점을 표시하거나 입력받습니다.

### 주요 속성 (Props)
- **value** (Number, 필수): 현재 값.
- **max** (Number, 선택): 최대 별 개수.
- **onChange** (Function, 선택): 값 변경 콜백.
- **readOnly** (Boolean, 선택): 입력 방지(표시 전용).

### 사용 예시
```jsx
<Rating value={4} max={5} onChange={setRating} />
```

> **주의사항:** 부분 점수(4.5점) 등을 표시할 경우 시각적 처리를 지원해야 하며, `readOnly` 시 맥락을 함께 제공하세요.

---

## 31. Menu (메뉴/드롭다운)

트리거를 누르면 나타나는 옵션 리스트 팝업입니다.

### 주요 속성 (Props)
- **open** (Boolean, 필수): 메뉴 펼침 여부.
- **items** (Array, 필수): 메뉴 항목 배열 (`{ label, onClick }`).
- **anchor** (Element, 필수): 기준이 되는 요소.
- **onClose** (Function, 선택): 닫힐 때 콜백.

### 사용 예시
```jsx
<Menu 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  items={[{ label: '편집', onClick: onEdit }, { label: '삭제', onClick: onDelete }]}
/>
```

> **주의사항:** 항목이 너무 많지 않게(5~7개 이내) 구성하고, 삭제 같은 중요 동작은 재확인을 거치도록 합니다.

---

## 32. BottomCTA (하단 CTA 영역)

화면 하단에 고정되어 한두 개의 **주요 버튼(Call To Action)**을 배치하는 영역입니다. 예를 들어 폼 입력 화면의 “다음” 버튼이나 장바구니 화면의 “결제하기” 버튼 등이 하단 고정 영역으로 쓰입니다.

### 주요 속성 (Props)
- **type** (String, 선택): CTA 스타일 유형 – 단일 버튼(`Single`), 이중 버튼(`Double`) 등 레이아웃을 결정합니다.
- **primaryAction** (Node, 필수): 메인 액션 버튼 컴포넌트 (예: `<Button>확인</Button>`).
- **secondaryAction** (Node, 선택): 두 번째 액션 버튼 (`Double` 타입일 때 사용, 예: `<Button variant="weak">취소</Button>`).
- **fixed** (Boolean, 선택): `true`이면 화면 하단에 고정되어 스크롤해도 항상 보입니다. `false`이면 콘텐츠 내부 배치. (기본 고정)
- **safeArea** (Boolean, 선택): 모바일 기기에서 하단 안전 영역(홈 인디케이터 영역) 만큼 여백을 넣을지 여부.

### 사용 예시
```jsx
<BottomCTA type="Single" primaryAction={<Button onPress={submit}>등록</Button>} />

{/* 또는 이중 버튼 사용 시 */}
<BottomCTA type="Double"
  primaryAction={<Button onPress={confirm}>확인</Button>}
  secondaryAction={<Button variant="weak" onPress={cancel}>취소</Button>}
/>
```

> **주의사항:** 항상 최하단에 위치하므로 다른 콘텐츠를 가리지 않도록 레이아웃을 설계하고, 중요도가 높은 액션을 강조하세요.
```