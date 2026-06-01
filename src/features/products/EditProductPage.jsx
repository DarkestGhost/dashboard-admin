import { useParams } from "react-router-dom";
import { useCallback, useContext } from "react";
import ProductForm from "./components/ProductForm";
import { ProductContext } from "../../context/ProductProvider";

const EditProductPage = () => {
  const { EditProduct, products } = useContext(ProductContext);
  const { productId } = useParams();
  const product = products.find(product => product.id === productId);

  const handleEditProduct = useCallback(
    (data) => {
      EditProduct(productId, data);
    },
    [EditProduct, productId],
  );
  
  return (
    <ProductForm
      formSubmit={handleEditProduct}
      initialValue={product}
      title={"ویرایش محصول"}
    />
  );
};

export default EditProductPage;
