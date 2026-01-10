import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Loader2,
  Search,
  List,
  Pencil,
  X
} from "lucide-react";

import {
  getAllWallets,
  getWalletTransactions,
  editTransactions
} from "../../services/AdminServiceAPI";

export default function WalletTransactions() {
  const [wallets, setWallets] = useState([]);
  const [loadingWallets, setLoadingWallets] = useState(true);

  const [selectedWallet, setSelectedWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingTx, setLoadingTx] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [modalSelectWallet, setModalSelectWallet] = useState(false);
  const [modalEditTx, setModalEditTx] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  /* -----------------------------------------------------------
     LOAD WALLETS
  ----------------------------------------------------------- */
  const loadWallets = async () => {
    setLoadingWallets(true);
    try {
      const res = await getAllWallets();
      setWallets(res.data.wallets);
    } catch (err) {
      setError("Failed to load wallets");
    }
    setLoadingWallets(false);
  };

  useEffect(() => {
    loadWallets();
  }, []);

  /* -----------------------------------------------------------
     LOAD TRANSACTIONS
  ----------------------------------------------------------- */
  const loadTransactions = async (walletId) => {
    setLoadingTx(true);
    try {
      const res = await getWalletTransactions(walletId);
      setTransactions(res.data.reverse());
    } catch (err) {
      setError("Failed to load transactions");
    }
    setLoadingTx(false);
  };

  const handleSelectWallet = (wallet) => {
    setSelectedWallet(wallet);
    loadTransactions(wallet._id);
    setModalSelectWallet(false);
  };

  /* -----------------------------------------------------------
     FILTER TRANSACTIONS
  ----------------------------------------------------------- */
  const filteredTx = transactions.filter((tx) => {
    const matchesSearch =
      tx.type.toLowerCase().includes(search.toLowerCase()) ||
      (tx.memo || "").toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "credit") return tx.type.includes("transfer-in");
    if (filter === "debit") return tx.type.includes("withdraw");
    if (filter === "reversed") return tx.reversed === true;

    return true;
  });

  /* -----------------------------------------------------------
     OPEN EDIT MODAL
  ----------------------------------------------------------- */
  const openEditModal = (tx) => {
    setEditingTx(tx);
    setModalEditTx(true);
  };

  /* -----------------------------------------------------------
     SAVE EDITED TRANSACTION
  ----------------------------------------------------------- */
  const handleSaveEdit = async (form) => {
    setSaving(true);
    try {
      await editTransactions(selectedWallet._id, editingTx._id, form);

      await loadTransactions(selectedWallet._id);
      setModalEditTx(false);
      setEditingTx(null);
    } catch (err) {
      setError("Failed to update transaction");
    }
    setSaving(false);
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <List size={26} className="text-gray-800" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Wallet Transactions (Ledger)
        </h2>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg">
          {error}
        </div>
      )}

      {/* SELECT WALLET BUTTON */}
      <button
        onClick={() => setModalSelectWallet(true)}
        className="w-full px-4 py-3 rounded-xl shadow border bg-white flex justify-between items-center mb-5"
      >
        <span className="text-gray-700 text-sm">
          {selectedWallet
            ? `${selectedWallet.walletName} • ${selectedWallet.walletNumber}`
            : "Select Wallet"}
        </span>
        <Wallet size={20} className="text-gray-600" />
      </button>

      {/* SEARCH + FILTER */}
      {selectedWallet && (
        <div className="mb-5">
          <div className="relative mb-3">
            <Search className="absolute top-3 left-3 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search transaction type, memo..."
              className="w-full pl-10 py-3 bg-white border rounded-xl shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {["all", "credit", "debit", "reversed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm border ${
                  filter === f ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TRANSACTION LIST */}
      {loadingTx ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-blue-600" size={28} />
        </div>
      ) : selectedWallet ? (
        <div className="space-y-3">
          {filteredTx.map((tx) => (
            <motion.div
              key={tx._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white rounded-xl shadow border cursor-pointer hover:bg-gray-50"
              onClick={() => openEditModal(tx)}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{tx.type}</p>
                  <p className="text-xs text-gray-500">{tx.reference}</p>
                  {tx.memo && (
                    <p className="text-xs text-gray-600 mt-1">{tx.memo}</p>
                  )}
                </div>

                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      tx.type.includes("withdraw")
                        ? "text-red-600"
                        : tx.type.includes("reverse")
                        ? "text-purple-600"
                        : "text-green-600"
                    }`}
                  >
                    {tx.amount.toLocaleString()}
                  </p>

                  {tx.reversed && (
                    <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-lg">
                      Reversed
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-2 text-xs text-gray-500">
                {new Date(tx.createdAt).toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          Select a wallet to view its transactions.
        </p>
      )}

      {/* SELECT WALLET MODAL */}
      <SelectWalletModal
        visible={modalSelectWallet}
        onClose={() => setModalSelectWallet(false)}
        wallets={wallets}
        loading={loadingWallets}
        onSelect={handleSelectWallet}
      />

      {/* EDIT TRANSACTION MODAL */}
      <EditTransactionModal
        visible={modalEditTx}
        onClose={() => setModalEditTx(false)}
        tx={editingTx}
        saving={saving}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

/* ================================================================
   SELECT WALLET MODAL
================================================================ */
function SelectWalletModal({ visible, onClose, wallets, loading, onSelect }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Select Wallet
              </h3>

              {loading ? (
                <Loader2 className="animate-spin text-blue-600 mx-auto my-5" />
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {wallets.map((wallet) => (
                    <motion.div
                      key={wallet._id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelect(wallet)}
                      className="p-4 border rounded-xl shadow-sm bg-white hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {wallet.walletName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {wallet.walletNumber}
                          </p>
                        </div>
                        <p className="text-sm font-bold">
                          {wallet.currency}
                          {wallet.balance.toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ================================================================
   EDIT TRANSACTION MODAL
================================================================ */
function EditTransactionModal({ visible, onClose, tx, saving, onSave }) {
  const [memo, setMemo] = useState("");
  const [reference, setReference] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    if (tx) {
      setMemo(tx.memo || "");
      setReference(tx.reference || "");
      setCreatedAt(tx.createdAt ? tx.createdAt.substring(0, 16) : "");
    }
  }, [tx]);

  if (!visible || !tx) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ memo, reference, createdAt });
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Edit Transaction
                </h3>
                <button type="button" onClick={onClose}>
                  <X size={22} className="text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              {/* Memo */}
              <div>
                <label className="text-sm text-gray-600">Memo</label>
                <input
                  type="text"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full p-3 border rounded-xl bg-gray-50 mt-1"
                />
              </div>

              {/* Reference */}
              <div>
                <label className="text-sm text-gray-600">Reference</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full p-3 border rounded-xl bg-gray-50 mt-1"
                />
              </div>

              {/* Date */}
              <div>
                <label className="text-sm text-gray-600">Date</label>
                <input
                  type="datetime-local"
                  value={createdAt}
                  onChange={(e) =>
                    setCreatedAt(e.target.value)
                  }
                  className="w-full p-3 border rounded-xl bg-gray-50 mt-1"
                />
              </div>

              {/* Save button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={saving}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold flex justify-center items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Pencil size={18} />
                    Save Changes
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
