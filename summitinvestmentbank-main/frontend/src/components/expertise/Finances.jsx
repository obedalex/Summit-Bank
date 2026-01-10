import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Wallet, PieChart, TrendingUp, Calculator } from "lucide-react";

export default function Finances() {
  const features = [
    { icon: <BarChart3 className="h-6 w-6" />, text: "Corporate Financial Analysis" },
    { icon: <Wallet className="h-6 w-6" />, text: "Cashflow Optimization" },
    { icon: <PieChart className="h-6 w-6" />, text: "Capital Allocation Strategies" },
    { icon: <Calculator className="h-6 w-6" />, text: "Budgeting & Forecasting" },
    { icon: <TrendingUp className="h-6 w-6" />, text: "Investment Portfolio Structuring" },
  ];

  return (
    <div className="min-h-[70vh] w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-6 md:p-10">
      
      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#0E0F10] tracking-wide">
          Financial Solutions
        </h2>

        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          Our financial experts at 
          <span className="text-[#B4A16C] font-semibold"> Summit Investment Bank </span> 
          deliver strategic financial structures tailored for growth, 
          sustainability, and long-term profitability.
        </p>

        {/* ICON FEATURE LIST */}
        <div className="flex flex-col gap-4 mt-4">
          {features.map((f, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-[#B4A16C]/10 rounded-full border border-[#B4A16C]/40">
                {f.icon}
              </div>
              <p className="text-sm md:text-base text-gray-800">{f.text}</p>
            </motion.div>
          ))}
        </div>

        {/* <button className="mt-6 px-6 py-3 bg-[#0E0F10] text-white rounded-full font-medium shadow-lg hover:bg-[#B4A16C] hover:text-black transition-all duration-300">
          Request Financial Plan
        </button> */}
      </motion.div>

      {/* RIGHT IMAGE – REMAINS THE SAME */}
      {/* RIGHT IMAGE – CLEAN & RESPONSIVE */}
<motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="flex justify-center"
>
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="overflow-hidden rounded-2xl shadow-3 w-full "
  >
    <img
      src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Finance & Analysis"
      className="w-full h-[260px] md:h-[380px] object-cover"
    />
  </motion.div>
</motion.div>

    </div>
  );
}
