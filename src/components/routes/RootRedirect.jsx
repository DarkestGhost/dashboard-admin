import { Navigate } from "react-router-dom";
import { AuthContext } from "@/features/auth/context/AuthProvider";
import { useContext } from "react";

const RootRedirect = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
};

export default RootRedirect;
