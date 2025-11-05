import useOrderList from "@/features/order/hooks/useOrderList";
import OrderList from "@/features/order/ui/orderList/OrderList";

export default function OrderHistoryPage() {
  const { data, isLoading } = useOrderList({
    userId: 39, // @todo userId 서버 수정시 제거 필요
    pageable: {
      page: 0, // @todo 페이징 기능 추가 필요
      size: 50,
    },
  });

  if (isLoading || !data) {
    return <div></div>;
  }

  const { orders } = data;

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
          orders={orders}
          onReorder={handleReorder}
          onCancelOrder={handleCancelOrder}
        />
      </div>
    </div>
  );
}
