import { useEffect } from "react";
import { useCart } from "./useCart";

const CHANNEL_NAME = "cart_channel";
// 'cart_channel'이라는 이름의 채널 생성 (모든 탭에서 실행)
export const cartChannel = new BroadcastChannel(CHANNEL_NAME);

/** Header에 장바구니에 담겨있는 아이템 개수를 표시하기 위한 Hook */
const useCartCount = () => {
  const { data, refetch } = useCart();
  const cartCount = data?.items?.length || 0;

  // 다른 탭에서 장바구니 변경 전파 이벤트 수신
  useEffect(() => {
    cartChannel.onmessage = () => {
      refetch();
    };
  }, []);

  return {
    cartCount,
  };
};

export default useCartCount;
