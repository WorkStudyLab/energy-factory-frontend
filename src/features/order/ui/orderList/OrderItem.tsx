import { useState } from "react";
import {
  CheckCircle,
  Clock,
  Eye,
  Package,
  RotateCcw,
  Star,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { OrderListItem, OrderStatus } from "@/types/order";
import OrderDetailDialog from "./OrderDetailDialog";

interface OrderItemProps {
  order: OrderListItem;
  onReorder: (orderId: number) => void;
  onCancelOrder: (orderId: number) => void;
}

// 주문 상태별 정보
const getStatusInfo = (status: OrderStatus) => {
  switch (status) {
    case "DELIVERED":
      return {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="h-4 w-4" />,
        progress: 100,
        text: "배송완료",
      };
    case "SHIPPED":
      return {
        color: "bg-blue-100 text-blue-800",
        icon: <Truck className="h-4 w-4" />,
        progress: 75,
        text: "배송중",
      };
    case "CONFIRMED":
      return {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Package className="h-4 w-4" />,
        progress: 50,
        text: "주문확인",
      };
    case "PENDING":
      return {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Package className="h-4 w-4" />,
        progress: 25,
        text: "주문대기",
      };
    case "CANCELLED":
      return {
        color: "bg-red-100 text-red-800",
        icon: <Clock className="h-4 w-4" />,
        progress: 0,
        text: "주문취소",
      };
    default:
      return {
        color: "bg-gray-100 text-gray-800",
        icon: <Clock className="h-4 w-4" />,
        progress: 0,
        text: "알 수 없음",
      };
  }
};

// 결제 상태별 텍스트
const getPaymentStatusText = (
  paymentStatus: OrderListItem["paymentStatus"],
) => {
  switch (paymentStatus) {
    case "COMPLETED":
      return "결제완료";
    case "PENDING":
      return "결제대기";
    case "FAILED":
      return "결제실패";
    case "REFUNDED":
      return "환불완료";
    default:
      return "알 수 없음";
  }
};

const OrderItem = ({ order, onReorder, onCancelOrder }: OrderItemProps) => {
  const statusInfo = getStatusInfo(order.status);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <CardTitle className="text-lg">
                주문번호: {order.orderNumber}
              </CardTitle>
              <CardDescription>{order.recipientName}</CardDescription>
            </div>
            <Badge className={`${statusInfo.color} flex items-center gap-1`}>
              {statusInfo.icon}
              {statusInfo.text}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">
              {order.totalPrice.toLocaleString()}원
            </div>
            <div className="text-sm text-gray-500">
              {order.itemCount}개 상품
            </div>
          </div>
        </div>

        {/* 주문 진행 상태 */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>주문 진행 상태</span>
            <span>{statusInfo.progress}%</span>
          </div>
          <Progress value={statusInfo.progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 상품 정보 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-base mb-2">대표 상품</h4>
          <p className="text-sm text-gray-700">
            {order.representativeProductName}
            {order.itemCount > 1 && ` 외 ${order.itemCount - 1}건`}
          </p>
        </div>

        <Separator />

        {/* 결제 정보 */}
        <div className="text-sm">
          <h4 className="font-medium mb-2">결제 정보</h4>
          <div className="space-y-1 text-gray-600">
            <div>결제 상태: {getPaymentStatusText(order.paymentStatus)}</div>
            <div>결제 금액: {order.totalPrice.toLocaleString()}원</div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 pt-4 border-t">
        {/* 주문 상태별 액션 버튼 */}
        {order.status === "DELIVERED" && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-1" />
                  리뷰 작성
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>상품 리뷰 작성</DialogTitle>
                  <DialogDescription>
                    구매하신 상품에 대한 리뷰를 남겨주세요
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">별점</label>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-6 w-6 text-gray-300 hover:text-yellow-400 cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">리뷰 내용</label>
                    <Textarea
                      placeholder="상품에 대한 리뷰를 작성해주세요..."
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">취소</Button>
                    <Button>리뷰 등록</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReorder(order.id)}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              재주문
            </Button>
          </>
        )}

        {order.status === "SHIPPED" && (
          <Button variant="outline" size="sm">
            <Truck className="h-4 w-4 mr-1" />
            배송 조회
          </Button>
        )}

        {(order.status === "PENDING" || order.status === "CONFIRMED") && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCancelOrder(order.id)}
          >
            주문 취소
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDetailOpen(true)}
        >
          <Eye className="h-4 w-4 mr-1" />
          주문 상세
        </Button>
      </CardFooter>
    </Card>

      {/* 주문 상세보기 다이얼로그 */}
      <OrderDetailDialog
        orderNumber={order.orderNumber}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </>
  );
};

export default OrderItem;
