import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios/axios";

interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordResponse {
  code: string;
  message: string;
  status: number;
}

/**
 * @todo 추후 비밀번호 찾기 정책 결정에 따른 로직 및 UI 수정 필요
 */
const forgotPasswordApi = async (
  request: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>(
    "/api/auth/forgot-password",
    request,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      console.log("✅ 비밀번호 재설정 이메일 발송 성공:", data);
    },
    onError: (error: any) => {
      console.error("❌ 비밀번호 재설정 이메일 발송 실패:", error);
    },
  });

  return {
    sendResetEmail: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};
