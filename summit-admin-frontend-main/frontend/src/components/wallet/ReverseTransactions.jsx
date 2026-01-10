import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  ArrowLeftRight,
  Loader2,
  RefreshCcw,
  Undo2,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  getAllWallets,
  getWalletTransactions,
  reverseTransaction,
} from "../../services/AdminServiceAPI";

export default function ReverseTransactions() {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [loadingWallets, setLoadingWallets] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [confirmModal, setConfirmModal] = useState(null); // Holds transaction to reverse
  const [message, setMessage] = useState({ type: "", text: "" });

  /* ====================================================
     LOAD ALL WALLETS ON MOUNT
  ==================================================== */
  useEffect(() => {
    const loadWallets = async () => {
      try {
        setLoadingWallets(true);
        const res = await getAllWallets(1, 300);
        setWallets(res.data.wallets || []);
      } catch (err) {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to load wallets.",
        });
      }
      setLoadingWallets(false);
    };

    loadWallets();
  }, []);

  /* ====================================================
     LOAD TRANSACTIONS FOR SELECTED WALLET
  ==================================================== */
  const loadTransactions = async (walletId) => {
    try {
      setLoadingTransactions(true);
      const res = await getWalletTransactions(walletId);
      setTransactions(res.data || []);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to load ledger.",
      });
    }
    setLoadingTransactions(false);
  };

  /* ====================================================
     CONFIRM REVERSAL
  ==================================================== */
  const handleReverse = async () => {
    if (!confirmModal) return;

    const { walletId, transactionId } = confirmModal;

    try {
      setProcessing(true);
      const res = await reverseTransaction(walletId, transactionId);

      setMessage({ type: "success", text: res.data.message });
      await loadTransactions(walletId);

    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to reverse transaction",
      });
    }

    setProcessing(false);
    setConfirmModal(null);
  };

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <Undo2 size={28} className="text-gray-800" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Reverse Transactions
        </h2>
      </div>

      {/* MESSAGE ALERT */}
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
      <label className="text-sm text-gray-700 block mb-1 font-medium">
        Select Wallet
      </label>

      <select
        className="w-full p-3 mb-5 border bg-white rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedWallet || ""}
        onChange={(e) => {
          const id = e.target.value;
          setSelectedWallet(id);
          loadTransactions(id);
        }}
      >
        <option value="">-- Choose Wallet --</option>

        {loadingWallets ? (
          <option>Loading...</option>
        ) : (
          wallets.map((w) => (
            <option key={w._id} value={w._id}>
              {w.walletName} • {w.walletNumber}
            </option>
          ))
        )}
      </select>

      {/* TRANSACTIONS TABLE */}
      <div className="bg-white rounded-2xl shadow-lg border p-5">

        {/* TABLE HEADER */}
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ArrowLeftRight size={20} /> Transaction History
        </h3>

        {/* LOADING STATE */}
        {loadingTransactions && (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-blue-600" size={28} />
          </div>
        )}

        {/* NO TRANSACTIONS */}
        {!loadingTransactions && transactions.length === 0 && (
          <p className="text-gray-500 text-center py-6">
            No transactions found
          </p>
        )}

        {/* TRANSACTION LIST */}
        {!loadingTransactions && transactions.length > 0 && (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <motion.div
                key={tx._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  p-4 rounded-xl border flex items-center justify-between
                  bg-gradient-to-br from-white to-gray-50 shadow-sm
                "
              >
                <div>
                  <p className="font-semibold capitalize">{tx.type}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(tx.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm mt-1">
                    Amount: <strong>${tx.amount}</strong>
                  </p>
                </div>

                <div className="flex flex-col items-end">

                  {/* STATUS */}
                  {tx.reversed ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                      Reversed
                    </span>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() =>
                        setConfirmModal({
                          walletId: selectedWallet,
                          transactionId: tx._id,
                        })
                      }
                      className="
                        px-4 py-2 bg-red-600 text-white rounded-lg text-xs
                        hover:bg-red-700 shadow
                      "
                    >
                      Reverse
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* CONFIRMATION MODAL */}
      <AnimatePresence>
        {confirmModal && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* MODAL */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-3">
                  Confirm Transaction Reversal
                </h3>
                <p className="text-sm text-gray-600 mb-5">
                  Are you sure you want to reverse this transaction?
                </p>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setConfirmModal(null)}
                    className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleReverse}
                    disabled={processing}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 disabled:opacity-40"
                  >
                    {processing ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Undo2 size={16} />
                    )}
                    Reverse
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

