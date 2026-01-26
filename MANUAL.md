# 프로젝트 사용 설명서 (Manual)

이 문서는 Git에서 프로젝트를 다운로드한 후, 로컬 환경에서 실행하고 개발을 진행하기 위한 가이드입니다.

## 1. 사전 준비 (Prerequisites)

프로젝트를 실행하기 위해 다음 도구들이 설치되어 있어야 합니다.

- **Node.js**: v18.17.0 이상 (v20 이상 권장)
  - 확인 방법: 터미널에서 `node -v` 입력
  - 설치: [Node.js 공식 홈페이지](https://nodejs.org/)에서 LTS 버전 다운로드 및 설치
- **Git**: 버전 관리 도구
  - 확인 방법: 터미널에서 `git --version` 입력
  - 설치: [Git 공식 홈페이지](https://git-scm.com/)에서 다운로드 및 설치
- **코드 에디터**: VS Code (Visual Studio Code) 권장

## 2. 프로젝트 다운로드 및 설치 (Installation)

### 2.1 Git Clone (이미 다운로드 받지 않은 경우)
터미널(또는 Git Bash)을 열고 프로젝트를 다운로드할 폴더로 이동한 후 다음 명령어를 입력합니다.

```bash
git clone [레포지토리 주소]
cd [프로젝트 폴더명]
```

### 2.2 패키지 설치
프로젝트 폴더 내에서 필요한 라이브러리(의존성)를 설치합니다.

```bash
npm install
```
또는 `yarn`, `pnpm`, `bun`을 사용하는 경우:
```bash
yarn install
# 또는
pnpm install
# 또는
bun install
```

### 2.3 환경변수 설정
환경변수 템플릿을 복사하여 로컬 설정 파일을 만듭니다.

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열어 필요한 값을 입력하세요:

| 변수명 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | 백엔드 API 서버 주소 |
| `NEXT_PUBLIC_ENV` | 환경 설정 (development/staging/production) |

## 3. 개발 서버 실행 (Development)

설치가 완료되면 개발 서버를 실행하여 로컬에서 결과물을 확인할 수 있습니다.

```bash
npm run dev
```

- 실행 후 터미널에 표시되는 주소(보통 `http://localhost:3000`)를 브라우저에 입력하여 접속합니다.
- 코드를 수정하면 브라우저에 즉시 반영됩니다 (Hot Reloading).

## 4. 주요 명령어 (Scripts)

`package.json`에 정의된 주요 명령어입니다.

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버를 실행합니다. (개발 모드) |
| `npm run build` | 프로덕션 배포를 위해 프로젝트를 빌드합니다. |
| `npm run start` | 빌드된 프로젝트를 실행합니다. (`npm run build` 후 사용) |
| `npm run lint` | 코드 스타일 및 오류를 검사합니다. (ESLint) |

## 5. 프로젝트 구조 (Structure)

```
.
├── app/                # Next.js App Router 페이지 및 레이아웃
├── components/         # 재사용 가능한 UI 컴포넌트
│   └── ui/             # Shadcn UI 기본 컴포넌트
├── docs/               # 기획서 및 개발 문서
├── hooks/              # 커스텀 React Hooks
├── lib/                # 유틸리티 함수 및 설정
├── public/             # 이미지, 폰트 등 정적 파일
├── types/              # TypeScript 타입 정의
├── .env.example        # 환경변수 템플릿
├── next.config.ts      # Next.js 설정 파일
└── package.json        # 프로젝트 의존성 및 스크립트
```

## 6. 트러블슈팅 (Troubleshooting)

**Q. `npm install` 중 에러가 발생해요.**
- Node.js 버전이 너무 낮지 않은지 확인해주세요.
- `package-lock.json` 파일과 `node_modules` 폴더를 삭제한 후 다시 `npm install`을 시도해보세요.

**Q. 포트 충돌 (EADDRINUSE: address already in use)**
- 다른 터미널에서 이미 서버가 실행 중인지 확인하세요.
- 또는 `npm run dev -- -p 3001` 명령어로 다른 포트에서 실행할 수 있습니다.

**Q. 스타일이 적용되지 않거나 깨져 보여요.**
- 개발 서버를 껐다가 다시 켜보세요. (`Ctrl + C` 후 `npm run dev`)
- 브라우저 캐시를 지우고 강력 새로고침(`Ctrl + F5` 또는 `Cmd + Shift + R`)을 해보세요.

---
추가적인 질문이 있거나 도움이 필요하면 언제든 문의해주세요.
