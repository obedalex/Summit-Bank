import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  User,
  ArrowDownCircle,
  ArrowUpCircle,
  Lock,
  Unlock,
  Settings,
  RefreshCcw,
  Loader2,
  Search,
} from "lucide-react";

import {
  getAllWallets,
  getSingleWallet,
  freezeWallet,
  unfreezeWallet,
} from "../../services/AdminServiceAPI";

import { useNavigate } from "react-router-dom";

export default function SingleWallet() {
  const navigate = useNavigate();

  /* ============================================
      STATE
  ============================================ */
  const [wallets, setWallets] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const [search, setSearch] = useState("");
  const [selectModal, setSelectModal] = useState(true);

  const [error, setError] = useState("");

  /* ============================================
      LOAD ALL WALLETS FIRST
  ============================================ */
  const loadWalletList = async () => {
    try {
      setLoadingList(true);
      const res = await getAllWallets(1, 50, "");
      setWallets(res.data.wallets || []);
    } catch (err) {
      console.log(err);
    }
    setLoadingList(false);
  };

  useEffect(() => {
    loadWalletList();
  }, []);

  /* ============================================
      LOAD SELECTED WALLET DETAILS
  ============================================ */
  const loadWallet = async (id) => {
    try {
      setLoading(true);
      setError("");

      const res = await getSingleWallet(id);
      setWallet(res?.data?.wallet || null);
      setUser(res?.data?.user || null);

      setSelectModal(false);

    } catch (err) {
      setError("Failed to load wallet data");
    }
    setLoading(false);
  };

  /* ============================================
      FREEZE / UNFREEZE
  ============================================ */
  const handleFreeze = async () => {
    if (!wallet?._id) return;
    setLoadingAction(true);
    try {
      await freezeWallet(wallet._id);
      await loadWallet(wallet._id);
    } catch (err) {}
    setLoadingAction(false);
  };

  const handleUnfreeze = async () => {
    if (!wallet?._id) return;
    setLoadingAction(true);
    try {
      await unfreezeWallet(wallet._id);
      await loadWallet(wallet._id);
    } catch (err) {}
    setLoadingAction(false);
  };

  /* ============================================
      STATUS COLOR
  ============================================ */
  const statusColor =
    wallet?.status === "active"
      ? "text-green-600 bg-green-100"
      : wallet?.status === "frozen"
      ? "text-red-600 bg-red-100"
      : "text-yellow-600 bg-yellow-100";

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Wallet size={28} className="text-gray-800" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Wallet Overview
          </h2>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow"
          onClick={() => setSelectModal(true)}
        >
          Change Wallet
        </motion.button>
      </div>

      {/* ERROR */}
      {error && (
        <p className="p-3 text-red-600 bg-red-100 border border-red-300 rounded-lg mb-4">
          {error}
        </p>
      )}

      {/* SELECT WALLET MODAL */}
      <AnimatePresence>
        {selectModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectModal(false)}
            />

            <motion.div
              className="fixed inset-0 flex justify-center items-center z-50 px-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  Select Wallet
                </h3>

                {/* SEARCH */}
                <div className="relative mb-4">
                  <Search
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search wallet..."
                    className="w-full pl-10 pr-3 py-2 border rounded-xl bg-gray-50"
                  />
                </div>

                {/* WALLET LIST */}
                <div className="max-h-72 overflow-y-auto space-y-3">
                  {loadingList ? (
                    <Loader2 className="animate-spin mx-auto my-10 text-blue-600" />
                  ) : (
                    wallets
                      .filter((w) =>
                        w.walletName.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((w) => (
                        <motion.div
                          whileTap={{ scale: 0.97 }}
                          key={w._id}
                          onClick={() => loadWallet(w._id)}
                          className="border p-3 rounded-xl bg-white hover:bg-gray-100 cursor-pointer flex justify-between"
                        >
                          <div>
                            <p className="font-semibold">{w.walletName}</p>
                            <p className="text-xs text-gray-500">{w.walletNumber}</p>
                          </div>

                          <p className="font-bold">{w.currency}{w.balance}</p>
                        </motion.div>
                      ))
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* LOADING SELECTED WALLET */}
      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 size={28} className="animate-spin text-blue-600" />
        </div>
      )}

      {/* NO WALLET SELECTED */}
      {!loading && !wallet && (
        <p className="text-gray-500 text-center py-10">
          Select a wallet to view its details.
        </p>
      )}

      {/* WALLET UI */}
      {!loading && wallet && (
        <>
          {/* ---- Top Info Cards ---- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* WALLET CARD */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow border"
            >
              <p className="text-sm text-gray-500">Wallet Name</p>
              <h3 className="text-xl font-semibold">{wallet?.walletName}</h3>

              <p className="text-sm text-gray-500 mt-3">Wallet Number</p>
              <p className="font-mono text-lg">{wallet?.walletNumber}</p>

              <div className="mt-4">
                <span className={`${statusColor} px-3 py-1 text-xs rounded-lg`}>
                  {wallet?.status?.toUpperCase()}
                </span>
              </div>

              <p className="mt-4 text-xs text-gray-500">Balance</p>
              <h2 className="text-3xl font-bold">
                {wallet?.currency} {wallet?.balance?.toLocaleString()}
              </h2>
            </motion.div>

            {/* USER CARD */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow border"
            >
              <div className="flex items-center gap-3 mb-3">
                <User size={20} className="text-gray-700" />
                <h3 className="text-lg font-semibold">Owner Information</h3>
              </div>

              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user?.fullName}</p>

              <p className="text-sm text-gray-500 mt-3">Email</p>
              <p className="font-medium">{user?.email}</p>

              <p className="text-sm text-gray-500 mt-3">Phone</p>
              <p className="font-medium">{user?.phone}</p>
            </motion.div>

            {/* QUICK ACTIONS */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow border"
            >
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

              <div className="grid grid-cols-2 gap-3">
                <ActionBtn
                  label="Credit"
                  icon={<ArrowDownCircle size={20} />}
                  color="bg-green-600"
                  onClick={() =>
                    navigate(`/admin/wallets/credit?wallet=${wallet._id}`)
                  }
                />

                <ActionBtn
                  label="Debit"
                  icon={<ArrowUpCircle size={20} />}
                  color="bg-yellow-600"
                  onClick={() =>
                    navigate(`/admin/wallets/debit?wallet=${wallet._id}`)
                  }
                />

                <ActionBtn
                  label="Reverse"
                  icon={<RefreshCcw size={20} />}
                  color="bg-purple-600"
                  onClick={() =>
                    navigate(`/admin/wallets/reverse?wallet=${wallet._id}`)
                  }
                />

                <ActionBtn
                  label="Settings"
                  icon={<Settings size={20} />}
                  color="bg-gray-700"
                  onClick={() =>
                    navigate(`/admin/wallets/settings/${wallet._id}`)
                  }
                />

                {wallet?.status !== "frozen" ? (
                  <ActionBtn
                    label="Freeze"
                    icon={<Lock size={20} />}
                    color="bg-red-600"
                    loading={loadingAction}
                    onClick={handleFreeze}
                  />
                ) : (
                  <ActionBtn
                    label="Unfreeze"
                    icon={<Unlock size={20} />}
                    color="bg-blue-600"
                    loading={loadingAction}
                    onClick={handleUnfreeze}
                  />
                )}
              </div>
            </motion.div>

          </div>

          {/* ---- Transaction History ---- */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 mt-8 rounded-2xl shadow border"
          >
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>

            {!wallet?.ledger || wallet?.ledger.length === 0 ? (
              <p className="text-gray-500 text-sm">No transactions yet.</p>
            ) : (
              <div className="space-y-3">
                {wallet.ledger
                  .slice(-5)
                  .reverse()
                  .map((tx) => (
                    <div
                      key={tx._id}
                      className="p-4 rounded-xl border bg-gray-50 flex justify-between"
                    >
                      <div>
                        <p className="font-semibold">{tx.type}</p>
                        {tx.memo && (
                          <p className="text-xs text-gray-500">{tx.memo}</p>
                        )}
                      </div>

                      <p
                        className={`font-bold ${
                          tx.type.includes("withdraw")
                            ? "text-red-600"
                            : tx.type.includes("reverse")
                            ? "text-purple-600"
                            : "text-green-600"
                        }`}
                      >
                        {tx.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}

/* ============================
   ACTION BUTTON
============================ */
function ActionBtn({ label, icon, color, onClick, loading }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      disabled={loading}
      onClick={onClick}
      className={`flex flex-col items-center p-4 rounded-xl text-white ${color} shadow-md`}
    >
      {loading ? <Loader2 className="animate-spin" /> : icon}
      <span className="text-xs mt-1">{label}</span>
    </motion.button>
  );
}
