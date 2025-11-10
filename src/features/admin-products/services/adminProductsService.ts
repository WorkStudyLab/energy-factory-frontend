import type { Product, ProductsResponse, ApiResponse, ProductServerDetail } from "@/types/product";
import { api } from "@/lib/axios/axios";

export class AdminProductsService {
  // 상품 목록 조회 (페이지네이션)
  static async getProducts(params: {
    page?: number;
    size?: number;
    category?: string;
    status?: string;
    keyword?: string;
  }): Promise<ProductsResponse> {
    const response = await api.get<ApiResponse<ProductsResponse>>(
      "/api/admin/products",
      {
        params: {
          page: params.page ?? 0,
          size: params.size ?? 10,
          category: params.category,
          status: params.status,
          keyword: params.keyword,
        },
      },
    );

    return response.data.data;
  }

  // 상품 단일 조회
  static async getProduct(id: number): Promise<Product | null> {
    try {
      const response = await api.get<ApiResponse<ProductServerDetail>>(
        `/api/admin/products/${id}`,
      );
      const serverData = response.data.data;

      // Tag[] 객체 배열을 string[] 배열로 변환
      // null 값을 undefined로 변환하여 Product 타입과 호환
      // variants에 availableStock 필드 추가
      return {
        ...serverData,
        tags: serverData.tags?.map(t => t.name) || [],
        originalPrice: serverData.originalPrice ?? undefined,
        discount: serverData.discount ?? undefined,
        variants: serverData.variants?.map(v => ({
          ...v,
          reservedStock: 0,
          availableStock: v.stock,
        })),
      };
    } catch (error) {
      return null;
    }
  }

  // 상품 생성
  static async createProduct(productData: Partial<Product>): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>(
      "/api/admin/products",
      {
        name: productData.name,
        brand: productData.brand,
        category: productData.category,
        price: productData.price,
        originalPrice: productData.originalPrice,
        discount: productData.discount,
        weight: productData.weight,
        weightUnit: productData.weightUnit,
        status: productData.status,
        imageUrl: productData.imageUrl,
        tags: productData.tags || [],
      },
    );

    return response.data.data;
  }

  // 상품 수정
  static async updateProduct(
    id: number,
    productData: Partial<Product>,
  ): Promise<Product> {
    const response = await api.put<ApiResponse<Product>>(
      `/api/admin/products/${id}`,
      {
        name: productData.name,
        brand: productData.brand,
        category: productData.category,
        price: productData.price,
        originalPrice: productData.originalPrice,
        discount: productData.discount,
        weight: productData.weight,
        weightUnit: productData.weightUnit,
        status: productData.status,
        imageUrl: productData.imageUrl,
        tags: productData.tags,
      },
    );

    return response.data.data;
  }

  // 상품 삭제
  static async deleteProduct(id: number): Promise<void> {
    await api.delete(`/api/admin/products/${id}`);
  }

  // 카테고리 목록 조회
  static async getCategories(): Promise<string[]> {
    const response = await api.get<ApiResponse<{ categories: string[] }>>(
      "/api/admin/products/categories",
    );
    return response.data.data.categories;
  }
}
