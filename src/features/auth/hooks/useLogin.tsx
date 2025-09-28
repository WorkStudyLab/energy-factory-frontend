import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios/axios";
import { useNavigate } from "react-router-dom";

/**
 * @todo Auth API 요청시 Password 암호화 처리
 * @todo 로그인 성공 시 토큰 암호화 저장
 */

// 로그인 요청 타입
interface LoginRequest {
  username: string;
  password: string;
}

// 로그인 응답 타입
interface LoginResponse {
  code: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  desc: string;
  status: number;
}

// 로그인 API 함수
const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/api/auth/login",
    credentials,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
  return response.data;
};

// useLogin hook
export const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // 토큰을 localStorage에 저장
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      navigate("/");
    },
    onError: (error: any) => {
      console.error("❌ 로그인 실패:", error);
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
