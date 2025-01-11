'use client'

import Offer from "./components/home/offer/Offer";
import StageCarousell from "./components/home/hero/StageCarousell";
import ImageScreen from "./components/home/img-screen/ImageScreen";
import RulesAndBenefits from "./components/home/rules/RulesAndBenefits";
import Footer from "./components/footer/Footer";
import CustomCursour from "./components/CustomCursour";
import { useState, useEffect } from "react";
import { responsiveMax } from "./lib/utils";
import MobileHero from "./components/home/hero/MobileHero";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [cursourText, setCursourText] = useState("VEZI MAI MULTE");
  const [cursourWidth, setCursourWidth] = useState("9.3rem");
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < responsiveMax);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile === null) return null;

  return (
    <>
        <CustomCursour isActive={isActive} text={cursourText} width={cursourWidth}/>
        {isMobile ? <MobileHero /> : <StageCarousell setIsActive={setIsActive} setCursourText={setCursourText} setCursourWidth={setCursourWidth}/>}
        <Offer setIsActive={setIsActive}/>
        <ImageScreen />
        <RulesAndBenefits />
        <Footer />
    </>
  );
}