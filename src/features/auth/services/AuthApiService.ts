import { api } from "@/lib/axios/axios";
import type { ApiResponse, DeleteUserResponse, UserInfo } from "@/types/user";

/**
 * 유저 관련 API 클래스입니다.
 */
export class AuthApiService {
  private static readonly BASE_URL = "/api/users";

  /** 회원 탈퇴 API 호출 메서드 */
  static async deleteUser(userId: number): Promise<DeleteUserResponse> {
    const response = await api.delete<DeleteUserResponse>(
      `${AuthApiService.BASE_URL}/${userId}`,
    );

    return response.data;
  }

  /** 회원정보 조회 */
  static async getUserInfo(userId: number): Promise<UserInfo> {
    const response = await api.get<ApiResponse<UserInfo>>(
      `${AuthApiService.BASE_URL}/${userId}`,
    );
    return response.data.data;
  }
}
