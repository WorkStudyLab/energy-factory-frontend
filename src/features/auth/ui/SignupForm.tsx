import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useSignup } from "../hooks/useSignup";
import { Button } from "@/components/ui/button";
import { LabelInput } from "./LabelInput";
import { PasswordRequirements } from "./PasswordRequirements";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormData {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone1: string;
  phone2: string;
  phone3: string;
}

/**
 * 회원가입 폼 컴포넌트
 * @todo 카카오 로그인 구현
 * @todo 구글 로그인 구현
 * @todo 비밀번호 유효성 검사 (자릿수, 영문+숫자+특수문자, 비밀번호확인 일치)
 * @todo 휴대폰 번호 유효성 검사 (010-1234-5678 형식)
 */
interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
  address: string;
}

export const SignupForm = (props: {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string | boolean) => void;
}) => {
  const navigate = useNavigate();
  const { signup, isLoading } = useSignup();
  const { formData, handleInputChange } = props;

  // 비밀번호 표시/숨김 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 비밀번호 유효성 검사
  const passwordValidation = useMemo(() => {
    const password = formData.password;
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }, [formData.password]);

  // 모든 비밀번호 요구사항이 충족되었는지 확인
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 생년월일을 YYYY-MM-DD 형식으로 변환
    const birthDate = `${formData.birthYear}-${formData.birthMonth.padStart(2, "0")}-${formData.birthDay.padStart(2, "0")}`;

    // 전화번호 조합 (010-0000-0000)
    const phoneNumber = `${formData.phone1}-${formData.phone2}-${formData.phone3}`;

    const signupData: SignupRequest = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phoneNumber: phoneNumber,
      birthDate: birthDate,
      address: formData.address,
    };

    signup(signupData);
  };

  // 년도 옵션 생성 (현재 년도부터 100년 전까지)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-neutral-200">
        <CardHeader>
          <CardTitle className="text-base text-neutral-900">
            기본 정보
          </CardTitle>
          <CardDescription className="text-sm text-neutral-600">
            계정 생성을 위해서 아래 정보를 입력해주세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <LabelInput
            id="name"
            label="이름"
            value={formData.name}
            onChange={(value) => handleInputChange("name", value)}
            placeholder="김건강"
            required
          />

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label className="text-sm font-medium text-neutral-900">
                생년월일
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-red-500">*</span>
                <span className="text-sm font-medium text-neutral-500">
                  필수
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Select
                value={formData.birthYear}
                onValueChange={(value) => handleInputChange("birthYear", value)}
              >
                <SelectTrigger className="h-9 border-neutral-200">
                  <SelectValue placeholder="년도" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}년
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={formData.birthMonth}
                onValueChange={(value) =>
                  handleInputChange("birthMonth", value)
                }
              >
                <SelectTrigger className="h-9 border-neutral-200">
                  <SelectValue placeholder="월" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={String(month)}>
                      {month}월
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={formData.birthDay}
                onValueChange={(value) => handleInputChange("birthDay", value)}
              >
                <SelectTrigger className="h-9 border-neutral-200">
                  <SelectValue placeholder="일" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={String(day)}>
                      {day}일
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <LabelInput
            id="email"
            label="이메일"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            placeholder="HealthKim@example.com"
            required
          />
          {/* 비밀번호 */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="password" className="text-sm font-medium text-neutral-900">
                비밀번호
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-red-500">*</span>
                <span className="text-sm font-medium text-neutral-500">필수</span>
              </div>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="********"
                required
                className="h-9 rounded-lg border-neutral-200 pr-10"
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
          {/* 비밀번호 확인 */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="confirm-password" className="text-sm font-medium text-neutral-900">
                비밀번호 확인
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-red-500">*</span>
                <span className="text-sm font-medium text-neutral-500">필수</span>
              </div>
            </div>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="*******"
                required
                className="h-9 rounded-lg border-neutral-200 pr-10"
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
          <PasswordRequirements validation={passwordValidation} />

          <LabelInput
            id="address"
            label="배송지"
            value={formData.address}
            onChange={(value) => handleInputChange("address", value)}
            placeholder="경기도 양평군 금천면 153-2"
            required
          />
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label className="text-sm font-medium text-neutral-900">
                연락처
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-red-500">*</span>
                <span className="text-sm font-medium text-neutral-500">
                  필수
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Input
                value={formData.phone1}
                onChange={(e) => handleInputChange("phone1", e.target.value)}
                placeholder="010"
                maxLength={3}
                className="h-9 border-neutral-200"
              />
              <Input
                value={formData.phone2}
                onChange={(e) => handleInputChange("phone2", e.target.value)}
                placeholder="0000"
                maxLength={4}
                className="h-9 border-neutral-200"
              />
              <Input
                value={formData.phone3}
                onChange={(e) => handleInputChange("phone3", e.target.value)}
                placeholder="0000"
                maxLength={4}
                className="h-9 border-neutral-200"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 border-t border-neutral-200 pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1 h-12 rounded-lg border-neutral-200 text-neutral-700"
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={
              isLoading ||
              !isPasswordValid ||
              formData.password !== formData.confirmPassword
            }
            className="flex-1 h-12 rounded-lg bg-[#108c4a] hover:bg-[#0d7a3f] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "가입 중..." : "회원가입"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
