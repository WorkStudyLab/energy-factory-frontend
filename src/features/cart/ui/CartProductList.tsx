import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Cart, CartItem } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";

interface ICartProductListProps {
  cart: Cart;
  selectedItems: number[];
  handleSelectAll: (checked: boolean) => void;
  handleDeleteSelected: () => void;
  handleClearCart: () => void;
  handleSelectItem: (itemId: number, checked: boolean) => void;
  handleUpdateQuantity: (cartItemId: number, newQuantity: number) => void;
  handleDeleteItem: (cartItemId: number) => void;
}

const CartProductList = (props: ICartProductListProps) => {
  const {
    cart,
    selectedItems,
    handleSelectAll,
    handleDeleteSelected,
    handleClearCart,
    handleSelectItem,
    handleUpdateQuantity,
    handleDeleteItem,
  } = props;
  return (
    <Card className="border-neutral-200">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedItems.length === cart?.items.length}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm sm:text-base text-neutral-900">
              전체 선택 ({selectedItems.length}/{cart?.items.length || 0})
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
  );
};

export default CartProductList;

interface ICartItemRowProps {
  item: CartItem;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onUpdateQuantity: (cartItemId: number, quantity: number) => void;
  onDelete: (cartItemId: number) => void;
}

// 장바구니 아이템 행 컴포넌트
function CartItemRow(props: ICartItemRowProps) {
  const { item, isSelected, onSelect, onUpdateQuantity, onDelete } = props;
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
    <div
      className="flex gap-3 md:gap-4 pb-6 border-b border-neutral-200 last:border-0"
      onClick={handleItemClick}
    >
      {/* 체크박스 */}
      <div className="pt-2">
        <Checkbox
          checked={isSelected}
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
      <div
        className="flex-1 space-y-2 cursor-pointer"
        onClick={handleItemClick}
      >
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
