import {
  Dumbbell,
  Weight,
  Flame,
  Apple,
  Heart,
  Zap,
  BarChart3,
} from "lucide-react";

// 영양 중심 카테고리
export const nutritionCategories = [
  {
    id: "all",
    name: "전체 상품",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    id: "protein",
    name: "고단백 식품",
    icon: <Dumbbell className="h-5 w-5" />,
  },
  {
    id: "healthy-fats",
    name: "건강한 지방 공급원",
    icon: <Heart className="h-5 w-5" />,
  },
  {
    id: "complex-carbs",
    name: "복합 탄수화물",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: "vitamins-minerals",
    name: "비타민 & 미네랄",
    icon: <Apple className="h-5 w-5" />,
  },
  {
    id: "weight-loss",
    name: "체중 관리 식품",
    icon: <Weight className="h-5 w-5" />,
  },
  {
    id: "energy-boosters",
    name: "에너지 부스터",
    icon: <Flame className="h-5 w-5" />,
  },
];

// 식이 제한 옵션
export const dietaryOptions = [
  { id: "gluten-free", name: "글루텐프리" },
  { id: "vegan", name: "비건" },
  { id: "keto", name: "케토" },
  { id: "low-carb", name: "저탄수화물" },
  { id: "organic", name: "유기농" },
  { id: "dairy-free", name: "유제품 제외" },
  { id: "nut-free", name: "견과류 제외" },
];

// 정렬 옵션
export const sortOptions = [
  { id: "createdAt,desc", name: "최신순" },
  { id: "price,asc", name: "가격 낮은순" },
  { id: "price,desc", name: "가격 높은순" },
  { id: "name,asc", name: "이름순" },
];

// 식사 시간대
export const mealTimes = [
  { id: "all", name: "모든 시간대" },
  { id: "breakfast", name: "아침 식사" },
  { id: "pre-workout", name: "운동 전" },
  { id: "post-workout", name: "운동 후" },
  { id: "snack", name: "간식" },
  { id: "dinner", name: "저녁 식사" },
];
