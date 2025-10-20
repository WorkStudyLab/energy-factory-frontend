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
  originalPrice?: number;  // 할인 전 원가
  discount?: number;  // 할인율 (%)
}

// 실제 서버 응답 구조에 맞춘 상품 상세
export interface ProductServerDetail {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  images: string[];
  brand: string;
  weight: number;
  weightUnit: string;
  description: string;
  stock?: number;
  status: string;
  storage: string;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  reviewCount: number;
  tags: Tag[] | null;
  originalPrice?: number | null;
  discount?: number | null;
  variants?: Array<{
    id: number;
    name: string;
    price: number;
    stock: number;
  }>;
  shipping?: {
    fee: number;
    freeShippingThreshold?: number;
    estimatedDays?: string;
  };
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    saturatedFat?: number;
    transFat?: number;
    cholesterol?: number;
    sodium?: number;
    fiber?: number;
    sugars?: number;
  };
  vitaminsAndMinerals?: Array<{
    name: string;
    amount: string;
    daily: number;
  }>;
  goalScores?: Record<string, number>;
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
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  saturatedFat?: number;
  transFat?: number;
  cholesterol?: number;
  sodium?: number;
  fiber?: number;
  sugars?: number;
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