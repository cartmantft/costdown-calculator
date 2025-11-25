Toss Design System (TDS) 주요 컴포넌트 요약

토스 디자인 시스템(TDS)은 토스 앱 전반에 사용하는 UI 컴포넌트 세트로, Button, Input (TextField), Modal 등을 비롯한 다양한 컴포넌트를 제공합니다
tossmini-docs.toss.im
. 아래에 각 주요 컴포넌트의 이름, 간단한 설명, 주요 속성, 사용 예시, 사용 시 주의점을 정리했습니다.
Button (버튼)

사용자가 어떤 액션을 트리거하거나 이벤트를 실행할 때 사용하는 기본 컴포넌트예요
developers-apps-in-toss.toss.im
. 폼 제출, 다이얼로그 열기, 작업 취소, 삭제 등 다양한 작업에 활용됩니다.

주요 속성 (Props):

    type (String, 선택): 버튼의 스타일 유형을 지정해요 (예: "primary", "secondary" 등).

    variant (String, 선택): 버튼 스타일의 강도나 형태를 지정해요 (예: "strong", "weak" 등 – primary와 조합하여 사용)
    pyotato-dev.tistory.com
    .

    size (String, 선택): 버튼 크기 설정 (예: "large", "medium", "small").

    disabled (Boolean, 선택): true이면 버튼을 비활성화합니다
    pyotato-dev.tistory.com
    .

    loading (Boolean, 선택): true이면 버튼 내용 대신 로딩 스피너를 표시하고 사용자 입력을 막아요
    pyotato-dev.tistory.com
    .

    onPress (Function, 필수): 버튼 클릭(터치) 시 호출되는 핸들러 함수입니다 (웹 환경에서는 onClick 사용).

사용 예시:

<Button type="primary" variant="weak" size="large" onPress={handleSubmit} disabled={false}>
  확인
</Button>

주의사항: 버튼에는 반드시 동작을 위한 이벤트 핸들러(onPress)를 지정하세요. 특히 primary 버튼은 중요한 액션에만 사용하고, 한 화면에 두 개 이상의 primary 버튼 사용은 지양하는 것이 좋아요 (중복되는 스타일 사용 주의).
Icon Button (아이콘 버튼)

아이콘만으로 이루어진 버튼 컴포넌트예요. 주로 간단한 동작 (예: 닫기 X, 설정 ⚙️ 등)을 표시할 때 사용합니다. Button 컴포넌트의 변형으로, 아이콘을 자식으로 받고 동일한 인터랙션을 제공합니다.

주요 속성: Button과 거의 동일합니다. 추가로 아이콘 관련 속성으로 name (아이콘 이름)이나 src (이미지 소스, 아이콘 직접 지정 시) 등을 사용할 수 있어요.

    size로 버튼 크기를 조절하면 아이콘 크기도 함께 조절됩니다.

    onPress, disabled 등도 동일하게 적용됩니다.

사용 예시:

<IconButton name="close" onPress={onClose} size="medium" />

(예: name="close"는 닫기 아이콘을 표시)

주의사항: 아이콘 버튼은 시각적으로만 아이콘으로 표시되므로, 접근성 향상을 위해 아이콘의 의미를 대체할 수 있는 aria-label이나 대체 텍스트를 제공하는 것이 좋습니다.
Text Button (텍스트 버튼)

별도의 배경 없이 텍스트만으로 이루어진 버튼 스타일을 말해요. 화면에서 링크처럼 보이지만 실제로는 버튼 동작을 하며, 취소나 부가 액션 등 강조도가 낮은 액션에 사용합니다.

주요 속성: 기본 Button 속성과 동일하지만, type이나 variant에 따라 텍스트 색상만 변하고 배경은 투명합니다. 주로 type="secondary" 등으로 연한 색상의 텍스트 버튼을 만듭니다.

    onPress (필수), disabled, loading 등을 지원합니다.

사용 예시:

<TextButton onPress={goBack} disabled={false}>
  취소
</TextButton>

주의사항: 배경이 없고 텍스트 형태이므로 주변 배경색과 대비를 충분히 주어야 하며, 클릭 가능한 요소임을 사용자에게 인지시킬 수 있도록 적절한 스타일(밑줄 또는 색상)을 사용합니다.
TextField (입력 필드)

한 줄짜리 텍스트 입력 컴포넌트입니다. 사용자의 텍스트 입력을 받는 기본 필드로, 폼이나 검색 입력 등에 사용돼요.

주요 속성 (Props):

    variant (String, 선택): 입력 필드 스타일을 지정 (예: "line" – 밑줄만 있는 스타일
    techchat-apps-in-toss.toss.im
    , "box" – 테두리 박스 등).

    placeholder (String, 선택): 입력란에 표시되는 안내 문구.

    value (String, 선택): 입력된 값 (제어 컴포넌트로 사용할 때).

    defaultValue (String, 선택): 초기 값 (비제어 컴포넌트로 사용할 때).

    onChangeText (Function, 선택): 텍스트 변경 시 호출되는 콜백. (웹 환경에서는 onChange 사용)

    disabled (Boolean, 선택): true이면 입력 불가 상태로 표시.

    maxLength (Number, 선택): 입력 가능한 최대 글자수 제한.

사용 예시:

<TextField variant="line" placeholder="이름을 입력하세요" value={name} onChangeText={setName} />

주의사항: value와 onChangeText를 함께 사용하면 제어 컴포넌트로 동작하고, defaultValue만 사용하면 내부 상태로 비제어 컴포넌트로 동작합니다. 한 컴포넌트에서 두 방식을 혼용하지 않도록 주의하세요.
TextArea (멀티라인 입력)

