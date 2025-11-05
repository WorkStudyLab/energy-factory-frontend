import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthApiService } from "@/features/auth/services/AuthApiService";
import { useAuthStore } from "@/stores/useAuthStore";
import { ROUTES } from "@/constants/routes";

/**
 * 네이버 로그인 콜백 페이지
 *
 * 네이버 OAuth 인증 후 백엔드에서 리다이렉트되는 페이지
 * - JWT 토큰은 이미 HttpOnly 쿠키에 저장됨
 * - 사용자 정보를 조회하여 추가 정보 입력 필요 여부 확인
 * - birthDate 또는 address가 없으면 추가 정보 입력 페이지로 이동
 */
export default function NaverCallbackPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleNaverCallback = async () => {
      try {
        // 사용자 정보 조회 (JWT 토큰은 쿠키에 자동 포함됨)
        const userInfo = await AuthApiService.getUserInfo();

        // Zustand 스토어에 사용자 정보 저장
        setUser({
          id: 0, // API 응답에 id가 없으므로 임시값
          email: userInfo.email,
          name: userInfo.name,
        });

        // 추가 정보(생년월일, 주소) 확인
        const needsAdditionalInfo = !userInfo.birthDate || !userInfo.address;

        if (needsAdditionalInfo) {
          // 추가 정보 입력 필요
          navigate(ROUTES.NAVER_ADDITIONAL_INFO, { replace: true });
        } else {
          // 모든 정보가 있으면 메인 페이지로 이동
          navigate(ROUTES.HOME, { replace: true });
        }
      } catch (error) {
        console.error("네이버 로그인 콜백 처리 실패:", error);
        setError("로그인 처리 중 오류가 발생했습니다.");

        // 3초 후 로그인 페이지로 이동
        setTimeout(() => {
          navigate(ROUTES.LOGIN, { replace: true });
        }, 3000);
      }
    };

    handleNaverCallback();
  }, [navigate, setUser]);

  if (error) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)] py-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">로그인 실패</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{error}</p>
            <p className="mt-2 text-sm text-gray-500">
              잠시 후 로그인 페이지로 이동합니다...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>로그인 처리 중...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />
          </div>
          <p className="mt-4 text-center text-gray-600">
            네이버 로그인을 처리하고 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
