'use client'

import { quadEaseInOut } from '@/app/lib/utils'
import { motion } from 'framer-motion'
import BracketButton from '../buttons/BracketButton'
import { useEffect } from 'react'
import LinkButton from '../buttons/LinkButton'

interface MenuProps {
  open: boolean,
  menuActive: boolean,
  loading: boolean,
  currentHoverLink: number | null,
  setCurrentHoverLink: (currentHoverLink: number | null) => void,
  setOpen: (open: boolean) => void
}

export default function Menu({open, menuActive, loading, currentHoverLink, setCurrentHoverLink, setOpen}: MenuProps) {

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

  const menuContainerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: .3,
        ease: quadEaseInOut
      }
    },
  }

  useEffect(() => {
    
  }, [open])

  return (
    <>
      <div className={`fixed left-0 top-0 w-full h-screen z-50 layout-grid ${menuActive ? "" : "pointer-events-none"}`}>
        <div className='col-start-7 col-span-1 relative w-full h-0'>
          <div className={`col-start-7 w-fit h-fit ml-auto z-50 absolute right-0 top-8 ${menuActive ? "" : "hidden"}`}>
              <BracketButton disabledStyle={false} disabled={loading} width={"4.6rem"} onClick={() => {setOpen(!open)}} text='CLOSE'/>
          </div>
          <motion.div className="col-start-7 col-span-1 relative w-full" variants={menuContainerVariants} animate={menuActive ? "animate" : "initial"} initial={false}>
            <motion.div className='bg-black h-fit w-[27rem] rounded-lg mr-auto -z-10 absolute -right-2 top-6 overflow-hidden' variants={menuVariants} animate={open ? "animate" : "initial"}>
              <motion.div className='absolute left-2 top-2 flex text-white text-2xl gap-1' variants={menuItemVariants}>
                <span>[RO] /</span>
                <LinkButton text='EN' href='/'/>
              </motion.div>
              <div className='w-full h-full pb-6 pt-16 px-8'>
                    <motion.a variants={menuItemVariants} href="/" className={`w-fit text-[3.5rem] ${loading ? "" : "transition duration-200"} text-white block pb-2 ${currentHoverLink === null || loading ? "" : currentHoverLink === 1 ? "" : "blur-sm"}`} onMouseEnter={() => {setCurrentHoverLink(1)}} onMouseLeave={() => {setCurrentHoverLink(null)}}>INDEX</motion.a>
                    <motion.a variants={menuItemVariants} href="/" className={`w-fit text-[3.5rem] ${loading ? "" : "transition duration-200"} text-white block pb-2 ${currentHoverLink === null || loading ? "" : currentHoverLink === 2 ? "" : "blur-sm"}`} onMouseEnter={() => {setCurrentHoverLink(2)}} onMouseLeave={() => {setCurrentHoverLink(null)}}>SERVICII</motion.a>
                    <motion.a variants={menuItemVariants} href="/" className={`w-fit text-[3.5rem] ${loading ? "" : "transition duration-200"} text-white block pb-2 ${currentHoverLink === null  || loading? "" : currentHoverLink === 3 ? "" : "blur-sm"}`} onMouseEnter={() => {setCurrentHoverLink(3)}} onMouseLeave={() => {setCurrentHoverLink(null)}}>PROIECTE</motion.a>
                    <motion.a variants={menuItemVariants} href="/" className={`w-fit text-[3.5rem] ${loading ? "" : "transition duration-200"} text-white block ${currentHoverLink === null || loading ? "" : currentHoverLink === 4 ? "" : "blur-sm"}`} onMouseEnter={() => {setCurrentHoverLink(4)}} onMouseLeave={() => {setCurrentHoverLink(null)}}>CONTACT</motion.a>
                  <div className='my-12 h-[1px] w-[calc(100%+4rem)] bg-white -ml-8'></div>
                  <motion.div variants={menuItemVariants} className='mb-2 flex text-2xl text-white  gap-3'>
                    <p>IG:</p>
                    <LinkButton text='@studio36' href='/'/>
                  </motion.div>
                  <motion.div variants={menuItemVariants} className='mb-2 flex text-2xl text-white  gap-3'>
                    <p>FB:</p>
                    <LinkButton text='Studio 36' href='/'/>
                  </motion.div>
                  <motion.div variants={menuItemVariants} className='mb-2 flex text-2xl text-white  gap-3'>
                    <p>E:</p>
                    <LinkButton text='hello@studio36.md' href='/'/>
                  </motion.div>
                  <motion.div variants={menuItemVariants} className='mb-2 flex text-2xl text-white  gap-3'>
                    <p>T:</p>
                    <LinkButton text='+373 (68) 12 34 56' href='/'/>
                  </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
    </div>
    </>
  )
}
