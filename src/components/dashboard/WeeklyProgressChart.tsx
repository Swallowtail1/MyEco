"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

type WeeklyData = {
  day: string;
  points: number;
  carbon: number;
};

type WeeklyProgressChartProps = {
  data: WeeklyData[];
};

export default function WeeklyProgressChart({
  data,
}: WeeklyProgressChartProps) {
  const chartData = {
    labels: data.map((item) => item.day),
    datasets: [
      {
        label: "Eco Points",
        data: data.map((item) => item.points),
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.12)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Carbon Saved",
        data: data.map((item) => item.carbon),
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34, 211, 238, 0.08)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#d1d5db",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "rgba(255,255,255,0.06)",
        },
      },
      y: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "rgba(255,255,255,0.06)",
        },
      },
    },
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-white text-xl font-bold">
          Weekly Progress
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Your eco points and carbon saved this week.
        </p>
      </div>

      <div className="h-[320px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}