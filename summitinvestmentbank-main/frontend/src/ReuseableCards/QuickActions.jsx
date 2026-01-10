import React from "react";
import { Send, PlusCircle, Wallet, Repeat, ShieldCheck, CreditCard } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { label: "Deposit", icon: <PlusCircle size={20} /> },
    { label: "Withdraw", icon: <Wallet size={20} /> },
    // { label: "Transfer", icon: <Send size={20} /> },
    { label: "Transactions", icon: <CreditCard size={20} /> },
    { label: "KYC", icon: <ShieldCheck size={20} /> },

  ];

  return (
    <div className="w-full mt-4 md:hidden cursor-pointer">
      <h2 className="text-sm font-semibold mb-3 text-gray-700">Quick Actions</h2>

      <div className="grid grid-cols-4 gap-3">
        {actions.map((item, index) => (
          <button
            key={index}
            className="
              flex flex-col items-center justify-center cursor-pointer
              bg-white shadow-md rounded-xl
              py-3 px-2
              active:scale-95 
              transition-all
              border border-gray-100
            "
          >
            <div className="
              h-9 w-9 rounded-full 
              bg-[#4456ff]/10 text-[#4456ff]
              flex items-center justify-center
              mb-1
            ">
              {item.icon}
            </div>
            <span className="text-[11px] font-medium text-gray-700">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
