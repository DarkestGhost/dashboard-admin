import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/context/AuthProvider";

const NotFound = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4 bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
            <HiOutlineExclamationTriangle className="text-6xl text-amber-500" />
            <h1 className="text-8xl font-vazir_bold text-blue-600">404</h1>
            <h2 className="text-2xl font-vazir_bold text-zinc-800 dark:text-zinc-100">صفحه مورد نظر پیدا نشد</h2>
            <p className="text-slate-500 dark:text-zinc-400 max-w-md font-vazir_regular">
                ممکن است آدرس را اشتباه وارد کرده باشید یا
                صفحه مورد نظر حذف شده باشد.
            </p>
            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                <Button size={"md"} variant={"primary"} className="w-full sm:w-auto">
                    بازگشت به داشبورد
                </Button>
            </Link>
        </div>
    )
};

export default NotFound;
