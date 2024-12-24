'use client'

import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import TextSlide from './TextSlide'
import { useRef, useState } from 'react';

export default function ImageScreen() {
  const ref = useRef(null);
  const [y, setY] = useState(0);

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
        <motion.video src='/videos/video.mov' className='absolute left-0 top-0 w-full h-screen object-cover -z-10' playsInline autoPlay muted loop/>
      </div>
      <div className='h-[20vh]'></div>
      <TextSlide text='Suntem o echipă creativă și experimentată ce oferă servicii foto-video, cu o abordare personalizată pentru fiecare proiect.' />
      <TextSlide text='Asigurăm flexibilitate și o comunicare eficientă. Studioul este situat convenabil în Chișinău, sectorul Ciocana.'/>
    </div>
  )
}
