import React, { useEffect, useState } from 'react'
import { AnimationControls } from 'motion/react'
import { motion } from 'motion/react'
import { carousellDescriptionTexts } from '@/app/lib/utils';

interface CarousellTextProps {
    animate: AnimationControls,
    slide: number
}

export default function CarousellText({ animate, slide }: CarousellTextProps) {
  const [text, setText] = useState(carousellDescriptionTexts[0]);

  useEffect(() => {
    setTimeout(() => {
      setText(carousellDescriptionTexts[slide])
    }, 600)
  }, [slide])

  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: [0, 1],
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: [1, 0],
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <div className='col-span-1 pl-4 mb-[10rem] h-[40rem]'>
        <motion.h2 className='font-hedwig mb-4 text-2xl' variants={variants} initial="initial" animate={animate}>{text[0]}</motion.h2>
        <p className='mb-2'>[DESCRIERE]</p>
        <motion.p className='font-hedwig mb-6' variants={variants} initial="initial" animate={animate}>{text[1]}</motion.p>
        <p className='mb-2'>[UTILIZĂRI]</p>
        <motion.p className='font-hedwig' variants={variants} initial="initial" animate={animate}>{text[2]}</motion.p>
    </div>
  )
}
