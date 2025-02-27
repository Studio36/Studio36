import { easeInOutCubic } from '@/app/[locale]/lib/utils';
import { AnimationControls, motion } from 'motion/react'

interface CarousellNumberProps {
  text: string,
  animate: AnimationControls
}

export default function CarousellNumber({ text, animate }: CarousellNumberProps) {

  const numbers = text.split('');

  const variants = {
    animate: {
      transition: {
        staggerChildren: 0.15
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.15,
        staggerDirection: -1,
      },
    }
  }

  const numbersVariant = {
    initial: { x: "-100%" },
    animate: {
      x: ["100%", "0%"],
      transition: {
        ease: easeInOutCubic,
        duration: .6,
      }
    },
    exit: {
      x: "100%",
      transition: {
        ease: easeInOutCubic,
        duration: .6,
      }
    }
  }

  return (
    <motion.div 
      className='stage-grid col-span-7 absolute left-0 top-0 h-full w-full pointer-events-none' 
      variants={variants}
      initial="animate"
      animate={animate}
    >
        
        <div className='z-20 col-start-4 col-span-1 w-full overflow-hidden flex justify-end items-end pointer-events-none' >
          <motion.span className='lg:text-[29rem] xl:text-[34rem] font-hedwig -mr-20 -mb-[2.5rem] leading-none' variants={numbersVariant}>{numbers[0]}</motion.span>
        </div>
        <div className='z-20 col-start-5 col-span-1 w-full overflow-hidden flex justify-end items-end relative pointer-events-none'>
          <motion.span className='lg:text-[29rem] xl:text-[34rem] font-hedwig -mr-20 -mb-[2.5rem] leading-none' variants={numbersVariant}>{numbers[1]}</motion.span>
        </div>
    </motion.div>
  )
}
