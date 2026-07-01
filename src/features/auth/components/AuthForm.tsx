import { Link, useNavigate } from "react-router-dom";
import {
  useForm,
  type FieldErrors,
  type Path,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import type { ZodType } from "zod";

interface AuthFormFields {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthFormProps<T extends AuthFormFields> {
  type: "login" | "signup";
  title: string;
  formSubmit: (data: T) => void | Promise<void>;
  schema: ZodType<T>;
}

const AuthForm = <T extends AuthFormFields>({
  type,
  title,
  formSubmit,
  schema,
}: AuthFormProps<T>) => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<T>({
    mode: "onTouched",
    resolver: zodResolver(schema) as Resolver<T>,
  });
  const formErrors = errors as FieldErrors<AuthFormFields>;
  const navigate = useNavigate();

  const onSubmit = async (data: T) => {
    try {
      await formSubmit(data);
      navigate("/dashboard");
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-100 dark:bg-zinc-900 px-4 py-8 transition-all duration-300 ease-linear">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setSubmitError(null)}
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white dark:bg-zinc-800 shadow-md overflow-hidden rounded-lg p-6 sm:p-8 space-y-6 sm:space-y-8 transition-all duration-300 ease-linear"
      >
        <h2 className="text-xl text-center font-vazir_bold text-zinc-800 dark:text-zinc-100">
          {title}
        </h2>

        {type === "signup" && (
          <Input
            id={"fullName"}
            label={"نام و نام خانوادگی"}
            type={"text"}
            error={formErrors.fullName}
            {...register("fullName" as Path<T>)}
          />
        )}

        <Input
          id={"email"}
          label={"ایمیل"}
          type={"email"}
          error={formErrors.email}
          {...register("email" as Path<T>)}
        />

        <Input
          id={"password"}
          label={"رمز عبور"}
          type={"password"}
          error={formErrors.password}
          {...register("password" as Path<T>)}
        />

        {type === "signup" && (
          <Input
            id={"confirmPassword"}
            label={"تکرار رمز عبور"}
            type={"password"}
            error={formErrors.confirmPassword}
            {...register("confirmPassword" as Path<T>)}
          />
        )}

        {submitError && (
          <p className="mb-2 text-sm text-center font-vazir_regular text-red-500 dark:text-red-400">
            {submitError}
          </p>
        )}

        <div className="flex flex-col items-center justify-center gap-y-2.5">
          <Button
            size={"md"}
            className="w-full"
            variant={"success"}
            disabled={!isValid || isSubmitting || !!submitError}
          >
            {type === "login"
              ? isSubmitting
                ? "در حال ورود..."
                : "ورود"
              : isSubmitting
                ? "درحال ثبت نام..."
                : "ثبت نام"}
          </Button>
          <p className="text-sm font-vazir_regular">
            {type === "login" ? "حساب کاربری ندارید ؟" : "حساب کاربری دارید ؟"}

            <Link
              to={type === "login" ? "/signup" : "/login"}
              className="mr-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              {type === "login" ? "ثبت نام" : "ورود"}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
