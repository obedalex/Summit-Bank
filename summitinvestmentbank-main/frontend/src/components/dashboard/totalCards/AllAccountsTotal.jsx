import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Landmark, CreditCard, Eye, EyeOff } from "lucide-react";

import { getWallet } from "../../../services/walletServices/WalletAPI";
import { getBankSummary } from "../../../services/bankServices/bankAPI";
import { getCardSummary } from "../../../services/cardServices/CardServiceAPI";

/* ============================================================
   SHIMMER CARD
============================================================ */
function ShimmerTotalCard() {
  return (
    <div className="w-full bg-white h-[180px] rounded-2xl shadow-md p-5 flex flex-col justify-between animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded"></div>
      <div className="h-6 w-40 bg-gray-200 rounded"></div>
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-28 bg-gray-200 rounded"></div>
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function AllAccountsTotal() {
  const [loading, setLoading] = useState(true);
  const [walletTotal, setWalletTotal] = useState(0);
  const [bankSummary, setBankSummary] = useState(null);
  const [cardSummary, setCardSummary] = useState(null);

  const [showTotal, setShowTotal] = useState(false); // 👈 NEW TOGGLE STATE

  const loadTotals = async () => {
    try {
      setLoading(true);

      const w = await getWallet();
      const b = await getBankSummary();
      const c = await getCardSummary();

      setWalletTotal(w.data.balance || 0);
      setBankSummary(b.data);
      setCardSummary(c.data);
    } catch (err) {
      console.log("Summary error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTotals();
  }, []);

  if (loading || !bankSummary || !cardSummary) {
    return <ShimmerTotalCard />;
  }

  const grandTotal =
    walletTotal +
    (bankSummary.totalBalance || 0) +
    (cardSummary.totalBalance || 0);

  const grandFormatted = grandTotal.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        w-full 
        h-fit 
        bg-white 
        rounded-2xl 
        shadow-lg 
        p-5 
        flex flex-col 
        justify-between
      "
    >
      {/* TOP TITLE */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-700">Total Financial Summary</h3>

        {/* SHOW/HIDE BUTTON */}
        <button
          onClick={() => setShowTotal((prev) => !prev)}
          className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition"
        >
          {showTotal ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* GRAND TOTAL */}
      <div className="mt-1">
        <h1 className="text-xl font-bold text-gray-900">
          {showTotal ? grandFormatted : "•••••••••"}
        </h1>

        <p className="text-[11px] text-gray-500">
          Total across wallet, banks & cards
        </p>
      </div>

      {/* BREAKDOWN (VERTICAL STACK) */}
      <div className="flex flex-col gap-2 pt-1">

        {/* Wallet */}
        <div className="flex items-center gap-2">
          <Wallet size={18} className="text-blue-600" />
          <div className="flex flex-col leading-tight">
            <p className="text-[11px] text-gray-500">Wallet</p>
            <p className="text-sm font-semibold">
              {showTotal ? `$${walletTotal.toLocaleString()}` : "••••"}
            </p>
          </div>
        </div>

        {/* Banks */}
        <div className="flex items-center gap-2">
          <Landmark size={18} className="text-green-600" />
          <div className="flex flex-col leading-tight">
            <p className="text-[11px] text-gray-500">
              Banks ({bankSummary.totalBanks})
            </p>
            <p className="text-sm font-semibold">
              {showTotal ? `$${bankSummary.totalBalance.toLocaleString()}` : "••••"}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="flex items-center gap-2">
          <CreditCard size={18} className="text-purple-600" />
          <div className="flex flex-col leading-tight">
            <p className="text-[11px] text-gray-500">
              Cards ({cardSummary.totalCards})
            </p>
            <p className="text-sm font-semibold">
              {showTotal ? `$${cardSummary.totalBalance.toLocaleString()}` : "••••"}
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
