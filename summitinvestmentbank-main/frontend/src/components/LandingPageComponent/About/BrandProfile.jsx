import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BrandProfile() {
  const cardsRef = useRef([]);

  const handleMail = () => {
    const subject = encodeURIComponent("Inquiry – Summit Investment Global");
    const body = encodeURIComponent(
      `Hello Summit Investment Global Team,

I would like to inquire more about your services.

Warm regards,
[Your Name]`
    );
    window.location.href = `mailto:info@summitinvestmentglobal.com?subject=${subject}&body=${body}`;
  };

  // GSAP entrance
  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div
      className="w-full py-24 px-6 md:px-12  relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1511883040705-6011fad9edfc?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Soft dark overlay for readability */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none"></div>

      {/* Actual content wrapper */}
      <div className="relative z-20">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16">
          
          {/* LEFT TEXT */}
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-gray-900 leading-snug">
              The <span className="text-[#d4af37]">Summit Brand</span>
              <br /> Excellence • Trust • Innovation
            </h2>
          </div>

          {/* RIGHT SUBTEXT */}
          <p className="text-gray-700 max-w-xl mt-6 lg:mt-0 text-base lg:text-lg">
            A legacy of world-class financial intelligence, providing global banking
            solutions for individuals, businesses, and investors seeking a smarter future.
          </p>
        </div>

        {/* GRID OF CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* -----------------------------------------------------------
              CARD 1 — Tallest 
          ------------------------------------------------------------ */}
          <motion.div
            ref={(el) => (cardsRef.current[0] = el)}
            whileHover={{ scale: 1.02 }}
            className="relative h-[550px] rounded-3xl overflow-hidden shadow-2xl group bg-white"
          >
            <div className="h-1/2 relative">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* Arrow */}
              <button
                onClick={() => (window.location.href = "/login-signup")}
                className="absolute top-4 right-4 bg-[#d4af37] text-black h-12 w-12 rounded-full 
                          flex items-center justify-center shadow-lg hover:scale-110 transition"
              >
                <ArrowRight />
              </button>

              {/* Contact */}
              <button
                onClick={handleMail}
                className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 
                          rounded-xl border border-white/30 hover:bg-[#d4af37] hover:text-black transition shadow-xl"
              >
                Contact Us
              </button>
            </div>

            <div className="h-1/2 bg-white p-7 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-gray-800">
                A Brand Powered by Integrity
              </h3>
              <p className="text-gray-600 mt-3 leading-relaxed">
                Summit IG is recognized globally for its transparent approach, cutting-edge
                fintech innovation, and unwavering dedication to financial excellence.
              </p>
            </div>
          </motion.div>

          {/* -----------------------------------------------------------
              CARD 2 — Bottom Aligned (1/3 height)
          ------------------------------------------------------------ */}
          <motion.div
            ref={(el) => (cardsRef.current[1] = el)}
            whileHover={{ scale: 1.02 }}
            className="relative h-[180px] rounded-3xl overflow-hidden shadow-xl group self-end"
          >
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200"
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 p-5">
              <h3 className="text-white text-xl font-semibold">Global Reach</h3>
              <button
                onClick={handleMail}
                className="mt-3 bg-white/20 text-white px-3 py-2 rounded-lg backdrop-blur-md border 
                          border-white/30 hover:bg-[#d4af37] hover:text-black transition"
              >
                Contact Support
              </button>
            </div>
          </motion.div>

          {/* -----------------------------------------------------------
              CARD 3 — Bottom Aligned (2/3 height)
          ------------------------------------------------------------ */}
          <motion.div
  ref={(el) => (cardsRef.current[2] = el)}
  whileHover={{ scale: 1.03 }}
  transition={{ type: "spring", stiffness: 120 }}
  className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group self-end"
>
  {/* TOP GLASS PANEL */}
  <div className="h-[50%] relative z-20 bg-white/40 backdrop-blur-xl border-b border-white/60 p-7 flex flex-col justify-center shadow-lg">
    
    {/* GOLD ACCENT BAR */}
    <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#a38724] mb-4" />

    <h3 className="text-2xl font-semibold text-gray-900 drop-shadow-sm">
      Modern Banking,<br/>Reimagined
    </h3>

    <p className="text-gray-700 text-sm mt-3 leading-relaxed">
      Built for forward-thinking investors with intelligent insights at every step.
    </p>

    {/* PREMIUM CTA BUTTON */}
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => (window.location.href = "/login-signup")}
      className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl 
                 bg-gradient-to-r from-[#d4af37] to-[#b5962a] text-black 
                 font-semibold shadow-lg hover:shadow-xl transition-all"
    >
      Get Started 
      <ArrowRight size={18} />
    </motion.button>
  </div>

  {/* BACKGROUND IMAGE SECTION */}
  <div className="absolute inset-0 h-full w-full">
    <img
      src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1200"
      className="absolute bottom-0 w-full h-[50%] object-cover
                 group-hover:scale-110 transition-all duration-700"
    />

    {/* LUXURY GOLD GRADIENT OVERLAY */}
    <div className="absolute bottom-0 inset-x-0 h-[70%]
                    bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

    {/* ANGLED GOLD LIGHT SWEEP */}
    <motion.div
      animate={{ x: ["-150%", "120%"] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-0 h-40 w-40 bg-gradient-to-br 
                from-[#d4af37]/30 to-transparent blur-2xl rotate-45"
    />
  </div>
</motion.div>


          {/* -----------------------------------------------------------
              CARD 4 — Tallest 
          ------------------------------------------------------------ */}
          <motion.div
            ref={(el) => (cardsRef.current[3] = el)}
            whileHover={{ scale: 1.02 }}
            className="relative h-[550px] rounded-3xl overflow-hidden shadow-2xl group"
          >
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-20 p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-white text-2xl font-semibold">
                  Financial Excellence, Worldwide
                </h3>
                <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                  Delivering premium digital finance solutions trusted across the globe.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleMail}
                  className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl border 
                            border-white/30 hover:bg-[#d4af37] hover:text-black transition"
                >
                  Contact
                </button>

                <button
                  onClick={() => (window.location.href = "/login-signup")}
                  className="h-12 w-12 rounded-full bg-[#d4af37] text-black flex items-center justify-center 
                            hover:scale-110 transition shadow-lg"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
