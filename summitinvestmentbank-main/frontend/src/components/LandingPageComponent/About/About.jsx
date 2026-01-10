import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ShieldCheck, Award, Briefcase, ListCheck } from "lucide-react";
import SEO from "../../SEO/SEO";
<script type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I open an account with Summit Bank?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can open an account online in less than 5 minutes using our digital onboarding process."
      }
    },
    {
      "@type": "Question",
      "name": "Does Summit Bank offer international transfers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we support secure global bank-to-bank transfers and wallet integrations."
      }
    }
  ]
}
`}
</script>

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  const cards = [
    {
      title: "Expertise You Can Trust",
      icon: <Briefcase size={28} />,
      text: "Over 20 years of financial experience, guiding clients toward sustainable growth and global opportunities.",
    },
    {
      title: "Integrity at Our Core",
      icon: <ShieldCheck size={28} />,
      text: "Your assets are protected with transparent policies, zero hidden charges, and responsible banking.",
    },
    {
      title: "Global Achievements",
      icon: <Award size={28} />,
      text: "Summit Investment Bank serves millions of clients worldwide with innovative financial solutions.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split heading into words
      const splitHeading = new SplitType(".about-heading", { types: "words" });

      gsap.from(splitHeading.words, {
        opacity: 0,
        y: 30,
        duration:2,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Split card body text into words
      const splitCards = new SplitType(".card-text", { types: "words" });

      gsap.from(splitCards.words, {
        opacity: 0,
        y: 15,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cards-section",
          start: "top 85%",
        },
      });

      // Card stagger in
      gsap.from(".about-card", {
        opacity: 1,
        y: 40,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cards-section",
          start: "top 90%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
     <SEO
      title="Summit Investment Bank – Global Finance"
      description="Secure banking, card services, investments & global transfers."
      keywords="bank, fintech, credit card, investment, wealth, transfer"
      image="/logo.png"
      url="https://summitinvestmentglobal.com/"
    />
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-white px-6 md:px-16 lg:px-24 py-16 text-black"
    >
      {/* Section Indicator */}
      <div className="flex items-center gap-2 mb-6">
        {/* <div className="h-2 w-2 bg-black rounded-full" /> */}
        <ListCheck/>
        <p className="text-xs md:text-sm tracking-[0.2em] text-gray-500 uppercase">
          About Summit Investment Bank
        </p>
      </div>

      {/* Heading + Subheading */}
      <div className="flex flex-col lg:flex-row items-start lg:items-start lg:justify-between gap-6">
        <h1 className="about-heading text-4xl md:text-5xl font-semibold leading-tight">
          Building Trust.
          <br />
          Empowering Finance.
        </h1>

        <p className="text-gray-500 max-w-md lg:-mt-4 lg:text-right text-sm md:text-base">
          At Summit Investment Bank, we blend disciplined risk management with
          modern financial technology to help clients grow, preserve, and
          transfer wealth with confidence.
        </p>
      </div>

      {/* Cards */}
      <div className="cards-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {cards.map((card, index) => (
          <motion.div
          key={index}
          className="about-card relative rounded-2xl px-6 py-2  
          
                       hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                       transition-all duration-300 flex flex-col gap-4"
            whileHover={{}}
          >
            {/* Icon with creative hover driven by card hover using variants */}
            <motion.div
              className="relative w-12 h-12 rounded-full flex items-center justify-center text-black"
              initial="rest"
              whileHover="hover"
              variants={{
                rest: {},
                hover: {},
              }}
              >
              {/* Expanding background aura */}
              <motion.div
                className="absolute inset-0 rounded-full bg-[#d4af37]"
                variants={{
                  rest: { scale: 0.8, opacity: 0.4 },
                  hover: { scale: 1.25, opacity: 1 },
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
              {/* Icon itself */}
              <motion.div
                className="relative z-10"
                variants={{
                  rest: { color: "#000", scale: 1 },
                  hover: { color: "#131722",  scale: 1.1 },
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {card.icon}
              </motion.div>
            </motion.div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-semibold mt-2">
              {card.title}
            </h3>

            {/* Text */}
            <p className="card-text text-gray-600 text-sm md:text-[15px] leading-relaxed">
              {card.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
              </>
  );
}
