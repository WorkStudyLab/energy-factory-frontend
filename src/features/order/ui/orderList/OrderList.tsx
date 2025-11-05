import type { OrderListItem } from "@/types/order";
import EmptyOrder from "./EmptyOrder";
import OrderItem from "./OrderItem";

interface OrderListProps {
  orders: OrderListItem[];
  onReorder: (orderId: number) => void;
  onCancelOrder: (orderId: number) => void;
}

const OrderList = ({ orders, onReorder, onCancelOrder }: OrderListProps) => {
  if (orders.length === 0) {
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
    </div>
  );
};

export default OrderList;
