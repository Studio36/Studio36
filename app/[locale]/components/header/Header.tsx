/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef, useState } from 'react'
import Menu from '../menu/Menu';
import BracketButton from '../buttons/BracketButton';
import Link from '../buttons/Link';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });
import animation from '@/public/animations/logo.json';
import dynamic from 'next/dynamic';

interface HeaderProps {
  setIsLinkClicked: (isLinkClicked: boolean) => void,
  isLinkClicked: boolean,
  hasContact?: boolean,
}

export default function Header({ setIsLinkClicked, isLinkClicked, hasContact = true }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(setTimeout(() => {}, 0));
  const [currentHoverLink, setCurrentHoverLink] = useState<number | null>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const t = useTranslations('header');
  const lottieRef = useRef<any>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  
    // Check screen size on mount and window resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        
        // Set initial state
        checkScreenSize();

        // Add event listener for resize
        window.addEventListener('resize', checkScreenSize);
        
        // Clean up
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

  useEffect(() => {
    if (open) {
      clearTimeout(timeoutRef.current);
      setMenuActive(true);

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 800)

    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 800)
      timeoutRef.current = setTimeout(() => {
        setMenuActive(false);
        setTimeout(() => {
          setIsLinkClicked(false);
        }, 1600)
      }, 700)
    }
  }, [open, setIsLinkClicked])

  useEffect(() => {
    if (isLinkClicked) {
      setOpen(false);
    }
  }, [isLinkClicked])

  return (
    <>
      <div className={`col-span-3 lg:col-span-8 layout-grid sticky top-0 z-50 py-4 lg:py-8 mix-blend-difference header`}>
        
        <Link href='/' setIsLinkClicked={setIsLinkClicked} className='lg:col-start-2 aspect-[0.82] w-12 lg:w-16'>
            <Lottie
              ref={lottieRef}
              animationData={animation}
              speed={1.75}
              className='w-full h-full object-cover'
              onClick={() => {setTimeout(() => {
                setIsLinkClicked(false);
              }, 1600)}}
              onMouseEnter={() => {
                if (isDesktop) lottieRef.current?.play();
              }}
              onMouseLeave={() => {
                if (isDesktop) lottieRef.current?.stop();
              }}
            />
        </Link>

        <p className={`text-white text-2xl col-span-2 hidden lg:block`}>{t('title1')} <br/> {t('title2')}</p>
        <div className={`col-start-7 w-fit h-fit ml-auto ${menuActive ? "hidden" : ""}`}>
            <BracketButton isInHeader disabled={false} className='w-[3.6rem] lg:w-[4.3rem]' onClick={() => {setOpen(!open)}} text='MENU'/>
        </div> 
          <button className='absolute size-4 m-2 rounded-full right-8 top-8 border-2 border-white hidden lg:block' onClick={() => {if(resolvedTheme === 'dark') setTheme('light'); else setTheme('dark')}}>
            <div className="absolute w-1/2 h-full rounded-l-full bg-white left-0 top-0"></div>
          </button>
      </div>
      <Menu hasContact={hasContact} open={open} menuActive={menuActive} loading={loading} currentHoverLink={currentHoverLink} setCurrentHoverLink={setCurrentHoverLink} setOpen={setOpen} setIsLinkClicked={setIsLinkClicked}/>
      <div className={`header fixed left-0 top-0 w-full h-screen z-40 transition-all duration-500 ${open ? "backdrop-blur-md delay-250" : "backdrop-blur-0 pointer-events-none delay-500"}`}></div>
    </>
  )
}