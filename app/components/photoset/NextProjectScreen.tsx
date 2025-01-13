'use client'

import { useAnimationControls, useMotionValueEvent, useScroll } from 'motion/react';
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation'
import { easeInOutCubic } from '@/app/lib/utils';

interface NextProjectScreenProps {
    isMobile: boolean
}

export default function NextProjectScreen({isMobile}: NextProjectScreenProps) {
    const ref = useRef(null);
    const [progressNumber, setProgressNumber] = useState("000");
    const [progress, setProgress] = useState(0);
    const controls = useAnimationControls();
    const router = useRouter()

  const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["0.33 1", "1 1"]
  });

  useEffect(() => {
    if (progress < 100) return;

    controls.start('nextProject');

    setTimeout(() => {
        router.push('/photoset/name' + Math.random() * 10)
    }, 1000)
  }, [progress])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (progress >= 100) {
        return;
    }
    setProgress(latest * 100);
    setProgressNumber((latest * 100).toFixed(0).padStart(3, "0"))
  })

  return (
    <motion.div layout className='layout-grid lg:h-[300vh] col-span-3 lg:col-span-8 relative' ref={ref}>
        <div className='layout-grid col-span-3 lg:col-span-8 lg:h-screen lg:pt-48 pb-16 lg:pb-20 lg:sticky top-0 left-0'>
            { 
                isMobile ?? 
                <div className='lg:col-start-2 col-span-3 lg:col-span-2'>
                    <p className='mb-4 lg:mb-6 text-sm lg:text-base'>[URMĂTORUL PROIECT]</p>
                    <p className='font-hedwig text-2xl lg:text-[3.5rem]'>Tandrețea Florilor</p>
                </div>
            }
            {
                isMobile ? 
                <Image src="/photosets/woman-1.jpg" alt="next-project" width={1000} height={1500} className='col-span-3 rounded-[0.25rem] mt-12 mb-4' />
                :
                <div className='col-start-3 col-span-2 h-[calc(100vh-17rem)] w-[calc(100%-1.5rem)] relative rounded-lg overflow-hidden'>
                    <Image src="/photosets/woman-2.jpg" alt="next-project" width={1000} height={1500} style={{clipPath: `inset(0px 0px 0px ${progress}%)`}} className='rounded-lg absolute left-0 top-0 w-full z-10 max-w-none' />
                    <Image src="/photosets/woman-1.jpg" alt="next-project" width={1000} height={1500} style={{clipPath: `inset(0px ${100 - progress}% 0px 0px)`}} className='rounded-lg absolute left-0 top-0 w-full z-10 grayscale max-w-none' />
                </div>
            }
            {
                !isMobile &&
                <div className='col-start-2 col-span-3 lg:col-span-2 flex flex-col justify-between'>
                    <motion.div variants={{nextProject: {transition: {staggerChildren: 0.15, staggerDirection: -1, ease:easeInOutCubic}}}} animate={controls} >
                        <motion.p transition={{duration: 0.7, ease:easeInOutCubic}} variants={{nextProject: {opacity: 0, y: 15}}} className='mb-4 lg:mb-6 text-sm lg:text-base'>[URMĂTORUL PROIECT]</motion.p>
                        <motion.p transition={{duration: 0.7, ease:easeInOutCubic}} variants={{nextProject: {opacity: 0, y: 15}}} className='font-hedwig text-2xl lg:text-[3.5rem]'>Tandrețea Florilor</motion.p>
                    </motion.div>

                    <motion.div variants={{nextProject: {transition: {delayChildren: 0.2, staggerChildren: 0.15, staggerDirection: -1, ease:easeInOutCubic}}}} animate={controls} className="grid-cols-2 col-span-2 relative items-end translate-y-8 z-10 grid">
                        <div className="absolute -left-1/2 w-1/2 h-full overflow-hidden">
                            <motion.p transition={{duration: 0.5, ease:easeInOutCubic}} variants={{nextProject: {x: '100%'}}} className='absolute lg:-right-[4.4rem] xl:-right-[5.2rem] bottom-0 lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{progressNumber.split('')[0]}</motion.p>
                        </div>
                        <div className='overflow-hidden relative'>
                            <p className='invisible lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{progressNumber.split('')[1]}</p>
                            <motion.p transition={{duration: 0.5, ease:easeInOutCubic}} variants={{nextProject: {x: '100%'}}} className='absolute lg:-right-[4.4rem] xl:-right-[5.2rem] top-0 lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{progressNumber.split('')[1]}</motion.p>
                        </div>
                        <div className='overflow-hidden relative'>
                            <p className='invisible lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{progressNumber.split('')[2]}</p>
                            <motion.p transition={{duration: 0.5, ease:easeInOutCubic}} variants={{nextProject: {x: '100%'}}} className='absolute lg:-right-[4.4rem] xl:-right-[5.2rem] top-0 lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{progressNumber.split('')[2]}</motion.p>
                        </div>
                    </motion.div>
                </div>
            }
            <p className='text-sm lg:text-base col-span-3 lg:hidden'>[DĂ CLICK PENTRU URMĂTOAREA]</p>
        </div>
    </motion.div>
  )
}
