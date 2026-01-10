import React from 'react'
import MouseTracker from '../../utils/MouseTracker'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import Footer from '../../components/footer/Footer'
import AboutHero from './AboutHero'

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

export default function AboutPage() {
  return (
    <>
     <main className="min-h-screen  flex flex-col  pt-20">
       <MouseTracker />
       <NavbarComponent />
       <AboutHero/>
       {/* <LandingBanner />
       <HeroSection />
       <Marquee/>
       <About/>
       <AboutUsVideo/>
       <ExpertiseMain/>
       <ExpertiseSelector/> */}
       <Footer/>
    </main>
    </>
  )
}
