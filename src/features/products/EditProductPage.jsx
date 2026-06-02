import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductForm from "./components/ProductForm";
import { editProduct, fetchProducts } from "@/services/productsApi";

const EditProductPage = () => {
  const queryClient = useQueryClient();
  const { mutate, error, isError } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });

  const { productId } = useParams();

  const { data: products = [], isLoading } = useQuery({
    queryFn: fetchProducts,
    queryKey: ["products"],
  });

  if (isLoading) return <p>در حال بارگذاری...</p>;

  const product = products?.find(product => product.id === productId);

  const handleEditProduct = (data) => mutate({ id: productId, ...data });

  if (isError) {
    console.error(error)
  }

  return (
    <ProductForm
      formSubmit={handleEditProduct}
      initialValue={product}
      title={"ویرایش محصول"}
    />
  );
};

export default EditProductPage;
