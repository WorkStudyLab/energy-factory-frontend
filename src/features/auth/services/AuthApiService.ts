import { api } from "@/lib/axios/axios";
import type { DeleteUserResponse } from "@/types/user";

/**
 * 유저 관련 API 클래스입니다.
 */
export class AuthApiService {
  private static readonly BASE_URL = "/api/users";

  /** 회원 탈퇴 API 호출 메서드 */
  static async deleteUser(userId: number): Promise<DeleteUserResponse> {
    const response = await api.get<DeleteUserResponse>(this.BASE_URL, {
      params: { userId },
    });

    return response.data;
  }
}
