import { useCallback, useContext } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthProvider";
import { loginSchema, type LoginFormData } from "../validations/loginSchema";

const LoginPage = () => {
  const { login } = useContext(AuthContext)!;
  const handleLoginToSite = useCallback(
    (data: LoginFormData) => login(data),
    [login],
  );

  return (
    <AuthForm
      type={"login"}
      title={"ورود به سایت"}
      formSubmit={handleLoginToSite}
      schema={loginSchema}
    />
  );
};

export default LoginPage;
