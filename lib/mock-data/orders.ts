import { Order, OrderStatus } from "@/types/order";
import { addDays, subDays, subHours, format } from "date-fns";

const now = new Date("2024-02-01T14:00:00"); // Hydration-safe static time

export const mockOrders: Order[] = [
    // 1. 신규 주문 (PCCC 미수집)
    {
        id: "ord_new_001",
        marketOrderId: "20240123-10001",
        marketType: "naver",
        orderDate: format(subHours(now, 1), "yyyy-MM-dd HH:mm"),
        status: "신규 주문",
        buyerName: "김철수",
        buyerPhone: "010-1234-5678",
        recipient: {
            name: "김철수",
            phone: "010-1234-5678",
            address: "서울시 강남구 테헤란로 123",
            zipCode: "06234",
            deliveryMemo: "문 앞에 놔주세요",
            // Missing PCCC to test validation
        },
        product: {
            id: "prod_001",
            name: "북유럽 인테리어 모던 거실장 TV장 2000 size",
            thumbnail: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=200&h=200&fit=crop",
            optionName: "화이트 / 2000mm",
            quantity: 1,
            unitPrice: 159000,
            isAiOption: true,
            marketLink: "https://smartstore.naver.com",
        },
        paymentPrice: 159000,
        platformFee: 5800,
        expectedSettlement: 153200,
        sourcingHistory: [],
    },

    // 2. 신규 주문 (PCCC 수집 완료)
    {
        id: "ord_new_002",
        marketOrderId: "COUPANG-892123",
        marketType: "coupang",
        orderDate: format(subHours(now, 3), "yyyy-MM-dd HH:mm"),
        status: "신규 주문",
        buyerName: "이영희",
        buyerPhone: "010-9876-5432",
        recipient: {
            name: "이영희",
            phone: "010-9876-5432",
            address: "경기도 성남시 분당구 판교로 555",
            pccc: "P123456789012",
        },
        product: {
            id: "prod_002",
            name: "샤오미 로봇청소기 X10 Plus 물걸레 겸용",
            thumbnail: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=200&h=200&fit=crop",
            optionName: "화이트 / 기본형",
            quantity: 1,
            unitPrice: 420000,
            isAiOption: false,
        },
        paymentPrice: 420000,
        platformFee: 12000,
        expectedSettlement: 408000,
        sourcingHistory: [],
    },

    // 3. 발송대기 (소싱 완료, 송장 입력 대기)
    {
        id: "ord_waiting_001",
        marketOrderId: "11ST-555555",
        marketType: "11st",
        orderDate: format(subDays(now, 1), "yyyy-MM-dd HH:mm"),
        status: "발송대기",
        buyerName: "박지성",
        buyerPhone: "010-3333-4444",
        recipient: {
            name: "박지성",
            phone: "010-3333-4444",
            address: "부산광역시 해운대구 마린시티2로 33",
            pccc: "P987654321098",
        },
        product: {
            id: "prod_003",
            name: "접이식 캠핑 의자 경량 체어",
            thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=200&fit=crop",
            optionName: "국방색 / 2개 세트",
            quantity: 2,
            unitPrice: 45000,
            isAiOption: true,
        },
        paymentPrice: 90000,
        platformFee: 3000,
        expectedSettlement: 87000,
        sourcingHistory: [
            {
                attempt: 1,
                status: "active",
                productName: "Camping Chair Lightweight",
                thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=200&fit=crop",
                matchingRate: 95,
                sourcingPriceCNY: 85,
                sourcingPriceKRW: 16000,
                exchangeRatefee: 50,
                link: "https://taobao.com",
                optionName: "Green / Set",
                localShippingFeeCNY: 0,
            }
        ],
    },

    // 4. 배송중 (오류입고 예제)
    {
        id: "ord_shipping_err",
        marketOrderId: "NAVER-ERR-001",
        marketType: "naver",
        orderDate: format(subDays(now, 3), "yyyy-MM-dd HH:mm"),
        status: "오류입고", // Inbound Error
        buyerName: "최다니엘",
        buyerPhone: "010-7777-8888",
        recipient: {
            name: "최다니엘",
            phone: "010-7777-8888",
            address: "인천광역시 연수구 송도과학로 16",
            pccc: "P555555555555",
        },
        product: {
            id: "prod_004",
            name: "빈티지 글라스 조명 탁상 무드등",
            thumbnail: "https://images.unsplash.com/photo-1507473888900-52e1ad14db3d?w=200&h=200&fit=crop",
            optionName: "앰버 브라운 / Type B",
            quantity: 1,
            unitPrice: 38000,
            isAiOption: true,
        },
        paymentPrice: 38000,
        platformFee: 1200,
        expectedSettlement: 36800,
        sourcingHistory: [
            {
                attempt: 1,
                status: "active",
                productName: "Vintage Glass Lamp",
                thumbnail: "https://images.unsplash.com/photo-1507473888900-52e1ad14db3d?w=200&h=200&fit=crop",
                matchingRate: 98,
                sourcingPriceCNY: 45,
                sourcingPriceKRW: 8500,
                exchangeRatefee: 30,
                link: "https://tmall.com",
                optionName: "Brown Type B",
                localShippingFeeCNY: 10,
            }
        ],
        warehouse: {
            status: "오류입고",
            weight: 1.2,
            shippingCost: 8500,
            inspectionPhotos: [
                "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=200&h=200&fit=crop", // Broken glass mock
                "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=200&h=200&fit=crop"
            ],
            inboundDate: format(subDays(now, 1), "yyyy-MM-dd HH:mm"),
        }
    },

    // 5. 배송중 (정상 진행 - 국내 배송 단계)
    {
        id: "ord_shipping_ok",
        marketOrderId: "ESM-29384",
        marketType: "esm",
        orderDate: format(subDays(now, 5), "yyyy-MM-dd HH:mm"),
        status: "국내 배송중",
        buyerName: "홍길동",
        buyerPhone: "010-1111-2222",
        recipient: {
            name: "홍길동",
            phone: "010-1111-2222",
            address: "제주특별자치도 제주시 첨단로 242",
            pccc: "P123123123123",
        },
        product: {
            id: "prod_005",
            name: "원목 캣타워 대형 캣폴",
            thumbnail: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=200&h=200&fit=crop",
            optionName: "5단 / 스크래쳐 추가",
            quantity: 1,
            unitPrice: 129000,
            isAiOption: true,
        },
        paymentPrice: 129000,
        platformFee: 4500,
        expectedSettlement: 124500,
        sourcingHistory: [
            {
                attempt: 1,
                status: "active",
                productName: "Wooden Cat Tower",
                thumbnail: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=200&h=200&fit=crop",
                matchingRate: 92,
                sourcingPriceCNY: 150,
                sourcingPriceKRW: 28000,
                exchangeRatefee: 80,
                link: "https://taobao.com",
                optionName: "5-Tier",
                localShippingFeeCNY: 45,
            }
        ],
        warehouse: {
            status: "출고 완료",
            trackingNumber: "CN123456789KR",
            weight: 15.5,
            shippingCost: 32000,
            inboundDate: format(subDays(now, 3), "yyyy-MM-dd HH:mm"),
        },
        domesticTracking: {
            carrier: "CJ대한통운",
            trackingNumber: "645321684321",
            updatedAt: format(now, "yyyy-MM-dd HH:mm"),
        },
    },
    {
        id: "ORD-20240124-0004",
        marketType: "11st",
        marketOrderId: "20240124999911",
        orderDate: "2024-01-24 16:30:00",
        status: "신규 주문",
        buyerName: "김철수",
        buyerPhone: "010-9999-8888",
        platformFee: 15000,
        product: {
            id: "PROD-004",
            name: "[특가] 샤오미 미지아 로봇청소기 B101CN",
            optionName: "화이트 / 기본형",
            thumbnail: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?q=80&w=200&h=200&fit=crop",
            quantity: 1,
            unitPrice: 420000,
            isAiOption: false
        },
        recipient: {
            name: "김철수",
            phone: "010-9999-8888",
            address: "서울특별시 강남구 테헤란로 123",
            pccc: "" // Missing PCCC
        },
        paymentPrice: 420000,
        expectedSettlement: 405000,
        sourcingHistory: []
    },
    {
        id: "ORD-20240124-0005",
        marketType: "naver",
        marketOrderId: "202401248888NV",
        orderDate: "2024-01-24 17:15:00",
        status: "배송 중",
        buyerName: "이영희",
        buyerPhone: "010-1234-5678",
        platformFee: 4000,
        product: {
            id: "PROD-005",
            name: "캠핑용 경량 체어 1+1",
            optionName: "블랙 + 베이지",
            thumbnail: "https://images.unsplash.com/photo-1503602642458-2321114458ed?q=80&w=200&h=200&fit=crop",
            quantity: 2,
            unitPrice: 44500,
            isAiOption: true
        },
        recipient: {
            name: "이영희",
            phone: "010-1234-5678",
            address: "경기도 성남시 분당구",
            pccc: "P123456789012"
        },
        paymentPrice: 89000,
        expectedSettlement: 85000,
        sourcingHistory: []
    }
];
