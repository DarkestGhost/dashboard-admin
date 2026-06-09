import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, removeProduct } from "@/services/productsApi";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { formatNumber, formatPrice } from "@/utils/formatNumber";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Pagination from "@/components/ui/Pagination";
import DataTable from "@/components/list/DataTable";
import EmptyListState from "@/components/list/EmptyListState";
import DeleteConfirmDialog from "@/components/list/DeleteConfirmDialog";
import RowActions from "@/components/list/RowActions";
import { useClientPagination } from "@/hooks/useClientPagination";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { sortByDate } from "@/utils/sortItems";
import { fetchCategories } from "@/services/categoriesApi";
import { sortProductsOptions } from "@/constants/options";

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { data: products = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categorySearchOptions, error: categoryError, isError: categoryIsError, isLoading: categoryIsLoading, refetch: categoryRefetch } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })

  const {
    isOpen: isDeleteOpen,
    selectedItem: selectedProduct,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  } = useDeleteItem({
    queryKey: ["products"],
    deleteFn: removeProduct,
    successMessage: "محصول با موفقیت حذف شد.",
  });

  const categoryMap = useMemo(() => {
    if (!categorySearchOptions) return {};

    return categorySearchOptions.reduce((acc, item) => {
      acc[item.slug] = item.name;
      return acc;
    }, {});
  }, [categorySearchOptions]);

  const columns = useMemo(() => [
    { key: "name", header: "نام محصول" },
    {
      key: "category", header: "دسته‌بندی", render: (row) =>
        categoryMap[row.category] || row.category,
    },
    {
      key: "price",
      header: "قیمت",
      render: (row) => formatPrice(row.price),
    },
    {
      key: "stock",
      header: "موجودی",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs transition-colors duration-300 ease-linear ${row.stock > 0 ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
            }`}
        >
          {row.stock > 0 ? `${formatNumber(row.stock)} عدد` : "ناموجود"}
        </span>
      ),
    },
  ], [categoryMap]);

  const filteredProducts = useMemo(() => {
    let results = [...products];

    if (search) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (categoryFilter) {
      const categoryName = categorySearchOptions.find(
        (category) => category.slug === categoryFilter,
      ).name;
      if (categoryName) {
        results = results.filter((product) => product.category === categoryName);
      }
    }

    switch (sortBy) {
      case "newest":
        sortByDate(results, "desc");
        break;
      case "oldest":
        sortByDate(results, "asc");
        break;
      case "mostExpensive":
        results.sort((a, b) => b.price - a.price);
        break;
      case "cheapest":
        results.sort((a, b) => a.price - b.price);
        break;
      case "maxInventory":
        results.sort((a, b) => b.stock - a.stock);
        break;
      case "minInventory":
        results.sort((a, b) => a.stock - b.stock);
        break;
    }

    return results;
  }, [categoryFilter, categorySearchOptions, products, search, sortBy]);

  const { paginated, currentPage, totalPages, setCurrentPage, resetPage } =
    useClientPagination(filteredProducts);

  if (isLoading) return <Loading message="در حال دریافت محصولات..." />;

  if (isError) return <ErrorMessage message={error.message} onRetry={refetch} />;

  if (categoryIsLoading) return <Loading message="در حال دریافت دسته بندی ها..." />;

  if (categoryIsError) return <ErrorMessage message={categoryError.message} onRetry={categoryRefetch} />;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-vazir_bold text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear">
        مدیریت محصولات
      </h2>

      <div className="w-full my-6 flex flex-col xl:flex-row items-center justify-center gap-3">
        <Input
          id="search"
          type="text"
          placeholder="جستجوی محصولات..."
          className="flex-1"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            resetPage();
          }}
        />

        <div className="flex items-center gap-3">
          <Select
            id="category"
            options={categorySearchOptions}
            placeholder="دسته‌بندی..."
            className="sm:w-50"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              resetPage();
            }}
          />

          <Select
            id="sort"
            options={sortProductsOptions}
            placeholder="مرتب‌سازی..."
            className="sm:w-50"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              resetPage();
            }}
          />
        </div>
      </div>

      {paginated.length > 0 ? (
        <>
          <DataTable
            columns={columns}
            data={paginated}
            renderActions={(product) => (
              <RowActions
                editPath={`/dashboard/products/editProduct/${product.id}`}
                onDelete={() => openDeleteDialog(product)}
              />
            )}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <EmptyListState
          title="محصولی برای نمایش وجود ندارد ..."
          description="می‌توانید با زدن دکمه افزودن محصول جدید، محصولی به لیستتان اضافه کنید."
        />
      )}

      <DeleteConfirmDialog
        isOpen={isDeleteOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        entityLabel="محصول"
        itemName={selectedProduct?.name}
      />
    </div>
  );
};

export default ProductsPage;
