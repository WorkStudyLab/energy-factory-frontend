import type { PageInfo } from "@/types/product";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  pageInfo: PageInfo;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pageInfo, onPageChange }: PaginationProps) => {
  const { currentPage, totalPages, first, last } = pageInfo;

  // 페이지 번호 범위 계산 (현재 페이지 기준 좌우 2개씩)
  const getPageNumbers = () => {
    const pages: number[] = [];
    const startPage = Math.max(0, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* 첫 페이지로 */}
      <button
        onClick={() => onPageChange(0)}
        disabled={first}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
        aria-label="첫 페이지"
      >
        <ChevronsLeft className="w-5 h-5" />
      </button>

      {/* 이전 페이지 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={first}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
        aria-label="이전 페이지"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* 페이지 번호들 */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`min-w-[40px] h-10 px-3 rounded-md font-medium transition-colors ${
              pageNum === currentPage
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {pageNum + 1}
          </button>
        ))}
      </div>

      {/* 다음 페이지 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={last}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
        aria-label="다음 페이지"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* 마지막 페이지로 */}
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={last}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
        aria-label="마지막 페이지"
      >
        <ChevronsRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
