// CreateBankAccount.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, User, Hash, Globe, PlusCircle, X } from "lucide-react";

import {
  getAllBankList,
  addBankAccount,
} from "../../services/bankServices/bankAPI";

/* ============================================================
   SHIMMER LOADING GRID
============================================================ */
function ShimmerBankList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="p-4 bg-white border rounded-xl shadow-sm animate-pulse flex items-center gap-3"
        >
          <div className="w-12 h-12 bg-gray-200 rounded-md" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   FIXED & CLEAN INPUT FIELD 
============================================================ */
function InputField({ label, icon, value, onChange, type = "text", readOnly = false, disabled = false }) {
  return (
    <div className="w-full">
      <label className="text-sm text-gray-700 font-medium">{label}</label>

      <div
        className={`flex items-center mt-1 bg-white border border-gray-300 rounded-lg px-3 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {icon}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          readOnly={readOnly}
          disabled={disabled}
          className="w-full bg-transparent py-2 px-2 outline-none text-gray-800 text-sm"
        />
      </div>
    </div>
  );
}

/* ============================================================
   GENERATE ACCOUNT NUMBER
============================================================ */
function generateAccountNumber(swift) {
  if (!swift) return "";
  const prefix = swift.substring(0, 3).toUpperCase();
  const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
  return `${prefix}${randomDigits}`;
}

export default function CreateBankAccount() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expandedBank, setExpandedBank] = useState(null);

  // Form fields
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  /* ============================================================
       LOAD BANKS
  ============================================================ */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getAllBankList();
        setBanks(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    })();
  }, []);

  /* ============================================================
       OPEN MODAL
  ============================================================ */
  const openBankModal = (bank) => {
    setExpandedBank(bank);

    const swift = bank.swiftCode || "";
    setSwiftCode(swift);
    setAccountNumber(generateAccountNumber(swift));
  };

  /* ============================================================
       CLOSE MODAL
  ============================================================ */
  const closeModal = () => {
    setExpandedBank(null);
    setAccountName("");
    setAccountNumber("");
    setSwiftCode("");
  };

  /* ============================================================
       SUBMIT BANK ACCOUNT
  ============================================================ */
  const handleAdd = async (bank) => {
    if (!accountName || !accountNumber) {
      return setMsg({ type: "error", text: "All fields are required" });
    }

    setSubmitting(true);
    setMsg({ type: "", text: "" });

    try {
      await addBankAccount({
        bankName: bank.bankName,
        accountName,
        accountNumber,
        swiftCode,
        country: bank.country || "USA",
      });

      setMsg({ type: "success", text: "Bank account added successfully!" });
      closeModal();
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to add bank account",
      });
    }

    setSubmitting(false);
  };

  return (
    <div className="w-full space-y-4 relative">
      <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
        Add a Bank Account
      </h2>

      {/* ALERT */}
      {msg.text && (
        <div
          className={`p-3 rounded-lg text-sm ${
            msg.type === "error"
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* BANK GRID */}
      {loading ? (
        <ShimmerBankList />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {banks.map((bank) => (
            <motion.div
              key={bank._id}
              onClick={() => openBankModal(bank)}
              whileHover={{ scale: 1.03 }}
              className="bg-white border rounded-xl shadow-sm cursor-pointer p-4 flex gap-3 items-center hover:shadow-md transition"
            >
              <img
                src={bank.bankLogo}
                className="w-12 h-12 rounded-md object-cover shadow"
              />

              <div className="flex flex-col">
                <p className="text-sm font-semibold">{bank.bankName}</p>
                <p className="text-[11px] text-gray-500">{bank.country}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ============================================================
         MODAL
      ============================================================ */}
      <AnimatePresence>
        {expandedBank && (
          <>
            {/* Overlay */}
            <motion.div
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-5"
              >
                {/* HEADER */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <img
                      src={expandedBank.bankLogo}
                      className="w-12 h-12 rounded-lg shadow"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {expandedBank.bankName}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {expandedBank.country}
                      </p>
                    </div>
                  </div>

                  <button onClick={closeModal}>
                    <X size={22} className="text-gray-600" />
                  </button>
                </div>

                {/* FORM FIELDS */}
                <InputField
                  label="Account Name"
                  icon={<User size={16} className="text-gray-400" />}
                  value={accountName}
                  onChange={setAccountName}
                />

                <InputField
                  label="Account Number"
                  icon={<Hash size={16} className="text-gray-400" />}
                  value={accountNumber}
                  readOnly={true}
                  disabled={true}
                />

                <InputField
                  label="SWIFT Code"
                  icon={<Globe size={16} className="text-gray-400" />}
                  value={swiftCode}
                  readOnly={true}
                  disabled={true}
                />

                {/* SUBMIT BUTTON */}
                <button
                  onClick={() => handleAdd(expandedBank)}
                  disabled={submitting}
                  className="w-full py-3 rounded-lg flex items-center justify-center gap-2
                  bg-blue-600 text-white font-medium shadow-md
                  hover:bg-blue-700 transition disabled:opacity-40"
                >
                  {submitting ? "Adding..." : (
                    <>
                      <PlusCircle size={18} /> Add Bank Account
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
