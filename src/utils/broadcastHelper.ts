const CHANNEL_NAME = "cart_channel";
const CUSTOM_EVENT_NAME = "cart-changed";

// 'cart_channel'이라는 이름의 채널 생성 (다른 탭 간 통신)
const cartChannel = new BroadcastChannel(CHANNEL_NAME);

/**
 * 장바구니 변경을 모든 탭에 전파
 * - 같은 탭: CustomEvent 사용
 * - 다른 탭: BroadcastChannel 사용
 */
const broadcastCartChange = async () => {
  // API 처리 속도 차이를 고려하여 약간의 지연 추가
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 1. 다른 탭으로 전파 (BroadcastChannel)
  cartChannel.postMessage({
    type: "CART_CHANGED",
  });

  // 2. 같은 탭 내에서도 전파 (CustomEvent)
  window.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_NAME, {
      detail: { type: "CART_CHANGED" },
    }),
  );
};

/**
 * 장바구니 변경 이벤트 리스너 등록
 * @param callback - 이벤트 발생 시 실행할 콜백
 * @returns cleanup 함수
 */
const subscribeCartChange = (callback: () => void) => {
  // 1. BroadcastChannel 리스너 (다른 탭)
  const channelHandler = () => {
    callback();
  };
  cartChannel.onmessage = channelHandler;

  // 2. CustomEvent 리스너 (같은 탭)
  const eventHandler = () => {
    callback();
  };
  window.addEventListener(CUSTOM_EVENT_NAME, eventHandler);

  // cleanup 함수
  return () => {
    cartChannel.onmessage = null;
    window.removeEventListener(CUSTOM_EVENT_NAME, eventHandler);
  };
};

export { cartChannel, broadcastCartChange, subscribeCartChange };
