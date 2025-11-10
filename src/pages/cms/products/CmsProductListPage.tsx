import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminProducts } from "@/features/admin-products/hooks/useAdminProducts";
import { useDeleteProduct } from "@/features/admin-products/hooks/useDeleteProduct";
import { useAdminCategories } from "@/features/admin-products/hooks/useAdminCategories";
import { ProductTable } from "@/features/admin-products/ui/ProductTable";
import { ProductPagination } from "@/features/admin-products/ui/ProductPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { productStatusOptions } from "@/features/admin-products/constants/dummyData";

export default function CmsProductListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, error } = useAdminProducts({
    page,
    size: 10,
    category: category !== "all" ? category : undefined,
    status: status !== "all" ? status : undefined,
    keyword: keyword || undefined,
  });

  const { data: categories } = useAdminCategories();
  const deleteProductMutation = useDeleteProduct();

  const handleSearch = () => {
    setKeyword(searchInput);
    setPage(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDelete = (id: number) => {
    deleteProductMutation.mutate(id);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(0);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(0);
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">상품 관리</h1>
            <p className="text-gray-500 mt-1">
              등록된 상품을 조회, 수정, 삭제할 수 있습니다
            </p>
          </div>
          <Button onClick={() => navigate(ROUTES.CMS_PRODUCTS_CREATE)}>
            <Plus className="h-4 w-4 mr-2" />
            상품 등록
          </Button>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="상품명, 브랜드, 태그로 검색..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-9"
                />
              </div>
              <Button onClick={handleSearch}>검색</Button>
            </div>
            <div className="flex gap-2">
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 카테고리</SelectItem>
                  {categories?.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 상태</SelectItem>
                  {productStatusOptions.map((stat) => (
                    <SelectItem key={stat.value} value={stat.value}>
                      {stat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 통계 */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border p-4">
              <div className="text-sm text-gray-500">전체 상품</div>
              <div className="text-2xl font-bold mt-1">
                {data.pageInfo.totalElements}개
              </div>
            </div>
            <div className="bg-white rounded-lg border p-4">
              <div className="text-sm text-gray-500">판매중</div>
              <div className="text-2xl font-bold mt-1 text-green-600">
                {
                  data.products.filter((p) => p.status === "AVAILABLE").length
                }개
              </div>
            </div>
            <div className="bg-white rounded-lg border p-4">
              <div className="text-sm text-gray-500">재고부족</div>
              <div className="text-2xl font-bold mt-1 text-yellow-600">
                {
                  data.products.filter((p) => p.status === "LOW_STOCK").length
                }개
              </div>
            </div>
            <div className="bg-white rounded-lg border p-4">
              <div className="text-sm text-gray-500">품절</div>
              <div className="text-2xl font-bold mt-1 text-red-600">
                {
                  data.products.filter((p) => p.status === "OUT_OF_STOCK")
                    .length
                }개
              </div>
            </div>
          </div>
        )}

        {/* 테이블 */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            오류가 발생했습니다. 다시 시도해주세요.
          </div>
        ) : data ? (
          <>
            <ProductTable products={data.products} onDelete={handleDelete} />
            <ProductPagination
              pageInfo={data.pageInfo}
              onPageChange={setPage}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
