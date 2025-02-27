'use client'

import { useEffect, useState } from 'react'
import ProjectsGrid from '../components/projects/ProjectsGrid'
import Footer from '../components/footer/Footer'
import CustomCursour from '../components/CustomCursour'
import Header from '../components/header/Header'
import { motion } from 'motion/react'
import { easeInOutCubic, easeInOutCubicMath } from '../lib/utils'
import { useLenis } from 'lenis/react'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

export default function Projects () {
    const [isActive, setIsActive] = useState(false);
    const [isLinkClicked, setIsLinkClicked] = useState(false);
    const lenis = useLenis();
    const searchParams = useSearchParams();
    const t = useTranslations('projects');
    const cursorText = useTranslations('index.cursorText');
    const locale = useLocale();

    useEffect(() => {
        const section = searchParams.get('section');
          if (section !== null && lenis) {
            setTimeout(() => {
              lenis.scrollTo(`#${section}`, {
                duration: 1, 
                lock: true,
                force: true,
                easing: easeInOutCubicMath,
              }); 
            }, 600)
        }
      }, [lenis, searchParams])
  return (
    <>
        <Header setIsLinkClicked={setIsLinkClicked} isLinkClicked={isLinkClicked}/>
        <CustomCursour isActive={isActive} text={cursorText('default')} width={locale === 'en' ? "7rem" : "9.3rem"} isVisible={!isLinkClicked}/>
        <motion.div initial={'initial'} variants={{initial: {opacity: 0}, animate: {opacity: 100}}} animate={isLinkClicked ? 'initial' : 'animate'} transition={{duration: 0.7, ease: easeInOutCubic}} className="layout-grid col-span-8 [&>*]:z-[2]">
            <div className={`grid grid-cols-3 lg:grid-cols-6 lg:col-start-2 col-span-6 transition duration-700 mt-12 lg:mt-24`}>
                <p className='col-start-2 col-span-2 lg:col-start-4 mb-4 lg:mb-6 text-sm lg:text-base uppercase'>{`[${t('subtitle')}]`}</p>
                <p className='col-span-6 text-2xl lg:leading-tight lg:text-[3rem] font-hedwig indent-[33.3%] lg:indent-[50%] mb-12 lg:mb-24 text-justify'>{t('content')}</p>
                <ProjectsGrid setIsActive={setIsActive} setIsLinkClicked={setIsLinkClicked}/>
            </div>
            <Footer />
        </motion.div>
    </>
  )
}
