import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Wallet,
  Loader2,
  RefreshCcw,
  Eye,
} from "lucide-react";

import { getAllWallets, getSingleWallet } from "../../services/AdminServiceAPI";
import { useNavigate } from "react-router-dom";

export default function ViewAllWallets() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [wallets, setWallets] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  /* ==========================================
     Load Wallets (REAL API)
  ========================================== */
  const loadWallets = async () => {
    try {
      setLoading(true);
      const res = await getAllWallets(1, 200, search);
      setWallets(res.data.wallets || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadWallets();
  }, []);

  /* ==========================================
     REFRESH BUTTON
  ========================================== */
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadWallets();
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Wallet size={28} className="text-gray-800" />
          <h2 className="text-2xl font-semibold text-gray-800">
            View All Wallets
          </h2>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleRefresh}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          {refreshing ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <RefreshCcw size={18} />
          )}
        </motion.button>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-5">
        <div className="relative">
          <Search
            size={18}
            className="absolute top-3 left-3 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search wallet name or number..."
            className="
              w-full pl-10 pr-3 py-3 rounded-xl
              bg-white shadow-md border border-gray-200
              text-sm focus:ring-2 focus:ring-blue-500 outline-none
            "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* LOADING SKELETON */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* WALLET GRID */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wallets
            .filter(
              (w) =>
                w.walletName.toLowerCase().includes(search.toLowerCase()) ||
                w.walletNumber.toLowerCase().includes(search.toLowerCase())
            )
            .map((w) => (
              <WalletCard key={w._id} wallet={w} navigate={navigate} />
            ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   WALLET CARD COMPONENT — REAL API SYNCED
============================================================ */
function WalletCard({ wallet, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="
        p-5 rounded-2xl shadow-lg border border-gray-200 
        bg-gradient-to-br from-white to-gray-50 transition
      "
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{wallet.walletName}</h3>
          <p className="text-xs text-gray-500">{wallet.walletNumber}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              wallet.status === "active"
                ? "bg-green-100 text-green-700"
                : wallet.status === "frozen"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            }
          `}
        >
          {wallet.status}
        </span>
      </div>

      {/* BALANCE */}
      <div className="mb-4">
        <p className="text-xs text-gray-500">Balance</p>
        <h2 className="text-xl font-bold">
          {wallet.currency}
          {(wallet.balance || 0).toLocaleString()}
        </h2>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div>
          <p className="text-xs text-gray-500">User ID</p>
          <p className="font-medium">{wallet.userId}</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate(`/admin/wallets/${wallet._id}`)}
          className="hidden px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700"
        >
          <div className="flex items-center gap-2">
            <Eye size={16} /> View
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ============================================================
   LOADING SKELETON COMPONENT
============================================================ */
function SkeletonCard() {
  return (
    <div className="p-5 rounded-2xl shadow-lg border border-gray-200 bg-white animate-pulse">
      <div className="w-32 h-4 bg-gray-200 rounded mb-3"></div>
      <div className="w-20 h-3 bg-gray-200 rounded mb-5"></div>

      <div className="w-24 h-4 bg-gray-200 rounded mb-6"></div>

      <div className="flex justify-between items-center mt-4">
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
        <div className="w-20 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
