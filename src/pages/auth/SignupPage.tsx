import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupForm } from "@/features/auth/ui/SignupForm";
import { ROUTES } from "@/constants/routes";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold">회원가입</h1>
            <p className="text-gray-500">
              Energy Factory 계정을 만들어 건강한 쇼핑을 시작하세요
            </p>
            <p className="text-sm mt-2">
              이미 계정이 있으신가요?{" "}
              <a
                href="#"
                className="text-green-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(ROUTES.LOGIN);
                }}
              >
                로그인하기
              </a>
            </p>
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
