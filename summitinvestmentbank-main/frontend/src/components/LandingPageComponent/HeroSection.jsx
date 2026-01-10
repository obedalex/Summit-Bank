import React from 'react'
import LeftHero from './Hero/LeftHero'
import MiddleHero from './Hero/MiddleHero'
import RightHero from './Hero/RightHero'

export default function HeroSection() {
  return (
    <div className='hero-section w-full h-full lg:min-h-screen lg:py-4 lg:px-6  p-4  ' >
      <div className=' flex flex-col lg:flex-row  gap-4 mt-4 lg:mt-14  '>
{/* Right Hero */}
        <RightHero/>
        {/* Middle Hero */}
        <MiddleHero/>
        
        {/* left Hero */}
        <LeftHero/>
      </div>
        
      
    </div>
  )
}
