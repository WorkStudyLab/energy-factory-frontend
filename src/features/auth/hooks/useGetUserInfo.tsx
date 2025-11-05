import { useQuery } from "@tanstack/react-query";
import { AuthApiService } from "../services/AuthApiService";

/**
 * 회원 정보 조회 Custom Hook (토큰에서 userId 자동 추출)
 */
export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["userinfo"],
    queryFn: () => AuthApiService.getUserInfo(),
    retry: 1,
  });
};
