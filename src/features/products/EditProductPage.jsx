import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductForm from "./components/ProductForm";
import { editProduct, fetchProduct } from "@/services/productsApi";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";

const EditProductPage = () => {
  const [lastData, setLastData] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, error: mutateError, isError: isMutateError, isPending: isMutating } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/dashboard/products");
    },
  });

  const { productId } = useParams();

  const { data: product, isLoading: isProductLoading, isError: isProductError, error: productError, refetch } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => fetchProduct(productId),
  });

  const handleEditProduct = (data) => {
    setLastData({ id: productId, ...data });
    mutate({ id: productId, ...data });
  }

  if (isProductLoading) return <Loading message="در حال بارگذاری ..." />;

  if (isProductError) return <ErrorMessage message={productError.message} onRetry={refetch} />
  
  if (!product) return <ErrorMessage message={"محصول پیدا نشد"} />

  return (
    <>
      {isMutateError && <ErrorMessage message={mutateError.message} onRetry={() => mutate(lastData)} />}

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
