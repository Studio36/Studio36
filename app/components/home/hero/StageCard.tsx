import { motion } from 'framer-motion'
import ParallaxImage from '../../ParallaxImage'
import { quadEaseInOut } from '@/app/lib/utils'

interface StageCardProps {
    slide: number,
    src: string,
    alt: string,
    index: number,
    className?: string,
    duration: number
}

export default function StageCard({ slide, src, alt, index, className, duration }: StageCardProps) {
    const slideVariants = {
        initial: {
          width: '100%'
        },
        appear: {
          width: ["0%", "100%"],
          transition: {
            duration: duration
          }
        },
        animate: {
          width: ['100%', '0%'],
          transition: {
            duration: duration,
            delay: .6
          }
        },
      }

  return (
    <motion.div variants={slideVariants} transition={{ease: quadEaseInOut}} initial={false} animate={slide === index ? "animate" : "initial"} className={`absolute left-0 top-0 overflow-hidden ${slide === index ? "z-10" : "z-0"} h-full`}>
        <ParallaxImage src={src} alt={alt} className={`${className}`}/>
    </motion.div>
  )
}
