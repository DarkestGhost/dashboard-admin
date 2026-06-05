import { HiExclamationTriangle } from "react-icons/hi2";
const LowStockCard = ({ lowStockProducts }) => {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm transition-all duration-300 ease-linear">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-vazir_bold text-lg">محصولات رو به اتمام</h3>
                <span className="text-xs text-zinc-500 font-vazir_regular">
                    5 محصول با کمترین موجودی
                </span>
            </div>
            {lowStockProducts.map(product => (
                <div className="flex items-center justify-between py-5 border-b last:border-0 border-zinc-200 dark:border-zinc-800 transition-colors duration-300 ease-linear">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center transition-colors duration-300 ease-linear">
                            <HiExclamationTriangle />
                        </div>
                        <div>
                            <p className="font-vazir_medium">{product.name}</p>
                            <p className="text-xs text-zinc-500 font-vazir_regular">{product.category}</p>
                        </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-vazir_medium ${product.stock === 0 ? "bg-red-100 text-red-600" : product.stock <= 2 ? "bg-orange-100 text-orange-600" : "bg-amber-100 text-amber-600"}`}>
                        {product.stock === 0 ? "ناموجود" : `فقط ${product.stock} عدد`}
                    </span>
                </div>
            ))}
        </div>
    )
};

export default LowStockCard;
