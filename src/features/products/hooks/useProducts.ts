import { useQuery } from "@tanstack/react-query";
import { ProductsApiService } from "../services/productsApiService";
import type { ProductFilters } from "@/types/product";

export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => ProductsApiService.getProducts(filters || {}),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
};