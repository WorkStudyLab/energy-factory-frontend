import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  const handleCardClick = () => {
    // 새 탭에서 상품 상세 페이지 열기
    window.open(`/products/${product.id}`, '_blank');
  };

  // 단위당 가격 계산 함수
  const getUnitPrice = (price: number, weight: number) => {
    // 최적 단위 결정
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

  const unitPriceInfo = getUnitPrice(product.price, product.weight);

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

        {/* 할인 배지 */}
        {product.discount != null && product.discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white text-sm px-2.5 py-1">
            -{product.discount}%
          </Badge>
        )}

        {/* 품절일 때만 이미지 위에 표시 */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">
              품절
            </div>
          </div>
        )}
      </CardContent>
      
      <CardHeader className="p-4 pb-3 flex-1">
        {/* 태그 배지 */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs font-medium px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* 제품명 */}
        <CardTitle className="text-base font-semibold line-clamp-2 mb-1.5 leading-tight">
          {product.name}
        </CardTitle>

        {/* 별점 및 리뷰 수 */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3.5 w-3.5 ${
                  star <= Math.round(product.averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-gray-700">
            {product.averageRating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">
            ({product.reviewCount})
          </span>
        </div>

        {/* 가격 정보 */}
        <div className="space-y-1">
          {/* 원가 및 할인율 */}
          {product.originalPrice != null &&
           product.originalPrice > 0 &&
           product.discount != null &&
           product.discount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice.toLocaleString()}원
              </span>
              <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
                {product.discount}%
              </Badge>
            </div>
          )}
          {/* 현재 가격 */}
          <div className="text-2xl font-bold text-green-600">
            {product.price.toLocaleString()}원
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>{product.weight}{product.weightUnit}</span>
            <span>•</span>
            <span className="text-gray-600">
              {unitPriceInfo.label} {unitPriceInfo.price.toLocaleString()}원
            </span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
