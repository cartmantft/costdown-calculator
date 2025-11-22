
## 1. 개발 환경 설정 (로컬)

### 1-1. 기본 전제

* **런타임**: 앱인토스 WebView (Toss App 안에서 돌아가는 미니앱)([갓대희의 작은공간][1])
* **프론트엔드**: Vite + React + TypeScript (웹 SPA)([앱인토스][2])
* **앱인토스 연동**: `@apps-in-toss/web-framework` + `granite.config.ts` 설정([앱인토스][3])
* **앱 ID(appName)**: `costdown-calculator`

  * 앱인토스 콘솔에 등록한 앱 이름과 **동일해야 함 (확실함)**([앱인토스][4])

### 1-2. 설치해야 하는 것

1. **Node.js LTS**

   * 권장: Node 20 LTS (예: 20.x)
   * 공식 문서에서 특정 버전을 강제하진 않으므로 *“권장값(확실하지 않음)”*.

2. **npm**

   * Node 설치 시 같이 들어옴.

3. **Git + VS Code**

   * 일반적인 선택, 특별한 제약 없음.

4. **앱인토스용 샌드박스 앱**

   * iOS/Android 샌드박스 앱 설치 후, 이 앱에서 미니앱을 띄워서 테스트.([앱인토스][5])

---

## 2. 프로젝트 생성 & 의존성 설치

### 2-1. Vite + React + TS 프로젝트 생성

```bash
# 1) 프로젝트 생성
npm create vite@latest costdown-calculator -- --template react-ts

# 2) 디렉터리 이동
cd costdown-calculator

# 3) 기본 의존성 설치
npm install
```

### 2-2. 앱인토스 WebView 프레임워크 설치

```bash
npm install @apps-in-toss/web-framework
```

> `@apps-in-toss/web-framework`는 WebView/React Native 공통 SDK이고,
> WebView 튜토리얼과 Unity/Vite 포팅 가이드에서도 이 패키지 설치를 요구함 (확실함).([앱인토스][2])

### 2-3. 앱인토스 환경 구성 (`ait init`)

공식 문서 기준으로 **`ait init` 명령으로 Granite 설정 파일을 만든다** (확실함).([앱인토스][4])

```bash
npx ait init
```

프롬프트에서:

1. **프레임워크 선택**: `WebView` (or web-framework)
2. **appName**: `costdown-calculator`
3. **dev 명령어**: `vite`
4. **build 명령어**: `vite build` (혹은 `tsc -b && vite build` – 공식 예시는 후자지만, 단순 프로젝트에서는 `vite build`만으로도 충분, 이 부분은 *설계 선택이라 추측입니다*).([앱인토스][3])

위 과정을 마치면 **프로젝트 루트에 `granite.config.ts`가 생성**된다 (확실함).([앱인토스][4])

---

## 3. 핵심 설정 파일들

### 3-1. `granite.config.ts`

공식 WebView 예제를 **`costdown-calculator`에 맞게 단순화한 버전**이야.([앱인토스][3])

```ts
// granite.config.ts
import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  // 앱인토스 콘솔에서 등록한 앱 ID (반드시 동일)
  appName: 'costdown-calculator',

  // 상단 브릿지뷰 / 네비게이션 바에 사용될 브랜드 정보
  brand: {
    displayName: '코스트다운 계산기', // 사용자에게 보일 이름 (원하면 변경)
    primaryColor: '#3182F6',          // 기본 포인트 컬러
    icon: '',                         // 아이콘 URL (나중에 설정) - 빈 문자열 허용:contentReference[oaicite:10]{index=10}
    bridgeColorMode: 'basic',         // 일반 서비스면 'basic', 게임 느낌이면 'inverted'
  },

  // WebView 개발 서버 정보
  web: {
    host: 'localhost',
    port: 5173,                       // Vite 기본 포트
    commands: {
      dev: 'vite',                    // 개발 서버 실행 명령
      build: 'vite build',            // 빌드 명령 (Vite)
    },
  },

  // 이번 프로젝트는 권한 필요 없음 → 빈 배열
  permissions: [],                    // 필요해지면 권한 문서 참고해서 추가:contentReference[oaicite:11]{index=11}

  // Vite 빌드 산출물 경로
  outdir: 'dist',

  // WebView 추가 속성 (필요할 때만 사용, 지금은 생략 가능)
  // webViewProps: { type: 'partner' },
});
```

