import React from "react";

export default function RightAbout() {
  return (
    <div className="h-full w-full bg-zinc-900 lg:bg-gradient-to-l from-transparent via-zinc-900 to-[#B4A16C]
      flex flex-col justify-between px-8 md:px-16 lg:px-20 py-10 text-white rounded-3xl">

      {/* COMPANY AGE */}
      <div className="animate-fade-up">
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#d4af37]">18+ Years</h2>
        <p className="text-gray-300 mt-2 max-w-sm">
          Empowering clients with world-class banking, investment intelligence, and wealth solutions.
        </p>
      </div>

      {/* GLOBAL FOOTPRINT */}
      <div className="animate-fade-up delay-100">
        <p className="text-lg text-gray-300">
          Operating across 40+ countries with a unified vision of financial freedom.
        </p>
        <p className="text-sm text-gray-500 mt-1 italic">
          A legacy built on trust, innovation & transparency.
        </p>
      </div>

      {/* VALUE PROPOSITION */}
      <div className="animate-fade-up delay-200">
        <h2 className="text-4xl md:text-5xl font-bold text-[#63ffb0]">#1 Ranked</h2>
        <p className="text-gray-300 max-w-sm mt-2">
          Rated as one of the leading global digital investment banks of 2025.
        </p>
      </div>
    </div>
  );
}
