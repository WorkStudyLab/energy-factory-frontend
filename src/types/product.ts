// 태그 타입
export interface Tag {
  id: number;
  name: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

// 영양소 타입
export interface Nutrient {
  id: number;
  name: string;
  value: string;
  unit: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  brand: string;
  weight: number;
  weightUnit: string;
  stock: number;
  status: string;
  averageRating: number;
  reviewCount: number;
  tags: string[];  // 목록에서는 string 배열
}

// 실제 서버 응답 구조에 맞춘 상품 상세
export interface ProductServerDetail {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  brand: string;
  weight: number;
  weightUnit: string;
  description: string;
  stock: number;
  status: string;
  storage: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[] | null;
  nutrients: Nutrient[] | null;
}

export interface PageInfo {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pageInfo: PageInfo;
}

export interface ApiResponse<T> {
  status: number;
  code: string;
  desc: string;
  data: T;
}

export interface ProductFilters {
  category?: string;
  keyword?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  size?: number;
}

// 상품 상세 타입 정의
export interface ProductDetail extends Product {
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  description: string;
  images: string[];
  nutrition: NutritionInfo;
  vitaminsAndMinerals: VitaminMineral[];
  features: string[];
  goalScores: Record<string, number>;
  variants: ProductVariant[];
  shipping: ShippingInfo;
  storage: string;
  cookingMethods: CookingMethod[];
  nutritionTips: string[];
  complementaryProducts: ComplementaryProduct[];
  reviews: Review[];
  qna: QnA[];
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  fiber: number;
  sugars: number;
}

export interface VitaminMineral {
  name: string;
  amount: string;
  daily: number;
}

export interface ProductVariant {
  name: string;
  price: number;
  stock: number;
}

export interface ShippingInfo {
  fee: number;
  freeShippingThreshold: number;
  estimatedDays: string;
}

export interface CookingMethod {
  name: string;
  time: string;
  description: string;
}

export interface ComplementaryProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  reason: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  content: string;
  helpful: number;
  goal: string;
  images: string[];
}

export interface QnA {
  id: number;
  question: string;
  answer: string;
  date: string;
}