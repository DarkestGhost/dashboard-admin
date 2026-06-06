import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/productsApi";
import StatsCard from "../components/StatsCard";
import { HiOutlineCube, HiOutlineArchiveBox, HiOutlineExclamationTriangle, HiOutlineBanknotes } from "react-icons/hi2";
import RecentProducts from "../components/RecentProducts";
import LowStockCard from "../components/LowStockCard";
import ProductsCategoryChart from "../components/ProductsCategoryChart";
import InventoryStatusChart from "../components/InventoryStatusChart";
import InventoryValueChart from "../components/InventoryValueChart";
import { formatNumber, formatPrice } from "@/utils/formatNumber";

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

    const lowStockProducts = products.filter(product => product.stock <= 5).sort((a, b) => a.stock - b.stock).slice(0, 5);

    const lowStockChartProducts = products.filter(product => product.stock > 0 && product.stock <= 5).length;

    const inventoryValueByCategory = products?.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + (product.price * product.stock);

        return acc;
    }, {});

    const stats = [
        {
            id: 1,
            title: "تعداد کل محصولات",
            value: totalProducts,
            formatter: formatNumber,
            description: "تمام محصولاتی که در سیستم ثبت شده‌اند.",
            icon: <HiOutlineCube />,
            iconColorClasses: "text-blue-600 dark:text-blue-400",
        },
        {
            id: 2,
            title: "محصولات موجود",
            value: availableProducts,
            formatter: formatNumber,
            description: "محصولاتی که در انبار موجود هستند.",
            icon: <HiOutlineArchiveBox />,
            iconColorClasses: "text-green-600 dark:text-green-400",
        },
        {
            id: 3,
            title: "محصولات ناموجود",
            value: unavailableProducts,
            formatter: formatNumber,
            description: "محصولاتی که موجودی آن‌ها صفر شده است.",
            icon: <HiOutlineExclamationTriangle />,
            iconColorClasses: "text-red-600 dark:text-red-400",
        },
        {
            id: 4,
            title: "ارزش کل انبار",
            value: totalInventoryValue,
            formatter: formatPrice,
            description: "مجموع قیمت * تعداد موجودی محصولات",
            icon: <HiOutlineBanknotes />,
            iconColorClasses: "text-amber-600 dark:text-amber-400",
        },
    ]

    return (
        <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map(stat => (
                    <StatsCard key={stat.id} {...stat} />
                ))}
            </div>

            <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-6">
                <RecentProducts recentProducts={recentProducts} />
                <LowStockCard lowStockProducts={lowStockProducts} />
            </div>

            <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ProductsCategoryChart products={products} />
                <InventoryStatusChart availableProducts={availableProducts} unavailableProducts={unavailableProducts} lowStockProducts={lowStockChartProducts} />
            </div>

            <div className="mt-12">
                <InventoryValueChart inventoryValueByCategory={inventoryValueByCategory} />
            </div>
        </div>
    )
};

export default DashboardPage;
