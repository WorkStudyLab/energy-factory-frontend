import { useState, useEffect, useRef } from "react";
import {
  useCart,
  useUpdateCartQuantity,
  useDeleteCartItem,
  useDeleteSelectedItems,
  useClearCart,
} from "@/features/cart/hooks/useCart";
import CartEmpty from "@/features/cart/ui/CartEmpty";
import NutritionCard from "@/features/cart/ui/NutritionCard";
import OrderSummary from "@/features/cart/ui/OrderSummary";
import CartProductList from "@/features/cart/ui/CartProductList";

export default function CartPage() {
  const { data: cart, isLoading } = useCart();
  const updateQuantityMutation = useUpdateCartQuantity();
  const deleteCartItemMutation = useDeleteCartItem();
  const deleteSelectedItemsMutation = useDeleteSelectedItems();
  const clearCartMutation = useClearCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const isInitialized = useRef(false);

  // 초기 진입 시 전체 선택
  useEffect(() => {
    if (cart?.items && cart.items.length > 0 && !isInitialized.current) {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-600">로딩 중...</p>
      </div>
    );
  }

  // 장바구니가 비어있는 경우
  if (!cart?.items || cart.items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="container max-w-[1248px] mx-auto px-4 pt-12">
        {/* 장바구니 헤더 */}
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
            <CartProductList
              cart={cart}
              selectedItems={selectedItems}
              handleSelectAll={handleSelectAll}
              handleDeleteSelected={handleDeleteSelected}
              handleClearCart={handleClearCart}
              handleSelectItem={handleSelectItem}
              handleUpdateQuantity={handleUpdateQuantity}
              handleDeleteItem={handleDeleteItem}
            />

            {/* 영양소 요약 영역 */}
            <NutritionCard cart={cart} selectedItems={selectedItems} />
          </div>

          {/* 오른쪽: 주문 요약 */}
          <div className="w-full lg:w-[395px]">
            <OrderSummary cart={cart} selectedItems={selectedItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
