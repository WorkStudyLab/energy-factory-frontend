/**
 * 주문 알림 타입
 */
export type OrderNotificationType =
  | "ORDER_CONFIRMED" // 주문 확인
  | "ORDER_SHIPPED" // 배송 시작
  | "ORDER_DELIVERED" // 배송 완료
  | "ORDER_CANCELLED"; // 주문 취소

/**
 * SSE 알림 데이터 구조
 */
export interface OrderNotification {
  type: OrderNotificationType;
  title: string;
  message: string;
  orderId: number;
  orderNumber: number;
  timestamp: string;
}

/**
 * 내부 알림 저장 구조 (읽음 상태 포함)
 */
export interface StoredNotification extends OrderNotification {
  id: string;
  isRead: boolean;
  createdAt: Date;
}

/**
 * SSE 연결 상태
 */
export type SSEConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

/**
 * SSE 이벤트 타입
 */
export interface SSEEvent {
  type: "connect" | "notification" | "error";
  data?: any;
}
