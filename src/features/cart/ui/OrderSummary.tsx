import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import usePayment from "@/features/order/hooks/usePayment";
import type { CartItem } from "@/types/cart";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

interface OrderSummaryProps {
  selectedCartItems: CartItem[];
}

const OrderSummary = (props: OrderSummaryProps) => {
  const { selectedCartItems } = props;
  // 선택된 아이템들의 총 가격 계산
  const selectedTotalPrice = selectedCartItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0,
  );

  // 배송비 계산 (3만원 이상 무료, 이하 2,500원)
  const FREE_SHIPPING_THRESHOLD = 30000;
  const SHIPPING_FEE = 2500;
  const shippingFee =
    selectedTotalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  // 최종 결제 금액
  const finalTotalPrice = selectedTotalPrice + shippingFee;

  const { request: requestPayment } = usePayment();

  // 결제하기 버튼 핸들러
  const handleCheckout = async () => {
    if (selectedCartItems.length === 0) {
      alert("결제할 상품을 선택해주세요.");
      return;
    }

    const orderInfo = {
      recipientName: "홍길동",
      phoneNumber: "010-1234-5678",
      postalCode: "12345",
      addressLine1: "서울특별시 강남구 테헤란로 123",
      addressLine2: "101동 202호",
      orderItems: selectedCartItems.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    // 실제 결제 API 호출
    await requestPayment(orderInfo);
  };
  return (
    <Card className="border-neutral-200">
      <CardContent className="p-4 md:p-6 space-y-5">
        <h2 className="text-sm md:text-base text-neutral-900">주문 요약</h2>

        <div className="space-y-3">
          <div className="flex justify-between text-sm md:text-base text-neutral-700">
            <span>상품 금액</span>
            <span>{selectedTotalPrice.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-sm md:text-base text-neutral-700">
            <span>배송비</span>
            <span>
              {shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-sm md:text-base text-neutral-900">
            총 결제 금액
          </span>
          <span className="text-lg md:text-xl font-bold text-green-600">
            {finalTotalPrice.toLocaleString()}원
          </span>
        </div>

        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white h-10 md:h-11 text-sm md:text-base"
          onClick={handleCheckout}
          disabled={selectedCartItems.length === 0}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          결제하기
        </Button>

        <Link
          to={ROUTES.PRODUCTS}
          className="block text-center text-xs md:text-sm text-neutral-600 border-b border-neutral-300 pb-0.5 w-fit mx-auto hover:text-neutral-900"
        >
          쇼핑 계속하기
        </Link>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
