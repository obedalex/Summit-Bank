import React from 'react';

export default function RightHero() {
  return (
    <div className="h-full w-full bg-zinc-900 lg:bg-gradient-to-l to-[#B4A16C] via-zinc-900 from-transparent  flex flex-col justify-center px-8 md:px-16 lg:px-24 text-white p-3 rounded-4xl mt-4">

      {/* Top Stat */}
      <div className="mb-10 animate-fade-up">
        <h2 className="text-2xl md:text-6xl font-extrabold text-[#d4af37]">13M+</h2>
        <p className="text-gray-300 mt-2 max-w-xs">
          Clients around the world trust Summit Investment Bank to grow their wealth.
        </p>
      </div>

      {/* History Highlight */}
      <div className="mb-10 animate-fade-up delay-100">
        <p className="text-lg text-gray-300">
          Summit Investment Bank pioneered cross-border digital banking solutions across America.
        </p>
        <p className="text-sm text-white mt-1 italic">
          Your global partner in finance and innovation.
        </p>
      </div>

      {/* Value Proposition */}
      <div className="animate-fade-up delay-200">
        <h2 className="text-4xl md:text-5xl font-bold text-[#63ffb0]">0%</h2>
        <p className="text-gray-300 max-w-xs mt-2">
          Keep more of what you earn — Our commission rate is <span className="text-white font-semibold">0%</span>.
        </p>
      </div>
    </div>
  );
}
