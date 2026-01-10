import React from "react";
import { motion } from "framer-motion";

export default function MiddleHero() {
  return (
    <div className="h-[80vh]  w-full bg-white/40 rounded-tl-full rounded-tr-full relative overflow-hidden group">

      {/* Background Image */}
      <img
        src="https://plus.unsplash.com/premium_photo-1701121214648-245e9c86cc92?q=80&w=880&auto=format&fit=crop"
        className="h-full w-full object-cover rounded-tl-full rounded-tr-full"
        alt="Background"
      />

      {/* SPLASH EFFECT (always visible on mobile) */}
      <div className="absolute inset-0 pointer-events-none md:opacity-0 md:group-hover:opacity-100
                      bg-gradient-to-tr from-transparent via-white/15 to-transparent
                      translate-x-[-120%] md:group-hover:translate-x-[120%]
                      rotate-12 transition-all duration-700 ease-out" />

      <div className="absolute inset-0 pointer-events-none md:opacity-0 md:group-hover:opacity-100
                      bg-gradient-to-tl from-transparent via-white/15 to-transparent
                      translate-x-[120%] md:group-hover:translate-x-[-120%]
                      -rotate-12 transition-all duration-700 ease-out" />

      {/* Credit Card (smaller on mobile) */}
      <motion.div
        className="absolute bottom-4 left-4 md:bottom-10 md:left-0 
                   h-[110px] w-[200px] md:h-[140px] md:w-[260px]
                   bg-gradient-to-br from-[#141414] to-[#1e1e1e]
                   shadow-xl border border-white/10
                   rounded-xl flex flex-col justify-between p-4
                   text-white backdrop-blur-sm"
        animate={{ x: ['0%', '50%', '0%'] }} // reduced movement for mobile
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Summit Logo */}
        <div className="flex justify-between items-center">
          <img src="/logo.png" alt="Summit Bank" className="w-10 md:w-12 object-contain" />
          <div className="h-5 w-7 md:h-6 md:w-8 rounded bg-gradient-to-br from-[#d4af37] to-[#9d8230]" />
        </div>

        <p className="tracking-widest text-xs md:text-sm font-semibold mt-2">
          5234 **** 1789
        </p>

        <div className="flex justify-between text-[9px] md:text-[10px] text-gray-300">
          <p>Summit IB</p>
          <p>09 / 28</p>
        </div>
      </motion.div>
    </div>
  );
}
