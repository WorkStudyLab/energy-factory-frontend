// 영양소 정보 (백엔드에서 아직 제공하지 않을 수 있어 optional)
export interface Nutrition {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

// 장바구니 아이템
export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  variantId: number;
  variantName: string;
  price: number;
  discountRate: number;
  finalPrice: number;
  quantity: number;
  stock: number;
  isAvailable: boolean;
  productStatus: string;
  imageUrl: string;
  nutrition?: Nutrition; // Optional: 백엔드에서 추가될 예정
}

// 장바구니 전체 데이터
export interface Cart {
  items: CartItem[];
  totalPrice: number;
  totalDiscount: number;
  shippingFee: number;
  finalPrice: number;
}

// API 응답 wrapper
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
