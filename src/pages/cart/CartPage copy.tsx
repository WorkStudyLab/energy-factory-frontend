import { Minus, Plus, ShoppingBag, Trash2, AlertCircle, Loader2, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useCart } from "@/features/cart/hooks/useCart";
import { useAuthStore } from "@/stores/useAuthStore";
import { ROUTES } from "@/constants/routes";

export default function CartPage() {
  const { isAuthenticated } = useAuthStore();
  const { data: cart, isLoading, error, refetch } = useCart();

  // 체크박스 상태 관리
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  // 장바구니 데이터가 로드되면 모든 항목을 선택 상태로 초기화
  useEffect(() => {
    if (cart?.items) {
      setSelectedItems(new Set(cart.items.map(item => item.id)));
    }
  }, [cart?.items]);

  // 로그인하지 않은 경우
  if (!isAuthenticated) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <LogIn className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">로그인이 필요합니다</h2>
          <p className="text-gray-500 mb-6">
            장바구니를 이용하려면 로그인이 필요합니다
          </p>
          <Link to={ROUTES.LOGIN}>
            <Button className="bg-green-600 hover:bg-green-700">
              로그인하러 가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // 로딩 중
  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 text-green-600 animate-spin mb-4" />
          <p className="text-gray-500">장바구니를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">장바구니를 불러올 수 없습니다</h2>
          <p className="text-gray-500 mb-6">
            {error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다"}
          </p>
          <Button onClick={() => refetch()} className="bg-green-600 hover:bg-green-700">
            다시 시도하기
          </Button>
        </div>
      </div>
    );
  }

  // 장바구니 데이터가 없는 경우 (안전장치)
  if (!cart) {
    return null;
  }

  const cartItems = cart.items;

  // 전체 선택 상태 확인
  const isAllSelected = cartItems.length > 0 && selectedItems.size === cartItems.length;

  // 전체 선택/해제 핸들러
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  // 개별 항목 선택/해제 핸들러
  const handleSelectItem = (itemId: number, checked: boolean) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
  };

  // Calculate nutrition totals (영양소 데이터가 있는 경우에만)
  const hasNutritionData = cartItems.some(item => item.nutrition);
  const nutritionTotals = hasNutritionData
    ? cartItems.reduce(
        (totals, item) => {
          if (!item.nutrition) return totals;
          return {
            protein: totals.protein + item.nutrition.protein * item.quantity,
            carbs: totals.carbs + item.nutrition.carbs * item.quantity,
            fat: totals.fat + item.nutrition.fat * item.quantity,
            calories: totals.calories + item.nutrition.calories * item.quantity,
          };
        },
        { protein: 0, carbs: 0, fat: 0, calories: 0 },
      )
    : { protein: 0, carbs: 0, fat: 0, calories: 0 };

  // TODO: 수량 변경 API 구현 (현재는 GET만 구현)
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    console.log("TODO: Update quantity API", { id, newQuantity });
  };

  // TODO: 아이템 삭제 API 구현 (현재는 GET만 구현)
  const removeItem = (id: number) => {
    console.log("TODO: Remove item API", { id });
  };

  // 선택된 항목들만 필터링
  const selectedCartItems = cartItems.filter(item => selectedItems.has(item.id));

  // 선택된 항목 기준 금액 계산
  const selectedTotalPrice = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedTotalDiscount = selectedCartItems.reduce((sum, item) => {
    const finalPrice = item.finalPrice ?? item.price;
    const discountAmount = item.price * item.quantity - finalPrice * item.quantity;
    return sum + discountAmount;
  }, 0);
  const selectedFinalPrice = selectedTotalPrice - selectedTotalDiscount;

  // 배송비 계산 (무료배송 기준 금액 사용)
  const freeShippingThreshold = cart.freeShippingThreshold || 30000;
  const selectedShippingFee = selectedFinalPrice >= freeShippingThreshold ? 0 : (cart.shippingFee || 3000);
  const selectedOrderTotal = selectedFinalPrice + selectedShippingFee;

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">장바구니</h1>
          <p className="text-gray-500">
            장바구니에 담긴 상품과 영양소 정보를 확인하세요
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Cart Items */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="select-all"
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />
                  <label
                    htmlFor="select-all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    전체 선택
                  </label>
                  <CardTitle className="flex-1">장바구니 상품 ({cartItems.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium">
                      장바구니가 비어있습니다
                    </h3>
                    <p className="text-gray-500 mt-1">
                      상품을 추가하고 건강한 쇼핑을 시작하세요
                    </p>
                    <Button className="mt-4 bg-green-600 hover:bg-green-700">
                      쇼핑 계속하기
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 py-4 border-b last:border-0"
                      >
                        <Checkbox
                          id={`item-${item.id}`}
                          checked={selectedItems.has(item.id)}
                          onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                          className="mt-1"
                        />
                        <img
                          src={item.imageUrl || "https://placehold.co/80x80"}
                          alt={item.productName}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium">{item.productName}</h3>
                          <p className="text-sm text-gray-400">{item.variantName}</p>
                          {item.nutrition ? (
                            <div className="text-sm text-gray-500 space-y-1">
                              <p>단백질: {item.nutrition.protein}g</p>
                              <p>탄수화물: {item.nutrition.carbs}g</p>
                              <p>지방: {item.nutrition.fat}g</p>
                              <p>칼로리: {item.nutrition.calories}kcal</p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400">영양소 정보 없음</p>
                          )}
                          {!item.isAvailable && (
                            <p className="text-sm text-red-500">품절된 상품입니다</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {(item.discountRate ?? 0) > 0 && (
                            <div className="text-sm text-gray-400 line-through">
                              {(item.price * item.quantity).toLocaleString()}원
                            </div>
                          )}
                          <p className="font-bold">
                            {((item.finalPrice ?? item.price) * item.quantity).toLocaleString()}원
                          </p>
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={!item.isAvailable}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">감소</span>
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={!item.isAvailable || item.quantity >= item.stock}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">증가</span>
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-red-500 hover:text-red-700"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            삭제
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  쇼핑 계속하기
                </Button>
              </CardFooter>
            </Card>

            {/* Nutrition Summary - 영양소 데이터가 있을 때만 표시 */}
            {hasNutritionData && (
              <Card>
                <CardHeader>
                  <CardTitle>영양소 요약</CardTitle>
                  <CardDescription>
                    장바구니 상품의 총 영양소 구성 비율
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                {/* 원형 그래프 */}
                <div className="flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={(() => {
                          const totalCalories = (nutritionTotals.carbs * 4) + (nutritionTotals.protein * 4) + (nutritionTotals.fat * 9);
                          return [
                            { name: "탄수화물", value: nutritionTotals.carbs * 4, color: "#3b82f6", percentage: totalCalories > 0 ? Math.round((nutritionTotals.carbs * 4 / totalCalories) * 100) : 0 },
                            { name: "단백질", value: nutritionTotals.protein * 4, color: "#22c55e", percentage: totalCalories > 0 ? Math.round((nutritionTotals.protein * 4 / totalCalories) * 100) : 0 },
                            { name: "지방", value: nutritionTotals.fat * 9, color: "#f59e0b", percentage: totalCalories > 0 ? Math.round((nutritionTotals.fat * 9 / totalCalories) * 100) : 0 },
                          ];
                        })()}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percentage }) => `${name}\n${percentage}%`}
                        labelLine={true}
                      >
                        {[
                          { name: "탄수화물", value: nutritionTotals.carbs * 4, color: "#3b82f6" },
                          { name: "단백질", value: nutritionTotals.protein * 4, color: "#22c55e" },
                          { name: "지방", value: nutritionTotals.fat * 9, color: "#f59e0b" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  {/* 범례 */}
                  <div className="w-full flex justify-center gap-6 mt-4">
                    {[
                      { name: "탄수화물", color: "#3b82f6" },
                      { name: "단백질", color: "#22c55e" },
                      { name: "지방", color: "#f59e0b" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* 영양소 상세 */}
                <div className="flex justify-around">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-gray-700">탄수화물</span>
                    <span className="text-lg font-bold">{nutritionTotals.carbs}g</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round(((nutritionTotals.carbs * 4) / ((nutritionTotals.carbs * 4) + (nutritionTotals.protein * 4) + (nutritionTotals.fat * 9))) * 100)}%)
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-gray-700">단백질</span>
                    <span className="text-lg font-bold">{nutritionTotals.protein}g</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round(((nutritionTotals.protein * 4) / ((nutritionTotals.carbs * 4) + (nutritionTotals.protein * 4) + (nutritionTotals.fat * 9))) * 100)}%)
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-gray-700">지방</span>
                    <span className="text-lg font-bold">{nutritionTotals.fat}g</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round(((nutritionTotals.fat * 9) / ((nutritionTotals.carbs * 4) + (nutritionTotals.protein * 4) + (nutritionTotals.fat * 9))) * 100)}%)
                    </span>
                  </div>
                </div>

                <Separator />

                {/* 총 칼로리 */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-medium text-gray-700">총 칼로리</span>
                  <span className="text-2xl font-bold text-purple-600">{nutritionTotals.calories}kcal</span>
                </div>
              </CardContent>
              </Card>
            )}

            {/* Recommended Products */}
            {/*<Card>*/}
            {/*  <CardHeader>*/}
            {/*    <CardTitle>추천 상품</CardTitle>*/}
            {/*    <CardDescription>*/}
            {/*      영양 목표 달성을 위한 추천 상품*/}
            {/*    </CardDescription>*/}
            {/*  </CardHeader>*/}
            {/*  <CardContent>*/}
            {/*    <div className="space-y-4">*/}
            {/*      <div className="flex items-center gap-2 text-green-600">*/}
            {/*        <TrendingUp className="h-4 w-4" />*/}
            {/*        <span className="text-sm font-medium">*/}
            {/*          단백질 섭취량을 높이기 위한 추천 상품*/}
            {/*        </span>*/}
            {/*      </div>*/}
            {/*      <div className="grid gap-4 md:grid-cols-2">*/}
            {/*        {recommendedProducts.map((product) => (*/}
            {/*          <div*/}
            {/*            key={product.id}*/}
            {/*            className="flex gap-4 items-center border rounded-lg p-3"*/}
            {/*          >*/}
            {/*            <img*/}
            {/*              src={product.image || "https://placehold.co/60x60"}*/}
            {/*              alt={product.name}*/}
            {/*              className="w-16 h-16 object-cover rounded"*/}
            {/*            />*/}
            {/*            <div className="flex-1">*/}
            {/*              <h4 className="font-medium">{product.name}</h4>*/}
            {/*              <p className="text-sm text-gray-500">*/}
            {/*                단백질 {product.protein}g / {product.calories} kcal*/}
            {/*              </p>*/}
            {/*              <div className="flex justify-between items-center mt-2">*/}
            {/*                <span className="font-bold">*/}
            {/*                  {product.price.toLocaleString()}원*/}
            {/*                </span>*/}
            {/*                <Button variant="outline" size="sm">*/}
            {/*                  추가*/}
            {/*                </Button>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        ))}*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </CardContent>*/}
            {/*</Card>*/}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>주문 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-500 mb-2">
                  선택된 상품: {selectedItems.size}개
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>상품 금액</span>
                    <span>{selectedTotalPrice.toLocaleString()}원</span>
                  </div>
                  {selectedTotalDiscount > 0 && (
                    <div className="flex justify-between text-red-500">
                      <span>할인 금액</span>
                      <span>-{selectedTotalDiscount.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>배송비</span>
                    <span>
                      {selectedShippingFee > 0 ? `${selectedShippingFee.toLocaleString()}원` : "무료"}
                    </span>
                  </div>
                  {selectedShippingFee > 0 && selectedFinalPrice < freeShippingThreshold && (
                    <div className="text-sm text-gray-500">
                      {(freeShippingThreshold - selectedFinalPrice).toLocaleString()}원 더 구매 시 무료 배송
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>총 결제 금액</span>
                  <span>{selectedOrderTotal.toLocaleString()}원</span>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  결제하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
