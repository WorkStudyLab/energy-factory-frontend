import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES } from "@/constants/routes";
import usePaymentSuccess from "@/features/order/hooks/usePaymentSuccess";

export default function OrderCompletePage() {
  const navigate = useNavigate();
  const { paymentConfirmResult, isLoading, error } = usePaymentSuccess();

  console.log("결제 완료 결과:", paymentConfirmResult);

  // 에러 발생 시 실패 페이지로 리디렉션
  useEffect(() => {
    if (error) {
      navigate(ROUTES.ORDER_FAIL, { replace: true });
    }
  }, [error, navigate]);

  // 결제 성공 시 OrderSuccessPage로 리디렉션 (orderNumber만 전달)
  useEffect(() => {
    if (paymentConfirmResult && !isLoading && !error) {
      navigate(ROUTES.ORDER_SUCCESS, {
        replace: true,
        state: { orderNumber: paymentConfirmResult.orderNumber },
      });
    }
  }, [paymentConfirmResult, isLoading, error, navigate]);

  if (isLoading) return <></>;

  return <></>;
}
