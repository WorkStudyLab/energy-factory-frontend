import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useToast } from "@/hooks/use-toast";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const resetToken = location.state?.resetToken || "";
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { resetPassword, isLoading, isError, error, isSuccess } = useResetPassword();

  // 비밀번호 유효성 검사 (API 요구사항: 대문자+소문자+숫자+특수문자 8자 이상)
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  const isFormValid = isPasswordValid && password === confirmPassword && confirmPassword !== "";

  // 성공 시 로그인 페이지로 이동
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "비밀번호가 재설정 되었습니다.",
        duration: 3000,
      });
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1000);
    }
  }, [isSuccess, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    resetPassword({ resetToken, newPassword: password });
  };

  const handleBackToVerifyCode = () => {
    navigate(ROUTES.VERIFY_CODE, { state: { email } });
  };

  // resetToken이 없으면 비밀번호 찾기 페이지로 리다이렉트
  if (!resetToken) {
    navigate(ROUTES.FORGOT_PASSWORD, { replace: true });
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-neutral-50 flex items-center justify-center py-[73px] px-6">
      <div className="w-full max-w-[480px] bg-white rounded-[10px] border border-neutral-200 px-8 py-[30px]">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBackToVerifyCode}
          className="flex items-center gap-2 text-neutral-600 text-base mb-[13px] hover:text-neutral-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>뒤로가기</span>
        </button>

        {/* 헤더 섹션 */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-neutral-900 text-center mb-2">
            비밀번호 재설정
          </h1>
          <p className="text-base text-neutral-600 text-center font-semibold">
            새로운 비밀번호를 입력해주세요
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 새 비밀번호 */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-neutral-900">
              새 비밀번호
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="영문, 숫자 포함 8자 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                className="h-9 text-sm border-neutral-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 새 비밀번호 확인 */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-900">
              새 비밀번호 확인
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-9 text-sm border-neutral-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 비밀번호 요구사항 */}
          <div className="bg-[#f4f5f6] rounded-[10px] px-6 py-3">
            <p className="text-sm font-semibold text-black mb-2">비밀번호 요구 사항</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className={hasMinLength ? "text-green-600" : "text-gray-500"}>
                  • 8자 이상 입력해주세요
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className={hasUpperCase ? "text-green-600" : "text-gray-500"}>
                  • 대문자 포함
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className={hasLowerCase ? "text-green-600" : "text-gray-500"}>
                  • 소문자 포함
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className={hasNumber ? "text-green-600" : "text-gray-500"}>
                  • 숫자 포함
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className={hasSpecialChar ? "text-green-600" : "text-gray-500"}>
                  • 특수문자 포함 (@$!%*?&)
                </span>
              </li>
            </ul>
          </div>

          {isError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">
                {error?.response?.data?.code === "40700003"
                  ? "인증이 만료되었습니다. 처음부터 다시 시도해주세요."
                  : error?.response?.data?.message ||
                    "비밀번호 재설정에 실패했습니다. 다시 시도해주세요."}
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-base h-11 rounded-[10px] disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "재설정 중..." : "비밀번호 재설정"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
