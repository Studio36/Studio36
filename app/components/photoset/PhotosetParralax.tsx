'use client'

import { easeInOutCubic } from "@/app/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface PhotosetParallaxProps {
    src: string,
    alt: string,
    className?: string,
    gridLayout: boolean
}

export default function PhotosetParallax({src, alt, className, gridLayout}: PhotosetParallaxProps) {
    const ref = useRef(null);
    const [y, setY] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        setIsAnimating(true)

        setTimeout(() => {
            setIsAnimating(false)
        }, 1000)
    }, [gridLayout])

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (isAnimating) {
            setY(0);
            return;
        }
        setY(latest * 20)
    })

  return (       
    <motion.img 
        layout 
        ref={ref}
        transition={{duration: 1, ease: easeInOutCubic}} 
        src={src} 
        alt="woman" 
        width={823} 
        height={1226} 
        className="w-[120%] rounded-[1.5%]"
        style={{ y: -y + "%"}}
    />
  )
}
