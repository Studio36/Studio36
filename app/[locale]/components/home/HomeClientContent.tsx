'use client'

import React, { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl';
import { useLenis } from 'lenis/react';
import { useSearchParams } from 'next/navigation';
import { easeInOutCubicMath, responsiveMax } from '../../lib/utils';
import LoadingScreen from './LoadingScreen';
import CustomCursour from '../CustomCursour';
import StageCarousell from './hero/StageCarousell';
import MobileHero from './hero/MobileHero';
import Offer from './offer/Offer';
import MotionWrapper from '../MotionWrapper';

interface MotionWrapperProps {
    children: React.ReactNode;
}

export default function HomeClientContent({children}: MotionWrapperProps) {
    const locale = useLocale();
    const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const lenis = useLenis();
  const searchParams = useSearchParams();
  const t = useTranslations('index');
  
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
        {loadingScreen ?
        <LoadingScreen setLoadingScreen={setLoadingScreen}/> :
        <MotionWrapper isLinkClicked={isLinkClicked} setIsLinkClicked={setIsLinkClicked}>
            {isMobile ? <MobileHero /> : <StageCarousell setIsActive={setIsActive} setCursourText={setCursourText} setCursourWidth={setCursourWidth}/>}
            <Offer setIsActive={setIsActive}/>
            {children}
        </MotionWrapper>
        }
    </>
  );
}

