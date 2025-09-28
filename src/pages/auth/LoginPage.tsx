import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import LoginForm from "@/features/auth/ui/LoginForm";

/**
 * 로그인 페이지
 *
 * @todo 카카오 로그인 구현
 * @todo 구글 로그인 구현
 */

export default function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Google 로그인 로직 구현
    console.log("Google 로그인 시도");
    // 로그인 성공 시 마이페이지로 이동
    navigate(ROUTES.MY_PAGE);
  };

  const handleKakaoLogin = () => {
    // Kakao 로그인 로직 구현
    console.log("Kakao 로그인 시도");
    // 로그인 성공 시 마이페이지로 이동
    navigate(ROUTES.MY_PAGE);
  };
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>
            Energy Factory 계정으로 로그인하세요
          </CardDescription>
        </CardHeader>
        <LoginForm />

        <CardFooter className="flex flex-col">
          <div className="mt-4 text-center text-sm">
            <span className="text-gray-500">계정이 없으신가요?</span>
            <a
              className="text-green-600 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate(ROUTES.SIGNUP);
              }}
            >
              회원가입
            </a>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
              >
                Google로 로그인
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleKakaoLogin}
              >
                Kakao로 로그인
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
