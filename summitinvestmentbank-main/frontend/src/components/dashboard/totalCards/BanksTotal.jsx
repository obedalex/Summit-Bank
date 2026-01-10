import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Landmark } from "lucide-react";
import { getBankSummary } from "../../../services/bankServices/bankAPI";

/* ============================
   SHIMMER
============================ */
function ShimmerCard() {
  return (
    <div className="h-[150px] rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse shadow-md" />
  );
}

export default function BanksTotal() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSummary = async () => {
    try {
      const res = await getBankSummary();
      setSummary(res.data);
    } catch (err) {
      console.log("Error loading summary:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSummary();
  }, []);

  if (loading || !summary) return <ShimmerCard />;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        relative overflow-hidden rounded-xl px-5 py-4 shadow-lg flex items-center justify-between
        bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500
        text-white h-[120px] mb-2
      "
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/20 blur-2xl opacity-20"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10 blur-2xl opacity-20"></div>

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-between h-full py-1">
        {/* Title */}
        <h2 className="text-sm font-medium tracking-wide opacity-90">
          Bank Summary
        </h2>

        {/* Numbers */}
        <div className="space-y-1">
          <p className="text-xs opacity-80">Total Banks</p>
          <p className="text-xl font-bold">{summary.totalBanks}</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-end justify-between h-full py-1 text-right">
        {/* Total balance */}
        <div>
          <p className="text-xs opacity-80">Total Balance</p>
          <p className="text-xl font-bold text-green-200">
            {summary.formattedBalance}
          </p>
        </div>

        {/* Icon */}
        <div className="p-2.5 rounded-lg bg-white/20 shadow-inner backdrop-blur-md">
          <Wallet size={22} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}
