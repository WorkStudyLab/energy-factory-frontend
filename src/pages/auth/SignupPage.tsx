import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupForm } from "@/features/auth/ui/SignupForm";
import { ROUTES } from "@/constants/routes";

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

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-[640px]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-2xl font-semibold text-neutral-900">회원가입</h1>
            <p className="text-base text-neutral-600">
              Energy Factory 계정을 만들어 건강한 쇼핑을 시작하세요
            </p>
            <div className="flex items-center justify-center gap-1 text-sm">
              <span className="text-neutral-600">이미 계정이 있으신가요?</span>
              <button
                className="font-semibold text-[#00a63e] underline hover:text-[#008c36]"
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                로그인하기
              </button>
            </div>
          </div>

          <SignupForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}
