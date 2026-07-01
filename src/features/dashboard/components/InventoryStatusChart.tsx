import { formatNumber } from "@/utils/formatNumber";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface InventoryStatusChartProps {
  availableProducts: number;
  unavailableProducts: number;
  lowStockProducts: number;
}

const InventoryStatusChart = ({
  availableProducts,
  unavailableProducts,
  lowStockProducts,
}: InventoryStatusChartProps) => {
  const data = {
    labels: ["موجود", "موجودی کم", "ناموجود"],
    datasets: [
      {
        data: [availableProducts, lowStockProducts, unavailableProducts],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#EC4899",
          "#14B8A6",
          "#F97316",
          "#6366F1",
          "#84CC16",
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
        position: "bottom" as const,
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
          label: (context: { raw: unknown }) => {
            const value = typeof context.raw === "number" ? context.raw : 0;
            return formatNumber(value);
          },
        },
      },
    },
  } as const;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-md">
      <h3 className="font-vazir_bold text-lg mb-6">توزیع دسته‌بندی</h3>
      <div className="h-80">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default InventoryStatusChart;
