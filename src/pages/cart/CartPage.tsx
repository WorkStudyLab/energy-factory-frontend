import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import {
  useCart,
  useUpdateCartQuantity,
  useDeleteCartItem,
  useDeleteSelectedItems,
  useClearCart,
} from "@/features/cart/hooks/useCart";
import { ROUTES } from "@/constants/routes";
import type { CartItem } from "@/types/cart";

export default function CartPage() {
  const { data: cart, isLoading } = useCart();
  const updateQuantityMutation = useUpdateCartQuantity();
  const deleteCartItemMutation = useDeleteCartItem();
  const deleteSelectedItemsMutation = useDeleteSelectedItems();
  const clearCartMutation = useClearCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigate = useNavigate();
  const isInitialized = useRef(false);

  // 초기 진입 시 전체 선택
  useEffect(() => {
    if (
      cart?.items &&
      cart.items.length > 0 &&
      !isInitialized.current
    ) {
      setSelectedItems(cart.items.map((item) => item.id));
      isInitialized.current = true;
    }
  }, [cart?.items]);

  // 전체 선택/해제
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(cart?.items.map((item) => item.id) || []);
    } else {
      setSelectedItems([]);
    }
  };

  // 개별 아이템 선택/해제
  const handleSelectItem = (itemId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  // 선택된 아이템들의 총액 계산
  const selectedTotal =
    cart?.items
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.totalPrice, 0) || 0;

  // 선택된 아이템들의 영양소 합계
  const selectedNutrition = cart?.items
    .filter((item) => selectedItems.includes(item.id))
    .reduce(
      (acc, item) => {
        const nutrition = item.nutrition;
        if (nutrition) {
          return {
            protein: acc.protein + nutrition.protein * item.quantity,
            carbs: acc.carbs + nutrition.carbs * item.quantity,
            fat: acc.fat + nutrition.fat * item.quantity,
            calories: acc.calories + nutrition.calories * item.quantity,
          };
        }
        return acc;
      },
      { protein: 0, carbs: 0, fat: 0, calories: 0 },
    );

  // 영양소 비율 계산
  const totalMacros = selectedNutrition
    ? selectedNutrition.protein +
      selectedNutrition.carbs +
      selectedNutrition.fat
    : 0;
  const proteinRatio = totalMacros
    ? Math.round((selectedNutrition!.protein / totalMacros) * 100)
    : 0;
  const carbsRatio = totalMacros
    ? Math.round((selectedNutrition!.carbs / totalMacros) * 100)
    : 0;
  const fatRatio = totalMacros
    ? Math.round((selectedNutrition!.fat / totalMacros) * 100)
    : 0;

  // 파이 차트 데이터
  const chartData = [
    { name: "단백질", value: proteinRatio, color: "#9810fa" },
    { name: "지방", value: fatRatio, color: "#f54900" },
    { name: "탄수화물", value: carbsRatio, color: "#155dfc" },
  ];

  // 수량 변경 핸들러
  const handleUpdateQuantity = (cartItemId: number, newQuantity: number) => {
    // 수량은 1~999 사이여야 함
    if (newQuantity < 1 || newQuantity > 999) return;

    updateQuantityMutation.mutate({
      cartItemId,
      quantity: newQuantity,
    });
  };

  // 개별 아이템 삭제 핸들러
  const handleDeleteItem = (cartItemId: number) => {
    if (confirm("이 상품을 장바구니에서 삭제하시겠습니까?")) {
      deleteCartItemMutation.mutate(cartItemId, {
        onSuccess: () => {
          // 삭제된 아이템을 선택 목록에서도 제거
          setSelectedItems((prev) => prev.filter((id) => id !== cartItemId));
        },
      });
    }
  };

  // 선택 삭제 핸들러
  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      alert("삭제할 상품을 선택해주세요.");
      return;
    }

    if (confirm(`선택한 ${selectedItems.length}개 상품을 삭제하시겠습니까?`)) {
      deleteSelectedItemsMutation.mutate(selectedItems, {
        onSuccess: () => {
          // 선택 목록 초기화
          setSelectedItems([]);
        },
      });
    }
  };

  // 전체 삭제 핸들러
  const handleClearCart = () => {
    if (!cart?.items || cart.items.length === 0) return;

    if (confirm("장바구니의 모든 상품을 삭제하시겠습니까?")) {
      clearCartMutation.mutate(undefined, {
        onSuccess: () => {
          // 선택 목록 초기화
          setSelectedItems([]);
        },
      });
    }
  };

  // 결제하기 버튼 핸들러
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("결제할 상품을 선택해주세요.");
      return;
    }
    // TODO: 실제 결제 API 호출 후 주문 완료 페이지로 이동
    navigate(ROUTES.ORDER_COMPLETE);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-600">로딩 중...</p>
      </div>
    );
  }

  // 장바구니가 비어있는 경우
  if (!cart?.items || cart.items.length === 0) {
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
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="container max-w-[1248px] mx-auto px-4 pt-12">
        {/* 헤더 */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-900">
            장바구니
          </h1>
          <p className="text-sm md:text-base font-semibold text-neutral-600 text-center px-4">
            장바구니에 담긴 상품과 영양소 정보를 확인하세요
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 왼쪽: 장바구니 아이템 목록 */}
          <div className="flex-1 space-y-6">
            {/* 장바구니 아이템 카드 */}
            <Card className="border-neutral-200">
              <CardContent className="p-6">
                {/* 전체 선택 헤더 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={
                        selectedItems.length === cart?.items.length &&
                        cart?.items.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm sm:text-base text-neutral-900">
                      전체 선택 ({selectedItems.length}/
                      {cart?.items.length || 0})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600">
                    <button
                      onClick={handleDeleteSelected}
                      className="hover:text-neutral-900"
                    >
                      선택 삭제
                    </button>
                    <span>|</span>
                    <button
                      onClick={handleClearCart}
                      className="hover:text-neutral-900"
                    >
                      모두 삭제
                    </button>
                  </div>
                </div>

                {/* 아이템 목록 */}
                <div className="space-y-6">
                  {cart?.items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      isSelected={selectedItems.includes(item.id)}
                      onSelect={(checked) => handleSelectItem(item.id, checked)}
                      onUpdateQuantity={handleUpdateQuantity}
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 영양소 요약 카드 */}
            <Card className="border-neutral-200">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-sm md:text-base text-neutral-900 mb-2">
                  영양소 요약
                </h2>
                <p className="text-xs md:text-sm text-neutral-600 mb-6">
                  담아두신 상품들의 총 영양성분을 확인해 보세요
                </p>

                {/* 파이 차트 */}
                <div className="h-48 md:h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend
                        verticalAlign="middle"
                        align="right"
                        layout="vertical"
                        iconType="circle"
                        iconSize={14}
                        formatter={(
                          value,
                          entry: {
                            color?: string;
                            payload?: { value?: number };
                          },
                        ) => (
                          <span
                            className="text-sm"
                            style={{ color: entry.color }}
                          >
                            {value} {entry.payload?.value}%
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <Separator className="mb-6" />

                {/* 영양소 상세 */}
                <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
                  <NutritionDetail
                    label="탄수화물"
                    value={`${selectedNutrition?.carbs.toFixed(1) || 0}g`}
                    percentage={`${carbsRatio}%`}
                    color="text-blue-500"
                  />
                  <NutritionDetail
                    label="단백질"
                    value={`${selectedNutrition?.protein || 0}g`}
                    percentage={`${proteinRatio}%`}
                    color="text-violet-500"
                  />
                  <NutritionDetail
                    label="지방"
                    value={`${selectedNutrition?.fat.toFixed(1) || 0}g`}
                    percentage={`${fatRatio}%`}
                    color="text-orange-500"
                  />
                </div>

                <Separator className="mb-6" />

                {/* 총 칼로리 */}
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs md:text-sm text-center text-neutral-600">
                    총 칼로리
                  </p>
                  <p className="text-lg md:text-xl text-center text-neutral-900">
                    {selectedNutrition?.calories || 0}kcal
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽: 주문 요약 */}
          <div className="w-full lg:w-[395px]">
            <Card className="border-neutral-200">
              <CardContent className="p-4 md:p-6 space-y-5">
                <h2 className="text-sm md:text-base text-neutral-900">
                  주문 요약
                </h2>

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
          </div>
        </div>
      </div>
    </div>
  );
}

