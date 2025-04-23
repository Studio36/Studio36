'use client'

import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";

interface MobileGalleryProps {
    images: string[]
}

export default function MobileGallery({images}: MobileGalleryProps) {
    const lenis = useLenis();

    useEffect(() => {
        lenis?.start();
    }, []);

  return (
    <div className="grid col-span-3 grid-cols-3">
        <div className={`h-fit col-span-3 grid grid-cols-3 pb-[7.75rem] gap-y-4`}>
            {images.map((image, index) => {
            return (
                <motion.div key={index} className="col-span-3 rounded-[0.25rem]">
                <Image 
                    src={image} 
                    alt="photo" 
                    className="rounded-[0.25rem]"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                />
                </motion.div>
            )
            })}
        </div>
    </div>
  )
}
