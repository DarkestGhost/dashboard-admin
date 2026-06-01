import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";

const AuthForm = ({ type, title, formSubmit, schema }) => {
    const [submitError, setSubmitError] = useState(null);
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({ mode: "onTouched", resolver: zodResolver(schema) });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await formSubmit(data);
            navigate("/dashboard");
        } catch (error) {
            setSubmitError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 bg-white shadow-md overflow-hidden rounded-lg p-8 space-y-8">
                <h2 className="text-xl text-center font-vazir_bold text-slate-800">{title}</h2>

                {type === "signup" && <Input id={"fullName"} label={"نام و نام خانوادگی"} type={"text"} error={errors.fullName} {...register("fullName")} />}

                <Input id={"email"} label={"ایمیل"} type={"email"} error={errors.email} {...register("email")} />

                <Input id={"password"} label={"رمز عبور"} type={"password"} error={errors.password} {...register("password")} />

                {type === "signup" && <Input id={"confirmPassword"} label={"تکرار رمز عبور"} type={"password"} error={errors.confirmPassword} {...register("confirmPassword")} />}

                {submitError && <p className="mb-2 text-sm text-center font-vazir_regular text-red-500">{submitError}</p>}

                <div className="flex flex-col items-center justify-center gap-y-2.5">
                    <Button size={"md"} className="w-full" variant={"success"} disabled={!isValid || submitError}>
                        {type === "login" ? isSubmitting ? "در حال ورود..." : "ورود" : isSubmitting ? "درحال ثبت نام..." : "ثبت نام"}
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
    )
};

export default AuthForm;

