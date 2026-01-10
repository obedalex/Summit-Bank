// src/components/transactions/SelectorTabs.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowLeftRight,
  Landmark,
  Wallet,
  CreditCard,
  Send,
  Repeat,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

export default function SelectorTabs({ onSelect }) {
  const tabs = [
  {
    name: "Wallet → Card",
    path: "wallet-to-card",
    icon: <ArrowLeftRight size={18} />,
  },
  
  {
    name: "Card → Card",
    path: "card-to-card",
    icon: <CreditCard size={18} />,
  },
  
  // NEW OPTIONS BELOW
  {
    name: "Card → Bank",
    path: "card-to-bank",
    icon: <ArrowUpRight size={18} />, // sending upward to bank
  },
  
  {
    name: "Bank → Card",
    path: "bank-to-card",
    icon: <ArrowDownLeft size={18} />, // coming down from bank to card
  },
  
  {
    name: "Bank → Bank",
    path: "bank-to-bank",
    icon: <Repeat size={18} />, // bank-to-bank loop
  },
  {
    name: "Card → Wallet",
    path: "card-to-wallet",
    icon: <Wallet size={18} />,
  },
  {
    name: "Bank → Wallet",
    path: "bank-to-wallet",
    icon: <Send size={18} />, // depositing into wallet
  },
  {
    name: "Wallet → Bank",
    path: "wallet-to-bank",
    icon: <Landmark size={18} />,
  },
];

  return (
    <div className="mt-6  overflow-x-auto scrollbar-hide w-[310px] md:w-full lg:w-full px-2">
      <div className="flex gap-5 w-fit mx-auto px-1">
        {tabs.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => onSelect()} // triggers loading
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium 
              whitespace-nowrap border transition-all
              ${
                isActive
                  ? "bg-[#4456ff] text-white border-[#4456ff] shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }
            `
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
