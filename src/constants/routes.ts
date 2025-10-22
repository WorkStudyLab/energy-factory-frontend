// 라우팅 URL 상수값
export const ROUTES = {
  // 홈
  HOME: "/",
  // 랜딩 페이지
  LANDING: "/landing",
  // 상품
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:id",
  // 장바구니
  CART: "/cart",
  // 로그인
  LOGIN: "/login",
  // 비밀번호 찾기
  FORGOT_PASSWORD: "/forgot-password",
  // 회원가입
  SIGNUP: "/signup",
  SIGNUP_CONNECT: "/signup/connect",
  // 프로필
  PROFILE: "/profile",
  // 마이페이지
  MY_PAGE: "/mypage",
  // 영양 계산기
  NUTRITION: "/nutrition",
  // 식단 코치
  DIET_COACH: "/diet-coach",
  // 주문 내역
  ORDER_HISTORY: "/order-history",

  // 테스트
  TEST: "/test",
  UI_TEST: "/test/ui",
  // Shadcn 테스트
  SHADCN_TEST: "/test/shadcn",
  TAILWIND_TEST: "/test/tailwind",
  // API 테스트
  PRODUCTS_API_TEST: "/test/products-api",
  SIGNUP_API_TEST: "/test/signup-api",
  LOGIN_API_TEST: "/test/login-api",
  // 다이얼로그 테스트
  DIALOG_TEST: "/test/dialog",
} as const;

// 타입 정의
export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];
