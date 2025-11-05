import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SignupForm } from "@/features/auth/ui/SignupForm";
import { ROUTES } from "@/constants/routes";
import { AuthApiService } from "@/features/auth/services/AuthApiService";
import { useAuthStore } from "@/stores/useAuthStore";

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

export default function SignupPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [isNaverSignup, setIsNaverSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [naverProvidedFields, setNaverProvidedFields] = useState<Set<string>>(
    new Set()
  );
  const hasInitialized = useRef(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone1: "",
    phone2: "",
    phone3: "",
  });

  // 네이버 로그인 후 리다이렉트된 경우 사용자 정보 가져오기
  useEffect(() => {
    // 이미 초기화했으면 스킵
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    const fetchUserInfo = async () => {
      try {
        const userInfo = await AuthApiService.getUserInfo();

        // 네이버 로그인인 경우 (authProvider가 'naver')
        if (userInfo.authProvider === "naver") {
          setIsNaverSignup(true);

          // Zustand 스토어에 사용자 정보 저장 (로그인 상태로 만들기)
          setUser({
            id: 0, // API 응답에 id가 없으므로 임시값
            email: userInfo.email,
            name: userInfo.name,
          });

          // 전화번호 파싱 (010-1234-5678 -> [010, 1234, 5678])
          const phoneParts = userInfo.phone ? userInfo.phone.split("-") : ["", "", ""];

          // 생년월일 파싱 (YYYY-MM-DD -> [YYYY, MM, DD])
          const birthParts = userInfo.birthDate ? userInfo.birthDate.split("-") : ["", "", ""];

          // 네이버에서 제공한 필드 추적
          const providedFields = new Set<string>();
          if (userInfo.name) providedFields.add("name");
          if (userInfo.email) providedFields.add("email");
          if (userInfo.phone) {
            providedFields.add("phone1");
            providedFields.add("phone2");
            providedFields.add("phone3");
          }
          if (userInfo.birthDate) {
            providedFields.add("birthYear");
            providedFields.add("birthMonth");
            providedFields.add("birthDay");
          }
          if (userInfo.address) providedFields.add("address");

          setNaverProvidedFields(providedFields);

          setFormData({
            name: userInfo.name || "",
            email: userInfo.email || "",
            phone1: phoneParts[0] || "",
            phone2: phoneParts[1] || "",
            phone3: phoneParts[2] || "",
            birthYear: birthParts[0] || "",
            birthMonth: birthParts[1] ? String(parseInt(birthParts[1])) : "",
            birthDay: birthParts[2] ? String(parseInt(birthParts[2])) : "",
            address: userInfo.address || "",
            password: "", // 네이버 로그인은 비밀번호 불필요
            confirmPassword: "",
          });
        }
      } catch (error) {
        // 401 에러 (미로그인) - 정상적인 회원가입 플로우
        console.log("일반 회원가입 모드");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600 mx-auto" />
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-[640px]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-2xl font-semibold text-neutral-900">
              {isNaverSignup ? "추가 정보 입력" : "회원가입"}
            </h1>
            <p className="text-base text-neutral-600">
              {isNaverSignup
                ? "네이버 로그인 정보를 확인하고 추가 정보를 입력해주세요"
                : "Energy Factory 계정을 만들어 건강한 쇼핑을 시작하세요"}
            </p>
            {!isNaverSignup && (
              <div className="flex items-center justify-center gap-1 text-sm">
                <span className="text-neutral-600">이미 계정이 있으신가요?</span>
                <button
                  className="font-semibold text-[#00a63e] underline hover:text-[#008c36]"
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  로그인하기
                </button>
              </div>
            )}
          </div>

          <SignupForm
            formData={formData}
            handleInputChange={handleInputChange}
            isNaverSignup={isNaverSignup}
            naverProvidedFields={naverProvidedFields}
          />
        </div>
      </div>
    </div>
  );
}
