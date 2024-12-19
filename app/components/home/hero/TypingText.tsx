"use client"
 
import * as React from 'react';
import { AnimationControls, motion } from 'framer-motion';
 
export function TypingText({ text, className, animate }: { 
    text: string, 
    animate: AnimationControls, 
    className?: string 
}) {

    const contVariants = {
        initial: {
            transition: {
                staggerChildren: 0.2
              },
        },
        animate: {
            transition: {
                staggerChildren: 0.2
              },
        },
        exit: {
            transition: {
                staggerChildren: 0.2
              },
        }
    }

    const variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: [0, 1],
        },
        exit: {
            opacity: [1, 0],
        }
    }

    return (
        <div className={`${className}`}>
           {text.split('').map((letter, index) => (
                <motion.span
                key={index}
                variants={variants}
                animate={animate}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                {letter}
                </motion.span>
            ))}
        </div>
    );
}