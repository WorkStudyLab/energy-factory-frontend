import { useProducts } from "@/features/products/hooks/useProducts";
import { useProductsStore } from "@/features/products/stores/useProductsStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle } from "lucide-react";

export default function ProductsTestPage() {
  const { filters, setKeyword, setCategory, setSort, setPage, resetFilters } =
    useProductsStore();

  const { data, isLoading, error, refetch } = useProducts();

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="mt-2 text-gray-500">상품을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <p className="mt-2 text-red-500">상품을 불러오는데 실패했습니다.</p>
          <p className="text-gray-500 text-sm mt-1">
            {error instanceof Error
              ? error.message
              : "알 수 없는 오류가 발생했습니다."}
          </p>
          <Button onClick={() => refetch()} className="mt-4">
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        {/* 헤더 */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">상품 목록 (API 테스트)</h1>
          <p className="text-gray-500">
            실제 API에서 상품 데이터를 불러옵니다.
          </p>
        </div>

        {/* 필터 컨트롤 */}
        <div className="bg-white border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">검색어</label>
              <Input
                placeholder="상품명 검색..."
                onChange={(e) => setKeyword(e.target.value)}
                value={filters.keyword || ""}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">카테고리</label>
              <Select
                value={filters.category || ""}
                onValueChange={setCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="고기">고기</SelectItem>
                  <SelectItem value="채소">채소</SelectItem>
                  <SelectItem value="과일">과일</SelectItem>
                  <SelectItem value="유제품">유제품</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">정렬</label>
              <Select
                value={filters.sort || "createdAt,desc"}
                onValueChange={setSort}
              >
                <SelectTrigger>
                  <SelectValue placeholder="정렬 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt,desc">최신순</SelectItem>
                  <SelectItem value="price,asc">가격 낮은순</SelectItem>
                  <SelectItem value="price,desc">가격 높은순</SelectItem>
                  <SelectItem value="name,asc">이름 순</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={resetFilters}
                variant="outline"
                className="w-full"
              >
                필터 초기화
              </Button>
            </div>
          </div>
        </div>

        {/* 필터 정보 표시 */}
        <div className="bg-gray-50 border rounded-lg p-4">
          <h3 className="font-medium mb-2">현재 필터 상태</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div>
              <span className="font-medium">페이지:</span>{" "}
              {(filters.page || 0) + 1}
            </div>
            <div>
              <span className="font-medium">페이지 크기:</span>{" "}
              {filters.size || 20}
            </div>
            <div>
              <span className="font-medium">정렬:</span>{" "}
              {filters.sort || "created_desc"}
            </div>
            <div>
              <span className="font-medium">카테고리:</span>{" "}
              {filters.category || "전체"}
            </div>
          </div>
          {filters.keyword && (
            <div className="mt-2">
              <span className="font-medium">검색어:</span> {filters.keyword}
            </div>
          )}
        </div>

        {/* 페이지네이션 정보 */}
        {data?.pageInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium mb-2">페이지 정보</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div>
                <span className="font-medium">현재 페이지:</span>{" "}
                {data.pageInfo.currentPage}
              </div>
              <div>
                <span className="font-medium">총 페이지:</span>{" "}
                {data.pageInfo.totalPages}
              </div>
              <div>
                <span className="font-medium">총 상품:</span>{" "}
                {data.pageInfo.totalElements}
              </div>
              <div>
                <span className="font-medium">페이지 크기:</span>{" "}
                {data.pageInfo.pageSize}
              </div>
            </div>
          </div>
        )}

        {/* 페이지네이션 컨트롤 */}
        {data?.pageInfo && data.pageInfo.totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              disabled={data.pageInfo.first}
              onClick={() => setPage((filters.page || 0) - 1)}
            >
              이전
            </Button>
            <span className="flex items-center px-4">
              {data.pageInfo.currentPage} / {data.pageInfo.totalPages}
            </span>
            <Button
              variant="outline"
              disabled={data.pageInfo.last}
              onClick={() => setPage((filters.page || 0) + 1)}
            >
              다음
            </Button>
          </div>
        )}

        {/* 상품 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.products?.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={product.imageUrl || "https://placehold.co/300x200"}
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
                      className={
                        product.stock > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {product.stock > 0 ? `${product.stock}개` : "품절"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>상태:</span>
                    <Badge
                      variant={
                        product.status === "AVAILABLE" ? "default" : "secondary"
                      }
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
                    disabled={product.stock <= 0}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {product.stock > 0 ? "장바구니" : "품절"}
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* 상품이 없는 경우 */}
        {data?.products?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-medium">검색 결과가 없습니다</p>
            <p className="text-gray-500 mt-1">
              다른 검색어나 필터를 사용해보세요.
            </p>
            <Button onClick={resetFilters} variant="outline" className="mt-4">
              필터 초기화
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
