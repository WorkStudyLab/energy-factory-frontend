import { useInfiniteQuery } from "@tanstack/react-query";
import { OrderApiService } from "../services/orderApiService";
import type { OrderListQueryParams } from "@/types/order";

interface UseInfiniteOrderListParams {
  status?: OrderListQueryParams["status"];
  paymentStatus?: OrderListQueryParams["paymentStatus"];
  pageSize?: number;
}

const useInfiniteOrderList = ({
  status,
  paymentStatus,
  pageSize = 10,
}: UseInfiniteOrderListParams) => {
  return useInfiniteQuery({
    queryKey: ["orderList", "infinite", status, paymentStatus],
    queryFn: ({ pageParam = 0 }) =>
      OrderApiService.getOrderList({
        status,
        paymentStatus,
        pageable: {
          page: pageParam,
          size: pageSize,
        },
      }),
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage;
      return pageInfo.last ? undefined : pageInfo.currentPage + 1;
    },
    initialPageParam: 0,
  });
};

export default useInfiniteOrderList;
