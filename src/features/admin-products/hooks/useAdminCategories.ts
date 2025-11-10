import { useQuery } from "@tanstack/react-query";
import { AdminProductsService } from "../services/adminProductsService";

export const useAdminCategories = () => {
  return useQuery({
    queryKey: ["admin-categories"],
    queryFn: () => AdminProductsService.getCategories(),
    staleTime: 1000 * 60 * 10, // 10분 캐싱
    retry: 1,
  });
};
