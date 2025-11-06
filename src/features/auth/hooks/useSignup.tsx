import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios/axios";
import { useNavigate } from "react-router-dom";
import { useDialogHelpers } from "@/utils/dialogHelpers";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/stores/useAuthStore";

/**
 * 회원가입 요청 타입
 */
interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
  address: string;
}

/**
 * 회원가입 응답 타입
 */
interface SignupResponse {
  status: number;
  code: string;
  desc: string;
  data: {
    id: number;
    email: string;
    name: string;
  };
}

/**
 * 회원가입 API 함수
 */
const signupApi = async (userData: SignupRequest): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>(
    "/api/users/signup",
    userData,
  );
  return response.data;
};

/**
 * 회원가입 Hook
 */
export const useSignup = () => {
  const navigate = useNavigate();
  const { alert } = useDialogHelpers();
  const { setUser } = useAuthStore();

  const mutation = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      console.log("✅ 회원가입 성공:", data.data);

      // 회원가입 성공 시 사용자 정보를 스토어에 저장 (자동 로그인)
      setUser({
        id: data.data.id,
        email: data.data.email,
        name: data.data.name,
      });

      // SNS 연동 페이지로 리다이렉트
      alert("회원가입 성공!", {
        title: "회원가입 성공",
        onConfirm: () => {
          navigate(ROUTES.SIGNUP_CONNECT);
        },
      });
    },
    onError: (error: any) => {
      console.error("❌ 회원가입 실패:", error.response.data.desc);
      alert(`${error.response.data.desc}`, {
        title: "회원가입 실패",
      });
    },
  });

  return {
    signup: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};
