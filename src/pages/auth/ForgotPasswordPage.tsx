import { useState, useEffect } from "react";
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
import { ArrowLeft, Mail } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
/**
 * @todo 추후 비밀번호 찾기 정책 결정에 따른 로직 및 UI 수정 필요
 */
const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { sendResetEmail, isLoading, isError, error, isSuccess } =
    useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendResetEmail({ email });
  };

  // API 호출 성공 시 성공 페이지로 전환
  useEffect(() => {
    if (isSuccess) {
      setIsSubmitted(true);
    }
  }, [isSuccess]);

  const handleBackToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  if (isSubmitted) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)] py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>이메일을 확인하세요</CardTitle>
            <CardDescription>
              비밀번호 재설정 링크를 <strong>{email}</strong>로 발송했습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              이메일을 받지 못하셨나요? 스팸 폴더를 확인하거나 몇 분 후 다시
              시도해보세요.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              다시 시도
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleBackToLogin}
            >
              로그인으로 돌아가기
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Button
            variant="ghost"
            size="sm"
            className="w-fit p-0 h-auto mb-4 text-muted-foreground hover:text-foreground"
            onClick={handleBackToLogin}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            로그인으로 돌아가기
          </Button>
          <CardTitle>비밀번호 찾기</CardTitle>
          <CardDescription>
            가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를
            보내드립니다.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일 주소</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                autoFocus
              />
            </div>
            {isError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">
                  {error?.response?.data?.message ||
                    "이메일 발송에 실패했습니다. 다시 시도해주세요."}
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-3">
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading || !email.trim()}
            >
              {isLoading ? "발송 중..." : "재설정 링크 발송"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              계정이 기억나셨나요?{" "}
              <button
                type="button"
                className="text-green-600 hover:underline font-medium"
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
