'use client'

import { useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { quadEaseInOut } from "@/app/lib/utils";
import { useLenis } from "lenis/react";
import Link from 'next/link';

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
                  <div className='flex-1'>
                    <input size={0} className={`bg-transparent text-white p-0 m-0 h-fit w-full focus:outline-none font-hedwig text-[3.5rem] placeholder:opacity-25 ${slide === 2 ? "hidden" : ""}`} type="text" placeholder={texts[slide][2]} value={slide === 0 ? name : tel} onChange={(e) => {if (slide === 0) setName(e.currentTarget.value); else setTel(e.currentTarget.value)}}/>
                  </div>
                </motion.div>
                <div className={`flex ${slide === 2 ? "justify-end" : "justify-between"} mt-24`}>
                  <button className={`text-white text-2xl underline disabled:opacity-25 transitino duration-200 ${slide === 2 ? "hidden" : ""}`} disabled={slide === 0 || loading} onClick={previousSlide}>ÎNAPOI</button>
                  <button className="text-white text-2xl underline disabled:opacity-25 transitino duration-200" disabled={loading} onClick={slide === 2 ? () => {lenis?.scrollTo('top')} : nextSlide}>{slide === 2 ? "ÎNAPOI SUS" : "URMĂTOAREA"}</button>
                </div>
            </div>
            <div className="col-span-8 h-[1px] bg-white self-end"></div>
            <div className='col-start-3 col-span-5 grid grid-cols-5 self-end my-24'>
                <div className="col-span-2">
                  <div className="flex gap-3 mb-2 text-white text-2xl">
                    <p>E:</p>
                    <Link href="/">hello@studio36.md</Link>
                  </div>
                  <div className="flex gap-3 mb-2 text-white text-2xl">
                    <p>T:</p>
                    <Link href="/">+373 (68) 12 34 56</Link>
                  </div>
                  <div className="flex gap-3 text-white text-2xl">
                    <p>A:</p>
                    <p>str. Armenească 136/2 <br/> mun. Chișinău, MD</p>
                  </div>
                </div>
                <div className="col-start-3 col-span-2">
                  <div className="flex gap-3 mb-2 text-white text-2xl">
                    <p>IG:</p>
                    <Link href="/">@studio36</Link>
                  </div>
                  <div className="flex gap-3 mb-2 text-white text-2xl">
                    <p>FB:</p>
                    <Link href="/">Studio 36</Link>
                  </div>
                </div>
            </div>
          </motion.div>
    </div>
  )
}
