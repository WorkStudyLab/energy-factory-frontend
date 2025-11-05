import { XCircle, Package, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

export default function OrderFailPage() {
  const navigate = useNavigate();

  // TODO: 실제로는 URL 파라미터나 상태로 결제 실패 정보를 받아와야 합니다
  const failureInfo = {
    orderId: "EF-2025-01160001",
    attemptTime: "2025년 1월 16일 14:32",
    failureReason: "카드 한도 초과",
    items: [
      {
        id: 1,
        name: "유기농 닭가슴살",
        quantity: 2,
        price: 51200,
        imageUrl: "https://picsum.photos/seed/chicken/300/300",
      },
      {
        id: 2,
        name: "그릭 요거트",
        quantity: 1,
        price: 4500,
        imageUrl: "https://picsum.photos/seed/yogurt/300/300",
      },
      {
        id: 3,
        name: "퀴노아",
        quantity: 1,
        price: 8900,
        imageUrl: "https://picsum.photos/seed/quinoa/300/300",
      },
    ],
    payment: {
      productAmount: 64600,
      shippingFee: 0,
      method: "신용카드",
      cardInfo: "신한카드_****1234",
      status: "결제 실패",
    },
  };

  const handleRetry = () => {
    // TODO: 실제로는 결제 페이지로 이동하거나 결제 재시도 로직 구현
    navigate(ROUTES.CART);
  };

  return (
    <div className="min-h-screen pb-6 md:pb-12 bg-neutral-100">
      <div className="container max-w-[1248px] mx-auto px-4 pt-6 md:pt-12">
        {/* 결제 실패 메인 카드 */}
        <Card className="border-neutral-200 mb-4 md:mb-6">
          <CardContent className="p-6 md:p-12 flex flex-col items-center gap-4 md:gap-6">
            {/* 실패 아이콘 */}
            <div className="size-16 md:size-24 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="size-10 md:size-14 text-red-600" />
            </div>

            {/* 제목 */}
            <h1 className="text-base md:text-lg font-bold text-neutral-900">
              결제에 실패했습니다
            </h1>

            {/* 설명 */}
            <p className="text-sm md:text-base text-neutral-600 text-center">
              결제 처리 중 문제가 발생했습니다. 다시 시도해주세요.
            </p>

            {/* 결제 실패 정보 요약 */}
            <div className="bg-neutral-50 rounded-lg p-4 md:p-6 w-full max-w-[766px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* 주문번호 */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs md:text-sm font-bold text-neutral-600">주문번호</p>
                  <p className="text-sm md:text-base text-neutral-900">
                    {failureInfo.orderId}
                  </p>
                </div>

                {/* 시도 시간 */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs md:text-sm font-bold text-neutral-600">시도 시간</p>
                  <p className="text-sm md:text-base text-neutral-900">
                    {failureInfo.attemptTime}
                  </p>
                </div>

                {/* 실패 사유 */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs md:text-sm font-bold text-neutral-600">
                    실패 사유
                  </p>
                  <p className="text-sm md:text-base text-red-600">
                    {failureInfo.failureReason}
                  </p>
                </div>
              </div>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex flex-col md:flex-row gap-3 items-center w-full md:w-auto">
              <Button
                onClick={handleRetry}
                className="bg-red-600 hover:bg-red-700 text-white h-11 md:h-12 px-8 md:px-12 w-full md:w-[200px] font-semibold"
              >
                다시 시도하기
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-neutral-200 text-neutral-700 h-11 md:h-12 px-8 md:px-12 w-full md:w-[200px] font-semibold"
              >
                <Link to={ROUTES.PRODUCTS}>쇼핑 계속하기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 하단 정보 섹션 */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* 왼쪽: 주문 상품 */}
          <div className="flex-1">
            <Card className="border-neutral-200">
              <CardContent className="p-4 md:p-6">
                {/* 헤더 */}
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Package className="size-4 md:size-5 text-green-600" />
                  <h2 className="text-sm md:text-base font-normal text-neutral-900">
                    주문 상품 ({failureInfo.items.length}개)
                  </h2>
                </div>

                {/* 상품 목록 */}
                <div className="space-y-3 md:space-y-4">
                  {failureInfo.items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex gap-3 md:gap-4 ${
                        index !== failureInfo.items.length - 1
                          ? "pb-3 md:pb-4 border-b border-neutral-200"
                          : ""
                      }`}
                    >
                      {/* 상품 이미지 */}
                      <div className="size-16 md:size-20 border border-neutral-200 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* 상품 정보 */}
                      <div className="flex-1 flex flex-col gap-1 md:gap-2">
                        <h3 className="text-sm md:text-base font-bold text-neutral-900">
                          {item.name}
                        </h3>
                        <p className="text-xs md:text-sm text-neutral-600">
                          수량: {item.quantity}개
                        </p>
                        <p className="text-sm md:text-base text-neutral-900">
                          {item.price.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽: 결제 정보 */}
          <div className="w-full md:w-[312px]">
            <Card className="border-neutral-200">
              <CardContent className="p-4 md:p-5 space-y-3.5 md:space-y-[14px]">
                {/* 헤더 */}
                <div className="flex items-center gap-2">
                  <CreditCard className="size-4 md:size-5 text-green-600" />
                  <h2 className="text-sm md:text-base font-normal text-neutral-900">결제 정보</h2>
                </div>

                {/* 금액 정보 */}
                <div className="space-y-3 md:space-y-[13px]">
                  <div className="flex justify-between text-sm md:text-base text-neutral-700">
                    <span>상품 금액</span>
                    <span className="text-neutral-900">{failureInfo.payment.productAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base text-neutral-700">
                    <span>배송비</span>
                    <span className="text-neutral-900">0 원</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base text-neutral-700">
                    <span>결제 수단</span>
                    <span className="text-neutral-900">{failureInfo.payment.method}</span>
                  </div>

                  {/* 카드 정보 */}
                  <div className="flex justify-between items-start">
                    <span className="text-xs md:text-sm text-neutral-600">
                      신한카드
                    </span>
                    <span className="text-xs text-neutral-600">
                      {failureInfo.payment.cardInfo}
                    </span>
                  </div>

                  {/* 상태 */}
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-neutral-600">상태</span>
                    <span className="text-red-600">{failureInfo.payment.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
