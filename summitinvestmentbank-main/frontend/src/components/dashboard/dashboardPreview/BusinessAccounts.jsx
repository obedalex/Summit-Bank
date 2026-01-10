import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Building2, Star, X, DollarSign } from "lucide-react";
import { getUserBankAccounts } from "../../../services/bankServices/bankAPI";

/* ====================================================================
   MAIN COMPONENT
==================================================================== */
export default function BusinessAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const [activeBank, setActiveBank] = useState(null); // for modal

  const loadBanks = async () => {
    try {
      setLoading(true);
      const res = await getUserBankAccounts();
      setAccounts(res.data || []);
    } catch (err) {
      console.log("Failed fetching bank accounts:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBanks();
  }, []);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-5">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <Building2 size={18} className="text-blue-600" />
        <h3 className="text-base font-semibold text-gray-800">Business Accounts</h3>
      </div>

      {/* LOADING SHIMMER */}
      {loading ? (
        <div className="space-y-3">
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </div>
      ) : accounts.length === 0 ? (
        <p className="text-center text-gray-500 text-sm py-5">
          No bank accounts added yet.
        </p>
      ) : (
        <div className="space-y-3">
          {accounts.map((bank) => (
            <BankCard
              key={bank._id}
              bank={bank}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              setActiveBank={setActiveBank}
            />
          ))}
        </div>
      )}

      {/* MODAL */}
      <BankDetailsModal bank={activeBank} setActiveBank={setActiveBank} />
    </div>
  );
}

/* ====================================================================
   BANK CARD COMPONENT
==================================================================== */
function BankCard({ bank, openMenu, setOpenMenu, setActiveBank }) {
  const maskedAcct =
    bank.accountNumber.length > 4
      ? `**** ${bank.accountNumber.slice(-4)}`
      : bank.accountNumber;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.005 }}
      className="bg-white p-3 rounded-lg shadow flex justify-between items-center"
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        <img
          src={bank.bankLogo}
          alt="bank"
          className="w-10 h-10 object-contain rounded-md p-1 bg-gray-50 border"
        />

        <div className="leading-tight">
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold text-gray-800">
              {bank.bankName}
            </h4>
            {bank.isDefault && (
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
            )}
          </div>

          <p className="text-xs text-gray-500">{maskedAcct}</p>

          {/* BALANCE */}
          <p className="text-[12px] text-green-600 font-semibold flex items-center gap-1 mt-1">
            <DollarSign size={12} />
            {bank.balance?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* MENU */}
      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpenMenu(openMenu === bank._id ? null : bank._id)}
          className="p-1.5 hover:bg-gray-100 rounded-md"
        >
          <MoreVertical size={16} />
        </motion.button>

        <AnimatePresence>
          {openMenu === bank._id && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-lg overflow-hidden z-20"
            >
              <button
                onClick={() => {
                  setActiveBank(bank);
                  setOpenMenu(null);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-gray-700"
              >
                View Details
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ====================================================================
   DETAILS MODAL
==================================================================== */
function BankDetailsModal({ bank, setActiveBank }) {
  return (
    <AnimatePresence>
      {bank && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black backdrop-blur-sm z-40"
            onClick={() => setActiveBank(null)}
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl space-y-5"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <img
                    src={bank.bankLogo}
                    className="w-12 h-12 rounded-md shadow"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{bank.bankName}</h3>
                    <p className="text-xs text-gray-500">{bank.country}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveBank(null)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* DETAILS */}
              <div className="space-y-3 text-sm">
                <DetailRow label="Account Name" value={bank.accountName} />
                <DetailRow label="Account Number" value={bank.accountNumber} />
                <DetailRow label="SWIFT Code" value={bank.swiftCode} />
                <DetailRow
                  label="Balance"
                  value={`$${bank.balance?.toLocaleString()}`}
                />
                <DetailRow label="Country" value={bank.country} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ====================================================================
   DETAIL ROW
==================================================================== */
function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}

/* ====================================================================
   SHIMMER LOADING CARD
==================================================================== */
function ShimmerCard() {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm animate-pulse flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-md" />

        <div>
          <div className="w-28 h-3 bg-gray-200 rounded mb-2"></div>
          <div className="w-20 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="w-4 h-4 bg-gray-200 rounded"></div>
    </div>
  );
}
