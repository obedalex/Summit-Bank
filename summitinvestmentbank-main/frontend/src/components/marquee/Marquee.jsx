import React from 'react'
import FastMarquee from 'react-fast-marquee'

export default function MarqueeComponent() {
  return (
    <div className="w-full h-fit bg-[#d8e28c] to-transparent py-5 border-none">
      <FastMarquee
        speed={50}
        pauseOnHover
        gradient={false}
        className="text-black font-medium text-sm md:text-lg tracking-wide"
      >
        <span className="mx-8">Credit Card ↔ Debit Card</span>
        <span className="mx-8">Card to Card Transfers</span>
        <span className="mx-8">Bank to Bank Transfer</span>
        <span className="mx-8">Card to Bank Transfer</span>
        <span className="mx-8">Wallet to Bank Funding</span>
        <span className="mx-8">Wealth & Investment Services</span>
        <span className="mx-8">International Transfers</span>
        <span className="mx-8">Personal, Corporate & Institutional Banking</span>
      </FastMarquee>
    </div>
  )
}
