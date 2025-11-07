import { useState, useEffect } from "react";
import { OrderApiService } from "../services/orderApiService";
import type { Order } from "@/types/order";

interface UseOrderDetailResult {
  order: Order | null;
  isLoading: boolean;
  error: Error | null;
}

export const useOrderDetail = (
  orderNumber: number | null,
): UseOrderDetailResult => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!orderNumber) {
      setIsLoading(false);
      return;
    }

    const fetchOrderDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await OrderApiService.getOrderDetail(orderNumber);
        setOrder(data);
      } catch (err) {
        console.error("주문 상세 조회 실패:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("주문 조회 중 오류가 발생했습니다."),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderNumber]);

  return { order, isLoading, error };
};
