import { createContext, useCallback, useState } from "react";
import { setAuthToken, removeAuthtoken, getAuthToken } from "../utils/authStorage";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext({
    user: null,
    token: null,
    isAuthenticated: false,
    register: () => { },
    login: () => { },
    logout: () => { },
});


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => {
        return getAuthToken() || null;
    });

    const register = useCallback(async (userData) => {
        const response = await registerUser(userData);
        setUser(response);
        setToken(response.accessToken);

        setAuthToken(response.accessToken);
    }, []);

    const login = useCallback(async (userData) => {
        const response = await loginUser(userData);
        setUser(response);
        setToken(response.accessToken);

        setAuthToken(response.accessToken);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);

        removeAuthtoken();
    }, [])

    const isAuthenticated = !!token;

    const value = {
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
};

export default AuthProvider;
export { AuthContext };