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
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import { useEffect } from "react";

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { sendResetEmail, isLoading, isError, error, isSuccess } = useForgotPassword();

  // 성공 시 다음 페이지로 이동
  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTES.VERIFY_CODE, { state: { email } });
    }
  }, [isSuccess, navigate, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendResetEmail({ email });
  };

  const handleBackToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-[73px] px-4">
      <Card className="w-full max-w-[480px] border-neutral-200">
        <CardHeader className="space-y-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-fit p-0 h-auto text-neutral-600 hover:text-neutral-900"
            onClick={handleBackToLogin}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            뒤로가기
          </Button>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-bold text-center text-neutral-900">
              비밀번호 찾기
            </CardTitle>
            <CardDescription className="text-base text-center text-neutral-600 font-semibold">
              등록된 이메일 주소로 인증 코드를 전송합니다.
              <br />
              해당 이메일을 입력해주세요.
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-neutral-900">
                이메일 주소
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                autoFocus
                className="h-9 border-neutral-200"
              />
            </div>
            {isError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">
                  {error?.response?.data?.code === "42900001"
                    ? "잠시 후 다시 시도해주세요. (1분 제한)"
                    : error?.response?.data?.message ||
                      "이메일 발송에 실패했습니다. 다시 시도해주세요."}
                </p>
              </div>
            )}
            <Button
              type="submit"
              className="w-full h-11 bg-[#108c4a] hover:bg-[#0d7a3e] text-white font-semibold"
              disabled={isLoading || !email.trim()}
            >
              {isLoading ? "발송 중..." : "메일 전송"}
            </Button>
          </CardContent>

          <CardFooter className="justify-center pb-8">
            <div className="text-sm text-neutral-600 text-center">
              계정이 기억나셨나요?{" "}
              <button
                type="button"
                className="text-[#00a63e] hover:underline font-normal"
                onClick={handleBackToLogin}
              >
                로그인하기
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
