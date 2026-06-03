import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import { addNewProduct } from "@/services/productsApi";
import { toast } from "sonner";

const emptyValues = {
  name: "",
  price: "",
  stock: "",
  category: "",
};

const AddProductPage = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      toast.success("محصول با موفقیت اضافه شد.");

      navigate("/dashboard/products");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleAddProduct = (data) => mutate(data);

  return (
    <>
      <ProductForm
        formSubmit={handleAddProduct}
        initialValue={emptyValues}
        title={"افزودن محصول جدید"}
      />
    </>
  );
};

export default AddProductPage;
