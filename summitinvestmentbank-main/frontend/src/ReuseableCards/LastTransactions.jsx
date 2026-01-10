//
// src/components/LastTransactions.jsx
import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  TrendingUp,
  Receipt,
} from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import { getUserDashboardStats } from "../services/userDashboardStat/UserDashboardStat";
import { toast } from "react-toastify";

export default function LastTransactions() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load dashboard stats from backend
  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await getUserDashboardStats();
      setStats(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load recent activity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const transactions = stats?.lastTransactions || [];
  const investments = stats?.lastInvestments || [];

  // Icon map
  const typeIcons = {
    deposit: <TrendingUp size={20} className="text-green-500" />,
    withdraw: <ArrowDownRight size={20} className="text-red-500" />,
    investment: <Receipt size={20} className="text-blue-500" />,
    payout: <ArrowUpRight size={20} className="text-purple-500" />,
  };

  // Status Badge Colors
  const badgeColors = {
    success: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-[#1c1c1c]">
          Recent Transactions
        </h2>

        <button className="text-sm text-[#4456ff] hover:underline">
          View All
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="w-full flex justify-center py-6">
          <ClipLoader size={34} color="#4456ff" />
        </div>
      )}

      {/* No Data */}
      {!loading && transactions.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No recent transactions found.
        </p>
      )}

      {/* Transactions */}
      {!loading && transactions.length > 0 && (
        <div className="flex flex-col divide-y">
          {transactions.slice(0, 4).map((tx) => (
            <div
              key={tx._id}
              className="flex justify-between items-center py-3 hover:bg-gray-50 transition rounded-lg px-2"
            >
              {/* Left Section */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
                  {typeIcons[tx.type] || (
                    <Receipt size={20} className="text-gray-400" />
                  )}
                </div>

                <div>
                  <p className="font-medium capitalize">{tx.type}</p>
                  <p className="text-xs text-gray-500">
                    {tx.paymentMethod || "Wallet"}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`
                  text-xs px-3 py-1 rounded-full font-medium
                  ${badgeColors[tx.status] || "bg-gray-100 text-gray-600"}
                `}
              >
                {tx.status}
              </span>

              {/* Right Section */}
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    tx.type === "withdraw"
                      ? "text-red-500"
                      : tx.type === "deposit"
                      ? "text-green-600"
                      : "text-gray-800"
                  }`}
                >
                  {tx.type === "withdraw" ? "-" : "+"} ${" "}
                  {tx.amount.toLocaleString()}
                </p>

                <div className="flex items-center gap-1 text-[11px] text-gray-400 justify-end">
                  <Clock size={12} />
                  {new Date(tx.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============ Last Investment Section ============ */}
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-800 mb-3">
          Recent Investment
        </h3>

        {loading && (
          <div className="w-full flex justify-center py-6">
            <ClipLoader size={28} color="#4456ff" />
          </div>
        )}

        {!loading && investments.length === 0 && (
          <p className="text-gray-500 text-sm">No recent investment activity.</p>
        )}

        {!loading &&
          investments.length > 0 &&
          investments.slice(0, 1).map((inv) => (
            <div
              key={inv._id}
              className="p-4 bg-gray-50 rounded-xl border hover:bg-gray-100 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{inv.planId?.title}</p>
                  <p className="text-xs text-gray-500">
                    {inv.amount} $ invested
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    inv.status === "active"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {inv.status}
                </span>
              </div>

              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <p>
                  Start: {new Date(inv.startDate).toLocaleDateString()}
                </p>
                <p>
                  Ends: {new Date(inv.endDate).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-2 text-sm font-medium">
                Expected Return: $ {inv.expectedReturn}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
