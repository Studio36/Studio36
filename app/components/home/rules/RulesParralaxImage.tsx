'use client'

import { motion} from "motion/react";

interface ParallaxImageProps {
    src: string,
    alt: string,
    className: string,
    y: number
}

export default function RulesParallasImage({src, alt, className, y}: ParallaxImageProps) {
  return (       
    <div className={`relative overflow-hidden ${className}`}>
        <motion.img src={src} alt={alt} className={`absolute left-0 top-0 h-[130%] w-full object-cover`} style={{ y: -y + "%"}} />
    </div>
  )
}
