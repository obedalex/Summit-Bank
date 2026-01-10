import React from "react";
import { motion } from "framer-motion";

export default function MiddleAbout() {
  return (
    <div className="relative h-[75vh] w-full overflow-hidden rounded-3xl group">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200"
          className="h-full w-full object-cover"
          alt="Summit Headquarters"
        />
      </div>

      {/* DARK LUXURY GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />

      {/* GOLD DIAGONAL ACCENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/30 via-transparent to-transparent
                   rotate-6 scale-150 pointer-events-none"
      />

      {/* CIRCULAR MASK HIGHLIGHT */}
      <motion.div
        initial={{ opacity: 0, scale: 1.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 h-72 w-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      {/* GLASS PANEL CARD */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-8 left-6 md:left-10 backdrop-blur-xl bg-white/10 
                   border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8 max-w-xs"
      >
        <p className="text-[#d4af37] uppercase tracking-widest text-xs mb-1">
          Our Legacy
        </p>

        <h2 className="text-lg md:text-xl font-semibold text-white leading-snug">
          Redefining Global Wealth Since 2007
        </h2>

        <p className="text-gray-300 text-sm mt-3">
          “Financial excellence starts with trust, integrity and a commitment 
          to innovation.”  
        </p>

        <p className="text-gray-400 text-xs mt-2 italic">
          — Summit Leadership Team
        </p>
      </motion.div>

      {/* FLOATING ROTATING CARD (SUBTLE EFFECT) */}
      <motion.div
        animate={{ rotate: [0, 2, -2, 0], y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-10 right-8 md:right-14 bg-gradient-to-br from-[#1b1b1b] to-[#2c2c2c]
                   h-32 w-56 md:h-40 md:w-72 border border-white/10 shadow-2xl rounded-xl p-4 flex flex-col justify-between"
      >
        <div className="flex justify-between items-center">
          <img src="/logo.png" className="h-8 w-8 object-contain" />
          <div className="h-4 w-6 rounded bg-gradient-to-br from-[#d4af37] to-[#8c7427]" />
        </div>

        <p className="text-white/80 text-xs tracking-widest">5390 **** 2210</p>
        <div className="flex justify-between text-[10px] text-gray-400">
          <p>Summit IG</p>
          <p>12 / 29</p>
        </div>
      </motion.div>
    </div>
  );
}
