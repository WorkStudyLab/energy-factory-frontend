import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { productStatusOptions } from "../constants/dummyData";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => void;
}

export function ProductTable({ products, onDelete }: ProductTableProps) {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const handleDeleteClick = (id: number) => {
    setSelectedProductId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProductId !== null) {
      onDelete(selectedProductId);
      setDeleteDialogOpen(false);
      setSelectedProductId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusOption = productStatusOptions.find((s) => s.value === status);
    if (!statusOption) return null;

    return (
      <Badge variant="outline" className={statusOption.color}>
        {statusOption.label}
      </Badge>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  // variants의 총 재고 계산
  const getTotalStock = (product: Product) => {
    if (!product.variants || product.variants.length === 0) return 0;
    return product.variants.reduce(
      (sum, variant) => sum + variant.availableStock,
      0,
    );
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        등록된 상품이 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>이미지</TableHead>
              <TableHead>상품명</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>가격</TableHead>
              <TableHead>재고</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm text-gray-500">
                      {product.brand}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {formatPrice(product.price)}원
                    </span>
                    {product.discount && (
                      <span className="text-sm text-red-600">
                        {product.discount}% 할인
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {(() => {
                    const totalStock = getTotalStock(product);
                    return (
                      <div className="flex flex-col">
                        <span
                          className={
                            totalStock === 0
                              ? "text-red-600 font-medium"
                              : totalStock < 20
                                ? "text-yellow-600 font-medium"
                                : "font-medium"
                          }
                        >
                          {totalStock}개
                        </span>
                        {product.variants && product.variants.length > 1 && (
                          <span className="text-xs text-gray-500">
                            {product.variants.length}개 옵션
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(
                            ROUTES.CMS_PRODUCTS_EDIT.replace(
                              ":id",
                              String(product.id),
                            ),
                          )
                        }
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        수정
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(product.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>상품을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 상품이 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
