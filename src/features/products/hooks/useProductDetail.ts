import { useQuery } from "@tanstack/react-query";
import type { ProductDetail, ProductServerDetail, ApiResponse } from "@/types/product";
import { api } from "@/lib/axios/axios";

// 서버 데이터를 UI용 데이터로 변환
const transformServerToDetail = (serverData: ProductServerDetail): ProductDetail => {
  // 기본 Mock 데이터 (서버에서 제공하지 않는 필드들)
  const mockEnhancements = {
    originalPrice: serverData.price * 1.2,
    discount: 20,
    rating: 4.5,
    reviewCount: 123,
    soldCount: 456,
    images: [
      serverData.imageUrl || "https://placehold.co/600x600?text=상품이미지",
      "https://placehold.co/600x600?text=이미지2",
      "https://placehold.co/600x600?text=이미지3",
      "https://placehold.co/600x600?text=영양성분표",
    ],
    features: [
      "신선한 재료",
      "당일 배송",
      "품질 보증",
      "HACCP 인증",
    ],
    variants: [
      { name: `${serverData.weight}${serverData.weightUnit}`, price: serverData.price, stock: serverData.stock },
      { name: `${serverData.weight * 2}${serverData.weightUnit}`, price: serverData.price * 1.8, stock: Math.floor(serverData.stock / 2) },
    ],
    shipping: {
      fee: 3000,
      freeShippingThreshold: 30000,
      estimatedDays: "1-2",
    },
  };

  // 영양정보 처리 (API 데이터 우선, 없으면 기본값)
  const nutrition = serverData.nutrition || {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  // 비타민/미네랄 처리 (API 데이터 우선, 없으면 빈 배열)
  const vitaminsAndMinerals = serverData.vitaminsAndMinerals || [];

  // 목표별 점수 처리 (API 데이터 우선, 없으면 기본값)
  const goalScores = serverData.goalScores || {
    "muscle-gain": 0,
    "weight-loss": 0,
    energy: 0,
    recovery: 0,
    health: 0,
  };

  // 서버 데이터와 Mock 데이터 병합
  return {
    ...mockEnhancements,
    id: serverData.id,
    name: serverData.name,
    brand: serverData.brand,
    price: serverData.price,
    category: serverData.category,
    imageUrl: serverData.imageUrl || "https://placehold.co/600x600?text=상품이미지",
    weight: serverData.weight,
    weightUnit: serverData.weightUnit,
    stock: serverData.stock,
    status: serverData.status,
    averageRating: serverData.averageRating,
    reviewCount: serverData.reviewCount,
    tags: serverData.tags?.map(t => t.name) || [],
    description: serverData.description || "상품 설명이 준비 중입니다.",
    storage: serverData.storage || "냉장 보관",
    nutrition,
    vitaminsAndMinerals,
    goalScores,
  };
};

// 상품 상세 조회 API
const fetchProductDetail = async (id: string): Promise<ProductDetail> => {
  const response = await api.get<ApiResponse<ProductServerDetail>>(`/api/products/${id}`);
  return transformServerToDetail(response.data.data);
};

export const useProductDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => {
      if (!id) throw new Error("Product ID is required");
      return fetchProductDetail(id);
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10분
  });
};