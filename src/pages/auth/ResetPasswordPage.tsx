import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useToast } from "@/hooks/use-toast";

/**
 * @todo 추후 비밀번호 재설정 API 연동 필요
 */
const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 비밀번호 유효성 검사
  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isPasswordValid = hasMinLength && hasLetter && hasNumber;
  const isFormValid = isPasswordValid && password === confirmPassword && confirmPassword !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    // To Do : 비밀번호 재설정 API 연동 필요

    // 성공 토스트 표시
    toast({
      title: "비밀번호가 재설정 되었습니다.",
      duration: 3000,
    });

    // 로그인 페이지로 이동
    setTimeout(() => {
      navigate(ROUTES.LOGIN);
    }, 1000);
  };

  const handleBackToVerifyCode = () => {
    navigate(ROUTES.VERIFY_CODE, { state: { email } });
  };

  // 이메일이 없으면 비밀번호 찾기 페이지로 리다이렉트
  if (!email) {
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
                <span className={hasLetter ? "text-green-600" : "text-gray-500"}>
                  • 영문 포함
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className={hasNumber ? "text-green-600" : "text-gray-500"}>
                  • 숫자 포함
                </span>
              </li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-base h-11 rounded-[10px] disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!isFormValid}
          >
            비밀번호 재설정
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
