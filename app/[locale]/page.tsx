'use client'

import Offer from "./components/home/offer/Offer";
import StageCarousell from "./components/home/hero/StageCarousell";
import ImageScreen from "./components/home/img-screen/ImageScreen";
import RulesAndBenefits from "./components/home/rules/RulesAndBenefits";
import Footer from "./components/footer/Footer";
import CustomCursour from "./components/CustomCursour";
import { useState, useEffect } from "react";
import { easeInOutCubic, easeInOutCubicMath, responsiveMax } from "./lib/utils";
import MobileHero from "./components/home/hero/MobileHero";
import Header from "./components/header/Header";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import LoadingScreen from "./components/home/LoadingScreen";
import {useLocale, useTranslations} from 'next-intl';
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const lenis = useLenis();
  const searchParams = useSearchParams();
  const t = useTranslations('index');
  const locale = useLocale();
  
  const [cursourWidth, setCursourWidth] = useState(locale === 'en' ? "7rem" : "9.3rem");
  const [cursourText, setCursourText] = useState(t('cursorText.default'));
  
  // Link state
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  // Loading screen 
  const [loadingScreen, setLoadingScreen] = useState<null | boolean>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < responsiveMax);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Check local storage for loading screen
    const lastClickedLinkTime = localStorage.getItem('lastClickedLinkTime') || '';
    setLoadingScreen(Date.now() > Number(lastClickedLinkTime) + 1000 * 5);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const section = searchParams.get('section');
      if (section !== null && lenis && loadingScreen !== null) {
        setTimeout(() => {
          lenis.scrollTo(`#${section}`, {
            duration: 1, 
            lock: true,
            force: true,
            easing: easeInOutCubicMath,
          }); 
        }, loadingScreen ? 5500 : 600)
    }
  }, [lenis, loadingScreen, searchParams])

  if (isMobile === null || loadingScreen === null) return null;

  return (
    <>
        <CustomCursour isActive={isActive} text={cursourText} width={cursourWidth} isVisible={!isLinkClicked}/>
        <AnimatePresence>
          {loadingScreen ? 
            <LoadingScreen setLoadingScreen={setLoadingScreen}/> :
            <motion.div initial={'initial'} variants={{initial: {opacity: 0}, animate: {opacity: 100 }}} animate={isLinkClicked ? 'initial' : 'animate'} transition={{duration: 0.7, ease: easeInOutCubic}} className="layout-grid col-span-8 [&>*:not(.header)]:z-[2] bg-white">
              <Header setIsLinkClicked={setIsLinkClicked} isLinkClicked={isLinkClicked}/>
              {isMobile ? <MobileHero /> : <StageCarousell isLinkClicked={isLinkClicked} setIsActive={setIsActive} setCursourText={setCursourText} setCursourWidth={setCursourWidth}/>}
              <Offer setIsActive={setIsActive}/>
              <ImageScreen />
              <RulesAndBenefits />
              <Footer />
            </motion.div>
          }
        </AnimatePresence>
    </>
  );
}