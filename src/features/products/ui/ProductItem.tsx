import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={handleCardClick}>
      <CardContent className="p-0">
        <img
          // @todo server - 실제 URL 추가 필요
          //   src={product.imageUrl || "https://placehold.co/300x200"}
          src={"https://placehold.co/300x200"}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/300x200";
          }}
        />
      </CardContent>
      <CardHeader className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {product.tags?.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>브랜드:</span>
            <span>{product.brand}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>무게:</span>
            <span>
              {product.weight}
              {product.weightUnit}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>재고:</span>
            <span
              className={product.stock > 0 ? "text-green-600" : "text-red-600"}
            >
              {product.stock > 0 ? `${product.stock}개` : "품절"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>상태:</span>
            <Badge
              variant={product.status === "AVAILABLE" ? "default" : "secondary"}
              className="text-xs"
            >
              {product.status}
            </Badge>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4">
          <span className="text-xl font-bold text-green-600">
            {product.price.toLocaleString()}원
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="bg-green-600 hover:bg-green-700"
          >
            {product.stock > 0 ? "장바구니" : "품절"}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
