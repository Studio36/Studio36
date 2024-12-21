'use client'

import { useEffect, useState } from 'react'
import StageCard from './StageCard';
import { useAnimationControls } from 'motion/react';
import CarousellNumber from './CarousellNumber';
import CarousellText from './CarousellText';
import { motion } from 'framer-motion';

const texts = ["01", "02"];

interface StageCarousellProps {
  setIsActive: (isActive: boolean) => void
}

export default function StageCarousell({ setIsActive }: StageCarousellProps) {
  const [slide, setSlide] = useState(0);
  const [text, setText] = useState(texts[0]);
  
  const controls = useAnimationControls();

  const NextSlide = () => {
    controls.start('exit');
    setSlide(slide === texts.length - 1 ? 0 : slide + 1);
    setTimeout(() => {
      controls.start('animate');
    }, 600);
  }

  useEffect(() => {
    setTimeout(() => {
      console.log(slide)
      setText(texts[slide])
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
    <div className='col-start-2 col-span-7 stage-grid mt-24 mb-48 relative'>
        <div className='col-span-4 h-full w-full relative rounded-lg overflow-hidden' onMouseEnter={() => {setIsActive(true)}} onMouseLeave={() => {setIsActive(false)}}>
            <motion.div className='absolute h-full w-full overflow-hidden top-0 right-0' variants={slideVariants} animate='appear'>
              <div className="absolute h-full w-[57vw] top-0 right-0">
                <div className="h-full w-full relative rounded-lg overflow-hidden">
                  <StageCard src="/hero-stages/stage1.jpg" alt="stage" slide={slide} index={0} className='h-full w-[57vw] rounded-lg' duration={.9}/>
                  <StageCard src="/hero-stages/stage2.jpg" alt="stage" slide={slide} index={1} className='h-full w-[57vw] rounded-lg' duration={.9}/>
                </div>
              </div>
            </motion.div>
        </div> 

        <CarousellText animate={controls} slide={slide}/>
 
        <CarousellNumber text={text} animate={controls} />

        <div className='col-start-7 col-span-1 h-full relative rounded-l-lg overflow-hidden' onClick={NextSlide}>
            <motion.div className='absolute h-full w-full overflow-hidden top-0 right-0' variants={secondSlideVariants} animate='appear'>
              <div className="absolute h-full aspect-[0.2] top-0 right-0">
                <div className="h-full w-full relative rounded-lg overflow-hidden">
                  <StageCard src="/hero-stages/stage1.webp" alt="stage" slide={slide} index={1} className='aspect-[0.2] h-full rounded-l-lg' duration={0.5}/>
                  <StageCard src="/hero-stages/stage2.webp" alt="stage" slide={slide} index={0} className='aspect-[0.2] h-full rounded-l-lg' duration={0.5}/>
                </div>
              </div>
            </motion.div>
        </div> 
    </div>
  )
}