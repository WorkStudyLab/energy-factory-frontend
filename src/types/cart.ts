// 영양소 정보
export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugars?: number;
  saturatedFat?: number;
  transFat?: number;
  cholesterol?: number;
  sodium?: number;
}

// 영양소 요약
export interface NutritionSummary {
  totalCalories: number;
  proteinRatio: number;
  carbsRatio: number;
  fatRatio: number;
}

// 장바구니 아이템
export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string; // 실제 API 응답 필드명
  productCategory: string;
  variantId: number;
  variantName: string;
  price: number;
  quantity: number;
  totalPrice: number; // 가격 * 수량
  stock: number;
  isAvailable: boolean;
  productStatus: string;
  nutrition?: Nutrition;
  weight: number;
  weightUnit: string;
  createdAt: string;
  updatedAt: string;

  // UI에서 사용하는 별칭
  imageUrl?: string; // productImageUrl의 별칭
  discountRate?: number; // 할인율 (추후 추가 가능)
  finalPrice?: number; // totalPrice의 별칭
}

// 장바구니 전체 데이터
export interface Cart {
  items: CartItem[];
  itemCount: number;
  totalQuantity: number;
  totalPrice: number;
  shippingFee: number;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  finalPrice: number;
  nutritionSummary?: NutritionSummary;

  // 하위 호환성을 위한 필드
  totalDiscount?: number;
}

// API 응답 wrapper
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
