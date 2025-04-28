'use client'

import { Fragment, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import RulesParallasImage from "./RulesParralaxImage";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function RulesAndBenefits() {
  const ref = useRef(null);
  const [y, setY] = useState(0);
  const t = useTranslations("index.rules");
  const rulesArray = [ ...Array(7).keys() ];

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
            <RulesParallasImage src='/rules/rules.png' alt='parallax-image-1' className='absolute left-0 top-0 w-full h-[25rem] lg:h-screen object-cover -z-10 rounded-lg' y={y} />
        </div>
        <div className="grid grid-cols-3 col-start-1 lg:col-start-5 col-end-4 lg:col-end-8 ml-1 lg:ml-4">
                <p className="col-span-3 lg:col-span-1 font-medium mb-2 lg:mb-0 text-sm lg:text-base">{`[${t("subtitle1")}]`}</p>
                <motion.ol className="col-start-1 col-span-3 lg:col-span-2 ml-3" whileInView={'animate'} initial={'initial'} variants={textContainerVariants}>
                  {
                    rulesArray.map((value, index) => {
                    return (
                      <Fragment key={index}>
                      <motion.li 
                        variants={textVariants} 
                        className={`font-hedwig text-sm lg:text-2xl font-normal text-justify whitespace-pre-wrap ${index < 5 ? 'list-decimal' : '-ml-3 lg:-ml-5 list-none'}`}
                      >
                        {t(`rules.${index}`)}
                      </motion.li> <br/>
                      </Fragment>
                    )
                    })
                  }
                </motion.ol>
                <p className="col-span-3 lg:col-span-1 font-medium mb-2 lg:mb-0 text-sm lg:text-base mt-12">{`[${t("subtitle2")}]`}</p>
                <motion.ol className="col-start-1 col-span-3 lg:col-span-2 ml-5 lg:ml-11 lg:mt-12 [&>li]:before:content-['+'] [&>li]:before:-left-5 lg:[&>li]:before:-left-11 [&>li]:before:absolute" whileInView={'animate'} initial={'initial'} variants={textContainerVariants}>
                    {
                      rulesArray.map((value, index) => {
                        if (index >= 6) return;

                        return (
                          <Fragment key={index}>
                            <motion.li variants={textVariants} className="relative font-hedwig text-sm lg:text-2xl font-normal text-justify">{t(`benefits.${index}`)}</motion.li> <br/>
                          </Fragment>
                        )
                      })
                    }
                </motion.ol>
        </div>
    </div>
  )
}
