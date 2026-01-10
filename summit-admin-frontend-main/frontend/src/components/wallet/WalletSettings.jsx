import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Loader2,
  Trash,
  Save,
  Shield,
} from "lucide-react";

import {
  getAllWallets,
  getSingleWallet,
  updateWallet,
  deleteWallet,
  setWalletLimits,
} from "../../services/AdminServiceAPI";

export default function WalletSettings() {
  const [walletList, setWalletList] = useState([]);
  const [selectedWalletId, setSelectedWalletId] = useState("");

  const [wallet, setWallet] = useState(null);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [deleteModal, setDeleteModal] = useState(false);

  /* FORM FIELDS */
  const [walletName, setWalletName] = useState("");
  const [status, setStatus] = useState("");
  const [currency, setCurrency] = useState("");
  const [cardholder, setCardholder] = useState("");

  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");

  const [maxDailyTransfer, setMaxDailyTransfer] = useState("");
  const [maxSingleTransfer, setMaxSingleTransfer] = useState("");

  /* ============================================================
     LOAD ALL WALLETS FOR DROPDOWN
  ============================================================ */
  const loadWalletList = async () => {
    try {
      const res = await getAllWallets(1, 1000, "");
      setWalletList(res.data.wallets);
    } catch (err) {
      console.log(err);
    }
  };

  /* ============================================================
     LOAD A SINGLE WALLET WHEN SELECTED
  ============================================================ */
  const loadWalletDetails = async (walletId) => {
    if (!walletId) return;

    try {
      setLoadingWallet(true);
      const res = await getSingleWallet(walletId);
      const w = res.data.wallet;

      setWallet(w);
      setWalletName(w.walletName || "");
      setStatus(w.status || "");
      setCurrency(w.currency || "");
      setCardholder(w.cardholder || "");

      setExpMonth(w.expMonth || "");
      setExpYear(w.expYear || "");

      setMaxDailyTransfer(w.limits?.maxDailyTransfer || "");
      setMaxSingleTransfer(w.limits?.maxSingleTransfer || "");
    } catch (err) {
      setMessage({ type: "error", text: "Failed to load wallet info" });
    }

    setLoadingWallet(false);
  };

  useEffect(() => {
    loadWalletList();
  }, []);

  useEffect(() => {
    if (selectedWalletId) loadWalletDetails(selectedWalletId);
  }, [selectedWalletId]);

  /* ============================================================
     SAVE GENERAL SETTINGS
  ============================================================ */
  const handleSave = async () => {
    setSaving(true);
    try {
      await updateWallet(selectedWalletId, {
        walletName,
        status,
        currency,
        cardholder,
        expMonth,
        expYear,
      });
      setMessage({ type: "success", text: "Wallet updated successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Update failed",
      });
    }
    setSaving(false);
  };

  /* ============================================================
     SAVE LIMITS
  ============================================================ */
  const handleSaveLimits = async () => {
    setSaving(true);
    try {
      await setWalletLimits(selectedWalletId, {
        maxDailyTransfer,
        maxSingleTransfer,
      });
      setMessage({ type: "success", text: "Limits updated successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Failed to update limits",
      });
    }
    setSaving(false);
  };

  /* ============================================================
     DELETE WALLET
  ============================================================ */
  const handleDeleteWallet = async () => {
    try {
      await deleteWallet(selectedWalletId);
      setMessage({ type: "success", text: "Wallet deleted" });
      setSelectedWalletId("");
      setWallet(null);
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete wallet" });
    }
  };

  /* ============================================================
     UI
  ============================================================ */
  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <Settings size={26} className="text-gray-800" />
        <h2 className="text-2xl font-semibold text-gray-800">Wallet Settings</h2>
      </div>

      {/* ALERT */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            message.type === "error"
              ? "bg-red-100 text-red-700 border"
              : "bg-green-100 text-green-700 border"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* WALLET SELECTOR */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700">Select Wallet</label>
        <select
          className="w-full p-3 mt-1 rounded-lg border bg-gray-50"
          value={selectedWalletId}
          onChange={(e) => setSelectedWalletId(e.target.value)}
        >
          <option value="">-- Choose Wallet --</option>
          {walletList.map((w) => (
            <option key={w._id} value={w._id}>
              {w.walletName} — {w.walletNumber}
            </option>
          ))}
        </select>
      </div>

      {/* NO WALLET SELECTED */}
      {!selectedWalletId && (
        <p className="text-gray-500 text-center py-10">
          Select a wallet to configure settings.
        </p>
      )}

      {/* WALLET SETTINGS */}
      {selectedWalletId && (
        <>
          {loadingWallet ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-blue-600" size={28} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* LEFT - GENERAL SETTINGS */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl shadow-lg border"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield size={20} /> General Settings
                </h3>

                <InputField label="Wallet Name" value={walletName} onChange={setWalletName} />
                <SelectField
                  label="Status"
                  value={status}
                  onChange={setStatus}
                  options={["active", "pending", "frozen", "blocked"]}
                />
                <InputField label="Cardholder" value={cardholder} onChange={setCardholder} />
                <InputField label="Currency" value={currency} onChange={setCurrency} />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <InputField label="Exp Month" value={expMonth} type="number" onChange={setExpMonth} />
                  <InputField label="Exp Year" value={expYear} type="number" onChange={setExpYear} />
                </div>

                <SaveButton saving={saving} text="Save Settings" onClick={handleSave} />
              </motion.div>

              {/* RIGHT - LIMITS + DELETE */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl shadow-lg border"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield size={20} /> Wallet Limits
                </h3>

                <InputField
                  label="Max Daily Transfer"
                  type="number"
                  value={maxDailyTransfer}
                  onChange={setMaxDailyTransfer}
                />

                <InputField
                  label="Max Single Transfer"
                  type="number"
                  value={maxSingleTransfer}
                  onChange={setMaxSingleTransfer}
                />

                <SaveButton saving={saving} text="Save Limits" onClick={handleSaveLimits} />

                {/* DELETE */}
                <div className="mt-10">
                  <h3 className="text-lg font-semibold text-red-600 mb-4">
                    Danger Zone
                  </h3>

                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setDeleteModal(true)}
                    className="px-4 py-3 w-full text-white rounded-xl bg-red-600"
                  >
                    <Trash size={18} /> Delete Wallet
                  </motion.button>
                </div>
              </motion.div>

            </div>
          )}
        </>
      )}

      {/* DELETE MODAL */}
      <AnimatePresence>
        {deleteModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteModal(false)}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-3 text-red-600">Confirm Delete</h3>
                <p className="text-sm text-gray-600 mb-5">This will soft-delete the wallet.</p>

                <div className="flex gap-3 justify-end">
                  <button onClick={() => setDeleteModal(false)} className="px-4 py-2 rounded-lg border">
                    Cancel
                  </button>
                  <button onClick={handleDeleteWallet} className="px-4 py-2 rounded-lg bg-red-600 text-white">
                    Delete
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

/* REUSABLE FIELDS */
function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-700 font-medium mb-1 block">{label}</label>
      <input
        type={type}
        className="w-full p-3 rounded-lg border bg-gray-50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-700 font-medium mb-1 block">{label}</label>
      <select
        className="w-full p-3 rounded-lg border bg-gray-50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}

function SaveButton({ onClick, saving, text }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      disabled={saving}
      onClick={onClick}
      className="mt-4 w-full py-3 rounded-xl bg-blue-600 text-white flex items-center justify-center gap-2"
    >
      {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
      {text}
    </motion.button>
  );
}
