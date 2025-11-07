import type { Product, ProductsResponse, PageInfo } from "@/types/product";
import { dummyAdminProducts } from "../constants/dummyData";

// 더미 서비스 - 추후 실제 API로 교체 예정
export class AdminProductsService {
  // 상품 목록 조회 (페이지네이션)
  static async getProducts(params: {
    page?: number;
    size?: number;
    category?: string;
    status?: string;
    keyword?: string;
  }): Promise<ProductsResponse> {
    // 실제 API 호출로 교체될 부분
    await new Promise((resolve) => setTimeout(resolve, 300)); // 네트워크 지연 시뮬레이션

    let filteredProducts = [...dummyAdminProducts];

    // 필터링
    if (params.category && params.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === params.category,
      );
    }

    if (params.status && params.status !== "all") {
      filteredProducts = filteredProducts.filter(
        (p) => p.status === params.status,
      );
    }

    if (params.keyword) {
      const keyword = params.keyword.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          p.brand.toLowerCase().includes(keyword) ||
          p.tags.some((tag) => tag.toLowerCase().includes(keyword)),
      );
    }

    // 페이지네이션
    const page = params.page ?? 0;
    const size = params.size ?? 10;
    const start = page * size;
    const end = start + size;
    const paginatedProducts = filteredProducts.slice(start, end);

    const pageInfo: PageInfo = {
      currentPage: page,
      pageSize: size,
      totalElements: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / size),
      first: page === 0,
      last: end >= filteredProducts.length,
    };

    return {
      products: paginatedProducts,
      pageInfo,
    };
  }

  // 상품 단일 조회
  static async getProduct(id: number): Promise<Product | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const product = dummyAdminProducts.find((p) => p.id === id);
    return product || null;
  }

  // 상품 생성
  static async createProduct(productData: Partial<Product>): Promise<Product> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newProduct: Product = {
      id: Date.now(), // 임시 ID
      name: productData.name || "",
      price: productData.price || 0,
      category: productData.category || "기타",
      imageUrl: productData.imageUrl || "https://via.placeholder.com/300",
      brand: productData.brand || "",
      weight: productData.weight || 0,
      weightUnit: productData.weightUnit || "g",
      stock: productData.stock || 0,
      status: productData.status || "AVAILABLE",
      averageRating: 0,
      reviewCount: 0,
      tags: productData.tags || [],
      originalPrice: productData.originalPrice,
      discount: productData.discount,
    };

    // 더미 데이터에 추가
    dummyAdminProducts.unshift(newProduct);

    return newProduct;
  }

  // 상품 수정
  static async updateProduct(
    id: number,
    productData: Partial<Product>,
  ): Promise<Product> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = dummyAdminProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("상품을 찾을 수 없습니다.");
    }

    const updatedProduct = {
      ...dummyAdminProducts[index],
      ...productData,
    };

    dummyAdminProducts[index] = updatedProduct;

    return updatedProduct;
  }

  // 상품 삭제
  static async deleteProduct(id: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const index = dummyAdminProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("상품을 찾을 수 없습니다.");
    }

    dummyAdminProducts.splice(index, 1);
  }

  // 여러 상품 일괄 삭제
  static async deleteProducts(ids: number[]): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    ids.forEach((id) => {
      const index = dummyAdminProducts.findIndex((p) => p.id === id);
      if (index !== -1) {
        dummyAdminProducts.splice(index, 1);
      }
    });
  }
}
