import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

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
  code: string;
  data: {
    accessToken: string;
    tokenType: string;
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
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

// useLogin hook
export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // 토큰은 HttpOnly 쿠키로 자동 저장되므로 별도 저장 불필요
      // 로그인 상태만 저장
      login(
        {
          id: "", // TODO: 사용자 정보 API 연동 시 실제 값으로 교체
          email: "",
          name: "",
        },
        "", // 토큰은 쿠키에 저장됨
        "", // 토큰은 쿠키에 저장됨
      );

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
