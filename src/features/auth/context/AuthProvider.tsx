import { createContext, useCallback, useState } from "react";
import {
  setAuthToken,
  removeAuthtoken,
  getAuthToken,
} from "../utils/authStorage";
import { loginUser, registerUser } from "../../../services/authService";
import type {
  AuthContextType,
  User,
  RegisterDataProps,
  LoginDataProps,
} from "@/types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storeUser = localStorage.getItem("user");
    return storeUser ? JSON.parse(storeUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return getAuthToken() || null;
  });

  const register = useCallback(async (userData: RegisterDataProps) => {
    const response = await registerUser(userData);
    setToken(response.accessToken);
    setAuthToken(response.accessToken);

    const safeUser = {
      id: response.id,
      name: response.fullName,
      role: response.role,
    };
    setUser(safeUser);
    localStorage.setItem("user", JSON.stringify(safeUser));
  }, []);

  const login = useCallback(async (userData: LoginDataProps) => {
    const response = await loginUser(userData);
    setToken(response.accessToken);
    setAuthToken(response.accessToken);

    const safeUser = {
      id: response.id,
      name: response.fullName,
      role: response.role,
    };
    setUser(safeUser);
    localStorage.setItem("user", JSON.stringify(safeUser));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    removeAuthtoken();

    localStorage.removeItem("user");
  }, []);

  const isAuthenticated = !!token;

  const value = {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