여러 줄의 텍스트를 입력받을 수 있는 다중행 입력 컴포넌트입니다. 긴 본문이나 메모 입력에 사용합니다.

주요 속성: TextField와 거의 동일하며, 추가로 자동 높이 조절 등의 기능을 가질 수 있어요.

    rows (Number, 선택): 기본 표시 행 개수.

    maxLength, placeholder, disabled 등 일반 속성을 지원합니다.

사용 예시:

<TextArea placeholder="내용을 입력하세요" rows={3} maxLength={500} />

주의사항: TextArea는 기본적으로 내부 스크롤을 가질 수 있으므로, 컨테이너 높이를 제한하거나 rows 속성으로 초기 높이를 지정하는 것이 좋습니다.
SplitTextField (분할 입력 필드)

여러 개의 입력 칸으로 분할된 특수 텍스트 필드입니다. 보통 인증 코드 입력 등 고정 길이의 입력을 받을 때 사용합니다.

주요 속성:

    length (Number, 필수): 분할된 입력칸의 개수 (예: 6이면 한 글자 입력칸 6개).

    value (String, 선택): 전체 입력된 문자열 값. 각 칸에 한 글자씩 채워집니다.

    onChangeText (Function, 선택): 각 칸의 입력 변화 시 전체 값으로 콜백.

    placeholder (String, 선택): 모든 칸이 비었을 때 표시할 안내 (보통 띄지 않거나 첫 칸에만 적용).

사용 예시:

<SplitTextField length={6} value={code} onChangeText={setCode} />

주의사항: 일반적으로 숫자만 받는 용도로 사용된다면 키패드 타입을 숫자로 제한하는 등의 추가 설정을 해주세요 (예: 휴대폰 인증 코드 입력).
Checkbox (체크박스)

하나 이상의 항목을 선택할 때 사용하는 체크박스 컴포넌트입니다. 체크된 상태(✅)와 체크 해제 상태(◻️)를 가지며, 여러 개 항목을 동시에 선택 가능해요
tossmini-docs.toss.im
.

주요 속성 (Props):

    checked (Boolean, 선택): 체크박스의 선택 상태를 제어할 때 사용합니다. true이면 체크된 상태를 표시해요
    tossmini-docs.toss.im
    .

    defaultChecked (Boolean, 선택): 초기에 체크 상태를 설정하고, 이후 내부 상태로 관리할 때 사용합니다.

    onCheckedChange (Function, 선택): 체크 상태 변경 시 호출되는 함수입니다 (인자로 현재 상태 boolean을 받음)
    tossmini-docs.toss.im
    .

    disabled (Boolean, 선택): true이면 체크박스를 비활성화하고, 클릭해도 상태가 변하지 않아요
    tossmini-docs.toss.im
    .

    size (Number, 선택): 체크박스의 크기(px 단위)를 지정합니다 (기본값 예: 24px)
    tossmini-docs.toss.im
    .

또한 두 가지 표현 형태를 제공하는데: <Checkbox.Circle /> (동그라미 배경 안에 체크 표시)와 <Checkbox.Line /> (체크 표시만 보이는 형태)가 있어요
tossmini-docs.toss.im
.

사용 예시:

<Checkbox.Circle checked={checked} onCheckedChange={setChecked} />
<Checkbox.Line defaultChecked={true} disabled />

주의사항: 여러 개의 체크박스를 그룹으로 사용할 때 개별적으로 상태를 관리할 수 있습니다. 모두 선택 기능 등을 구현하려면 상위에서 여러 체크박스의 상태를 종합적으로 관리하세요.
Switch (스위치 토글)

양자택일 상태 (ON/OFF)를 나타내는 토글 스위치입니다. 설정 화면 등에서 특정 옵션의 활성화/비활성화를 표시하고 제어할 때 사용해요.

주요 속성:

    checked 또는 value (Boolean, 선택): 스위치의 현재 상태 (on이면 true).

    onChange (Function, 선택): 스위치를 토글할 때 호출되는 콜백, 새로운 상태(boolean)를 인자로 받습니다.

    disabled (Boolean, 선택): true이면 스위치를 비활성화하여 사용자가 변경할 수 없게 함.

    label (String, 선택): 스위치 옆에 표시할 레이블 텍스트 (필요한 경우).

사용 예시:

<Switch checked={isEnabled} onChange={setEnabled} />

주의사항: 스위치는 즉시 상태가 변하는 토글이므로 토글 시에 추가 확인 절차가 필요한 경우(중요한 설정 변경 등)에는 대신 확인 다이얼로그를 사용하는 것이 좋습니다.
Radio (라디오 버튼)

여러 옵션 중 하나만 선택할 수 있는 원형 라디오 버튼입니다. 일반적으로 라디오 버튼들은 그룹으로 묶어 사용하며, 한 그룹 내 하나의 옵션만 선택되도록 동작합니다.

주요 속성:

    selected (Boolean, 선택): 해당 라디오 옵션이 선택되었는지 나타냅니다.

    onChange (Function, 선택): 사용자가 이 옵션을 선택할 때 호출되는 콜백.

    name (String, 선택): 라디오 그룹 식별용 이름. 같은 name을 가진 Radio들은 그룹으로 간주되어 한 개만 선택 가능.

    disabled (Boolean, 선택): true이면 해당 옵션을 선택 불가 상태로 표시.

사용 예시:

<Radio name="gender" value="male" selected={gender === 'male'} onChange={() => setGender('male')}>
  남성
