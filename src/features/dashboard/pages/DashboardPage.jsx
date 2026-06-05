import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/productsApi";
import StatsCard from "../components/StatsCard";
import { HiOutlineCube, HiOutlineArchiveBox, HiOutlineExclamationTriangle, HiOutlineBanknotes } from "react-icons/hi2";
import RecentProducts from "../components/RecentProducts";
import LowStockCard from "../components/LowStockCard";

const DashboardPage = () => {
    const { data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts
    });

    const totalProducts = products.length;

    const availableProducts = products.filter(product => product.stock > 0).length;

    const unavailableProducts = products.filter(product => product.stock === 0).length;

    const totalInventoryValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);

    const recentProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    const lowStockProducts = products.filter(product => product.stock < 5).slice(0, 5);

    return (
        <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatsCard title={"تعداد کل محصولات"} value={totalProducts} description={"تمام محصولاتی که در سیستم ثبت شده‌اند."} icon={<HiOutlineCube />} iconColorClasses={"text-blue-600 dark:text-blue-400"} />

                <StatsCard title={"محصولات موجود"} value={availableProducts} description=
                    {"محصولاتی که در انبار موجود هستند."} icon={<HiOutlineArchiveBox />} iconColorClasses={"text-green-600 dark:text-green-400"} />

                <StatsCard title={"محصولات ناموجود"} value={unavailableProducts} description={"محصولاتی که موجودی آن‌ها صفر شده است."} icon={<HiOutlineExclamationTriangle />} iconColorClasses={"text-red-600 dark:text-red-400"} />

                <StatsCard title={"ارزش کل انبار"} value={totalInventoryValue} description={"مجموع قیمت * تعداد موجودی محصولات"} icon={<HiOutlineBanknotes />} iconColorClasses={"text-amber-600 dark:text-amber-400"} />
            </div>
            <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-6">
                <RecentProducts recentProducts={recentProducts} />
                <LowStockCard lowStockProducts={lowStockProducts} />
            </div>
        </div>
    )
};

export default DashboardPage;
