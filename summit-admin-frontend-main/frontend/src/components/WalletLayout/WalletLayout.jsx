import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";

import {
  Wallet,
  ArrowLeftRight,
  RefreshCw,
  Eye,
  Settings,
  CreditCard,
  Ban,
  PlusCircle,
  BookCheck,
  WalletCardsIcon,
  LucideWalletCards
} from "lucide-react";

export default function WalletLayout() {
  const navigate = useNavigate();
  const [loadingRoute, setLoadingRoute] = useState("");

  const buttons = [
    {
      label: "create a wallet",
      icon: <LucideWalletCards size={20} />,
      path: "/admin/wallets/create",
      color: "bg-[#b4a16c]",
    },
    {
      label: "View All Wallets",
      icon: <Eye size={20} />,
      path: "/admin/wallets/all",
      color: "bg-blue-600",
    },
    {
      label: "Credit Wallet",
      icon: <PlusCircle size={20} />,
      path: "/admin/wallets/credit",
      color: "bg-green-600",
    },
    {
      label: "Debit Wallet",
      icon: <ArrowLeftRight size={20} />,
      path: "/admin/wallets/debit",
      color: "bg-yellow-600",
    },
    {
      label: "Reverse Transactions",
      icon: <RefreshCw size={20} />,
      path: "/admin/wallets/reverse",
      color: "bg-purple-600",
    },
    {
      label: "Freeze Wallet",
      icon: <Ban size={20} />,
      path: "/admin/wallets/freeze/:walletId",
      color: "bg-red-600",
    },
    {
      label: "Update Settings",
      icon: <Settings size={20} />,
      path: "/admin/wallets/settings/:walletId",
      color: "bg-gray-700",
    },
    {
      label: "View all transactions",
      icon: <BookCheck size={20} />,
      path: "/admin/wallets/transactions/:walletId",
      color: "bg-yellow-500",
    },
    {
      label: "View a wallet",
      icon: <WalletCardsIcon size={20} />,
      path: "/admin/wallets/single/:walletId",
      color: "bg-zinc-900",
    },
    
  ];

  const handleNavigate = (path, label) => {
    setLoadingRoute(label);

    setTimeout(() => {
      navigate(path);
      setLoadingRoute("");
    }, 600);
  };

  return (
    <div className="w-full px-4">
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 w-full mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Wallet size={30} className="text-[#111827]" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Account (Wallet) Management
          </h2>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">

          {buttons.map((btn) => (
            <motion.button
              key={btn.label}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleNavigate(btn.path, btn.label)}
              className={`w-full p-5 rounded-xl shadow-md cursor-pointer text-white flex flex-col items-center justify-center gap-2 ${btn.color} transition`}
            >
              {loadingRoute === btn.label ? (
                <ClipLoader size={22} color="white" />
              ) : (
                btn.icon
              )}

              <span className="text-sm font-medium mt-1">{btn.label}</span>
            </motion.button>
          ))}

        </div>

      </div>
    </div>
  );
}
