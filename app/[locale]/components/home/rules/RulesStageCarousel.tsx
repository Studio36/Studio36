"use client"

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
// import StageCard from '../hero/StageCard';
import { carousellNumbers } from '@/app/[locale]/lib/utils';
import RulesStageCard from './RulesStageCard';


interface Props { 
    isLoading?: boolean;
    y: number;
}


const RulesStageCarousel = ({isLoading, y} : Props) => {

  const [slide, setSlide] = useState(0);
  const [isFirstSlideLoaded, setFirstSlideLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const controls = useAnimationControls();

  const NextSlide = () => {
    if (loading) return;

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setFirstSlideLoaded(true);
    setLoading(true);
    controls.start('exit');
    setSlide(slide => slide === carousellNumbers.length - 1 ? 0 : slide + 1);

    setTimeout(() => {
      setLoading(false);
    }, 1300);

    // Reset interval
    intervalRef.current = setInterval(NextSlide, 5000);
  }

  useEffect(() => {
    if (!isFirstSlideLoaded) return;

      const timer = setTimeout(() => {
        controls.start('animate');
      }, 600);
      
      return () => clearTimeout(timer);
  }, [isFirstSlideLoaded, controls, slide]);

  useEffect(() => {
    if (isLoading) return; 

    // Initial interval setup
    intervalRef.current = setInterval(NextSlide, 5000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loading, isLoading]);

  useEffect(() => {
    if (isLoading) return; 

    const controlsTimer = setTimeout(() => {
      controls.start('animate');
    }, 200);

    return () => clearTimeout(controlsTimer);
  }, [controls, isLoading]);

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

  return (
    <div className='col-span-4 h-full w-full relative rounded-lg overflow-hidden'>
        <motion.div className='absolute h-full w-full overflow-hidden top-0 right-0' variants={slideVariants} animate={isLoading ? '' : 'appear'}>
            <div className="absolute h-full lg:w-[57vw] w-[100vw] top-0 right-0">
                <div className="h-full w-full relative rounded-lg overflow-hidden">
                    <RulesStageCard y={y} src="/hero-stages/stage4.png" alt="stage1" slide={slide} nextSlide={slide === carousellNumbers.length - 1 ? 0 : slide + 1} index={0} className='h-full lg:w-[57vw] w-[100vw] rounded-lg' duration={.9}/>
                    <RulesStageCard y={y} src="/hero-stages/stage1.png" alt="stage2" slide={slide} nextSlide={slide === carousellNumbers.length - 1 ? 0 : slide + 1} index={1} className='h-full lg:w-[57vw] w-[100vw] rounded-lg' duration={.9}/>
                    <RulesStageCard y={y} src="/hero-stages/stage2.png" alt="stage3" slide={slide} nextSlide={slide === carousellNumbers.length - 1 ? 0 : slide + 1} index={2} className='h-full lg:w-[57vw] w-[100vw] rounded-lg' duration={.9}/>
                    <RulesStageCard y={y} src="/hero-stages/stage3.png" alt="stage4" slide={slide} nextSlide={slide === carousellNumbers.length - 1 ? 0 : slide + 1} index={3} className='h-full lg:w-[57vw] w-[100vw] rounded-lg' duration={.9}/>
                </div>
            </div>
        </motion.div>
    </div> 
  )
}

export default RulesStageCarousel