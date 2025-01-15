'use client'

import Offer from "./components/home/offer/Offer";
import StageCarousell from "./components/home/hero/StageCarousell";
import ImageScreen from "./components/home/img-screen/ImageScreen";
import RulesAndBenefits from "./components/home/rules/RulesAndBenefits";
import Footer from "./components/footer/Footer";
import CustomCursour from "./components/CustomCursour";
import { useState, useEffect } from "react";
import { easeInOutCubic, responsiveMax } from "./lib/utils";
import MobileHero from "./components/home/hero/MobileHero";
import Header from "./components/header/Header";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [cursourText, setCursourText] = useState("VEZI MAI MULTE");
  const [cursourWidth, setCursourWidth] = useState("9.3rem");
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const lenis = useLenis();

  // Link state
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < responsiveMax);
    };
    
    // Initial check
    checkMobile();

    lenis?.scrollTo(0, {immediate: true, force: true});
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile === null) return null;

  return (
    <>
        <Header setIsLinkClicked={setIsLinkClicked} isLinkClicked={isLinkClicked}/>
        <CustomCursour isActive={isActive} text={cursourText} width={cursourWidth}/>
        <motion.div initial={'initial'} variants={{initial: {opacity: 0}, animate: {opacity: 100 }}} animate={isLinkClicked ? 'initial' : 'animate'} transition={{duration: 0.7, ease: easeInOutCubic}} className="layout-grid col-span-8">
          {isMobile ? <MobileHero /> : <StageCarousell isLinkClicked={isLinkClicked} setIsActive={setIsActive} setCursourText={setCursourText} setCursourWidth={setCursourWidth}/>}
          <Offer setIsActive={setIsActive}/>
          <ImageScreen />
          <RulesAndBenefits />
          <Footer />
        </motion.div>
    </>
  );
}