"use client"

import { motion, useAnimation, Variants } from 'framer-motion'
import { useEffect } from 'react'

interface BracketButtonProps {
	text: string
	className?: string
	onClick: () => void
	isInHeader?: boolean
	textSize?: string
	isCloseBtn?: boolean
	menuOpen?: boolean
    menuActive?: boolean
}

export default function BracketButtonAnimated({
	className,
	onClick,
	text,
	isInHeader = false,
	textSize = 'text-xl lg:text-2xl',
	isCloseBtn = false,
	menuOpen = false,
    menuActive = false
}: BracketButtonProps) {
	
	const controls = useAnimation()

	const underlineVariants: Variants = {
        // Menu button states
        menuButtonDefault: {
            scaleX: 1,
			transformOrigin: 'left',
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        },
        menuButtonHover: {
            scaleX: 0,
			transformOrigin: 'left',
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        },
        menuButtonClicked: {
            scaleX: 0,
			transformOrigin: 'left',
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        },
        // Close button states
        closeButtonInitial: {
            scaleX: 0,
			transformOrigin: 'right',
            transition: {
                duration: 0,
            }
        },
        closeButtonShow: {
            scaleX: 1,
			transformOrigin: 'right',
            transition: {
                delay: 0.3, // Delay to show after menu animation
                duration: 0.5,
                ease: 'easeInOut'
            }
        },
        closeButtonHover: {
            scaleX: 0,
			transformOrigin: 'right',
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        },
        closeButtonClicked: {
            scaleX: 0,
			transformOrigin: 'right',
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        }
    }


	useEffect(() => {
        if (isCloseBtn) {
            // Close button logic
            if (menuActive && menuOpen) {
                controls.start('closeButtonShow')
            } else if (menuActive && !menuOpen) {
                controls.start('closeButtonClicked')
            } else {
                controls.start('closeButtonInitial')
            }
        } else {
            // Menu button logic
            if (menuOpen || menuActive) {
                controls.start('menuButtonClicked')
            } else {
                controls.start('menuButtonDefault')
            }
        }
    }, [menuOpen, menuActive, isCloseBtn, controls])

	return (
		<div
            className={`hover:opacity-75 transition-opacity duration-500 relative group cursor-pointer ${className}`}
            onClick={() => {
                // Trigger click animation immediately
                if (isCloseBtn) {
                    controls.start('closeButtonClicked')
                } else {
                    controls.start('menuButtonClicked')
                }
                onClick()
            }}
            // onMouseEnter={() => {
            //     // Only show hover animation if menu is not in transition
            //     if (!menuOpen && !menuActive) {
            //         if (isCloseBtn) {
            //             controls.start('closeButtonHover')
            //         } else {
            //             controls.start('menuButtonHover')
            //         }
            //     }
            // }}
            // onMouseLeave={() => {
            //     // Return to appropriate state on mouse leave
            //     if (!menuOpen && !menuActive) {
            //         if (isCloseBtn) {
            //             controls.start('closeButtonShow')
            //         } else {
            //             controls.start('menuButtonDefault')
            //         }
            //     }
            // }}
        >
            <button className={`${isInHeader ? 'text-white' : 'dark:text-black text-white'} ${textSize}`}>
                {text}
            </button>

            <motion.div
                variants={underlineVariants}
                animate={controls}
                initial={isCloseBtn ? 'closeButtonInitial' : 'menuButtonDefault'}
                className={`bottom-[-0.125rem] h-[1px] w-full left-0 right-0 ${isInHeader ? 'bg-white' : 'dark:bg-black bg-white'} absolute`}
            />
        </div>
	)
}
