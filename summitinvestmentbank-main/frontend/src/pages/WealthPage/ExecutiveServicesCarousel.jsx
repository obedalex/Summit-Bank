// ExecutiveServicesCarousel.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ExecutiveServicesCarousel() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const services = [
    {
      id: "01",
      label: "Strategic Insight",
      title: "Private Capital Intelligence",
      preview:
        "Institutional-grade insight engineered to detect global capital flows, macro shifts, and early market inflection points.",
      full: `At Summit Investment Global, Private Capital Intelligence delivers elite visibility into global economic cycles using macroeconomic data science, geopolitical stress signals, institutional research, and AI-driven forecasting.

Clients gain access to proprietary liquidity dashboards, cross-border capital flow heatmaps, institutional scenario simulations, and early-phase economic indicators.

This intelligence suite empowers investors to identify asymmetric opportunities and strategically position portfolios before global macro shifts materialize.`,
      link: "/",
    },
    {
      id: "02",
      label: "Global Structuring",
      title: "Global Asset Structuring",
      preview:
        "Multi-jurisdictional architecture designed to structure, protect, and transition wealth across borders and generations.",
      full: `Our Structuring Desk builds efficient global wealth frameworks—trusts, holding companies, offshore vehicles, foundations, and multi-currency shields.

Every structure is engineered to minimize jurisdictional risk, enhance privacy, secure legacy wealth, and comply with modern international regulations.

These frameworks are foundational for affluent families seeking long-term governance, succession continuity, and strategic tax optimization.`,
      link: "/wealth",
    },
    {
      id: "03",
      label: "Alternatives Desk",
      title: "Exclusive Alternate Investments",
      preview:
        "Private equity, venture capital, real assets and institutional-grade alternative opportunities.",
      full: `The Summit Alternatives Desk sources private and early-stage investment opportunities traditionally reserved for institutional investors.

Clients gain access to private equity placements, real estate syndicates, early venture rounds, commodities portfolios, energy funds, and fine-art alternative vehicles.

Each opportunity is rigorously screened, run through multi-layer risk modeling, and benchmarked against institutional performance standards.`,
      link: "/",
    },
    {
      id: "04",
      label: "Intelligent Systems",
      title: "Intelligent Portfolio Automation",
      preview:
        "AI-driven optimization and automated allocation logic that realigns your portfolio with shifting global conditions.",
      full: `Our intelligent portfolio engine uses machine learning and predictive analytics to rebalance positions based on market volatility, interest cycles, economic indicators, and asset correlation dynamics.

It maintains strategic asset distribution—24/7, without human emotion—ensuring discipline, consistency, and long-term optimized returns.

Clients benefit from automated protection layers, performance tilting, and continuous global recalibration.`,
      link: "/about",
    },
  ];

  // -----------------------------
  // PARALLAX & SCROLLTRIGGER SETUP
  // -----------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.fromTo(
        bgRef.current,
        { y: 0 },
        {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Card stagger reveal
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 120 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Card vertical parallax depth
      cardsRef.current.forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -40 : -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (index) =>
    setExpandedIndex((prev) => (prev === index ? null : index));

  const goTo = (link) => {
    if (link) window.location.href = link;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 px-6 md:px-12 lg:px-20 overflow-hidden bg-[#05070c]"
    >
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('/images/premium-bg.jpg')] bg-cover bg-center opacity-[0.23]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#05070c] via-[#0d1018] to-black opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_55%)]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
              Executive <span className="text-[#d4af37]">Services Suite</span>
              <br />
              Unmatched Private Client Excellence
            </h2>
          </div>
          <p className="text-gray-300 max-w-xl text-sm md:text-base">
            Explore the most exclusive and high-impact pillars of Summit Investment
            Global. Engineered for private clients, institutional thinkers, and
            innovators seeking intelligent long-term financial structures.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => {
            const expanded = expandedIndex === index;

            return (
              <motion.div
                key={service.id}
                ref={(el) => (cardsRef.current[index] = el)}
                whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 140 }}
                className="relative rounded-3xl bg-gradient-to-b from-[#11141b] to-[#05070c] border border-white/10 shadow-2xl p-6 flex flex-col cursor-default"
              >
                {/* ID & Label */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-[#d4af37] text-sm font-semibold">
                    {service.id}
                  </div>
                  <span className="uppercase text-[10px] tracking-[0.3em] text-gray-400">
                    {service.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mt-4">
                  {service.title}
                </h3>

                {/* Preview Text */}
                <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                  {service.preview}
                </p>

                {/* Read More */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="mt-4 inline-flex items-center gap-2 text-xs text-[#d4af37] hover:text-[#f2d88a] transition"
                >
                  {expanded ? "Read less" : "Read more"}
                  <motion.span
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                </button>

                {/* Expanded Full Content */}
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-gray-400 text-xs mt-4 leading-relaxed whitespace-pre-line pr-1"
                    >
                      {service.full}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <motion.button
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => goTo(service.link)}
                    className="inline-flex items-center gap-2 text-[13px] text-[#d4af37] font-semibold"
                  >
                    Explore in detail
                    <span className="h-7 w-7 rounded-full border border-[#d4af37]/60 flex items-center justify-center">
                      <ArrowRight size={14} />
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
