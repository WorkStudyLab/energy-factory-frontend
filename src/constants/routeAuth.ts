import type { RouteAuth } from "../types/route";
import { ROUTES } from "./routes";

// 라우트별 권한 설정
export const ROUTE_AUTH: Record<string, RouteAuth> = {
  // 인증 관련 페이지 - guest만 접근 가능
  [ROUTES.LOGIN]: {
    allowedRoles: ["guest"],
    redirectAuth: ROUTES.PRODUCTS, // 로그인된 사용자는 상품 페이지로 리다이렉트
  },
  [ROUTES.SIGNUP]: {
    allowedRoles: ["guest"],
    redirectAuth: ROUTES.PRODUCTS,
  },
  [ROUTES.SIGNUP_CONNECT]: {
    allowedRoles: ["guest", "user"], // 회원가입 후 바로 접근하므로 user도 허용
  },
  [ROUTES.FORGOT_PASSWORD]: {
    allowedRoles: ["guest"],
    redirectAuth: ROUTES.PRODUCTS,
  },
  [ROUTES.VERIFY_CODE]: {
    allowedRoles: ["guest"],
    redirectAuth: ROUTES.PRODUCTS,
  },
  [ROUTES.RESET_PASSWORD]: {
    allowedRoles: ["guest"],
    redirectAuth: ROUTES.PRODUCTS,
  },
  [ROUTES.RESET_PASSWORD_SUCCESS]: {
    allowedRoles: ["guest"],
    redirectAuth: ROUTES.PRODUCTS,
  },

  // 상품 관련 페이지 - 모든 사용자 접근 가능
  [ROUTES.PRODUCTS]: {
    allowedRoles: ["guest", "user", "admin"],
  },
  [ROUTES.PRODUCT_DETAIL]: {
    allowedRoles: ["guest", "user", "admin"],
  },
  [ROUTES.LANDING]: {
    allowedRoles: ["guest", "user", "admin"],
  },

  // 로그인 필수 페이지 - user와 admin 모두 접근 가능
  [ROUTES.CART]: {
    allowedRoles: ["user", "admin"],
    redirectUnauth: ROUTES.LOGIN, // 미로그인 사용자는 로그인 페이지로 리다이렉트
  },
  [ROUTES.MY_PAGE]: {
    allowedRoles: ["user", "admin"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.NUTRITION]: {
    allowedRoles: ["user", "admin"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.DIET_COACH]: {
    allowedRoles: ["user", "admin"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.ORDER_HISTORY]: {
    allowedRoles: ["user", "admin"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.ORDER_COMPLETE]: {
    allowedRoles: ["user", "admin"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.ORDER_FAIL]: {
    allowedRoles: ["user", "admin"],
    redirectUnauth: ROUTES.LOGIN,
  },

  // 테스트 페이지 - ADMIN만 접근 가능
  [ROUTES.TEST]: {
    allowedRoles: ["admin"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.UI_TEST]: {
    allowedRoles: ["admin"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.SHADCN_TEST]: {
    allowedRoles: ["admin"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.TAILWIND_TEST]: {
    allowedRoles: ["admin"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.DIALOG_TEST]: {
    allowedRoles: ["admin"],
    redirectUnauth: ROUTES.LOGIN,
  },
};
