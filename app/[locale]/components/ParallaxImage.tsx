'use client'

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

interface ParallaxImageProps {
    src: string,
    alt: string,
    className?: string,
    priority?: boolean,
    sizes?: string
}

export default function ParallaxImage({src, alt, className, priority = false, sizes = "100vw"}: ParallaxImageProps) {
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
        <motion.div
            ref={ref}
            style={{ y: -y + "%", height: "120%", width: "100%" }}
            className="absolute left-0 top-0"
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                quality={priority ? 100 : 80}
                className="object-cover"
                priority={priority}
            />
        </motion.div>
    </div>
  )
}
