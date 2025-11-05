import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductsApiService } from "../services/productsApiService";
import type { ProductFilters } from "@/types/product";

interface UseInfiniteProductsParams extends Omit<ProductFilters, 'page'> {
  pageSize?: number;
}

const useInfiniteProducts = ({
  pageSize = 8,
  ...filters
}: UseInfiniteProductsParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["products", "infinite", filters],
    queryFn: ({ pageParam = 0 }) =>
      ProductsApiService.getProducts({
        ...filters,
        page: pageParam,
        size: pageSize,
      }),
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage;
      return pageInfo.last ? undefined : pageInfo.currentPage + 1;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export default useInfiniteProducts;
