'use client'

import { motion } from "motion/react";
import { easeInOutCubic } from '../lib/utils';
import Header from './header/Header';

interface MotionWrapperProps {
    children: React.ReactNode,
    isLinkClicked: boolean,
    setIsLinkClicked: (v: boolean) => void,

}

export default function MotionWrapper({children, isLinkClicked, setIsLinkClicked}: MotionWrapperProps) {

  return (
    <motion.div initial={'initial'} variants={{initial: {opacity: 0}, animate: {opacity: 100 }}} animate={isLinkClicked ? 'initial' : 'animate'} transition={{duration: 0.7, ease: easeInOutCubic}} className="layout-grid col-span-8 [&>*:not(.header)]:z-[2] bg-white dark:bg-black transition-colors duration-200">
        <Header setIsLinkClicked={setIsLinkClicked} isLinkClicked={isLinkClicked}/>
        {children}
    </motion.div>
  );
}
