import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import ProductsPage from "./features/products/ProductsPage";
import AddProductPage from "./features/products/AddProductPage";
import ProductProvider from "./context/ProductProvider";

const router = createBrowserRouter([
  { path: "/login", element: <p>Login</p> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <p>DashboardHome</p> },
      { path: "/dashboard/products", element: <ProductsPage /> },
      {
        path: "/dashboard/products/addnewproduct",
        element: <AddProductPage />,
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
