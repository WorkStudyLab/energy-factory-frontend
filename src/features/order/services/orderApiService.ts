import { api } from "@/lib/axios/axios";
import type {
  OrderListApiResponse,
  OrderListData,
  OrderListQueryParams,
  OrderApiResponse,
  Order,
} from "@/types/order";

export class OrderApiService {
  private static readonly BASE_URL = "/api/orders";

  /** 주문 목록 조회 API */
  static async getOrderList(
    params: OrderListQueryParams,
  ): Promise<OrderListData> {
    const response = await api.get<OrderListApiResponse>(`${this.BASE_URL}`, {
      params: {
        status: params.status,
        paymentStatus: params.paymentStatus,
        page: params.pageable.page,
        size: params.pageable.size,
      },
    });

    return response.data.data;
  }

  /** 주문 상세 조회 API */
  static async getOrderDetail(orderNumber: number): Promise<Order> {
    const response = await api.get<OrderApiResponse>(
      `${this.BASE_URL}/${orderNumber}`,
    );

    return response.data.data;
  }
}
