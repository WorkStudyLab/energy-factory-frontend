import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PageInfo } from "@/types/product";

interface ProductPaginationProps {
  pageInfo: PageInfo;
  onPageChange: (page: number) => void;
}

export function ProductPagination({
  pageInfo,
  onPageChange,
}: ProductPaginationProps) {
  const { currentPage, totalPages } = pageInfo;

  // 페이지 번호 배열 생성 (현재 페이지 기준 좌우 2개씩)
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(0, currentPage - 2);
    let end = Math.min(totalPages - 1, start + maxVisible - 1);

    // 끝에서 시작할 경우 start 조정
    if (end - start < maxVisible - 1) {
      start = Math.max(0, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
