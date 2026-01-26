---
name: code-review-test
description: 전체 코드베이스 검증, 리뷰, 테스트 자동화 마스터 프롬프트
---

# Code Review & Test Automation Skill

이 스킬은 전체 프로젝트의 코드 품질을 검증하고, 테스트를 자동 생성/실행하며, 브라우저 검증까지 수행하는 통합 워크플로우입니다.

## 실행 단계

### 1. 전체 프로젝트 스캔
- 버그, 성능 문제, 보안 취약점 식별
- SQL injection, secrets 노출, XSS 등 보안 체크리스트 적용
- 사용하지 않는 import, 데드 코드 탐지

### 2. 규칙 일관성 확인
- 변수명 컨벤션 (camelCase, PascalCase)
- import 순서 (외부 라이브러리 → 내부 모듈 → 상대 경로)
- 에러 핸들링 패턴 일관성
- ESLint/Prettier 스타일 가이드 준수 여부

### 3. 단위 테스트 생성
- Jest (TypeScript/React) 또는 Pytest (Python) 사용
- 각 파일/메서드별 테스트 커버리지 확보
- 테스트 케이스 구성:
  - 성공 케이스 (Happy Path)
  - 실패 케이스 (Error Handling)
  - 엣지 케이스 (Boundary Conditions)
- 파일명: `*.test.ts` 또는 `test_*.py` 형식

### 4. 테스트 실행
```bash
# JavaScript/TypeScript
npm test

# Python
pytest -v
```
- 실패 시 로그 분석 후 자동 수정 시도
- 수정 후 재실행하여 통과 확인

### 5. 브라우저 검증 (UI 프로젝트)
- 주요 페이지 열기 및 스크린샷 캡처
- 콘솔 에러/경고 로그 분석
- 애니메이션, 폼 유효성, 반응형 레이아웃 확인
- API 엔드포인트 응답 검증

### 6. 보고서 생성
아티팩트로 `code-review-report.md` 생성:

```markdown
# Code Review Report

## Critical (즉시 수정 필요)
- [ ] 이슈 설명 및 파일 위치
- [ ] 수정 제안 코드

## Warning (권장 수정)
- [ ] 이슈 설명 및 파일 위치

## Suggestion (개선 제안)
- [ ] 리팩토링 또는 최적화 제안
```

## 테스트 특화 변형 프롬프트

### 유닛 테스트 집중
```
[파일명]에 Jest/Pytest 테스트 작성:
- 성공 케이스 3개
- 실패/에러 케이스 2개
- 엣지 케이스 2개
작성 후 실행하여 통과 확인, 실패 시 수정
```

### 엣지 케이스 탐색
```
[함수명] 함수의 엣지 케이스 5개 나열 후:
1. 각 케이스에 대한 테스트 생성
2. 테스트 실행
3. 실패 시 함수 또는 테스트 수정
```

### 리그레션 테스트
```
리팩토링 영향 범위 분석 후:
1. 기존 기능 동작 확인 테스트 생성
2. 데이터 로드/저장 플로우 검증
3. API 응답 스키마 일관성 확인
```

## 설정 권장사항

- **Review Policy**: "Agent Decides" - 자율 리뷰 활성화
- **Auto-run**: 안전한 명령어(lint, test)는 자동 실행 허용
- **Artifacts**: 보고서는 `brain/` 디렉토리에 저장

## 사용 방법

1. 채팅에서 `@code-review-test` 호출
2. 또는 `/generate code-review-test` 입력
3. 특정 파일/폴더 지정 시: "src/components 폴더만 리뷰해줘"
