import { useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Search,
  Eye,
  RotateCcw,
  Star,
  MessageCircle,
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { PieChart, Pie } from "recharts";

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock order data
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-20",
      status: "delivered",
      statusText: "배송완료",
      total: 89900,
      items: [
        {
          id: 1,
          name: "프리미엄 단백질 파우더",
          price: 45000,
          quantity: 1,
          image: "https://placehold.co/80x80",
          protein: 24,
          calories: 120,
        },
        {
          id: 2,
          name: "유기농 닭가슴살 10팩",
          price: 25900,
          quantity: 1,
          image: "https://placehold.co/80x80",
          protein: 26,
          calories: 110,
        },
        {
          id: 3,
          name: "그릭 요거트",
          price: 4500,
          quantity: 4,
          image: "https://placehold.co/80x80",
          protein: 10,
          calories: 100,
        },
      ],
      shipping: {
        method: "일반배송",
        fee: 0,
        address: "서울시 강남구 테헤란로 123, 456동 789호",
        trackingNumber: "1234567890123",
      },
      payment: {
        method: "신용카드",
        cardLast4: "1234",
      },
      deliveredAt: "2024-01-22",
      canReview: true,
      canReorder: true,
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-18",
      status: "shipping",
      statusText: "배송중",
      total: 67800,
      items: [
        {
          id: 4,
          name: "크레아틴 모노하이드레이트",
          price: 28000,
          quantity: 1,
          image: "https://placehold.co/80x80",
          protein: 0,
          calories: 0,
        },
        {
          id: 5,
          name: "견과류 믹스",
          price: 9900,
          quantity: 2,
          image: "https://placehold.co/80x80",
          protein: 6,
          calories: 170,
        },
        {
          id: 6,
          name: "퀴노아",
          price: 8900,
          quantity: 3,
          image: "https://placehold.co/80x80",
          protein: 8,
          calories: 120,
        },
      ],
      shipping: {
        method: "일반배송",
        fee: 3000,
        address: "서울시 강남구 테헤란로 123, 456동 789호",
        trackingNumber: "9876543210987",
        estimatedDelivery: "2024-01-21",
      },
      payment: {
        method: "신용카드",
        cardLast4: "5678",
      },
      canReorder: true,
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-15",
      status: "preparing",
      statusText: "상품준비중",
      total: 34500,
      items: [
        {
          id: 7,
          name: "MCT 오일",
          price: 22000,
          quantity: 1,
          image: "https://placehold.co/80x80",
          protein: 0,
          calories: 120,
        },
        {
          id: 8,
          name: "블루베리",
          price: 6900,
          quantity: 1,
          image: "https://placehold.co/80x80",
          protein: 0.7,
          calories: 57,
        },
        {
          id: 9,
          name: "오트밀",
          price: 4900,
          quantity: 1,
          image: "https://placehold.co/80x80",
          protein: 5,
          calories: 150,
        },
      ],
      shipping: {
        method: "일반배송",
        fee: 3000,
        address: "서울시 강남구 테헤란로 123, 456동 789호",
        estimatedShipping: "2024-01-17",
      },
      payment: {
        method: "카카오페이",
      },
      canCancel: true,
    },
    {
      id: "ORD-2024-004",
      date: "2024-01-10",
      status: "cancelled",
      statusText: "주문취소",
      total: 15900,
      items: [
        {
          id: 10,
          name: "아보카도 오일",
          price: 15000,
          quantity: 1,
          image: "https://placehold.co/80x80",
          protein: 0,
          calories: 120,
        },
      ],
      shipping: {
        method: "일반배송",
        fee: 3000,
        address: "서울시 강남구 테헤란로 123, 456동 789호",
      },
      payment: {
        method: "신용카드",
        cardLast4: "9012",
      },
      cancelledAt: "2024-01-11",
      cancelReason: "고객 요청",
    },
  ];

  // 주문 상태별 통계
  const orderStats = {
    total: orders.length,
    delivered: orders.filter((order) => order.status === "delivered").length,
    shipping: orders.filter((order) => order.status === "shipping").length,
    preparing: orders.filter((order) => order.status === "preparing").length,
    cancelled: orders.filter((order) => order.status === "cancelled").length,
  };

  // 상태별 색상 및 아이콘
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "delivered":
        return {
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="h-4 w-4" />,
          progress: 100,
        };
      case "shipping":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <Truck className="h-4 w-4" />,
          progress: 75,
        };
      case "preparing":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: <Package className="h-4 w-4" />,
          progress: 25,
        };
      case "cancelled":
        return {
          color: "bg-red-100 text-red-800",
          icon: <Clock className="h-4 w-4" />,
          progress: 0,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <Clock className="h-4 w-4" />,
          progress: 0,
        };
    }
  };

  // 필터링된 주문 목록
  const filteredOrders = orders.filter((order) => {
    if (selectedStatus !== "all" && order.status !== selectedStatus)
      return false;
    if (
      searchQuery &&
      !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    )
      return false;

    if (selectedPeriod !== "all") {
      const orderDate = new Date(order.date);
      const now = new Date();
      const diffTime = now.getTime() - orderDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (selectedPeriod) {
        case "week":
          if (diffDays > 7) return false;
          break;
        case "month":
          if (diffDays > 30) return false;
          break;
        case "3months":
          if (diffDays > 90) return false;
          break;
      }
    }

    return true;
  });

  // 재주문 함수
  const handleReorder = (order: any) => {
    // 장바구니에 상품들 추가하는 로직
    console.log("재주문:", order.items);
    // onNavigate && onNavigate("cart")
  };

  // 주문 취소 함수
  const handleCancelOrder = (orderId: string) => {
    console.log("주문 취소:", orderId);
    // 실제로는 API 호출
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        {/* 헤더 */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">주문 내역</h1>
          <p className="text-gray-500">
            Energy Factory에서 주문한 모든 상품을 확인하고 관리하세요
          </p>
        </div>

        {/* 주문 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {orderStats.total}
              </div>
              <div className="text-sm text-gray-500">전체 주문</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {orderStats.delivered}
              </div>
              <div className="text-sm text-gray-500">배송완료</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {orderStats.shipping}
              </div>
              <div className="text-sm text-gray-500">배송중</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {orderStats.preparing}
              </div>
              <div className="text-sm text-gray-500">준비중</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {orderStats.cancelled}
              </div>
              <div className="text-sm text-gray-500">취소됨</div>
            </CardContent>
          </Card>
        </div>

        {/* 검색 및 필터 */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="주문번호 또는 상품명으로 검색..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="주문 상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 상태</SelectItem>
              <SelectItem value="delivered">배송완료</SelectItem>
              <SelectItem value="shipping">배송중</SelectItem>
              <SelectItem value="preparing">상품준비중</SelectItem>
              <SelectItem value="cancelled">주문취소</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="기간" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 기간</SelectItem>
              <SelectItem value="week">최근 1주일</SelectItem>
              <SelectItem value="month">최근 1개월</SelectItem>
              <SelectItem value="3months">최근 3개월</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 주문 목록 */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  주문 내역이 없습니다
                </h3>
                <p className="text-gray-500 mb-4">
                  검색 조건을 변경하거나 새로운 주문을 시작해보세요
                </p>
                <Button onClick={() => console.log("상품 둘러보기")}>
                  상품 둘러보기
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <CardDescription>{order.date} 주문</CardDescription>
                        </div>
                        <Badge
                          className={`${statusInfo.color} flex items-center gap-1`}
                        >
                          {statusInfo.icon}
                          {order.statusText}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">
                          {order.total.toLocaleString()}원
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.length}개 상품
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
                    {/* 상품 목록 */}
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <img
                            src={item.image || "https://placehold.co/80x80"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="text-sm text-gray-500 mt-1">
                              {item.protein > 0 && `단백질 ${item.protein}g`}
                              {item.protein > 0 && item.calories > 0 && " · "}
                              {item.calories > 0 && `${item.calories}kcal`}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {item.price.toLocaleString()}원
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.quantity}개
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* 배송 정보 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium mb-2">배송 정보</h4>
                        <div className="space-y-1 text-gray-600">
                          <div>배송 방법: {order.shipping.method}</div>
                          <div>
                            배송비:{" "}
                            {order.shipping.fee === 0
                              ? "무료"
                              : `${order.shipping.fee.toLocaleString()}원`}
                          </div>
                          <div>배송 주소: {order.shipping.address}</div>
                          {order.shipping.trackingNumber && (
                            <div>
                              운송장 번호: {order.shipping.trackingNumber}
                            </div>
                          )}
                          {order.shipping.estimatedDelivery && (
                            <div>
                              예상 배송일: {order.shipping.estimatedDelivery}
                            </div>
                          )}
                          {order.deliveredAt && (
                            <div>배송 완료일: {order.deliveredAt}</div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">결제 정보</h4>
                        <div className="space-y-1 text-gray-600">
                          <div>결제 방법: {order.payment.method}</div>
                          {order.payment.cardLast4 && (
                            <div>
                              카드 번호: ****-****-****-
                              {order.payment.cardLast4}
                            </div>
                          )}
                          <div>결제 금액: {order.total.toLocaleString()}원</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-wrap gap-2 pt-4 border-t">
                    {/* 주문 상태별 액션 버튼 */}
                    {order.status === "delivered" && (
                      <>
                        {order.canReview && (
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
                                  구매하신 상품에 대한 솔직한 후기를 남겨주세요
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">
                                    평점
                                  </label>
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
                                  <label className="text-sm font-medium">
                                    리뷰 내용
                                  </label>
                                  <Textarea
                                    placeholder="상품에 대한 후기를 작성해주세요..."
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
                        )}
                        {order.canReorder && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReorder(order)}
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            재주문
                          </Button>
                        )}
                      </>
                    )}

                    {order.status === "shipping" &&
                      order.shipping.trackingNumber && (
                        <Button variant="outline" size="sm">
                          <Truck className="h-4 w-4 mr-1" />
                          배송 추적
                        </Button>
                      )}

                    {order.status === "preparing" && order.canCancel && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        주문 취소
                      </Button>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          상세 보기
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="space-y-6">
                          {/* 헤더 - 주문번호와 배송상태 */}
                          <div className="border-b border-neutral-200 pb-2">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-base font-normal">
                                주문번호: {order.id}
                              </h3>
                              <Badge
                                className={`${getStatusInfo(order.status).color} flex items-center gap-1`}
                              >
                                {getStatusInfo(order.status).icon}
                                {order.statusText}
                              </Badge>
                            </div>
                            <p className="text-sm text-neutral-600">
                              {order.date} 오전
                            </p>
                          </div>

                          {/* 주문 상품 */}
                          <div className="space-y-4">
                            <h4 className="text-base font-normal">주문 상품</h4>
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex gap-3 p-3 bg-neutral-50 rounded-lg"
                                >
                                  <div className="border border-neutral-200 rounded-lg overflow-hidden w-16 h-16 flex-shrink-0">
                                    <img
                                      src={
                                        item.image || "https://placehold.co/64x64"
                                      }
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm text-neutral-900 mb-1">
                                      {item.name}
                                    </div>
                                    <div className="text-xs text-neutral-600 mb-1">
                                      선택옵션 {item.protein}g ·{" "}
                                      {item.calories}kcal
                                    </div>
                                    <div className="text-xs text-neutral-500">
                                      탄수화물 {Math.round(item.calories * 0.4 / 4)}g · 단백질{" "}
                                      {item.protein}g · 지방{" "}
                                      {Math.round(item.calories * 0.3 / 9)}g
                                    </div>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <div className="text-sm text-neutral-900">
                                      {item.price.toLocaleString()}원
                                    </div>
                                    <div className="text-xs text-neutral-600">
                                      수량 {item.quantity}개
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 영양소 비율 */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium">영양소 비율</h4>
                            <div className="flex items-center justify-between px-24">
                              {/* 파이 차트 */}
                              <div className="w-56 h-70">
                                <PieChart width={224} height={280}>
                                  <Pie
                                    data={[
                                      {
                                        name: "탄수화물",
                                        value: order.items.reduce(
                                          (sum, item) =>
                                            sum +
                                            Math.round(
                                              (item.calories * 0.47 * item.quantity) / 4,
                                            ),
                                          0,
                                        ),
                                        fill: "#008cdd",
                                      },
                                      {
                                        name: "단백질",
                                        value: order.items.reduce(
                                          (sum, item) =>
                                            sum + item.protein * item.quantity,
                                          0,
                                        ),
                                        fill: "#00a63e",
                                      },
                                      {
                                        name: "지방",
                                        value: order.items.reduce(
                                          (sum, item) =>
                                            sum +
                                            Math.round(
                                              (item.calories * 0.17 * item.quantity) / 9,
                                            ),
                                          0,
                                        ),
                                        fill: "#3ab4ea",
                                      },
                                    ]}
                                    cx={106}
                                    cy={140}
                                    innerRadius={0}
                                    outerRadius={90}
                                    paddingAngle={0}
                                    dataKey="value"
                                    label={({
                                      cx,
                                      cy,
                                      midAngle,
                                      outerRadius,
                                      percent,
                                      name,
                                    }) => {
                                      const RADIAN = Math.PI / 180;
                                      const radius = outerRadius + 30;
                                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                      return (
                                        <text
                                          x={x}
                                          y={y}
                                          fill={
                                            name === "탄수화물"
                                              ? "#008cdd"
                                              : name === "단백질"
                                                ? "#00a63e"
                                                : "#3ab4ea"
                                          }
                                          textAnchor={x > cx ? "start" : "end"}
                                          dominantBaseline="central"
                                          className="text-xs"
                                        >
                                          {`${name} ${Math.round(percent * 100)}%`}
                                        </text>
                                      );
                                    }}
                                  />
                                </PieChart>
                              </div>
                              {/* 범례 */}
                              <div className="flex flex-col gap-4 justify-center">
                                <div className="bg-blue-50 rounded-lg px-3 py-3 flex items-center justify-between w-52">
                                  <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-[#008cdd]" />
                                    <span className="text-base text-neutral-900">
                                      탄수화물
                                    </span>
                                  </div>
                                  <span className="text-base text-neutral-900">
                                    {order.items.reduce(
                                      (sum, item) =>
                                        sum +
                                        Math.round(
                                          (item.calories * 0.47 * item.quantity) / 4,
                                        ),
                                      0,
                                    )}
                                    g
                                  </span>
                                </div>
                                <div className="bg-green-50 rounded-lg px-3 py-3 flex items-center justify-between w-52">
                                  <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-green-600" />
                                    <span className="text-base text-neutral-900">
                                      단백질
                                    </span>
                                  </div>
                                  <span className="text-base text-neutral-900">
                                    {order.items.reduce(
                                      (sum, item) =>
                                        sum + item.protein * item.quantity,
                                      0,
                                    )}
                                    g
                                  </span>
                                </div>
                                <div className="bg-blue-100 rounded-lg px-3 py-3 flex items-center justify-between w-52">
                                  <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-[#3ab4ea]" />
                                    <span className="text-base text-neutral-900">
                                      지방
                                    </span>
                                  </div>
                                  <span className="text-base text-neutral-900">
                                    {order.items.reduce(
                                      (sum, item) =>
                                        sum +
                                        Math.round(
                                          (item.calories * 0.17 * item.quantity) / 9,
                                        ),
                                      0,
                                    )}
                                    g
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 총 칼로리 */}
                          <div className="bg-green-50 rounded-lg py-6 px-6 text-center">
                            <p className="text-base text-neutral-600 mb-2">
                              총 칼로리
                            </p>
                            <p className="text-4xl text-[#00a63e] leading-10">
                              {order.items.reduce(
                                (sum, item) =>
                                  sum + item.calories * item.quantity,
                                0,
                              )}{" "}
                              kcal
                            </p>
                          </div>

                          {/* 배송 정보 & 결제 정보 */}
                          <div className="grid grid-cols-2 gap-6 border-t border-neutral-200 pt-6">
                            <div className="space-y-3">
                              <h4 className="text-base font-normal">배송 정보</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex gap-1">
                                  <span className="text-neutral-600">
                                    배송 주관:
                                  </span>
                                  <span className="text-neutral-900">
                                    롯데 택배
                                  </span>
                                </div>
                                <div className="flex gap-1">
                                  <span className="text-neutral-600">
                                    배송받는 분:
                                  </span>
                                  <span className="text-neutral-900">김OO</span>
                                </div>
                                <div className="flex gap-1">
                                  <span className="text-neutral-600">
                                    배송 주소:
                                  </span>
                                  <span className="text-neutral-900">
                                    {order.shipping.address}
                                  </span>
                                </div>
                                {order.shipping.trackingNumber && (
                                  <div className="flex gap-1">
                                    <span className="text-neutral-600">
                                      배송시 요구 사항:
                                    </span>
                                    <span className="text-neutral-900">
                                      문에 걸어주세요
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-base font-normal">결제 정보</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex gap-1">
                                  <span className="text-neutral-600">
                                    결제 방법:
                                  </span>
                                  <span className="text-neutral-900">
                                    {order.payment.method}
                                  </span>
                                </div>
                                <div className="flex gap-1">
                                  <span className="text-neutral-600">
                                    배송 금액:
                                  </span>
                                  <span className="text-neutral-900">
                                    {order.shipping.fee === 0
                                      ? "배송료 무료"
                                      : `${order.shipping.fee.toLocaleString()}원`}
                                  </span>
                                </div>
                                <div className="flex gap-1">
                                  <span className="text-neutral-600">
                                    총 결제 금액:
                                  </span>
                                  <span className="text-neutral-900">
                                    {order.total.toLocaleString()}원
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      문의하기
                    </Button>
                  </CardFooter>
                </Card>
              );
            })
          )}
        </div>

        {/* 페이지네이션 (필요시) */}
        {filteredOrders.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                이전
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-green-600 text-white"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                다음
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
