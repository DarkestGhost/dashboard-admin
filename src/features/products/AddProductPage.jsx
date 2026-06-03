import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import { addNewProduct } from "@/services/productsApi";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useState } from "react";

const emptyValues = {
  name: "",
  price: "",
  stock: "",
  category: "",
};

const AddProductPage = () => {
  const [lastData, setLastData] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isError, error } = useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/dashboard/products");
    }
  });

  const handleAddProduct = (data) => {
    setLastData(data);
    mutate(data);
  }

  return (
    <>
      {isError && <ErrorMessage message={error.message} onRetry={() => mutate(lastData)} />}

      <ProductForm
        formSubmit={handleAddProduct}
        initialValue={emptyValues}
        title={"افزودن محصول جدید"}
      />
    </>
  );
};

export default AddProductPage;
