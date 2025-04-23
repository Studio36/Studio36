import { easeInOutCubic } from '@/app/[locale]/lib/utils';
import { useLenis } from 'lenis/react';
import { motion, useAnimationControls } from 'motion/react';
import { useEffect } from 'react';

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

        <div className='overflow-hidden relative lg:col-start-5 mb-8 lg:mb-16 h-fit self-end'>
            <p className='text-[12rem] lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none invisible'>0</p>
            <motion.div 
                className='absolute -right-[1.55rem] lg:-right-[4.4rem] xl:-right-[5.2rem] top-0' 
                variants={{count:{y: ['0', '0', '0', '-50%']}, start: {x: ['100%', '0%'], transition: {duration: 1, ease: easeInOutCubic}}, end: {x: ['0%', '100%'], transition: {duration: 1, ease: easeInOutCubic}}}}
                transition={{ease: easeInOutCubic, duration: 1.75}} >
                    <motion.p transition={{duration: 1, ease:easeInOutCubic}} className='text-[12rem] lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>0</motion.p>
                    <motion.p transition={{duration: 1, ease:easeInOutCubic}} className='text-[12rem] translate-x-8 lg:translate-x-12 lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>1</motion.p>
            </motion.div>
        </div>
        <div className='overflow-hidden relative lg:col-start-6 mb-8 lg:mb-16 h-fit self-end'>
            <p className='text-[12rem] lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none invisible'>0</p>
            <motion.div 
                className='absolute -right-[1.55rem] lg:-right-[4.4rem] xl:-right-[5.2rem] top-0' 
                transition={{ease: easeInOutCubic, duration: 2}} 
                variants={{count: {y: ['0', '-20%', '-60%', '-90%']}, start: {x: ['100%', '0%'], transition: {duration: 1, ease: easeInOutCubic}}, end: {x: ['0%', '100%'], transition: {duration: 1, ease: easeInOutCubic}}}}>
                {
                    [0, 1, 2, 3, 5, 6, 7, 8, 9, 0].map((number, index) => {
                        return <motion.p key={index} className='text-[12rem] lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{number}</motion.p>
                    })
                }
            </motion.div>
        </div>
        <div className='overflow-hidden relative lg:col-start-7 mb-8 lg:mb-16 h-fit self-end'>
            <p className='text-[12rem] lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none invisible'>0</p>
            <motion.div 
                className='absolute -right-[1.55rem] lg:-right-[4.4rem] xl:-right-[5.2rem] top-0' 
                variants={{count:{y: ['0', '-50%', '-80%', '-90%']}, start: {x: ['100%', '0%'], transition: {duration: 1, ease: easeInOutCubic}}, end: {x: ['0%', '100%'], transition: {duration: 1, ease: easeInOutCubic}}}}
                transition={{ease: 'easeInOut', duration: 1.75}}>
                {
                    [0, 1, 2, 3, 5, 6, 7, 8, 9, 0].map((number, index) => {
                        return <motion.p key={index} transition={{duration: 1, ease:easeInOutCubic}}  className='text-[12rem] lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{number}</motion.p>
                    })
                }
            </motion.div>
        </div>
    </motion.div>
  )
}
