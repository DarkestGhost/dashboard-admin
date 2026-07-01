import { formatNumber } from "@/utils/formatNumber";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPagesNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i < totalPages + 1; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-x-2 mt-4">
      {getPagesNumbers().map((page, index) => (
        <Button
          key={`page-${index}-${page}`}
          disabled={typeof page !== "number"}
          variant={"outline"}
          className={`w-8 h-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${currentPage === page && "bg-blue-600 text-white hover:bg-blue-700"} ${typeof page !== "number" && "border-zinc-500 dark:border-zinc-400"}`}
          onClick={() => typeof page === "number" && onPageChange(page)}
        >
          {typeof page === "number" ? formatNumber(page) : page}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
