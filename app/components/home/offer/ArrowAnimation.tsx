'use client'

import {motion} from 'motion/react' 
import Image from 'next/image';

interface ArrowAnimationProps {
  animate: boolean
}

export default function ArrowAnimation({ animate }: ArrowAnimationProps) {

  const arrowVariants = {
    initial: {
      rotate: [0, 0, 0, -45],
      left: 0,
      transition: {duration: 0.4}
    },
    animate: {
      rotate: [-45, 0, 0, 0],
      left: [0, 0, "75%", "100%"],
      transition: { duration: 0.4 }
    },  
  }

  const lineVariants = {
    initial: {
      width: 0,
    },
    animate: {
      width: [0, 0, "75%", "100%"] ,
      transition: { duration: 0.4 }
    }
  }

  return (
    <motion.div className="relative transition duration-300 lg:flex items-center mix-blend-difference flex-1 hidden">
        <motion.div variants={lineVariants} animate={animate ? "animate" : "initial"} className="h-[2px] w-0 absolute top-1/2 -translate-y-1/2 left-0 bg-purewhite"></motion.div>
        <motion.div className='absolute left-0 size-[1.375rem] z-10' animate={animate ? "animate" : "initial"} variants={arrowVariants}>
          <Image src="/icons/arrow-right.svg" width={22} height={22} alt="right arrow" className="absolute left-0 top-0 w-full h-full" color="#fff" />
        </motion.div>
    </motion.div>
  )
}
