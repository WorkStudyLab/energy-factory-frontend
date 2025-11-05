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
    allowedRoles: ["guest"],
    redirectAuth: ROUTES.PRODUCTS,
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
    allowedRoles: ["guest", "user"],
  },
  [ROUTES.PRODUCT_DETAIL]: {
    allowedRoles: ["guest", "user"],
  },
  [ROUTES.LANDING]: {
    allowedRoles: ["guest", "user"],
  },

  // 로그인 필수 페이지 - user만 접근 가능
  [ROUTES.CART]: {
    allowedRoles: ["user"],
    redirectUnauth: ROUTES.LOGIN, // 미로그인 사용자는 로그인 페이지로 리다이렉트
  },
  [ROUTES.MY_PAGE]: {
    allowedRoles: ["user"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.NUTRITION]: {
    allowedRoles: ["user"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.DIET_COACH]: {
    allowedRoles: ["user"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.ORDER_HISTORY]: {
    allowedRoles: ["user"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.ORDER_COMPLETE]: {
    allowedRoles: ["user"],
    redirectUnauth: ROUTES.LOGIN,
  },
  [ROUTES.ORDER_FAIL]: {
    allowedRoles: ["user"],
    redirectUnauth: ROUTES.LOGIN,
  },

  // 테스트 페이지 - 모든 사용자 접근 가능 (개발 환경)
  [ROUTES.TEST]: {
    allowedRoles: ["guest", "user"],
  },
  [ROUTES.UI_TEST]: {
    allowedRoles: ["guest", "user"],
  },
  [ROUTES.SHADCN_TEST]: {
    allowedRoles: ["guest", "user"],
  },
  [ROUTES.TAILWIND_TEST]: {
    allowedRoles: ["guest", "user"],
  },
  [ROUTES.SIGNUP_API_TEST]: {
    allowedRoles: ["guest", "user"],
  },
  [ROUTES.LOGIN_API_TEST]: {
    allowedRoles: ["guest", "user"],
  },
  [ROUTES.DIALOG_TEST]: {
    allowedRoles: ["guest", "user"],
  },
};
