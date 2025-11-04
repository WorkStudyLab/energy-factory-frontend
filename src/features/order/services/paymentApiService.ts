import { api } from "@/lib/axios/axios";
import type {
  ConfirmPaymentApiResponse,
  ConfirmPaymentRequest,
  CreateOrderRequest,
  Order,
  OrderApiResponse,
  Payment,
} from "@/types/order";

export class PaymentApiService {
  private static readonly BASE_URL = "/api/orders";

  // 1. 주문 생성 서비스
  static async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const response = await api.post<OrderApiResponse>(
      `${this.BASE_URL}?userId=39`, // @todo userId 서버 수정시 제거 필요
      orderData,
    );

    return response.data.data;
  }

  // 2. 결제 완료 서비스
  static async completePayment(
    paymentData: ConfirmPaymentRequest,
  ): Promise<Payment> {
    const response = await api.post<ConfirmPaymentApiResponse>(
      `/api/payments/toss/confirm`,
      paymentData,
    );

    return response.data.data;
  }
  //   2.1 결제 완료 서비스 테스트용
  // static async completePayment(): Promise<{
  //   orderId: string;
  //   orderName: string;
  //   amount: number;
  // }> {
  //   // 3초 지연
  //   await new Promise((resolve) => setTimeout(resolve, 3000));

  //   // 에러 테스트
  //   // throw new Error("결제 완료 처리 중 오류가 발생했습니다.");

  //   const response = {
  //     orderId: generateRandomString(),
  //     orderName: "테스트주문",
  //     amount: 1000,
  //   };

  //   return response;
  // }
}
