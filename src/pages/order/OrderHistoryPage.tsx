import { useMemo } from "react";
import useInfiniteOrderList from "@/features/order/hooks/useOrderList";
import useIntersectionObserver from "@/features/order/hooks/useIntersectionObserver";
import OrderList from "@/features/order/ui/orderList/OrderList";

export default function OrderHistoryPage() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteOrderList({
      pageSize: 10,
    });

  // 모든 페이지의 주문 목록을 하나의 배열로 합침
  const allOrders = useMemo(() => {
    return data?.pages.flatMap((page) => page.orders) ?? [];
  }, [data]);

  // IntersectionObserver 설정
  const observerTarget = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

  // 재주문 함수
  const handleReorder = (orderId: number) => {
    // 장바구니에 상품들 추가하는 로직
    console.log("재주문:", orderId);
    // onNavigate && onNavigate("cart")
  };

  // 주문 취소 함수
  const handleCancelOrder = (orderId: number) => {
    console.log("주문 취소:", orderId);
    // 실제로는 API 호출
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        {/* 헤더 */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">주문 내역</h1>
          <p className="text-gray-500">
            Energy Factory에서 주문한 모든 상품을 확인하고 관리하세요
          </p>
        </div>

        {/* 주문 목록 */}
        <OrderList
          orders={allOrders}
          onReorder={handleReorder}
          onCancelOrder={handleCancelOrder}
          observerTarget={observerTarget}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
