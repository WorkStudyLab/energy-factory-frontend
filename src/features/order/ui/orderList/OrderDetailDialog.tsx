import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useOrderDetail } from "../../hooks/useOrderDetail";
import type { OrderStatus, PaymentMethod } from "@/types/order";
import { formatOrderDateTime, formatDateOnly } from "@/utils/dateUtils";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface OrderDetailDialogProps {
  orderNumber: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 주문 상태별 스타일
const getStatusStyle = (status: OrderStatus) => {
  switch (status) {
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    case "SHIPPED":
      return "bg-blue-100 text-blue-800";
    case "CONFIRMED":
      return "bg-yellow-100 text-yellow-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// 주문 상태별 텍스트
const getStatusText = (status: OrderStatus) => {
  switch (status) {
    case "DELIVERED":
      return "배송완료";
    case "SHIPPED":
      return "배송중";
    case "CONFIRMED":
      return "주문확인";
    case "PENDING":
      return "주문대기";
    case "CANCELLED":
      return "주문취소";
    default:
      return "알 수 없음";
  }
};

// 결제 수단 텍스트
const getPaymentMethodText = (method: PaymentMethod) => {
  switch (method) {
    case "CREDIT_CARD":
      return "신용카드";
    case "BANK_TRANSFER":
      return "계좌이체";
    case "VIRTUAL_ACCOUNT":
      return "가상계좌";
    case "MOBILE":
      return "휴대폰 결제";
    default:
      return "알 수 없음";
  }
};

const OrderDetailDialog = ({
  orderNumber,
  open,
  onOpenChange,
}: OrderDetailDialogProps) => {
  const { order, isLoading, error } = useOrderDetail(orderNumber);

  // 영양소 계산 및 차트 데이터 생성
  const nutritionData = useMemo(() => {
    if (!order?.nutritionSummary) return null;

    const {
      carbsRatio,
      fatRatio,
      proteinRatio,
      totalCalories,
      totalCarbs,
      totalFat,
      totalProtein,
    } = order.nutritionSummary;

    // 비율 (이미 퍼센트 형태: 52.1, 47.9 등)
    const carbsPercent = Math.round(carbsRatio);
    const proteinPercent = Math.round(proteinRatio);
    const fatPercent = Math.round(fatRatio);

    // 칼로리 계산 (그래프용)
    const carbsCalories = totalCalories * (carbsRatio / 100);
    const proteinCalories = totalCalories * (proteinRatio / 100);
    const fatCalories = totalCalories * (fatRatio / 100);

    // recharts용 차트 데이터
    const chartData = [
      {
        name: "탄수화물",
        value: carbsCalories,
        grams: totalCarbs,
        color: "#008cdd",
        percentage: carbsPercent,
      },
      {
        name: "단백질",
        value: proteinCalories,
        grams: totalProtein,
        color: "#16a34a",
        percentage: proteinPercent,
      },
      {
        name: "지방",
        value: fatCalories,
        grams: totalFat,
        color: "#3ab4ea",
        percentage: fatPercent,
      },
    ];

    return {
      carbs: totalCarbs,
      protein: totalProtein,
      fat: totalFat,
      calories: Math.round(totalCalories),
      carbsPercent,
      proteinPercent,
      fatPercent,
      chartData,
    };
  }, [order]);

  // 로딩 상태
  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">주문 정보를 불러오는 중...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // 에러 상태
  if (error || !order) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-red-600">
                {error?.message || "주문 정보를 불러올 수 없습니다."}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-base">
                주문번호: {order.orderNumber}
              </DialogTitle>
              <p className="text-sm text-neutral-600 mt-2">
                {formatOrderDateTime(order.payment?.paidAt)}
              </p>
            </div>
            <Badge className={getStatusStyle(order.status)}>
              {getStatusText(order.status)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 주문 상품 */}
          <div>
            <h4 className="text-base font-normal text-neutral-900 mb-4">
              주문 상품
            </h4>
            <div className="space-y-3">
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-50 rounded-lg p-3 flex gap-3"
                >
                  <div className="border border-neutral-200 rounded-lg overflow-hidden shrink-0 w-16 h-16">
                    {item.productImageUrl ? (
                      <img
                        src={item.productImageUrl}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-900 mb-1">
                      {item.productName}
                    </p>
                    <p className="text-xs text-neutral-600 mb-1">
                      {item.variantName}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-neutral-900 mb-1">
                      {item.totalPrice.toLocaleString()}원
                    </p>
                    <p className="text-xs text-neutral-600">
                      수량 {item.quantity}개
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 영양소 비율 */}
          {nutritionData && (
            <div>
              <h4 className="text-lg font-medium text-neutral-900 mb-4">
                영양소 비율
              </h4>
              <div className="flex items-center justify-between ">
                {/* 파이 차트 (Recharts) */}
                <div className="w-[100%] h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={nutritionData.chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percentage }) =>
                          `${name}\n${percentage}%`
                        }
                        labelLine={true}
                      >
                        {nutritionData.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* 영양소 상세 */}
                <div className="space-y-4 w-[211px]">
                  <div className="bg-blue-50 h-12 rounded-lg px-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#008cdd]" />
                      <span className="text-base text-neutral-900">
                        탄수화물
                      </span>
                    </div>
                    <span className="text-base text-neutral-900">
                      {nutritionData.carbs}g
                    </span>
                  </div>
                  <div className="bg-green-50 h-12 rounded-lg px-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-green-600" />
                      <span className="text-base text-neutral-900">단백질</span>
                    </div>
                    <span className="text-base text-neutral-900">
                      {nutritionData.protein}g
                    </span>
                  </div>
                  <div className="bg-blue-100 h-12 rounded-lg px-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#3ab4ea]" />
                      <span className="text-base text-neutral-900">지방</span>
                    </div>
                    <span className="text-base text-neutral-900">
                      {nutritionData.fat}g
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 총 칼로리 */}
          {nutritionData && (
            <div className="bg-green-50 rounded-lg py-6 px-6 text-center">
              <p className="text-base text-neutral-600 mb-2">총 칼로리</p>
              <p className="text-4xl text-[#00a63e]">
                {nutritionData.calories} kcal
              </p>
            </div>
          )}

          {/* 배송/결제 정보 */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-200">
            {/* 배송 정보 */}
            <div>
              <h4 className="text-base font-normal text-neutral-900 mb-3">
                배송 정보
              </h4>
              <div className="space-y-2 text-sm">
                <div className="text-neutral-600">
                  배송 예정 날짜:{" "}
                  <span className="text-neutral-900 ml-2">
                    {formatDateOnly(order.deliveryInfo?.estimatedDeliveryDate)}
                  </span>
                </div>
                <div className="text-neutral-600">
                  배송받는 분:{" "}
                  <span className="text-neutral-900 ml-2">
                    {order.recipientName}
                  </span>
                </div>
                <div className="text-neutral-600">
                  배송 주소:{" "}
                  <span className="text-neutral-900 ml-2">
                    {order.addressLine1}{" "}
                    {order.addressLine2 && order.addressLine2}
                  </span>
                </div>
              </div>
            </div>

            {/* 결제 정보 */}
            <div>
              <h4 className="text-base font-normal text-neutral-900 mb-3">
                결제 정보
              </h4>
              <div className="space-y-2 text-sm">
                <div className="text-neutral-600">
                  결제 방법:{" "}
                  <span className="text-neutral-900 ml-2">
                    {getPaymentMethodText(order.payment?.paymentMethod)}
                  </span>
                </div>
                <div className="text-neutral-600">
                  배송 금액:{" "}
                  <span className="text-neutral-900 ml-2">배송료 무료</span>
                </div>
                <div className="text-neutral-600">
                  총 결제 금액:{" "}
                  <span className="text-neutral-900 ml-2">
                    {order.totalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
