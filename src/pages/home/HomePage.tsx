import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Target,
  Star,
  Plus,
  Eye,
  BarChart3,
  Zap,
  Heart,
  Apple,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  const navigate = useNavigate();

  // Navigation helper function
  const handleNavigate = (page: string) => {
    switch (page) {
      case "nutrition":
        navigate(ROUTES.NUTRITION);
        break;
      case "diet-coach":
        navigate(ROUTES.DIET_COACH);
        break;
      case "products":
        navigate(ROUTES.PRODUCTS);
        break;
      case "profile":
      case "mypage":
        navigate(ROUTES.MY_PAGE);
        break;
      case "order-history":
        navigate(ROUTES.ORDER_HISTORY);
        break;
      default:
        navigate("/");
    }
  };

  // Mock user data
  const userData = {
    name: "김건강",
    goal: "근육 증가",
    dailyCalories: 2450,
    currentCalories: 1850,
    dailyProtein: 184,
    currentProtein: 142,
    streak: 7, // 연속 목표 달성 일수
  };

  // 오늘의 영양 목표 달성률
  const nutritionProgress = {
    calories: Math.round((userData.currentCalories / userData.dailyCalories) * 100),
    protein: Math.round((userData.currentProtein / userData.dailyProtein) * 100),
  };

  // 빠른 액션 버튼들
  const quickActions = [
    {
      id: "nutrition",
      title: "영양 계산기",
      description: "오늘의 영양소 계산",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "bg-blue-500",
      page: "nutrition",
    },
    {
      id: "ai-coach",
      title: "AI 식단 코치",
      description: "맞춤 식단 상담",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-green-500",
      page: "diet-coach",
    },
    {
      id: "products",
      title: "상품 둘러보기",
      description: "영양 중심 쇼핑",
      icon: <ShoppingBag className="h-6 w-6" />,
      color: "bg-purple-500",
      page: "products",
    },
    {
      id: "profile",
      title: "내 프로필",
      description: "목표 및 설정 관리",
      icon: <Target className="h-6 w-6" />,
      color: "bg-orange-500",
      page: "mypage",
    },
  ];

  // 개인화된 추천 상품 (목표 기반)
  const recommendedProducts = [
    {
      id: 1,
      name: "프리미엄 단백질 파우더",
      price: 45000,
      originalPrice: 52000,
      image: "https://placehold.co/200x200?text=단백질파우더",
      protein: 24,
      calories: 120,
      rating: 4.8,
      reviews: 1247,
      tags: ["고단백", "근육증가", "BEST"],
      discount: 13,
      reason: "근육 증가 목표에 최적화",
    },
    {
      id: 2,
      name: "유기농 닭가슴살 10팩",
      price: 25900,
      image: "https://placehold.co/200x200?text=닭가슴살",
      protein: 26,
      calories: 110,
      rating: 4.6,
      reviews: 892,
      tags: ["고단백", "저지방", "유기농"],
      reason: "고품질 단백질 공급원",
    },
    {
      id: 3,
      name: "크레아틴 모노하이드레이트",
      price: 28000,
      image: "https://placehold.co/200x200?text=크레아틴",
      protein: 0,
      calories: 0,
      rating: 4.7,
      reviews: 634,
      tags: ["근력향상", "회복", "운동보조"],
      reason: "운동 성능 향상에 도움",
    },
    {
      id: 4,
      name: "그릭 요거트",
      price: 4500,
      image: "https://placehold.co/200x200?text=그릭요거트",
      protein: 10,
      calories: 100,
      rating: 4.5,
      reviews: 423,
      tags: ["고단백", "프로바이오틱스"],
      reason: "간편한 단백질 보충",
    },
  ];

  // 최근 본 상품
  const recentlyViewed = [
    {
      id: 5,
      name: "퀴노아",
      price: 8900,
      image: "https://placehold.co/150x150?text=퀴노아",
      viewedAt: "2시간 전",
    },
    {
      id: 6,
      name: "아보카도 오일",
      price: 15000,
      image: "https://placehold.co/150x150?text=아보카도오일",
      viewedAt: "어제",
    },
    {
      id: 7,
      name: "견과류 믹스",
      price: 9900,
      image: "https://placehold.co/150x150?text=견과류",
      viewedAt: "3일 전",
    },
  ];

  // 인기 카테고리
  const popularCategories = [
    {
      id: "protein",
      name: "고단백 식품",
      icon: <Target className="h-8 w-8" />,
      count: "120+ 상품",
      color: "bg-green-100 text-green-700",
      description: "근육 성장과 회복",
    },
    {
      id: "healthy-fats",
      name: "건강한 지방",
      icon: <Heart className="h-8 w-8" />,
      count: "85+ 상품",
      color: "bg-red-100 text-red-700",
      description: "심혈관 건강",
    },
    {
      id: "vitamins",
      name: "비타민 & 미네랄",
      icon: <Apple className="h-8 w-8" />,
      count: "200+ 상품",
      color: "bg-orange-100 text-orange-700",
      description: "면역력 강화",
    },
    {
      id: "energy",
      name: "에너지 부스터",
      icon: <Zap className="h-8 w-8" />,
      count: "60+ 상품",
      color: "bg-yellow-100 text-yellow-700",
      description: "운동 전 에너지",
    },
  ];

  // 오늘의 영양 팁
  const todaysTip = {
    title: "운동 후 골든타임을 놓치지 마세요!",
    content:
      "운동 후 30분 이내에 단백질을 섭취하면 근육 회복과 성장에 가장 효과적입니다. 프로틴 파우더나 그릭 요거트를 추천합니다.",
    products: [1, 4], // 관련 상품 ID
  };

  // 최근 주문
  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: ["프리미엄 단백질 파우더", "닭가슴살 10팩"],
      total: 70900,
      status: "배송완료",
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      items: ["그릭 요거트", "견과류 믹스", "퀴노아"],
      total: 23300,
      status: "배송완료",
    },
  ];

  // 특별 할인/프로모션
  const promotions = [
    {
      id: 1,
      title: "신규 회원 특가",
      description: "첫 주문 시 20% 할인",
      discount: "20%",
      code: "WELCOME20",
      validUntil: "2024-01-31",
      color: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      id: 2,
      title: "단백질 특가전",
      description: "모든 단백질 제품 15% 할인",
      discount: "15%",
      code: "PROTEIN15",
      validUntil: "2024-01-25",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
  ];

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        {/* 개인화된 인사말 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">안녕하세요, {userData.name}님! 👋</h1>
            <p className="text-gray-600 mt-1">
              오늘도 <span className="font-medium text-green-600">{userData.goal}</span> 목표를 향해 함께 달려봐요
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              <Calendar className="h-4 w-4" />
              <span>{userData.streak}일 연속 달성</span>
            </div>
          </div>
        </div>

        {/* 오늘의 영양 목표 진행률 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">오늘의 영양 목표</CardTitle>
              <Button variant="outline" size="sm" onClick={() => handleNavigate("nutrition")}>
                상세 보기
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">칼로리</span>
                  <span className="text-sm text-gray-500">
                    {userData.currentCalories} / {userData.dailyCalories} kcal
                  </span>
                </div>
                <Progress value={nutritionProgress.calories} className="h-2" />
                <p className="text-xs text-gray-500">
                  {nutritionProgress.calories >= 100
                    ? "목표 달성! 🎉"
                    : `${100 - nutritionProgress.calories}% 더 필요해요`}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">단백질</span>
                  <span className="text-sm text-gray-500">
                    {userData.currentProtein} / {userData.dailyProtein} g
                  </span>
                </div>
                <Progress value={nutritionProgress.protein} className="h-2" />
                <p className="text-xs text-gray-500">
                  {nutritionProgress.protein >= 100
                    ? "목표 달성! 🎉"
                    : `${Math.ceil(userData.dailyProtein - userData.currentProtein)}g 더 필요해요`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 빠른 액션 버튼들 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleNavigate(action.page)}
            >
              <CardContent className="p-4 text-center">
                <div
                  className={`${action.color} text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3`}
                >
                  {action.icon}
                </div>
                <h3 className="font-medium text-sm mb-1">{action.title}</h3>
                <p className="text-xs text-gray-500">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 특별 할인/프로모션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promotions.map((promo) => (
            <Card key={promo.id} className="overflow-hidden">
              <div className={`${promo.color} text-white p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{promo.title}</h3>
                    <p className="text-sm opacity-90">{promo.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{promo.discount}</div>
                    <div className="text-xs opacity-90">할인</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs font-mono">{promo.code}</div>
                  <div className="text-xs opacity-90">{promo.validUntil}까지</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 메인 콘텐츠 탭 */}
        <Tabs defaultValue="recommended" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recommended">맞춤 추천</TabsTrigger>
            <TabsTrigger value="categories">인기 카테고리</TabsTrigger>
            <TabsTrigger value="recent">최근 본 상품</TabsTrigger>
            <TabsTrigger value="orders">주문 내역</TabsTrigger>
          </TabsList>

          {/* 맞춤 추천 상품 */}
          <TabsContent value="recommended" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">당신을 위한 맞춤 추천</h2>
                <p className="text-gray-500 text-sm">{userData.goal} 목표에 최적화된 상품들</p>
              </div>
              <Button variant="outline" onClick={() => handleNavigate("products")}>
                전체 보기 <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discount}%
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1">
                      {product.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm line-clamp-2 h-10">{product.name}</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                    <p className="text-xs text-green-600 font-medium">{product.reason}</p>
                  </CardHeader>
                  <CardFooter className="p-3 pt-0 flex justify-between items-center">
                    <div>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()}원
                        </span>
                      )}
                      <div className="font-bold">{product.price.toLocaleString()}원</div>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 인기 카테고리 */}
          <TabsContent value="categories" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">인기 카테고리</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularCategories.map((category) => (
                <Card
                  key={category.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleNavigate("products")}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`${category.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-bold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{category.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 최근 본 상품 */}
          <TabsContent value="recent" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">최근 본 상품</h2>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                전체 보기
              </Button>
            </div>
            {recentlyViewed.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recentlyViewed.map((product) => (
                  <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{product.viewedAt}</p>
                          <div className="font-bold text-sm mt-1">{product.price.toLocaleString()}원</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>최근 본 상품이 없습니다</p>
              </div>
            )}
          </TabsContent>

          {/* 주문 내역 */}
          <TabsContent value="orders" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">최근 주문</h2>
              <Button variant="outline" size="sm" onClick={() => handleNavigate("order-history")}>
                전체 보기
              </Button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{order.id}</span>
                          <Badge variant={order.status === "배송완료" ? "default" : "secondary"} className="text-xs">
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{order.items.join(", ")}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{order.total.toLocaleString()}원</div>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          재주문
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* 오늘의 영양 팁 */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-green-500 text-white rounded-full p-2">
                <Apple className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">오늘의 영양 팁</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium mb-2">{todaysTip.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{todaysTip.content}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleNavigate("diet-coach")}
              >
                AI 코치에게 더 물어보기
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleNavigate("products")}>
                관련 상품 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}