</Radio>
<Radio name="gender" value="female" selected={gender === 'female'} onChange={() => setGender('female')}>
  여성
</Radio>

주의사항: Radio는 한 그룹 내에서 하나만 선택되므로, 여러 Radio를 사용할 땐 공통의 name 속성으로 그룹화해야 합니다. 선택 상태는 상위에서 관리하여 동시에 두 개가 선택되지 않도록 해주세요.
Segmented Control (세그먼트 컨트롤)

여러 옵션을 한 줄에 분할하여 버튼처럼 제공하는 토글 그룹입니다. 예를 들어 탭 스위치나 필터 전환 용도로 사용되며, 한 번에 하나의 세그먼트만 선택됩니다 (라디오 버튼 그룹의 시각적 변형이라고 볼 수 있어요).

주요 속성:

    options (Array<String> 또는 Array<Object>, 필수): 세그먼트에 표시할 옵션 목록. 문자열 배열이거나 { label, value } 형태 배열로 전달할 수 있습니다.

    selectedIndex 또는 value (Number/String, 필수): 현재 선택된 세그먼트를 지정 (인덱스 또는 value로 관리).

    onChange (Function, 필수): 선택이 바뀔 때 호출되는 콜백. 선택된 값 또는 인덱스를 인자로 반환합니다.

    disabled (Boolean, 선택): true이면 전체 세그먼트 컨트롤을 비활성화.

사용 예시:

<SegmentedControl 
  options={['하루', '1주일', '1개월']} 
  selectedIndex={selectedIdx} 
  onChange={(idx) => setSelectedIdx(idx)} 
/>

주의사항: 세그먼트가 너무 많으면 한 화면에 다 표시되지 않을 수 있으니, 3~4개 이하의 짧은 레이블로 구성하는 것이 좋습니다. 또한 선택 상태를 명확히 나타낼 수 있도록 스타일(선택된 세그먼트의 배경색 등)을 지정합니다.
Slider (슬라이더)

손잡이를 드래그하여 연속적인 값 범위 중 하나의 값을 선택하게 하는 컴포넌트입니다. 예를 들어 볼륨 조절, 금액 범위 선택 등에 사용합니다.

주요 속성:

    value (Number, 필수): 현재 선택된 값.

    min (Number, 필수): 선택 가능한 최소값.

    max (Number, 필수): 선택 가능한 최대값.

    step (Number, 선택): 슬라이더 이동 한 단계당 증가하는 단위 값 (지정하지 않으면 연속적인 값).

    onValueChange (Function, 선택): 값이 변경될 때 호출되는 콜백, 변경된 값(Number)을 인자로 받습니다.

    disabled (Boolean, 선택): true이면 슬라이더를 조작할 수 없게 비활성화합니다.

사용 예시:

<Slider min={0} max={100} step={1} value={volume} onValueChange={setVolume} />

주의사항: 슬라이더의 현재 값에 대한 레이블 또는 수치 표시를 별도로 제공해 사용자가 정확한 값을 인지할 수 있게 해주세요 (예: 현재 선택된 값 표시).
Stepper (스테퍼)

숫자 값을 하나씩 증감하기 위한 +- 버튼 형태의 컴포넌트예요. 수량 입력 등에 사용하며, 좌우(또는 상하) 두 개의 버튼으로 구성되어 값을 증가 또는 감소시킵니다.

주요 속성:

    value (Number, 필수): 현재 값.

    min (Number, 선택): 최소값 (이 값까지 감소 가능).

    max (Number, 선택): 최대값 (이 값까지 증가 가능).

    step (Number, 선택): 한 번 클릭 시 증감 단위 (기본 1).

    onChange (Function, 필수): 값이 변경될 때 호출되는 콜백, 변경된 값(Number)을 인자로 받습니다.

    disabled (Boolean 또는 Object, 선택): 비활성화 여부. 값이 객체인 경우 { minus: true, plus: false }처럼 개별 버튼을 비활성화할 수 있습니다.

사용 예시:

<Stepper value={count} min={0} max={10} onChange={(val) => setCount(val)} />

주의사항: 최대/최소값에 도달하면 해당 방향 버튼을 자동으로 비활성화해주는 것이 일반적입니다. 사용자가 단계별로 값을 조절하는 경우가 많은 만큼, 너무 큰 step을 주지 않도록 유의하세요.
Numeric Spinner (숫자 스피너)

숫자 입력을 위해 사용되는 스피너 형태의 컴포넌트입니다. 별도의 키패드나 드롭다운 형태로 숫자를 선택하게 할 수도 있고, Stepper와 유사하지만 UI적으로 숫자가 회전하며 바뀌는 효과를 줄 수도 있어요.

주요 속성:

    value (Number, 필수): 현재 선택된 숫자 값.

    min (Number, 선택): 최소값.

    max (Number, 선택): 최대값.

    onChange (Function, 필수): 값 변경 시 호출되는 콜백.

    disabled (Boolean, 선택): true이면 조작 불가.

사용 예시:

<NumericSpinner value={rating} min={1} max={5} onChange={setRating} />

주의사항: 모바일 환경에서는 숫자 스피너 사용 시 키패드를 열지 않고 선택할 수 있어 편리하지만, 사용자가 인지하기 쉽게 UI를 구성해야 합니다. 값이 변경될 때 변하는 숫자가 충분히 눈에 띄도록 디자인합니다.
ListRow (리스트 행)

목록의 개별 항목을 나타내는 컨테이너 컴포넌트예요. 토스 앱의 설정 메뉴 항목 등 리스트 아이템을 구성할 때 사용됩니다
toss.oopy.io
. 좌측 아이콘/텍스트, 중앙 제목, 우측 표시 또는 아이콘 등 여러 영역으로 구성될 수 있습니다.

