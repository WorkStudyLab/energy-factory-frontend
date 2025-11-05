import { Card, CardContent } from "@/components/ui/card";
import type { CartItem } from "@/types/cart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface NutritionCardProps {
  selectedCartItems: CartItem[];
}

const NutritionCard = (props: NutritionCardProps) => {
  const { selectedCartItems } = props;

  // 선택된 아이템들의 영양소 합계 계산
  const selectedNutrition = selectedCartItems.reduce(
    (acc, item) => {
      const nutrition = item.nutrition;
      if (nutrition) {
        return {
          protein: acc.protein + nutrition.protein * item.quantity,
          carbs: acc.carbs + nutrition.carbs * item.quantity,
          fat: acc.fat + nutrition.fat * item.quantity,
          calories: acc.calories + nutrition.calories * item.quantity,
        };
      }
      return acc;
    },
    { protein: 0, carbs: 0, fat: 0, calories: 0 },
  );

  // 영양소 비율 계산
  const totalMacros =
    selectedNutrition.protein + selectedNutrition.carbs + selectedNutrition.fat;
  const proteinRatio = totalMacros
    ? Math.round((selectedNutrition.protein / totalMacros) * 100)
    : 0;
  const carbsRatio = totalMacros
    ? Math.round((selectedNutrition.carbs / totalMacros) * 100)
    : 0;
  const fatRatio = totalMacros
    ? Math.round((selectedNutrition.fat / totalMacros) * 100)
    : 0;

  // 파이 차트 데이터
  const chartData = [
    {
      name: "단백질",
      value: selectedNutrition.protein * 4,
      grams: selectedNutrition.protein,
      color: "#22c55e",
      percentage: proteinRatio,
    },
    {
      name: "탄수화물",
      value: selectedNutrition.carbs * 4,
      grams: selectedNutrition.carbs,
      color: "#3b82f6",
      percentage: carbsRatio,
    },
    {
      name: "지방",
      value: selectedNutrition.fat * 9,
      grams: selectedNutrition.fat,
      color: "#f59e0b",
      percentage: fatRatio,
    },
  ];

  return (
    <Card className="border-neutral-200">
      <CardContent className="p-4 md:p-6">
        <h2 className="text-sm md:text-base text-neutral-900 mb-2">
          영양소 요약
        </h2>
        <p className="text-xs md:text-sm text-neutral-600 mb-6">
          담아두신 상품들의 총 영양성분을 확인해 보세요
        </p>

        {/* 파이 차트 */}
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percentage }) => `${name}\n${percentage}%`}
                labelLine={true}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* 범례 */}
          <div className="w-full space-y-2 mt-4">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold">{item.grams.toFixed(1)}g</span>
                  <span className="text-gray-500 ml-1">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 총 칼로리 표시 */}
          <div className="w-full border-t border-gray-200 pt-3 mt-4">
            <div className="flex items-center justify-between">
              <div className="text-base font-bold text-gray-700">총 칼로리</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-green-600">
                  {selectedNutrition.calories}
                </span>
                <span className="text-base font-semibold text-gray-600">
                  kcal
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionCard;
