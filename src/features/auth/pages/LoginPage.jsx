import { useCallback, useContext } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthProvider";

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const handleLoginToSite = useCallback(
        (data) => login(data),
        [login]
    );

    return <AuthForm type={"login"} title={"ورود به سایت"} formSubmit={handleLoginToSite} />
};

export default LoginPage;
