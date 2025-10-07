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
    cookingMethods: [
      {
        name: "조리법 1",
        time: "10분",
        description: "간단하게 조리하는 방법입니다.",
      },
    ],
    nutritionTips: [
      "영양소를 최대한 보존하려면 살짝만 조리하세요.",
      "다양한 채소와 함께 섭취하면 영양 균형이 좋습니다.",
    ],
    complementaryProducts: [
      {
        id: 2,
        name: "관련 상품 1",
        price: 5900,
        image: "https://placehold.co/100x100?text=관련1",
        reason: "함께 구매하면 좋은 상품",
      },
    ],
    reviews: [
      {
        id: 1,
        author: "구매자A",
        rating: 5,
        date: "2024-01-15",
        verified: true,
        content: "정말 신선하고 좋아요!",
        helpful: 12,
        goal: "건강 관리",
        images: [],
      },
    ],
    qna: [
      {
        id: 1,
        question: "보관 방법이 어떻게 되나요?",
        answer: serverData.storage || "냉장 보관을 권장합니다.",
        date: "2024-01-10",
      },
    ],
  };

  // 서버 데이터와 Mock 데이터 병합
  return {
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
    tags: serverData.tags?.map(t => t.name) || [],
    description: serverData.description || "상품 설명이 준비 중입니다.",
    storage: serverData.storage || "냉장 보관",
    ...mockEnhancements,
  };
};

// 상품 상세 조회 API
const fetchProductDetail = async (id: string): Promise<ProductDetail> => {
  try {
    const response = await api.get<ApiResponse<ProductServerDetail>>(`/api/products/${id}`);
    return transformServerToDetail(response.data.data);
  } catch (error) {
    console.error("상품 상세 조회 실패:", error);
    // API 실패 시 Mock 데이터 반환
    return getMockProductDetail(id);
  }
};

// Mock 데이터 (API 실패 시 fallback)
const getMockProductDetail = (id: string): ProductDetail => ({
  id: Number(id),
  name: "프리미엄 유기농 닭가슴살",
  brand: "Energy Factory Premium",
  price: 12900,
  originalPrice: 15900,
  discount: 19,
  rating: 4.8,
  reviewCount: 1247,
  soldCount: 5432,
  category: "고단백 식품",
  imageUrl: "https://placehold.co/600x600?text=닭가슴살",
  weight: 500,
  weightUnit: "g",
  stock: 150,
  status: "판매중",
  tags: ["고단백", "저지방", "유기농", "근육증가", "체중감량", "BEST"],
  description: `최고 품질의 국내산 유기농 닭가슴살입니다. 
    
신선함을 위해 매일 아침 도축하여 당일 포장합니다. 항생제를 사용하지 않고 건강하게 키운 닭으로 만들어 안심하고 드실 수 있습니다.

고단백, 저지방 식단을 원하는 분들에게 최적의 선택입니다. 근육 성장과 체중 관리에 도움을 주는 완벽한 단백질 공급원입니다.`,
  images: [
    "https://placehold.co/600x600?text=닭가슴살 1",
    "https://placehold.co/600x600?text=닭가슴살 2",
    "https://placehold.co/600x600?text=닭가슴살 3",
    "https://placehold.co/600x600?text=영양성분표",
  ],
  nutrition: {
    calories: 110,
    protein: 26,
    carbs: 0,
    fat: 1.5,
    saturatedFat: 0.5,
    transFat: 0,
    cholesterol: 85,
    sodium: 75,
    fiber: 0,
    sugars: 0,
  },
  vitaminsAndMinerals: [
    { name: "비타민 B3", amount: "14mg", daily: 93 },
    { name: "비타민 B6", amount: "0.6mg", daily: 35 },
    { name: "셀레늄", amount: "27μg", daily: 49 },
    { name: "인", amount: "228mg", daily: 23 },
  ],
  features: [
    "100% 국내산 유기농 인증",
    "항생제 무첨가",
    "신선한 당일 포장",
    "고단백 저지방",
    "GMO Free",
    "HACCP 인증",
  ],
  goalScores: {
    "muscle-gain": 4.9,
    "weight-loss": 4.7,
    energy: 3.8,
    recovery: 4.5,
    health: 4.2,
  },
  variants: [
    { name: "500g", price: 12900, stock: 150 },
    { name: "1kg", price: 24900, stock: 89 },
    { name: "2kg", price: 47900, stock: 45 },
  ],
  shipping: {
    fee: 3000,
    freeShippingThreshold: 30000,
    estimatedDays: "1-2",
  },
  storage: "냉장 보관 시 3일, 냉동 보관 시 3개월 이내 섭취하세요.",
  cookingMethods: [
    {
      name: "구이",
      time: "10-15분",
      description: "올리브 오일을 두르고 중불에서 앞뒤로 구워주세요.",
    },
    {
      name: "삶기",
      time: "15-20분",
      description: "끓는 물에 넣고 완전히 익을 때까지 삶아주세요.",
    },
    {
      name: "에어프라이어",
      time: "12-15분",
      description: "180도로 예열 후 뒤집어가며 조리해주세요.",
    },
  ],
  nutritionTips: [
    "운동 후 30분 이내에 섭취하면 근육 회복에 가장 효과적입니다.",
    "복합 탄수화물(현미, 고구마)과 함께 섭취하면 영양 균형이 좋습니다.",
    "식이섬유가 풍부한 채소와 함께 드시면 소화에 도움이 됩니다.",
  ],
  complementaryProducts: [
    {
      id: 3,
      name: "유기농 퀴노아",
      price: 8900,
      image: "https://placehold.co/100x100?text=퀴노아",
      reason: "완벽한 탄수화물 공급원",
    },
    {
      id: 4,
      name: "유기농 아보카도",
      price: 3900,
      image: "https://placehold.co/100x100?text=아보카도",
      reason: "건강한 지방 보충",
    },
    {
      id: 7,
      name: "유기농 고구마",
      price: 5900,
      image: "https://placehold.co/100x100?text=고구마",
      reason: "지속적인 에너지",
    },
  ],
  reviews: [
    {
      id: 1,
      author: "건강왕",
      rating: 5,
      date: "2024-01-15",
      verified: true,
      content: "단백질 함량이 정말 높고 맛도 좋아요. 운동 후에 먹으면 회복이 빠른 것 같습니다!",
      helpful: 45,
      goal: "근육 증가",
      images: [],
    },
    {
      id: 2,
      author: "다이어터",
      rating: 5,
      date: "2024-01-10",
      verified: true,
      content: "다이어트 중인데 이거 먹고 체중 감량 성공했어요. 저지방이라 부담 없이 먹을 수 있습니다.",
      helpful: 38,
      goal: "체중 감량",
      images: [],
    },
    {
      id: 3,
      author: "운동매니아",
      rating: 4,
      date: "2024-01-05",
      verified: true,
      content: "신선도가 좋고 포장도 깔끔합니다. 가격 대비 품질이 훌륭해요.",
      helpful: 29,
      goal: "근육 증가",
      images: [],
    },
  ],
  qna: [
    {
      id: 1,
      question: "유통기한이 얼마나 되나요?",
      answer: "제조일로부터 냉장 보관 시 3일, 냉동 보관 시 3개월입니다.",
      date: "2024-01-10",
    },
    {
      id: 2,
      question: "조리 방법이 궁금합니다.",
      answer: "구이, 삶기, 에어프라이어 등 다양한 방법으로 조리 가능합니다. 상세 설명을 참고해주세요.",
      date: "2024-01-08",
    },
  ],
});

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