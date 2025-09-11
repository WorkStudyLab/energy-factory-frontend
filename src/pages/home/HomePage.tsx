import { useState } from "react"
import { ArrowRight, Leaf, ShoppingBag, ChevronRight, Target, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [fitnessGoal, setFitnessGoal] = useState("")

  // 목표별 추천 제품
  const recommendedProducts = {
    "muscle-gain": [
      {
        id: 1,
        name: "프리미엄 단백질 파우더",
        price: 45000,
        image: "/placeholder.svg?height=200&width=300&text=단백질파우더",
        protein: 24,
        calories: 120,
        tags: ["고단백", "저지방"],
      },
      {
        id: 2,
        name: "유기농 닭가슴살 10팩",
        price: 25900,
        image: "/placeholder.svg?height=200&width=300&text=닭가슴살",
        protein: 26,
        calories: 110,
        tags: ["고단백", "저지방"],
      },
      {
        id: 3,
        name: "크레아틴 모노하이드레이트",
        price: 28000,
        image: "/placeholder.svg?height=200&width=300&text=크레아틴",
        protein: 0,
        calories: 0,
        tags: ["근력 향상", "회복"],
      },
    ],
    "weight-loss": [
      {
        id: 4,
        name: "저칼로리 식사 대체 쉐이크",
        price: 32000,
        image: "/placeholder.svg?height=200&width=300&text=쉐이크",
        protein: 15,
        calories: 180,
        tags: ["저칼로리", "포만감"],
      },
      {
        id: 5,
        name: "그린 슈퍼푸드 블렌드",
        price: 35000,
        image: "/placeholder.svg?height=200&width=300&text=슈퍼푸드",
        protein: 5,
        calories: 70,
        tags: ["디톡스", "항산화"],
      },
      {
        id: 6,
        name: "MCT 오일",
        price: 22000,
        image: "/placeholder.svg?height=200&width=300&text=MCT오일",
        protein: 0,
        calories: 120,
        tags: ["케토", "에너지"],
      },
    ],
    health: [
      {
        id: 7,
        name: "종합 비타민 미네랄",
        price: 29000,
        image: "/placeholder.svg?height=200&width=300&text=비타민",
        protein: 0,
        calories: 0,
        tags: ["면역", "영양소"],
      },
      {
        id: 8,
        name: "오메가3 어유",
        price: 25000,
        image: "/placeholder.svg?height=200&width=300&text=오메가3",
        protein: 0,
        calories: 0,
        tags: ["심혈관", "두뇌"],
      },
      {
        id: 9,
        name: "프로바이오틱스",
        price: 32000,
        image: "/placeholder.svg?height=200&width=300&text=프로바이오틱스",
        protein: 0,
        calories: 0,
        tags: ["장건강", "면역"],
      },
    ],
  }

  // 인기 제품
  const popularProducts = [
    {
      id: 1,
      name: "유기농 닭가슴살",
      price: 12900,
      image: "/placeholder.svg?height=200&width=300&text=닭가슴살",
      protein: 24,
      calories: 110,
      tags: ["고단백", "저지방"],
    },
    {
      id: 2,
      name: "그릭 요거트",
      price: 4500,
      image: "/placeholder.svg?height=200&width=300&text=요거트",
      protein: 10,
      calories: 100,
      tags: ["고단백", "칼슘"],
    },
    {
      id: 3,
      name: "퀴노아",
      price: 8900,
      image: "/placeholder.svg?height=200&width=300&text=퀴노아",
      protein: 8,
      calories: 120,
      tags: ["식물성단백질", "복합탄수화물"],
    },
    {
      id: 4,
      name: "아보카도 오일",
      price: 15000,
      image: "/placeholder.svg?height=200&width=300&text=아보카도오일",
      protein: 0,
      calories: 120,
      tags: ["건강한지방", "항산화"],
    },
    {
      id: 5,
      name: "프로틴 바",
      price: 25000,
      image: "/placeholder.svg?height=200&width=300&text=프로틴바",
      protein: 20,
      calories: 200,
      tags: ["고단백", "간편식"],
    },
  ]

  // 성공 사례
  const successStories = [
    {
      id: 1,
      name: "김건강",
      goal: "근육 증가",
      image: "/placeholder.svg?height=100&width=100&text=김건강",
      story:
        "Energy Factory의 고단백 식단과 AI 코치 덕분에 3개월 만에 근육량 5kg 증가에 성공했습니다. 맞춤형 영양 계획이 정말 효과적이었어요!",
      products: ["프리미엄 단백질 파우더", "닭가슴살", "크레아틴"],
    },
    {
      id: 2,
      name: "이슬림",
      goal: "체중 감량",
      image: "/placeholder.svg?height=100&width=100&text=이슬림",
      story:
        "6개월 동안 Energy Factory의 저칼로리 고단백 식단을 따르며 15kg 감량에 성공했습니다. AI 코치의 실시간 피드백이 큰 도움이 되었어요.",
      products: ["식사 대체 쉐이크", "그린 슈퍼푸드", "프로틴 바"],
    },
    {
      id: 3,
      name: "박활력",
      goal: "건강 개선",
      image: "/placeholder.svg?height=100&width=100&text=박활력",
      story:
        "만성 피로와 소화 문제로 고생했는데, Energy Factory의 균형 잡힌 식단과 영양제 추천으로 건강이 크게 개선되었습니다. 활력이 넘치는 일상을 되찾았어요!",
      products: ["종합 비타민", "오메가3", "프로바이오틱스"],
    },
  ]

  // AI 코치 샘플 대화
  const aiCoachSamples = [
    {
      question: "근육 증가를 위한 단백질 섭취량은 얼마나 되나요?",
      answer:
        "체중 1kg당 1.6-2.2g의 단백질 섭취를 권장합니다. 70kg 성인의 경우 하루 112-154g 정도가 적절합니다. 닭가슴살, 계란, 그릭 요거트 등이 좋은 단백질 공급원입니다.",
    },
    {
      question: "운동 전후 식사는 어떻게 해야 할까요?",
      answer:
        "운동 전에는 탄수화물과 약간의 단백질이 포함된 식사를 1-2시간 전에 하는 것이 좋습니다. 운동 후에는 30분 이내에 단백질과 탄수화물을 함께 섭취하여 회복을 촉진하세요.",
    },
    {
      question: "체중 감량을 위한 식단 팁이 있을까요?",
      answer:
        "칼로리 적자를 만들되 단백질 섭취는 유지하세요. 섬유질이 풍부한 채소와 과일, 단백질 위주의 식단으로 포만감을 유지하면서 체중 감량이 가능합니다.",
    },
  ]

  return (
    <div className="flex flex-col gap-8 py-8">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                당신의 운동 목표에 맞는 식단, Energy Factory와 함께
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                운동 목표에 맞는 영양소 계산과 식단 계획을 바탕으로 식재료를 구매할 수 있는 통합 쇼핑 플랫폼입니다.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  // onClick={() => onNavigate && onNavigate("register")}
                >
                  시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" // onClick={() => onNavigate && onNavigate("products")}
                >
                  상품 둘러보기
                </Button>
              </div>
            </div>
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="건강한 식단"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      {/* 개인화된 목표 기반 추천 섹션 */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">맞춤형 추천</div>
              <h2 className="text-3xl font-bold tracking-tighter">내 목표에 맞는 제품 찾기</h2>
              <p className="max-w-[700px] text-gray-500">
                운동 목표를 선택하면 그에 맞는 최적의 제품을 추천해 드립니다.
              </p>
            </div>
            <div className="w-full max-w-md">
              <Select value={fitnessGoal} onValueChange={setFitnessGoal}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="운동 목표를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="muscle-gain">근육 증가</SelectItem>
                  <SelectItem value="weight-loss">체중 감량</SelectItem>
                  <SelectItem value="health">전반적인 건강 개선</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {fitnessGoal && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-center">
                {fitnessGoal === "muscle-gain"
                  ? "근육 증가"
                  : fitnessGoal === "weight-loss"
                    ? "체중 감량"
                    : "건강 개선"}
                을 위한 추천 제품
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedProducts[fitnessGoal as keyof typeof recommendedProducts].map((product: any) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    </CardContent>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {product.tags.map((tag: any, index: any) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>
                        {product.protein > 0 && `단백질: ${product.protein}g · `}
                        {product.calories > 0 && `칼로리: ${product.calories}kcal`}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="font-bold">{product.price.toLocaleString()}원</span>
                      <Button variant="outline" size="sm" // onClick={() => onNavigate && onNavigate("cart")}
                      >
                        장바구니
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  className="flex items-center"
                  // onClick={() => onNavigate && onNavigate("products")}
                >
                  더 많은 제품 보기
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">주요 기능</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Energy Factory의 특별한 기능</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                운동 목표 달성을 위한 맞춤형 식단 계획과 영양소 계산, 그리고 쉽고 편리한 쇼핑까지
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="mt-4">목표 기반 영양 계산</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  근육 증가, 체중 감량 등 개인 목표에 맞는 영양소 섭취량을 자동으로 계산해 드립니다.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" // onClick={() => onNavigate && onNavigate("nutrition")}
                >
                  영양 계산기 사용하기
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Brain className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="mt-4">AI 식단 코치</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  LLM 기반 AI가 개인 맞춤형 식단을 제안하고 영양 관련 질문에 답변해 드립니다.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" // onClick={() => onNavigate && onNavigate("diet-coach")}
                >
                  AI 코치와 대화하기
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="mt-4">영양소 중심 카테고리</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  고단백, 건강한 지방, 복합 탄수화물 등 영양소 기반으로 상품을 쉽게 찾을 수 있습니다.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" // onClick={() => onNavigate && onNavigate("products")}
                >
                  카테고리 둘러보기
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <ShoppingBag className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="mt-4">스마트 장바구니</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  장바구니에 담긴 상품의 총 영양소를 계산하고 목표 달성을 위한 추천 상품을 제안합니다.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" // onClick={() => onNavigate && onNavigate("cart")}
                >
                  장바구니 체험하기
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* AI 코치 샘플 섹션 */}
      <section className="w-full py-12 md:py-24 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">AI 코치</div>
              <h2 className="text-3xl font-bold tracking-tighter">AI 식단 코치와의 대화</h2>
              <p className="max-w-[700px] text-gray-500">
                Energy Factory의 AI 코치는 영양과 운동에 관한 모든 질문에 전문적인 답변을 제공합니다.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {aiCoachSamples.map((sample: any, index: any) => (
              <Card key={index} className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Q: {sample.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{sample.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button className="bg-green-600 hover:bg-green-700" // onClick={() => onNavigate && onNavigate("diet-coach")}
            >
              AI 코치와 상담하기
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 인기 상품 섹션 */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">베스트셀러</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">인기 상품</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Energy Factory 회원들이 가장 많이 구매한 건강한 식재료
              </p>
            </div>
          </div>
          <Carousel className="w-full max-w-5xl mx-auto mt-8">
            <CarouselContent>
              {popularProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    </CardContent>
                    <CardHeader className="p-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {product.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>
                        {product.protein > 0 && `단백질: ${product.protein}g · `}
                        {product.calories > 0 && `칼로리: ${product.calories}kcal`}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <span className="font-bold">{product.price.toLocaleString()}원</span>
                      <Button variant="outline" size="sm" // onClick={() => onNavigate && onNavigate("cart")}
                      >
                        장바구니
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              className="flex items-center"
              // onClick={() => onNavigate && onNavigate("products")}
            >
              모든 상품 보기
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 성공 사례 섹션 */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">성공 사례</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">고객 성공 스토리</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Energy Factory와 함께 목표를 달성한 실제 고객들의 이야기
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            {successStories.map((story) => (
              <Card key={story.id} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      className="rounded-full h-16 w-16 object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{story.name}</CardTitle>
                      <Badge className="mt-1 bg-green-600">{story.goal}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{story.story}</p>
                  <div>
                    <p className="text-sm font-medium text-gray-500">주로 사용한 제품:</p>
                    <ul className="text-sm text-gray-600 mt-1">
                      {story.products.map((product, index) => (
                        <li key={index} className="flex items-center">
                          <ChevronRight className="h-3 w-3 text-green-600 mr-1" />
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">지금 바로 시작하세요</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Energy Factory와 함께 건강한 식단 관리와 쇼핑을 한 번에 해결하세요.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button
                className="bg-white text-green-600 hover:bg-gray-100"
                // onClick={() => onNavigate && onNavigate("register")}
              >
                무료 회원가입
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-green-700"
                // onClick={() => onNavigate && onNavigate("products")}
              >
                상품 둘러보기
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-green-700"
                // onClick={() => onNavigate && onNavigate("diet-coach")}
              >
                AI 코치와 상담하기
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
