import { useQuery } from "@tanstack/react-query";
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
