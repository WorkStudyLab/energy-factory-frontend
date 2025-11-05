import { useQuery } from "@tanstack/react-query";
import { OrderApiService } from "../services/orderApiService";
import type { OrderListQueryParams } from "@/types/order";

const useOrderList = (params: OrderListQueryParams) => {
  return useQuery({
    queryKey: ["orderList", params],
    queryFn: () => OrderApiService.getOrderList(params),
  });
};

export default useOrderList;
