import { CheckCircle2, Package, Truck, CreditCard, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";

export default function OrderCompletePage() {
  // TODO: 실제로는 주문 ID를 URL 파라미터나 상태로 받아와서 주문 정보를 조회해야 합니다
  const orderInfo = {
    orderId: "EF-2025-01160001",
    orderDate: "2025년 1월 16일 14:32",
    deliveryDate: "2025년 1월 18일 (금)",
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
    recipient: {
      name: "김진장",
      phone: "010-1234-5678",
      address: "서울특별시 강남구 테헤란로 123",
      addressDetail: "에너지타워 12층",
      deliveryRequest: "문 앞에 놓아주세요",
    },
    payment: {
      productAmount: 64600,
      shippingFee: 0,
      totalAmount: 64600,
      method: "신용카드",
      detail: "신한카드 (****-1234)",
    },
  };

  return (
    <div className="min-h-screen pb-6 md:pb-12">
      <div className="container max-w-[1248px] mx-auto px-4 pt-6 md:pt-12">
        {/* 주문 완료 메인 카드 */}
        <Card className="border-neutral-200 mb-4 md:mb-6">
          <CardContent className="p-6 md:p-12 flex flex-col items-center gap-4 md:gap-6">
            {/* 성공 아이콘 */}
            <div className="size-16 md:size-24 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="size-10 md:size-14 text-green-600" />
            </div>

            {/* 제목 */}
            <h1 className="text-lg md:text-2xl font-bold text-neutral-900">
              주문이 완료되었습니다!
            </h1>

            {/* 설명 */}
            <p className="text-sm md:text-base text-neutral-600 text-center">
              주문해주셔서 감사합니다. 빠르고 안전하게 배송해드리겠습니다.
            </p>

            {/* 주문 정보 요약 */}
            <div className="bg-neutral-50 rounded-lg p-4 md:p-6 w-full max-w-[766px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* 주문번호 */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs md:text-sm font-bold text-neutral-600">주문번호</p>
                  <p className="text-sm md:text-base text-neutral-900">
                    {orderInfo.orderId}
                  </p>
                </div>

                {/* 주문일시 */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs md:text-sm font-bold text-neutral-600">주문일시</p>
                  <p className="text-sm md:text-base text-neutral-900">
                    {orderInfo.orderDate}
                  </p>
                </div>

                {/* 배송 예정일 */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs md:text-sm font-bold text-neutral-600">
                    배송 예정일
                  </p>
                  <p className="text-sm md:text-base text-green-600">
                    {orderInfo.deliveryDate}
                  </p>
                </div>
              </div>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex flex-col md:flex-row gap-3 items-center w-full md:w-auto">
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white h-11 md:h-12 px-8 md:px-12 w-full md:w-auto"
              >
                <Link to={ROUTES.ORDER_HISTORY}>주문내역 확인</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-neutral-200 text-neutral-700 h-11 md:h-12 px-8 md:px-12 w-full md:w-auto"
              >
                <Link to={ROUTES.PRODUCTS}>쇼핑 계속하기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 하단 정보 섹션 */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* 왼쪽 섹션 */}
          <div className="flex-1 space-y-4 md:space-y-6">
            {/* 주문 상품 */}
            <Card className="border-neutral-200">
              <CardContent className="p-4 md:p-6">
                {/* 헤더 */}
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Package className="size-4 md:size-5 text-green-600" />
                  <h2 className="text-sm md:text-base font-bold text-neutral-900">
                    주문 상품 ({orderInfo.items.length}개)
                  </h2>
                </div>

                {/* 상품 목록 */}
                <div className="space-y-3 md:space-y-4">
                  {orderInfo.items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex gap-3 md:gap-4 ${
                        index !== orderInfo.items.length - 1
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
                        <p className="text-sm md:text-base font-semibold text-neutral-900">
                          {item.price.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 배송 정보 */}
            <Card className="border-neutral-200">
              <CardContent className="p-4 md:p-6">
                {/* 헤더 */}
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Truck className="size-4 md:size-5 text-green-600" />
                  <h2 className="text-sm md:text-base font-bold text-neutral-900">배송 정보</h2>
                </div>

                {/* 배송 정보 내용 */}
                <div className="space-y-3 md:space-y-5">
                  <div className="flex">
                    <span className="text-sm md:text-base text-neutral-600 w-20 md:w-28 shrink-0">
                      받는 분
                    </span>
                    <span className="text-sm md:text-base text-neutral-900">
                      {orderInfo.recipient.name}
                    </span>
                  </div>

                  <div className="flex">
                    <span className="text-sm md:text-base text-neutral-600 w-20 md:w-28 shrink-0">
                      연락처
                    </span>
                    <span className="text-sm md:text-base text-neutral-900">
                      {orderInfo.recipient.phone}
                    </span>
                  </div>

                  <div className="flex">
                    <span className="text-sm md:text-base text-neutral-600 w-20 md:w-28 shrink-0">
                      배송지
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm md:text-base text-neutral-900">
                        {orderInfo.recipient.address}
                      </span>
                      <span className="text-xs md:text-sm text-neutral-600">
                        {orderInfo.recipient.addressDetail}
                      </span>
                    </div>
                  </div>

                  <div className="flex">
                    <span className="text-sm md:text-base text-neutral-600 w-20 md:w-28 shrink-0">
                      배송 요청사항
                    </span>
                    <span className="text-sm md:text-base text-neutral-900">
                      {orderInfo.recipient.deliveryRequest}
                    </span>
                  </div>
                </div>

                <Separator className="my-4 md:my-6" />

                {/* 배송 상태 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-7 md:size-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="size-3.5 md:size-4 text-green-600" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs md:text-sm text-neutral-900">결제 완료</p>
                      <p className="text-xs text-neutral-600">상품 준비중</p>
                    </div>
                  </div>
                  <span className="text-xs md:text-sm text-green-600 font-semibold">진행중</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽: 결제 정보 */}
          <div className="w-full md:w-[272px]">
            <Card className="border-neutral-200">
              <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* 헤더 */}
                <div className="flex items-center gap-2">
                  <CreditCard className="size-4 md:size-5 text-green-600" />
                  <h2 className="text-sm md:text-base font-bold text-neutral-900">결제 정보</h2>
                </div>

                {/* 금액 정보 */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between text-sm md:text-base text-neutral-700">
                    <span>상품 금액</span>
                    <span>{orderInfo.payment.productAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base text-neutral-700">
                    <span>배송비</span>
                    <span>무료</span>
                  </div>
                </div>

                <Separator />

                {/* 총 결제 금액 */}
                <div className="flex justify-between items-end">
                  <span className="text-sm md:text-base text-neutral-900 font-semibold">
                    총 결제 금액
                  </span>
                  <span className="text-lg md:text-xl font-bold text-green-600">
                    {orderInfo.payment.totalAmount.toLocaleString()}원
                  </span>
                </div>

                {/* 결제 수단 */}
                <div className="bg-neutral-50 rounded-lg p-3 md:p-4 space-y-1">
                  <p className="text-xs md:text-sm text-neutral-600">결제 수단</p>
                  <p className="text-sm md:text-base font-semibold text-neutral-900">
                    {orderInfo.payment.method}
                  </p>
                  <p className="text-xs md:text-sm text-neutral-600">
                    {orderInfo.payment.detail}
                  </p>
                </div>

                <Separator />

                {/* 안내 문구 */}
                <div className="flex gap-2">
                  <Info className="size-3.5 md:size-4 text-neutral-600 shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-neutral-600">
                    배송 상태는 주문내역 페이지에서 확인하실 수 있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
