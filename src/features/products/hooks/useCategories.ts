import { useQuery } from "@tanstack/react-query";
import { ProductsApiService } from "../services/productsApiService";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => ProductsApiService.getCategories(),
    staleTime: 1000 * 60 * 10, // 10분 캐싱 (카테고리는 자주 변경되지 않음)
    retry: 1,
  });
};
