import { useState, useEffect, useRef } from "react";
import { PaymentApiService } from "../services/paymentApiService";
import { useNotificationStore } from "@/stores/useNotificationStore";
import type { Payment } from "@/types/order";

const usePaymentSuccess = () => {
  const [paymentConfirmResult, setPaymentConfirmResult] =
    useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const hasCalledRef = useRef(false);
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    // 이미 호출되었으면 무시 (React Strict Mode 중복 실행 방지)
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    const fetchPaymentResult = async () => {
      try {
        setIsLoading(true);

        // URL에서 쿼리 파라미터 추출
        const urlParams = new URLSearchParams(window.location.search);
        const paymentKey = urlParams.get("paymentKey");
        const orderId = urlParams.get("orderId");
        const amount = urlParams.get("amount");

        if (!paymentKey || !orderId || !amount) {
          throw new Error("필수 결제 정보가 누락되었습니다.");
        }

        const paymentData = {
          paymentKey,
          orderId,
          amount: Number(amount),
        };

        const result = await PaymentApiService.completePayment(paymentData);
        console.log("결제 완료 API 결과:", result);
        setPaymentConfirmResult(result);

        // 결제 완료 알림 추가
        addNotification({
          type: "ORDER_CONFIRMED",
          title: "주문이 확인되었습니다",
          message: `주문번호 ${result.orderNumber}번 결제가 완료되었습니다. 빠르게 배송해드리겠습니다!`,
          orderId: result.orderId || 0, // TODO: API에서 orderId 추가 필요
          orderNumber: result.orderNumber,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        console.error("결제 완료 처리 중 오류:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentResult();
  }, []);

  return {
    paymentConfirmResult,
    isLoading,
    error,
  };
};

export default usePaymentSuccess;
