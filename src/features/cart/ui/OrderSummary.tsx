import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import usePayment from "@/features/order/hooks/usePayment";
import type { Cart } from "@/types/cart";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSummary = (props: { cart: Cart; selectedItems: number[] }) => {
  const { request: requestPayment } = usePayment();
  // 결제하기 버튼 핸들러
  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      alert("결제할 상품을 선택해주세요.");
      return;
    }

    const orderInfo = {
      recipientName: "홍길동",
      phoneNumber: "010-1234-5678",
      postalCode: "12345",
      addressLine1: "서울특별시 강남구 테헤란로 123",
      addressLine2: "101동 202호",
      orderItems: cart!.items
        .filter((item) => selectedItems.includes(item.id))
        .map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
    };
    // 실제 결제 API 호출
    await requestPayment(orderInfo);
  };

  const { cart, selectedItems } = props;
  const selectedTotal =
    cart?.items
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.totalPrice, 0) || 0;
  return (
    <Card className="border-neutral-200">
      <CardContent className="p-4 md:p-6 space-y-5">
        <h2 className="text-sm md:text-base text-neutral-900">주문 요약</h2>

        <div className="space-y-3">
          <div className="flex justify-between text-sm md:text-base text-neutral-700">
            <span>상품 금액</span>
            <span>{selectedTotal.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-sm md:text-base text-neutral-700">
            <span>배송비</span>
            <span>무료</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-sm md:text-base text-neutral-900">
            총 결제 금액
          </span>
          <span className="text-lg md:text-xl font-bold text-green-600">
            {selectedTotal.toLocaleString()}원
          </span>
        </div>

        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white h-10 md:h-11 text-sm md:text-base"
          onClick={handleCheckout}
          disabled={selectedItems.length === 0}
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
