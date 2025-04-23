'use client'

import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import TextSlide from './TextSlide'
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ImageScreen() {
  const ref = useRef(null);
  const [y, setY] = useState(0);
  const t = useTranslations("index.overlay");

  const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["0 0", "1 0"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
      setY(latest * 6)
  })

  return (
    <div className='col-start-1 col-span-3 lg:col-span-8 -mt-28 lg:-mt-48 relative mb-[50vh] pointer-events-none' ref={ref}>
      <div className='sticky w-[calc(100%+2rem)] lg:w-full -ml-4 lg:ml-0 h-[50vh] top-0 left-0 pointer-events-none' style={{opacity: y}} >
        <video src='/videos/video.mov' className='absolute left-0 top-0 w-full h-screen object-cover -z-10' playsInline autoPlay muted loop/>
      </div>
      <div className='h-[20vh]'></div>
      <TextSlide text={t('screen1')} />
      <TextSlide text={t('screen2')}/>
    </div>
  )
}
