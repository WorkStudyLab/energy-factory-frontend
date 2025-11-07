import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminProductsService } from "../services/adminProductsService";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types/product";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Product>;
    }) => AdminProductsService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast({
        title: "상품이 수정되었습니다.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "상품 수정 실패",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
