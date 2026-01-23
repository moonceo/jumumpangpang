---
name: ui-standard
description: UI 표준 패턴 - 대표 페이지 구조 및 컴포넌트 조합 패턴
---

# UI Standard Skill (Antigravity)

이 스킬은 프로젝트의 표준 UI 패턴과 페이지 구조를 정의합니다. 에이전트(Antigravity)가 페이지를 설계할 때 참조합니다.

## 페이지 레이아웃 패턴

### 기본 페이지 구조
```tsx
export default function PageName() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">페이지 제목</h1>
          <p className="text-muted-foreground">페이지 설명</p>
        </div>
        <Button>액션 버튼</Button>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* 카드들 */}
      </div>
    </div>
  )
}
```

## Blocks 패턴 (Advanced Layouts)

Shadcn Blocks는 복잡한 UI를 빠르고 일관되게 구축하기 위한 미리 설계된 섹션입니다.

### Sidebar Layout (App Shell)
대부분의 관리형 프로젝트는 `Sidebar` 블록을 기본 레이아웃으로 사용합니다.
- **생성 방식**: `npx shadcn@latest add sidebar` 를 통해 인프라를 설치하고, `components/app-sidebar.tsx`를 구성합니다.
- **적용**: `app/layout.tsx`에서 `SidebarProvider`와 `Sidebar`를 배치합니다.

### Dashboard Blocks
- 대시보드의 특정 섹션(예: 통계 리스트, 복잡한 테이블)을 직접 구현하기보다 `shadcn.com/blocks`에서 적절한 블록을 찾아 커스터마이징합니다.

## Registry & Create CLI

새로운 기능을 구현할 때:
1. `shadcn.com`의 Registry에서 관련 컴포넌트나 블록이 있는지 확인합니다.
2. 커스텀 레지스트리를 사용하는 경우 `npx shadcn@latest add [URL]` 형식을 사용합니다.


## 대시보드 패턴

### 통계 카드 그리드
```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">총 매출</CardTitle>
      <DollarSign className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">$45,231.89</div>
      <p className="text-xs text-muted-foreground">
        전월 대비 +20.1%
      </p>
    </CardContent>
  </Card>
  {/* 추가 통계 카드들 */}
</div>
```

### 데이터 테이블 섹션
```tsx
<Card>
  <CardHeader>
    <CardTitle>최근 거래</CardTitle>
    <CardDescription>최근 30일간의 거래 내역입니다.</CardDescription>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>날짜</TableHead>
          <TableHead>설명</TableHead>
          <TableHead className="text-right">금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* 테이블 행들 */}
      </TableBody>
    </Table>
  </CardContent>
</Card>
```

## 폼 패턴

### 기본 폼 레이아웃
```tsx
<Card>
  <CardHeader>
    <CardTitle>설정</CardTitle>
    <CardDescription>계정 설정을 변경합니다.</CardDescription>
  </CardHeader>
  <CardContent>
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input id="name" placeholder="홍길동" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" placeholder="example@email.com" />
      </div>
    </form>
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="outline">취소</Button>
    <Button>저장</Button>
  </CardFooter>
</Card>
```

## 빈 상태 패턴

### 데이터 없음
```tsx
<Card className="flex flex-col items-center justify-center py-12">
  <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold">데이터가 없습니다</h3>
  <p className="text-muted-foreground text-sm mb-4">
    아직 등록된 항목이 없습니다.
  </p>
  <Button>새로 만들기</Button>
</Card>
```

## 반응형 패턴

### 그리드 반응형
```tsx
// 1열 → 2열 → 3열 → 4열
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* 아이템들 */}
</div>

// 1열 → 2열 (사이드바 + 메인)
<div className="grid gap-6 lg:grid-cols-[280px_1fr]">
  <aside>{/* 사이드바 */}</aside>
  <main>{/* 메인 컨텐츠 */}</main>
</div>
```

## 새 페이지 생성 시 체크리스트

1. **레이아웃 확인**
   - 페이지 헤더 (제목, 설명, 액션 버튼)
   - 컨텐츠 영역 그리드 구성

2. **컴포넌트 선택**
   - Shadcn UI 컴포넌트 우선 사용
   - 필요시 `components/shared`에서 재사용

3. **디자인 시스템 준수**
   - 색상 토큰 사용
   - 4px 그리드 간격
   - 타이포그래피 규칙

4. **반응형 고려**
   - 모바일 우선 접근
   - 브레이크포인트별 그리드 조정

## 재사용 지침

새로운 관리 페이지나 대시보드를 만들 때:
1. 이 문서의 대시보드 패턴을 기반으로 시작
2. 통계 카드의 아이콘과 라벨만 변경
3. 테이블/리스트 구조는 동일하게 유지
4. 색상과 간격은 디자인 시스템 토큰 사용
