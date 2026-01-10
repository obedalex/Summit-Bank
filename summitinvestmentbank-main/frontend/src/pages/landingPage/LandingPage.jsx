import React from 'react'
import LandingBanner from '../../components/LandingPageComponent/LandingBanner'
import MouseTracker from '../../utils/MouseTracker'
import HeroSection from '../../components/LandingPageComponent/HeroSection'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import Marquee from '../../components/marquee/Marquee'
import About from '../../components/LandingPageComponent/About/About'
import AboutUsVideo from '../../components/submitVideoComponent/AboutUsVideo'
import SEO from '../../components/SEO/SEO'
import { LazyLoadImage } from "react-lazy-load-image-component";
import Footer from '../../components/footer/Footer'
import ExpertiseMain from '../../components/expertise/ExpertiseMain'
import ExpertiseSelector from '../../components/expertise/ExpertiseSelector'

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

export default function LandingPage() {
  return (
    <>
    {/* <LazyLoadImage
  src="/logo.png"
  effect="blur"
  className="hidden w-full h-full object-cover"
/> */}
    <SEO
  title="Summit Investment Bank – Global Finance"
  description="Secure banking, card services, investments & global transfers."
  keywords="bank, fintech, credit card, investment, wealth, transfer"
  image="/logo.png"
  url="https://summitinvestmentglobal.com/"
/>

    <main className="min-h-screen  flex flex-col  pt-20">
   <MouseTracker />
   <NavbarComponent />
   <LandingBanner />
   <HeroSection />
   <Marquee/>
   <About/>
   <AboutUsVideo/>
   <ExpertiseMain/>
   <ExpertiseSelector/>
   <Footer/>
</main>

    
    </>
  )
}
