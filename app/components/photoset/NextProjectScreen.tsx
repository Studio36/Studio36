'use client'

import { useMotionValueEvent, useScroll } from 'motion/react';
import Image from 'next/image'
import { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface NextProjectScreenProps {
    isMobile: boolean
}

export default function NextProjectScreen({isMobile}: NextProjectScreenProps) {
    const ref = useRef(null);
    const [progressNumber, setProgressNumber] = useState("000");
    const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["0.33 1", "1 1"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest * 100);
    setProgressNumber((latest * 100).toFixed(0).padStart(3, "0"))
  })

  return (
    <motion.div layout className='layout-grid lg:h-[300vh] col-span-3 lg:col-span-8 relative' ref={ref}>
        <div className='layout-grid col-span-3 lg:col-span-8 lg:h-screen lg:pt-48 pb-16 lg:pb-20 lg:sticky top-0 left-0'>
            <div className='lg:col-start-2 col-span-3 lg:col-span-2'>
                <p className='mb-4 lg:mb-6 text-sm lg:text-base'>[URMĂTORUL PROIECT]</p>
                <p className='font-hedwig text-2xl lg:text-[3.5rem]'>Tandrețea Florilor</p>
            </div>
            {
                isMobile ? 
                <Image src="/photosets/next-project.jpg" alt="next-project" width={1000} height={1500} className='col-span-3 rounded-[0.25rem] mt-12 mb-4' />
                :
                <div className='col-span-2 flex-1 relative rounded-lg overflow-hidden'>
                    <div className='absolute h-full right-0 top-0 overflow-hidden w-full'>
                        <Image src="/photosets/next-project.jpg" alt="next-project" width={1000} height={1500} className='rounded-lg absolute right-0 top-0 h-full w-[28.8vw] object-cover z-10 max-w-none' />
                    </div>
                    <div className='absolute h-full right-0 top-0 overflow-hidden' style={{width: `${100 - progress}%`}}>
                        <Image src="/photosets/next-project.jpg" alt="next-project" width={1000} height={1500} className='rounded-lg absolute right-0 top-0 h-full w-[28.8vw] object-cover z-10 grayscale max-w-none' />
                    </div>
                </div>
            }
            <p className='text-sm lg:text-base col-span-3 lg:hidden'>[DĂ CLICK PENTRU URMĂTOAREA]</p>
            <div className="hidden grid-cols-2 col-span-2 relative items-end translate-y-8 z-10 lg:grid">
                <div className="absolute -left-1/2 w-1/2 h-full overflow-hidden flex items-end">
                    <p className='lg:text-[29rem] xl:text-[34rem] font-hedwig translate-x-[16%] leading-none'>{progressNumber.split('')[0]}</p>
                </div>
                <div className='overflow-hidden'>
                    <p className='lg:text-[29rem] xl:text-[34rem] font-hedwig translate-x-[16%] leading-none'>{progressNumber.split('')[1]}</p>
                </div>
                <div className='overflow-hidden'>
                    <p className='lg:text-[29rem] xl:text-[34rem] font-hedwig translate-x-[16%] leading-none'>{progressNumber.split('')[2]}</p>
                </div>
            </div>
        </div>
    </motion.div>
  )
}
