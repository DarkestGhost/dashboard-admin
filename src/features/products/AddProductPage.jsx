import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductForm from "./components/ProductForm";
import { addNewProduct } from "@/services/productsApi";

const emptyValues = {
  name: "",
  price: "",
  stock: "",
  category: "",
};

const AddProductPage = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });

  const handleAddProduct = (data) => mutate(data);

  if (isError) return <p>{error}</p>;

  if (isPending) return <p>Loding...</p>;

  return (
    <ProductForm
      formSubmit={handleAddProduct}
      initialValue={emptyValues}
      title={"افزودن محصول جدید"}
    />
  );
};

export default AddProductPage;
