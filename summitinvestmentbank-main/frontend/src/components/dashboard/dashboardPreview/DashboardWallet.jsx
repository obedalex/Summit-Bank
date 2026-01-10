import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ChevronDown,
  CreditCard,
  User,
  Calendar,
  Hash,
} from "lucide-react";
import { getWallet } from "../../../services/walletServices/WalletAPI";
import { useNavigate } from "react-router-dom";

/* ============================================================
   SHIMMER LOADING CARD
============================================================ */
function ShimmerWallet() {
  return (
    <div className="w-full bg-white border border-gray-300 rounded-xl p-5 shadow-sm animate-pulse">
      <div className="flex justify-between">
        <div className="space-y-3 w-1/2">
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
      </div>

      <div className="mt-6 w-full flex justify-end">
        <div className="h-10 w-24 bg-gray-200 rounded"></div>
      </div>

      <div className="mt-6 border-t pt-5 flex justify-between">
        <div className="h-4 w-28 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT — SINGLE WALLET
============================================================ */
export default function DashboardWallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const navigate = useNavigate()
  /* ============================================================
        FETCH WALLET (returns SINGLE OBJECT)
  ============================================================ */
  const loadWallet = async () => {
    try {
      setLoading(true);

      const res = await getWallet();
      console.log("wallet",res.data)

      if (res?.data) {
        setWallet(res.data); // backend returns the object directly
      }

    } catch (err) {
      console.log("Wallet fetch error:", err);
      setWallet(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadWallet();
  }, []);

  /* ============================================================
        SHOW SHIMMER UNTIL WALLET EXISTS
  ============================================================ */
  if (loading || !wallet) {
    return <ShimmerWallet />;
  }

  const last4 = wallet.walletNumber.slice(-4);

  return (
    <div className="w-full bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden mb-2">

      {/* ================================================= */}
      {/* SECTION 1 — BALANCE + LOGO + TRANSFER BUTTON      */}
      {/* ================================================= */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center justify-between">

          {/* Balance */}
          <div className="flex flex-col">
            <span className="text-xs uppercase text-gray-500">Wallet Balance</span>

            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight">
                {showBalance
                  ? `${wallet.currency}${wallet.balance.toLocaleString()}`
                  : "•••••"}
              </span>

              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-gray-100 rounded-lg transition"
              >
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Logo */}
          <img
            src="/logo.png"
            className="w-12 h-12 rounded-lg shadow object-cover"
          />
        </div>

        {/* Transfer Button */}
        <div className="flex justify-end">
          <button
            className="mt-4 p-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition" onClick={()=>navigate("/dashboard/transactions")}
          >
            Transfer
          </button>
        </div>
      </div>

      {/* ================================================= */}
      {/* SECTION 2 — ACCOUNT DETAILS SUMMARY               */}
      {/* ================================================= */}
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        
        <div
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <CreditCard size={18} className="text-gray-700" />
          <span className="font-medium text-gray-800 text-sm">
            Account Details
          </span>

          <motion.div
            animate={{ rotate: showDetails ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={18} className="text-gray-700" />
          </motion.div>
        </div>

        {/* Cardholder */}
        <div className="text-right">
          <p className="text-xs text-gray-500">Cardholder</p>
          <p className="text-sm font-semibold">{wallet.cardholder}</p>
        </div>
      </div>

      {/* ================================================= */}
      {/* SECTION 3 — EXPANDED DETAILS                      */}
      {/* ================================================= */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-5 space-y-4 border-b border-gray-200"
          >
            <DetailRow
              icon={<Hash size={15} />}
              label="Account Number"
              value={wallet.walletNumber.replace(/\d{16}(\d{4})/, "**** **** **** **** $1")}
            />

            {/* <DetailRow
              icon={<User size={15} />}
              label="CVV"
              value={last4}
            /> */}

            {/* <DetailRow
              icon={<Calendar size={15} />}
              label="Expiry"
              value={`${wallet.expMonth}/${wallet.expYear}`}
            /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   REUSABLE ROW COMPONENT
============================================================ */
function DetailRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm flex items-center gap-1 text-gray-600">
        {icon} {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
