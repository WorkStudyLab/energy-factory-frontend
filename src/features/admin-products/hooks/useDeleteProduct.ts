import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminProductsService } from "../services/adminProductsService";
import { useToast } from "@/hooks/use-toast";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => AdminProductsService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast({
        title: "상품이 삭제되었습니다.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "상품 삭제 실패",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
