import { useLenis } from 'lenis/react';
import { motion, useAnimationControls } from 'motion/react';
import { Suspense, useEffect } from 'react';
import LoadingNumbers from './LoadingNumbers';

interface LoadingScreenProps {
    setLoadingScreen: (loading: boolean) => void
}

export default function LoadingScreen({setLoadingScreen} : LoadingScreenProps) {
    const controls = useAnimationControls();
    const lenis = useLenis();

    useEffect(() => {
        controls.start('start');
        lenis?.stop();
        document.body.classList.add('overflow-hidden');

        setTimeout(() => {
            controls.start('count');

            setTimeout(() => {
                controls.start('end');

                setTimeout(() => {
                    setLoadingScreen(false);
                    lenis?.start();
                    document.body.classList.remove('overflow-hidden');
                }, 1500)
            }, 2100)
        }, 1500);
    }, [controls, setLoadingScreen]);

  return (
    <motion.div exit={{opacity: 0}} className='layout-grid fixed left-0 top-0 w-full px-4 lg:pl-0 lg:pr-[10px] h-full z-[999] bg-white dark:bg-black' animate={controls} variants={{start: {transition: {staggerChildren: 0.15, staggerDirection: 1}}, end: {transition: {staggerChildren: 0.15, staggerDirection: -1}}}}>
        {[...Array(7)].map((_, index) => (
            <div key={index} className={`-z-10 pointer-events-none relative w-full before:w-full before:absolute ${index > 2 ? "hidden lg:block" : "lg:block"} ${index === 0 ? "before:border-l lg:before:border-l-0" : "before:border-l"} z-[1] before:border-black before:dark:border-white before:dark:border-opacity-15 before:border-opacity-15 before:h-screen ${index === 6 ? "before:border-r" : ""} ${index === 2 ? "before:border-r lg:before:border-r-0" : ""}`} ></div>
        ))}

    <Suspense fallback={<div className="h-screen" />}>
      <LoadingNumbers />
    </Suspense>

    </motion.div>
  )
}
