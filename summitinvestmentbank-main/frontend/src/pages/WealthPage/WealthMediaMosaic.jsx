import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WealthMediaMosaic() {
  const sectionRef = useRef(null);
  const blocksRef = useRef([]);

  const blocks = [
    {
      type: "video",
      title: "The Flow of Global Capital",
      subtitle:
        "A cinematic view of how money moves across markets, borders and institutions.",
      video: "https://cdn.pixabay.com/video/2023/11/02/187588-880665640_tiny.mp4", // put your video at public/videos/wealth-flow.mp4
    },
    {
      type: "image",
      title: "Strategic Wealth Structuring",
      subtitle:
        "From trusts to holding companies, build a structure that protects your legacy.",
      image:
        "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFua3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      type: "image",
      title: "Global Market Perspective",
      subtitle:
        "See beyond local noise with a truly international investment lens.",
      image:
        "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      type: "image",
      title: "Private Client Experience",
      subtitle:
        "Discreet, data-driven, relationship-led wealth management for modern leaders.",
      image:
        "https://images.unsplash.com/photo-1565347878134-064b9185ced8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbmt8ZW58MHx8MHx8fDA%3D",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        blocksRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 px-6 md:px-12 lg:px-20 bg-white overflow-hidden"
    >
      {/* Background gradient + subtle overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#05070c] via-[#0a0f1a] to-black opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_55%)]" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
              Immersive <span className="text-[#d4af37]">Wealth Story</span>
              <br />
              Video & Visual Perspective
            </h2>
          </div>
          <p className="text-gray-300 max-w-xl text-sm md:text-base">
            Step inside the Summit Investment Global perspective. A curated blend
            of motion, imagery, and insight that reflects how we see wealth,
            risk, opportunity and long-term value creation.
          </p>
        </div>

        {/* MOSAIC GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blocks.map((block, idx) => (
            <motion.div
              key={idx}
              ref={(el) => (blocksRef.current[idx] = el)}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 130 }}
              className={`relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 group
                ${idx === 0 ? "md:row-span-2 h-[320px] md:h-[460px]" : "h-[260px] md:h-[280px]"}`}
            >
              {/* MEDIA LAYER */}
              {block.type === "video" ? (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={block.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={block.image}
                  alt={block.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                />
              )}

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

              {/* GOLD LIGHT SWEEP */}
              <motion.div
                animate={{ x: ["-140%", "130%"] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                className="absolute inset-y-0 w-40 bg-gradient-to-r from-[#d4af37]/18 to-transparent blur-2xl pointer-events-none"
              />

              {/* TEXT OVERLAY */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-7">
                <div>
                  {/* Small tag */}
                  <p className="uppercase text-[10px] tracking-[0.28em] text-gray-300 mb-3">
                    {block.type === "video" ? "Summit Insight Film" : "Summit Visual"}
                  </p>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-white leading-snug">
                    {block.title}
                  </h3>
                </div>

                {/* Subtitle section */}
                <p className="text-gray-300 text-xs md:text-sm mt-3 max-w-md leading-relaxed">
                  {block.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
