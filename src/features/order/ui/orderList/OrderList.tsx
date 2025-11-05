import type { OrderListItem } from "@/types/order";
import EmptyOrder from "./EmptyOrder";
import OrderItem from "./OrderItem";

interface OrderListProps {
  orders: OrderListItem[];
  onReorder: (orderId: number) => void;
  onCancelOrder: (orderId: number) => void;
  observerTarget?: React.RefObject<HTMLDivElement>;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
}

const OrderList = ({
  orders,
  onReorder,
  onCancelOrder,
  observerTarget,
  isLoading,
  isFetchingNextPage,
}: OrderListProps) => {
  if (orders.length === 0 && !isLoading) {
    return <EmptyOrder />;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onReorder={onReorder}
          onCancelOrder={onCancelOrder}
        />
      ))}

      {/* IntersectionObserver 타겟 */}
      {observerTarget && <div ref={observerTarget} className="h-10" />}

      {/* 로딩 인디케이터 */}
      {(isLoading || isFetchingNextPage) && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      )}
    </div>
  );
};

export default OrderList;
