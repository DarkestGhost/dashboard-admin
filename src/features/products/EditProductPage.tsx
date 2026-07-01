import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductForm from "./components/ProductForm";
import { editProduct, fetchProduct } from "@/services/ProductsApi";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { toast } from "sonner";
import type { ProductFormOutput } from "./validations/productSchema";

const EditProductPage = () => {
  const queryClient = useQueryClient();
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: editProduct,
    onMutate: async (data: ProductFormOutput & { id: number }) => {
      await queryClient.cancelQueries({ queryKey: ["products", productId] });
      const previousData = queryClient.getQueryData(["products", productId]);
      queryClient.setQueryData(
        ["products", productId],
        (oldData: ProductFormOutput) => ({ ...oldData, ...data }),
      );
      return { previousData };
    },
    onError: (error, _data, context) => {
      toast.error(error.message);
      queryClient.setQueryData(["products", productId], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
      toast.success("محصول با موفقیت ویرایش شد.");
      navigate("/dashboard/products");
    },
  });

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
    refetch,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => fetchProduct(Number(productId)),
  });

  const handleEditProduct = async (data: ProductFormOutput) =>
    mutate({ id: Number(productId), ...data });

  if (isProductLoading) return <Loading message="در حال بارگذاری ..." />;
  if (isProductError)
    return <ErrorMessage message={productError.message} onRetry={refetch} />;
  if (!product) return <ErrorMessage message={"محصول پیدا نشد."} />;

  return (
    <ProductForm
      formSubmit={handleEditProduct}
      initialValue={product}
      title={"ویرایش محصول"}
      isMutating={isMutating}
    />
  );
};

export default EditProductPage;
