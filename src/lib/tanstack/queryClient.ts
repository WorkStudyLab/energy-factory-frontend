import { QueryClient } from "@tanstack/react-query";

// QueryClient 인스턴스 생성 및 전역 옵션 설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // 기본값 0초
      refetchOnWindowFocus: false, // 창 포커스 시 자동 리페치 비활성화
      retry: 0, // 기본값 0번 재시도
    },
  },
});
