import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminProductsService } from "../services/adminProductsService";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types/product";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (productData: Partial<Product>) =>
      AdminProductsService.createProduct(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast({
        title: "상품이 등록되었습니다.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "상품 등록 실패",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
