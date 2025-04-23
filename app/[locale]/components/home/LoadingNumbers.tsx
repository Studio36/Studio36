import { motion } from 'motion/react';
import { easeInOutCubic } from '../../lib/utils';

export default function LoadingNumbers() {
  return (
    <>
        <div className='overflow-hidden relative lg:col-start-5 mb-8 lg:mb-16 h-fit self-end'>
                <p className='text-[12rem] lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none invisible'>0</p>
                <motion.div 
                    className='absolute -right-[1.55rem] lg:-right-[4.4rem] xl:-right-[5.2rem] top-0 will-change-transform' 
                    variants={{count:{y: ['0', '0', '0', '-50%']}, start: {x: ['100%', '0%'], transition: {duration: 1, ease: easeInOutCubic}}, end: {x: ['0%', '100%'], transition: {duration: 1, ease: easeInOutCubic}}}}
                    transition={{ease: easeInOutCubic, duration: 1.75}} >
                        <motion.p transition={{duration: 1, ease:easeInOutCubic}} className='text-[12rem] lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>0</motion.p>
                        <motion.p transition={{duration: 1, ease:easeInOutCubic}} className='text-[12rem] translate-x-8 lg:translate-x-12 lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>1</motion.p>
                </motion.div>
            </div>
            <div className='overflow-hidden relative lg:col-start-6 mb-8 lg:mb-16 h-fit self-end'>
                <p className='text-[12rem] lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none invisible'>0</p>
                <motion.div 
                    className='absolute -right-[1.55rem] lg:-right-[4.4rem] xl:-right-[5.2rem] top-0 will-change-transform' 
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
                    className='absolute -right-[1.55rem] lg:-right-[4.4rem] xl:-right-[5.2rem] top-0 will-change-transform' 
                    variants={{count:{y: ['0', '-50%', '-80%', '-90%']}, start: {x: ['100%', '0%'], transition: {duration: 1, ease: easeInOutCubic}}, end: {x: ['0%', '100%'], transition: {duration: 1, ease: easeInOutCubic}}}}
                    transition={{ease: 'easeInOut', duration: 1.75}}>
                    {
                        [0, 1, 2, 3, 5, 6, 7, 8, 9, 0].map((number, index) => {
                            return <motion.p key={index} transition={{duration: 1, ease:easeInOutCubic}}  className='text-[12rem] lg:text-[29rem] xl:text-[34rem] font-hedwig leading-none'>{number}</motion.p>
                        })
                    }
                </motion.div>
            </div>
    </>
  )
}