> `appName`, `brand`, `web`, `permissions`, `outdir` 구조는 공식 문서 `defineConfig` 인터페이스와 동일 (확실함).([앱인토스][3])

---

### 3-2. `package.json` 스크립트

`npm create vite`가 만든 기본 스크립트가 있는데,
앱인토스 쪽 커뮤니티 예시를 보면 **보통 이렇게 정리**돼 있음 (실제 프로젝트 예시 기준, 확실함).([앱인토스 개발자 커뮤니티][6])

```jsonc
{
  "name": "costdown-calculator",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "granite dev",     // 샌드박스와 연동되는 dev 모드 (확실하지 않음: ait init이 자동으로 넣어줄 수도 있음)
    "build": "granite build", // .ait 생성까지 포함한 빌드 (확실하지 않음: 실제 스캐폴딩 결과 확인 필요)
    "preview": "vite preview",
    "lint": "eslint .",
    "deploy": "ait deploy"    // 콘솔 배포용 (옵션)
  },
  "dependencies": {
    "@apps-in-toss/web-framework": "^1.3.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "vite": "^5.0.0"
    // ... 기타 Vite 기본 deps
  }
}
```

* 커뮤니티 글들을 보면 `"dev": "granite dev"`, `"build": "granite build"` 패턴이 매우 흔함.([앱인토스 개발자 커뮤니티][6])
* 실제로 `ait init`가 어떤 스크립트를 만들어주는지는 버전/옵션에 따라 조금 다를 수 있어서,
  **여기 JSON은 “권장 형태”이고, 실제 생성된 파일을 기준으로 맞춰줘야 함 (확실하지 않음)**.

Codex에 지시할 땐:

* “`package.json`의 scripts를 위 형태에 맞춰 수정해줘” 정도로 태스크를 던지면 됨.

---

### 3-3. `vite.config.ts` (기본)

일단 특별한 설정 없이 **React 플러그인 + 기본 서버 설정** 수준이면 충분.

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});
```

> 나중에 API 프록시나 경로 alias가 필요하면 여기에 추가.

---

## 4. `src/` 전체 구조 (최종안)

앱 이름만 바뀌었지, **기능 구조는 그대로 쓰면 됨**.
Codex가 따라 만들 수 있도록 **폴더/파일 이름만 깔끔히 정리**해서 다시 적어볼게.

```text
costdown-calculator/
├─ granite.config.ts
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ index.html
└─ src/
   ├─ main.tsx                # 엔트리 포인트
   ├─ App.tsx                 # 전체 앱 레이아웃
   ├─ routes/
   │  └─ HomePage.tsx         # 메인: 코스트다운 계산기 화면
   ├─ features/
   │  └─ dca/
   │     ├─ types.ts          # DcaInput/DcaResult/DcaHistoryItem 타입
   │     ├─ calc.ts           # 물타기(코스트다운) 계산 로직
   │     ├─ history.ts        # localStorage 기반 히스토리 저장/조회
   │     └─ hooks.ts          # useDcaCalculator 훅
   ├─ components/
   │  ├─ dca/
   │  │  ├─ DcaForm.tsx       # 입력 폼
   │  │  ├─ DcaResult.tsx     # 결과 표시
   │  │  └─ DcaHistoryList.tsx# 최근 계산 기록 리스트
   │  └─ common/              # (추가 예정) 공용 버튼/인풋 등
   ├─ lib/
   │  ├─ localStorage.ts      # localStorage 헬퍼
   │  ├─ api.ts               # (향후) 백엔드 호출 래퍼
   │  └─ env.ts               # 환경변수 접근 래퍼
   ├─ styles/
   │  └─ global.css           # 전역 스타일 (모바일 뷰 기준)
   └─ config/
      └─ appConfig.ts         # 앱 공통 설정(통화, 기본값 등)
