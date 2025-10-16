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
    nutrition: {
      calories: 150,
      protein: parseFloat(serverData.nutrients?.find(n => n.name === "단백질")?.value || "20"),
      carbs: parseFloat(serverData.nutrients?.find(n => n.name === "탄수화물")?.value || "10"),
      fat: parseFloat(serverData.nutrients?.find(n => n.name === "지방")?.value || "5"),
      saturatedFat: 2,
      transFat: 0,
      cholesterol: 50,
      sodium: 200,
      fiber: 3,
      sugars: 2,
    },
    vitaminsAndMinerals: [
      { name: "비타민 B12", amount: "2.4μg", daily: 100 },
      { name: "철분", amount: "18mg", daily: 100 },
      { name: "아연", amount: "11mg", daily: 100 },
    ],
    features: [
      "신선한 재료",
      "당일 배송",
      "품질 보증",
      "HACCP 인증",
    ],
    goalScores: {
      "muscle-gain": 4.5,
      "weight-loss": 3.8,
      energy: 4.0,
      recovery: 4.2,
      health: 4.3,
    },
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
    averageRating: 0.0, // Product 타입에서 요구하는 필드
    reviewCount: mockEnhancements.reviewCount,
    tags: serverData.tags?.map(t => t.name) || [],
    description: serverData.description || "상품 설명이 준비 중입니다.",
    storage: serverData.storage || "냉장 보관",
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