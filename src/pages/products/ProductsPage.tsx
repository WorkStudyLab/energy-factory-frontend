import { useState } from "react";
import { ProductList } from "@/features/products/ui/ProductList";
import { ProductFilter } from "@/features/products/ui/ProductFilter";
import {
  nutritionCategories,
  dietaryOptions,
  sortOptions,
  mealTimes,
} from "@/features/products/constants/productConstants";

import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGoal, setSelectedGoal] = useState<string>("all");
  const [proteinRange, setProteinRange] = useState([0, 50]);
  const [carbsRange, setCarbsRange] = useState([0, 100]);
  const [fatRange, setFatRange] = useState([0, 50]);
  const [caloriesRange, setCaloriesRange] = useState([0, 500]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("createdAt,desc");

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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
