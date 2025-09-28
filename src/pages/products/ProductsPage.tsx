import { useState } from "react";
import { ProductList } from "@/features/products/ui/ProductList";
import { ProductFilter } from "@/features/products/ui/ProductFilter";

// 타입 정의
type GoalType =
  | "muscle-gain"
  | "weight-loss"
  | "energy"
  | "recovery"
  | "health";
import {
  Filter,
  Search,
  SlidersHorizontal,
  Info,
  Dumbbell,
  Weight,
  Flame,
  Apple,
  Heart,
  ChevronRight,
  Star,
  Zap,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGoal, setSelectedGoal] = useState<string>("all");
  const [proteinRange, setProteinRange] = useState([0, 50]);
  const [carbsRange, setCarbsRange] = useState([0, 100]);
  const [fatRange, setFatRange] = useState([0, 50]);
  const [caloriesRange, setCaloriesRange] = useState([0, 500]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("createdAt,desc");

  // 영양 중심 카테고리
  const nutritionCategories = [
    {
      id: "all",
      name: "전체 상품",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "모든 영양 카테고리의 제품을 확인하세요.",
    },
    {
      id: "protein",
      name: "고단백 식품",
      icon: <Dumbbell className="h-5 w-5" />,
      description:
        "근육 성장과 회복을 위한 고단백 식품. 근육 합성과 포만감 유지에 도움이 됩니다.",
      education:
        "단백질은 근육 합성의 핵심 영양소로, 운동 후 30분 이내 섭취 시 근육 회복에 가장 효과적입니다.",
    },
    {
      id: "healthy-fats",
      name: "건강한 지방 공급원",
      icon: <Heart className="h-5 w-5" />,
      description:
        "오메가-3, 불포화지방이 풍부한 식품. 호르몬 생성과 영양소 흡수에 필수적입니다.",
      education:
        "건강한 지방은 호르몬 생성, 뇌 기능, 영양소 흡수에 필수적이며 포만감을 오래 유지시킵니다.",
    },
    {
      id: "complex-carbs",
      name: "복합 탄수화물",
      icon: <Zap className="h-5 w-5" />,
      description:
        "지속적인 에너지를 제공하는 복합 탄수화물. 운동 성능 향상에 도움이 됩니다.",
      education:
        "복합 탄수화물은 단순 탄수화물보다 천천히 소화되어 지속적인 에너지를 제공하고 혈당 스파이크를 방지합니다.",
    },
    {
      id: "vitamins-minerals",
      name: "비타민 & 미네랄",
      icon: <Apple className="h-5 w-5" />,
      description:
        "면역력 강화와 전반적인 건강 유지에 필요한 필수 미량 영양소가 풍부한 식품.",
      education:
        "비타민과 미네랄은 신체의 모든 생화학적 과정에 필수적이며, 다양한 색상의 과일과 채소를 섭취하는 것이 좋습니다.",
    },
    {
      id: "weight-loss",
      name: "체중 관리 식품",
      icon: <Weight className="h-5 w-5" />,
      description:
        "포만감은 높고 칼로리는 낮은 식품. 체중 감량 목표에 이상적입니다.",
      education:
        "효과적인 체중 관리는 칼로리 제한뿐만 아니라 영양 밀도가 높은 식품을 선택하는 것이 중요합니다.",
    },
    {
      id: "energy-boosters",
      name: "에너지 부스터",
      icon: <Flame className="h-5 w-5" />,
      description: "운동 전 에너지를 높이고 지구력을 향상시키는 식품.",
      education:
        "운동 1-2시간 전에 탄수화물과 약간의 단백질을 함께 섭취하면 최적의 에너지를 제공합니다.",
    },
  ];

  // 피트니스 목표
  const fitnessGoals = [
    { id: "all", name: "모든 목표" },
    { id: "muscle-gain", name: "근육 증가" },
    { id: "weight-loss", name: "체중 감량" },
    { id: "energy", name: "에너지 향상" },
    { id: "recovery", name: "회복 촉진" },
    { id: "health", name: "전반적 건강" },
  ];

  // 식이 제한
  const dietaryOptions = [
    { id: "gluten-free", name: "글루텐프리" },
    { id: "vegan", name: "비건" },
    { id: "keto", name: "케토" },
    { id: "low-carb", name: "저탄수화물" },
    { id: "organic", name: "유기농" },
    { id: "dairy-free", name: "유제품 제외" },
    { id: "nut-free", name: "견과류 제외" },
  ];

  // 정렬 옵션
  const sortOptions = [
    { id: "createdAt,desc", name: "최신순" },
    { id: "price,asc", name: "가격 낮은순" },
    { id: "price,desc", name: "가격 높은순" },
    { id: "name,asc", name: "이름순" },
  ];

  // 식사 시간대
  const mealTimes = [
    { id: "all", name: "모든 시간대" },
    { id: "breakfast", name: "아침 식사" },
    { id: "pre-workout", name: "운동 전" },
    { id: "post-workout", name: "운동 후" },
    { id: "snack", name: "간식" },
    { id: "dinner", name: "저녁 식사" },
  ];

  // 목표별 추천 제품 (mock 데이터를 임시로 사용)
  const mockRecommendations = [
    {
      id: 1,
      name: "유기농 닭가슴살",
      protein: 26,
      goalScore: 4.8,
      image: "https://placehold.co/300x200",
    },
    {
      id: 2,
      name: "프로틴 파우더",
      protein: 24,
      goalScore: 4.9,
      image: "https://placehold.co/300x200",
    },
    {
      id: 3,
      name: "그릭 요거트",
      protein: 10,
      goalScore: 4.0,
      image: "https://placehold.co/300x200",
    },
  ];

  // 목표별 추천 제품 목록 (API 연동 전까지 mock 사용)
  const goalRecommendations: Record<GoalType, any[]> = {
    "muscle-gain": mockRecommendations,
    "weight-loss": mockRecommendations,
    energy: mockRecommendations,
    recovery: mockRecommendations,
    health: mockRecommendations,
  };

  // 목표 설명
  const goalDescriptions: Record<GoalType, string> = {
    "muscle-gain":
      "근육 성장을 위해 고단백, 적절한 탄수화물, 충분한 칼로리가 필요합니다.",
    "weight-loss":
      "체중 감량을 위해 고단백, 저탄수화물, 저칼로리 식품이 효과적입니다.",
    energy: "지속적인 에너지를 위해 복합 탄수화물과 건강한 지방이 중요합니다.",
    recovery:
      "운동 후 회복을 위해 단백질과 항산화 성분이 풍부한 식품이 도움됩니다.",
    health: "전반적인 건강을 위해 다양한 영양소가 균형 잡힌 식품이 중요합니다.",
  };


  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        {/* 헤더 섹션 */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">영양 중심 상품 카탈로그</h1>
          <p className="text-gray-500">
            당신의 피트니스 목표에 맞는 최적의 영양소 구성을 가진 식품을
            찾아보세요
          </p>
        </div>

        {/* 목표 선택 배너 (선택된 경우) */}
        {selectedGoal !== "all" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-green-600" />
                <h3 className="font-medium text-green-800">
                  {fitnessGoals.find((g) => g.id === selectedGoal)?.name} 목표를
                  위한 추천 상품
                </h3>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">목표 정보</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      {selectedGoal !== "all"
                        ? goalDescriptions[selectedGoal as GoalType]
                        : ""}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {selectedGoal !== "all" &&
                goalRecommendations[selectedGoal as GoalType].map(
                  (product: any) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 bg-white p-2 rounded border"
                    >
                      <img
                        src={product.image || "https://placehold.co/300x200"}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs ml-1">
                              {product.goalScore.toFixed(1)}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {product.protein}g 단백질
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-8">
                        보기
                      </Button>
                    </div>
                  ),
                )}
            </div>
          </div>
        )}

        {/* 영양 카테고리 네비게이션 */}
        <div className="bg-white border rounded-lg p-2">
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 bg-transparent h-auto p-0">
              {nutritionCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 h-auto py-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
                >
                  {category.icon}
                  <span>{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* 선택된 카테고리 교육 콘텐츠 */}
        {selectedCategory !== "all" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-full p-2 mt-1">
                {
                  nutritionCategories.find((c) => c.id === selectedCategory)
                    ?.icon
                }
              </div>
              <div>
                <h3 className="font-medium text-blue-800">
                  {
                    nutritionCategories.find((c) => c.id === selectedCategory)
                      ?.name
                  }
                </h3>
                <p className="text-blue-700 text-sm mt-1">
                  {
                    nutritionCategories.find((c) => c.id === selectedCategory)
                      ?.education
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 검색 및 필터 바 */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="상품명, 영양소, 태그 검색..."
              className="w-full pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">필터</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>영양 필터</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  {/* 모바일 필터 내용 */}
                  <div>
                    <h3 className="font-medium mb-2">피트니스 목표</h3>
                    <Select
                      value={selectedGoal}
                      onValueChange={setSelectedGoal}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="목표 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {fitnessGoals.map((goal) => (
                          <SelectItem key={goal.id} value={goal.id}>
                            {goal.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">영양소 범위</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center">
                          <label className="text-sm">단백질 (g)</label>
                          <span className="text-xs text-gray-500">
                            {proteinRange[0]} - {proteinRange[1]}g
                          </span>
                        </div>
                        <Slider
                          value={proteinRange}
                          min={0}
                          max={50}
                          step={1}
                          onValueChange={setProteinRange}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <label className="text-sm">탄수화물 (g)</label>
                          <span className="text-xs text-gray-500">
                            {carbsRange[0]} - {carbsRange[1]}g
                          </span>
                        </div>
                        <Slider
                          value={carbsRange}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={setCarbsRange}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <label className="text-sm">지방 (g)</label>
                          <span className="text-xs text-gray-500">
                            {fatRange[0]} - {fatRange[1]}g
                          </span>
                        </div>
                        <Slider
                          value={fatRange}
                          min={0}
                          max={50}
                          step={1}
                          onValueChange={setFatRange}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <label className="text-sm">칼로리 (kcal)</label>
                          <span className="text-xs text-gray-500">
                            {caloriesRange[0]} - {caloriesRange[1]}kcal
                          </span>
                        </div>
                        <Slider
                          value={caloriesRange}
                          min={0}
                          max={500}
                          step={10}
                          onValueChange={setCaloriesRange}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">식이 제한</h3>
                    <div className="space-y-2">
                      {dietaryOptions.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`mobile-diet-${option.id}`}
                            checked={dietaryRestrictions.includes(option.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setDietaryRestrictions([
                                  ...dietaryRestrictions,
                                  option.name,
                                ]);
                              } else {
                                setDietaryRestrictions(
                                  dietaryRestrictions.filter(
                                    (item) => item !== option.name,
                                  ),
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={`mobile-diet-${option.id}`}
                            className="text-sm"
                          >
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">식사 시간대</h3>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="시간대 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {mealTimes.map((time) => (
                          <SelectItem key={time.id} value={time.id}>
                            {time.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              필터
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 사이드바 필터 (데스크톱) */}
          <div className="hidden md:block">
            <ProductFilter
              showFilters={showFilters}
              selectedGoal={selectedGoal}
              onGoalChange={setSelectedGoal}
              proteinRange={proteinRange}
              onProteinRangeChange={setProteinRange}
              carbsRange={carbsRange}
              onCarbsRangeChange={setCarbsRange}
              fatRange={fatRange}
              onFatRangeChange={setFatRange}
              caloriesRange={caloriesRange}
              onCaloriesRangeChange={setCaloriesRange}
              dietaryRestrictions={dietaryRestrictions}
              onDietaryRestrictionsChange={setDietaryRestrictions}
            />
          </div>

          {/* 제품 그리드 */}
          <div className={`${showFilters ? "md:col-span-3" : "md:col-span-4"}`}>
            <ProductList
              customFilters={{
                category:
                  selectedCategory !== "all" ? selectedCategory : undefined,
                keyword: undefined, // 검색 기능은 나중에 구현
                minPrice: undefined,
                maxPrice: undefined,
                sort: sortOption,
                page: 0,
                size: 20,
              }}
              onAddToCart={(productId) => {
                console.log(`상품 ${productId}을 장바구니에 추가`);
              }}
            />
          </div>
        </div>

        {/* 영양 균형 완성 추천 섹션 */}
        {true && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">영양 균형 완성 추천</h2>
              <Button variant="link" className="text-green-600">
                더 보기 <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">단백질 보충 추천</CardTitle>
                  <CardDescription>
                    현재 장바구니에 단백질이 부족합니다. 다음 제품을
                    추가해보세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://placehold.co/80x80"
                      alt="닭가슴살"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">유기농 닭가슴살</h4>
                      <p className="text-sm text-gray-500">
                        단백질 26g / 120kcal
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">12,900원</span>
                        <Button variant="outline" size="sm">
                          추가
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">건강한 지방 추천</CardTitle>
                  <CardDescription>
                    건강한 지방 섭취를 위해 다음 제품을 추가해보세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://placehold.co/80x80"
                      alt="아보카도"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">유기농 아보카도</h4>
                      <p className="text-sm text-gray-500">
                        건강한 지방 15g / 160kcal
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">3,900원</span>
                        <Button variant="outline" size="sm">
                          추가
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    비타민 & 미네랄 추천
                  </CardTitle>
                  <CardDescription>
                    영양 균형을 위해 다음 제품을 추가해보세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://placehold.co/80x80"
                      alt="블루베리"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">블루베리</h4>
                      <p className="text-sm text-gray-500">
                        항산화제 풍부 / 57kcal
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">6,900원</span>
                        <Button variant="outline" size="sm">
                          추가
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
