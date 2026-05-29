import { createContext, useCallback, useReducer } from "react";
import { useHttp } from "../hooks/useHttp";

const ProductContext = createContext({
  products: [],
  error: null,
  loading: false,
  fetchProducts: () => {},
  removeProduct: () => {},
  addNewProduct: () => {},
});

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload,
        ),
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    default:
      return { state };
  }
};

const ProductProvider = ({ children }) => {
  const [productState, productDispatch] = useReducer(productReducer, {
    products: [],
  });

  const { error, loading, sendRequest } = useHttp();

  const fetchProducts = useCallback(async () => {
    const data = await sendRequest("http://localhost:3001/products");
    productDispatch({ type: "SET_PRODUCTS", payload: data });
  }, [sendRequest]);

  const addNewProduct = async (data) => {
    await sendRequest("http://localhost:3001/products", {
      method: "POST",
      body: {
        ...data,
        status: data.stock > 0 ? "available" : "unavailable",
      },
    });
    productDispatch({ type: "ADD_PRODUCT", payload: data });
  };

  const removeProduct = async (id) => {
    await sendRequest(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    });
    productDispatch({ type: "REMOVE_PRODUCT", payload: id });
  };

  const value = {
    products: productState.products,
    loading,
    error,
    fetchProducts,
    removeProduct,
    addNewProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
export { ProductContext };
