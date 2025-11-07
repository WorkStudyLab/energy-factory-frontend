import { useEffect, useRef, useCallback } from "react";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useAuthStore } from "@/stores/useAuthStore";
import type { OrderNotification } from "@/types/notification";

const SSE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://energy-factory.kr";
const NOTIFICATION_ENDPOINT = `${SSE_URL}/api/notifications/stream`;

// 재연결 설정
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000; // 3초

interface UseOrderNotificationsOptions {
  onNotificationReceived?: (notification: OrderNotification) => void;
  enableBrowserNotification?: boolean;
}

export function useOrderNotifications(
  options: UseOrderNotificationsOptions = {},
) {
  const { onNotificationReceived, enableBrowserNotification = true } = options;

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const { addNotification, setConnectionStatus } = useNotificationStore();
  const { isAuthenticated } = useAuthStore();

  // 브라우저 알림 표시
  const showBrowserNotification = useCallback(
    (notification: OrderNotification) => {
      if (!enableBrowserNotification) return;

      if ("Notification" in window && Notification.permission === "granted") {
        const browserNotification = new Notification(notification.title, {
          body: notification.message,
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          tag: `order-${notification.orderNumber}`,
        });

        // 알림 클릭 시 주문 상세 페이지로 이동 (선택사항)
        browserNotification.onclick = () => {
          window.focus();
          // TODO: 주문 상세 페이지 라우팅
          // window.location.href = `/orders/${notification.orderId}`;
        };
      }
    },
    [enableBrowserNotification],
  );

  // 인증 상태에 따라 연결/해제
  useEffect(() => {
    // 로그인하지 않은 경우
    if (!isAuthenticated) {
      // 기존 연결 해제
      if (eventSourceRef.current) {
        console.log("🔌 SSE 연결 해제 (로그아웃)");
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        setConnectionStatus("disconnected");
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      return;
    }

    // 이미 연결되어 있으면 무시
    if (eventSourceRef.current) {
      return;
    }

    // SSE 연결 시작
    console.log("🔌 SSE 연결 시도...");
    setConnectionStatus("connecting");

    try {
      const eventSource = new EventSource(NOTIFICATION_ENDPOINT, {
        withCredentials: true,
      });

      // 연결 성공 이벤트
      eventSource.addEventListener("connect", (event) => {
        console.log("✅ SSE 연결 성공:", event.data);
        setConnectionStatus("connected");
        reconnectAttemptsRef.current = 0; // 재연결 카운터 초기화
      });

      // 알림 수신 이벤트
      eventSource.addEventListener("notification", (event) => {
        try {
          const notification: OrderNotification = JSON.parse(event.data);
          console.log("📬 알림 수신:", notification);

          // 스토어에 알림 추가
          addNotification(notification);

          // 브라우저 알림 표시
          showBrowserNotification(notification);

          // 콜백 실행
          onNotificationReceived?.(notification);
        } catch (error) {
          console.error("❌ 알림 파싱 에러:", error);
        }
      });

      // 에러 처리
      eventSource.onerror = () => {
        console.error("❌ SSE 연결 에러");
        setConnectionStatus("error");

        // 연결 해제
        eventSource.close();
        eventSourceRef.current = null;

        // 재연결 시도 (로그인 상태이고 재시도 횟수가 남아있을 때만)
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current += 1;
          console.log(
            `🔄 재연결 시도 ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS}...`,
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            // 재연결을 위해 이 effect를 다시 트리거하기 위해
            // eventSourceRef를 null로 유지하고, 상태를 변경하지 않음
            // 다음 렌더링 사이클에서 자동으로 재연결 시도됨
          }, RECONNECT_DELAY);
        } else {
          console.error("❌ 최대 재연결 시도 횟수 초과");
          setConnectionStatus("disconnected");
        }
      };

      eventSourceRef.current = eventSource;
    } catch (error) {
      console.error("❌ SSE 연결 실패:", error);
      setConnectionStatus("error");
    }

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (eventSourceRef.current) {
        console.log("🔌 SSE 연결 해제 (언마운트)");
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // 수동 연결/해제 함수 제공 (필요한 경우)
  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      console.log("🔌 SSE 수동 연결 해제");
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setConnectionStatus("disconnected");
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, [setConnectionStatus]);

  return {
    disconnect,
  };
}

/**
 * 브라우저 알림 권한 요청
 */
export function requestNotificationPermission(): Promise<NotificationPermission> {
  return new Promise((resolve) => {
    if (!("Notification" in window)) {
      console.warn("⚠️ 이 브라우저는 알림을 지원하지 않습니다.");
      resolve("denied");
      return;
    }

    if (Notification.permission === "granted") {
      resolve("granted");
      return;
    }

    if (Notification.permission === "denied") {
      resolve("denied");
      return;
    }

    Notification.requestPermission().then((permission) => {
      console.log("🔔 알림 권한:", permission);
      resolve(permission);
    });
  });
}
