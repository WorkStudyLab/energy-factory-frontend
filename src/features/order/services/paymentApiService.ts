// import { api } from "@/lib/axios/axios";
// import type {
//   ProductFilters,
//   ProductsResponse,
//   ApiResponse,
// } from "@/types/product";
import generateRandomString from "@/utils/generateRandomString";

export class PaymentApiService {
  private static readonly BASE_URL = "/api/orders/payments";

  // 1. 주문 생성 서비스
  /** @todo 상세 기능 명세 필요 */
  //   static async createOrder(orderData: any): Promise<any> {
  //     const response = await api.post<ApiResponse<any>>(
  //       `${this.BASE_URL}/create-order`,
  //       orderData,
  //     );

  //     return response.data.data;
  //   }

  // 1.1 주문 생성 서비스 테스트용
  static async createOrder(): Promise<{
    orderId: string;
    orderName: string;
    amount: number;
  }> {
    const response = {
      orderId: generateRandomString(),
      orderName: "테스트주문",
      amount: 1000,
    };

    return response;
  }

  // 2. 결제 완료 서비스
  //   static async completePayment(paymentData: any): Promise<any> {
  //     const response = await api.post<ApiResponse<any>>(
  //       `${this.BASE_URL}/complete-payment`,
  //       paymentData,
  //     );

  //     return response.data.data;
  //   }
  //   2.1 결제 완료 서비스 테스트용
  static async completePayment(): Promise<{
    orderId: string;
    orderName: string;
    amount: number;
  }> {
    // 3초 지연
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 에러 테스트
    // throw new Error("결제 완료 처리 중 오류가 발생했습니다.");

    const response = {
      orderId: generateRandomString(),
      orderName: "테스트주문",
      amount: 1000,
    };

    return response;
  }
}
