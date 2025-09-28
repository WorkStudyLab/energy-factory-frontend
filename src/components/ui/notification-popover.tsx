import { Bell, Package, ShoppingBag, Gift, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "order" | "promotion" | "system" | "delivery";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationPopoverContentProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  className?: string;
}

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return <Package className="h-4 w-4 text-blue-600" />;
    case "promotion":
      return <Gift className="h-4 w-4 text-green-600" />;
    case "delivery":
      return <ShoppingBag className="h-4 w-4 text-orange-600" />;
    case "system":
      return <Bell className="h-4 w-4 text-gray-600" />;
    default:
      return <Bell className="h-4 w-4 text-gray-600" />;
  }
};

const getNotificationTypeLabel = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return "주문";
    case "promotion":
      return "프로모션";
    case "delivery":
      return "배송";
    case "system":
      return "시스템";
    default:
      return "알림";
  }
};

const defaultNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "주문이 접수되었습니다",
    message: "주문번호 #EF2024001이 성공적으로 접수되었습니다.",
    timestamp: "2시간 전",
    isRead: false,
  },
  {
    id: "2",
    type: "delivery",
    title: "배송이 시작되었습니다",
    message: "고객님의 상품이 배송 중입니다. 예상 도착일: 내일",
    timestamp: "5시간 전",
    isRead: false,
  },
  {
    id: "3",
    type: "promotion",
    title: "신규 할인 이벤트",
    message: "프리미엄 단백질 보충제 20% 할인! 지금 확인해보세요.",
    timestamp: "1일 전",
    isRead: true,
  },
  {
    id: "4",
    type: "system",
    title: "개인정보 처리방침 업데이트",
    message: "개인정보 처리방침이 업데이트되었습니다.",
    timestamp: "3일 전",
    isRead: true,
  },
];

export function NotificationPopoverContent({
  notifications = defaultNotifications,
  onMarkAsRead,
  onMarkAllAsRead,
  className,
}: NotificationPopoverContentProps) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    onMarkAsRead?.(id);
  };

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead?.();
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
                    {notification.timestamp}
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
