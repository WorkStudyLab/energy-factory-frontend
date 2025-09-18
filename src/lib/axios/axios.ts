import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

// 환경 변수에서 API 기본 URL 가져오기 (기본값 설정)
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10초 타임아웃
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

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
      // 토큰 갱신 로직 (필요시 구현)
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken && originalRequest) {
        try {
          // 토큰 갱신 API 호출
          const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const newAccessToken = refreshResponse.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          // 원래 요청 재시도
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return apiClient(originalRequest);
        } catch (refreshError) {
          // 토큰 갱신 실패시 로그인 페이지로 리다이렉트
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      } else {
        // 리프레시 토큰이 없으면 로그인 페이지로 리다이렉트
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
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
