import { useNavigate } from "react-router-dom";
import { ProductForm } from "@/features/admin-products/ui/ProductForm";
import { useCreateProduct } from "@/features/admin-products/hooks/useCreateProduct";
import { ROUTES } from "@/constants/routes";
import type { Product } from "@/types/product";

export default function CmsProductCreatePage() {
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();

  const handleSubmit = (data: Partial<Product>) => {
    createProductMutation.mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.CMS_PRODUCTS);
      },
    });
  };

  const handleCancel = () => {
    navigate(ROUTES.CMS_PRODUCTS);
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">상품 등록</h1>
        <p className="text-gray-500 mt-1">새로운 상품을 등록합니다</p>
      </div>

      <ProductForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createProductMutation.isPending}
      />
    </div>
  );
}
