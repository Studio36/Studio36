'use client'

import { useEffect, useRef, useState } from 'react'
import StageCard from './StageCard';
import { useAnimationControls } from 'motion/react';
import CarousellNumber from './CarousellNumber';
import CarousellText from './CarousellText';
import { motion } from 'framer-motion';
import { carousellNumbers } from '@/app/[locale]/lib/utils';
import { useLocale, useTranslations } from 'next-intl';

interface StageCarousellProps {
  setIsActive: (isActive: boolean) => void,
  setCursourText: (text: string) => void,
  setCursourWidth: (width: string) => void,
  isLinkClicked: boolean,
}

export default function StageCarousell({ setIsActive, setCursourText, setCursourWidth, isLinkClicked }: StageCarousellProps) {
  const [slide, setSlide] = useState(0);
  const [text, setText] = useState(carousellNumbers[0]);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const controls = useAnimationControls();
  const t = useTranslations('index.cursorText');
  const locale = useLocale();

  const NextSlide = () => {
    if (loading || isLinkClicked) return;

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setLoading(true);
    controls.start('exit');
    setSlide(slide => slide === carousellNumbers.length - 1 ? 0 : slide + 1);

    setTimeout(() => {
      controls.start('animate');
    }, 600);

    setTimeout(() => {
      setLoading(false);
    }, 1300);

    // Reset interval
    intervalRef.current = setInterval(NextSlide, 5000);
  }

  useEffect(() => {
    // Initial interval setup
    intervalRef.current = setInterval(NextSlide, 5000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loading, isLinkClicked]);

  useEffect(() => {
    setTimeout(() => {
      setText(carousellNumbers[slide])
    }, 600)
  }, [slide])

  useEffect(() => {
    setTimeout(() => {
      controls.start('animate')
    }, 200)
  }, [controls])

  const slideVariants = {
    initial: {
      width: '0%'
    },
    appear: {
      width: ["0%","100%"],
      transition: {
        duration: .9,
        delay: 0.2
      }
    },
  }

  const secondSlideVariants = {
    initial: {
      width: '0%'
    },
    appear: {
      width: ["0%","100%"],
      transition: {
        duration: .5,
        delay: 0.2
      }
    },
  }
  
  return (
    <div className='col-start-2 col-span-7 stage-grid mt-24 relative'>
        <div className='col-span-4 h-full w-full relative rounded-lg overflow-hidden' onMouseEnter={() => {setIsActive(true);}} onMouseLeave={() => {setIsActive(false)}}>
            <motion.div className='absolute h-full w-full overflow-hidden top-0 right-0' variants={slideVariants} animate='appear'>
              <div className="absolute h-full w-[57vw] top-0 right-0">
                <div className="h-full w-full relative rounded-lg overflow-hidden">
                <StageCard src="/hero-stages/stage4.jpg" alt="stage1" slide={slide} nextSlide={slide === carousellNumbers.length - 1 ? 0 : slide + 1} index={0} className='h-full w-[57vw] rounded-lg' duration={.9}/>
                <StageCard src="/hero-stages/stage1.jpg" alt="stage2" slide={slide} nextSlide={slide === carousellNumbers.length - 1 ? 0 : slide + 1} index={1} className='h-full w-[57vw] rounded-lg' duration={.9}/>
                <StageCard src="/hero-stages/stage2.jpg" alt="stage3" slide={slide} nextSlide={slide === carousellNumbers.length - 1 ? 0 : slide + 1} index={2} className='h-full w-[57vw] rounded-lg' duration={.9}/>
                <StageCard src="/hero-stages/stage3.jpg" alt="stage4" slide={slide} nextSlide={slide === carousellNumbers.length - 1 ? 0 : slide + 1} index={3} className='h-full w-[57vw] rounded-lg' duration={.9}/>
                </div>
              </div>
            </motion.div>
        </div> 

        <CarousellText animate={controls} slide={slide}/>
 
        <CarousellNumber text={text} animate={controls} />

        <div className={`col-start-7 col-span-1 h-full relative rounded-l-lg overflow-hidden ${loading ? "cursor-default" : "cursor-pointer"}`} onClick={NextSlide} onMouseEnter={() => {setIsActive(true); setCursourText(t('next')); setCursourWidth(locale === 'en' ? "7.7rem" : "7.7rem")}} onMouseLeave={() => {setIsActive(false);setCursourText(t('default')); setCursourWidth(locale === 'en' ? "7rem" : "9.3rem")}}>
            <motion.div className='absolute h-full w-full overflow-hidden top-0 right-0' variants={secondSlideVariants} animate='appear'>
              <div className="absolute h-full aspect-[0.2] top-0 right-0">
                <div className="h-full w-full relative rounded-lg overflow-hidden">
                <StageCard src="/hero-stages/stage1.jpg" alt="stage" nextSlide={slide === carousellNumbers.length - 1 ? 0 : slide + 1} slide={slide} index={0} className='aspect-[0.2] h-full rounded-l-lg' duration={0.5}/>
                <StageCard src="/hero-stages/stage2.jpg" alt="stage" nextSlide={slide === carousellNumbers.length - 1 ? 0 : slide + 1} slide={slide} index={1} className='aspect-[0.2] h-full rounded-l-lg' duration={0.5}/>
                <StageCard src="/hero-stages/stage3.jpg" alt="stage" nextSlide={slide === carousellNumbers.length - 1 ? 0 : slide + 1} slide={slide} index={2} className='aspect-[0.2] h-full rounded-l-lg' duration={0.5}/>
                <StageCard src="/hero-stages/stage4.jpg" alt="stage" nextSlide={slide === carousellNumbers.length - 1 ? 0 : slide + 1} slide={slide} index={3} className='aspect-[0.2] h-full rounded-l-lg' duration={0.5}/>
                </div>
              </div>
            </motion.div>
        </div> 
    </div>
  )
}