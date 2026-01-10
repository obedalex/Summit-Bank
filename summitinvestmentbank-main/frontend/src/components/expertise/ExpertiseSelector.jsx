// ExpertiseSelector.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BusinessConsulting from "./BusinessConsulting";
import Finances from "./Finances";
import RiskManagement from "./RiskManagement";

gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseSelector() {
  const [activeTab, setActiveTab] = useState("business consulting");
  const buttonRef = useRef(null);
  const cardsRef = useRef(null);

  const items = [
    { id: "business consulting", label: "Business Consulting", Component: BusinessConsulting },
    { id: "finances", label: "Finances", Component: Finances },
    { id: "risk management", label: "Risk Management", Component: RiskManagement },
  ];

  // 🌀 GSAP: animate buttons on scroll
  useEffect(() => {
    const buttons = buttonRef.current?.querySelectorAll(".expertise-btn");
    if (!buttons?.length) return;

    gsap.from(buttons, {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: buttonRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  // 🌀 GSAP: animate cards on scroll
  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".expertise-card");
    if (!cards?.length) return;

    gsap.from(cards, {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  // 🔍 Find selected component
  const activeItem = items.find((item) => item.id === activeTab);

  return (
    <>
      {/* ⏺ BUTTONS */}
      <div ref={buttonRef} className="flex justify-center flex-wrap gap-3 md:gap-6 lg:gap-12 px-3 lg:px-6">
        {items.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.92 }}
            className={`expertise-btn cursor-pointer relative overflow-hidden px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300
              ${
                activeTab === item.id
                  ? "bg-[#B4A16C] text-black shadow-[0_0_24px_rgba(180,161,108,0.7)]"
                  : "bg-[#131722] text-white border border-gray-700 hover:border-[#B4A16C]/70"
              }
            `}
          >
            {/* GOLD SWEEP EFFECT */}
            <motion.span
              className="absolute inset-0 bg-[#d4af37] z-0"
              variants={{ rest: { x: "-100%" }, hover: { x: 0 } }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
            <span className="relative z-10 tracking-wide font-medium">
              {item.label.toUpperCase()}
            </span>
          </motion.button>
        ))}
      </div>

      {/* 🧠 COMPONENT DISPLAY */}
      <div ref={cardsRef} className="px-3 md:px-16 lg:px-12 mt-4">
        <AnimatePresence mode="wait">
          {activeItem && (
            <motion.div
              key={activeItem.id}
              className="expertise-card"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <activeItem.Component />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
