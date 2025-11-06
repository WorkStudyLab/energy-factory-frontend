import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link2, Check } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function SignupConnectPage() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate(ROUTES.PRODUCTS);
  };

  const handleNaverConnect = () => {
    // 네이버 계정 연동 API 호출
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://energy-factory.kr";
    window.location.href = `${API_BASE_URL}/api/auth/link/naver`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-[640px]">
        <div className="flex flex-col gap-[25px]">
          {/* 헤더 섹션 */}
          <div className="flex flex-col gap-[33px]">
            <div className="flex flex-col gap-[15px] items-center">
              {/* 아이콘 */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Link2 className="w-10 h-10 text-green-600" />
              </div>

              {/* 타이틀 및 설명 */}
              <div className="flex flex-col gap-1">
                <h1 className="text-base text-neutral-900 text-center">
                  SNS 계정 연동
                </h1>
                <p className="text-base text-neutral-600 text-center">
                  소셜 계정을 연동하면 더 편리하게 로그인할 수 있어요
                </p>
                <p className="text-sm text-neutral-500 text-center">
                  연동을 원하시는 계정을 선택해주세요
                </p>
              </div>
            </div>

            {/* SNS 연동 카드 */}
            <div className="bg-white border border-neutral-200 rounded-[10px] p-[33px] flex flex-col gap-10">
              {/* SNS 연동 목록 */}
              <div className="flex flex-col gap-4">
                {/* 네이버 - 활성화 */}
                <div className="border-2 border-neutral-200 rounded-[10px] px-[18px] py-[2px] h-[92px] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 border-2 border-[#b9f8cf] rounded-full flex items-center justify-center">
                      <span className="text-[#008236] text-xl font-normal">
                        N
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-2xl font-semibold text-neutral-900">
                        네이버
                      </h3>
                      <p className="text-sm text-neutral-600">
                        네이버로 간편하게 로그인하세요
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleNaverConnect}
                    className="h-10 px-[18px] bg-green-50 border-2 border-[#b9f8cf] rounded-[10px] text-sm text-[#008236] hover:bg-green-100 transition-colors"
                  >
                    연동하기
                  </button>
                </div>

                {/* Google - 비활성화 */}
                <div className="bg-neutral-50 border-2 border-neutral-200 rounded-[10px] px-[18px] py-[2px] h-[92px] flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-100 border-2 border-neutral-300 rounded-full flex items-center justify-center">
                      <span className="text-neutral-400 text-xl font-normal">
                        G
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-2xl font-semibold text-neutral-500">
                        Google
                      </h3>
                      <p className="text-sm text-neutral-500">
                        추후 지원 예정입니다
                      </p>
                    </div>
                  </div>
                </div>

                {/* 카카오 - 비활성화 */}
                <div className="bg-neutral-50 border-2 border-neutral-200 rounded-[10px] px-[18px] py-[2px] h-[92px] flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-100 border-2 border-neutral-300 rounded-full flex items-center justify-center">
                      <span className="text-neutral-400 text-xl font-normal">
                        K
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-2xl font-semibold text-neutral-500">
                        카카오
                      </h3>
                      <p className="text-sm text-neutral-500">
                        추후 지원 예정입니다
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SNS 연동 혜택 */}
              <div className="bg-blue-50 border border-[#bedbff] rounded-[10px] p-[25px] flex flex-col gap-3">
                <h3 className="text-base text-neutral-900">SNS 연동 혜택</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-neutral-700 mt-0.5 shrink-0" />
                    <p className="text-sm text-neutral-700">
                      비밀번호 없이 간편하게 로그인할 수 있어요
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-neutral-700 mt-0.5 shrink-0" />
                    <p className="text-sm text-neutral-700">
                      맞춤형 상품 추천과 특별 할인 혜택을 받을 수 있어요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 버튼 및 안내 */}
          <div className="flex flex-col gap-[23px]">
            <Button
              onClick={handleSkip}
              className="w-full h-[44px] bg-[#108c4a] hover:bg-[#0d7a3f] text-white rounded-[10px] text-base font-semibold"
            >
              건너뛰기
            </Button>

            <div className="flex flex-col gap-1">
              <p className="text-sm text-neutral-500 text-center">
                SNS 연동은 안전하게 처리되며, 개인정보는 보호됩니다.
              </p>
              <p className="text-sm text-neutral-500 text-center">
                언제든지 마이페이지에서 연동을 해제할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
