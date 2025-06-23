import { motion } from 'framer-motion'
// import ParallaxImage from '../../ParallaxImage'
import { easeInOutCubic } from '@/app/[locale]/lib/utils'
import RulesParallasImage from './RulesParralaxImage'

interface StageCardProps {
    slide: number,
    src: string,
    alt: string,
    index: number,
    className?: string,
    duration: number,
    nextSlide: number,
    y: number
}

export default function RulesStageCard({ slide, src, alt, index, className, duration, nextSlide, y }: StageCardProps) {
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
    <motion.div variants={slideVariants} transition={{ease: easeInOutCubic}} initial={false} animate={slide === index ? "animate" : "initial"} className={`absolute left-0 top-0 overflow-hidden h-full`} style={{zIndex: slide === index ? 4 : nextSlide === index ? 3 : 0}}>
      <RulesParallasImage src={src} alt={alt} className={`${className}`} y={y} />
    </motion.div>
  )
}
