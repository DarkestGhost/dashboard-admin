import { formatNumber, formatPrice } from "@/utils/formatNumber";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const InventoryValueChart = ({ inventoryValueByCategory }) => {

    const data = {
        labels: Object.keys(inventoryValueByCategory),
        datasets: [
            {
                label: "ارزش موجودی",
                data: Object.values(
                    inventoryValueByCategory
                ),
                backgroundColor: [
                    "#3B82F6",
                    "#10B981",
                ],
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
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
                    label: (context) => formatPrice(context.raw),
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    font: {
                        family: "vazir_regular",
                    },
                    callback: (value) => formatNumber(value),
                },
            },
            x: {
                ticks: {
                    font: {
                        family: "vazir_regular",
                    },
                },
            },
        },
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-md">
            <h3 className="font-vazir_bold text-lg mb-6">ارزش موجودی هر دسته</h3>
            <div className="h-96">
                <Bar data={data} options={options} />
            </div>
        </div>
    )
};

export default InventoryValueChart;
