import { useState } from "react"
import { Send, User, Bot, Plus, Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function DietCoachPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "안녕하세요! Energy Factory의 AI 식단 코치입니다. 영양 관련 질문이나 식단 계획에 대해 무엇이든 물어보세요.",
    },
  ])
  const [inputValue, setInputValue] = useState("")

  // Mock meal plans
  const mealPlans = [
    {
      id: 1,
      title: "근육 증가 식단 플랜",
      description: "단백질 중심의 고칼로리 식단",
      meals: [
        { time: "아침", name: "프로틴 오트밀", calories: 450, protein: 30 },
        { time: "간식", name: "그릭 요거트와 견과류", calories: 250, protein: 15 },
        { time: "점심", name: "닭가슴살 샐러드", calories: 550, protein: 40 },
        { time: "간식", name: "프로틴 스무디", calories: 300, protein: 25 },
        { time: "저녁", name: "연어 스테이크와 퀴노아", calories: 650, protein: 45 },
      ],
      totalCalories: 2200,
      totalProtein: 155,
    },
    {
      id: 2,
      title: "체중 감량 식단 플랜",
      description: "저칼로리 고단백 식단",
      meals: [
        { time: "아침", name: "에그 화이트 오믈렛", calories: 300, protein: 25 },
        { time: "간식", name: "단백질 바", calories: 150, protein: 15 },
        { time: "점심", name: "참치 샐러드", calories: 400, protein: 35 },
        { time: "간식", name: "채소 스틱과 후무스", calories: 150, protein: 5 },
        { time: "저녁", name: "구운 닭가슴살과 채소", calories: 450, protein: 40 },
      ],
      totalCalories: 1450,
      totalProtein: 120,
    },
  ]

  // Mock recommended products
  const recommendedProducts = [
    {
      id: 1,
      name: "유기농 닭가슴살",
      price: 12900,
      image: "https://placehold.co/80x80",
      protein: 24,
      calories: 110,
    },
    {
      id: 2,
      name: "그릭 요거트",
      price: 4500,
      image: "https://placehold.co/80x80",
      protein: 10,
      calories: 100,
    },
    {
      id: 3,
      name: "퀴노아",
      price: 8900,
      image: "https://placehold.co/80x80",
      protein: 8,
      calories: 120,
    },
  ]

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    setMessages([...messages, { role: "user", content: inputValue }])

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "근육 증가를 위해서는 단백질 섭취가 중요합니다. 하루에 체중 1kg당 1.6-2.2g의 단백질을 섭취하는 것이 좋습니다. 닭가슴살, 계란, 그릭 요거트, 연어 등이 좋은 단백질 공급원입니다. 식단 계획을 도와드릴까요?",
        },
      ])
    }, 1000)

    setInputValue("")
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">AI 식단 코치</h1>
          <p className="text-gray-500">개인 맞춤형 식단 계획과 영양 조언을 받아보세요</p>
        </div>

        <Tabs defaultValue="chat">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="chat">채팅</TabsTrigger>
            <TabsTrigger value="meal-plans">식단 계획</TabsTrigger>
            <TabsTrigger value="recommendations">추천 상품</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>AI 식단 코치와 대화하기</CardTitle>
                  <CardDescription>영양 관련 질문이나 식단 계획에 대해 물어보세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 h-[400px] overflow-y-auto p-4 bg-gray-50 rounded-lg">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                          <Avatar className={message.role === "user" ? "bg-blue-100" : "bg-green-100"}>
                            {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </Avatar>
                          <div
                            className={`rounded-lg p-3 ${
                              message.role === "user" ? "bg-blue-600 text-white" : "bg-white border"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      placeholder="메시지를 입력하세요..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button type="submit" size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">전송</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>추천 질문</CardTitle>
                  <CardDescription>AI 코치에게 물어볼 수 있는 질문들</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "근육 증가를 위한 최적의 단백질 섭취량은?",
                    "체중 감량을 위한 식단 계획을 추천해주세요",
                    "운동 전후 식사는 어떻게 해야 할까요?",
                    "지중해식 식단의 장점은 무엇인가요?",
                    "식단에서 탄수화물의 역할은?",
                  ].map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => {
                        setInputValue(question)
                      }}
                    >
                      {question}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="meal-plans" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {mealPlans.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{plan.title}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </div>
                      <Badge className="bg-green-600">{plan.totalCalories} kcal</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {plan.meals.map((meal, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                              {meal.time === "아침" ? (
                                <Calendar className="h-4 w-4 text-green-600" />
                              ) : meal.time === "저녁" ? (
                                <Clock className="h-4 w-4 text-green-600" />
                              ) : (
                                <Plus className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{meal.name}</p>
                              <p className="text-sm text-gray-500">{meal.time}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{meal.calories} kcal</p>
                            <p className="text-sm text-gray-500">단백질 {meal.protein}g</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="font-medium">총 칼로리</span>
                        <span className="font-bold">{plan.totalCalories} kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">총 단백질</span>
                        <span className="font-bold">{plan.totalProtein}g</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">상세 보기</Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      식재료 구매
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>맞춤형 식단 계획 생성</CardTitle>
                  <CardDescription>AI 코치가 당신의 목표와 선호도에 맞는 식단을 생성합니다</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-green-100 p-6 mb-4">
                    <Bot className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">새로운 식단 계획 만들기</h3>
                  <p className="text-gray-500 mb-6 max-w-md">
                    AI 코치와 대화하며 당신의 목표, 선호도, 식이 제한 사항을 고려한 맞춤형 식단 계획을 받아보세요.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">식단 계획 생성하기</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI 추천 상품</CardTitle>
                <CardDescription>당신의 목표와 식단에 맞는 추천 상품</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">단백질 섭취를 위한 추천 상품</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      {recommendedProducts.map((product) => (
                        <div key={product.id} className="flex gap-4 items-center border rounded-lg p-3">
                          <img
                            src={product.image || "https://placehold.co/80x80"}
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
                                장바구니
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">식단 계획에 필요한 모든 식재료</h3>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">근육 증가 식단 패키지</CardTitle>
                        <CardDescription>3일 식단에 필요한 모든 식재료를 한 번에 구매하세요</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                            <span>닭가슴살 600g</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                            <span>연어 필렛 400g</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                            <span>퀴노아 500g</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                            <span>그릭 요거트 500g</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                            <span>아보카도 3개</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                            <span>견과류 믹스 200g</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div>
                          <span className="text-sm text-gray-500">총 금액</span>
                          <p className="font-bold">45,900원</p>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700">패키지 구매하기</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
