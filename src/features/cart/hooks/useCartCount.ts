import { useEffect } from "react";
import { useCart } from "./useCart";
import { subscribeCartChange } from "@/utils/broadcastHelper";

/** Header에 장바구니에 담겨있는 아이템 개수를 표시하기 위한 Hook */
const useCartCount = () => {
  const { data, refetch } = useCart();
  const cartCount = data?.items?.length || 0;

  useEffect(() => {
    // 같은 탭 + 다른 탭 모두에서 장바구니 변경 이벤트 수신
    const unsubscribe = subscribeCartChange(() => {
      refetch();
    });

    return unsubscribe;
  }, [refetch]);

  return {
    cartCount,
  };
};

export default useCartCount;
