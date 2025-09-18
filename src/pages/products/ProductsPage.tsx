import { useState } from "react";

// 타입 정의
type GoalType =
  | "muscle-gain"
  | "weight-loss"
  | "energy"
  | "recovery"
  | "health";
type GoalScores = Record<GoalType, number>;
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
  Plus,
  Star,
  HelpCircle,
  Clock,
  Zap,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGoal, setSelectedGoal] = useState<string>("all");
  const [proteinRange, setProteinRange] = useState([0, 50]);
  const [carbsRange, setCarbsRange] = useState([0, 100]);
  const [fatRange, setFatRange] = useState([0, 50]);
  const [caloriesRange, setCaloriesRange] = useState([0, 500]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("recommended");

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
    { id: "recommended", name: "추천순" },
    { id: "protein-ratio", name: "단백질 효율 높은순" },
    { id: "price-asc", name: "가격 낮은순" },
    { id: "price-desc", name: "가격 높은순" },
    { id: "protein", name: "단백질 높은순" },
    { id: "calories-asc", name: "칼로리 낮은순" },
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

  // Mock product data with enhanced nutrition information
  const products = [
    {
      id: 1,
      name: "유기농 닭가슴살",
      price: 12900,
      // image: "/placeholder.svg?height=200&width=300&text=닭가슴살",
      image: "https://placehold.co/300x200",
      protein: 26,
      carbs: 0,
      fat: 1.5,
      calories: 120,
      category: "protein",
      proteinRatio: 21.7, // 단백질(g)/100kcal
      tags: ["고단백", "저지방", "유기농"],
      goalScores: {
        "muscle-gain": 4.8,
        "weight-loss": 4.5,
        energy: 3.2,
        recovery: 4.6,
        health: 4.0,
      } as GoalScores,
      mealTimes: ["post-workout", "lunch", "dinner"],
      dietaryInfo: ["글루텐프리", "유제품 제외"],
      description:
        "100% 유기농 닭가슴살로, 고품질 단백질 공급원입니다. 근육 성장과 회복에 이상적입니다.",
      nutritionTip:
        "운동 후 30분 이내에 섭취하면 근육 회복에 가장 효과적입니다.",
      complementaryProducts: [3, 5, 8], // 함께 섭취하면 좋은 제품 ID
    },
    {
      id: 2,
      name: "노르웨이 생연어",
      price: 18900,
      // image: "/placeholder.svg?height=200&width=300&text=연어",
      image: "https://placehold.co/300x200",
      protein: 20,
      carbs: 0,
      fat: 13,
      calories: 208,
      category: "protein",
      proteinRatio: 9.6,
      tags: ["오메가3", "고단백", "지중해식"],
      goalScores: {
        "muscle-gain": 4.3,
        "weight-loss": 3.8,
        energy: 3.5,
        recovery: 4.2,
        health: 4.7,
      } as GoalScores,
      mealTimes: ["lunch", "dinner"],
      dietaryInfo: ["글루텐프리", "유제품 제외"],
      description:
        "오메가-3 지방산이 풍부한 고품질 단백질 공급원. 근육 성장과 심혈관 건강에 도움이 됩니다.",
      nutritionTip: "오메가-3 지방산은 염증 감소와 근육 회복에 도움이 됩니다.",
      complementaryProducts: [3, 6, 9],
    },
    {
      id: 3,
      name: "유기농 퀴노아",
      price: 8900,
      // image: "/placeholder.svg?height=200&width=300&text=퀴노아",
      image: "https://placehold.co/300x200",
      protein: 8,
      carbs: 39,
      fat: 4,
      calories: 222,
      category: "complex-carbs",
      proteinRatio: 3.6,
      tags: ["완전단백질", "복합탄수화물", "글루텐프리"],
      goalScores: {
        "muscle-gain": 3.8,
        "weight-loss": 3.5,
        energy: 4.2,
        recovery: 3.9,
        health: 4.5,
      } as GoalScores,
      mealTimes: ["breakfast", "lunch", "pre-workout"],
      dietaryInfo: ["글루텐프리", "비건"],
      description:
        "모든 필수 아미노산을 함유한 완전 단백질 공급원. 지속적인 에너지를 제공하는 복합 탄수화물입니다.",
      nutritionTip: "운동 1-2시간 전에 섭취하면 지속적인 에너지를 제공합니다.",
      complementaryProducts: [1, 2, 7],
    },
    {
      id: 4,
      name: "유기농 아보카도",
      price: 3900,
      // image: "/placeholder.svg?height=200&width=300&text=아보카도",
      image: "https://placehold.co/300x200",
      protein: 2,
      carbs: 9,
      fat: 15,
      calories: 160,
      category: "healthy-fats",
      proteinRatio: 1.25,
      tags: ["건강한지방", "식이섬유", "비타민E"],
      goalScores: {
        "muscle-gain": 3.2,
        "weight-loss": 3.7,
        energy: 3.4,
        recovery: 3.5,
        health: 4.6,
      } as GoalScores,
      mealTimes: ["breakfast", "snack", "lunch"],
      dietaryInfo: ["글루텐프리", "비건", "케토"],
      description:
        "단일불포화지방이 풍부하고 비타민 E와 K가 함유되어 있어 심혈관 건강에 좋습니다.",
      nutritionTip:
        "아보카도의 건강한 지방은 영양소 흡수를 돕고 포만감을 오래 유지시킵니다.",
      complementaryProducts: [3, 7, 10],
    },
    {
      id: 5,
      name: "그릭 요거트",
      price: 4500,
      // image: "/placeholder.svg?height=200&width=300&text=그릭요거트",
      image: "https://placehold.co/300x200",
      protein: 10,
      carbs: 5,
      fat: 0.5,
      calories: 100,
      category: "protein",
      proteinRatio: 10.0,
      tags: ["고단백", "프로바이오틱스", "저지방"],
      goalScores: {
        "muscle-gain": 4.0,
        "weight-loss": 4.3,
        energy: 3.0,
        recovery: 3.8,
        health: 4.2,
      } as GoalScores,
      mealTimes: ["breakfast", "snack", "post-workout"],
      dietaryInfo: ["글루텐프리"],
      description:
        "고단백, 저지방 유제품으로 프로바이오틱스가 풍부하여 소화 건강에 도움이 됩니다.",
      nutritionTip:
        "취침 전 섭취하면 야간 근육 분해를 방지하는데 도움이 됩니다.",
      complementaryProducts: [6, 8, 11],
    },
    {
      id: 6,
      name: "견과류 믹스",
      price: 9900,
      // image: "/placeholder.svg?height=200&width=300&text=견과류",
      image: "https://placehold.co/300x200",
      protein: 6,
      carbs: 7,
      fat: 14,
      calories: 170,
      category: "healthy-fats",
      proteinRatio: 3.5,
      tags: ["건강한지방", "비타민E", "마그네슘"],
      goalScores: {
        "muscle-gain": 3.5,
        "weight-loss": 3.2,
        energy: 4.0,
        recovery: 3.6,
        health: 4.4,
      } as GoalScores,
      mealTimes: ["snack", "breakfast"],
      dietaryInfo: ["글루텐프리", "비건"],
      description:
        "아몬드, 호두, 브라질넛 등 다양한 견과류 믹스. 건강한 지방과 비타민 E가 풍부합니다.",
      nutritionTip:
        "소량(30g)만 섭취해도 포만감을 주고 에너지를 오래 유지시킵니다.",
      complementaryProducts: [4, 5, 9],
    },
    {
      id: 7,
      name: "유기농 고구마",
      price: 5900,
      // image: "/placeholder.svg?height=200&width=300&text=고구마",
      image: "https://placehold.co/300x200",
      protein: 2,
      carbs: 26,
      fat: 0.1,
      calories: 112,
      category: "complex-carbs",
      proteinRatio: 1.8,
      tags: ["복합탄수화물", "비타민A", "식이섬유"],
      goalScores: {
        "muscle-gain": 3.3,
        "weight-loss": 3.8,
        energy: 4.3,
        recovery: 3.5,
        health: 4.1,
      } as GoalScores,
      mealTimes: ["pre-workout", "lunch", "dinner"],
      dietaryInfo: ["글루텐프리", "비건", "저지방"],
      description:
        "비타민 A가 풍부하고 낮은 GI 지수의 복합 탄수화물. 지속적인 에너지를 제공합니다.",
      nutritionTip: "운동 1-2시간 전에 섭취하면 지속적인 에너지를 제공합니다.",
      complementaryProducts: [1, 2, 8],
    },
    {
      id: 8,
      name: "프로틴 파우더",
      price: 35000,
      // image: "/placeholder.svg?height=200&width=300&text=프로틴파우더",
      image: "https://placehold.co/300x200",
      protein: 24,
      carbs: 3,
      fat: 1,
      calories: 120,
      category: "protein",
      proteinRatio: 20.0,
      tags: ["고단백", "저탄수화물", "빠른흡수"],
      goalScores: {
        "muscle-gain": 4.9,
        "weight-loss": 4.2,
        energy: 3.5,
        recovery: 4.7,
        health: 3.8,
      } as GoalScores,
      mealTimes: ["post-workout", "breakfast", "snack"],
      dietaryInfo: ["글루텐프리"],
      description:
        "고품질 유청 단백질 파우더. 빠른 흡수로 운동 후 근육 회복에 이상적입니다.",
      nutritionTip:
        "운동 후 30분 이내에 섭취하면 근육 단백질 합성을 최대화할 수 있습니다.",
      complementaryProducts: [3, 7, 10],
    },
    {
      id: 9,
      name: "블루베리",
      price: 6900,
      // image: "/placeholder.svg?height=200&width=300&text=블루베리",
      image: "https://placehold.co/300x200",
      protein: 0.7,
      carbs: 14,
      fat: 0.3,
      calories: 57,
      category: "vitamins-minerals",
      proteinRatio: 1.2,
      tags: ["항산화제", "비타민C", "저칼로리"],
      goalScores: {
        "muscle-gain": 2.5,
        "weight-loss": 4.0,
        energy: 3.2,
        recovery: 4.3,
        health: 4.8,
      } as GoalScores,
      mealTimes: ["breakfast", "snack"],
      dietaryInfo: ["글루텐프리", "비건", "저지방"],
      description:
        "항산화 물질이 풍부한 슈퍼푸드. 염증 감소와 면역력 향상에 도움이 됩니다.",
      nutritionTip: "운동 후 섭취하면 항산화 작용으로 회복을 촉진합니다.",
      complementaryProducts: [5, 6, 11],
    },
    {
      id: 10,
      name: "오트밀",
      price: 4900,
      // image: "/placeholder.svg?height=200&width=300&text=오트밀",
      image: "https://placehold.co/300x200",
      protein: 5,
      carbs: 27,
      fat: 3,
      calories: 150,
      category: "complex-carbs",
      proteinRatio: 3.3,
      tags: ["복합탄수화물", "식이섬유", "베타글루칸"],
      goalScores: {
        "muscle-gain": 3.6,
        "weight-loss": 4.1,
        energy: 4.4,
        recovery: 3.7,
        health: 4.3,
      } as GoalScores,
      mealTimes: ["breakfast", "pre-workout"],
      dietaryInfo: ["비건"],
      description:
        "베타글루칸이 풍부한 복합 탄수화물. 콜레스테롤 감소와 지속적인 에너지 공급에 도움이 됩니다.",
      nutritionTip:
        "아침 식사로 섭취하면 하루 종일 포만감을 유지하는데 도움이 됩니다.",
      complementaryProducts: [5, 6, 9],
    },
    {
      id: 11,
      name: "케일",
      price: 3900,
      // image: "/placeholder.svg?height=200&width=300&text=케일",
      image: "https://placehold.co/300x200",
      protein: 2.9,
      carbs: 6.7,
      fat: 0.4,
      calories: 33,
      category: "vitamins-minerals",
      proteinRatio: 8.8,
      tags: ["비타민K", "항산화제", "저칼로리"],
      goalScores: {
        "muscle-gain": 2.7,
        "weight-loss": 4.5,
        energy: 3.0,
        recovery: 3.8,
        health: 4.9,
      } as GoalScores,
      mealTimes: ["lunch", "dinner"],
      dietaryInfo: ["글루텐프리", "비건", "저지방", "케토"],
      description:
        "비타민 K, A, C가 풍부한 녹색 잎채소. 항산화 작용과 염증 감소에 도움이 됩니다.",
      nutritionTip:
        "다양한 색상의 채소와 함께 섭취하면 영양소 흡수가 증가합니다.",
      complementaryProducts: [1, 2, 4],
    },
    {
      id: 12,
      name: "MCT 오일",
      price: 22000,
      // image: "/placeholder.svg?height=200&width=300&text=MCT오일",
      image: "https://placehold.co/300x200",
      protein: 0,
      carbs: 0,
      fat: 14,
      calories: 120,
      category: "healthy-fats",
      proteinRatio: 0,
      tags: ["케토", "중쇄지방산", "빠른에너지"],
      goalScores: {
        "muscle-gain": 3.0,
        "weight-loss": 4.2,
        energy: 4.6,
        recovery: 3.2,
        health: 3.7,
      } as GoalScores,
      mealTimes: ["breakfast", "pre-workout"],
      dietaryInfo: ["글루텐프리", "비건", "케토"],
      description:
        "중쇄 지방산이 함유된 오일로, 빠르게 에너지로 전환되어 케토 식단에 이상적입니다.",
      nutritionTip:
        "커피나 스무디에 1티스푼 추가하면 지속적인 에너지를 제공합니다.",
      complementaryProducts: [6, 8, 10],
    },
  ];

  // 필터링된 제품 목록
  const filteredProducts = products.filter((product) => {
    // 카테고리 필터
    if (selectedCategory !== "all" && product.category !== selectedCategory)
      return false;

    // 목표 필터
    if (
      selectedGoal !== "all" &&
      product.goalScores[selectedGoal as GoalType] < 3.5
    )
      return false;

    // 영양소 범위 필터
    if (product.protein < proteinRange[0] || product.protein > proteinRange[1])
      return false;
    if (product.carbs < carbsRange[0] || product.carbs > carbsRange[1])
      return false;
    if (product.fat < fatRange[0] || product.fat > fatRange[1]) return false;
    if (
      product.calories < caloriesRange[0] ||
      product.calories > caloriesRange[1]
    )
      return false;

    // 식이 제한 필터
    if (dietaryRestrictions.length > 0) {
      const matchesAllRestrictions = dietaryRestrictions.every((restriction) =>
        product.dietaryInfo.includes(restriction),
      );
      if (!matchesAllRestrictions) return false;
    }

    return true;
  });

  // 정렬된 제품 목록
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "protein-ratio":
        return b.proteinRatio - a.proteinRatio;
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "protein":
        return b.protein - a.protein;
      case "calories-asc":
        return a.calories - b.calories;
      case "recommended":
      default:
        // 목표 기반 추천 (선택된 목표가 있는 경우)
        if (selectedGoal !== "all") {
          return (
            b.goalScores[selectedGoal as GoalType] -
            a.goalScores[selectedGoal as GoalType]
          );
        }
        // 기본 추천 (ID 기준)
        return a.id - b.id;
    }
  });

  // 목표별 추천 제품
  const getRecommendedProducts = (goal: string) => {
    return [...products]
      .sort(
        (a, b) =>
          b.goalScores[goal as keyof typeof b.goalScores] -
          a.goalScores[goal as keyof typeof a.goalScores],
      )
      .slice(0, 3);
  };

  // 목표별 추천 제품 목록
  const goalRecommendations: Record<GoalType, any[]> = {
    "muscle-gain": getRecommendedProducts("muscle-gain"),
    "weight-loss": getRecommendedProducts("weight-loss"),
    energy: getRecommendedProducts("energy"),
    recovery: getRecommendedProducts("recovery"),
    health: getRecommendedProducts("health"),
  };

  // 영양소 최대값 (프로그레스 바용)
  const maxNutrients = {
    protein: 30,
    carbs: 50,
    fat: 20,
    calories: 300,
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
                              {selectedGoal !== "all"
                                ? product.goalScores[
                                    selectedGoal as GoalType
                                  ].toFixed(1)
                                : ""}
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
          {showFilters && (
            <div className="hidden md:block space-y-6 bg-gray-50 p-4 rounded-lg">
              <div>
                <h3 className="font-medium mb-2">피트니스 목표</h3>
                <Select value={selectedGoal} onValueChange={setSelectedGoal}>
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
                      onValueChange={setProteinRange}
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
                      onValueChange={setCarbsRange}
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
                      onValueChange={setFatRange}
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
                        id={`desktop-diet-${option.id}`}
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
                  onClick={() => {
                    setProteinRange([0, 50]);
                    setCarbsRange([0, 100]);
                    setFatRange([0, 50]);
                    setCaloriesRange([0, 500]);
                    setDietaryRestrictions([]);
                    setSelectedGoal("all");
                    setSelectedCategory("all");
                  }}
                >
                  필터 초기화
                </Button>
              </div>
            </div>
          )}

          {/* 제품 그리드 */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${
              showFilters ? "md:col-span-3" : "md:col-span-4"
            }`}
          >
            {sortedProducts.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Filter className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">검색 결과가 없습니다</h3>
                <p className="text-gray-500 mt-1 max-w-md">
                  필터 조건을 변경하거나 초기화하여 더 많은 제품을 확인해보세요.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setProteinRange([0, 50]);
                    setCarbsRange([0, 100]);
                    setFatRange([0, 50]);
                    setCaloriesRange([0, 500]);
                    setDietaryRestrictions([]);
                    setSelectedGoal("all");
                    setSelectedCategory("all");
                  }}
                >
                  필터 초기화
                </Button>
              </div>
            ) : (
              sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden flex flex-col"
                >
                  <CardContent className="p-0 relative">
                    <img
                      src={product.image || "https://placehold.co/300x200"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {selectedGoal !== "all" &&
                      product.goalScores[selectedGoal as GoalType] >= 4.5 && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          추천
                        </div>
                      )}
                  </CardContent>
                  <CardHeader className="p-4 pb-2 flex-1">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2 h-10">
                      {product.description}
                    </CardDescription>
                  </CardHeader>

                  {/* 영양소 시각화 */}
                  <div className="px-4 space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-green-700">
                          단백질
                        </span>
                        <span>{product.protein}g</span>
                      </div>
                      <Progress
                        value={(product.protein / maxNutrients.protein) * 100}
                        className="h-1.5"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-blue-700">
                          탄수화물
                        </span>
                        <span>{product.carbs}g</span>
                      </div>
                      <Progress
                        value={(product.carbs / maxNutrients.carbs) * 100}
                        className="h-1.5"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-amber-700">지방</span>
                        <span>{product.fat}g</span>
                      </div>
                      <Progress
                        value={(product.fat / maxNutrients.fat) * 100}
                        className="h-1.5"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-purple-700">
                          칼로리
                        </span>
                        <span>{product.calories}kcal</span>
                      </div>
                      <Progress
                        value={(product.calories / maxNutrients.calories) * 100}
                        className="h-1.5"
                      />
                    </div>
                  </div>

                  {/* 영양 효율성 지표 */}
                  <div className="px-4 pt-2 pb-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">
                          단백질 효율
                        </span>
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
                              <p>
                                100kcal당 단백질 함량 (g). 높을수록 효율적인
                                단백질 공급원입니다.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Badge
                        variant={
                          product.proteinRatio > 10 ? "default" : "outline"
                        }
                        className={
                          product.proteinRatio > 10 ? "bg-green-600" : ""
                        }
                      >
                        {product.proteinRatio.toFixed(1)}
                      </Badge>
                    </div>
                  </div>

                  {/* 목표 적합도 */}
                  {selectedGoal !== "all" && (
                    <div className="px-4 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">
                            {
                              fitnessGoals.find((g) => g.id === selectedGoal)
                                ?.name
                            }{" "}
                            적합도
                          </span>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i <
                                Math.floor(
                                  product.goalScores[selectedGoal as GoalType],
                                )
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs ml-1">
                            {selectedGoal !== "all"
                              ? product.goalScores[
                                  selectedGoal as GoalType
                                ].toFixed(1)
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 영양 팁 */}
                  <div className="px-4 pt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-xs text-gray-500 p-0 h-6"
                        >
                          <Info className="h-3 w-3 mr-1" />
                          영양 팁 보기
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">영양 팁</h4>
                          <p className="text-sm text-gray-600">
                            {product.nutritionTip}
                          </p>

                          <Separator />

                          <div>
                            <h4 className="font-medium text-sm">
                              최적 섭취 시간
                            </h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {product.mealTimes.map((time, index) => (
                                <div
                                  key={index}
                                  className="flex items-center text-xs bg-gray-100 rounded px-2 py-1"
                                >
                                  <Clock className="h-3 w-3 mr-1" />
                                  {time === "pre-workout"
                                    ? "운동 전"
                                    : time === "post-workout"
                                      ? "운동 후"
                                      : time === "breakfast"
                                        ? "아침"
                                        : time === "lunch"
                                          ? "점심"
                                          : time === "dinner"
                                            ? "저녁"
                                            : "간식"}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <CardFooter className="p-4 pt-2 flex justify-between items-center">
                    <span className="font-bold">
                      {product.price.toLocaleString()}원
                    </span>
                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-2"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56">
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                            >
                              <Plus className="h-4 w-4 mr-2" />내 식단에 추가
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              위시리스트에 추가
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              비교 목록에 추가
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Button className="bg-green-600 hover:bg-green-700">
                        장바구니
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* 영양 균형 완성 추천 섹션 */}
        {sortedProducts.length > 0 && (
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
