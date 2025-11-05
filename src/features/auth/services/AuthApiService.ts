import { api } from "@/lib/axios/axios";
import type {
  ApiResponse,
  DeleteUserResponse,
  UserInfo,
  UserAdditionalInfoRequest,
  UserProfileResponse,
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

  /** 네이버 소셜 로그인 후 추가 정보 업데이트 */
  static async updateAdditionalInfo(
    data: UserAdditionalInfoRequest,
  ): Promise<UserInfo> {
    const response = await api.put<UserProfileResponse>(
      `${AuthApiService.BASE_URL}/additional-info`,
      data,
    );
    return response.data.data;
  }
}
