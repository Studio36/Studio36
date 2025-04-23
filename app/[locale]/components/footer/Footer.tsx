'use client'

import { useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { easeInOutCubic } from "@/app/[locale]/lib/utils";
import { useLenis } from "lenis/react";
import BracketButton from "../buttons/BracketButton";
import SwitchBracketButton from "../buttons/SwitchBracketButton";
import LinkButton from "../buttons/LinkButton";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");

  const [slide, setSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  const controls = useAnimationControls();
  const inputControls = useAnimationControls();
  const lenis = useLenis();
  const t = useTranslations('footer');
  const locale = useLocale();

  const parentVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  }

  const textVariants = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: .3,
        ease: easeInOutCubic
      }
    },
    exit: {
      opacity: 0,
        y: 5,
        transition: {
          duration: .3,
          ease: easeInOutCubic
      }
    }
  }

  const nextSlide = () => {
    if (slide === 0 && name === "") {
      inputControls.start('wrong');
      return;
    }

    if (slide === 1 && tel === "") {
      inputControls.start('wrong');
      return;
    }
    controls.start('exit');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSlide(slide + 1);
      controls.start('animate');
    }, 600);
  }

  const previousSlide = () => {
    setLoading(true);
    controls.start('exit');
    setTimeout(() => {
      setLoading(false);
      setSlide(slide - 1);
      controls.start('animate');
    }, 600);
  }

  return (
    <div className='layout-grid col-span-3 lg:col-span-8 mt-[7.75rem] z-10 lg:mt-48 min-h-screen relative before:content-[""] before:absolute before:-left-4 before:top-0 before:w-[calc(100%+2rem)] lg:before:w-[calc(100%+1rem)] before:h-full before:bg-black before:dark:bg-white before:-z-10 before:transition-all before:duration-300' id="contact">
        <div className="layout-grid absolute top-0 left-0 w-full h-full pointer-events-none">
            {[...Array(7)].map((_, index) => (
              <div key={index} className={`z-0 pointer-events-none relative w-full before:w-full before:absolute before:border-l before:border-white before:dark:border-black before:dark:border-opacity-15 before:border-opacity-15 before:h-full ${index > 2 ? "hidden lg:block" : ""} ${index === 2 ? "before:border-r lg:before:border-r-0" : ""} ${index === 6 ? "before:border-r" : ""}`}></div>
            ))}
          </div>
          <motion.div className="col-span-3 lg:col-span-8 layout-grid" variants={parentVariants} animate={controls}>
            <div className='mt-[8.6rem] lg:mt-[14.875rem] lg:col-start-3 col-span-3 lg:col-span-5 lg:mb-32 mb-12'>
                <p className='text-white dark:text-black  mb-2 lg:mb-6 text-sm lg:text-base'>{`[${t('subtitle1')}]`}</p>
                <motion.p className='text-2xl lg:leading-tight lg:text-[3.5rem] text-white dark:text-black  font-hedwig mb-6 lg:mb-12 w-2/3 lg:w-full' variants={textVariants}>{t(`lines.${slide}.line1`)}</motion.p>
                <motion.div variants={textVariants} className="flex items-end gap-4 w-2/3 lg:w-full relative">
                  <p className='text-2xl lg:leading-tight lg:text-[3.5rem] text-white dark:text-black  font-hedwig'>{t(`lines.${slide}.line2`)}</p>
                  <div className={`lg:flex-1 bottom-0 ${slide === 0 ? locale === 'en' ? 'left-[5.5rem]' : "left-20" : locale === 'en' ? 'left-[6.4rem]' : "left-[5.5rem]"} lg:left-auto lg:bottom-auto absolute lg:relative`}>
                    <div className="relative">
                      <input size={0} className={`bg-transparent text-white dark:text-black  p-0 m-0 h-fit w-full peer focus:outline-none font-hedwig text-2xl lg:leading-tight lg:text-[3.5rem] placeholder:opacity-25 ${slide === 2 ? "hidden" : ""}`} type="text" value={slide === 0 ? name : tel} onChange={(e) => {inputControls.set('initial'); if (slide === 0) setName(e.currentTarget.value); else if (e.currentTarget.value.length <= 9) setTel(e.currentTarget.value)}}/>
                      <motion.div animate={inputControls} variants={{initial: {color: "#f1f1f1"}, wrong: {color: '#F42A2A', x: [-7, 7, -7, 7, 0]}}} transition={{duration: 0.3}} className={`left-0 top-0 h-full absolute text-2xl lg:leading-tight lg:text-[3.5rem] font-hedwig text-white opacity-25 pointer-events-none ${(slide === 0 && name !== "" ||  slide === 1 && tel !== "") ? "hidden" : ""}`}>{t(`lines.${slide}.placeholder`)}</motion.div>
                    </div>
                    <motion.div className={`left-0 top-0 h-full w-[1px] bg-white absolute peer-focus:hidden ${(slide === 0 && name !== "" ||  slide === 1 && tel !== "") ? "hidden" : ""}`} animate={{opacity: 0, transition: {repeat: Infinity, repeatType: 'reverse', repeatDelay: .6, duration: .01}}}></motion.div>
                  </div>
                </motion.div>
                <div className={`flex ${slide === 2 ? "justify-end" : "justify-between"} mt-24`}>
                  <BracketButton text={t('backButton')} disabled={slide === 0 || loading} className={`${slide === 2 ? "hidden" : ""}`} onClick={previousSlide}/>
                  <SwitchBracketButton className={slide === 2 ? locale === 'en' ? 'w-[7.6rem] lg:w-[9.2rem]' : "w-[7rem] lg:w-[8.1rem]" : locale === 'en' ? 'w-[3.2rem] lg:w-[3.8rem]' : "w-[8.2rem] lg:w-[9.9rem]"} disabled={loading} isSwitchTime={slide === 2} onClick={slide === 2 ? () => {lenis?.scrollTo('top')} : nextSlide} texts={[(t('nextButton1')), t('nextButton2')]}/>
                </div>
            </div>
            <div className="-ml-8 translate-x-4 lg:ml-0 lg:translate-x-0 col-start-1 col-span-3 lg:col-span-8 h-[1px] bg-white dark:bg-black self-end"></div>
            <div className='col-start-1 lg:col-start-3 col-span-3 lg:col-span-5 grid grid-cols-3 lg:grid-cols-5 self-end mt-12 mb-24 lg:my-24'>

                <div className="lg:col-start-3 col-span-2 lg:hidden">
                  <div className="flex gap-3 mb-4 text-white dark:text-black text-base lg:text-2xl">
                    <p>IG:</p>
                    <LinkButton targetBlank text='@photo.studio36' href='https://www.instagram.com/photo.studio36/'/>
                  </div>
                  <div className="flex gap-3 mb-4 text-white dark:text-black text-base lg:text-2xl">
                    <p>FB:</p>
                    <LinkButton targetBlank text='Studio 36 - Foto & Video' href='https://www.facebook.com/profile.php?id=61572898073057'/>
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="flex gap-3 mb-4 text-white dark:text-black text-base lg:text-2xl">
                    <p>E:</p>
                    <LinkButton text='fotostudio36@yahoo.com' href='mailto:fotostudio36@yahoo.com'/>
                  </div>
                  <div className="flex gap-3 mb-4 text-white dark:text-black text-base lg:text-2xl">
                    <p>T:</p>
                    <LinkButton text='+373 (69) 594 218' href='tel:+37369594218'/>
                  </div>
                  <div className="flex gap-3 mb-4 lg:mb-0 text-white dark:text-black text-base lg:text-2xl">
                    <p>A:</p>
                    <p className="whitespace-nowrap">str. Meșterul Manole 5A <br/> mun. Chișinău, MD</p>
                  </div>
                </div>

                <div className="lg:col-start-3 col-span-2 hidden lg:block">
                  <div className="flex gap-3 mb-4 text-white dark:text-black text-base lg:text-2xl">
                    <p>IG:</p>
                    <LinkButton targetBlank text='@photo.studio36' href='https://www.instagram.com/photo.studio36/'/>
                  </div>
                  <div className="flex gap-3 mb-4 text-white dark:text-black text-base lg:text-2xl">
                    <p>FB:</p>
                    <LinkButton text='Studio 36 - Foto & Video' href='https://www.facebook.com/profile.php?id=61572898073057'/>
                  </div>
                </div>
            </div>
          </motion.div>
          <div className="absolute bottom-4 lg:bottom-8 left-0 flex justify-between w-full px-[7.3%]">
            <p className="text-white dark:text-black ">© {new Date().getFullYear()}</p>
            <div className="flex gap-2 group">
              <span className="text-white dark:text-black ">by Studio Modvis</span>
              <Image src="/icons/modvis.svg" alt="studio-modvis" className="transition duration-200 group-hover:rotate-[360deg] mix-blend-difference" width={10} height={10}/>
            </div>
          </div>
    </div>
  )
}
