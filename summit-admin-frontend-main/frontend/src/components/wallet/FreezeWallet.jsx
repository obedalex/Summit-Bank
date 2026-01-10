import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Snowflake,
  Lock,
  Unlock,
  Loader2,
  Search,
  Shield,
} from "lucide-react";

import {
  getAllWallets,
  freezeWallet,
  unfreezeWallet,
} from "../../services/AdminServiceAPI";

export default function FreezeWallet() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedWallet, setSelectedWallet] = useState(null);
  const [actionModal, setActionModal] = useState(null); // { type: 'freeze' | 'unfreeze' }
  const [processing, setProcessing] = useState(false);

  const [message, setMessage] = useState({ type: "", text: "" });

  /* ============================================================
     LOAD ALL WALLETS
  ============================================================ */
  const loadWallets = async () => {
    try {
      setLoading(true);
      const res = await getAllWallets();
      setWallets(res.data.wallets);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to load wallets",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadWallets();
  }, []);

  /* ============================================================
     PERFORM FREEZE / UNFREEZE ACTION
  ============================================================ */
  const handleAction = async () => {
    if (!selectedWallet) return;

    setProcessing(true);
    setMessage({ type: "", text: "" });

    try {
      if (actionModal.type === "freeze") {
        await freezeWallet(selectedWallet._id);
      } else {
        await unfreezeWallet(selectedWallet._id);
      }

      setMessage({
        type: "success",
        text:
          actionModal.type === "freeze"
            ? "Wallet frozen successfully"
            : "Wallet unfrozen successfully",
      });

      setActionModal(null);
      loadWallets();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Action failed",
      });
    }

    setProcessing(false);
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <Snowflake size={26} className="text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Freeze / Unfreeze Wallet
        </h2>
      </div>

      {/* ALERT */}
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

      {/* SEARCH */}
      <div className="relative mb-5">
        <Search size={18} className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search wallet name or number..."
          className="w-full pl-10 pr-3 py-3 rounded-xl bg-white shadow-md border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* WALLET LIST */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-blue-600" size={28} />
        </div>
      ) : (
        <div className="space-y-3">
          {wallets
            .filter(
              (w) =>
                w.walletName.toLowerCase().includes(search.toLowerCase()) ||
                w.walletNumber.toLowerCase().includes(search.toLowerCase())
            )
            .map((wallet) => (
              <motion.div
                key={wallet._id}
                whileTap={{ scale: 0.97 }}
                className="p-4 rounded-xl border shadow-sm bg-white flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedWallet(wallet)}
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {wallet.walletName}
                  </p>
                  <p className="text-sm text-gray-500">{wallet.walletNumber}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    wallet.status === "active"
                      ? "bg-green-100 text-green-700"
                      : wallet.status === "frozen"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {wallet.status}
                </span>
              </motion.div>
            ))}
        </div>
      )}

      {/* ACTION BUTTONS */}
      {selectedWallet && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-5 bg-white rounded-2xl shadow-lg border"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield size={20} /> Wallet Controls
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* FREEZE */}
            <button
              disabled={selectedWallet.status === "frozen"}
              onClick={() =>
                setActionModal({ type: "freeze", wallet: selectedWallet })
              }
              className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:bg-red-300 flex items-center justify-center gap-2"
            >
              <Lock size={18} /> Freeze Wallet
            </button>

            {/* UNFREEZE */}
            <button
              disabled={selectedWallet.status === "active"}
              onClick={() =>
                setActionModal({ type: "unfreeze", wallet: selectedWallet })
              }
              className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 disabled:bg-green-300 flex items-center justify-center gap-2"
            >
              <Unlock size={18} /> Unfreeze Wallet
            </button>
          </div>
        </motion.div>
      )}

      {/* CONFIRMATION MODAL */}
      <AnimatePresence>
        {actionModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActionModal(null)}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  {actionModal.type === "freeze"
                    ? "Freeze Wallet"
                    : "Unfreeze Wallet"}
                </h3>

                <p className="text-sm text-gray-600 mb-5">
                  Are you sure you want to{" "}
                  <strong>
                    {actionModal.type === "freeze"
                      ? "freeze"
                      : "unfreeze"}
                  </strong>{" "}
                  this wallet?
                </p>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setActionModal(null)}
                    className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleAction}
                    disabled={processing}
                    className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2"
                  >
                    {processing ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Shield size={18} />
                    )}
                    Confirm
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
