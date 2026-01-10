import React from "react";
import { motion } from "framer-motion";

export default function BusinessConsulting() {
  // 5 distinct features
  const features = [
    { img: "/logo.png", text: "Expert Investment Management" },
    { img: "/logo.png", text: "Strategic Business Advisory" },
    { img: "/logo.png", text: "Risk & Performance Analysis" },
    { img: "/logo.png", text: "Financial Growth Planning" },
    { img: "/logo.png", text: "Operational Efficiency Systems" },
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
        <h2 className="text-2xl md:text-3xl font-bold text-[#B4A16C] tracking-wide">
          Business Consulting
        </h2>

        <p className="text-gray-800 leading-relaxed text-sm md:text-base">
          At <span className="text-[#B4A16C] font-semibold">Summit Investment Bank</span>, 
          we empower businesses with tailored strategies to drive growth,
          enhance financial performance, and maximize operational efficiency.
        </p>

        {/* 5 DISTINCT FEATURES */}
        <div className="flex flex-col gap-3 mt-4">
          {features.map((f, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex gap-3 items-center"
            >
              <img
                src={f.img}
                className="h-6 w-6 rounded-full border border-[#B4A16C] object-contain shadow-md"
              />
              <p className="text-sm md:text-base text-gray-900">{f.text}</p>
            </motion.div>
          ))}
        </div>

        {/* <button className="mt-6 px-6 py-3 bg-[#B4A16C] text-black rounded-full font-medium shadow-lg hover:bg-[#d4c08a] transition-all duration-300">
          Schedule a Consultation
        </button> */}
      </motion.div>

      {/* RIGHT IMAGE – PRO & RESPONSIVE */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-center"
      >
        <div className="rounded-3xl shadow-[0_0_45px_rgba(180,161,108,0.2)]  w-full bg-white/90 shadow-4xl">
          <img
            src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Business Strategy"
            className="w-full h-[260px] md:h-[380px]  rounded-2xl object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
}
