import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BusinessProfile() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const data = [
    {
      question: "What Makes Summit Investment Global Different?",
      answers: [
        "Client-first wealth solutions",
        "Institutional-grade security",
        "AI-powered banking insights",
        "Transparent zero-hidden-fees policy",
        "A trusted global financial brand"
      ]
    },
    {
      question: "How Do We Support Business Owners?",
      answers: [
        "Dedicated corporate accounts",
        "Personalized financial advisors",
        "Cashflow and liquidity solutions",
        "Smart automated invoicing",
        "Real-time financial dashboards"
      ]
    },
    {
      question: "Why Do Investors Prefer Summit?",
      answers: [
        "Global market analysis",
        "Diverse portfolio tools",
        "High-tier investment returns",
        "Multi-asset support",
        "Easy performance tracking"
      ]
    },
    {
      question: "What Security Standards Do We Use?",
      answers: [
        "Military-grade encryption",
        "Real-time fraud monitoring",
        "Multi-layer verification",
        "AI threat prevention",
        "Secure global infrastructure"
      ]
    },
    {
      question: "How Do We Ensure Client Success?",
      answers: [
        "Tailored financial planning",
        "24/7 expert advisory",
        "Investment mentoring",
        "Risk management insights",
        "Transparent results reporting"
      ]
    },
    {
      question: "What Are Our Core Banking Advantages?",
      answers: [
        "Instant global transfers",
        "Seamless digital onboarding",
        "Multi-currency support",
        "Smart payment automation",
        "Zero downtime infrastructure"
      ]
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        opacity: 1,
        y: 20,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full mt-4 px-6 md:px-16 lg:px-24 bg-white mb-10 "
    >
      {/* SECTION TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-serif font-light text-gray-800">
          Business <span className="text-[#d4af37]">Profile Insights</span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Explore key questions about Summit Investment Global and discover why we are 
          one of the most trusted banking and investment partners globally.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            ref={(el) => (itemsRef.current[idx] = el)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            {/* QUESTION HEADER */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] shadow-md">
                <HelpCircle size={24} />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 leading-snug">
                {item.question}
              </h3>
            </div>

            {/* ANSWERS */}
            <ul className="space-y-2 mt-4">
              {item.answers.map((ans, i) => (
                <li
                  key={i}
                  className="text-gray-600 text-sm border-l-2 border-[#d4af37] pl-3"
                >
                  {ans}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
