import React, { useEffect, useState } from 'react'
import { TypingText } from './TypingText'
import { AnimationControls } from 'motion/react'
import { motion } from 'motion/react'

interface CarousellTextProps {
    animate: AnimationControls,
    slide: number
}

const texts = [
    ["Ciclorama", "Un perete curbat alb, ideal pentru a crea imagini fără margini și a experimenta cu lumina și umbrele.", "Fotoshooturi profesionale, videoclipuri muzicale, campanii comerciale."],
    ["Living Modern","O canapea în stil contemporan, perfect pentru fotografii elegante și ședințe relaxate.", "Fotografie editorială, portrete stilizate, ședințe de familie."],
]

export default function CarousellText({ animate, slide }: CarousellTextProps) {
  const [text, setText] = useState(texts[0]);

  useEffect(() => {
    setTimeout(() => {
      setText(texts[slide])
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
        <motion.p className='font-hedwig mb-4 text-2xl' variants={variants} initial="initial" animate={animate}>{text[0]}</motion.p>
        <p className='font-hedwig mb-2'>[DESCRIERE]</p>
        <motion.p className='font-hedwig mb-6' variants={variants} initial="initial" animate={animate}>{text[1]}</motion.p>
        <p className='font-hedwig mb-2'>[UTILIZĂRI]</p>
        <motion.p className='font-hedwig' variants={variants} initial="initial" animate={animate}>{text[2]}</motion.p>
    </div>
  )
}
