---
name: shadcn-registry
description: Shadcn UI 정식 컴포넌트, 블록, 차트 전체 리스트 및 설치 가이드
---

# Shadcn UI Inventory

이 스킬은 Shadcn UI에서 제공하는 모든 가용 리소스를 관리합니다. 에이전트(Antigravity)는 새로운 UI를 설계할 때 이 리스트를 참조하여 적절한 도구를 선택합니다.

## 1. Components (원자 및 분자 단위)

설치 명령어: `npx shadcn@latest add [component-name]`

- **Accordion**: 내용을 펼치고 접는 헤더 세트
- **Alert**: 중요한 메시지를 시각적으로 강조
- **Alert Dialog**: 사용자의 확답이 필요한 모달 창
- **Aspect Ratio**: 일정한 비율(예: 16:9)로 요소 배치
- **Avatar**: 사용자 프로필 이미지 또는 이니셜 표시
- **Badge**: 상태 정보를 나타내는 작은 태그
- **Breadcrumb**: 현재 페이지의 경로 표시
- **Button**: 표준 버튼 및 다양한 변형(variant)
- **Button Group**: 여러 버튼을 하나로 그룹화
- **Calendar**: 날짜 선택을 위한 달력 컴포넌트
- **Card**: 관련 정보를 박스 형태로 그룹화 (Header, Content, Footer)
- **Carousel**: 가로로 스크롤 가능한 요소 집합
- **Chart**: Recharts 기반의 데이터 시각화 라이브러리 추가
- **Checkbox**: 다중 선택을 위한 체크박스
- **Collapsible**: 버튼 등으로 여닫을 수 있는 영역
- **Combobox**: 자동 완성 기능이 포함된 선택 창
- **Command**: 명령 팔레트 또는 검색 인터페이스
- **Context Menu**: 우클릭 시 나타나는 메뉴
- **Data Table**: TanStack Table 기반의 강력한 테이블
- **Date Picker**: 날짜와 시간을 선택하는 팝업 형식의 입격창
- **Dialog**: 오버레이 모달 창
- **Drawer**: 화면 하단 또는 옆에서 슬라이드되는 패널
- **Dropdown Menu**: 클릭 시 나타나는 옵션 목록
- **Empty**: 데이터가 없을 때 표시하는 빈 상태 UI
- **Field**: 레이블과 입력 요소의 조합
- **Hover Card**: 마우스 오버 시 정보를 요약해서 보여줌
- **Input**: 표준 텍스트 입력 필드
- **Input Group**: 입력 필드와 아이콘 등을 결합
- **Input OTP**: 인증 번호 입력을 위한 전용 필드
- **Item**: 리스트나 메뉴 내의 개별 항목
- **Kbd**: 키보드 단축키 표시
- **Label**: 입력 필드용 텍스트 레이블
- **Menubar**: 상단 가로 메뉴 바
- **Native Select**: 브라우저 기본 선택 창
- **Navigation Menu**: 웹사이트 상단 네비게이션
- **Pagination**: 페이지 번호 버튼 묶음
- **Popover**: 특정 요소 주변에 뜨는 안내 창
- **Progress**: 진행 상태 표시 바
- **Radio Group**: 단일 선택을 위한 라디오 버튼 그룹
- **Resizable**: 크기 조절이 가능한 패널 레이아웃
- **Scroll Area**: 커스텀 스크롤이 적용된 영역
- **Select**: 커스텀 스타일이 적용된 선택 목록
- **Separator**: 요소 사이의 구분선
- **Sheet**: 화면 옆에서 슬라이드되는 사이드 패널
- **Sidebar**: 앱 전체의 사이드 네비게이션 구조
- **Skeleton**: 로딩 상태를 나타내는 플레이스홀더
- **Slider**: 범위를 선택하는 슬라이더 조절 바
- **Sonner**: 알림 메시지 (Toast 대체용)
- **Spinner**: 로딩 중임을 나타내는 회전 아이콘
- **Switch**: On/Off 토글 스위치
- **Table**: 표준 HTML 테이블 스타일링
- **Tabs**: 탭 전환 인터페이스
- **Textarea**: 여러 줄 텍스트 입력 필드
- **Toast**: 화면 구석에 뜨는 간단한 알림
- **Toggle**: 눌린 상태를 유지하는 토글 버튼
- **Toggle Group**: 여러 토글 버튼의 집합
- **Tooltip**: 호버 시 작은 툴팁 표시
- **Typography**: 텍스트 스타일링 (H1-H4, P 등)

## 2. Blocks (복잡한 페이지 섹션)

설치 명령어: `npx shadcn@latest add "URL"`

- **Featured**: 주요 기능을 소개하는 히어로 섹션 또는 추천 영역
- **Sidebar**: 다양한 스타일의 완성형 사이드바 블록
- **Login**: 완성된 로그인 폼 및 레이아웃
- **Signup**: 완성된 회원가입 폼 및 레이아웃
- **OTP**: 인증 번호 확인 전용 페이지 레이아웃
- **Calendar**: 일정 관리 기능이 통합된 대형 캘린더 섹션

## 3. Charts (데이터 시각화)

Shadcn Charts는 Recharts를 감싸서 일관된 디자인 토큰을 적용합니다.

- **Area Charts**: 영역형 차트
- **Bar Charts**: 막대형 차트
- **Line Charts**: 선형 차트
- **Pie Charts**: 파이형 차트
- **Radar Charts**: 레이더형 차트
- **Radial Charts**: 방사형 차트
- **Tooltips**: 차트 내 상세 정보 툴팁

---

에이전트는 사용자의 요청에 따라 위 리스트 중 가장 적합한 것을 골라 `create-page` 워크플로우를 수행합니다.
가급적 **Blocks**와 **Charts**를 먼저 검토하여 페이지의 큰 뼈대를 잡고, 세부 요소는 **Components**로 완성합니다.
