import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import { addNewProduct } from "@/services/ProductsApi";
import { toast } from "sonner";
import type {
  ProductFormData,
  ProductFormOutput,
} from "./validations/productSchema";

const emptyValues: Partial<ProductFormData> = {
  name: "",
  price: "",
  stock: "",
  category: "",
};

const AddProductPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: addNewProduct,
    onMutate: async (data: ProductFormOutput) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousProducts = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(["products"], (old: ProductFormOutput[]) => [
        ...old,
        { ...data },
      ]);
      return { previousProducts };
    },
    onError: (error, _data, context) => {
      toast.error(error.message);
      queryClient.setQueryData(["products"], context?.previousProducts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("محصول با موفقیت اضافه شد.");
      navigate("/dashboard/products");
    },
  });

  const handleAddProduct = (data: ProductFormOutput) => {
    mutate(data);
  };

  return (
    <ProductForm
      isMutating={isMutating}
      formSubmit={handleAddProduct}
      initialValue={emptyValues}
      title={"افزودن محصول جدید"}
    />
  );
};

export default AddProductPage;
