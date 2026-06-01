import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import ProductsPage from "./features/products/ProductsPage";
import AddProductPage from "./features/products/AddProductPage";
import ProductProvider from "./context/ProductProvider";
import EditProductPage from "./features/products/EditProductPage";
import AuthProvider from "./features/auth/context/AuthProvider";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import RootRedirect from "./components/routes/RootRedirect";

const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/dashboard",
    element:
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>,
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
    <AuthProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
