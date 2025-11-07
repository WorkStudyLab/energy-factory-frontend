const CHANNEL_NAME = "notification_channel";
const CUSTOM_EVENT_NAME = "notification-changed";

// 'notification_channel'이라는 이름의 채널 생성 (다른 탭 간 통신)
const notificationChannel = new BroadcastChannel(CHANNEL_NAME);

/**
 * 알림 변경을 모든 탭에 전파
 * - 같은 탭: CustomEvent 사용
 * - 다른 탭: BroadcastChannel 사용
 */
export const broadcastNotificationChange = () => {
  // 1. 다른 탭으로 전파 (BroadcastChannel)
  notificationChannel.postMessage({
    type: "NOTIFICATION_CHANGED",
  });

  // 2. 같은 탭 내에서도 전파 (CustomEvent)
  window.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_NAME, {
      detail: { type: "NOTIFICATION_CHANGED" },
    }),
  );
};

/**
 * 알림 변경 이벤트 리스너 등록
 * @param callback - 이벤트 발생 시 실행할 콜백
 * @returns cleanup 함수
 */
export const subscribeNotificationChange = (callback: () => void) => {
  // 1. BroadcastChannel 리스너 (다른 탭)
  const channelHandler = () => {
    callback();
  };
  notificationChannel.onmessage = channelHandler;

  // 2. CustomEvent 리스너 (같은 탭)
  const eventHandler = () => {
    callback();
  };
  window.addEventListener(CUSTOM_EVENT_NAME, eventHandler);

  // cleanup 함수
  return () => {
    notificationChannel.onmessage = null;
    window.removeEventListener(CUSTOM_EVENT_NAME, eventHandler);
  };
};
