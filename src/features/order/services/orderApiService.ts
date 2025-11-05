import { api } from "@/lib/axios/axios";
import type { OrderListApiResponse, OrderListData, OrderListQueryParams } from "@/types/order";

export class OrderApiService {
  private static readonly BASE_URL = "/api/orders";

  /** 주문 목록 조회 API */
  static async getOrderList(params: OrderListQueryParams): Promise<OrderListData> {
    const response = await api.get<OrderListApiResponse>(`${this.BASE_URL}`, {
      params: {
        userId: params.userId,
        status: params.status,
        paymentStatus: params.paymentStatus,
        page: params.pageable.page,
        size: params.pageable.size,
      },
    });

    return response.data.data;
  }
}
