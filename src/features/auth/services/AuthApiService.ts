import { api } from "@/lib/axios/axios";
import type {
  ApiResponse,
  DeleteUserResponse,
  UserInfo,
  UserProfileResponse,
  OAuthTempInfoResponse,
  SignupWithOAuthRequest,
  SignupWithOAuthResponse,
} from "@/types/user";

/**
 * 유저 관련 API 클래스입니다.
 */
export class AuthApiService {
  private static readonly BASE_URL = "/api/users";

  /** 회원 탈퇴 API 호출 메서드 (토큰에서 userId 자동 추출) */
  static async deleteUser(): Promise<DeleteUserResponse> {
    const response = await api.delete<DeleteUserResponse>(
      `${AuthApiService.BASE_URL}/me`,
    );

    return response.data;
  }

  /** 회원정보 조회 (토큰에서 userId 자동 추출) */
  static async getUserInfo(): Promise<UserInfo> {
    const response = await api.get<ApiResponse<UserInfo>>(
      `${AuthApiService.BASE_URL}/me`,
    );
    return response.data.data;
  }

  /** 사용자 프로필 조회 (토큰에서 userId 자동 추출) */
  static async getUserProfile(): Promise<UserInfo> {
    const response = await api.get<UserProfileResponse>(
      `${AuthApiService.BASE_URL}/profile`,
    );
    return response.data.data;
  }

  /** OAuth 임시 정보 조회 (GET /api/auth/oauth-temp-info) */
  static async getOAuthTempInfo(): Promise<OAuthTempInfoResponse> {
    const response = await api.get<OAuthTempInfoResponse>(
      "/api/auth/oauth-temp-info",
    );
    return response.data;
  }

  /** OAuth 회원가입 완료 (POST /api/auth/signup-with-oauth) */
  static async signupWithOAuth(
    data: SignupWithOAuthRequest,
  ): Promise<SignupWithOAuthResponse> {
    const response = await api.post<SignupWithOAuthResponse>(
      "/api/auth/signup-with-oauth",
      data,
    );
    return response.data;
  }
}
