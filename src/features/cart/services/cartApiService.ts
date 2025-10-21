import api from "@/lib/axios/axios";
import type { ApiResponse, Cart } from "@/types/cart";

export class CartApiService {
  /**
   * 장바구니 조회
   * @returns 장바구니 전체 데이터
   */
  static async getCart(): Promise<Cart> {
    const response = await api.get<ApiResponse<Cart>>("/api/cart");
    return response.data.data;
  }
}
