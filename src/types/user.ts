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

export interface ApiResponse<T> {
  status: number;
  code: string;
  desc: string;
  data: T;
}