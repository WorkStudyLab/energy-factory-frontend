import { useState } from "react"
import { Minus, Plus, ShoppingBag, Trash2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// 타입 정의
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  protein: number
  carbs: number
  fat: number
  calories: number
}

interface RecommendedProduct {
  id: number
  name: string
  price: number
  image: string
  protein: number
  fat: number
  calories: number
}

export default function CartPage() {
  // Mock cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "유기농 닭가슴살",
      price: 12900,
      quantity: 2,
      image: "https://placehold.co/80x80",
      protein: 24,
      carbs: 0,
      fat: 1.5,
      calories: 110,
    },
    {
      id: 2,
      name: "그릭 요거트",
      price: 4500,
      quantity: 1,
      image: "https://placehold.co/80x80",
      protein: 10,
      carbs: 5,
      fat: 0.5,
      calories: 100,
    },
    {
      id: 3,
      name: "퀴노아",
      price: 8900,
      quantity: 1,
      image: "https://placehold.co/80x80",
      protein: 8,
      carbs: 21,
      fat: 3.5,
      calories: 120,
    },
  ])

  // Mock recommended products
  const recommendedProducts: RecommendedProduct[] = [
    {
      id: 4,
      name: "아보카도",
      price: 3900,
      image: "https://placehold.co/60x60",
      protein: 2,
      fat: 15,
      calories: 160,
    },
    {
      id: 5,
      name: "견과류 믹스",
      price: 9900,
      image: "https://placehold.co/60x60",
      protein: 6,
      fat: 14,
      calories: 170,
    },
  ]

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 30000 ? 0 : 3000
  const total = subtotal + shipping

  // Calculate nutrition totals
  const nutritionTotals = cartItems.reduce(
    (totals, item) => {
      return {
        protein: totals.protein + item.protein * item.quantity,
        carbs: totals.carbs + item.carbs * item.quantity,
        fat: totals.fat + item.fat * item.quantity,
        calories: totals.calories + item.calories * item.quantity,
      }
    },
    { protein: 0, carbs: 0, fat: 0, calories: 0 },
  )

  // Nutrition goals (mock data)
  const nutritionGoals = {
    protein: 184,
    carbs: 245,
    fat: 82,
    calories: 2450,
  }

  // Calculate percentages
  const nutritionPercentages = {
    protein: Math.min(100, Math.round((nutritionTotals.protein / nutritionGoals.protein) * 100)),
    carbs: Math.min(100, Math.round((nutritionTotals.carbs / nutritionGoals.carbs) * 100)),
    fat: Math.min(100, Math.round((nutritionTotals.fat / nutritionGoals.fat) * 100)),
    calories: Math.min(100, Math.round((nutritionTotals.calories / nutritionGoals.calories) * 100)),
  }

  // Handle quantity change
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Handle item removal
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">장바구니</h1>
          <p className="text-gray-500">장바구니에 담긴 상품과 영양소 정보를 확인하세요</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Cart Items */}
            <Card>
              <CardHeader>
                <CardTitle>장바구니 상품 ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium">장바구니가 비어있습니다</h3>
                    <p className="text-gray-500 mt-1">상품을 추가하고 건강한 쇼핑을 시작하세요</p>
                    <Button className="mt-4 bg-green-600 hover:bg-green-700">쇼핑 계속하기</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 py-4 border-b last:border-0">
                        <img
                          src={item.image || "https://placehold.co/80x80"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-sm text-gray-500 space-y-1">
                            <p>단백질: {item.protein}g</p>
                            <p>탄수화물: {item.carbs}g</p>
                            <p>지방: {item.fat}g</p>
                            <p>칼로리: {item.calories}kcal</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <p className="font-bold">{(item.price * item.quantity).toLocaleString()}원</p>
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">감소</span>
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">증가</span>
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-red-500 hover:text-red-700"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            삭제
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  쇼핑 계속하기
                </Button>
              </CardFooter>
            </Card>

            {/* Nutrition Summary */}
            <Card>
              <CardHeader>
                <CardTitle>영양소 요약</CardTitle>
                <CardDescription>장바구니 상품의 총 영양소와 목표 대비 달성률</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600">단백질</Badge>
                      <span>
                        {nutritionTotals.protein}g / {nutritionGoals.protein}g
                      </span>
                    </div>
                    <span className="text-sm font-medium">{nutritionPercentages.protein}%</span>
                  </div>
                  <Progress value={nutritionPercentages.protein} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-600">탄수화물</Badge>
                      <span>
                        {nutritionTotals.carbs}g / {nutritionGoals.carbs}g
                      </span>
                    </div>
                    <span className="text-sm font-medium">{nutritionPercentages.carbs}%</span>
                  </div>
                  <Progress value={nutritionPercentages.carbs} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-600">지방</Badge>
                      <span>
                        {nutritionTotals.fat}g / {nutritionGoals.fat}g
                      </span>
                    </div>
                    <span className="text-sm font-medium">{nutritionPercentages.fat}%</span>
                  </div>
                  <Progress value={nutritionPercentages.fat} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-600">칼로리</Badge>
                      <span>
                        {nutritionTotals.calories}kcal / {nutritionGoals.calories}kcal
                      </span>
                    </div>
                    <span className="text-sm font-medium">{nutritionPercentages.calories}%</span>
                  </div>
                  <Progress value={nutritionPercentages.calories} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recommended Products */}
            <Card>
              <CardHeader>
                <CardTitle>추천 상품</CardTitle>
                <CardDescription>영양 목표 달성을 위한 추천 상품</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">단백질 섭취량을 높이기 위한 추천 상품</span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {recommendedProducts.map((product) => (
                      <div key={product.id} className="flex gap-4 items-center border rounded-lg p-3">
                        <img
                          src={product.image || "https://placehold.co/60x60"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-500">
                            단백질 {product.protein}g / {product.calories} kcal
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-bold">{product.price.toLocaleString()}원</span>
                            <Button variant="outline" size="sm">
                              추가
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>주문 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>상품 금액</span>
                    <span>{subtotal.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>배송비</span>
                    <span>{shipping > 0 ? `${shipping.toLocaleString()}원` : "무료"}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-sm text-gray-500">
                      {(30000 - subtotal).toLocaleString()}원 더 구매 시 무료 배송
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>총 결제 금액</span>
                  <span>{total.toLocaleString()}원</span>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">결제하기</Button>

                <div className="space-y-2">
                  <div className="text-sm text-gray-500">쿠폰 또는 할인 코드가 있으신가요?</div>
                  <div className="flex gap-2">
                    <Input placeholder="할인 코드 입력" />
                    <Button variant="outline">적용</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
