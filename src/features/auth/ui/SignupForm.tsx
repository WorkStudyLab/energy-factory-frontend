import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { Button } from "@/components/ui/button";
import { LabelInput } from "./LabelInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
  phone: string;
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
}

export const SignupForm = (props: {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string | boolean) => void;
}) => {
  const navigate = useNavigate();
  const { signup, isLoading } = useSignup();
  const { formData, handleInputChange } = props;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const signupData: SignupRequest = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phone,
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
          <LabelInput
            id="password"
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={(value) => handleInputChange("password", value)}
            placeholder="********"
            required
          />
          <LabelInput
            id="confirm-password"
            label="비밀번호 확인"
            type="password"
            value={formData.confirmPassword}
            onChange={(value) => handleInputChange("confirmPassword", value)}
            placeholder="*******"
            required
          />
          <LabelInput
            id="address"
            label="배송지"
            value={formData.address}
            onChange={(value) => handleInputChange("address", value)}
            placeholder="경기도 양평군 금천면 153-2"
            required
          />
          <LabelInput
            id="phone"
            label="연락처"
            value={formData.phone}
            onChange={(value) => handleInputChange("phone", value)}
            placeholder="01012345678"
            required
          />
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
            disabled={isLoading}
            className="flex-1 h-12 rounded-lg bg-[#108c4a] hover:bg-[#0d7a3f] text-white"
          >
            {isLoading ? "가입 중..." : "회원가입"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
