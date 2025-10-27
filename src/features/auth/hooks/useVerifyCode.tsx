import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios/axios";

interface VerifyCodeRequest {
  email: string;
  code: string;
}

interface VerifyCodeData {
  resetToken: string;
  message: string;
}

interface VerifyCodeResponse {
  code: string;
  message: string;
  status: number;
  data: VerifyCodeData;
}

const verifyCodeApi = async (
  request: VerifyCodeRequest,
): Promise<VerifyCodeResponse> => {
  const response = await api.post<VerifyCodeResponse>(
    "/api/auth/password-reset/verify-code",
    request,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const useVerifyCode = () => {
  const mutation = useMutation({
    mutationFn: verifyCodeApi,
    onSuccess: (data) => {
      console.log("✅ 인증 코드 검증 성공:", data);
    },
    onError: (error: any) => {
      console.error("❌ 인증 코드 검증 실패:", error);
    },
  });

  return {
    verifyCode: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};
