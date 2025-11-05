import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import type { UserRole } from "@/types/route";
import { ROUTE_AUTH } from "@/constants/routeAuth";

interface AppRouteProps {
  path: string;
  element: React.ReactElement;
}

/**
 * 권한 기반 라우트 컴포넌트
 * 사용자의 인증 상태와 역할에 따라 접근을 제어합니다.
 */
export const AppRoute: React.FC<AppRouteProps> = ({ path, element }) => {
  const { isAuthenticated } = useAuthStore();

  // 현재 사용자의 역할 결정
  const userRole: UserRole = isAuthenticated ? "user" : "guest";

  // 라우트의 권한 설정 가져오기
  const routeAuth = ROUTE_AUTH[path];

  // 권한 설정이 없는 경우 (기본적으로 모든 사용자 접근 허용)
  if (!routeAuth) {
    return element;
  }

  // 현재 사용자 역할이 접근 가능한 역할 목록에 포함되는지 확인
  const hasAccess = routeAuth.allowedRoles.includes(userRole);

  if (!hasAccess) {
    // 인증되지 않은 사용자가 인증 필요 페이지에 접근한 경우
    if (!isAuthenticated && routeAuth.redirectUnauth) {
      return <Navigate to={routeAuth.redirectUnauth} replace />;
    }

    // 인증된 사용자가 인증 관련 페이지(로그인, 회원가입 등)에 접근한 경우
    if (isAuthenticated && routeAuth.redirectAuth) {
      return <Navigate to={routeAuth.redirectAuth} replace />;
    }

    // 기본적으로 홈으로 리다이렉트
    return <Navigate to="/" replace />;
  }

  // 접근 권한이 있는 경우 요청한 페이지 렌더링
  return element;
};
