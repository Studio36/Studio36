'use client'

import { useAnimationControls, useMotionValueEvent, useScroll } from 'motion/react';
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { easeInOutCubic } from '@/app/[locale]/lib/utils';
import { useLenis } from 'lenis/react';
import { Photoset } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

interface NextProjectScreenProps {
    isMobile: boolean,
    nextPhotoset: Photoset,
    setIsLinkClicked: (linkClicked: boolean) => void
}

export default function NextProjectScreen({isMobile, nextPhotoset, setIsLinkClicked}: NextProjectScreenProps) {
    const ref = useRef(null);
    const [progressNumber, setProgressNumber] = useState("000");
    const [progress, setProgress] = useState(0);
    const controls = useAnimationControls();
    const router = useRouter()
    const lenis = useLenis();
    const t = useTranslations('photoset');

  const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["0.33 1", "1 1"]
  });

  useEffect(() => {
    if (progress < 100 || isMobile) return;

    lenis?.stop();
    controls.start('nextProject');

    setTimeout(() => {
        setIsLinkClicked(true);
    }, 1800 - 700)

    setTimeout(() => {
        router.push({
            pathname: '/photoset/[id]',
            params: {id: nextPhotoset.id}
          });
    }, 1800)
  }, [progress])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (progress >= 100) {
        return;
    }

    setProgress(Number((latest * 100).toFixed(0)));
    setProgressNumber((latest * 100).toFixed(0).padStart(3, "0"));
  })

  return (
    <motion.div layout className='layout-grid lg:h-[300vh] col-span-3 lg:col-span-8 relative' ref={ref}>
        <div className='layout-grid col-span-3 lg:col-span-8 lg:h-screen lg:pt-48 pb-16 lg:pb-20 lg:sticky top-0 left-0'>
            { 
                isMobile && 
                <div className='lg:col-start-2 col-span-3 lg:col-span-2'>
                    <p className='mb-4 lg:mb-6 text-sm lg:text-base'>{`[${t('subtitle4')}]`}</p>
                    <p className='font-hedwig text-2xl lg:text-[3.5rem]'>Tandrețea Florilor</p>
                </div>
            }
            {
                isMobile ? 
                <Image src={nextPhotoset.images[0]} alt="next-project" width={1000} height={1500} className='col-span-3 rounded-[0.25rem] mt-12 mb-4' 
                onClick={() => {
                    router.push({
                        pathname: '/photoset/[id]',
                        params: {id: nextPhotoset.id}
                      });
                }}/>
                :
                <div className='col-start-3 col-span-2 overflow-hidden'>
                    <motion.div animate={controls} variants={{nextProject: {clipPath: "inset(0px 0px 0px 100%)"}}} transition={{duration: 1, ease:easeInOutCubic, delay: 0.8}} className='h-[calc(100vh-17rem)] w-[calc(100%-1.5rem)] relative rounded-lg overflow-hidden'>
                        <Image priority src={nextPhotoset.images[1]} alt="next-project" width={1000} height={1500} style={{clipPath: `inset(0px 0px 0px ${progress}%)`}} className='rounded-lg absolute left-0 top-0 w-full min-h-full object-cover z-10 max-w-none' />
                        <Image priority src={nextPhotoset.images[0]} alt="next-project" width={1000} height={1500} style={{clipPath: `inset(0px ${100 - progress}% 0px 0px)`}} className='rounded-lg absolute left-0 top-0 w-full min-h-full object-cover z-10 max-w-none' />
                    </motion.div>
                </div>
            }
            {
                !isMobile &&
                <div className='col-start-2 col-span-3 lg:col-span-2 flex flex-col justify-between'>
                    <motion.div variants={{nextProject: {transition: {staggerChildren: 0.15, staggerDirection: -1, ease:easeInOutCubic}}}} animate={controls} >
                        <motion.p transition={{duration: 1, ease:easeInOutCubic}} variants={{nextProject: {opacity: 0, y: 15}}} className='mb-4 lg:mb-6 text-sm lg:text-base'>{`[${t('subtitle4')}]`}</motion.p>
                        <motion.p transition={{duration: 1, ease:easeInOutCubic}} variants={{nextProject: {opacity: 0, y: 15}}} className='font-hedwig text-2xl lg:leading-none lg:text-[3.5rem]'>Tandrețea Florilor</motion.p>
                    </motion.div>

                    <motion.div variants={{nextProject: {transition: {delayChildren: 0.5, staggerChildren: 0.15, staggerDirection: -1, ease:easeInOutCubic}}}} animate={controls} className="grid-cols-2 col-span-2 relative items-end translate-y-8 z-10 grid">
                        <div className="absolute -left-1/2 w-1/2 h-full overflow-hidden">
                            <motion.p transition={{duration: 0.75, ease:easeInOutCubic}} variants={{nextProject: {x: '100%'}}} className='absolute lg:-right-[4.4rem] xl:-right-[5.2rem] bottom-0 lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{progressNumber.split('')[0]}</motion.p>
                        </div>
                        <div className='overflow-hidden relative'>
                            <p className='invisible lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{progressNumber.split('')[1]}</p>
                            <motion.p transition={{duration: 0.75, ease:easeInOutCubic}} variants={{nextProject: {x: '100%'}}} className='absolute lg:-right-[4.4rem] xl:-right-[5.2rem] top-0 lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{progressNumber.split('')[1]}</motion.p>
                        </div>
                        <div className='overflow-hidden relative'>
                            <p className='invisible lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{progressNumber.split('')[2]}</p>
                            <motion.p transition={{duration: 0.75, ease:easeInOutCubic}} variants={{nextProject: {x: '100%'}}} className='absolute lg:-right-[4.4rem] xl:-right-[5.2rem] top-0 lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{progressNumber.split('')[2]}</motion.p>
                        </div>
                    </motion.div>
                </div>
            }
            <p className='text-sm lg:text-base col-span-3 lg:hidden'>{`[${t('subtitle5')}]`}</p>
        </div>
    </motion.div>
  )
}
