import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { Pin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ExpertiseHeader() {
  const headerRef = useRef(null)

  useEffect(() => {
    const splitText = new SplitType('.expertise-heading', { types: 'chars' })

    gsap.from(splitText.chars, {
      opacity: 1,
      y: 40,
      stagger: 0.04,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 80%',
      },
    })
  }, [])

  useEffect(() => {
    gsap.from('.sub-heading', {
      opacity: 1,
      y: 25,
      duration: 0.8,
      delay: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 80%',
      },
    })
  }, [])

  return (
    <section
      ref={headerRef}
      className="w-full  px-4 md:px-8 lg:px-12 flex flex-col items-center text-center"
    >
      {/* Page Indicator */}
      <div className="flex items-center gap-2 mb-4 w-full lg:w-[50%]">
        <Pin className="text-[#d4af37]" size={18} />
        <p className="text-xs md:text-sm tracking-[0.2em] text-gray-500 uppercase">
          Our Expertise At Summit Investment Bank
        </p>
      </div>

      
      <div className='flex items-start justify-between lg:flex-row flex-col'>
{/* Main Heading */}
<div className='flex'>
<div className='h-12 w-3 bg-amber-300 border  border-amber-300'/>

<h1
        className="expertise-heading text-4xl md:text-5xl lg:text-5xl font-semibold leading-tight text-black"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        Building Trust.
        <br />
        Empowering Finance.
      </h1>
      
      </div>
{/* Sub Heading */}
      <p
        className="sub-heading w-full lg:w-[50%]  mt-4 text-black md:text-lg text-sm font-light"
        style={{ fontFamily: 'Lato, sans-serif' }}
      >
        At Summit Investment Bank, we combine <span className="text-[#d4af37] font-semibold">expertise, security,</span> and
        <span className="text-[#d4af37] font-semibold"> global innovation</span> to power financial growth.
      </p>

      </div>

      

      
    </section>
  )
}
