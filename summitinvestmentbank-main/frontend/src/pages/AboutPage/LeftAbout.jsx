import React from "react";
import { motion } from "framer-motion";

export default function LeftAbout() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="h-full w-full flex flex-col justify-center text-white px-2 lg:px-6"
    >

      {/* GOLD ACCENT BAR + TITLE */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-1.5 bg-[#d4af37] rounded-full shadow-lg" />
        <h1 className="text-3xl lg:text-5xl font-serif leading-tight font-extralight">
          Who We Are  
          <br />
          <span className="text-[#d4af37]">Summit Investment Global</span>
        </h1>
      </div>

      {/* DESCRIPTION */}
      <p className="text-gray-400 mt-6 text-base lg:text-lg max-w-xl leading-relaxed">
        At Summit Investment Global, we combine deep financial expertise with cutting-edge 
        digital innovation — empowering clients with intelligent banking, secure investments, 
        and a global wealth strategy designed for long-term success.
      </p>

      {/* HIGHLIGHT CARDS */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Mission */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
        >
          <h3 className="text-[#d4af37] text-lg font-semibold">Our Mission</h3>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            To deliver transparent, innovative, and secure financial solutions that unlock 
            opportunities for individuals and institutions globally.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
        >
          <h3 className="text-[#d4af37] text-lg font-semibold">Our Vision</h3>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            To set the global standard for digital investment banking through excellence, 
            integrity, and data-driven financial intelligence.
          </p>
        </motion.div>

      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-7 py-3 rounded-full bg-[#d4af37] text-black font-semibold tracking-wide shadow-md hover:shadow-xl transition"
          onClick={() => (window.location.href = "/wealth")}
        >
          Explore Our Services
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-7 py-3 rounded-full bg-white/10 text-white border border-gray-500/40 backdrop-blur-sm 
                     hover:bg-white/20 transition"
          onClick={() => (window.location.href = "/contact")}
        >
          Get in Touch
        </motion.button>
      </div>

    </motion.div>
  );
}
