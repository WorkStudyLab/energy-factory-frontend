import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios/axios";

interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

interface ResetPasswordResponse {
  code: string;
  message: string;
  status: number;
  data: null;
}

const resetPasswordApi = async (
  request: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  const response = await api.post<ResetPasswordResponse>(
    "/api/auth/password-reset",
    request,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const useResetPassword = () => {
  const mutation = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      console.log("✅ 비밀번호 재설정 성공:", data);
    },
    onError: (error: any) => {
      console.error("❌ 비밀번호 재설정 실패:", error);
    },
  });

  return {
    resetPassword: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};
