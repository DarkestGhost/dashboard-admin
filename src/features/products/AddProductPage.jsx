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
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["products"], });
      const previousProducts = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(["products"], (old) => [...old, { ...data, },
      ]);
      return { previousProducts };
    },
    onError: (error, data, context) => {
      toast.error(error.message);
      queryClient.setQueryData(["products"], context.previousProducts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("محصول با موفقیت اضافه شد.");
      navigate("/dashboard/products");
    },
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