주요 속성:

    title (String, 필수): 리스트 아이템의 주요 텍스트.

    subtitle (String, 선택): 부가 설명 텍스트 (있다면 제목 아래 작은 글씨로 표시).

    leftIcon (String or Element, 선택): 항목 왼쪽에 표시할 아이콘 또는 이미지.

    rightIcon (String or Element, 선택): 항목 오른쪽에 표시할 아이콘 (예: 화살표, 토글 등).

    onPress (Function, 선택): 항목 전체를 탭했을 때 실행되는 함수.

    disabled (Boolean, 선택): true이면 터치 상호작용을 비활성화하고 흐릿하게 표시.

사용 예시:

<ListRow 
  title="알림 설정" 
  subtitle="푸시 알림 받기" 
  leftIcon="notification" 
  rightIcon="chevron-right" 
  onPress={openNotificationSettings} 
/>

주의사항: 리스트 항목을 사용할 때 일관된 패딩과 폰트 스타일을 사용해 리스트의 일관성을 유지하세요. 필요에 따라 ListHeader나 ListFooter 컴포넌트를 함께 사용해 구분선 또는 섹션 제목을 추가할 수 있습니다.
ListHeader / ListFooter (리스트 헤더/푸터)

리스트 섹션의 헤더 또는 마지막 부분에 사용되는 컴포넌트입니다. 예를 들어 설정 화면에서 섹션별 제목이나 설명을 보여주는 데 사용될 수 있어요.

주요 속성 (ListHeader):

    title (String, 필수): 섹션 제목이나 라벨.

    description (String, 선택): 부가 설명이 필요한 경우 추가 텍스트.

주요 속성 (ListFooter):

    주로 별도 속성 없이, 섹션 사이의 여백이나 설명 텍스트를 넣는 용도로 사용됩니다. (예: "마케팅 정보 수신 동의 설정은 ..." 등의 안내 문구)

사용 예시:

<ListHeader title="알림" description="알림 관련 설정" />
<ListRow ... />
<ListRow ... />
<ListFooter><Text style={{ color: '#888' }}>기타 알림 설정은 프로필에서 관리합니다.</Text></ListFooter>

주의사항: ListHeader의 텍스트는 보통 상단 여백과 함께 표시되어 섹션을 구분하니, 너무 길지 않게 간결하게 작성합니다. ListFooter는 섹션의 끝을 구분해주는 역할이므로 필요하지 않은 경우 생략해도 됩니다.
Badge (배지)

작은 원이나 사각형 모양으로 숫자나 상태를 표시하는 컴포넌트예요. 항목의 상태를 빠르게 인식하도록 강조할 때 사용합니다
developers-apps-in-toss.toss.im
. 예를 들어 알림 개수, 신상 태그 등의 용도로 쓰입니다.

주요 속성:

    text (String or Number, 선택): 뱃지 안에 표시할 문자 또는 숫자. (예: "New", 3 등)

    color (String, 선택): 배경 색상 (디폴트는 강조색 또는 상태에 따라 자동 지정).

    textColor (String, 선택): 글자 색상 (필요한 경우 지정, 기본은 배경과 가시성 좋게 자동 결정).

    size (String or Number, 선택): 뱃지 크기 (소/중/대 등의 프리셋 또는 직접 px 지정).

    variant (String, 선택): 배지 형태 (예: "dot"으로 설정하면 숫자 대신 작은 점만 표시하는 형태 등).

사용 예시:

<Badge text={5} />            {/* 숫자 5 표시 */}
<Badge text="NEW" variant="dot" color="red" />  {/* 'NEW' 텍스트 또는 점 형태 뱃지 */}

주의사항: Badge는 너무 많은 글자를 담지 않도록 합니다. 보통 한두 글자나 숫자로 요약된 정보를 담는 용도로 쓰세요. 또한 배지만으로 의미를 이해하기 어려운 경우 툴팁 등 추가 설명을 제공하는 것이 좋습니다.
Tooltip (툴팁)

사용자가 어떤 UI 요소를 길게 누르거나 Hover(웹)할 때 나타나는 짧은 안내문구 박스입니다. 아이콘이나 텍스트의 의미를 보충 설명할 때 사용합니다.

주요 속성:

    content (String or Element, 필수): 툴팁 안에 표시할 내용 (문구 등).

    position (String, 선택): 툴팁 표시 위치 (예: "top", "bottom", "left", "right" – 대상 요소 대비).

    visible (Boolean, 선택): 툴팁을 강제로 보여줄지 여부 (제어가 필요한 경우).

    onVisibleChange (Function, 선택): 툴팁 표시 상태가 변경될 때 호출되는 콜백.

사용 예시:

<Tooltip content="여기에 추가 설명을 표시합니다" position="top">
  <IconButton name="help" />
</Tooltip>

(아이콘 버튼에 마우스를 올리면 또는 길게 누르면 "여기에 추가 설명을 표시합니다"라는 툴팁 표시)

주의사항: 모바일에서는 Hover 개념이 없으므로 길게 누르기(long press) 등의 제스처로 툴팁을 노출시킵니다. 너무 긴 설명은 툴팁보다 별도의 도움말 페이지로 연결하는 것이 나아요.
Toast (토스트 알림)

화면 하단 등에 잠시 나타났다 사라지는 짧은 알림 배너입니다. 사용자에게 간단한 피드백이나 메시지를 전달하는 데 사용돼요 (예: "복사되었습니다", "네트워크 오류" 등).

