import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register( 
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function ChartsAndOverview() {
  // Dummy Analytics (Replace with API response)
  const data = {
    walletBalance: 250,
    totalDeposits: 1200,
    totalWithdrawals: 450,
    activeInvestments: 2,
    totalInvestedAmount: 1500,

    chartData: {
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      deposits: [300, 200, 150, 500, 250, 100],
      withdrawals: [50, 120, 80, 30, 160, 70],
      investments: [100, 200, 150, 230, 180, 90],
    },
  };

  // ====== Line Chart (Deposits vs Withdrawals) ======
  const lineData = {
    labels: data.chartData.months,
    datasets: [
      {
        label: "Deposits",
        data: data.chartData.deposits,
        borderColor: "#4456ff",
        tension: 0.4,
      },
      {
        label: "Withdrawals",
        data: data.chartData.withdrawals,
        borderColor: "#ff5252",
        tension: 0.4,
      },
    ],
  };

  // ====== Bar Chart (Investments) ======
  const barData = {
    labels: data.chartData.months,
    datasets: [
      {
        label: "Investments",
        data: data.chartData.investments,
        backgroundColor: "#1e30fe",
      },
    ],
  };

  // ====== Insights (AI-Like Smart Insights) ======
  const insights = [
    "Your deposits peaked in April at $ 500.",
    "Withdrawals stayed under control this month.",
    "Your investment performance improved compared to last month.",
    "You maintain a healthy wallet balance of $ 250.",
  ];

  return (
    <div className="w-full flex flex-col gap-6 mt-6">

      

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Deposits vs Withdrawals */}
        <div className="bg-white shadow-md rounded-2xl p-4">
          <h3 className="font-semibold mb-2">Deposits vs Withdrawals</h3>
          <Line data={lineData} height={120} />
        </div>

        {/* Investments */}
        <div className="bg-white shadow-md rounded-2xl p-4">
          <h3 className="font-semibold mb-2">Investments Over Time</h3>
          <Bar data={barData} height={120} />
        </div>

      </div>

      {/* INSIGHT BOX */}
      <div className="bg-[#4456ff] text-white rounded-2xl p-5 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Smart Financial Insights</h3>

        <ul className="list-disc list-inside space-y-1 opacity-90">
          {insights.map((i, idx) => (
            <li key={idx} className="text-sm">{i}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}

