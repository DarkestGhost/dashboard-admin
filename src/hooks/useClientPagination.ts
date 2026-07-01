import { useMemo, useState } from "react";

export const useClientPagination = <T>(
  items: T[],
  itemsPerPage: number = 4,
) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const safePage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const paginated = useMemo(
    () => items.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage),
    [items, safePage, itemsPerPage],
  );

  const resetPage = () => setCurrentPage(1);

  return {
    paginated,
    currentPage: safePage,
    totalPages,
    setCurrentPage,
    resetPage,
  };
};
