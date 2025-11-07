import {
  Bell,
  Package,
  ShoppingBag,
  CheckCircle,
  Truck,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { subscribeNotificationChange } from "@/utils/notificationBroadcast";
import type { OrderNotificationType } from "@/types/notification";
import { formatDistanceToNow } from "@/lib/utils";
import { useEffect } from "react";

interface NotificationPopoverContentProps {
  className?: string;
}

const getNotificationIcon = (type: OrderNotificationType) => {
  switch (type) {
    case "ORDER_CONFIRMED":
      return <Package className="h-4 w-4 text-blue-600" />;
    case "ORDER_SHIPPED":
      return <Truck className="h-4 w-4 text-orange-600" />;
    case "ORDER_DELIVERED":
      return <ShoppingBag className="h-4 w-4 text-green-600" />;
    case "ORDER_CANCELLED":
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Bell className="h-4 w-4 text-gray-600" />;
  }
};

const getNotificationTypeLabel = (type: OrderNotificationType) => {
  switch (type) {
    case "ORDER_CONFIRMED":
      return "주문 확인";
    case "ORDER_SHIPPED":
      return "배송 시작";
    case "ORDER_DELIVERED":
      return "배송 완료";
    case "ORDER_CANCELLED":
      return "주문 취소";
    default:
      return "알림";
  }
};

export function NotificationPopoverContent({
  className,
}: NotificationPopoverContentProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotificationStore();

  // 다른 탭에서 알림 변경 시 localStorage에서 다시 로드
  useEffect(() => {
    const unsubscribe = subscribeNotificationChange(() => {
      const stored = localStorage.getItem("notification-storage");
      if (stored) {
        try {
          const data = JSON.parse(stored);
          if (data.state) {
            useNotificationStore.setState(data.state);
          }
        } catch (error) {
          console.error("알림 동기화 에러:", error);
        }
      }
    });

    return unsubscribe;
  }, []);

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  return (
    <div className={cn("w-80 max-h-96", className)}>
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">알림</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="h-5 text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
            onClick={handleMarkAllAsRead}
          >
            모두 읽음
          </Button>
        )}
      </div>

      <Separator />

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              새로운 알림이 없습니다
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-3 hover:bg-secondary/50 transition-colors cursor-pointer",
                  !notification.isRead && "bg-blue-50 dark:bg-blue-950/20",
                )}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs px-2 py-0 h-5">
                      {getNotificationTypeLabel(notification.type)}
                    </Badge>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-foreground mb-1 line-clamp-1">
                    {notification.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.timestamp))}
                  </p>
                </div>
                {notification.isRead && (
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <>
          <Separator />
          <div className="p-3">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-sm text-muted-foreground hover:text-foreground"
            >
              모든 알림 보기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
