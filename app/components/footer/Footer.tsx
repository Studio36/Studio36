'use client'

import { useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { quadEaseInOut } from "@/app/lib/utils";
import { useLenis } from "lenis/react";
import BracketButton from "../buttons/BracketButton";
import SwitchBracketButton from "../buttons/SwitchBracketButton";
import { useToast } from "@/hooks/use-toast";
import LinkButton from "../buttons/LinkButton";

const texts = [
  ["Ai un proiect unde te putem ajuta?", "Oferă-ne mai multe detalii,", "numele tău"],
  ["Cum te putem contacta?", "Pe numărul de telefon,", "060 12 34 56"],
  ["Mulțumim pentru detaliile oferite!", "Revenim în cel mai scurt timp posibil.", ""]
]

export default function Footer() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");

  const [slide, setSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  const controls = useAnimationControls();
  const lenis = useLenis();

  const { toast } = useToast();

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
        ease: quadEaseInOut
      }
    },
    exit: {
      opacity: 0,
        y: 5,
        transition: {
          duration: .3,
          ease: quadEaseInOut
      }
    }
  }

  const nextSlide = () => {
    if (slide === 0 && name === "") {
      toast({
        title: "Numele nu poate fi gol",
        duration: 5000,
      });
      return;
    }

    if (slide === 1 && tel === "") {
      toast({
        title: "Telefonul nu poate fi gol",
        duration: 5000,
      });
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
    <div className='layout-grid col-span-8 mt-48 bg-black min-h-screen relative'>
        <div className="layout-grid absolute top-0 left-0 w-full h-full pointer-events-none">
            {[...Array(7)].map((_, index) => (
              <div key={index} className={`z-0 pointer-events-none relative w-full before:w-full before:absolute ${index === 0 ? "" : "before:border-l"}  before:border-white before:border-opacity-15 before:h-full ${index === 6 ? "before:border-r" : ""}`}></div>
            ))}
          </div>
          <motion.div className="col-span-8 layout-grid" variants={parentVariants} animate={controls}>
            <div className='mt-[14.875rem] col-start-3 col-span-5 mb-32'>
                <p className='text-white mb-6'>[BRIEFING]</p>
                <motion.p className='text-[3.5rem] text-white font-hedwig mb-12' variants={textVariants}>{texts[slide][0]}</motion.p>
                <motion.div variants={textVariants} className="flex items-end gap-4">
                  <p className='text-[3.5rem] text-white font-hedwig'>{texts[slide][1]}</p>
                  <div className='flex-1 relative'>
                    <input size={0} className={`bg-transparent text-white p-0 m-0 h-fit w-full peer focus:outline-none font-hedwig text-[3.5rem] placeholder:opacity-25 ${slide === 2 ? "hidden" : ""}`} type="text" placeholder={texts[slide][2]} value={slide === 0 ? name : tel} onChange={(e) => {if (slide === 0) setName(e.currentTarget.value); else setTel(e.currentTarget.value)}}/>
                    <motion.div className={`left-0 top-0 h-full w-[1px] bg-white absolute peer-focus:hidden ${(slide === 0 && name !== "" ||  slide === 1 && tel !== "") ? "hidden" : ""}`} animate={{opacity: 0, transition: {repeat: Infinity, repeatType: 'reverse', repeatDelay: .6, duration: .01}}}></motion.div>
                  </div>
                </motion.div>
                <div className={`flex ${slide === 2 ? "justify-end" : "justify-between"} mt-24`}>
                  <BracketButton text="ÎNAPOI" width="4.9rem" disabled={slide === 0 || loading} className={`${slide === 2 ? "hidden" : ""}`} onClick={previousSlide}/>
                  <SwitchBracketButton  width={slide === 2 ? "8.1rem" : "9.9rem"} disabled={loading} isSwitchTime={slide === 2} onClick={slide === 2 ? () => {lenis?.scrollTo('top')} : nextSlide} texts={["URMĂTOAREA", "ÎNAPOI SUS"]}/>
                </div>
            </div>
            <div className="col-span-8 h-[1px] bg-white self-end"></div>
            <div className='col-start-3 col-span-5 grid grid-cols-5 self-end my-24'>
                <div className="col-span-2">
                  <div className="flex gap-3 mb-2 text-white text-2xl">
                    <p>E:</p>
                    <LinkButton text='hello@studio36.md' href='/'/>
                  </div>
                  <div className="flex gap-3 mb-2 text-white text-2xl">
                    <p>T:</p>
                    <LinkButton text='+373 (68) 12 34 56' href='/'/>
                  </div>
                  <div className="flex gap-3 text-white text-2xl">
                    <p>A:</p>
                    <p>str. Armenească 136/2 <br/> mun. Chișinău, MD</p>
                  </div>
                </div>
                <div className="col-start-3 col-span-2">
                  <div className="flex gap-3 mb-2 text-white text-2xl">
                    <p>IG:</p>
                    <LinkButton text='@studio36' href='/'/>
                  </div>
                  <div className="flex gap-3 mb-2 text-white text-2xl">
                    <p>FB:</p>
                    <LinkButton text='Studio 36' href='/'/>
                  </div>
                </div>
            </div>
          </motion.div>
    </div>
  )
}
