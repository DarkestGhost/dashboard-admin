import { Navigate } from "react-router-dom";
import { AuthContext } from "@/features/auth/context/AuthProvider";
import { useContext } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext)!;

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
