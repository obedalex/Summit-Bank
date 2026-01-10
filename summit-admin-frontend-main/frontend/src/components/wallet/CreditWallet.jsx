import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Search,
  Loader2,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

import {
  getAllWallets,
  creditWallet,
} from "../../services/AdminServiceAPI";

export default function CreditWallet() {
  const [wallets, setWallets] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const [loadingWallets, setLoadingWallets] = useState(true);
  const [sending, setSending] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [message, setMessage] = useState({ type: "", text: "" });

  /* ==========================================
     Load Wallets from API
  ========================================== */
  useEffect(() => {
    const loadWallets = async () => {
      try {
        setLoadingWallets(true);
        const res = await getAllWallets(1, 500);
        setWallets(res.data.wallets || []);
      } catch (err) {
        console.error(err);
        setMessage({
          type: "error",
          text: err?.response?.data?.message || "Failed to load wallets",
        });
      } finally {
        setLoadingWallets(false);
      }
    };

    loadWallets();
  }, []);

  /* ==========================================
     Handle Credit Submission (REAL API)
  ========================================== */
  const handleCredit = async () => {
    if (!selectedWallet)
      return setMessage({ type: "error", text: "Select a wallet first." });

    if (!amount || amount <= 0)
      return setMessage({ type: "error", text: "Enter a valid amount." });

    setSending(true);
    setMessage({ type: "", text: "" });

    try {
      const data = { amount: Number(amount), memo };

      const res = await creditWallet(selectedWallet._id, data);

      setMessage({
        type: "success",
        text: res.data.message || "Wallet credited successfully!",
      });

      setAmount("");
      setMemo("");
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Error crediting wallet",
      });
    }

    setSending(false);
  };

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <Wallet size={26} className="text-gray-800" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Credit Wallet
        </h2>
      </div>

      {/* ALERT MESSAGE */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            message.type === "error"
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* SELECT WALLET */}
      <div className="mb-5">
        <label className="text-sm text-gray-700 mb-1 block font-medium">
          Select Wallet
        </label>
        <button
          onClick={() => setShowWalletModal(true)}
          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 flex justify-between items-center shadow-sm hover:bg-gray-50"
        >
          <span className="text-sm text-gray-700">
            {selectedWallet
              ? `${selectedWallet.walletName} • ${selectedWallet.walletNumber}`
              : "Choose wallet"}
          </span>

          <ArrowRight size={18} className="text-gray-500" />
        </button>
      </div>

      {/* AMOUNT */}
      <div className="mb-5">
        <label className="text-sm text-gray-700 mb-1 block font-medium">
          Amount
        </label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* MEMO */}
      <div className="mb-6">
        <label className="text-sm text-gray-700 mb-1 block font-medium">
          Memo (Optional)
        </label>
        <textarea
          rows={2}
          placeholder="Write memo here..."
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* SUBMIT BTN */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleCredit}
        disabled={sending}
        className="
          w-full py-3 rounded-xl text-white font-semibold
          bg-blue-600 hover:bg-blue-700 shadow-lg 
          flex items-center justify-center gap-2
          disabled:opacity-40
        "
      >
        {sending ? (
          <Loader2 size={18} className="animate-spin text-white" />
        ) : (
          <>
            <CheckCircle size={18} /> Credit Wallet
          </>
        )}
      </motion.button>

      {/* WALLET PICKER MODAL */}
      <WalletPickerModal
        open={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        wallets={wallets}
        loading={loadingWallets}
        search={search}
        setSearch={setSearch}
        setSelectedWallet={setSelectedWallet}
      />
    </div>
  );
}

/* ============================================================
   WALLET PICKER MODAL — FULL API COMPATIBLE
============================================================ */
function WalletPickerModal({
  open,
  onClose,
  wallets,
  loading,
  search,
  setSearch,
  setSelectedWallet,
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      {/* BACKDROP */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* CONTENT */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 px-4"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
      >
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl relative">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Wallet size={20} /> Select Wallet
          </h2>

          {/* SEARCH */}
          <div className="relative mb-4">
            <Search size={16} className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search wallet..."
              className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm bg-gray-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* WALLET LIST */}
          <div className="max-h-64 overflow-y-auto space-y-3">
            {loading ? (
              <Loader2 className="animate-spin mx-auto my-5 text-blue-600" />
            ) : (
              wallets
                .filter((w) =>
                  w.walletName.toLowerCase().includes(search.toLowerCase())
                )
                .map((w) => (
                  <motion.div
                    key={w._id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSelectedWallet(w);
                      onClose();
                    }}
                    className="p-3 border rounded-xl shadow-sm bg-white hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-700">
                          {w.walletName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {w.walletNumber}
                        </p>
                      </div>

                      <span className="text-sm font-semibold">
                        {w.currency}
                        {(w.balance || 0).toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
