//
// src/ReuseableCards/walletsCards/WalletCards.jsx
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import QuickActions from "./QuickActions";
import ClipLoader from "react-spinners/ClipLoader";
import { getUserProfile } from "../services/profileService/ProfileService";
import { getUserCards } from "../services/cardServices/CardServiceAPI";
import { getUserDashboardStats } from "../services/userDashboardStat/UserDashboardStat";
import { toast } from "react-toastify";
import { getWallet } from "../services/walletServices/WalletAPI";
import StatShimmerCard from "./shimmerCards/StatShimmerCard";
import ShimmerCreditCard from "./shimmerCards/ShimmerCard";

export default function WalletCards() {
  const [cards, setCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(true);

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Load dashboard stats
  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const res = await getUserDashboardStats();
      setStats(res.data);
    } catch (err) {
      toast.error("Failed to load wallet statistics");
    } finally {
      setLoadingStats(false);
    }
  };

  // Load cards
  const loadCards = async () => {
    try {
      setLoadingCards(true);
      const res = await getUserCards();
      console.log("the wallet",res.data)
      setCards(res.data || []);
    } finally {
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    loadStats();
    loadCards();
  }, []);

  return (
    <div className="w-full">
      <div className="flex gap-4 w-full lg:px-4">

        {/* ================= DESKTOP STATS ================= */}
        <div className="hidden md:flex lg:flex w-[65%] items-center justify-evenly gap-2 overflow-y-scroll scrollbar-hide overflow-x-auto">

          {loadingStats && (
            <div className="w-full flex justify-center py-4">
              {/* <ClipLoader size={28} color="#4456ff" /> */}
              <StatShimmerCard/>
            </div>
          )}

          {!loadingStats && stats && (
            <>
              <StatCard title="Wallet Balance" value={`$ ${stats.walletBalance.toLocaleString()}`} />
              <StatCard title="Total Deposits" value={`$ ${stats.totalDeposits.toLocaleString()}`} />
              <StatCard title="Total Withdrawals" value={`$ ${stats.totalWithdrawals.toLocaleString()}`} />
              <StatCard title="Active Investments" value={stats.activeInvestments} />
              <StatCard title="Total Investments" value={stats.totalInvestments} />
            </>
          )}
        </div>

        <QuickActions />

        {/* ================= DESKTOP CARDS ================= */}
        <div className="hidden lg:flex w-[35%] h-fit gap-4 overflow-y-scroll scrollbar-hide overflow-x-auto">

          {loadingCards && (
            <div className="w-full flex justify-center py-8">
              <ClipLoader color="#4456ff" size={36} />
            </div>
          )}

          {!loadingCards && cards.map((card) => (
            <Card key={card._id} card={card} />
          ))}
        </div>
      </div>

      {/* ================= MOBILE HORIZONTAL SCROLL ================= */}
      <div className="md:hidden mt-3 overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className="flex gap-4 w-80 px-1">

          {loadingCards && (
            <div className="w-full flex justify-center py-4">
              {/* <ClipLoader color="#4456ff" size={28} /> */}
              <ShimmerCreditCard/>
            </div>
          )}

          {!loadingCards && cards.map((card) => (
            <Card key={card._id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================
   CLEAN & SIMPLE CARD DESIGN
============================ */
function Card({ card }) {
  const last4 = card.last4 || card.cardNumber?.slice(-4) || "0000";
  const balance = card.balance ?? 0;
  const currency = "$";
  const type = card.cardType || "VISA";

  const expMonth = card.expMonth || "MM";
  const expYear = card.expYear ? String(card.expYear).slice(-2) : "YY";

  return (
    <div
      className="
      h-30 bg-white border border-gray-200 rounded-xl
      shadow-md px-4 py-3 flex flex-col justify-between
      hover:bg-[#1829ff] transition-all duration-300 hover:text-white
      shrink-0
    "
    >
      {/* Top */}
      <div className="flex justify-between items-center">
        <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
          <Check size={14} color="white" />
        </div>

        <h2 className="font-semibold text-[#5f65ce] text-sm tracking-wide">
          {type}
        </h2>
      </div>

      {/* Card Number */}
      <p className="text-[#5f65ce] font-mono tracking-widest text-sm mt-1">
        •••• •••• •••• {last4}
      </p>

      {/* Bottom */}
      <div className="flex justify-between text-xs">

        <div>
          <p className="text-gray-500">Funds</p>
          <p className="font-semibold text-gray-800">
            {currency} {balance.toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-500">Expires</p>
          <p className="font-semibold">
            {expMonth}/{expYear}
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-500">CVC</p>
          <p className="font-semibold">***</p>
        </div>
      </div>
    </div>
  );
}

/* ============================
   STAT CARD (UPDATED)
============================ */
function StatCard({ title, value }) {
  return (
    <div
      className="
      
        bg-white 
        rounded-2xl 
        p-3 
        shadow-[0_4px_12px_rgba(0,0,0,0.06)]
        border border-gray-100
        hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]
        transition-all duration-200
      "
    >
      <p className="text-xs text-gray-500 font-medium tracking-wide">
        {title}
      </p>

      <p className="text-lg font-bold text-gray-900 mt-2 leading-snug">
        {value}
      </p>

      <div className="w-10 h-1.5 mt-3 rounded-full bg-gradient-to-r from-[#4456ff] to-[#1e30fe]"></div>
    </div>
  );
}