주요 속성:

    message (String, 필수): 표시할 메시지 내용.

    duration (Number, 선택): 토스트가 표시되는 시간 (밀리초, 기본값 예: 3000ms).

    type (String, 선택): 토스트의 유형에 따른 스타일 (예: "success", "error", "info" 등 – 색상이나 아이콘 변화).

    onClose (Function, 선택): 토스트 표시 시간이 끝나고 사라질 때 호출되는 콜백.

사용 예시:

<Toast message="저장되었습니다" type="success" duration={2000} />

(2초간 "저장되었습니다" 성공 토스트를 표시)

주의사항: 토스트는 사용자 입력을 방해하지 않고 자동으로 사라져야 합니다. 너무 자주 또는 길게 표시하지 않도록 하고, 중요한 정보 전달에는 토스트만 의존하지 말고 적절한 다른 UI와 함께 사용하세요.
Modal (모달)

현재 화면 위에 겹쳐서 나타나는 팝업 레이어 컴포넌트입니다. 배경을 어둡게 하고 사용자의 주의를 끌어야 할 때 사용해요. 모달이 나타나면 보통 뒤의 화면은 상호작용이 불가능하며, 모달에서 확인이나 취소 등의 액션을 받아야 합니다.

주요 속성:

    open (Boolean, 필수): 모달이 열려 있는지 여부
    techchat-apps-in-toss.toss.im
    . true일 때 모달이 표시되고, false일 때 숨겨집니다.

    onClose (Function, 선택): 모달을 닫을 때 호출되는 콜백. 보통 모달 내부의 닫기 버튼이나 배경 클릭 시 이 함수를 호출하여 부모에서 open 상태를 false로 바꿉니다.

    children (Node, 필수): 모달 안에 표시할 콘텐츠 요소들.

    closable (Boolean, 선택): 모달 밖을 클릭하거나 취소 버튼으로 모달을 닫을 수 있는지 여부 (기본 true).

    title (String, 선택): 모달 창 상단에 표시될 제목 (모달 콘텐츠에 제목이 있을 경우 사용).

    footer (Node, 선택): 모달 하단에 들어갈 액션 버튼들 (확인/취소 버튼 등). 지정하지 않으면 기본 버튼 레이아웃을 사용할 수 있습니다.

사용 예시:

<Modal open={open} onClose={() => setOpen(false)} title="안내">
  <p>여기 모달 콘텐츠를 넣으세요.</p>
  <Modal.Footer>
    <Button onPress={handleConfirm}>확인</Button>
  </Modal.Footer>
</Modal>

주의사항: 모달을 띄우면 반드시 닫을 수 있는 방법을 제공해야 합니다. 확인/취소 버튼 중 하나는 모달을 닫도록 하고, ESC 키 또는 배경 탭으로 닫히는 기능(closable)을 적절히 설정하세요. 또한 한 화면에 여러 모달을 동시에 띄우지 않는 것이 좋습니다.
AlertDialog / ConfirmDialog (알림/확인 다이얼로그)

모달의 한 형태로, 사용자 확인을 받기 위한 팝업 창입니다. AlertDialog는 주로 확인 버튼 하나만 있고 정보 전달용으로 쓰이고, ConfirmDialog는 확인 및 취소 버튼 두 개를 제공하여 사용자의 확인/취소 선택을 받아요.

주요 속성 (공통):

    open (Boolean, 필수): 다이얼로그의 표시 여부.

    title (String, 필수): 다이얼로그 제목 (짧은 질문이나 경고 문구).

    description (String, 선택): 추가 설명이나 안내 문구.

    confirmText (String, 선택): 확인 버튼 텍스트 (기본값 예: "확인").

    cancelText (String, 선택): 취소 버튼 텍스트 (ConfirmDialog의 경우, 기본값 예: "취소").

    onConfirm (Function, 선택): 확인 버튼 클릭 시 실행되는 함수.

    onCancel (Function, 선택): 취소 버튼 클릭 시 실행되는 함수 (ConfirmDialog에서만 의미 있음).

    onClose (Function, 선택): 다이얼로그가 닫힐 때 호출되는 콜백 (취소/확인 모두 해당).

사용 예시:

<AlertDialog open={open} title="업데이트 확인" description="새 버전이 있습니다." 
            confirmText="업데이트" onConfirm={doUpdate} onClose={() => setOpen(false)} />

<ConfirmDialog open={open} title="삭제할까요?" description="이 작업은 되돌릴 수 없습니다." 
              confirmText="삭제" cancelText="취소" 
              onConfirm={handleDelete} onCancel={() => setOpen(false)} />

주의사항: Alert/Confirm 다이얼로그는 사용자의 흐름을 막고 반드시 응답을 요구하는 컴포넌트이므로, 너무 자주 남발하지 않도록 합니다. 또한 사용자가 내용을 읽고 이해하기 쉽도록 제목과 버튼 텍스트를 명확히 작성하세요 (예: "네/아니오" 대신 "삭제/취소" 같이 구체적으로).
BottomSheet (바텀시트)

화면 하단에서 위로 슬라이드되어 나타나는 모달 패널입니다. 선택 옵션 리스트나 추가 상세 정보를 표시할 때 많이 사용돼요. 화면 일부만 덮기 때문에 사용자가 컨텍스트를 유지하면서도 추가 내용을 볼 수 있습니다
toss.oopy.io
.

