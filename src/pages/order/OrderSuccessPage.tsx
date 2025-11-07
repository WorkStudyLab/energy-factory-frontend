import {
  CheckCircle2,
  Package,
  Truck,
  CreditCard,
  Info,
  Loader2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import { useOrderDetail } from "@/features/order/hooks/useOrderDetail";
import { formatPhoneNumber } from "@/utils/numberUtils";
import { formatOrderDate, formatDeliveryDate } from "@/utils/dateUtils";

// 결제 수단 매핑 함수
const getPaymentMethodText = (method: string) => {
  const methodMap: Record<string, string> = {
    CREDIT_CARD: "신용카드",
    DEBIT_CARD: "체크카드",
    BANK_TRANSFER: "계좌이체",
    VIRTUAL_ACCOUNT: "가상계좌",
    MOBILE: "모바일",
  };
  return methodMap[method] || method;
};

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderNumber = location.state?.orderNumber as number | null;

  // orderNumber로 주문 상세 정보 조회
  const { order, isLoading, error } = useOrderDetail(orderNumber);

  // orderNumber가 없으면 장바구니로 리디렉션
  useEffect(() => {
    if (!orderNumber) {
      console.warn("주문번호가 없습니다. 장바구니로 이동합니다.");
      navigate(ROUTES.CART, { replace: true });
    }
  }, [orderNumber, navigate]);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-12 text-green-600 animate-spin" />
          <p className="text-base md:text-lg font-semibold text-neutral-900">
            주문 정보를 불러오는 중입니다...
          </p>
          <p className="text-sm text-neutral-600">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  // 에러 발생 시 에러 UI 표시
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="border-neutral-200 max-w-md w-full">
          <CardContent className="p-6 md:p-12 flex flex-col items-center gap-4 md:gap-6">
            {/* 에러 아이콘 */}
            <div className="size-16 md:size-24 rounded-full bg-red-100 flex items-center justify-center">
              <Info className="size-10 md:size-14 text-red-600" />
            </div>

            {/* 제목 */}
            <h1 className="text-lg md:text-2xl font-bold text-neutral-900">
              주문 정보를 불러올 수 없습니다
            </h1>

            {/* 설명 */}
            <p className="text-sm md:text-base text-neutral-600 text-center">
              주문 정보를 조회하는 중 문제가 발생했습니다.
              <br />
              잠시 후 다시 시도해주세요.
            </p>

            {/* 버튼 그룹 */}
            <div className="flex flex-col md:flex-row gap-3 items-center w-full md:w-auto">
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white h-11 md:h-12 px-8 md:px-12 w-full md:w-auto"
              >
                <Link to={ROUTES.ORDER_HISTORY}>주문내역으로 이동</Link>
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
      </div>
    );
  }

  // 주문 정보가 없으면 렌더링하지 않음
  if (!order) {
    return null;
  }

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
                  <p className="text-xs md:text-sm font-bold text-neutral-600">
                    주문번호
                  </p>
                  <p className="text-sm md:text-base text-neutral-900">
                    {order.orderNumber}
                  </p>
                </div>

                {/* 주문일시 */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs md:text-sm font-bold text-neutral-600">
                    주문일시
                  </p>
                  <p className="text-sm md:text-base text-neutral-900">
                    {formatOrderDate(order.payment.paidAt)}
                  </p>
                </div>

                {/* 배송 예정일 */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs md:text-sm font-bold text-neutral-600">
                    배송 예정일
                  </p>
                  <p className="text-sm md:text-base text-green-600">
                    {formatDeliveryDate(order.payment.paidAt)}
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
                    주문 상품 ({order.orderItems.length}개)
                  </h2>
                </div>

                {/* 상품 목록 */}
                <div className="space-y-3 md:space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex gap-3 md:gap-4 ${
                        index !== order.orderItems.length - 1
                          ? "pb-3 md:pb-4 border-b border-neutral-200"
                          : ""
                      }`}
                    >
                      {/* 상품 이미지 */}
                      <div className="size-16 md:size-20 border border-neutral-200 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.productImageUrl}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* 상품 정보 */}
                      <div className="flex-1 flex flex-col gap-1 md:gap-2">
                        <h3 className="text-sm md:text-base font-bold text-neutral-900">
                          {item.productName}
                        </h3>
                        <p className="text-xs md:text-sm text-neutral-600">
                          {item.variantName}
                        </p>
                        <p className="text-xs md:text-sm text-neutral-600">
                          수량: {item.quantity}개
                        </p>
                        <p className="text-sm md:text-base font-semibold text-neutral-900">
                          {item.totalPrice.toLocaleString()}원
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
                  <h2 className="text-sm md:text-base font-bold text-neutral-900">
                    배송 정보
                  </h2>
                </div>

                {/* 배송 정보 내용 */}
                <div className="space-y-3 md:space-y-5">
                  <div className="flex">
                    <span className="text-sm md:text-base text-neutral-600 w-20 md:w-28 shrink-0">
                      받는 분
                    </span>
                    <span className="text-sm md:text-base text-neutral-900">
                      {order.recipientName}
                    </span>
                  </div>

                  <div className="flex">
                    <span className="text-sm md:text-base text-neutral-600 w-20 md:w-28 shrink-0">
                      연락처
                    </span>
                    <span className="text-sm md:text-base text-neutral-900">
                      {formatPhoneNumber(order.phoneNumber)}
                    </span>
                  </div>

                  <div className="flex">
                    <span className="text-sm md:text-base text-neutral-600 w-20 md:w-28 shrink-0">
                      배송지
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm md:text-base text-neutral-900">
                        ({order.postalCode}) {order.addressLine1}
                      </span>
                      {order.addressLine2 && (
                        <span className="text-xs md:text-sm text-neutral-600">
                          {order.addressLine2}
                        </span>
                      )}
                    </div>
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
                      <p className="text-xs md:text-sm text-neutral-900">
                        결제 완료
                      </p>
                      <p className="text-xs text-neutral-600">상품 준비중</p>
                    </div>
                  </div>
                  <span className="text-xs md:text-sm text-green-600 font-semibold">
                    진행중
                  </span>
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
                  <h2 className="text-sm md:text-base font-bold text-neutral-900">
                    결제 정보
                  </h2>
                </div>

                {/* 금액 정보 */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between text-sm md:text-base text-neutral-700">
                    <span>상품 금액</span>
                    <span>{order.totalPrice.toLocaleString()}원</span>
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
                    {order.payment.amount.toLocaleString()}원
                  </span>
                </div>

                {/* 결제 수단 */}
                <div className="bg-neutral-50 rounded-lg p-3 md:p-4 space-y-1">
                  <p className="text-xs md:text-sm text-neutral-600">
                    결제 수단
                  </p>
                  <p className="text-sm md:text-base font-semibold text-neutral-900">
                    {getPaymentMethodText(order.payment.paymentMethod)}
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
