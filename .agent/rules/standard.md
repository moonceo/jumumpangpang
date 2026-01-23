# Standard Project Rules (Antigravity)

이 문서는 이 프로젝트에서 코드를 작성할 때 반드시 따라야 하는 규칙을 정의합니다.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI (new-york style)
- **Icons**: Lucide React
- **Design System**: CSS 변수 기반 토큰
- **Agent**: Antigravity (Google)

## 디자인 규칙

### 컴포넌트 사용
- 모든 UI는 `components/ui/`의 Shadcn UI 컴포넌트를 우선 사용
- 원시 `<button>`, `<input>` 등은 지양하고 Shadcn 컴포넌트 사용
- 새 컴포넌트 생성 전 기존 컴포넌트 재사용 여부 확인

### 색상
- CSS 변수와 Tailwind 토큰만 사용: `bg-primary`, `text-muted-foreground` 등
- 하드코딩된 hex/rgb 색상 **금지**

### 간격 (Spacing)
- 4px 그리드 시스템 준수
- Tailwind 클래스만 사용: `p-4`, `m-8`, `gap-2` 등

## 코드 스타일

### 파일 구조
```
components/
├── ui/          # Shadcn UI 컴포넌트
└── shared/      # 도메인/비즈니스 재사용 컴포넌트
```

## 스킬 파일 참조

새 UI 작업 시 다음 스킬 파일을 참조:
- `.agent/skills/design-system/SKILL.md` - 디자인 토큰 및 규칙
- `.agent/skills/ui-standard/SKILL.md` - UI 패턴 및 샘플
- `.agent/skills/shadcn-registry/SKILL.md` - 가용 컴포넌트/블록/차트 전체 인벤토리

## 명령어

```bash
# 개발 서버
npm run dev
# 빌드
npm run build
# 린트
npm run lint
```
