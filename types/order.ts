export type OrderStatus =
    | '신규 주문'
    | '통관부호 수집중'
    | '결제 완료'
    | '발주 확인'
    | '발송대기' // Added for local mapping
    | '현지 발송 대기중'
    | '현지 배송중'
    | '현지 배송 완료'
    | '입고 대기'
    | '입고중'
    | '견적 완료'
    | '배송비 결제 완료'
    | '출고 준비'
    | '출고 완료'
    | '국내 입항'
    | '통관중'
    | '통관 완료'
    | '국내 배송 시작'
    | '국내 배송중'
    | '배송 완료'
    | '주문 취소'
    | '취소 요청'
    | '반품 요청'
    | '반품 수거중'
    | '반품 완료'
    | '교환 요청'
    | '오류입고'
    | '검수불합격';

export type MarketType = 'naver' | 'coupang' | '11st' | 'esm' | 'gmarket' | 'auction';

export interface Recipient {
    name: string;
    phone: string;
    address: string;
    zipCode?: string;
    detailAddress?: string;
    pccc?: string; // Personal Customs Clearance Code
    deliveryMemo?: string;
}

export interface ProductOption {
    name: string;
    value: string;
    priceChange: number;
}

export interface OrderProduct {
    id: string;
    name: string;
    thumbnail: string;
    optionName: string;
    quantity: number;
    unitPrice: number;
    isAiOption: boolean; // "AI 옵션 이미지" badge
    marketLink?: string;
}

export interface WarehouseData {
    status: string; // e.g. "입고 대기", "출고 완료"
    trackingNumber?: string; // China local tracking
    weight?: number; // kg
    shippingCost?: number; // KRW
    inspectionPhotos?: string[]; // URLs
    inboundDate?: string;

    // Settings
    shippingMethod?: 'air' | 'sea_incheon' | 'sea_pyeongtaek';
    hsCode?: string;
    clearanceType?: 'list' | 'simple'; // 목록/간이
    services?: {
        inspection?: 'basic' | 'precision' | 'operation';
        packaging?: 'standard' | 'bubble' | 'stick' | 'corner';
        etc?: string[];
    };
}

export interface SourcingHistory {
    attempt: number; // #1, #2, #3, #4...
    status: 'active' | 'refunded' | 'cancelled';
    productName: string;
    thumbnail: string;
    matchingRate: number; // %
    sourcingPriceCNY: number;
    sourcingPriceKRW: number;
    exchangeRatefee: number;
    link: string;
    optionName: string;

    // Logistics
    localShippingFeeCNY: number;
}

export interface Order {
    id: string; // Internal system ID
    marketOrderId: string; // Market's order ID
    marketType: MarketType;
    orderDate: string;

    status: OrderStatus;

    // Person
    buyerName: string;
    buyerPhone: string;
    recipient: Recipient;

    // Product
    product: OrderProduct;

    // Financials
    paymentPrice: number; // 결제가격
    platformFee: number; // 플랫폼 수수료
    expectedSettlement: number; // 정산예상금액

    // Sourcing & Logistics
    sourcingHistory: SourcingHistory[];
    warehouse?: WarehouseData;

    // Delivery
    domesticTracking?: {
        carrier: string;
        trackingNumber: string;
        updatedAt: string;
    };

    // Memo
    internalMemo?: string;
}

export interface WarehouseChatMsg {
    id: string;
    sender: 'me' | 'warehouse';
    message: string;
    timestamp: string;
}

export interface SellerChatMsg {
    id: string;
    sender: 'me' | 'seller';
    originalMessage?: string; // Chinese
    translatedMessage: string; // Korean
    timestamp: string;
}
