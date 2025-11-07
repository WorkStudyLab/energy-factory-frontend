import { useEffect } from "react";
import {
  useOrderNotifications,
  requestNotificationPermission,
} from "@/hooks/useOrderNotifications";
import { useAuthStore } from "@/stores/useAuthStore";

/**
 * 알림 프로바이더
 * 앱 전역에서 SSE 알림 연결을 관리합니다.
 */
export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();

  // SSE 연결 (로그인 상태일 때만)
  useOrderNotifications({
    enableBrowserNotification: true,
    onNotificationReceived: (notification) => {
      console.log("📬 새 알림:", notification);
    },
  });

  // 로그인 시 브라우저 알림 권한 요청
  useEffect(() => {
    if (isAuthenticated) {
      requestNotificationPermission().then((permission) => {
        if (permission === "granted") {
          console.log("✅ 브라우저 알림 권한 허용됨");
        } else if (permission === "denied") {
          console.log("❌ 브라우저 알림 권한 거부됨");
        }
      });
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
