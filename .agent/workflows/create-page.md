---
description: Create a new Next.js page with Shadcn UI and design system rules
---

# Create Page Workflow

이 워크플로우는 새로운 Next.js 페이지를 생성하는 표준 절차를 안내합니다.

## Steps

1. **페이지 요구사항 정의**
   - 페이지의 목적과 필요한 컴포넌트(버튼, 카드, 입력 폼 등)를 확인합니다.

2. **디자인 시스템 및 UI 표준 참조**
   - `@.agent/skills/design-system/SKILL.md`와 `@.agent/skills/ui-standard/SKILL.md`를 읽고 규칙을 숙지합니다.

3. **Shadcn UI 컴포넌트/블록 설치**
   - 필요한 기능이 개별 컴포넌트인지, 아니면 블록(Blocks)이나 차트(Charts) 단위인지 결정합니다.
   - `npx shadcn@latest add [component-name]`
   - 블록인 경우: `npx shadcn@latest add "https://shadcn.com/r/block/[block-id]"`

4. **페이지 파일 생성**
   - `app/[route]/page.tsx` 경로에 파일을 생성합니다.
   - 블록을 가져온 경우 레이아웃과 데이터만 연결합니다.
   - `standard.md`와 `ui-standard` 스킬의 패턴을 준수합니다.

5. **비즈니스 로직 분리**
   - 복잡한 로직이 있는 경우 `components/shared`에 별도 컴포넌트로 분리합니다.

6. **검증**
   - 빌드 오류가 없는지 확인하고 디자인 일관성을 체크합니다.
