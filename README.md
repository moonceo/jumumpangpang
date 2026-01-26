# Jumunpangpang OMS

주문팡팡(Jumunpangpang) AI 주문처리 시스템의 프론트엔드 프로젝트입니다.

## 주요 기능

- 대시보드: 매출 차트, 캐시백, 통합 알림
- 주문관리: 주문 수집, 상태 관리, 배송 추적, 클레임 처리
- 문의관리: CS 통합 관리 (마켓별 제약 사항 포함)
- 내정보: 멤버십 결제, 마켓 API 연동, 알림톡 설정

## 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | Shadcn UI, Tailwind CSS 4 |
| State | React Query (Server), Zustand (Client) |
| Chart | Recharts |
| Icons | Lucide React |

## 시작하기

### 1. 저장소 클론

```bash
git clone [레포지토리 주소]
cd jumunpangpang
```

### 2. 환경변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열어 필요한 값을 설정하세요.

### 3. 패키지 설치

```bash
npm install
```

### 4. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인하세요.

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 후 서버 실행 |
| `npm run lint` | ESLint 코드 검사 |

## 문서

자세한 개발 문서는 [docs/](./docs/) 폴더를 참조하세요.

## 라이선스

Private
# jimunpangpang
# jumumpangpang
