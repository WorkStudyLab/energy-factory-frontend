import { ProductItem } from "./ProductItem";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
  onResetFilters?: () => void;
  observerTarget?: React.RefObject<HTMLDivElement | null>;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export function ProductList({
  products,
  onResetFilters,
  observerTarget,
  isLoading,
  isFetchingNextPage,
  error,
  onRetry,
}: ProductListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-2 text-gray-500">상품을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <p className="mt-2 text-red-500">상품을 불러오는데 실패했습니다.</p>
        <p className="text-gray-500 text-sm mt-1">
          {error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다."}
        </p>
        {onRetry && (
          <Button onClick={onRetry} className="mt-4">
            다시 시도
          </Button>
        )}
      </div>
    );
  }

  if (products.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg font-medium">검색 결과가 없습니다</p>
        <p className="text-gray-500 mt-1">다른 검색어나 필터를 사용해보세요.</p>
        {onResetFilters && (
          <Button onClick={onResetFilters} variant="outline" className="mt-4">
            필터 초기화
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      {/* IntersectionObserver 타겟 */}
      {observerTarget && <div ref={observerTarget} className="h-10" />}

      {/* 로딩 인디케이터 */}
      {(isLoading || isFetchingNextPage) && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      )}
    </div>
  );
}
