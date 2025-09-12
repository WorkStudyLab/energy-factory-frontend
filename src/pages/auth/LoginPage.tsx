import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 구현
    console.log("로그인 시도:", { email, password });
    // 로그인 성공 시 마이페이지로 이동
    navigate(ROUTES.MY_PAGE);
  };

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
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
                <a href="#" className="text-sm text-green-600 hover:underline">
                  비밀번호 찾기
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              로그인
            </Button>
          </CardFooter>
        </form>

        <CardFooter className="flex flex-col">
          <div className="mt-4 text-center text-sm">
            <span className="text-gray-500">계정이 없으신가요?</span>{" "}
            <a
              href="#"
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
