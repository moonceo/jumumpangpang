---
name: design-system
description: 디자인 시스템 규칙 - 색상, 타이포그래피, 간격, 컴포넌트 사용 원칙
---

# Design System Skill (Antigravity)

이 스킬은 프로젝트의 디자인 시스템 규칙을 정의합니다. 에이전트(Antigravity)가 일관된 UI를 생성하도록 돕습니다.

## 색상 시스템

### 시맨틱 토큰
| 토큰 | 용도 | Tailwind 클래스 |
|------|------|-----------------|
| `primary` | 주요 액션, CTA 버튼 | `bg-primary text-primary-foreground` |
| `secondary` | 보조 액션 | `bg-secondary text-secondary-foreground` |
| `muted` | 비활성, 보조 텍스트 | `bg-muted text-muted-foreground` |
| `accent` | 강조 영역 | `bg-accent text-accent-foreground` |
| `destructive` | 삭제, 경고 액션 | `bg-destructive text-destructive-foreground` |

### 사용 규칙
```tsx
// Good
<div className="bg-primary text-primary-foreground">...</div>
<p className="text-muted-foreground">...</p>

// Bad - 하드코딩된 색상 금지
<div className="bg-[#3b82f6]">...</div>
<div style={{ backgroundColor: '#3b82f6' }}>...</div>
```

## 타이포그래피

### 제목 스타일
| 레벨 | 클래스 조합 |
|------|-------------|
| H1 | `text-4xl font-extrabold tracking-tight` |
| H2 | `text-3xl font-semibold tracking-tight` |
| H3 | `text-2xl font-semibold` |
| H4 | `text-xl font-semibold` |
| H5 | `text-lg font-medium` |
| H6 | `text-base font-medium` |

### 본문 스타일
| 용도 | 클래스 |
|------|--------|
| 일반 본문 | `text-base` |
| 작은 텍스트 | `text-sm text-muted-foreground` |
| 캡션 | `text-xs text-muted-foreground` |

## 간격 (Spacing)

### 4px 그리드 시스템
모든 간격은 4px 단위를 기준으로 합니다.

| 토큰 | 값 | Tailwind |
|------|-----|----------|
| 1 | 4px | `p-1`, `m-1`, `gap-1` |
| 2 | 8px | `p-2`, `m-2`, `gap-2` |
| 3 | 12px | `p-3`, `m-3`, `gap-3` |
| 4 | 16px | `p-4`, `m-4`, `gap-4` |
| 6 | 24px | `p-6`, `m-6`, `gap-6` |
| 8 | 32px | `p-8`, `m-8`, `gap-8` |

### 컴포넌트 기본 간격
- **카드 내부 패딩**: `p-6`
- **섹션 간 간격**: `space-y-6` 또는 `gap-6`
- **폼 요소 간격**: `space-y-4`

## 컴포넌트 사용 원칙

### Button
```tsx
import { Button } from "@/components/ui/button"

// 기본 사용
<Button>기본 버튼</Button>
<Button variant="secondary">보조 버튼</Button>
<Button variant="outline">아웃라인</Button>
<Button variant="destructive">삭제</Button>
<Button variant="ghost">고스트</Button>
<Button variant="link">링크</Button>

// 크기
<Button size="sm">작은 버튼</Button>
<Button size="lg">큰 버튼</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명</CardDescription>
  </CardHeader>
  <CardContent>
    {/* 컨텐츠 */}
  </CardContent>
  <CardFooter>
    {/* 푸터 */}
  </CardFooter>
</Card>
```

### Input
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="email">이메일</Label>
  <Input id="email" type="email" placeholder="example@email.com" />
</div>
```

## Charts (Recharts 기반)

프로젝트에서 시각화가 필요한 경우 Shadcn Charts를 사용합니다.
- **명령어**: `npx shadcn@latest add chart`
- **패턴**: `components/ui/chart.tsx`를 기반으로 하며 Recharts 라이브러리를 사용합니다.
- **데이터 흐름**: ChartConfig를 통해 색상과 라벨을 정의합니다.

## Shadcn CLI & Registry 활용

새로운 요소를 추가할 때는 항상 CLI를 우선적으로 사용합니다.

1. **Components**: `npx shadcn@latest add [name]`
2. **Blocks**: 복잡한 섹션(Sidebar, Auth, Dashboard)은 `shadcn.com/blocks`에서 탐색 후 CLI로 추가합니다.
   - 예: `npx shadcn@latest add "https://shadcn.com/r/block/sidebar-01"`
3. **Charts**: 시각화 구성 요소 추가 시 사용합니다.


## 금지 사항

1. **색상 하드코딩 금지**
   - `bg-[#xxx]`, `text-[#xxx]` 사용 금지
   - 인라인 스타일로 색상 지정 금지

2. **임의의 간격 금지**
   - `p-[17px]`, `m-[23px]` 등 4px 그리드 외 값 금지
   - 인라인 스타일로 margin/padding 지정 금지

3. **원시 HTML 요소 금지**
   - `<button>`, `<input>` 대신 Shadcn 컴포넌트 사용
   - 예외: 레이아웃용 `<div>`, `<span>`, 시맨틱 태그

4. **디자인 토큰 우회 금지**
   - CSS 변수를 직접 수정하거나 우회하지 않음
