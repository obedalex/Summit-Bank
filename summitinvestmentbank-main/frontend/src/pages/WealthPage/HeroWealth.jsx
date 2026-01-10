// HeroWealth.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroWealth() {
  const containerRef = useRef(null);
  const bgVideoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Parallax video movement
      gsap.to(bgVideoRef.current, {
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100vh] lg:h-[95vh] overflow-hidden"
    >
      {/* VIDEO BACKGROUND */}
      <video
        ref={bgVideoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://cdn.pixabay.com/video/2023/09/08/179649-862590064_tiny.mp4" type="video/mp4" />
      </video>

      {/* BLACK + GOLD GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* GOLD LIGHT SWEEP */}
      <motion.div
        animate={{ x: ["-140%", "130%"] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
        className="absolute inset-y-0 w-48 bg-gradient-to-r from-[#d4af37]/25 to-transparent blur-2xl"
      />

      {/* TEXT CONTENT */}
      <div
        ref={textRef}
        className="relative z-20 h-full flex flex-col justify-center px-6 lg:px-24 text-white max-w-2xl"
      >
        <h1 className="text-4xl lg:text-7xl font-serif font-light leading-tight">
          Elite Wealth <span className="text-[#d4af37]">Management</span>
        </h1>

        <p className="text-gray-300 mt-6 text-lg lg:text-xl leading-relaxed max-w-xl">
          Tailored investment strategies, deep market intelligence and 
          global advisory — built exclusively for high-net-worth individuals.
        </p>

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = "/login-signup")}
          className="mt-10 w-fit px-7 py-3 rounded-xl bg-[#d4af37] text-black font-semibold
                     tracking-wide shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
        >
          Begin Your Wealth Journey
          <ArrowRight size={20} />
        </motion.button>
      </div>

      {/* FLOATING PREMIUM CARD */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute bottom-14 right-8 lg:right-24 bg-gradient-to-br 
                   from-[#1d1d1d] to-[#2d2d2d] w-64 h-40 rounded-2xl border border-[#d4af37]/20 
                   shadow-xl p-5 flex flex-col justify-between backdrop-blur-xl"
      >
        <div className="flex justify-between items-center">
          <img src="/logo.png" className="h-10 w-10 opacity-90" />
          <div className="h-5 w-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#8d7531]" />
        </div>
        <p className="text-white/80 tracking-widest text-xs">PRIVATE WEALTH</p>
        <p className="text-gray-300 text-[11px]">Global advisory at your fingertips.</p>
      </motion.div>
    </div>
  );
}
