import { api } from "@/lib/axios/axios";
import type {
  ProductFilters,
  ProductsResponse,
  ApiResponse,
} from "@/types/product";

export class ProductsApiService {
  private static readonly BASE_URL = "/api/products";

  static async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const params = this.buildQueryParams(filters);
    
    const response = await api.get<ApiResponse<ProductsResponse>>(
      this.BASE_URL,
      { params }
    );

    return response.data.data;
  }

  // 카테고리 목록 조회
  static async getCategories(): Promise<string[]> {
    const response = await api.get<ApiResponse<string[]>>(
      `${this.BASE_URL}/categories`
    );

    return response.data.data;
  }

  // 카테고리별 상품 조회
  static async getProductsByCategory(
    category: string,
    filters: Omit<ProductFilters, 'category'> = {}
  ): Promise<ProductsResponse> {
    const params = this.buildQueryParams(filters);

    const response = await api.get<ApiResponse<ProductsResponse>>(
      `${this.BASE_URL}/categories/${encodeURIComponent(category)}`,
      { params }
    );

    return response.data.data;
  }

  // 상품 검색
  static async searchProducts(
    query: string,
    filters: Omit<ProductFilters, 'keyword'> = {}
  ): Promise<ProductsResponse> {
    const params = this.buildQueryParams({ ...filters, keyword: query });

    const response = await api.get<ApiResponse<ProductsResponse>>(
      `${this.BASE_URL}/search`,
      { params: { ...params, q: query } }
    );

    return response.data.data;
  }

  private static buildQueryParams(filters: ProductFilters): Record<string, any> {
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