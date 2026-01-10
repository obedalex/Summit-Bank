import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroAbout() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax BG movement
      gsap.to(".about-bg", {
        scale: 1.1,
        y: -60,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          scrub: 1,
        },
      });

      // Title reveal
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Subtitle reveal
      gsap.from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        delay: 0.3,
        duration: 1.2,
        ease: "power3.out",
      });

      // Floating badge
      gsap.from(badgeRef.current, {
        scale: 0.6,
        opacity: 0,
        delay: 0.6,
        duration: 1.2,
        ease: "back.out(1.7)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden  bg-black"
    >
      {/* BACKGROUND IMAGE */}
      <motion.img
        src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1500"
        className="about-bg absolute inset-0 h-full w-full object-cover opacity-80"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        alt="Summit Office"
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0b0d12]/95" />

      {/* GOLD ACCENT GRADIENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.8 }}
        className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/20 via-transparent to-transparent"
      />

      {/* CONTENT */}
      <div className="relative z-20 h-full w-full flex flex-col justify-center items-center text-white px-6 text-center">

        {/* TITLE */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-serif font-light tracking-wide"
        >
          Redefining <span className="text-[#d4af37]">Global Finance</span>
        </h1>

        {/* SUBTITLE */}
        <p
          ref={subtitleRef}
          className="max-w-2xl mt-5 text-gray-300 text-base md:text-lg leading-relaxed"
        >
          At Summit Investment Global, we combine deep market intelligence with
          world-class digital innovation to build wealth solutions trusted by
          millions worldwide.
        </p>

        {/* FLOATING BADGE */}
        <motion.div
          ref={badgeRef}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="mt-10 px-6 py-3 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl shadow-lg"
        >
          <p className="text-[#d4af37] text-xs tracking-widest">ABOUT SUMMIT</p>
          <p className="text-white text-lg font-semibold mt-1">
            Trusted Worldwide Since 2007
          </p>
        </motion.div>
      </div>

      {/* FLOATING CORNER CARD (3D effect) */}
      <motion.div
        animate={{ rotate: [0, 3, -3, 0], y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute bottom-8 right-6 md:right-12 bg-gradient-to-br from-[#1b1b1b] to-[#2d2d2d]
                   h-36 w-64 md:h-44 md:w-80 rounded-2xl border border-white/10 shadow-2xl p-4"
      >
        <div className="flex justify-between items-center">
          <img src="/logo.png" className="h-10 w-10" />
          <div className="h-5 w-8 rounded bg-gradient-to-br from-[#d4af37] to-[#8c7427]" />
        </div>
        <p className="text-white/80 text-sm tracking-widest mt-3">SUMMIT IB</p>
        <p className="text-gray-300 text-xs">Global Banking & Wealth Advisors</p>
      </motion.div>
    </div>
  );
}
