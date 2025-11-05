import { useState, useEffect, useRef } from "react";
import { PaymentApiService } from "../services/paymentApiService";
import type { Payment } from "@/types/order";

const usePaymentSuccess = () => {
  const [paymentConfirmResult, setPaymentConfirmResult] =
    useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const hasCalledRef = useRef(false);

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
