import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Cart } from "@/types/cart";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const NutritionCard = (props: { cart: Cart; selectedItems: number[] }) => {
  const { cart, selectedItems } = props;
  // 선택된 아이템들의 영양소 합계
  const selectedNutrition = cart?.items
    .filter((item) => selectedItems.includes(item.id))
    .reduce(
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
  const totalMacros = selectedNutrition
    ? selectedNutrition.protein +
      selectedNutrition.carbs +
      selectedNutrition.fat
    : 0;
  const proteinRatio = totalMacros
    ? Math.round((selectedNutrition!.protein / totalMacros) * 100)
    : 0;
  const carbsRatio = totalMacros
    ? Math.round((selectedNutrition!.carbs / totalMacros) * 100)
    : 0;
  const fatRatio = totalMacros
    ? Math.round((selectedNutrition!.fat / totalMacros) * 100)
    : 0;

  // 파이 차트 데이터
  const chartData = [
    { name: "단백질", value: proteinRatio, color: "#9810fa" },
    { name: "지방", value: fatRatio, color: "#f54900" },
    { name: "탄수화물", value: carbsRatio, color: "#155dfc" },
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
        <div className="h-48 md:h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="circle"
                iconSize={14}
                formatter={(
                  value,
                  entry: {
                    color?: string;
                    payload?: { value?: number };
                  },
                ) => (
                  <span className="text-sm" style={{ color: entry.color }}>
                    {value} {entry.payload?.value}%
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <Separator className="mb-6" />

        {/* 영양소 상세 */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
          <NutritionDetail
            label="탄수화물"
            value={`${selectedNutrition?.carbs.toFixed(1) || 0}g`}
            percentage={`${carbsRatio}%`}
            color="text-blue-500"
          />
          <NutritionDetail
            label="단백질"
            value={`${selectedNutrition?.protein || 0}g`}
            percentage={`${proteinRatio}%`}
            color="text-violet-500"
          />
          <NutritionDetail
            label="지방"
            value={`${selectedNutrition?.fat.toFixed(1) || 0}g`}
            percentage={`${fatRatio}%`}
            color="text-orange-500"
          />
        </div>

        <Separator className="mb-6" />

        {/* 총 칼로리 */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs md:text-sm text-center text-neutral-600">
            총 칼로리
          </p>
          <p className="text-lg md:text-xl text-center text-neutral-900">
            {selectedNutrition?.calories || 0}kcal
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionCard;

// 영양소 상세 정보 컴포넌트
function NutritionDetail({
  label,
  value,
  percentage,
  color,
}: {
  label: string;
  value: string;
  percentage: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-xs md:text-sm text-center text-neutral-600">{label}</p>
      <p className={`text-sm md:text-base ${color}`}>{value}</p>
      <p className="text-[10px] md:text-xs text-center text-neutral-500">
        {percentage}
      </p>
    </div>
  );
}
