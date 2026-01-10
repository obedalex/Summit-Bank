import React from 'react'
import MouseTracker from '../../utils/MouseTracker'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import Footer from '../../components/footer/Footer'
import HeroWealth from './HeroWealth'
import WealthQuadrantMatrix from './WealthQuadrantMatrix'
import WealthMediaMosaic from './WealthMediaMosaic'
import ExecutiveServicesCarousel from './ExecutiveServicesCarousel'
import PremiumTestimonials from './PremiumTestimonial'

export default function WealthPage() {
  return (
     <>
         <main className="min-h-screen  flex flex-col  pt-20">
           <MouseTracker />
           <NavbarComponent />
        <HeroWealth/>
        <WealthQuadrantMatrix/>
        <WealthMediaMosaic/>
        <ExecutiveServicesCarousel/>
        <PremiumTestimonials/>
           <Footer/>
        </main>
        </>
  )
}
