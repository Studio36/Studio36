'use client'

import { easeInOutCubic, easeInOutCubicMath } from '@/app/lib/utils';
import { useLenis } from 'lenis/react';
import Image from 'next/image'
import React, { useEffect } from 'react'
import { motion } from 'motion/react'

interface SetDescriptionProps {
    gridLayout: boolean,
    setGridLayout: (value: boolean) => void,
}

export default function SetDescription({gridLayout, setGridLayout}: SetDescriptionProps) {
  const [isAnimationGoing, setIsAnimationGoing] = React.useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setIsAnimationGoing(true);
    setTimeout(() => {
      setIsAnimationGoing(false);
    }, 1400);
  }, [gridLayout])

  const scrollTop = () => {
    lenis?.scrollTo(lenis.scroll === 0 ? 2 : 0, {
      duration: 1, 
      lock: true,
      force: true,
      easing: easeInOutCubicMath,
  })
  }

  const itemVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .5,
            ease: easeInOutCubic
        }
    },
  }

  return (
    <motion.div variants={{animate: {transition: {delayChildren: 0.75, staggerChildren: 0.1, ease:easeInOutCubic}}}} animate={'animate'} initial={'initial'} className='lg:sticky top-48 left-0 lg:col-start-2 lg:col-span-1 col-span-2 h-fit lg:pb-24 lg:pr-6'>
        <motion.div variants={itemVariants} className="hidden items-center gap-3 mb-6 lg:flex">
            <p className='text-sm lg:text-base uppercase'>[Schimbă Vizualizarea]</p>
            <button onClick={() => {setGridLayout(!gridLayout); scrollTop()}} disabled={isAnimationGoing}>
                <Image src="/icons/view-column.svg" alt="view-columns" width={22} height={22} className={`size-[1.375rem] ${gridLayout ? "" : "hidden"}`}/>
                <Image src="/icons/view-grid.svg" alt="view-columns" width={22} height={22} className={`size-[1.375rem] ${gridLayout ? "hidden" : ""}`}/>
            </button>
        </motion.div>
        <motion.p variants={itemVariants} className='font-hedwig text-xl lg:text-2xl mb-4 lg:mb-6'>Ana-Maria</motion.p>
        <motion.p variants={itemVariants} className='text-sm lg:text-base uppercase mb-2'>[DESCRIERE]</motion.p>
        <motion.p variants={itemVariants} className='text-sm lg:text-base font-hedwig mb-4 lg:mb-6'>Un perete curbat alb, ideal pentru a crea imagini fără margini și a experimenta cu lumina și umbrele.</motion.p>
        <motion.p variants={itemVariants} className='text-sm lg:text-base uppercase mb-2'>[INFO]</motion.p>
        <motion.p variants={itemVariants} className='text-sm lg:text-base font-hedwig lg:mb-6 mb-12'>Location: kuuz.studio, Prague <br/> Camera: Canon EOS 60D <br/> Lens: 55 mm <br/> Focal Length: f/5.6 </motion.p>
    </motion.div>
  )
}
