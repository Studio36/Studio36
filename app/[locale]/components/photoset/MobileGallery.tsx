'use client'

import { useLenis } from "lenis/react";
import { motion } from "motion/react";
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
            {images.map((image, index) =>{
                return (
                    <motion.img key={index} src={image} alt="woman" className="col-span-3 rounded-[0.25rem]"/>
                )
            })}
        </div>
    </div>
  )
}
