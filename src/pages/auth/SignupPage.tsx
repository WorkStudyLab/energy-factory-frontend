import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SignupForm } from "@/features/auth/ui/SignupForm";
import { ROUTES } from "@/constants/routes";
import { AuthApiService } from "@/features/auth/services/AuthApiService";
import { useDialogHelpers } from "@/utils/dialogHelpers";

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

const OAUTH_TEMP_DATA_KEY = "oauth_temp_signup_data";

export default function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { alert } = useDialogHelpers();
  const [isOAuthSignup, setIsOAuthSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [oauthProvidedFields, setOauthProvidedFields] = useState<Set<string>>(
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

  // OAuth 모드 감지 및 임시 정보 조회
  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    const initializeSignupPage = async () => {
      const oauthPending = searchParams.get("oauth");

      // OAuth 모드 (?oauth=pending)
      if (oauthPending === "pending") {
        setIsOAuthSignup(true);

        try {
          // 먼저 로컬 스토리지에서 복원 시도 (세션 만료 대비)
          const savedData = localStorage.getItem(OAUTH_TEMP_DATA_KEY);
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            applyOAuthData(parsedData);
            setIsLoading(false);
            return;
          }

          // API 호출하여 OAuth 임시 정보 가져오기
          const response = await AuthApiService.getOAuthTempInfo();
          const oauthData = response.data;

          // 로컬 스토리지에 저장 (세션 만료 대비)
          localStorage.setItem(OAUTH_TEMP_DATA_KEY, JSON.stringify(oauthData));

          applyOAuthData(oauthData);
        } catch (error: any) {
          console.error("OAuth 임시 정보 조회 실패:", error);

          // 세션 만료 에러 (40100007)
          if (error.response?.data?.code === "40100007") {
            alert(
              "세션이 만료되었습니다. 다시 네이버 로그인을 진행해주세요.",
              {
                title: "세션 만료",
                onConfirm: () => {
                  // 로컬 스토리지 클리어
                  localStorage.removeItem(OAUTH_TEMP_DATA_KEY);
                  // 네이버 로그인으로 리다이렉트
                  window.location.href = "/oauth2/authorization/naver";
                },
              }
            );
          } else {
            alert("네이버 로그인 정보를 불러오는데 실패했습니다.", {
              title: "오류",
              onConfirm: () => navigate(ROUTES.LOGIN),
            });
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        // 일반 회원가입 모드
        setIsOAuthSignup(false);
        setIsLoading(false);
      }
    };

    initializeSignupPage();
  }, [searchParams, navigate, alert]);

  // OAuth 데이터를 폼에 적용하는 함수
  const applyOAuthData = (oauthData: any) => {
    // 전화번호 파싱 (010-1234-5678 -> [010, 1234, 5678])
    const phoneParts = oauthData.phoneNumber
      ? oauthData.phoneNumber.split("-")
      : ["", "", ""];

    // OAuth에서 제공한 필드 추적 (읽기 전용 처리)
    const providedFields = new Set<string>();
    if (oauthData.name) providedFields.add("name");
    if (oauthData.email) providedFields.add("email");
    if (oauthData.phoneNumber) {
      providedFields.add("phone1");
      providedFields.add("phone2");
      providedFields.add("phone3");
    }

    setOauthProvidedFields(providedFields);

    setFormData({
      name: oauthData.name || "",
      email: oauthData.email || "",
      phone1: phoneParts[0] || "",
      phone2: phoneParts[1] || "",
      phone3: phoneParts[2] || "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      address: "",
      password: "", // OAuth 로그인은 비밀번호 불필요
      confirmPassword: "",
    });
  };

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
              {isOAuthSignup ? "추가 정보 입력" : "회원가입"}
            </h1>
            <p className="text-base text-neutral-600">
              {isOAuthSignup
                ? "네이버 로그인 정보를 확인하고 추가 정보를 입력해주세요"
                : "Energy Factory 계정을 만들어 건강한 쇼핑을 시작하세요"}
            </p>
            {!isOAuthSignup && (
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
            isOAuthSignup={isOAuthSignup}
            oauthProvidedFields={oauthProvidedFields}
          />
        </div>
      </div>
    </div>
  );
}
