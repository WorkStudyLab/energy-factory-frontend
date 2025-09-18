import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios/axios";
import { useNavigate } from "react-router-dom";

/**
 * @todo Auth API 요청시 Password 암호화 처리
 * @todo 로그인 성공 시 토큰 암호화 저장
 */

// 로그인 요청 타입
interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
}

// 로그인 API 함수
const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials);
  return response.data;
};

// useLogin hook
export const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // 토큰을 localStorage에 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // 사용자 정보 저장 (선택사항)
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("✅ 로그인 성공:", data.user);

      // 홈페이지로 리다이렉트
      navigate("/");
    },
    onError: (error: any) => {
      console.error("❌ 로그인 실패:", error);
      // 에러는 UI에서 처리하므로 여기서는 로깅만
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};
