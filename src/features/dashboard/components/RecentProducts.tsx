import type { Product } from "@/types/feature";
import { formatNumber } from "@/utils/formatNumber";
import { HiShoppingBag } from "react-icons/hi2";

interface RecentProductsProps {
  recentProducts: Product[];
}

const RecentProducts = ({ recentProducts }: RecentProductsProps) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm transition-all duration-300 ease-linear">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-vazir_bold text-lg">آخرین محصولات</h3>
        <span className="text-xs text-zinc-500 font-vazir_regular">
          {`${formatNumber(recentProducts.length)} محصول اخیر`}
        </span>
      </div>
      {recentProducts.length === 0 ? (
        <p className="text-zinc-500 text-center font-vazir_medium py-8">
          محصولی برای نمایش وجود ندارد
        </p>
      ) : (
        recentProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between py-5 border-b last:border-0 border-zinc-200 dark:border-zinc-800 transition-colors duration-300 ease-linear"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center transition-colors duration-300 ease-linear">
                <HiShoppingBag className="text-blue-600" />
              </div>
              <div>
                <p className="font-vazir_medium">{product.name}</p>
                <p className="text-xs text-zinc-500 font-vazir_regular">
                  {product.category}
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-vazir_medium ${product.stock === 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
            >
              {product.stock === 0
                ? "ناموجود"
                : `${formatNumber(product.stock)} عدد`}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentProducts;
