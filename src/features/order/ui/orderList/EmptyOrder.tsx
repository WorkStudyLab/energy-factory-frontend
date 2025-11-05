import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**  주문 내역이 없을 경우 표출할 컴포넌트입니다. */
const EmptyOrder = () => {
  const navigate = useNavigate();

  const handleClickShowProducts = () => {
    navigate(ROUTES.PRODUCTS);
  };

  return (
    <Card>
      <CardContent className="p-8 text-center">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">주문 내역이 없습니다</h3>
        <p className="text-gray-500 mb-4">새로운 주문을 시작해보세요</p>
        <Button onClick={handleClickShowProducts}>상품 둘러보기</Button>
      </CardContent>
    </Card>
  );
};

export default EmptyOrder;