주요 속성:

    open (Boolean, 필수): 바텀시트 표시 여부 (true일 때 화면 밑에서 올라옴).

    onClose (Function, 선택): 바텀시트가 닫힐 때 호출되는 함수.

    children (Node, 필수): 바텀시트 안에 들어갈 콘텐츠.

    title (String, 선택): 바텀시트 상단에 표시할 제목 (있을 경우 헤더 영역에 나타남).

    CTA (Node, 선택): 고정된 하단 액션 영역. 예를 들어 확인 버튼 등을 <BottomSheet.CTA>...</BottomSheet.CTA> 형태로 지정할 수 있어요
    techchat-apps-in-toss.toss.im
    .

사용 예시:

<BottomSheet.Root open={open} onClose={() => setOpen(false)} title="옵션 선택">
  <BottomSheet.Content>
    {/* 원하는 내용 또는 리스트 */}
    <p>여기에 바텀시트 내용을 넣습니다.</p>
  </BottomSheet.Content>
  <BottomSheet.CTA>
    <Button onPress={() => setOpen(false)}>닫기</Button>
  </BottomSheet.CTA>
</BottomSheet.Root>

주의사항: 바텀시트가 열린 상태에서는 화면의 일부만 가려지지만, 사용자가 다른 부분을 터치하면 닫히도록 하여 모달로서의 역할을 유지해야 합니다. 또한 드래그 제스처로 바텀시트를 닫을 수 있도록 지원하면 UX가 더 좋아집니다.
Navigation Bar (내비게이션 바)

페이지 최상단에 위치하며 현재 화면의 제목과 뒤로 가기 버튼 등을 표시하는 상단 바 컴포넌트입니다. Toss 앱 내에서 미니앱 화면을 표시할 때 상단의 헤더로 사용됩니다.

주요 속성:

    title (String, 필수): 내비게이션 바 중앙에 표시되는 화면 제목.

    onBack (Function, 선택): 좌측 뒤로가기 버튼 눌렀을 때 호출되는 함수. 지정하지 않으면 기본적으로 이전 화면으로 돌아갑니다.

    actions (Array<Object>, 선택): 우측에 표시할 액션 아이콘 또는 버튼들. 예: 검색 버튼, 닫기 버튼 등. 각 객체는 { icon: 'search', onPress: handleSearch } 등의 형식.

    transparent (Boolean, 선택): true이면 배경을 투명하게 하여 컨텐츠 위에 겹쳐 보이게 함 (스크롤에 따라 배경 적용 등 특수 효과용).

사용 예시:

<NavigationBar title="설정" onBack={() => navigateBack()} 
              actions={[{ icon: 'close', onPress: closeModal }]} />

주의사항: NavigationBar의 제목은 현재 화면을 명확히 나타내도록 해야 합니다. 너무 길 경우 잘리거나 줄바꿈될 수 있으니 짧게 유지하세요. 또한 액션 아이콘은 2개 이상 너무 많이 두지 않는 것이 좋습니다.
Top (페이지 상단 레이아웃)

다양한 레이아웃을 지원하는 페이지 상단 영역 컴포넌트로, 여러 요소(텍스트, 버튼, 이미지 등)를 쉽게 배치할 수 있어요
developers-apps-in-toss.toss.im
. 보통 화면의 헤더나 타이틀 영역을 구성하는 데 활용됩니다.

주요 속성:

    title (String, 선택): 큰 제목 텍스트.

    subtitle (String, 선택): 부제목 텍스트 (있다면 제목 아래에 작게 표시).

    left (Node, 선택): 왼쪽에 배치될 요소 (예: 프로필 이미지, 아이콘).

    right (Node, 선택): 오른쪽에 배치될 요소 (예: 설정 버튼, 전체보기 버튼 등).

    backgroundColor (String, 선택): 상단 영역 배경색 (기본값은 투명 혹은 테마에 따라 다름).

사용 예시:

<Top 
  title="이벤트 안내" 
  subtitle="최신 이벤트 소식" 
  right={<Button onPress={openAll}>전체 보기</Button>} 
/>

주의사항: Top 컴포넌트는 개별 화면의 최상단에 배치되어야 하며, 보통 ScrollView 등의 상위에 고정되어 있지는 않습니다. 스크롤되는 화면의 상단에 쓸 경우 상/하 여백 등을 고려해서 배치하세요.
Tab (탭)

한 화면에서 여러 탭(카테고리)으로 콘텐츠를 구분할 때 사용하는 컴포넌트입니다. 상단에 탭 버튼들을 나열하고, 선택된 탭에 따라 다른 내용이 표시됩니다.

주요 속성:

    tabs (Array<String>, 필수): 탭 항목 이름들의 배열.

    activeIndex (Number, 필수): 현재 활성화된 탭 인덱스.

    onChange (Function, 필수): 탭을 누를 때 호출되는 콜백, 선택된 탭 인덱스를 인자로 전달.

    style (Object, 선택): 탭 바의 추가 스타일 커스터마이즈가 필요한 경우.

사용 예시:

<Tab 
  tabs={['전체', '공지', '이벤트']} 
  activeIndex={activeTab} 
  onChange={(idx) => setActiveTab(idx)} 
/>

주의사항: 탭을 사용할 때 각 탭에 대응되는 콘텐츠 영역을 구현해야 합니다. 탭 간 화면 전환은 상태 저장이 필요한 경우가 많으므로, 상태 관리에 유의하고, 현재 어떤 탭이 선택되었는지 시각적으로 잘 표시되도록 합니다.
Tabbar (탭 바, 하단 내비게이션)

앱 하단에 고정되어 주요 화면 간 이동을 제공하는 탭형 내비게이션 바입니다. 아이콘과 레이블로 이루어진 버튼들을 가로로 나열하며, 토스 앱 메인 화면의 하단 메뉴처럼 사용됩니다.

