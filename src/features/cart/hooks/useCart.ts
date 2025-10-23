import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CartApiService } from "../services/cartApiService";
import { useAuthStore } from "@/stores/useAuthStore";

/**
 * 장바구니 조회 Hook
 * - 로그인 상태에서만 API 호출
 * - React Query로 캐싱 및 상태 관리
 */
export const useCart = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["cart"],
    queryFn: () => CartApiService.getCart(),
    enabled: isAuthenticated, // 로그인 상태에서만 호출
    staleTime: 1 * 60 * 1000, // 1분간 캐시 유지
    retry: 1,
  });
};

/**
 * 장바구니 수량 변경 Hook
 * - 수량 변경 API 호출
 * - 성공 시 장바구니 데이터 refetch
 */
export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) => CartApiService.updateQuantity(cartItemId, quantity),
    onSuccess: () => {
      // 장바구니 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

/**
 * 장바구니 아이템 삭제 Hook (단일)
 * - 개별 아이템 삭제 API 호출
 * - 성공 시 장바구니 데이터 refetch
 */
export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: number) =>
      CartApiService.deleteCartItem(cartItemId),
    onSuccess: () => {
      // 장바구니 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

/**
 * 장바구니 선택 삭제 Hook (여러 개)
 * - 선택된 여러 아이템 삭제 API 호출
 * - 성공 시 장바구니 데이터 refetch
 */
export const useDeleteSelectedItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemIds: number[]) =>
      CartApiService.deleteSelectedItems(cartItemIds),
    onSuccess: () => {
      // 장바구니 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

/**
 * 장바구니 전체 삭제 Hook
 * - 전체 삭제 API 호출
 * - 성공 시 장바구니 데이터 refetch
 */
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => CartApiService.clearCart(),
    onSuccess: () => {
      // 장바구니 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
