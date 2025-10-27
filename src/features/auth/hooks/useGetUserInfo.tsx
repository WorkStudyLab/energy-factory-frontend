import { useQuery } from "@tanstack/react-query";
import { AuthApiService } from "../services/AuthApiService";

/**
 * 회원 정보 조회 Custom Hook
 */
export const useGetUserInfo = (userId: number) => {
  return useQuery({
    queryKey: ["userinfo"],
    queryFn: () => AuthApiService.getUserInfo(userId),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
};
