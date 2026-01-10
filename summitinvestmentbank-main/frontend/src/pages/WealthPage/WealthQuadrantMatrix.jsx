import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WealthQuadrantMatrix() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const cards = [
    {
      id: "01",
      title: "Wealth Growth",
      desc: "Long-term portfolio strategies designed to compound your capital with precision.",
      link: "/wealth",
      cta: "Explore Wealth",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200",
    },
    {
      id: "02",
      title: "Capital Protection",
      desc: "Risk-managed structures built to safeguard assets across market cycles.",
      link: "/about",
      cta: "View Protection",
      image:
        "https://images.unsplash.com/photo-1523287562758-66c7fc58967a?q=80&w=1200",
    },
    {
      id: "03",
      title: "Global Market Access",
      desc: "Direct access to global equities, bonds, and alternative asset classes.",
      link: "/login-signup",
      cta: "Access Markets",
      image:
        "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?q=80&w=1200",
    },
    {
      id: "04",
      title: "Private Advisory",
      desc: "Dedicated advisors delivering bespoke strategies for high-net-worth clients.",
      link: "/",
      cta: "Meet Advisors",
      image:
        "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 px-6 md:px-12 lg:px-20 bg-zinc-900/80 "
    >
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
            The <span className="text-[#d4af37]">Wealth Matrix</span>
            <br />
            Four Pillars of Summit Strategy
          </h2>
        </div>
        <p className="text-gray-400 max-w-xl text-sm md:text-base">
          Navigate the core pillars of Summit Investment Global. Each pillar is
          crafted to guide your journey from capital preservation to long-term
          multi-asset growth with institutional-grade discipline.
        </p>
      </div>

      {/* GRID (Quadrant) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            ref={(el) => (cardsRef.current[idx] = el)}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 130 }}
            className="relative h-[260px] md:h-[320px] rounded-3xl overflow-hidden group shadow-2xl border border-white/10 bg-black"
          >
            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
              {/* Diagonal gold highlight */}
              <div className="absolute -left-10 top-0 h-full w-32 bg-gradient-to-b from-[#d4af37]/25 to-transparent rotate-6 pointer-events-none" />
            </div>

            {/* TOP NUMBER BADGE */}
            <div className="absolute top-4 left-5 flex items-center gap-3 z-10">
              <div className="h-10 w-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-[#d4af37] font-semibold text-sm backdrop-blur-md shadow-md">
                {card.id}
              </div>
              <span className="uppercase text-[10px] tracking-[0.25em] text-gray-300">
                Summit Pillar
              </span>
            </div>

            {/* GLASS CONTENT */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-xl">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm mt-2 leading-relaxed">
                  {card.desc}
                </p>

                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => (window.location.href = card.link)}
                  className="mt-4 inline-flex items-center gap-2 text-[13px] md:text-sm text-[#d4af37] font-semibold tracking-wide"
                >
                  {card.cta}
                  <span className="h-7 w-7 rounded-full border border-[#d4af37]/60 flex items-center justify-center">
                    <ArrowRight size={14} />
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
