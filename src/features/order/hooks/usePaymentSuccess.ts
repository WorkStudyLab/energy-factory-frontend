import { useState, useEffect } from "react";
import { PaymentApiService } from "../services/paymentApiService";

interface PaymentConfirmResult {
  orderId: string;
  orderName: string;
  amount: number;
}

const usePaymentSuccess = () => {
  const [paymentConfirmResult, setPaymentConfirmResult] =
    useState<PaymentConfirmResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        setIsLoading(true);
        const result = await PaymentApiService.completePayment();
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
