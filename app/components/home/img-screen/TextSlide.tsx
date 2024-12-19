'use client'

import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react';

interface TextSlideProps {
  text: string
}

export default function TextSlide({text}: TextSlideProps) {
    const ref = useRef(null);
    const [y, setY] = useState(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 0.5", "0.5 0"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setY(1 - Math.abs(latest * 2 - 1));
    })

  return (
    <motion.div ref={ref} className='h-screen flex justify-center items-center' style={{opacity: y}}>
        <p className='font-hedwig text-white text-[3.5rem] max-w-[70rem] text-center'>{text}</p>
    </motion.div>
  )
}
