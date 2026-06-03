import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductForm from "./components/ProductForm";
import { editProduct, fetchProduct } from "@/services/productsApi";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { toast } from "sonner";

const EditProductPage = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      toast.success("محصول با موفقیت ویرایش شد.");

      navigate("/dashboard/products");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const { productId } = useParams();

  const { data: product, isLoading: isProductLoading, isError: isProductError, error: productError, refetch } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => fetchProduct(productId),
  });

  const handleEditProduct = (data) => mutate({ id: productId, ...data });

  if (isProductLoading) return <Loading message="در حال بارگذاری ..." />;

  if (isProductError) return <ErrorMessage message={productError.message} onRetry={refetch} />

  if (!product) return <ErrorMessage message={"محصول پیدا نشد."} />

  return (
    <>
      <ProductForm
        formSubmit={handleEditProduct}
        initialValue={product}
        title={"ویرایش محصول"}
        isMutating={isMutating}
      />
    </>
  );
};

export default EditProductPage;
