import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/ui/Button";
import { fetchProducts, removeProduct } from "@/services/productsApi";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { toast } from "sonner";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { formatNumber, formatPrice } from "@/utils/formatNumber";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Pagination from "@/components/ui/Pagination";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const categorySearchOptions = [
  { value: "digital", label: "دیجیتال" },
  { value: "accessories", label: "جانبی" },
  { value: "gaming", label: "گیمینگ" },
  { value: "networking", label: "شبکه" },
  { value: "photography", label: "عکاسی" },
];

const sortSearchOptions = [
  { value: "newest", label: "جدید ترین" },
  { value: "oldest", label: "قدیمی ترین" },
  { value: "mostExpensive", label: "گران ترین" },
  { value: "cheapest", label: "ارزان ترین" },
  { value: "maxInventory", label: "بیشترین موجودی" },
  { value: "minInventory", label: "کمترین موجودی" },
];

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  const { data: products = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { mutate } = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("محصول با موفقیت حذف شد.");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const filteredProducts = useMemo(() => {
    let results = [...products];

    if (search) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (categoryFilter !== "") {
      results = results.filter(product => product.category === categoryFilter)
    }

    switch (sortBy) {
      case "جدید ترین": results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "قدیمی ترین": results.sort((a, b) => new Date(a.createdAt) - new Date(b.reatedAt));
        break;
      case "گران ترین": results.sort((a, b) => b.price - a.price);
        break;
      case "ارزان ترین": results.sort((a, b) => a.price - b.price);
        break;
      case "بیشترین موجودی": results.sort((a, b) => b.stock - a.stock);
        break;
      case "کمترین موجودی": results.sort((a, b) => a.stock - b.stock);
        break;
    }

    return results;
  }, [categoryFilter, products, search, sortBy]);

  const handleRemoveProduct = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    mutate(selectedProduct?.id);
    setIsDeleteOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) return <Loading message="در حال دریافت محصولات..." />;

  if (isError) return <ErrorMessage message={error.message} onRetry={refetch} />;

  const ITEM_PER_PAGE = 4;
  const totalPages = Math.ceil(filteredProducts.length / ITEM_PER_PAGE);
  const safePage = currentPage > totalPages ? totalPages : currentPage;

  const paginatedProducts = () => {
    const endIndex = safePage * ITEM_PER_PAGE;
    const startIndex = endIndex - ITEM_PER_PAGE;

    return filteredProducts.slice(startIndex, endIndex);
  };

  const paginated = paginatedProducts();
  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-vazir_bold text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear">
        مدیریت محصولات
      </h2>
      <div className="w-full my-6 flex flex-col xl:flex-row items-cente justify-center gap-3">
        <Input id={"search"} type="text" placeholder="جستجوی محصولات..." className="flex-1" value={search} onChange={(e) => {
          setSearch(e.target.value),
            setCurrentPage(1)
        }
        } />

        <div className="flex items-center gap-3">
          <Select id={"category"} options={categorySearchOptions} placeholder="دسته بندی..." className="sm:w-50" value={categoryFilter} onChange={(e) => {
            setCategoryFilter(e.target.value),
              setCurrentPage(1)
          }
          } />

          <Select id={"sort"} options={sortSearchOptions} placeholder="مرتب سازی..." className="sm:w-50" value={sortBy} onChange={(e) => {
            setSortBy(e.target.value),
              setCurrentPage(1)
          }
          } />
        </div>
      </div>

      {paginated.length > 0 ? (
        <>
          <div className="bg-white dark:bg-zinc-800 overflow-x-auto rounded-lg shadow-md transition-all duration-300 ease-linear">
            <table className="min-w-max w-full text-right">
              <thead>
                <tr className="bg-zinc-200 dark:bg-zinc-700 font-vazir_medium transition-all duration-300 ease-linear">
                  <th className="text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear p-4">نام محصول</th>
                  <th className="text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear p-4">دسته بندی</th>
                  <th className="text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear p-4">قیمت</th>
                  <th className="text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear p-4">موجودی</th>
                  <th className="text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear p-4">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y-2">
                {paginated.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-zinc-100 dark:hover:bg-zinc-600 font-vazir_regular text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear"
                  >
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">
                      {formatPrice(product.price)}
                    </td>
                    <td className={"p-4"}>
                      <span
                        className={`px-2 py-1 rounded-full text-xs transition-colors duration-300 ease-linear ${product.stock > 0 ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}
                      >
                        {product.stock > 0 ? `${formatNumber(product.stock)} عدد` : "ناموجود"}
                      </span>
                    </td>
                    <td className="p-4 flex items-center gap-x-2">
                      <Link to={`/dashboard/products/editProduct/${product.id}`}>
                        <Button size={"sm"} variant={"primary"} className="flex items-center gap-1 group">
                          <HiPencil className="w-4 h-4" />
                          <span>ویرایش</span>
                        </Button>
                      </Link>
                      <Button
                        size={"sm"}
                        variant={"danger"}
                        className="flex items-center gap-1 group"
                        onClick={() => handleRemoveProduct(product)}
                      >
                        <HiTrash className="w-4 h-4" />
                        <span>حذف</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-2 text-center font-vazir_medium text-sm text-zinc-900 dark:text-zinc-100">
          <p>محصولی برای نمایش وجود ندارد ...</p>
          <p>
            میتوانید با زدن دکمه افزودن محصول جدید، محصولی رو به لیستتون اضافه
            کنید.
          </p>
        </div>
      )}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title={<><HiTrash className="w-5 h-5 text-red-500" />حذف محصول</>}
        confirmText="حذف"
      >
        <div className="flex flex-col justify-center gap-y-4 py-2">
          <p className="font-vazir_bold text-zinc-700 dark:text-zinc-200">
            میخوای محصول «{selectedProduct?.name}» رو حذف کنی؟
          </p>
          <p className="font-vazir_medium text-sm text-red-500 dark:text-red-400">
            ⚠️ این عملیات قابل بازگشت نیست.
          </p>
        </div>
      </ConfirmDialog>
    </div>
  );
};

export default ProductsPage;