import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { Button } from "@/components/ui/button";
import { LabelInput } from "./LabelInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}
/**
 * 회원가입 폼 컴포넌트
 * @todo 카카오 로그인 구현
 * @todo 구글 로그인 구현
 * @todo 비밀번호 유효성 검사 (자릿수, 영문+숫자+특수문자, 비밀번호확인 일치)
 * @todo 휴대폰 번호 유효성 검사 (010-1234-5678 형식)
 */
export const SignupForm = (props: {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string | boolean) => void;
}) => {
  const navigate = useNavigate();
  const { signup } = useSignup();
  const { formData, handleInputChange } = props;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const signupData: SignupRequest = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phone,
    };

    signup(signupData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
          <CardDescription>
            계정 생성에 필요한 기본 정보를 입력해주세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <LabelInput
              id="first-name"
              label="이름"
              value={formData.firstName}
              onChange={(value) => handleInputChange("firstName", value)}
              required
            />
            <LabelInput
              id="last-name"
              label="성"
              value={formData.lastName}
              onChange={(value) => handleInputChange("lastName", value)}
              required
            />
          </div>
          <LabelInput
            id="email"
            label="이메일"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            required
          />
          <LabelInput
            id="password"
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={(value) => handleInputChange("password", value)}
            required
            description="8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다"
          />
          <LabelInput
            id="confirm-password"
            label="비밀번호 확인"
            type="password"
            value={formData.confirmPassword}
            onChange={(value) => handleInputChange("confirmPassword", value)}
            required
          />
          <LabelInput
            id="phone"
            label="연락처"
            value={formData.phone}
            onChange={(value) => handleInputChange("phone", value)}
            required
          />
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            회원가입 완료
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
