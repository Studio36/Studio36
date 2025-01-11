'use client'

import { motion } from "motion/react";

const images = [
    "woman-1.jpg",
    "woman-2.jpg",
    "woman-3.jpg",
    "woman-4.jpg",
    "woman-5.jpg",
    "woman-6.jpg",
    "woman-7.jpg",
    "woman-8.jpg",
    "woman-9.jpg",
]

// const imageVariants = {
//     padding: {
//         width: 'calc(100% - 1.5rem)',
//         transition: {
//             duration: 1,
//             ease: easeInOutCubic
//         }
//     },
//     initial: {
//         width: 'calc(100% - 0rem)',
//         transition: {
//             duration: 1,
//             ease: easeInOutCubic
//         }
//     }
// }

export default function MobileGallery() {
  return (
    <div className="grid col-span-3 grid-cols-3">
        <div className={`h-fit col-span-3 grid grid-cols-3 pb-[7.75rem] gap-y-4`}>
            {images.map((image, index) =>{
                return (
                    <motion.img key={index} src={`/photosets/${image}`} alt="woman" className="col-span-3 rounded-[0.25rem]"/>
                )
            })}
        </div>
    </div>
  )
}
