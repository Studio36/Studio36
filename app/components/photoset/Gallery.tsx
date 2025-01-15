'use client'

import { easeInOutCubic } from "@/app/lib/utils";
import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { createRef, Fragment, useEffect, useRef, useState } from "react";

interface GalleryProps {
    gridLayout: boolean,
    images: string[],
    isLoaded: boolean,
    setIsLoaded: (isLoaded: boolean) => void,
}

const imageVariants = {
    initial: {
        opacity: 0,
    },
    padding: {
        opacity: 1,
        width: 'calc(100% - 1.5rem)',
        transition: {
            duration: 1,
            ease: easeInOutCubic
        }
    },
    nopadding: {
        opacity: 1,
        width: 'calc(100% - 0rem)',
        transition: {
            duration: 1,
            ease: easeInOutCubic
        }
    }
}

export default function Gallery({ gridLayout, images, setIsLoaded, isLoaded }: GalleryProps) {
    const container = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState(0);
    const [heights, setHeights] = useState<number[]>([]);
    const [isAnimationGoing, setIsAnimationGoing] = useState(true);
    const elementsRef = useRef(images.map(() => createRef<HTMLDivElement>()));
    const lenis = useLenis();

    let gridImagesOffset = 0;

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

        lenis?.stop(); 
        Promise.all(imagePromises).then(() => {
            console.log('images loaded');
            measureHeights();
        });
    }, [])

    const measureHeights = () => {
        const newHeights = elementsRef.current.map(ref => {
            const element = ref.current;
            if (!element) return 0;
            
            return element.getBoundingClientRect().height;
        });
        console.log('measured heights');
        setIsLoaded(true);
        setTimeout(() => {
            setIsAnimationGoing(false);
            lenis?.start();
        }, 1400)
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
        <motion.div layout transition={{duration: isAnimationGoing ? 0 : 1 , ease: easeInOutCubic}} className={`h-fit col-span-5 grid grid-cols-5 pb-[7.75rem] ${gridLayout ? "gap-y-6" : "gap-y-0"}`} ref={container}>
        {images.map((image, index) => {
            const position = ((index + gridImagesOffset) % 3);
            let isFirst = position === 0;
            let isSecond = position === 1;
            let isThird = position === 2;

            if (isThird && heights[index - 1] <= heights[index - 2]) {
                isFirst = true;
                isSecond = false;
                isThird = false;
                gridImagesOffset++;
            }

            return (
                <Fragment key={`${index}-${isAnimationGoing}`}>
                    <motion.div 
                        layout={!isAnimationGoing}
                        initial={false} 
                        variants={imageVariants} 
                        animate={gridLayout 
                            ? (index + 1) % 5 === 0 
                                ? "nopadding" 
                                : "padding" 
                            : isSecond 
                                ? "nopadding"
                                : "padding"
                        } 
                        transition={{duration: 1, ease: easeInOutCubic}} 
                        className={`${
                            gridLayout 
                                ? 'col-span-1' 
                                : `${
                                    isFirst 
                                        ? `col-span-2` 
                                        : isSecond 
                                            ? 'col-span-3 ' 
                                            : 'col-span-2 -mt-[7.75rem]'
                                }`
                        } overflow-hidden relative`}
                    >
                        <motion.div
                            ref={elementsRef.current[index]} 
                            initial={isAnimationGoing ? 'initial' : false}
                            animate={isLoaded ? 'animate' : 'initial'}
                            layout={!isAnimationGoing}
                            variants={{initial: {x: '-100%'}, animate: {x: 0, transition: {delay: index === 0 ? 0 : 0.4, duration: 1, ease: easeInOutCubic}}}}
                            transition={{duration: 1, ease: easeInOutCubic}}
                            className={`${
                                gridLayout 
                                    ? 'h-[18vw]' 
                                    : `${
                                        isFirst 
                                            ? `${index === 0 ? "h-[calc(100vh-17rem)]" : "h-fit"}` 
                                            : isSecond 
                                                ? 'h-fit' 
                                                : 'h-fit'
                                    }`
                            } overflow-hidden rounded-[1%] relative`}

                        >
                            <motion.img 
                                layout={!isAnimationGoing}
                                transition={{duration: 1, ease: easeInOutCubic}}
                                src={`/photosets/${image}`} 
                                alt="woman" 
                                width={823} 
                                height={1226} 
                                className={`w-full rounded-[1%]`}
                            />
                        </motion.div>
                    </motion.div>
                    {(isThird || isSecond && heights[index] <= heights[index - 1]) && index !== images.length - 1 && !gridLayout && <div className="col-span-5 mb-[7.75rem]"></div>}
                </Fragment>
            );
        })}
        </motion.div>
    </motion.div>
  )
}