```

이 구조의 의도:

* **비즈니스 로직(계산, 히스토리)은 `features/dca`에 모으고**,
* 화면/입력/결과/히스토리는 `components/dca`에 분리 →
  나중에 Next.js/백엔드에서도 `features/dca`만 가져다 쓸 수 있게.

---

## 5. 실행 & 빌드 플로우 (요약)

Codex한테 “이대로 스크립트 만들어줘”라고 시킬 때를 기준으로 단계만 정리하면:

### 5-1. 개발 모드

```bash
# 개발용
npm run dev   # 내부적으로 granite dev → Vite dev 서버 + AppsInToss 연결 (확실하지 않음: 실제 스크립트 확인 필요)
```

* 샌드박스 앱에서 `intoss://costdown-calculator` 로 접속해서 WebView 미니앱 띄움.
  (`appName`이 여기에도 동일하게 쓰임, 확실함).([앱인토스][3])

### 5-2. 빌드 & 배포

```bash
# .ait 패키지 생성 (추정 플로우)
npm run build   # granite build 실행 → Vite build 결과를 기반으로 .ait 생성 (추측입니다):contentReference[oaicite:16]{index=16}

# 콘솔 업로드 (선택)
npm run deploy  # ait deploy (콘솔 CLI 사용 – 실제 동작 여부는 환경 설정에 따라 다름, 확실하지 않음)
```

실제 `.ait`가 어디 생성되는지는 `granite.config.ts`의 `outdir`와 Granite 버전에 따라 달라질 수 있으므로,
**첫 빌드 후 결과 경로를 한 번 확인하는 게 필요함 (확실하지 않음)**.([앱인토스][3])

---

## 6. Codex에 던질 때 쓸 수 있는 한 줄 요약

* **앱 이름 / ID**: `costdown-calculator`
* **프레임워크**: Vite + React + TS, `@apps-in-toss/web-framework` 기반 WebView
* **설정 파일**:

  * `granite.config.ts`: 위에 적은 defineConfig 예시 그대로
  * `package.json`: `"dev": "granite dev"`, `"build": "granite build"` 중심
  * `vite.config.ts`: React 플러그인 + `port: 5173`, `outDir: 'dist'`
* **src 구조**: `features/dca` + `components/dca` + `routes/HomePage.tsx`

이 상태까지 Codex로 맞춰놓으면,
이후에는 **개별 컴포넌트/스타일/테스트** 쪽만 점점 살을 붙이면 돼.

필요하면 다음에는:

* `granite.config.ts`, `package.json`, `main.tsx`, `App.tsx`, `HomePage.tsx`까지
  **“최소 실행 가능한 버전”으로 한 번에 코드 묶음**도 만들어줄 수 있어.

[1]: https://goddaehee.tistory.com/416?utm_source=chatgpt.com "토스 앱인토스(3,000만 유저에게 닿는 미니앱 개발) - 간단한 소개"
[2]: https://developers-apps-in-toss.toss.im/porting_tutorials/vite_unity.html?utm_source=chatgpt.com "Vite로 Unity WebGL 빌드 감싸기 - 앱인토스 개발자센터"
[3]: https://developers-apps-in-toss.toss.im/bedrock/reference/framework/UI/Config.html "공통 설정 | 앱인토스 개발자센터"
[4]: https://developers-apps-in-toss.toss.im/tutorials/react-native.html?utm_source=chatgpt.com "React Native - 앱인토스 개발자센터"
[5]: https://developers-apps-in-toss.toss.im/tutorials/webview.html?utm_source=chatgpt.com "WebView - 앱인토스 개발자센터"
[6]: https://techchat-apps-in-toss.toss.im/t/metro/226?utm_source=chatgpt.com "앱인토스 개발환경 실행시 샌드박스 Metro 문제"
