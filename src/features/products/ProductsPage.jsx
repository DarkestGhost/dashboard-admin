import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/ui/Button";
import DeleteProductDialog from "./components/DeleteProductDialog";
import { fetchProducts, removeProduct } from "@/services/productsApi";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { toast } from "sonner";
import { HiPencil, HiPlus, HiTrash } from "react-icons/hi2";
import { formatNumber, formatPrice } from "@/utils/formatNumber";

const ProductsPage = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const queryClient = useQueryClient();

  const { data: products, isLoading, isError, error, refetch } = useQuery({
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
  })

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

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row items-center md:justify-between mb-8">
        <h2 className="text-xl font-vazir_bold text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear">
          مدیریت محصولات
        </h2>
        <Link to={"/dashboard/products/addNewProduct"}>
          <Button size={"md"} variant={"outline"} className="w-full sm:w-auto flex items-center gap-1 group">
            <HiPlus className="w-4 h-4 text-blue-700 group-hover:text-white transition-colors" />
            <span>افزودن محصول جدید</span>
          </Button>
        </Link>
      </div>

      {products.length > 0 ? (
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
              {products.map((product) => (
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
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-2 text-center font-vazir_medium text-sm text-zinc-900 dark:text-zinc-100">
          <p>محصولی برای نمایش وجود ندارد ...</p>
          <p>
            میتوانید با زدن دکمه افزودن محصول جدید، محصولی رو به لیستتون اضافه
            کنید.
          </p>
        </div>
      )}
      <DeleteProductDialog
        isOpen={isDeleteOpen}
        productName={selectedProduct?.name}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ProductsPage;
