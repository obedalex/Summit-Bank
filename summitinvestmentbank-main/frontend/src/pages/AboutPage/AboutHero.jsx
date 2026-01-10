import React from "react";
import LeftAbout from "./LeftAbout";
import MiddleAbout from "./MiddleAbout";
import RightAbout from "./RightAbout";
import HeroAbout from "../../components/LandingPageComponent/Hero/HeroAbout";
import WhyChooseUs from "../../components/LandingPageComponent/About/WhyChooseUs";
import BusinessProfile from "../../components/LandingPageComponent/About/BusinessProfile";
import BrandProfile from "../../components/LandingPageComponent/About/BrandProfile";

export default function AboutHero() {
  return (
    <div className="w-full h-full lg:min-h-screen ">
     <HeroAbout/>
     <WhyChooseUs/>
     <BrandProfile/>
     <BusinessProfile/>
    </div>
  );

}