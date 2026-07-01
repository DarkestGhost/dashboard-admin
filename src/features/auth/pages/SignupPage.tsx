import { useCallback, useContext } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthProvider";
import { signupSchema, type SignupFormData } from "../validations/signupSchema";

const SignupPage = () => {
  const { register } = useContext(AuthContext)!;

  const handleRegisterToSite = useCallback(
    (data: SignupFormData) => register(data),
    [register],
  );

  return (
    <AuthForm
      type={"signup"}
      title={"ثبت نام در سایت"}
      formSubmit={handleRegisterToSite}
      schema={signupSchema}
    />
  );
};

export default SignupPage;
