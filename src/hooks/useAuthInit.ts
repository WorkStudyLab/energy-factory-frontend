import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { AuthApiService } from "@/features/auth/services/AuthApiService";

/**
 * 앱 초기화 시 로그인 상태를 확인하는 Hook
 *
 * JWT 토큰이 HttpOnly 쿠키에 있으면 자동으로 사용자 정보를 가져옵니다.
 */
export const useAuthInit = () => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    // 이미 초기화했으면 스킵
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    const initAuth = async () => {
      const { isAuthenticated, user, setUser, setLoading } = useAuthStore.getState();

      // localStorage에 인증 정보가 이미 있고 role도 있으면 스킵
      if (isAuthenticated && user?.role) {
        return;
      }

      // OAuth 회원가입 중이면 스킵 (?oauth=pending)
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("oauth") === "pending") {
        return;
      }

      setLoading(true);

      try {
        // 쿠키에 JWT가 있으면 사용자 정보 가져오기
        const userInfo = await AuthApiService.getUserInfo();

        setUser({
          id: 0, // API 응답에 id가 없으므로 임시값
          email: userInfo.email,
          name: userInfo.name,
          role: userInfo.role.toLowerCase(), // "ADMIN" -> "admin", "USER" -> "user"
        });
      } catch (error) {
        // 401 에러 = 로그인되지 않음 (정상)
        // 개발 환경에서만 로그 출력
        if (import.meta.env.DEV) {
          console.log("사용자 인증 정보 없음 (미로그인 상태)");
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []); // 의존성 배열을 비워서 한 번만 실행
};
