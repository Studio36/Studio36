'use client'

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

interface ParallaxImageProps {
    src: string,
    alt: string,
    className?: string,
}

export default function ParallaxImage({src, alt, className}: ParallaxImageProps) {
    const ref = useRef(null);
    const [y, setY] = useState(0)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setY(latest * 20)
    })

  return (       
    <div className={`relative overflow-hidden ${className}`}>
        <motion.img ref={ref} src={src} alt={alt} className={`absolute left-0 top-0 h-[120%] w-full object-cover`} style={{ y: -y + "%"}} />
    </div>
  )
}
