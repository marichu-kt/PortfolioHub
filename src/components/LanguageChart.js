import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LanguageChart({ languagesData }) {
  const labels = Object.keys(languagesData || {});
  const values = Object.values(languagesData || {});
  const totalValue = values.reduce((acc, value) => acc + value, 0); // Calcular total

  const colors = [
    "#facc15", "#60a5fa", "#34d399", "#a78bfa", "#fb7185", "#f97316",
    "#06b6d4", "#ec4899", "#f43f5e", "#10b981", "#6366f1", "#eab308"
  ];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const percentage = ((context.raw / totalValue) * 100).toFixed(2);
            return `${context.label}: ${percentage}%`;
          }
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      {values.length === 0 ? (
        <p className="text-gray-400">No language data available.</p>
      ) : (
        <>
          {}
          <div className="w-80 h-80 mx-auto">
            <Pie data={data} options={options} />
          </div>

          {}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {labels.map((lang, i) => (
              <div
                key={lang}
                className="flex items-center gap-2 text-sm text-gray-900 dark:text-white"
              >
                <span className="font-medium">{lang}</span>
                <span
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: colors[i % colors.length] }}
                ></span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
