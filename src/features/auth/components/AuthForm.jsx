import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const AuthForm = ({ type, title, formSubmit }) => {
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({ mode: "onTouched" });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await formSubmit(data);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 bg-white shadow-md overflow-hidden rounded-lg p-8 space-y-8">
                <h2 className="text-xl text-center font-vazir_bold text-slate-800">{title}</h2>

                {type === "signup" && <Input id={"fullName"} label={"نام و نام خانوادگی"} type={"text"} error={errors.fullName} {...register("fullName", {
                    required: "نام و نام خانوادگی الزامی است.",
                    pattern: {
                        value: /^[آ-ی\s]+$/,
                        message: "فقط حروف فارسی مجاز است.",
                    },
                    minLength: {
                        value: 3,
                        message: "حداقل ۳ کاراکتر وارد کنید.",
                    },
                    maxLength: {
                        value: 50,
                        message: "حداکثر 50 کاراکتر وارد کنید.",
                    }
                })} />}

                <Input id={"email"} label={"ایمیل"} type={"email"} error={errors.email} {...register("email", {
                    required: "ایمیل الزامی است.",
                    pattern: {
                        value: /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/,
                        message: "ایمیل معتبر نیست."
                    }
                })} />
                <Input id={"password"} label={"رمز عبور"} type={"password"} error={errors.password} {...register("password", {
                    required: "رمز عبور الزامی است.",
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "رمز عبور باید شامل کاراکتر بزرگ، کاراکتر کوچک، عدد و کاراکتر خاص باشد."
                    },
                    minLength: {
                        value: 6,
                        message: "رمز عبور حداقل باید 6 کاراکتر باشد."
                    }
                })} />

                {type === "signup" && <Input id={"confirmPassword"} label={"تکرار رمز عبور"} type={"password"} error={errors.confirmPassword} {...register("confirmPassword", {
                    required: "تکرار رمز عبور الزامی است.",
                })} />}

                <div className="flex flex-col items-center justify-center gap-y-2.5">
                    <Button size={"md"} className="w-full" variant={"success"} disabled={!isValid}>
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

