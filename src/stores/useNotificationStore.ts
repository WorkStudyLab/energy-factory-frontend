import { create } from "zustand";
import { persist } from "zustand/middleware";
import { broadcastNotificationChange } from "@/utils/notificationBroadcast";
import type {
  StoredNotification,
  OrderNotification,
  SSEConnectionStatus,
} from "@/types/notification";

interface NotificationStore {
  // 상태
  notifications: StoredNotification[];
  connectionStatus: SSEConnectionStatus;
  unreadCount: number;

  // 액션
  addNotification: (notification: OrderNotification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  setConnectionStatus: (status: SSEConnectionStatus) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      // 초기 상태
      notifications: [],
      connectionStatus: "disconnected",
      unreadCount: 0,

      // 새 알림 추가
      addNotification: (notification: OrderNotification) => {
        const newNotification: StoredNotification = {
          ...notification,
          id: `${notification.orderNumber}-${Date.now()}`,
          isRead: false,
          createdAt: new Date(),
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));

        // 모든 탭에 변경사항 전파
        broadcastNotificationChange();
      },

      // 특정 알림 읽음 처리
      markAsRead: (id: string) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          if (!notification || notification.isRead) {
            return state;
          }

          broadcastNotificationChange();

          return {
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, isRead: true } : n,
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          };
        });
      },

      // 모든 알림 읽음 처리
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            isRead: true,
          })),
          unreadCount: 0,
        }));

        broadcastNotificationChange();
      },

      // 알림 삭제
      removeNotification: (id: string) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          const isUnread = notification && !notification.isRead;

          broadcastNotificationChange();

          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: isUnread
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        });
      },

      // 모든 알림 삭제
      clearNotifications: () => {
        set({
          notifications: [],
          unreadCount: 0,
        });

        broadcastNotificationChange();
      },

      // SSE 연결 상태 변경
      setConnectionStatus: (status: SSEConnectionStatus) => {
        set({ connectionStatus: status });
      },
    }),
    {
      name: "notification-storage", // localStorage 키
    },
  ),
);
