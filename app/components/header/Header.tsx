'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { quadEaseInOut } from '@/app/lib/utils';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menuHover, setMenuHover] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(setTimeout(() => {}, 0));

  const menuVariants = {
    initial: {
      width: '6.2rem',
      height: '3.2rem',
      transition: {
        delay: 0.5,
        staggerChildren: 0.04,
        staggerDirection: -1
      }
    },
    animate: {
      width: "27rem",
      height: "43.5rem",
      transition: {
        duration: .5,
        ease: quadEaseInOut,
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    },
  }

  const menuContainerVariants = {
    initial: {
      opacity: 0,
      x: 20,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: .3,
        ease: quadEaseInOut
      }
    },
  }

  const menuItemVariants = {
    initial: {
      opacity: 0,
      y: 5
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: .3,
        ease: quadEaseInOut
      }
    },
  }

  useEffect(() => {
    if (open) {
      clearTimeout(timeoutRef.current);
      setMenuActive(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        setMenuActive(false);
      }, 700)
    }
  }, [open])

  return (
    <>
      <div className='col-span-8 layout-grid sticky top-0 z-50 mix-blend-difference py-8'>
        <Image src="/icons/logo.svg" alt="logo" width={64} height={78} className='w-16 col-start-2'/>
        <p className='text-white text-2xl col-span-2'>Închiriere Studio & <br/> Servicii Foto & Video</p>
        <button className='text-2xl col-start-7 text-white w-fit h-fit ml-auto' onClick={() => {setOpen(!open)}} onMouseEnter={() => {setMenuHover(true)}} onMouseLeave={() => {setMenuHover(false)}}>[MENU]</button>
      </div>
      <div className={`fixed left-0 top-0 w-full h-screen z-40 layout-grid transition-all duration-500 ${open ? "backdrop-blur-md delay-250" : "backdrop-blur-0 pointer-events-none delay-500"}`}>
        <motion.div className="col-start-7 col-span-1 relative w-full z-50" variants={menuContainerVariants} animate={menuActive ? "animate" : menuHover ? "animate" : "initial"} initial={false}>
          <motion.div className='bg-black h-fit w-[27rem] rounded-lg mr-auto -z-10 absolute -right-2 top-6 overflow-hidden' variants={menuVariants} animate={open ? "animate" : "initial"}>
            <motion.div className='absolute left-2 top-2 flex text-white text-2xl gap-1' variants={menuItemVariants}>
              <Link href="/">[RO] /</Link>
              <Link href="/">EN</Link>
            </motion.div>
            <div className='w-full h-full pb-6 pt-16 px-8'>
                <motion.a variants={menuItemVariants} href="/" className='w-fit text-[3.5rem]  text-white block mb-2'>INDEX</motion.a>
                <motion.a variants={menuItemVariants} href="/" className='w-fit text-[3.5rem]  text-white block mb-2'>SERVICII</motion.a>
                <motion.a variants={menuItemVariants} href="/" className='w-fit text-[3.5rem]  text-white block mb-2'>PROIECTE</motion.a>
                <motion.a variants={menuItemVariants} href="/" className='w-fit text-[3.5rem]  text-white block'>CONTACT</motion.a>
                <div className='my-12 h-[1px] w-[calc(100%+4rem)] bg-white -ml-8'></div>
                <motion.div variants={menuItemVariants} className='mb-2 flex text-2xl text-white  gap-3'>
                  <p>IG:</p>
                  <Link href="/">@studio36</Link>
                </motion.div>
                <motion.div variants={menuItemVariants} className='mb-2 flex text-2xl text-white  gap-3'>
                  <p>FB:</p>
                  <Link href="/">Studio 36</Link>
                </motion.div>
                <motion.div variants={menuItemVariants} className='mb-2 flex text-2xl text-white  gap-3'>
                  <p>E:</p>
                  <Link href="/">hello@studio36.md</Link>
                </motion.div>
                <motion.div variants={menuItemVariants} className='mb-2 flex text-2xl text-white  gap-3'>
                  <p>T:</p>
                  <Link href="/">+373 (68) 12 34 56</Link>
                </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
