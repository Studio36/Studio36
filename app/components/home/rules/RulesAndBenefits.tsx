'use client'

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import RulesParallasImage from "./RulesParralaxImage";
import { motion } from "motion/react";

export default function RulesAndBenefits() {
  const ref = useRef(null);
  const [y, setY] = useState(0);

  const textContainerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.1,
      }
    },
    animate: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const textVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
      setY(latest * 20)
  })
  return (
    <div className='col-span-8 mt-12 lg:mt-48 relative layout-grid' ref={ref}>
        <div className='lg:sticky col-span-4 h-[25rem] lg:h-screen top-0 left-0 mb-12 lg:mb-0'>
            <RulesParallasImage src='/rules/rules.jpg' alt='parallax-image-1' className='absolute left-0 top-0 w-full h-[25rem] lg:h-screen object-cover -z-10 rounded-lg' y={y} />
        </div>
        <div className="grid grid-cols-3 col-start-1 lg:col-start-5 col-end-4 lg:col-end-8 lg:pl-4">
                <p className="col-span-3 lg:col-span-1 font-medium mb-2 lg:mb-0 text-sm lg:text-base">[REGULILE CASEI]</p>
                <motion.ol className="col-start-1 col-span-3 lg:col-span-2 list-decimal ml-5 lg:ml-11" whileInView={'animate'} initial={'initial'} variants={textContainerVariants}>
                    <motion.li variants={textVariants} className="font-hedwig text-sm lg:text-2xl font-normal text-justify">Timpul minim de rezervare: 4 ore pentru ședințe foto, 6 ore pentru filmări.</motion.li> <br/>
                    <motion.li variants={textVariants} className="font-hedwig text-sm lg:text-2xl font-normal text-justify">Program de lucru: Luni-Vineri, 09:00-21:00. Rezervările în weekend presupun o taxă suplimentară de 80 EUR/zi.</motion.li> <br/>
                    <motion.li variants={textVariants} className="font-hedwig text-sm lg:text-2xl font-normal text-justify">Înregistrarea sunetului: Nu putem garanta sunet pur din cauza posibilului ecou.</motion.li> <br/>
                    <motion.li variants={textVariants} className="font-hedwig text-sm lg:text-2xl font-normal text-justify">Consumul de alimente și băuturi: Este interzis în studioul complet alb.</motion.li> <br/>
                    <motion.li variants={textVariants} className="font-hedwig text-sm lg:text-2xl font-normal text-justify">Utilizarea vaselor: Vasele folosite trebuie spălate, altfel se aplică o taxă de 30 EUR.</motion.li> <br/>
                    <motion.li variants={textVariants} className="font-hedwig text-sm lg:text-2xl font-normal text-justify">Durata rezervării: Include pregătirea și curățenia, terminând cu 10 minute înainte de sfârșitul rezervării.</motion.li> <br/>
                    <motion.li variants={textVariants} className="font-hedwig text-sm lg:text-2xl font-normal text-justify">Ore suplimentare: Între 23:00 și 09:00 se aplică o taxă de 30 EUR/oră.</motion.li> <br/>
                    <motion.li variants={textVariants} className="font-hedwig text-sm lg:text-2xl font-normal text-justify">Curățenie suplimentară: Pentru utilizarea decorurilor care lasă multă murdărie, se percepe o taxă de 50 EUR.</motion.li> <br/>
                    <motion.li variants={textVariants} className="font-hedwig text-sm lg:text-2xl font-normal text-justify">Acces în studioul alb: Obligatoriu șoșoni de protecție sau încălțăminte albă curată.</motion.li> <br/>
                    <motion.li variants={textVariants} className="font-hedwig text-sm lg:text-2xl font-normal text-justify">Gunoi în exces: Peste un container de 240l se percepe o taxă de 25 EUR.</motion.li> <br/>
                    <motion.li variants={textVariants} className="font-hedwig text-sm lg:text-2xl font-normal text-justify">Deteriorări: Responsabilitatea financiară revine chiriașului, iar echipamentele vor fi verificate de administrator la finalul rezervării.</motion.li> <br/>
                </motion.ol>
                <p className="col-span-3 lg:col-span-1 font-medium mb-2 lg:mb-0 text-sm lg:text-base mt-12">[BENEFICII]</p>
                <motion.ol className="col-start-1 col-span-3 lg:col-span-2 ml-5 lg:ml-11 lg:mt-12 [&>li]:before:content-['+'] [&>li]:before:-left-5 lg:[&>li]:before:-left-11 [&>li]:before:absolute" whileInView={'animate'} initial={'initial'} variants={textContainerVariants}>
                    <motion.li variants={textVariants} className="relative font-hedwig text-sm lg:text-2xl font-normal text-justify">Internet Gigabit WiFi6.</motion.li> <br/>
                    <motion.li variants={textVariants} className="relative font-hedwig text-sm lg:text-2xl font-normal text-justify">Cafea Nespresso gratuită.</motion.li> <br/>
                    <motion.li variants={textVariants} className="relative font-hedwig text-sm lg:text-2xl font-normal text-justify">Sistem audio Bang & Olufsen cu AirPlay.</motion.li> <br/>
                    <motion.li variants={textVariants} className="relative font-hedwig text-sm lg:text-2xl font-normal text-justify">Aer condiționat sau încălzire.</motion.li> <br/>
                    <motion.li variants={textVariants} className="relative font-hedwig text-sm lg:text-2xl font-normal text-justify">Standuri, masă de machiaj personalizată, suport pentru haine, oglindă mare, aburitor.</motion.li> <br/>
                    <motion.li variants={textVariants} className="relative font-hedwig text-sm lg:text-2xl font-normal text-justify">Suport tehnic din partea echipei noastre pentru orice nevoie, de la instalarea echipamentului la post-producție.</motion.li>
                </motion.ol>
        </div>
    </div>
  )
}
