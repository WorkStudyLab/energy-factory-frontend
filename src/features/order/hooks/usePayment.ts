import { ROUTES } from "@/constants/routes";
import generateRandomString from "@/utils/generateRandomString";
import {
  loadTossPayments,
  type TossPaymentsPayment,
} from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { PaymentApiService } from "../services/paymentApiService";

/** Toss Client Key */
const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
/** @todo 사용자 ID 필요 */
const customerKey = generateRandomString();

/** @todo 추후 수정 필요 */
interface UsePaymentProps {
  amount: number;
}

const usePayment = ({ amount }: UsePaymentProps) => {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);

  // Toss Payments SDK 로드 및 Payment 객체 생성
  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const payment = tossPayments.payment({
          customerKey,
        });

        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }

    fetchPayment();
  }, [clientKey, customerKey]);

  const request = requestPayment(payment);

  return { request };
};

export default usePayment;

// ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
function requestPayment(payment: TossPaymentsPayment | null) {
  return async () => {
    if (!payment) {
      console.error("Payment is not initialized.");
      return;
    }

    /** 주문 정보 생성 */
    const { orderId, orderName, amount } =
      await PaymentApiService.createOrder();

    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    await payment.requestPayment({
      method: "CARD", // 카드 및 간편결제
      amount: {
        currency: "KRW",
        // value: selectedTotal,
        value: amount,
      },
      orderId: orderId,
      orderName: orderName,
      successUrl: window.location.origin + ROUTES.ORDER_COMPLETE, // 결제 요청이 성공하면 리다이렉트되는 URL
      failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL

      /** @todo 사용자 정보 입력 필요 */
      customerEmail: "exam@gmail.com",
      customerName: "김토스",
      // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
      // customerMobilePhone: "01012341234",
      card: {
        useEscrow: false,
        flowMode: "DEFAULT",
        useCardPoint: false,
        useAppCardOnly: false,
      },
    });
  };
}
