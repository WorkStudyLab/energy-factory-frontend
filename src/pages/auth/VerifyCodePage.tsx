import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";

/**
 * @todo 추후 인증코드 검증 API 연동 필요
 */
const VerifyCodePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    // To Do : 인증코드 검증 API 연동 필요
    // 임시로 비밀번호 재설정 페이지로 이동
    navigate(ROUTES.RESET_PASSWORD, { state: { email } });
  };

  const handleBackToForgotPassword = () => {
    navigate(ROUTES.FORGOT_PASSWORD);
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
          onClick={handleBackToForgotPassword}
          className="flex items-center gap-2 text-neutral-600 text-base mb-[13px] hover:text-neutral-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>뒤로가기</span>
        </button>

        {/* 헤더 섹션 */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-neutral-900 text-center mb-2">
            인증코드 입력
          </h1>
          <p className="text-base text-neutral-600 text-center font-semibold">
            <span className="text-green-600">{email}</span>
            <br />로 전송된 6자리 인증번호를 입력해주세요.
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="verificationCode" className="text-sm font-medium text-neutral-900">
              인증 코드
            </Label>
            <Input
              id="verificationCode"
              type="text"
              placeholder="XXXXXX"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              required
              autoFocus
              className="h-9 text-sm border-neutral-200"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-base h-11 rounded-[10px]"
            disabled={verificationCode.length !== 6}
          >
            인증번호 확인
          </Button>

          <div className="flex items-center justify-center gap-1 text-sm">
            <span className="text-neutral-600">이메일을 잘못 입력하셨나요?</span>
            <button
              type="button"
              className="text-green-600 hover:underline text-xs"
              onClick={handleBackToForgotPassword}
            >
              이메일 수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCodePage;
