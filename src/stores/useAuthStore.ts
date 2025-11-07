import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  name: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
  updateTokens: (accessToken: string, refreshToken?: string) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        login: (user, accessToken, refreshToken) =>
          set(
            {
              user,
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            },
            false,
            "login",
          ),

        logout: () => {
          // 스토리지에서 인증 데이터 완전 제거
          localStorage.removeItem("auth-store");
          sessionStorage.removeItem("auth-store");

          // 서버에 로그아웃 요청하여 쿠키 제거
          const BASE_URL =
            import.meta.env.VITE_API_BASE_URL || "http://13.209.24.80:8080";
          fetch(`${BASE_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
          }).catch((err) => console.error("로그아웃 요청 실패:", err));

          set(
            {
              ...initialState,
            },
            false,
            "logout",
          );
        },

        setUser: (user) =>
          set(
            {
              user,
              isAuthenticated: !!user,
            },
            false,
            "setUser",
          ),

        setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

        clearAuth: () => {
          // 스토리지에서 인증 데이터 완전 제거
          localStorage.removeItem("auth-store");
          sessionStorage.removeItem("auth-store");

          set(
            {
              ...initialState,
            },
            false,
            "clearAuth",
          );
        },

        updateTokens: (accessToken, refreshToken) =>
          set(
            (state) => ({
              accessToken,
              refreshToken: refreshToken || state.refreshToken,
            }),
            false,
            "updateTokens",
          ),
      }),
      {
        name: "auth-store",
        version: 1, // 스키마 변경 시 버전 업데이트
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          // 토큰은 HttpOnly 쿠키에 저장되므로 localStorage에 저장하지 않음
        }),
      },
    ),
    {
      name: "auth-store",
    },
  ),
);
