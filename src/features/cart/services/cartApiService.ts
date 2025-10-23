import api from "@/lib/axios/axios";
import type { ApiResponse, Cart, CartItem } from "@/types/cart";

export interface AddToCartRequest {
  productId: number;
  variantId: number;
  quantity: number;
}

export class CartApiService {
  /**
   * 장바구니 조회
   * @returns 장바구니 전체 데이터
   */
  static async getCart(): Promise<Cart> {
    const response = await api.get<ApiResponse<Cart>>("/api/cart");
    const cart = response.data.data;

    // API 응답 데이터를 UI 친화적으로 변환
    const transformedCart: Cart = {
      ...cart,
      items: cart.items.map(item => ({
        ...item,
        imageUrl: item.productImageUrl, // 별칭 추가
        finalPrice: item.totalPrice / item.quantity, // 단가 계산
        discountRate: 0, // 할인율 (현재는 0, 추후 API에서 제공 시 사용)
      })),
      totalDiscount: 0, // 할인 총액 (현재는 0, 추후 계산)
    };

    return transformedCart;
  }

  /**
   * 장바구니에 상품 추가
   * @param data - 추가할 상품 정보 (productId, variantId, quantity)
   * @returns 추가된 장바구니 아이템
   */
  static async addToCart(data: AddToCartRequest): Promise<CartItem> {
    const response = await api.post<ApiResponse<CartItem>>("/api/cart", data);
    const item = response.data.data;

    // API 응답 데이터를 UI 친화적으로 변환
    return {
      ...item,
      imageUrl: item.productImageUrl,
      finalPrice: item.totalPrice / item.quantity,
      discountRate: 0,
    };
  }

  /**
   * 장바구니 아이템 수량 변경
   * @param cartItemId - 장바구니 아이템 ID
   * @param quantity - 변경할 수량 (1~999)
   * @returns 수정된 장바구니 아이템
   */
  static async updateQuantity(
    cartItemId: number,
    quantity: number,
  ): Promise<CartItem> {
    const response = await api.patch<ApiResponse<CartItem>>(
      `/api/cart/${cartItemId}`,
      { quantity },
    );
    const item = response.data.data;

    // API 응답 데이터를 UI 친화적으로 변환
    return {
      ...item,
      imageUrl: item.productImageUrl,
      finalPrice: item.totalPrice / item.quantity,
      discountRate: 0,
    };
  }
}
