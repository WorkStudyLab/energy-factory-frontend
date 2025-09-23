import { ProductsApiService } from "../services/productsApiService";
import type { ProductFilters, ProductsResponse } from "@/types/product";

export interface IProductsRepository {
  getProducts(filters?: ProductFilters): Promise<ProductsResponse>;
}

export class ProductsRepository implements IProductsRepository {
  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    try {
      const data = await ProductsApiService.getProducts(filters);
      return data;
    } catch (error) {
      console.error("❌ Products Repository Error:", error);
      throw error;
    }
  }
}