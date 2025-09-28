import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: string;
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
        partialize: (state) => ({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    {
      name: "auth-store",
    },
  ),
);
