import { formatNumber } from "@/utils/formatNumber";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const InventoryStatusChart = ({ availableProducts, unavailableProducts, lowStockProducts }) => {

    const data = {
        labels: [
            "موجود",
            "موجودی کم",
            "ناموجود",
        ],
        datasets: [
            {
                data: [
                    availableProducts,
                    lowStockProducts,
                    unavailableProducts,
                ],
                backgroundColor: [
                    "#22c55e",
                    "#f59e0b",
                    "#ef4444",
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
            <h3 className="font-vazir_bold text-lg mb-6">توزیع دسته‌بندی</h3>
            <div className="h-80">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    )
};

export default InventoryStatusChart;