// 장바구니 아이템 행 컴포넌트
function CartItemRow({
  item,
  isSelected,
  onSelect,
  onUpdateQuantity,
  onDelete,
}: {
  item: CartItem;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onUpdateQuantity: (cartItemId: number, quantity: number) => void;
  onDelete: (cartItemId: number) => void;
}) {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity < 999) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDelete = () => {
    onDelete(item.id);
  };

  // 상품 영역 클릭 시 체크박스 토글
  const handleItemClick = () => {
    onSelect(!isSelected);
  };

  // 버튼 클릭 시 이벤트 전파 중단
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex gap-3 md:gap-4 pb-6 border-b border-neutral-200 last:border-0">
      {/* 체크박스 */}
      <div className="pt-2" onClick={stopPropagation}>
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
        />
      </div>

      {/* 상품 이미지 */}
      <div
        className="w-16 h-16 md:w-24 md:h-24 border border-neutral-200 rounded-lg overflow-hidden shrink-0 cursor-pointer"
        onClick={handleItemClick}
      >
        <img
          src={item.productImageUrl}
          alt={item.productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 상품 정보 */}
      <div className="flex-1 space-y-2 cursor-pointer" onClick={handleItemClick}>
        <h3 className="text-sm md:text-base text-neutral-900">
          {item.productName}
        </h3>

        {/* 영양 정보 */}
        {item.nutrition && (
          <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 text-xs md:text-sm text-neutral-600">
            <span>단백질: {item.nutrition.protein}g</span>
            <span>탄수화물: {item.nutrition.carbs}g</span>
            <span>지방: {item.nutrition.fat}g</span>
            <span>칼로리: {item.nutrition.calories}kcal</span>
          </div>
        )}

        {/* 수량 조절 및 가격 */}
        <div
          className="flex items-center justify-between"
          onClick={stopPropagation}
        >
          {/* 수량 조절 */}
          <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden h-7 md:h-8">
            <button
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className="w-7 md:w-8 h-full flex items-center justify-center border-r border-neutral-200 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            <span className="w-10 md:w-12 text-center text-xs md:text-sm">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={item.quantity >= 999}
              className="w-7 md:w-8 h-full flex items-center justify-center border-l border-neutral-200 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>

          {/* 가격 및 삭제 */}
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-sm md:text-base text-neutral-900">
              {item.totalPrice.toLocaleString()}원
            </span>
            <button
              onClick={handleDelete}
              className="w-7 h-7 md:w-8 md:h-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center"
            >
              <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-neutral-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 영양소 상세 정보 컴포넌트
function NutritionDetail({
  label,
  value,
  percentage,
  color,
}: {
  label: string;
  value: string;
  percentage: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-xs md:text-sm text-center text-neutral-600">
        {label}
      </p>
      <p className={`text-sm md:text-base ${color}`}>{value}</p>
      <p className="text-[10px] md:text-xs text-center text-neutral-500">
        {percentage}
      </p>
    </div>
  );
}
