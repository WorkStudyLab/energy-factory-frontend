import { api } from "@/lib/axios/axios";
import type {
  ProductFilters,
  ProductsResponse,
  ApiResponse,
} from "@/types/product";

export class PaymentApiService {
  private static readonly BASE_URL = "/api/orders/payments";

  // 1. 주문 생성 서비스
  // 2. 결제 완료 서비스

  //   static async getProducts(
  //     filters: ProductFilters = {},
  //   ): Promise<ProductsResponse> {
  //     const params = this.buildQueryParams(filters);

  //     const response = await api.get<ApiResponse<ProductsResponse>>(
  //       this.BASE_URL,
  //       { params },
  //     );

  //     return response.data.data;
  //   }

  private static buildQueryParams(
    filters: ProductFilters,
  ): Record<string, any> {
    const params: Record<string, any> = {};

    if (filters.category) params.category = filters.category;
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.status) params.status = filters.status;
    if (filters.minPrice !== undefined) params.minPrice = filters.minPrice;
    if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice;

    // Spring Boot Pageable 형식으로 파라미터 설정
    params.page = filters.page ?? 0;
    params.size = filters.size ?? 20;

    // sort 파라미터 처리 (Spring Boot 형식: sort=fieldName,direction)
    if (filters.sort) {
      params.sort = filters.sort;
    } else {
      params.sort = "createdAt,desc";
    }

    return params;
  }
}
