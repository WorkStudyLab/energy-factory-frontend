import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

const CartEmpty = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Card className="border-neutral-200 w-full max-w-[620px]">
        <CardContent className="p-16 flex flex-col items-center gap-7">
          {/* 아이콘 */}
          <div className="size-24 rounded-full bg-neutral-100 flex items-center justify-center">
            <ShoppingBag className="size-12 text-neutral-400" />
          </div>

          {/* 제목 */}
          <h2 className="text-2xl font-bold text-neutral-900">
            장바구니가 비어있습니다
          </h2>

          {/* 설명 */}
          <div className="text-center text-lg text-neutral-600 space-y-1">
            <p>Energy Factory의 건강한 상품을 장바구니에 담아보세요.</p>
            <p>맞춤형 영양 정보와 함께 최적의 식단을 구성할 수 있습니다.</p>
          </div>

          {/* 쇼핑하기 버튼 */}
          <Button
            asChild
            className="bg-green-600 hover:bg-green-700 text-white h-11 px-12"
          >
            <Link to={ROUTES.PRODUCTS}>쇼핑하기</Link>
          </Button>

          {/* 혜택 안내 */}
          <div className="border-t border-neutral-200 pt-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 무료 배송 */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-bold text-green-600">무료 배송</p>
                <p className="text-sm text-neutral-600 text-center">
                  30,000원 이상 구매시
                </p>
              </div>

              {/* 영양 정보 */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-bold text-green-600">영양 정보</p>
                <p className="text-sm text-neutral-600 text-center">
                  맞춤형 영양 분석 제공
                </p>
              </div>

              {/* 안전 거래 */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-bold text-green-600">안전 거래</p>
                <p className="text-sm text-neutral-600 text-center">
                  100% 상품 보호
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartEmpty;
