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
