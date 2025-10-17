import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  ChevronLeft,
  TrendingUp,
  Clock,
  Zap,
  Truck,
  Shield,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { ROUTES } from "@/constants/routes";
import { useProductDetail } from "@/features/products/hooks/useProductDetail";
import type {
  ProductVariant,
  ProductDetail,
  VitaminMineral,
} from "@/types/product";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProductDetail(id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("500g");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 페이지 타이틀 설정
  useEffect(() => {
    if (product) {
      document.title = `${product.name}`;
    }
  }, [product]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">상품 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !product) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 mb-4">상품 정보를 불러올 수 없습니다.</p>
            <Button onClick={() => navigate(ROUTES.PRODUCTS)}>
              상품 목록으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 선택된 옵션의 가격
  const selectedVariantData = product.variants.find((v: ProductVariant) => v.name === selectedVariant);
  const currentPrice = selectedVariantData?.price || product.price;

  // 영양소 최대값 (프로그레스 바용)
  const maxNutrients = {
    protein: 30,
    carbs: 50,
    fat: 20,
    calories: 300,
  };

  // 수량 조절
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // 장바구니 추가
  const handleAddToCart = () => {
    console.log("장바구니 추가:", { 
      product: product.name, 
      quantity, 
      variant: selectedVariant 
    });
    // TODO: 실제 장바구니 추가 로직 구현
  };

  // 바로 구매
  const handleBuyNow = () => {
    handleAddToCart();
    navigate(ROUTES.CART);
  };

  // 위시리스트 토글
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // 공유하기
  const handleShare = () => {
    const shareUrl = window.location.href;
    const shareText = `${product.name} - Energy Factory`;
    
    if (navigator.share) {
      navigator.share({
        title: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사되었습니다!");
    }
  };

  // 목표 이름 매핑
  const goalNames: Record<string, string> = {
    "muscle-gain": "근육 증가",
    "weight-loss": "체중 감량",
    energy: "에너지 향상",
    recovery: "회복 촉진",
    health: "전반적 건강",
  };

  return (
    <div className="container py-6">
      {/* 뒤로 가기 버튼 */}
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate(ROUTES.PRODUCTS)}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        상품 목록으로
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 왼쪽: 이미지 갤러리 */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount && product.discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white text-lg px-3 py-1">
                -{product.discount}%
              </Badge>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/90 hover:bg-white"
                onClick={toggleWishlist}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full bg-white/90 hover:bg-white"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition ${
                  selectedImageIndex === index ? "ring-2 ring-green-600" : ""
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 상품 정보 */}
        <div className="space-y-6">
          {/* 브랜드 & 이름 */}
          <div>
            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviewCount.toLocaleString()})</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-gray-500">{product.soldCount.toLocaleString()}개 판매</span>
            </div>
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className={tag === "BEST" ? "bg-green-100 text-green-700" : ""}>
                {tag}
              </Badge>
            ))}
          </div>

          {/* 가격 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{product.originalPrice.toLocaleString()}원</span>
              )}
              {product.discount && product.discount > 0 && (
                <Badge className="bg-red-500 text-white text-lg">{product.discount}%</Badge>
              )}
            </div>
            <div className="text-3xl font-bold">{currentPrice.toLocaleString()}원</div>
            <div className="text-sm text-gray-500 mt-1">총 {(currentPrice * quantity).toLocaleString()}원</div>
          </div>

          {/* 영양 하이라이트 */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-600" />
                영양 하이라이트
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">칼로리</div>
                  <div className="text-2xl font-bold text-purple-600">{product.nutrition.calories}kcal</div>
                  <div className="text-xs text-gray-500">100g당</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">단백질</div>
                  <div className="text-2xl font-bold text-green-600">{product.nutrition.protein}g</div>
                  <div className="text-xs text-gray-500">100g당</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">탄수화물</div>
                  <div className="text-2xl font-bold text-blue-600">{product.nutrition.carbs}g</div>
                  <div className="text-xs text-gray-500">100g당</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">지방</div>
                  <div className="text-2xl font-bold text-amber-600">{product.nutrition.fat}g</div>
                  <div className="text-xs text-gray-500">100g당</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white rounded-lg">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">
                    단백질 효율: {((product.nutrition.protein / product.nutrition.calories) * 100).toFixed(1)}g/100kcal
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 옵션 선택 */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">옵션</label>
              <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.map((variant) => (
                    <SelectItem key={variant.name} value={variant.name}>
                      {variant.name} - {variant.price.toLocaleString()}원
                      {variant.stock < 10 && <span className="text-red-500 ml-2">(재고 {variant.stock}개)</span>}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 수량 선택 */}
            <div>
              <label className="text-sm font-medium mb-2 block">수량</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={increaseQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-gray-500">(재고: {selectedVariantData?.stock || 0}개)</span>
              </div>
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-gray-600" />
              <span>
                배송비: {product.shipping.fee === 0 ? "무료" : `${product.shipping.fee.toLocaleString()}원`}
                {product.shipping.fee > 0 &&
                  ` (${product.shipping.freeShippingThreshold.toLocaleString()}원 이상 무료)`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <span>배송 예정: {product.shipping.estimatedDays}일 이내</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-600" />
              <span>100% 정품 보증 · 안전 거래</span>
            </div>
          </div>

          {/* 구매 버튼 */}
          <div className="flex gap-3">
            <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              장바구니
            </Button>
            <Button size="lg" className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleBuyNow}>
              바로 구매
            </Button>
          </div>
        </div>
      </div>

      {/* 영양 성분 정보 카드 */}
      <NutritionInfoCard product={product} goalNames={goalNames} />
    </div>
  );
}

// 영양 정보 카드 컴포넌트
function NutritionInfoCard({ product, goalNames }: NutritionInfoCardProps) {
  // 탄단지 데이터 준비 (칼로리 기준)
  const macroData = [
    { name: "단백질", value: product.nutrition.protein * 4, grams: product.nutrition.protein, color: "#22c55e" },
    { name: "탄수화물", value: product.nutrition.carbs * 4, grams: product.nutrition.carbs, color: "#3b82f6" },
    { name: "지방", value: product.nutrition.fat * 9, grams: product.nutrition.fat, color: "#f59e0b" },
  ];

  const totalCalories = macroData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="mt-12">
      <Card>
        <CardHeader>
          <CardTitle>영양 성분 정보</CardTitle>
          <CardDescription>100g 기준</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 주요 영양소 (원형 그래프) */}
            <div className="p-4">
              <h3 className="font-semibold mb-4">주요 영양소</h3>
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* 총 칼로리 표시 */}
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600">총 칼로리</div>
                  <div className="text-2xl font-bold text-purple-600">{product.nutrition.calories}kcal</div>
                </div>

                {/* 범례 */}
                <div className="w-full space-y-2">
                  {macroData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-bold">{item.grams}g</span>
                        <span className="text-gray-500 ml-1">
                          ({((item.value / totalCalories) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 상세 영양 정보 */}
            <div className="p-4">
              <h3 className="font-semibold mb-4">상세 영양 정보</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">포화지방</span>
                  <span className="text-sm font-medium">{product.nutrition.saturatedFat}g</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">트랜스지방</span>
                  <span className="text-sm font-medium">{product.nutrition.transFat}g</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">콜레스테롤</span>
                  <span className="text-sm font-medium">{product.nutrition.cholesterol}mg</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">나트륨</span>
                  <span className="text-sm font-medium">{product.nutrition.sodium}mg</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">식이섬유</span>
                  <span className="text-sm font-medium">{product.nutrition.fiber}g</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">당류</span>
                  <span className="text-sm font-medium">{product.nutrition.sugars}g</span>
                </div>
              </div>
            </div>

            {/* 비타민 & 미네랄 */}
            <div className="p-4">
              <h3 className="font-semibold mb-4">비타민 & 미네랄</h3>
              <div className="space-y-3">
                {product.vitaminsAndMinerals.map((item: VitaminMineral, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-gray-600">{item.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.daily} className="h-1.5 flex-1" />
                      <span className="text-xs text-gray-500 w-10 text-right">{item.daily}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">* 일일 권장 섭취량 대비 비율</p>
            </div>

            {/* 피트니스 목표별 척도 */}
            <div className="p-4">
              <h3 className="font-semibold mb-4">피트니스 목표별 척도</h3>
              <div className="space-y-3">
                {Object.entries(product.goalScores).map(([goal, score]: [string, number]) => (
                  <div key={goal} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{goalNames[goal]}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < Math.floor(score) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm font-bold">{score.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

