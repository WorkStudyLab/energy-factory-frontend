export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
}

export interface SignupResponse {
  id: number;
  email: string;
  name: string;
  phoneNumber?: string;
  createdAt: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

/** 회원 탈퇴 응답 인터페이스 */
export interface DeleteUserResponse {
  status: number;
  code: string;
  desc: string;
  data: Record<string, never>;
}

/** 회원 정보 응답 인터페이스 */
export interface UserInfo {
  /** 사용자 이름 */
  name: string;
  /** 이메일 주소 */
  email: string;
  /** 전화번호 (하이픈 포함) */
  phone: string;
  /** 생년월일 (YYYY-MM-DD 형식) */
  birthDate: string;
  /** 소셜 로그인 제공자 */
  authProvider: "local" | "naver" | "kakao" | "google";
  /** 회원 가입일 (YYYY-MM-DD 형식) */
  memberSince: string;
  /** 기본 배송지 주소 */
  address: string;
}

export interface ApiResponse<T> {
  status: number;
  code: string;
  desc: string;
  data: T;
}
