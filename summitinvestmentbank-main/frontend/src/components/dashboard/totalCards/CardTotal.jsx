import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Wallet } from "lucide-react";
import { getCardSummary } from "../../../services/cardServices/CardServiceAPI";

/* ============================================================
   SHIMMER
============================================================ */
function ShimmerCardTotal() {
  return (
    <div className="w-full h-[150px] bg-white rounded-2xl shadow-md p-5 animate-pulse">
      <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
      <div className="h-7 w-40 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 w-24 bg-gray-200 rounded"></div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function CardTotal() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSummary = async () => {
    try {
      setLoading(true);
      const res = await getCardSummary();
      setSummary(res.data);
    } catch (err) {
      console.log("Failed to load card summary:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSummary();
  }, []);

  if (loading || !summary) return <ShimmerCardTotal />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mb-2 h-[130px] bg-gradient-to-br from-[#0E1217] to-[#1A1F25] rounded-2xl shadow-lg p-5 text-white flex flex-col justify-between"
    >
      {/* TITLE */}
      <div className="flex items-center gap-2">
        <Wallet size={18} className="text-blue-400" />
        <h3 className="text-sm font-medium tracking-wide opacity-90">
          Total Card Balance
        </h3>
      </div>

      {/* BALANCE */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {summary.formattedBalance}
        </h2>
        <p className="text-[11px] opacity-70 mt-1">
          Across {summary.totalCards} cards
        </p>
      </div>

      {/* ICON ROW */}
      <div className="flex justify-end">
        <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
          <CreditCard size={20} className="text-blue-300" />
        </div>
      </div>
    </motion.div>
  );
}
