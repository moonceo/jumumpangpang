# Log: Service Flowchart Creation

## Action
Constructing the "Master Service Flowchart" to provide a high-level view of the system.

## Designed Flow (Mermaid)

```mermaid
graph TD
    %% 노드 스타일 정의
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef keypoint fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef process fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;

    User((사용자/셀러)) --> Login[로그인]
    Login --> Dashboard[대시보드]

    subgraph "설정 및 관리 (Management)"
        Dashboard --> MarketSet[마켓 연동 관리]
        MarketSet --> Plan[구독/결제 관리]
    end

    subgraph "핵심 프로세스 (Core Process)"
        direction TB
        OrderCollect[주문 수집] --> OrderList[주문 조회]
        OrderList --> Step1{신규 주문}
        
        Step1 -->|PCCC 검증| Step2[통관부호 확인]
        Step2 -->|AI 매칭| Step3[소싱처/마진 확정]
        Step3 --> Step4[발송 대기]
        
        Step4 -->|배대지 전송| Step5[송장 입력]
        Step5 --> Step6[배송중/추적]
        Step6 --> Step7((배송 완료))
        
        class Step1,Step2,Step3,Step4,Step5,Step6 keypoint
    end

    subgraph "사후 관리 (Post-Process)"
        Step6 -.->|이슈 발생| Claim[반품/교환/취소]
        Step7 --> Ledger[정산/장부 관리]
    end

    MarketSet -.->|연동| OrderCollect
```

## Next Steps
- Insert this chart into `docs/03_서비스기획/기획_프로세스_플로우차트.md`.
- Ensure consistency with sub-charts.
