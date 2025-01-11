'use client'

import useMousePosition from "../lib/utils"
import { motion } from "motion/react"
import BouncingBall from "./BouncingBall";
import { useEffect, useRef, useState } from "react";

interface CustomCursourProps {
    isActive: boolean,
    text?: string,
    width?: string,
}

export default function CustomCursour({ isActive, text = 'VEZI MAI MULTE', width = "9.3rem" }: CustomCursourProps) {
    const mousePosition = useMousePosition();
    const [bounceCoordinates, setBounceCoordinates] = useState({ x: 0, y: 0, vx: 0, vy: 0 });
    const [inFrame, setInFrame] = useState(true);

    const variants = {
        initial: {
            width: '0.75rem',
            height: '0.75rem',
            borderRadius: '1rem',
        },
        animate: {
            width: width,
            height: '2.75rem',
            borderRadius: '.5rem',
        }
    }

     // Track previous position and timestamp
     const prevPosition = useRef({ x: 0, y: 0, timestamp: 0 });

     useEffect(() => {
         const handleMouseMove = (e: MouseEvent) => {
             const now = Date.now();
             const dt = now - prevPosition.current.timestamp;
             
             if (dt > 0) {
                 // Calculate velocity (pixels per millisecond)
                 const vx = (e.clientX - prevPosition.current.x) / dt;
                 const vy = (e.clientY - prevPosition.current.y) / dt;
                 
                 prevPosition.current = {
                     x: e.clientX,
                     y: e.clientY,
                     timestamp: now
                 };
                 
                 // Scale velocity for animation
                 setBounceCoordinates(prev => ({
                     ...prev,
                     vx: vx * 10,
                     vy: vy * 10
                 }));
             }
         };
 
         const handleMouseLeave = (e: MouseEvent) => {
            setInFrame(false);
             setBounceCoordinates(prev => ({
                 x: e.clientX,
                 y: e.clientY,
                 vx: prev.vx,
                 vy: prev.vy
             }));
         };
 
         document.body.addEventListener("mousemove", handleMouseMove);
         document.body.addEventListener("mouseleave", handleMouseLeave);
         document.body.addEventListener("mouseenter", () => {setInFrame(true)});
 
         return () => {
            document.body.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.addEventListener("mouseenter", () => {setInFrame(true)});
         };
     }, []);

  return (
    <>
        <BouncingBall 
                startX={bounceCoordinates.x} 
                startY={bounceCoordinates.y}
                velocityX={bounceCoordinates.vx}
                velocityY={bounceCoordinates.vy}
                inFrame={inFrame}
            />
        <motion.div className="fixed left-0 top-0 z-[100] pointer-events-none w-fit h-fit hidden lg:block" animate={{x: mousePosition.x, y: mousePosition.y}} transition={{type: 'tween', ease: 'easeOut'}}>
            <motion.span className="z-10 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 whitespace-nowrap text-white" animate={isActive ? {opacity: 1, transition: {delay: .1}} : {opacity: 0, transition: {duration: 0.01}}}>[{text}]</motion.span>
            <motion.div className={`size-[12px] rounded-full bg-red -translate-x-1/2 absolute left-1/2 top-1/2 -translate-y-1/2 ${inFrame ? "" : "hidden"}`} variants={variants} animate={isActive ? "animate" : "initial"}></motion.div>
        </motion.div>
    </>
  )
}
