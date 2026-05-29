import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import ProductsPage from "./features/products/ProductsPage";
import AddProductPage from "./features/products/AddProductPage";
import ProductProvider from "./context/ProductProvider";
import EditProductPage from "./features/products/EditProductPage";

const router = createBrowserRouter([
  { path: "/login", element: <p>Login</p> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <p>DashboardHome</p> },
      { path: "products", element: <ProductsPage /> },
      {
        path: "products/addNewProduct",
        element: <AddProductPage />,
      },
      {
        path: "products/editProduct/:productId",
        element: <EditProductPage />,
      },
    ],
  },
  { path: "*", element: <p className="text-center">Not Found Page</p> },
]);

const App = () => {
  return (
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  );
};

export default App;
