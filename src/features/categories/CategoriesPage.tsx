import { useContext, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, removeCategory } from "@/services/categoriesApi";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Pagination from "@/components/ui/Pagination";
import DataTable from "@/components/list/DataTable";
import EmptyListState from "@/components/list/EmptyListState";
import DeleteConfirmDialog from "@/components/list/DeleteConfirmDialog";
import RowActions from "@/components/list/RowActions";
import { useClientPagination } from "@/hooks/useClientPagination";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { sortByDate, sortByName } from "@/utils/sortItems";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi2";
import { sortCategoriesOptions } from "@/constants/options";
import { AuthContext } from "../auth/context/AuthProvider";
import type { Category, Column } from "@/types/feature";

const columns: Column<Category>[] = [
  { key: "name", header: "نام دسته‌بندی" },
  {
    key: "slug",
    header: "شناسه",
    render: (row: Category) => (
      <span className="font-mono text-sm">{row.slug}</span>
    ),
  },
];

const CategoriesPage = () => {
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const { user } = useContext(AuthContext)!;

  const {
    data: categories = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    isOpen: isDeleteOpen,
    selectedItem: selectedCategory,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  } = useDeleteItem({
    queryKey: ["categories"],
    deleteFn: removeCategory,
    successMessage: "دسته‌بندی با موفقیت حذف شد.",
  });

  const filteredCategories = useMemo(() => {
    let results = [...categories];

    if (search) {
      results = results.filter(
        (category) =>
          category.name.toLowerCase().includes(search.toLowerCase()) ||
          category.slug.toLowerCase().includes(search.toLowerCase()),
      );
    }

    switch (sortBy) {
      case "newest":
        sortByDate(results, "desc");
        break;
      case "oldest":
        sortByDate(results, "asc");
        break;
      case "nameAsc":
        sortByName(results, "asc");
        break;
      case "nameDesc":
        sortByName(results, "desc");
        break;
    }

    return results;
  }, [categories, search, sortBy]);

  const { paginated, currentPage, totalPages, setCurrentPage, resetPage } =
    useClientPagination(filteredCategories);

  if (isLoading) return <Loading message="در حال دریافت دسته‌بندی‌ها..." />;

  if (isError)
    return <ErrorMessage message={error.message} onRetry={refetch} />;

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row items-center md:justify-between mb-8">
        <h2 className="text-xl font-vazir_bold text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear">
          مدیریت دسته‌بندی‌ها
        </h2>
        {user?.role === "admin" && (
          <Link to={"/dashboard/categories/addNewCategory"}>
            <Button
              size={"md"}
              variant={"primary"}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <HiPlus size={16} />
              افزودن دسته بندی جدید
            </Button>
          </Link>
        )}
      </div>

      <div className="w-full my-6 flex flex-col xl:flex-row items-center justify-center gap-3">
        <Input
          id="search"
          type="text"
          placeholder="جستجوی دسته بندی..."
          className="flex-1"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            resetPage();
          }}
        />

        <Select
          id="sort"
          options={sortCategoriesOptions}
          placeholder="مرتب‌سازی..."
          className="sm:w-50"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            resetPage();
          }}
        />
      </div>

      {paginated.length > 0 ? (
        <>
          <DataTable
            columns={columns}
            data={paginated}
            renderActions={
              user?.role === "admin"
                ? (category: Category) => (
                    <RowActions
                      editPath={`/dashboard/categories/editCategory/${category.id}`}
                      onDelete={() => openDeleteDialog(category)}
                    />
                  )
                : undefined
            }
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <EmptyListState
          title="دسته‌بندی‌ای برای نمایش وجود ندارد ..."
          description="می‌توانید با زدن دکمه افزودن دسته‌بندی جدید، دسته‌بندی‌ای به لیستتان اضافه کنید."
        />
      )}

      <DeleteConfirmDialog
        isOpen={isDeleteOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        entityLabel="دسته‌بندی"
        itemName={selectedCategory?.name}
      />
    </div>
  );
};

export default CategoriesPage;
