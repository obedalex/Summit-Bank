// src/components/CreditWallet.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ClipLoader from "react-spinners/ClipLoader";
import { Eye, EyeOff, CreditCard } from "lucide-react";
import { getWallet } from "../../services/walletServices/WalletAPI";

/* ============================================================
   SHIMMER CARD SKELETON
============================================================ */
function ShimmerCreditCard() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-2xl p-6 sm:p-8 bg-gray-200 animate-pulse h-48"></div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="h-10 rounded-lg bg-gray-200 animate-pulse"></div>
        <div className="h-10 rounded-lg bg-gray-200 animate-pulse"></div>
      </div>

      <div className="mt-6 space-y-4 bg-gray-200 rounded-xl p-6 animate-pulse h-40" />
    </div>
  );
}

export default function CreditWallet() {
  const cardRef = useRef(null);

  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  // UI toggles
  const [showNumber, setShowNumber] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [loadingNumber, setLoadingNumber] = useState(false);
  const [loadingCvv, setLoadingCvv] = useState(false);

  const showSensitiveBlock = showNumber || showCvv;

  /* ============================================================
        FETCH WALLET DATA
  ============================================================ */
  const loadWallet = async () => {
    try {
      setLoading(true);

      const res = await getWallet();

      // FIX: backend returns an ARRAY — extract first item
      const w = Array.isArray(res.data) ? res.data[0] : res.data;

      setWallet(w || null);
    } catch (err) {
      console.log("Failed to load wallet:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadWallet();
  }, []);

  /* ============================================================
        ENTRANCE ANIMATION
  ============================================================ */
  useEffect(() => {
    if (!wallet || !cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 20, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    );
  }, [wallet]);

  /* ============================================================
        SHIMMER WHEN LOADING OR NULL WALLET
  ============================================================ */
  if (loading || !wallet) {
    return <ShimmerCreditCard />;
  }

  /* ============================================================
        HELPERS
  ============================================================ */
  const fmt = (n) =>
    typeof n === "number"
      ? n.toLocaleString(undefined, { minimumFractionDigits: 2 })
      : n;

  const maskedNumber = showNumber
    ? wallet.walletNumber.replace(/(\d{4})(?=\d)/g, "$1 ")
    : `•••• •••• •••• ${wallet.walletNumber.slice(-4)}`;

  const cvv = showCvv ? wallet.last4 || "000" : "***";

  return (
    <div className="w-full max-w-3xl mx-auto">

      {/* ============================================================
            SECTION 1 — CARD VISUAL
      ============================================================ */}
      <motion.div
        ref={cardRef}
        className="rounded-2xl relative overflow-hidden p-6 sm:p-8 text-white border border-gray-700"
        style={{
          background:
            "linear-gradient(145deg, #0b0e12 0%, #111418 50%, #0c0f13 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-[0.08] bg-gradient-to-br from-white/10 to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/5 p-3 border border-white/10">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase opacity-80">
                SUMMIT BANK CARD
              </p>
              <p className="text-xs opacity-100">
                {wallet.walletName} • {wallet.walletNumber.slice(-4)}
              </p>
            </div>
          </div>

          <img src="/logo.png" className="w-10 h-8 opacity-90" />
        </div>

        {/* Card Number */}
        <div className="mt-6 font-mono text-lg tracking-wider">
          {maskedNumber}
        </div>

        {/* Sensitive Info */}
        {showSensitiveBlock && (
          <div className="mt-4 flex justify-between text-xs opacity-90">
            {/* <div>
              <p className="uppercase text-[10px]">CVV</p>
              <p className="font-mono text-sm">{cvv}</p>
            </div> */}
            {/* <div className="text-right">
              <p className="uppercase text-[10px]">Expiry</p>
              <p className="font-mono text-sm">
                {wallet.expMonth} / {wallet.expYear}
              </p>
            </div> */}
          </div>
        )}
      </motion.div>

      {/* ============================================================
            SECTION 2 — TOGGLE BUTTONS
      ============================================================ */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {/* Toggle Number */}
        <button
          onClick={() => {
            setLoadingNumber(true);
            setTimeout(() => {
              setShowNumber((s) => !s);
              setLoadingNumber(false);
            }, 1000);
          }}
          className="flex items-center justify-center gap-2 py-2 px-4 bg-white border rounded-lg text-sm text-gray-700"
        >
          {loadingNumber ? (
            <ClipLoader size={16} color="#333" />
          ) : showNumber ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}
          {loadingNumber ? "Loading..." : showNumber ? "Hide Number" : "Show Number"}
        </button>

        {/* Toggle CVV */}
        <button
          onClick={() => {
            setLoadingCvv(true);
            setTimeout(() => {
              setShowCvv((s) => !s);
              setLoadingCvv(false);
            }, 1000);
          }}
          className="flex items-center justify-center gap-2 py-2 px-4 bg-white border rounded-lg text-sm text-gray-700"
        >
          {loadingCvv ? (
            <ClipLoader size={16} color="#333" />
          ) : showCvv ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}
          {loadingCvv ? "Loading..." : showCvv ? "Hide CVV" : "Show CVV"}
        </button>
      </div>

      {/* ============================================================
            SECTION 3 — WALLET DETAILS
      ============================================================ */}
      {showSensitiveBlock && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-md border space-y-4 transition-all">

          <div className="flex justify-between">
            <div>
              <p className="text-[10px] text-gray-500">Available Balance</p>
              <p className="text-lg font-semibold text-green-600">
                {wallet.currency} {fmt(wallet.balance)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-gray-500">Spent Today</p>
              <p className="text-lg font-semibold text-red-600">
                {wallet.currency} {fmt(wallet.dailyStats.spentToday)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-gray-500">Max Daily Transfer</p>
              <p className="font-semibold">
                {wallet.currency} {fmt(wallet.limits.maxDailyTransfer)}
              </p>
            </div>

            <div>
              <p className="text-[10px] text-gray-500">Max Single Transfer</p>
              <p className="font-semibold">
                {wallet.currency} {fmt(wallet.limits.maxSingleTransfer)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] text-gray-500">Last Reset</p>
            <p className="font-semibold">
              {new Date(wallet.dailyStats.lastReset).toLocaleString()}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
