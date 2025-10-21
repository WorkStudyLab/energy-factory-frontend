import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

// 환경 변수에서 API 기본 URL 가져오기 (기본값 설정)
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://13.209.24.80:8080";

// axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10초 타임아웃
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키를 자동으로 포함
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // HttpOnly 쿠키가 자동으로 전송되므로 Authorization 헤더 설정 불필요

    // 요청 로깅 (개발 환경에서만)
    if (import.meta.env.DEV) {
      console.log(`🚀 API 요청: ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("❌ 요청 인터셉터 에러:", error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 응답 로깅 (개발 환경에서만)
    if (import.meta.env.DEV) {
      console.log(`✅ API 응답: ${response.status} ${response.config.url}`);
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // 401 에러 처리 (토큰 만료)
    if (error.response?.status === 401) {
      // 로그인 API 호출 시에는 토큰 갱신 로직을 실행하지 않음
      if (originalRequest?.url?.includes("/auth/login")) {
        return Promise.reject(error);
      }

      // 토큰 갱신 로직 (쿠키 기반)
      const { logout } = useAuthStore.getState();

      try {
        // 토큰 갱신 API 호출 (쿠키가 자동으로 전송됨)
        await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        // 토큰 갱신 성공 시 원래 요청 재시도
        if (originalRequest) {
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // 토큰 갱신 실패시 로그아웃
        console.error("토큰 갱신 실패:", refreshError);
        logout();
        window.location.href = "/login";
      }
    }

    // 에러 로깅
    console.error("❌ API 에러:", {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      data: error.response?.data,
    });

    return Promise.reject(error);
  },
);

// API 클라이언트 내보내기
export default apiClient;

// 편의를 위한 HTTP 메서드들
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config),
};
