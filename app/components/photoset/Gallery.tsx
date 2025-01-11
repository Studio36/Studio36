'use client'

import { easeInOutCubic } from "@/app/lib/utils";
import { motion } from "motion/react";
import { createRef, Fragment, useEffect, useRef, useState } from "react";
import ParallaxImage from "../ParallaxImage";
import PhotosetParallax from "./PhotosetParralax";

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

interface GalleryProps {
    gridLayout: boolean        
}

const imageVariants = {
    padding: {
        width: 'calc(100% - 1.5rem)',
        transition: {
            duration: 1,
            ease: easeInOutCubic
        }
    },
    initial: {
        width: 'calc(100% - 0rem)',
        transition: {
            duration: 1,
            ease: easeInOutCubic
        }
    }
}

export default function Gallery({ gridLayout }: GalleryProps) {
    const container = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState(0);
    const [heights, setHeights] = useState<Number[]>([]);
    const elementsRef = useRef(images.map(() => createRef<HTMLDivElement>()));

    useEffect(() => {
        window.addEventListener('resize', () => {
            setContainerHeight(container.current ? container.current.clientHeight : 0);
        });

        const imagePromises = images.map(src => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = `/photosets/${src}`;
                img.onload = resolve;
            });
        });

        Promise.all(imagePromises).then(() => {
            measureHeights();
        });

        return () => window.removeEventListener('resize', () => {
            setContainerHeight(container.current ? container.current.clientHeight : 0);
        });
    }, [])

    const measureHeights = () => {
        const newHeights = elementsRef.current.map(ref => {
            const element = ref.current;
            if (!element) return 0;
            
            // Force layout reflow to get accurate height
            element.style.display = 'none';
            element.offsetHeight; // trigger reflow
            element.style.display = '';
            
            return element.getBoundingClientRect().height;
        });
        setHeights(newHeights);
    };

    useEffect(() => {
        setTimeout(() => {
            setContainerHeight(container.current ? container.current.clientHeight : 0);
        }, 1100);
        setContainerHeight(container.current ? container.current.clientHeight : 0);
    }, [gridLayout, heights])


  return (
    <motion.div layout className="col-start-3 col-end-8 grid grid-cols-5" animate={{height: containerHeight + 'px'}} transition={{duration: 1 , ease: easeInOutCubic}}>
        <motion.div layout className={`h-fit col-span-5 grid grid-cols-5 pb-[7.75rem] ${gridLayout ? "gap-y-6" : "gap-y-0"}`} ref={container}>
        {images.map((image, index) =>{
            const position = (index % 3);
            let isFirst = position === 0;
            let isSecond = position === 1;
            let isThird = position === 2;

            if (isThird && heights[index - 1] <= heights[index - 2]) {
                isFirst = true;
                isSecond = false;
                isThird = false;
            }

            return (
                <Fragment key={index}>
                    <motion.div 
                        ref={elementsRef.current[index]} 
                        layout 
                        initial={false} 
                        variants={imageVariants} 
                        animate={gridLayout 
                            ? (index + 1) % 5 === 0 
                                ? "initial" 
                                : "padding" 
                            : isSecond 
                                ? "initial"
                                : "padding"
                        } 
                        transition={{duration: 1, ease: easeInOutCubic}} 
                        className={`${
                            gridLayout 
                                ? 'col-span-1 h-[18vw]' 
                                : `${
                                    isFirst 
                                        ? 'col-span-2' 
                                        : isSecond 
                                            ? 'col-span-3' 
                                            : 'col-span-2 -mt-[7.75rem]'
                                } h-fit`
                        } overflow-hidden rounded-[1.5%] relative`}
                    >
                        <motion.img 
                            layout 
                            transition={{duration: 1, ease: easeInOutCubic}} 
                            src={`/photosets/${image}`} 
                            alt="woman" 
                            width={823} 
                            height={1226} 
                            className="w-full rounded-[1.5%]"
                        />
                    </motion.div>
                    {(isThird || isSecond && heights[index] <= heights[index - 1]) && index !== images.length - 1 && !gridLayout && <div className="col-span-5 mb-[7.75rem]"></div>}
                </Fragment>
            );
        })}
        </motion.div>
    </motion.div>
  )
}
