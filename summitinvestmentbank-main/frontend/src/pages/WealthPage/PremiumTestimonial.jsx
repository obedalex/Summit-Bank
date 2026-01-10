// PremiumTestimonials.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PremiumTestimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRef = useRef(null);

  const testimonials = [
    {
      name: "Elizabeth Mwangi",
      title: "Founder, Nyota Holdings",
      quote:
        "Summit’s private advisory team helped us restructure our capital portfolio for global expansion. Their intelligence and precision are unmatched.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
    },
    {
      name: "Jonathan Wells",
      title: "Executive Director, Helix Commodities",
      quote:
        "Their data-driven market insights allowed us to hedge correctly and capture commodities cycles others completely missed.",
      rating: 5,
      image:
        "https://i.pinimg.com/originals/72/c5/4f/72c54f8683612516c7c71a29fae53a05.jpg",
    },
    {
      name: "María López",
      title: "Private Investor",
      quote:
        "Summit's alternate investment desk introduced me to private deals I previously never had access to — real estate, venture, energy — all carefully curated.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800",
    },
  ];

  // GSAP parallax + reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.fromTo(
        bgRef.current,
        { y: 0 },
        {
          y: -180,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Cards reveal
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 90 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
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
      className="relative w-full py-24 px-6 md:px-12 lg:px-20 overflow-hidden bg-[#05070c]"
    >
      {/* BACKGROUND PARALLAX LAYER */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80')] bg-cover bg-center opacity-[0.25]"
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#05070c] via-[#0b1019] to-black opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.15),_transparent_60%)]" />

      {/* CONTENT */}
      <div className="relative z-20">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
            Voices of <span className="text-[#d4af37]">Trust</span>
            <br /> From Our Private Clients
          </h2>
          <p className="text-gray-300 max-w-xl text-sm md:text-base">
            Summit Investment Global collaborates with high-net-worth families,
            founders, executives, and global investors. These are their stories —
            shaped by excellence, intelligence, and long-term partnership.
          </p>
        </div>

        {/* GRID OF TESTIMONIALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              whileHover={{ scale: 1.04, y: -8 }}
              transition={{ type: "spring", stiffness: 140 }}
              className="relative rounded-3xl bg-gradient-to-b from-[#10141b] to-[#05070c] border border-white/10 shadow-2xl p-7 flex flex-col"
            >
              {/* IMAGE */}
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-14 w-14 rounded-full object-cover border border-white/20 shadow-lg"
                />

                <div>
                  <h4 className="text-white text-lg font-semibold">
                    {t.name}
                  </h4>
                  <p className="text-[#d4af37] text-xs tracking-wide">
                    {t.title}
                  </p>
                </div>
              </div>

              {/* QUOTE */}
              <div className="mt-5 flex gap-3">
                <Quote size={28} className="text-[#d4af37] opacity-70" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t.quote}
                </p>
              </div>

              {/* STARS */}
              <div className="flex mt-6 gap-1">
                {Array(t.rating)
                  .fill(0)
                  .map((_, idx) => (
                    <Star key={idx} size={18} className="text-[#d4af37]" />
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
