import { useState, useMemo } from "react";
import { ProductList } from "@/features/products/ui/ProductList";
import {
  dietaryOptions,
  sortOptions,
  mealTimes,
} from "@/features/products/constants/productConstants";
import { useCategories } from "@/features/products/hooks/useCategories";
import useInfiniteProducts from "@/features/products/hooks/useInfiniteProducts";
import { useSearchProducts } from "@/features/products/hooks/useSearchProducts";
import useIntersectionObserver from "@/features/order/hooks/useIntersectionObserver";

import { Filter, Search } from "lucide-react";
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
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGoal, setSelectedGoal] = useState<string>("all");
  const [proteinRange, setProteinRange] = useState([0, 50]);
  const [carbsRange, setCarbsRange] = useState([0, 100]);
  const [fatRange, setFatRange] = useState([0, 50]);
  const [caloriesRange, setCaloriesRange] = useState([0, 500]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("createdAt,desc");
  const [searchQuery, setSearchQuery] = useState("");

  // 검색 결과
  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchProducts({
    query: searchQuery,
    filters: {
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      sort: sortOption,
    },
    enabled: searchQuery.length > 0,
  });

  // 무한 스크롤을 위한 훅 사용 (검색이 아닐 때만)
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteProducts({
    category: selectedCategory !== "all" ? selectedCategory : undefined,
    sort: sortOption,
    pageSize: 8,
  });

  // IntersectionObserver 설정
  const observerTarget = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

  // 모든 페이지의 상품을 하나의 배열로 병합
  const allProducts = useMemo(() => {
    // 검색 중일 때는 검색 결과 사용
    if (searchQuery.length > 0) {
      return searchData?.products ?? [];
    }
    // 검색이 아닐 때는 무한 스크롤 데이터 사용
    return data?.pages.flatMap((page) => page.products) ?? [];
  }, [data, searchQuery, searchData]);

  // 현재 로딩 상태 결정
  const currentIsLoading = searchQuery.length > 0 ? isSearchLoading : isLoading;
  const currentError = searchQuery.length > 0 ? searchError : error;

  // 카테고리 정렬: "기타"를 맨 마지막으로
  const sortedCategories = (categories || []).sort((a, b) => {
    if (a === "기타") return 1;
    if (b === "기타") return -1;
    return 0;
  });

  // 전체 카테고리 포함
  const allCategories = ["전체", ...sortedCategories];

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

        {/* 카테고리 네비게이션 */}
        <div className="bg-white rounded-lg p-4">
          {isCategoriesLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {allCategories.map((category) => {
                const categoryValue = category === "전체" ? "all" : category;
                const isActive = selectedCategory === categoryValue;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(categoryValue)}
                    className={`
                      px-4 py-2.5 rounded-lg
                      border-2 transition-all duration-200 font-medium
                      ${
                        isActive
                          ? "bg-green-100 text-green-800 border-green-600 shadow-md scale-105"
                          : "bg-gray-50 text-gray-700 border-transparent hover:bg-gray-100 hover:scale-105"
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 검색 및 정렬 바 */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="상품명, 영양소, 태그 검색..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          </div>
        </div>

        {/* 제품 그리드 */}
        <ProductList
          products={allProducts}
          observerTarget={searchQuery.length > 0 ? undefined : observerTarget}
          isLoading={currentIsLoading}
          isFetchingNextPage={isFetchingNextPage}
          error={currentError}
          onRetry={() => refetch()}
          onResetFilters={() => {
            setSelectedCategory("all");
            setSelectedGoal("all");
            setProteinRange([0, 50]);
            setCarbsRange([0, 100]);
            setFatRange([0, 50]);
            setCaloriesRange([0, 500]);
            setDietaryRestrictions([]);
            setSortOption("createdAt,desc");
            setSearchQuery("");
          }}
        />
      </div>
    </div>
  );
}
