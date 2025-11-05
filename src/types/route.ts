// 사용자 역할 타입
export type UserRole = "guest" | "user";

// 라우트 권한 설정 타입
export interface RouteAuth {
  // 접근 가능한 역할 목록
  allowedRoles: UserRole[];
  // 인증되지 않은 사용자가 접근할 때 리다이렉트할 경로
  redirectUnauth?: string;
  // 인증된 사용자가 접근할 때 리다이렉트할 경로
  redirectAuth?: string;
}
