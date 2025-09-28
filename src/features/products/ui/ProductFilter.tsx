import {
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


interface ProductFilterProps {
  showFilters: boolean;
  selectedGoal: string;
  onGoalChange: (goal: string) => void;
  proteinRange: number[];
  onProteinRangeChange: (range: number[]) => void;
  carbsRange: number[];
  onCarbsRangeChange: (range: number[]) => void;
  fatRange: number[];
  onFatRangeChange: (range: number[]) => void;
  caloriesRange: number[];
  onCaloriesRangeChange: (range: number[]) => void;
  dietaryRestrictions: string[];
  onDietaryRestrictionsChange: (restrictions: string[]) => void;
}

export function ProductFilter({
  showFilters,
  selectedGoal,
  onGoalChange,
  proteinRange,
  onProteinRangeChange,
  carbsRange,
  onCarbsRangeChange,
  fatRange,
  onFatRangeChange,
  caloriesRange,
  onCaloriesRangeChange,
  dietaryRestrictions,
  onDietaryRestrictionsChange,
}: ProductFilterProps) {
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

  // 식사 시간대
  const mealTimes = [
    { id: "all", name: "모든 시간대" },
    { id: "breakfast", name: "아침 식사" },
    { id: "pre-workout", name: "운동 전" },
    { id: "post-workout", name: "운동 후" },
    { id: "snack", name: "간식" },
    { id: "dinner", name: "저녁 식사" },
  ];

  // 영양소 설명
  const nutrientDescriptions = {
    protein:
      "단백질은 근육 성장과 회복에 필수적인 영양소입니다. 체중 1kg당 1.6-2.2g 섭취가 권장됩니다.",
    carbs:
      "탄수화물은 주요 에너지원으로, 특히 운동 전후에 중요합니다. 복합 탄수화물은 지속적인 에너지를 제공합니다.",
    fat: "건강한 지방은 호르몬 생성, 영양소 흡수, 포만감 유지에 중요합니다. 불포화지방과 오메가-3가 좋은 공급원입니다.",
    calories:
      "칼로리는 에너지의 측정 단위입니다. 목표에 따라 적절한 칼로리 섭취가 중요합니다.",
  };

  const handleDietaryChange = (optionName: string, checked: boolean) => {
    if (checked) {
      onDietaryRestrictionsChange([...dietaryRestrictions, optionName]);
    } else {
      onDietaryRestrictionsChange(
        dietaryRestrictions.filter((item) => item !== optionName)
      );
    }
  };

  const handleResetFilters = () => {
    onProteinRangeChange([0, 50]);
    onCarbsRangeChange([0, 100]);
    onFatRangeChange([0, 50]);
    onCaloriesRangeChange([0, 500]);
    onDietaryRestrictionsChange([]);
    onGoalChange("all");
  };

  if (!showFilters) return null;

  return (
    <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
      <div>
        <h3 className="font-medium mb-2">피트니스 목표</h3>
        <Select value={selectedGoal} onValueChange={onGoalChange}>
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
              <div className="flex items-center gap-1">
                <label className="text-sm">단백질 (g)</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0"
                      >
                        <HelpCircle className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {nutrientDescriptions.protein}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs text-gray-500">
                {proteinRange[0]} - {proteinRange[1]}g
              </span>
            </div>
            <Slider
              value={proteinRange}
              min={0}
              max={50}
              step={1}
              onValueChange={onProteinRangeChange}
              className="mt-2"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <label className="text-sm">탄수화물 (g)</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0"
                      >
                        <HelpCircle className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {nutrientDescriptions.carbs}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs text-gray-500">
                {carbsRange[0]} - {carbsRange[1]}g
              </span>
            </div>
            <Slider
              value={carbsRange}
              min={0}
              max={100}
              step={1}
              onValueChange={onCarbsRangeChange}
              className="mt-2"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <label className="text-sm">지방 (g)</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0"
                      >
                        <HelpCircle className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {nutrientDescriptions.fat}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs text-gray-500">
                {fatRange[0]} - {fatRange[1]}g
              </span>
            </div>
            <Slider
              value={fatRange}
              min={0}
              max={50}
              step={1}
              onValueChange={onFatRangeChange}
              className="mt-2"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <label className="text-sm">칼로리 (kcal)</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0"
                      >
                        <HelpCircle className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {nutrientDescriptions.calories}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs text-gray-500">
                {caloriesRange[0]} - {caloriesRange[1]}kcal
              </span>
            </div>
            <Slider
              value={caloriesRange}
              min={0}
              max={500}
              step={10}
              onValueChange={onCaloriesRangeChange}
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
                id={`desktop-diet-${option.id}`}
                checked={dietaryRestrictions.includes(option.name)}
                onCheckedChange={(checked) =>
                  handleDietaryChange(option.name, !!checked)
                }
              />
              <label
                htmlFor={`desktop-diet-${option.id}`}
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

      <div className="pt-4 border-t">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleResetFilters}
        >
          필터 초기화
        </Button>
      </div>
    </div>
  );
}