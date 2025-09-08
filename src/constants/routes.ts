// 라우팅 URL 상수값
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  SIGNUP: '/signup',
} as const;

// 타입 정의
export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey];
