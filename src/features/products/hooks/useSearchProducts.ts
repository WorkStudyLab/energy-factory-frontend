import { useQuery } from "@tanstack/react-query";
import { ProductsApiService } from "../services/productsApiService";
import type { ProductFilters } from "@/types/product";

interface UseSearchProductsParams {
  query: string;
  filters?: Omit<ProductFilters, 'keyword'>;
  enabled?: boolean;
}

export const useSearchProducts = ({
  query,
  filters,
  enabled = true
}: UseSearchProductsParams) => {
  return useQuery({
    queryKey: ["products", "search", query, filters],
    queryFn: () => ProductsApiService.searchProducts(query, filters || {}),
    enabled: enabled && query.length > 0,
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
};
