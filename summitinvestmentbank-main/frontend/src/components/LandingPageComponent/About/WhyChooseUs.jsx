import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const cards = [
    {
      id: "01",
      title: "Global Wealth Expertise",
      text: "Over a decade of proven financial intelligence serving clients in 40+ countries.",
      img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200"
    },
    {
      id: "02",
      title: "Next-Gen Digital Banking",
      text: "Seamlessly manage assets with AI-driven insights and state-of-the-art security.",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200"
    },
    {
      id: "03",
      title: "Zero Hidden Fees",
      text: "We believe in transparent banking — no hidden charges, no surprises.",
      img: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1200"
    },
    {
      id: "04",
      title: "Real-Time Asset Monitoring",
      text: "Track every investment with precision and real-time market analytics.",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200"
    },
    {
      id: "05",
      title: "Award-Winning Support",
      text: "Our experts are available 24/7 to provide guidance and investment clarity.",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200"
    },
    {
      id: "06",
      title: "Institutional-Grade Security",
      text: "Every transaction is protected by advanced encryption and multilayer protocols.",
      img: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=1200"
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 80,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full py-20 px-6 md:px-12 lg:px-20  text-black">
      
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-serif font-light">
          Why <span className="text-[#d4af37]">Choose Summit</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Our commitment to excellence sets us apart. Every service we deliver is built
          around transparency, innovation and long-term financial growth.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {cards.map((c, i) => (
          <motion.div
            key={c.id}
            ref={(el) => (cardsRef.current[i] = el)}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative h-[340px] rounded-3xl overflow-hidden shadow-2xl group"
          >
            {/* Background Image */}
            <img
              src={c.img}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-500" />

            {/* Number Badge */}
            <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-xl border border-white/20 
                            h-12 w-12 rounded-full flex items-center justify-center text-[#d4af37] 
                            font-bold text-lg shadow-lg">
              {c.id}
            </div>

            {/* GLASS CONTENT CARD */}
            <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl 
                            bg-white/10 backdrop-blur-xl border border-white/20
                            shadow-lg">
              <h3 className="text-xl font-semibold text-[#d4af37]">
                {c.title}
              </h3>
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                {c.text}
              </p>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}
