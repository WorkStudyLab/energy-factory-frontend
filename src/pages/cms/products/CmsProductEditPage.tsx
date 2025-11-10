import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "@/features/admin-products/ui/ProductForm";
import { useAdminProduct } from "@/features/admin-products/hooks/useAdminProduct";
import { useUpdateProduct } from "@/features/admin-products/hooks/useUpdateProduct";
import { ROUTES } from "@/constants/routes";
import type { Product } from "@/types/product";

export default function CmsProductEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "0");

  const { data: product, isLoading, error } = useAdminProduct(productId);
  const updateProductMutation = useUpdateProduct();

  const handleSubmit = (data: Partial<Product>) => {
    updateProductMutation.mutate(
      { id: productId, data },
      {
        onSuccess: () => {
          navigate(ROUTES.CMS_PRODUCTS);
        },
      },
    );
  };

  const handleCancel = () => {
    navigate(ROUTES.CMS_PRODUCTS);
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <p className="text-red-600">상품을 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate(ROUTES.CMS_PRODUCTS)}
            className="mt-4 text-green-600 hover:underline"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">상품 수정</h1>
        <p className="text-gray-500 mt-1">상품 정보를 수정합니다</p>
      </div>

      <ProductForm
        mode="edit"
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updateProductMutation.isPending}
      />
    </div>
  );
}