주요 속성:

    items (Array<Object>, 필수): 탭바 항목 배열. 각 항목은 { icon, label, route } 등의 정보를 포함하며, route나 onPress로 탭 클릭 시 동작 정의.

    activeIndex (Number, 필수): 현재 활성화된 탭의 인덱스.

    onChange (Function, 선택): 탭 선택이 바뀔 때 호출되는 콜백 (선택된 인덱스나 항목 정보를 인자로).

    style (Object, 선택): 탭바의 스타일 커스터마이즈 용도.

사용 예시:

<Tabbar 
  items={[
    { icon: 'home', label: '홈' },
    { icon: 'search', label: '검색' },
    { icon: 'settings', label: '설정' }
  ]} 
  activeIndex={activeIdx} 
  onChange={(idx) => navigateTo(idx)} 
/>

주의사항: Tabbar는 앱의 글로벌 내비게이션 역할을 하기 때문에 화면 하단에 항상 노출됩니다. 따라서 한 화면에 두 개 이상의 Tabbar를 사용하지 말고, 아이템 갯수도 3~5개로 제한하여 각 아이콘이 충분한 터치 영역을 갖도록 배치하세요.
Asset (에셋 표시)

아이콘, 이미지, 영상, Lottie 애니메이션 등 여러 미디어 자산을 일관된 스타일의 프레임에 담아 표시하는 컴포넌트예요
tossmini-docs.toss.im
. Asset.Icon, Asset.Image, Asset.Video, Asset.Lottie, Asset.Text 등의 세분화된 하위 컴포넌트를 제공합니다.

주요 속성 (공통):

    frameShape (Object or preset, 선택): 에셋을 담는 프레임의 크기와 모양 지정
    tossmini-docs.toss.im
    . { width, height, borderRadius } 객체나 Asset.frameShape의 미리 정의된 프리셋 값 사용 가능.

    src 또는 name (String, 필수): 표시할 에셋 리소스 식별자. Asset.Image는 src로 URL 또는 경로, Asset.Icon은 name으로 아이콘 이름.

    alt (String, 선택): (웹 접근성) 이미지나 아이콘의 대체 텍스트.

    기타 에셋 종류별로 color(아이콘 색상)
    tossmini-docs.toss.im
    , autoPlay(비디오/Lottie 자동재생), loop(반복 여부) 등의 속성을 가집니다.

사용 예시:

<Asset.Icon name="heart-line" color="green" frameShape={Asset.frameShape.SquareMedium} />
<Asset.Image src="https://example.com/photo.png" frameShape={{ width: 100, height: 100, borderRadius: 8 }} />

주의사항: Asset 컴포넌트를 사용할 때 파일 용량과 해상도에 유의하세요. 특히 이미지/영상은 용량이 크면 로딩에 영향을 줄 수 있으므로, 필요한 경우 적절한 크기의 파일을 사용하거나 Lazy Loading을 적용합니다.
Loader (로더)

콘텐츠를 불러오는 동안 표시하는 로딩 인디케이터입니다. 보통 회전하는 스피너 형태로, 사용자에게 진행 중임을 알립니다.

주요 속성:

    size (Number or String, 선택): 로더의 크기. 일반적으로 작은("small"), 기본("medium"), 큰("large") 크기나 px 숫자로 지정.

    color (String, 선택): 스피너 색상 (브랜드 컬러나 흰색/회색 등).

    type (String, 선택): 로더의 모양 타입 (예: "spinner" 기본 회전형, "bar" 막대 진행바 등 – 시스템에 따라 제공).

사용 예시:

<Loader size="large" color="#00C785" />  {/* 토스 브랜드 색상의 큰 스피너 */}

주의사항: 로더는 필요한 최소 시간 동안만 표시하고, 가능하면 1~2초 이상 로딩이 지속될 경우 사용자에게 현재 진행 상황이나 안내 문구를 함께 제공하세요 (예: "불러오는 중...").
Progress Bar (프로그레스 바)

일정한 길이의 바(막대) 형태로 진행 상황을 시각화하는 컴포넌트입니다. 예를 들어 파일 업로드 진행률, 시험 점수 등 퍼센티지 표현에 사용합니다.

주요 속성:

    value (Number, 필수): 현재 진행 값 (예: 50).

    max (Number, 선택): 최대 값 (기본 100).

    color (String, 선택): 진행 막대의 색상.

    trackColor (String, 선택): 남은 부분 배경 색상 (기본은 연한 회색 등).

    label (String, 선택): 진행률에 대한 레이블 혹은 % 텍스트를 표시할 경우 사용.

사용 예시:

<ProgressBar value={75} max={100} color="#00C785" />

주의사항: 값(value)이 최대치를 넘어가지 않도록 보장해야 합니다. 또한 0%나 100%와 같은 극단 값에서도 UI가 어색하지 않게 표시(예: 0%일 때 빈 바, 100%일 때 가득 찬 바)되도록 처리하세요.
Progress Stepper (단계 진행 표시기)

여러 단계(step)의 진행 상태를 보여주는 컴포넌트입니다. 예: 가입 프로세스 1/3단계 등 여러 스텝을 점 또는 선으로 표시하고 현재 단계를 강조합니다.

주요 속성:

    steps (Number, 필수): 전체 단계 수.

    current (Number, 필수): 현재 진행 중인 단계 인덱스 (1부터 시작하는 번호).

    description (Boolean, 선택): 각 단계에 대한 설명이나 라벨 표시 여부. (디자인 시스템에 따라 단계 번호 또는 아이콘, 텍스트를 함께 보여줄 수 있음)

