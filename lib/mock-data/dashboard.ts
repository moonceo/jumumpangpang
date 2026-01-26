export interface DashboardMetrics {
  sales: number;
  expectedSettlement: number;
  costs: number;
  expectedMargin: number;
  cashback: number;
  orderCount: number;
}

export interface DailySales {
  date: string;
  sales: number;
}

export interface Announcement {
  id: string;
  badge: 'important' | 'general';
  title: string;
  date: string;
  content?: string;
}

export interface PendingTask {
  id: string;
  name: string;
  count: number;
  url: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

// Mock data for dashboard
export const mockMetrics: DashboardMetrics = {
  sales: 45231890,
  expectedSettlement: 38947123,
  costs: 28456780,
  expectedMargin: 10490343,
  cashback: 1234567,
  orderCount: 1248,
};

export const mockDailySales: DailySales[] = Array.from({ length: 31 }, (_, i) => ({
  date: `2026-01-${String(i + 1).padStart(2, '0')}`,
  sales: Math.floor(Math.random() * 3000000) + 500000,
}));

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    badge: 'important',
    title: '11번가 API 업데이트 안내 - 송장 입력 방식 변경',
    date: '2일 전',
    content: '11번가 API 정책 변경으로 인해 가송장 입력 시 "직접전달" 모드로 전송됩니다.',
  },
  {
    id: '2',
    badge: 'general',
    title: '쿠팡 정산 스케줄 변경 안내',
    date: '5일 전',
    content: '쿠팡 정산 스케줄이 매주 화요일로 변경되었습니다.',
  },
  {
    id: '3',
    badge: 'general',
    title: '신규 마켓 연동: 위메프 추가',
    date: '1주 전',
    content: '위메프 마켓 연동이 추가되었습니다.',
  },
];

export const mockPendingTasks: PendingTask[] = [
  {
    id: 'new-orders',
    name: '신규주문',
    count: 23,
    url: '/orders/new',
  },
  {
    id: 'waiting-shipment',
    name: '발송대기',
    count: 15,
    url: '/orders/waiting',
  },
  {
    id: 'shipping-error',
    name: '오류입고',
    count: 3,
    url: '/orders/shipping',
  },
  {
    id: 'claims',
    name: '반품/교환/취소',
    count: 7,
    url: '/orders/claims',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '새로운 주문',
    message: '신규 주문 5건이 접수되었습니다.',
    timestamp: '10분 전',
    isRead: false,
  },
  {
    id: '2',
    title: '통관부호 확인 필요',
    message: '주문 3건의 통관부호 확인이 필요합니다.',
    timestamp: '1시간 전',
    isRead: false,
  },
  {
    id: '3',
    title: '정산 완료',
    message: '1월 2주차 정산이 완료되었습니다.',
    timestamp: '2시간 전',
    isRead: true,
  },
];
