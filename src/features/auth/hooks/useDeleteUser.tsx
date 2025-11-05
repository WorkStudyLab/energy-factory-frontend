import { useMutation } from "@tanstack/react-query";
import { AuthApiService } from "../services/AuthApiService";

/**
 * 회원 탈퇴 Custom Hook (토큰에서 userId 자동 추출)
 */
export const useDeleteUser = () => {
  const mutation = useMutation({
    mutationFn: () => AuthApiService.deleteUser(),
    onSuccess: (data) => {
      console.log("✅ 회원 탈퇴 성공:", data);
      // 추가적인 처리 (예: 로그아웃, 리다이렉트 등)
    },
    onError: (error: any) => {
      console.error("❌ 회원 탈퇴 실패:", error);
    },
  });
  return {
    deleteUser: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
