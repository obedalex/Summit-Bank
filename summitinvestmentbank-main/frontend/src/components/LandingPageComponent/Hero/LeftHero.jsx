import React from 'react';

export default function LeftHero() {
  return (
    <div className="h-full w-full flex flex-col justify-center  text-white">

      {/* Heading */}
      <h1 className="lg:text-5xl text-3xl  font-light font-serif leading-tight text-center lg:text-left">
        Banking Reimagined for the <span className="text-[#d4af37]">Modern World</span>
      </h1>

      {/* Subheading */}
      <p className="text-gray-400 w-full mt-4 text-base lg:text-lg text-center lg:text-left">
        Secure. Global. Intelligent. Discover a smarter way to manage your money.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-8 items-center justify-center lg:items-start lg:justify-start">
        {/* Open Account Button */}
        <button className="px-6 py-3 rounded-full bg-[#d4af37] text-black font-semibold tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300" onClick={()=>window.location.href="/login-signup"}>
          Open Account
        </button>

        {/* Login Button */}
        <button className="px-6 py-3 rounded-full bg-white/10 text-white border border-gray-400/40 backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-300" onClick={()=>window.location.href="/login-signup"}>
          Login
        </button>
      </div>

    </div>
  );
}
