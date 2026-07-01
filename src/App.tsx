import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import DashboardLayout from "./layout/components/DashboardLayout";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ProductsPage from "./features/products/ProductsPage";
import AddProductPage from "./features/products/AddProductPage";
import EditProductPage from "./features/products/EditProductPage";
import CategoriesPage from "./features/categories/CategoriesPage";
import AddCategoryPage from "./features/categories/AddCategoryPage";
import EditCategoryPage from "./features/categories/EditCategoryPage";
import OrdersPage from "./features/orders/OrdersPage";

import AuthProvider from "./features/auth/context/AuthProvider";
import ThemeProvider from "./context/theme/ThemeProvider";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import RootRedirect from "./components/routes/RootRedirect";
import NotFound from "./pages/NotFound";

import { Toaster } from "sonner";

const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "products", element: <ProductsPage /> },
      {
        path: "products/addNewProduct",
        element: <AddProductPage />,
      },
      {
        path: "products/editProduct/:productId",
        element: <EditProductPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "categories/addNewCategory",
        element: <AddCategoryPage />,
      },
      {
        path: "categories/editCategory/:categoryId",
        element: <EditCategoryPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster
            richColors
            position="top-center"
            closeButton
            toastOptions={{
              classNames: {
                toast: "font-vazir_medium",
              },
            }}
          />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
