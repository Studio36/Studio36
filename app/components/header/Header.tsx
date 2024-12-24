'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Menu from '../menu/Menu';
import BracketButton from '../buttons/BracketButton';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(setTimeout(() => {}, 0));
  const [currentHoverLink, setCurrentHoverLink] = useState<number | null>(null);

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
      }, 700)
    }
  }, [open])

  return (
    <>
      <div className={`col-span-3 lg:col-span-8 layout-grid sticky top-0 z-50 py-4 lg:py-8 mix-blend-difference`}>
        <Image src="/icons/logo.svg" alt="logo" width={64} height={78} className={`w-12 lg:w-16 lg:col-start-2`}/>
        <p className={`text-white text-2xl col-span-2 hidden lg:block`}>Închiriere Studio & <br/> Servicii Foto & Video</p>
        <div className={`col-start-7 w-fit h-fit ml-auto ${menuActive ? "hidden" : ""}`}>
            <BracketButton disabled={false} className='w-[3.6rem] lg:w-[4.3rem]' onClick={() => {setOpen(!open)}} text='MENU'/>
        </div>

      </div>
      <Menu open={open} menuActive={menuActive} loading={loading} currentHoverLink={currentHoverLink} setCurrentHoverLink={setCurrentHoverLink} setOpen={setOpen}/>
      <div className={`fixed left-0 top-0 w-full h-screen z-40 transition-all duration-500 ${open ? "backdrop-blur-md delay-250" : "backdrop-blur-0 pointer-events-none delay-500"}`}></div>
    </>
  )
}
