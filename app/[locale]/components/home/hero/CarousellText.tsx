import React, { useEffect, useState } from 'react'
import { AnimationControls } from 'motion/react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl';

interface CarousellTextProps {
    animate: AnimationControls,
    slide: number
}

interface CarouselText {
  title: string,
  description: string,
  usage: string
}

export default function CarousellText({ animate, slide }: CarousellTextProps) {
  const t = useTranslations('index.hero.carousel');
  const keys = ['first', 'second', 'third', 'fourth'] as const;
  const [text, setText] = useState<CarouselText>({
    title: t(`${keys[slide]}.title`),
    description: t(`${keys[slide]}.description`),
    usage: t(`${keys[slide]}.usage`)
  });

  useEffect(() => {
    setTimeout(() => {
      setText({
        title: t(`${keys[slide]}.title`),
        description: t(`${keys[slide]}.description`),
        usage: t(`${keys[slide]}.usage`)
      })

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
        <motion.h2 className='font-hedwig mb-4 text-2xl' variants={variants} initial="initial" animate={animate}>{text?.title}</motion.h2>
        <p className='mb-2'>{`[${t("subtitle1")}]`}</p>
        <motion.p className='font-hedwig mb-6' variants={variants} initial="initial" animate={animate}>{text?.description}</motion.p>
        <p className='mb-2'>{`[${t("subtitle2")}]`}</p>
        <motion.p className='font-hedwig' variants={variants} initial="initial" animate={animate}>{text?.usage}</motion.p>
    </div>
  )
}
