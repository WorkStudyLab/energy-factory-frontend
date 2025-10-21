import { useQuery } from "@tanstack/react-query";
import type { ProductDetail, ProductServerDetail, ApiResponse } from "@/types/product";
import { api } from "@/lib/axios/axios";

// 서버 데이터를 UI용 데이터로 변환
const transformServerToDetail = (serverData: ProductServerDetail): ProductDetail => {
  // 이미지 처리 (서버 데이터 우선, 없으면 기본 이미지)
  const images = serverData.images && serverData.images.length > 0
    ? serverData.images
    : [serverData.imageUrl || "https://placehold.co/600x600?text=상품이미지"];

  // Variants 처리 (서버 데이터 우선)
  const variants = serverData.variants && serverData.variants.length > 0
    ? serverData.variants.map(v => ({
        id: v.id,
        name: v.name,
        price: v.price,
        stock: v.stock,
      }))
    : [
        { id: serverData.id, name: `${serverData.weight}${serverData.weightUnit}`, price: serverData.price, stock: serverData.stock || 0 },
      ];

  // 배송 정보 처리 (서버 데이터 우선)
  const shipping = serverData.shipping
    ? {
        fee: serverData.shipping.fee,
        freeShippingThreshold: serverData.shipping.freeShippingThreshold || 30000,
        estimatedDays: serverData.shipping.estimatedDays || "2-3일",
      }
    : {
        fee: 3000,
        freeShippingThreshold: 30000,
        estimatedDays: "2-3일",
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
    id: serverData.id,
    name: serverData.name,
    brand: serverData.brand,
    price: serverData.price,
    category: serverData.category,
    imageUrl: serverData.imageUrl || "https://placehold.co/600x600?text=상품이미지",
    images,
    weight: serverData.weight,
    weightUnit: serverData.weightUnit,
    stock: serverData.stock || 0,
    status: serverData.status,
    averageRating: serverData.averageRating,
    rating: serverData.averageRating,  // rating은 averageRating과 동일
    reviewCount: serverData.reviewCount,
    tags: serverData.tags?.map(t => t.name) || [],
    description: serverData.description || "상품 설명이 준비 중입니다.",
    storage: serverData.storage || "냉장 보관",
    originalPrice: serverData.originalPrice ?? undefined,
    discount: serverData.discount ?? undefined,
    variants,
    shipping,
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