import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { requestNotificationPermission } from "@/hooks/useOrderNotifications";
import type { OrderNotification } from "@/types/notification";

export default function NotificationTestPage() {
  const {
    notifications,
    unreadCount,
    connectionStatus,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useNotificationStore();

  // 테스트 알림 생성
  const createTestNotification = (
    type: OrderNotification["type"],
  ): OrderNotification => {
    const orderNumber = Math.floor(Math.random() * 10000000000);
    const messages = {
      ORDER_CONFIRMED: {
        title: "주문이 확인되었습니다",
        message: `주문번호 ${orderNumber}번 결제가 완료되었습니다. 빠르게 배송해드리겠습니다!`,
      },
      ORDER_SHIPPED: {
        title: "배송이 시작되었습니다",
        message: `주문번호 ${orderNumber}번 상품이 배송을 시작했습니다. 곧 받아보실 수 있습니다!`,
      },
      ORDER_DELIVERED: {
        title: "배송이 완료되었습니다",
        message: `주문번호 ${orderNumber}번 상품이 배송 완료되었습니다. 이용해주셔서 감사합니다!`,
      },
      ORDER_CANCELLED: {
        title: "주문이 취소되었습니다",
        message: `주문번호 ${orderNumber}번이 취소되었습니다. 환불은 2-3일 내에 완료됩니다.`,
      },
    };

    return {
      type,
      title: messages[type].title,
      message: messages[type].message,
      orderId: Math.floor(Math.random() * 1000),
      orderNumber,
      timestamp: new Date().toISOString(),
    };
  };

  // 브라우저 알림 권한 요청
  const handleRequestPermission = async () => {
    const permission = await requestNotificationPermission();
    alert(`브라우저 알림 권한: ${permission}`);
  };

  // 브라우저 알림 테스트
  const handleTestBrowserNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("테스트 알림", {
        body: "브라우저 알림이 정상적으로 작동합니다!",
        icon: "/favicon.ico",
      });
    } else {
      alert("브라우저 알림 권한이 없습니다. 먼저 권한을 요청해주세요.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">주문 알림 테스트</h1>

      {/* 연결 상태 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>SSE 연결 상태</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                connectionStatus === "connected" ? "default" : "secondary"
              }
            >
              {connectionStatus === "connected" && "🟢 연결됨"}
              {connectionStatus === "connecting" && "🟡 연결 중..."}
              {connectionStatus === "disconnected" && "🔴 연결 끊김"}
              {connectionStatus === "error" && "❌ 에러"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              읽지 않은 알림: {unreadCount}개 / 전체 알림: {notifications.length}
              개
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 브라우저 알림 설정 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>브라우저 알림 설정</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button onClick={handleRequestPermission}>알림 권한 요청</Button>
          <Button onClick={handleTestBrowserNotification} variant="outline">
            브라우저 알림 테스트
          </Button>
        </CardContent>
      </Card>

      {/* 테스트 알림 생성 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>테스트 알림 생성</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              addNotification(createTestNotification("ORDER_CONFIRMED"))
            }
            variant="outline"
          >
            주문 확인
          </Button>
          <Button
            onClick={() =>
              addNotification(createTestNotification("ORDER_SHIPPED"))
            }
            variant="outline"
          >
            배송 시작
          </Button>
          <Button
            onClick={() =>
              addNotification(createTestNotification("ORDER_DELIVERED"))
            }
            variant="outline"
          >
            배송 완료
          </Button>
          <Button
            onClick={() =>
              addNotification(createTestNotification("ORDER_CANCELLED"))
            }
            variant="outline"
          >
            주문 취소
          </Button>
        </CardContent>
      </Card>

      {/* 알림 관리 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>알림 관리</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button onClick={markAllAsRead} variant="outline">
            모두 읽음 처리
          </Button>
          <Button onClick={clearNotifications} variant="destructive">
            모든 알림 삭제
          </Button>
        </CardContent>
      </Card>

      {/* 알림 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>알림 목록 (localStorage에 저장됨)</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">알림이 없습니다.</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border rounded-lg ${
                    !notification.isRead ? "bg-blue-50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{notification.type}</Badge>
                        {!notification.isRead && (
                          <Badge variant="default" className="text-xs">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-medium text-sm">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        주문번호: {notification.orderNumber} | 주문 ID:{" "}
                        {notification.orderId}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markAsRead(notification.id)}
                      disabled={notification.isRead}
                    >
                      {notification.isRead ? "읽음" : "읽음 처리"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 설명 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>사용 방법</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>1. 로그인 후 이 페이지에 접속하면 자동으로 SSE 연결이 시작됩니다.</p>
          <p>
            2. "알림 권한 요청" 버튼을 클릭하여 브라우저 알림 권한을 허용하세요.
          </p>
          <p>
            3. "테스트 알림 생성" 버튼들을 클릭하여 다양한 유형의 알림을
            생성해보세요.
          </p>
          <p>
            4. 헤더의 종 아이콘을 클릭하면 실시간으로 알림 목록을 확인할 수
            있습니다.
          </p>
          <p>
            5. 실제 환경에서는 백엔드에서 SSE를 통해 알림이 자동으로
            전송됩니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
