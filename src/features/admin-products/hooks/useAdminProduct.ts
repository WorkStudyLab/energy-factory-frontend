import { useQuery } from "@tanstack/react-query";
import { AdminProductsService } from "../services/adminProductsService";

export const useAdminProduct = (id: number) => {
  return useQuery({
    queryKey: ["admin-product", id],
    queryFn: () => AdminProductsService.getProduct(id),
    staleTime: 1000 * 60, // 1분
  });
};
