import { useQuery } from "@tanstack/react-query";
import { AdminProductsService } from "../services/adminProductsService";

interface UseAdminProductsParams {
  page?: number;
  size?: number;
  category?: string;
  status?: string;
  keyword?: string;
}

export const useAdminProducts = (params: UseAdminProductsParams = {}) => {
  return useQuery({
    queryKey: ["admin-products", params],
    queryFn: () => AdminProductsService.getProducts(params),
    staleTime: 1000 * 60, // 1분
  });
};