사용 예시:

<ProgressStepper steps={3} current={2} />

(총 3단계 중 2단계 진행 중인 상태 표시)

주의사항: 사용자가 현재 어느 단계에 있고, 앞으로 몇 단계가 남았는지 쉽게 파악할 수 있도록 시각적 대비를 줍니다 (현재 단계는 강조 색상, 완료된 단계는 체크 표시 등). 단계가 너무 많을 경우 사용자에게 부담이 될 수 있으므로 5단계 이하로 유지하는 것이 좋습니다.
Rating (별점 등급)

별 모양 아이콘 등을 이용해 **평가 등급(별점)**을 표시하거나 입력받는 컴포넌트입니다. 예를 들어 5점 만점 중 4점 등의 평점을 표시하거나 선택받을 때 사용합니다.

주요 속성:

    value (Number, 필수): 현재 선택된 별점 값 (예: 4).

    max (Number, 선택): 최대 별 개수 (기본 5).

    onChange (Function, 선택): 별점을 사용자가 변경했을 때 호출되는 콜백 (별점 입력 모드일 때 사용).

    readOnly (Boolean, 선택): true이면 사용자 입력을 받지 않고 표시만 합니다 (기본 false).

    icon (String or Element, 선택): 커스텀 아이콘을 사용할 경우 지정 (기본은 별 ★ 모양).

사용 예시:

<Rating value={4} max={5} onChange={(newVal) => setRating(newVal)} />

주의사항: 별점은 **부분 점수(예: 4.5)**도 표시할 수 있는데, 이 경우 절반 채워진 별 등 시각적 표시를 지원해야 합니다. readOnly 모드로 표시할 때는 사용자에게 평균 평점 등의 맥락을 함께 전달해주세요.
Menu (메뉴/드롭다운)

사용자가 트리거를 누르면 나타나는 옵션 메뉴 리스트 컴포넌트입니다. 예를 들어 “더보기 ⋮” 버튼을 누르면 여러 동작 옵션을 나열하는 팝업으로 쓰입니다.

주요 속성:

    open (Boolean, 필수): 메뉴가 펼쳐져 있는지 여부.

    items (Array<Object>, 필수): 메뉴 항목 배열. 각 항목은 { label: '편집', onClick: editFunc } 같은 형태로, 표시 텍스트와 동작을 지정.

    anchor (Element, 필수): 메뉴가 나타날 기준이 되는 앵커 요소 (웹의 경우). 모바일에서는 보통 Modal처럼 화면 특정 위치에 표시됨.

    onClose (Function, 선택): 메뉴가 닫힐 때 호출되는 함수.

사용 예시:

<Menu 
  open={menuOpen} 
  onClose={() => setMenuOpen(false)}
  items={[
    { label: '편집', onClick: onEdit },
    { label: '삭제', onClick: onDelete }
  ]}
/>

주의사항: 메뉴 항목이 너무 많을 경우 스크롤이 필요할 수 있으므로, 5~7개 이내로 간략히 구성하는 것이 좋습니다. **중요한 파괴적 행동(삭제 등)**은 메뉴에서 바로 수행하지 말고 한 번 더 확인을 받는 것이 안전합니다.
BottomCTA (하단 CTA 영역)

화면 하단에 고정되어 한두 개의 **주요 버튼(Call To Action)**을 배치하는 영역입니다. 예를 들어 폼 입력 화면의 “다음” 버튼이나 장바구니 화면의 “결제하기” 버튼 등이 하단 고정 영역으로 쓰입니다.

주요 속성:

    type (String, 선택): CTA 스타일 유형 – 단일 버튼("Single"), 이중 버튼("Double") 등 레이아웃을 결정
    tossmini-docs.toss.im
    .

    primaryAction (Node, 필수): 메인 액션 버튼 컴포넌트 (예: <Button>확인</Button>).

    secondaryAction (Node, 선택): 두 번째 액션 버튼 (Double 타입일 때 사용, 예: <Button variant="weak">취소</Button>).

    fixed (Boolean, 선택): true이면 화면 하단에 고정되어 스크롤해도 항상 보입니다. false이면 콘텐츠 내부 배치. (기본 고정)

    safeArea (Boolean, 선택): 모바일 기기에서 하단 안전 영역(홈 인디케이터 영역) 만큼 여백을 넣을지 여부.

사용 예시:

<BottomCTA type="Single" primaryAction={<Button onPress={submit}>등록</Button>} />
{/* 또는 */}
<BottomCTA type="Double"
  primaryAction={<Button onPress={confirm}>확인</Button>}
  secondaryAction={<Button variant="weak" onPress={cancel}>취소</Button>}
/>

주의사항: BottomCTA 영역은 항상 화면 최하단에 위치하므로, 해당 영역 위에 다른 컨텐츠가 가리지 않도록 레이아웃을 설계해야 합니다. 또한 두 개의 버튼을 사용할 경우 우선순위가 높은 액션을 우측에 배치(혹은 시각적으로 더 강조)하는 토스 UX 가이드에 따라 배치하세요.

각 컴포넌트별 속성과 사용 예시는 공식 문서의 가이드를 바탕으로 정리되었으며, 실제 사용 시에는 최신 TDS 문서를 참고하여 세부 속성과 사용법을 확인하는 것이 좋습니다. TDS를 활용하면 일관된 UI/UX를 쉽게 구현할 수 있지만, 컴포넌트 간의 일관성 유지와 적절한 사용이 중요하다는 점을 유의하세요
tossmini-docs.toss.im
toss.oopy.io
