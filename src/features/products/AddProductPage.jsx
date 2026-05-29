import { useCallback, useContext } from "react";
import ProductForm from "../../components/ProductForm";
import { ProductContext } from "../../context/ProductProvider";

const emptyValues = {
  name: "",
  price: "",
  stock: "",
  category: "",
};

const AddProductPage = () => {
  const { addNewProduct } = useContext(ProductContext);

  const handleAddProduct = useCallback(
    (data) => {
      addNewProduct(data);
    },
    [addNewProduct],
  );

  return (
    <ProductForm
      formSubmit={handleAddProduct}
      initialValue={emptyValues}
      title={"افزودن محصول جدید"}
    />
  );
};

export default AddProductPage;
