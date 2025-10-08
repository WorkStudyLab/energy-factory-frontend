import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info, Clock } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductItemProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
}

export function ProductItem({ product, onAddToCart }: ProductItemProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    if (onAddToCart && product.stock > 0) {
      onAddToCart(product.id);
    }
  };

  const handleCardClick = () => {
    // 새 탭에서 상품 상세 페이지 열기
    window.open(`/products/${product.id}`, '_blank');
  };

  // 목적별 추천 배지 결정 함수
  const getRecommendationBadge = (category: string, productName: string) => {
    const categoryLower = category.toLowerCase();
    const nameLower = productName.toLowerCase();
    
    // 임시 로직 - 실제로는 서버에서 추천 데이터 가져와야 함
    if (categoryLower === '고기' || categoryLower === '생선' || nameLower.includes('달걀')) {
      return { text: '고단백', color: 'bg-blue-600' };
    } else if (categoryLower === '채소' || nameLower.includes('브로콜리') || nameLower.includes('상추')) {
      return { text: '다이어트', color: 'bg-green-600' };
    } else if (categoryLower === '과일') {
      return { text: '건강관리', color: 'bg-purple-600' };
    }
    
    return null; // 추천 배지 없음
  };

  const recommendationBadge = getRecommendationBadge(product.category, product.name);

  // 단위당 가격 계산 함수
  const getUnitPrice = (price: number, weight: number, category: string) => {
    // 카테고리별 최적 단위 결정
    let unit: number;
    let label: string;
    
    if (weight >= 1000) {
      unit = 100;
      label = '100g당';
    } else if (weight >= 100) {
      unit = 100;  
      label = '100g당';
    } else {
      unit = 10;
      label = '10g당';
    }
    
    const unitPrice = Math.round((price / weight) * unit);
    return { price: unitPrice, label };
  };

  const unitPriceInfo = getUnitPrice(product.price, product.weight, product.category);

  // 임시 영양팁 데이터 (실제로는 서버에서 가져와야 함)
  const mockNutritionTip = {
    tip: product.category === '고기' 
      ? '고단백 저지방으로 근육 발달에 도움을 줍니다. 조리 시 과도한 양념은 피하세요.'
      : product.category === '채소'
      ? '비타민과 식이섬유가 풍부하여 소화 건강에 좋습니다. 생으로 드시거나 살짝 데쳐서 드세요.'
      : '균형 잡힌 영양소 공급으로 건강한 식단 구성에 도움됩니다.',
    mealTimes: product.category === '고기' 
      ? ['점심', '저녁', '운동 후']
      : product.category === '채소'
      ? ['모든 식사', '간식']
      : ['아침', '점심', '저녁']
  };

  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow flex flex-col" onClick={handleCardClick}>
      <CardContent className="p-0 relative">
        <img
          src={product.imageUrl || "https://placehold.co/300x200"}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/300x200";
          }}
        />
        
        {/* 품절일 때만 이미지 위에 표시 */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">
              품절
            </div>
          </div>
        )}
      </CardContent>
      
      <CardHeader className="p-4 pb-2 flex-1">
        {/* 제품명과 영양팁 */}
        <div className="flex items-start gap-2 mb-3">
          <CardTitle className="text-lg line-clamp-2 flex-1">{product.name}</CardTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 flex-shrink-0 mt-1 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation(); // 카드 클릭 이벤트 방지
                }}
              >
                <Info className="h-3 w-3 text-gray-400 hover:text-gray-600" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-900">영양 팁</h4>
                  <p className="text-sm text-gray-600">{mockNutritionTip.tip}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <h4 className="font-medium text-sm mb-2 text-gray-900">최적 섭취 시간</h4>
                  <div className="flex flex-wrap gap-1">
                    {mockNutritionTip.mealTimes.map((time, index) => (
                      <div key={index} className="flex items-center text-xs bg-gray-100 rounded px-2 py-1">
                        <Clock className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-gray-700">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* 목적별 추천 배지 */}
        {recommendationBadge && (
          <div className="mb-3">
            <Badge className={`${recommendationBadge.color} text-white text-xs font-medium`}>
              {recommendationBadge.text}
            </Badge>
          </div>
        )}
      </CardHeader>

      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-green-600">
            {product.price.toLocaleString()}원
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{product.weight}{product.weightUnit}</span>
            <span>•</span>
            <span className="font-medium text-gray-700">
              {unitPriceInfo.label} {unitPriceInfo.price.toLocaleString()}원
            </span>
          </div>
        </div>
        
        <Button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="bg-green-600 hover:bg-green-700"
        >
          {product.stock > 0 ? "장바구니" : "품절"}
        </Button>
      </CardFooter>
    </Card>
  );
}
