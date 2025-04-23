'use client'

import { easeInOutCubic, easeInOutCubicMath } from '@/app/[locale]/lib/utils';
import { useLenis } from 'lenis/react';
import Image from 'next/image'
import React, { useEffect } from 'react'
import { motion } from 'motion/react'
import { Photoset } from '@prisma/client';
import { useTranslations } from 'next-intl';

interface SetDescriptionProps {
    gridLayout: boolean,
    setGridLayout: (value: boolean) => void,
    isMobile: boolean,
    photoset: Photoset
}

export default function SetDescription({gridLayout, setGridLayout, isMobile, photoset}: SetDescriptionProps) {
  const [isAnimationGoing, setIsAnimationGoing] = React.useState(false);
  const lenis = useLenis();
  const t = useTranslations('photoset');

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
    <motion.div variants={{animate: {transition: {delayChildren: isMobile ?  0 : 0.75, staggerChildren: 0.1, ease:easeInOutCubic}}}} animate={'animate'} initial={'initial'} className='lg:sticky top-48 left-0 lg:col-start-2 lg:col-span-1 col-span-2 h-fit lg:pb-24 lg:pr-6'>
        <motion.button variants={itemVariants} className="hidden items-center gap-3 mb-6 lg:flex" onClick={() => {setGridLayout(!gridLayout); scrollTop()}} disabled={isAnimationGoing}>
            <p className='text-sm lg:text-base uppercase'>{`[${t('subtitle1')}]`}</p>
            <div>
                <Image src="/icons/view-column.svg" alt="view-columns" width={22} height={22} className={`size-[1.375rem] dark:invert ${gridLayout ? "" : "hidden"}`}/>
                <Image src="/icons/view-grid.svg" alt="view-columns" width={22} height={22} className={`size-[1.375rem] dark:invert ${gridLayout ? "hidden" : ""}`}/>
            </div>
        </motion.button>
        <motion.p variants={itemVariants} className='font-hedwig text-xl lg:text-2xl mb-4 lg:mb-6'>{photoset.title}</motion.p>
        <motion.p variants={itemVariants} className='text-sm lg:text-base uppercase mb-2'>{`[${t('subtitle2')}]`}</motion.p>
        <motion.p variants={itemVariants} className='text-sm lg:text-base font-hedwig mb-4 lg:mb-6'>{photoset.description}</motion.p>
        <motion.p variants={itemVariants} className='text-sm lg:text-base uppercase mb-2'>{`[${t('subtitle3')}]`}</motion.p>
        <motion.p variants={itemVariants} className='text-sm lg:text-base font-hedwig lg:mb-6 mb-12 whitespace-pre'>{photoset.additional_info}</motion.p>
    </motion.div>
  )
}
