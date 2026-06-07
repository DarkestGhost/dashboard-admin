import { formatNumber } from "@/utils/formatNumber";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const ProductsCategoryChart = ({ products }) => {
    const categoryCounts = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(categoryCounts),
        datasets: [
            {
                label: "تعداد محصولات",
                data: Object.values(categoryCounts),
                backgroundColor: [
                    "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316", "#6366F1", "#84CC16",
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: {
                        family: "vazir_regular",
                        size: 13,
                    },
                    padding: 15,
                    usePointStyle: true,
                    pointStyleWidth: 18,
                },
            },
            tooltip: {
                bodyFont: {
                    family: "vazir_regular",
                    size: 15,
                },
                titleFont: {
                    family: "vazir_bold",
                    size: 14,
                },
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: (context) => formatNumber(context.raw),
                },
            },
        },
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-md">
            <h3 className="font-vazir_bold text-lg mb-6">دسته‌بندی محصولات</h3>
            <div className="h-80">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    )
};

export default ProductsCategoryChart;
